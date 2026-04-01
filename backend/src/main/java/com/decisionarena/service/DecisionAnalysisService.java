package com.decisionarena.service;

import com.decisionarena.ai.AiDecisionService;
import com.decisionarena.domain.CriterionInput;
import com.decisionarena.domain.CriterionScore;
import com.decisionarena.domain.DecisionAnalysisRequest;
import com.decisionarena.domain.DecisionAnalysisResult;
import com.decisionarena.domain.DecisionFrame;
import com.decisionarena.domain.DecisionOptionInput;
import com.decisionarena.domain.OptionAnalysis;
import com.decisionarena.persistence.DecisionDraftEntity;
import com.decisionarena.persistence.SharedResultEntity;
import com.decisionarena.persistence.SharedResultRepository;
import com.decisionarena.support.AiIntegrationException;
import com.decisionarena.support.NotFoundException;
import com.decisionarena.web.dto.AnalysisResponse;
import com.decisionarena.web.dto.CreateAnalysisRequest;
import com.decisionarena.web.dto.CriterionScoreDto;
import com.decisionarena.web.dto.OptionAnalysisDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DecisionAnalysisService {

    private final DecisionDraftService decisionDraftService;
    private final AiDecisionService aiDecisionService;
    private final DecisionValidator decisionValidator;
    private final WeightedScoringService weightedScoringService;
    private final SharedResultRepository sharedResultRepository;
    private final SlugService slugService;
    private final ObjectMapper objectMapper;

    public DecisionAnalysisService(
            DecisionDraftService decisionDraftService,
            AiDecisionService aiDecisionService,
            DecisionValidator decisionValidator,
            WeightedScoringService weightedScoringService,
            SharedResultRepository sharedResultRepository,
            SlugService slugService,
            ObjectMapper objectMapper
    ) {
        this.decisionDraftService = decisionDraftService;
        this.aiDecisionService = aiDecisionService;
        this.decisionValidator = decisionValidator;
        this.weightedScoringService = weightedScoringService;
        this.sharedResultRepository = sharedResultRepository;
        this.slugService = slugService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public AnalysisResponse analyze(CreateAnalysisRequest request) {
        DecisionDraftEntity draftEntity = decisionDraftService.getDraftEntity(request.draftId());
        DecisionFrame draftFrame = decisionDraftService.readFrame(draftEntity);
        String locale = normalizeLocale(request.locale());

        List<DecisionOptionInput> options = request.options().stream()
                .map(dto -> new DecisionOptionInput(dto.label().trim(), dto.note()))
                .toList();
        List<CriterionInput> criteria = request.criteria().stream()
                .map(dto -> new CriterionInput(dto.label().trim(), dto.weight()))
                .toList();

        decisionValidator.validateOptions(options);
        decisionValidator.validateCriteria(criteria);

        DecisionAnalysisResult rawResult = aiDecisionService.analyzeDecision(
                new DecisionAnalysisRequest(
                        draftEntity.getNormalizedQuestion(),
                        options,
                        criteria,
                        request.userContext(),
                        draftFrame.missingInfo(),
                        locale
                )
        );

        DecisionAnalysisResult normalized = new DecisionAnalysisResult(
                rawResult.normalizedQuestion(),
                rawResult.verdict(),
                rawResult.confidence(),
                weightedScoringService.normalizeScores(rawResult.optionResults()),
                rawResult.unknowns()
        );

        SharedResultEntity entity = new SharedResultEntity();
        entity.setDraftId(draftEntity.getId());
        entity.setShareSlug(uniqueSlug());
        entity.setQuestion(draftEntity.getQuestion());
        entity.setNormalizedQuestion(normalized.normalizedQuestion());
        entity.setVerdict(normalized.verdict());
        entity.setConfidence(normalized.confidence());
        entity.setResultJson(writeJson(normalized));

        SharedResultEntity saved = sharedResultRepository.save(entity);
        return toResponse(saved, normalized);
    }

    @Transactional(readOnly = true)
    public AnalysisResponse getSharedResult(String shareSlug) {
        SharedResultEntity entity = sharedResultRepository.findByShareSlug(shareSlug)
                .orElseThrow(() -> new NotFoundException("Shared result was not found."));
        DecisionAnalysisResult result = readJson(entity.getResultJson());
        return toResponse(entity, result);
    }

    private String uniqueSlug() {
        String slug = slugService.nextSlug();
        while (sharedResultRepository.findByShareSlug(slug).isPresent()) {
            slug = slugService.nextSlug();
        }
        return slug;
    }

    private AnalysisResponse toResponse(SharedResultEntity entity, DecisionAnalysisResult result) {
        return new AnalysisResponse(
                entity.getId(),
                entity.getShareSlug(),
                entity.getQuestion(),
                result.normalizedQuestion(),
                result.verdict(),
                result.confidence(),
                result.optionResults().stream().map(this::toDto).toList(),
                result.unknowns()
        );
    }

    private OptionAnalysisDto toDto(OptionAnalysis optionAnalysis) {
        return new OptionAnalysisDto(
                optionAnalysis.optionLabel(),
                optionAnalysis.note(),
                optionAnalysis.pros(),
                optionAnalysis.cons(),
                optionAnalysis.risks(),
                optionAnalysis.criterionScores().stream().map(this::toDto).toList(),
                optionAnalysis.weightedScore(),
                optionAnalysis.summary()
        );
    }

    private CriterionScoreDto toDto(CriterionScore criterionScore) {
        return new CriterionScoreDto(
                criterionScore.criterion(),
                criterionScore.weight(),
                criterionScore.score(),
                criterionScore.reasoning()
        );
    }

    private String writeJson(DecisionAnalysisResult result) {
        try {
            return objectMapper.writeValueAsString(result);
        } catch (Exception exception) {
            throw new AiIntegrationException("Result could not be persisted.", exception);
        }
    }

    private DecisionAnalysisResult readJson(String resultJson) {
        try {
            return objectMapper.readValue(resultJson, DecisionAnalysisResult.class);
        } catch (Exception exception) {
            throw new AiIntegrationException("Stored result could not be read.", exception);
        }
    }

    private String normalizeLocale(String rawLocale) {
        if ("en".equalsIgnoreCase(rawLocale)) {
            return "en";
        }
        return "pl";
    }
}
