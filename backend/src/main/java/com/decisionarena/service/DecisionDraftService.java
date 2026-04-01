package com.decisionarena.service;

import com.decisionarena.ai.AiDecisionService;
import com.decisionarena.domain.CriterionInput;
import com.decisionarena.domain.DecisionFrame;
import com.decisionarena.domain.DecisionOptionInput;
import com.decisionarena.persistence.DecisionDraftEntity;
import com.decisionarena.persistence.DecisionDraftRepository;
import com.decisionarena.support.AiIntegrationException;
import com.decisionarena.support.NotFoundException;
import com.decisionarena.web.dto.CriterionInputDto;
import com.decisionarena.web.dto.DecisionOptionInputDto;
import com.decisionarena.web.dto.DraftResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DecisionDraftService {

    private final AiDecisionService aiDecisionService;
    private final DecisionDraftRepository draftRepository;
    private final ModerationService moderationService;
    private final DecisionValidator decisionValidator;
    private final ObjectMapper objectMapper;

    public DecisionDraftService(
            AiDecisionService aiDecisionService,
            DecisionDraftRepository draftRepository,
            ModerationService moderationService,
            DecisionValidator decisionValidator,
            ObjectMapper objectMapper
    ) {
        this.aiDecisionService = aiDecisionService;
        this.draftRepository = draftRepository;
        this.moderationService = moderationService;
        this.decisionValidator = decisionValidator;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public DraftResponse createDraft(String rawQuestion, String rawLocale) {
        String question = decisionValidator.sanitizeQuestion(rawQuestion);
        String locale = normalizeLocale(rawLocale);
        moderationService.assertAllowed(question);

        DecisionFrame frame = aiDecisionService.proposeDecisionFrame(question, locale);
        decisionValidator.validateFrame(frame);

        DecisionDraftEntity entity = new DecisionDraftEntity();
        entity.setQuestion(question);
        entity.setNormalizedQuestion(frame.normalizedQuestion());
        entity.setProposalJson(writeJson(frame));

        DecisionDraftEntity saved = draftRepository.save(entity);
        return toResponse(saved.getId(), frame);
    }

    @Transactional(readOnly = true)
    public DraftResponse getDraft(String draftId) {
        DecisionDraftEntity entity = draftRepository.findById(draftId)
                .orElseThrow(() -> new NotFoundException("Decision draft was not found."));
        DecisionFrame frame = readFrame(entity.getProposalJson());
        return toResponse(entity.getId(), frame);
    }

    @Transactional(readOnly = true)
    public DecisionDraftEntity getDraftEntity(String draftId) {
        return draftRepository.findById(draftId)
                .orElseThrow(() -> new NotFoundException("Decision draft was not found."));
    }

    @Transactional(readOnly = true)
    public DecisionFrame readFrame(DecisionDraftEntity entity) {
        return readFrame(entity.getProposalJson());
    }

    private DraftResponse toResponse(String draftId, DecisionFrame frame) {
        return new DraftResponse(
                draftId,
                frame.normalizedQuestion(),
                frame.proposedOptions().stream().map(this::toDto).toList(),
                frame.proposedCriteria().stream().map(this::toDto).toList(),
                frame.missingInfo()
        );
    }

    private DecisionFrame readFrame(String proposalJson) {
        try {
            return objectMapper.readValue(proposalJson, DecisionFrame.class);
        } catch (Exception exception) {
            throw new AiIntegrationException("Stored draft proposal could not be read.", exception);
        }
    }

    private String writeJson(DecisionFrame frame) {
        try {
            return objectMapper.writeValueAsString(frame);
        } catch (Exception exception) {
            throw new AiIntegrationException("Draft proposal could not be stored.", exception);
        }
    }

    private DecisionOptionInputDto toDto(DecisionOptionInput option) {
        return new DecisionOptionInputDto(option.label(), option.note() == null ? "" : option.note());
    }

    private CriterionInputDto toDto(CriterionInput criterion) {
        return new CriterionInputDto(criterion.label(), criterion.weight());
    }

    private String normalizeLocale(String rawLocale) {
        if ("en".equalsIgnoreCase(rawLocale)) {
            return "en";
        }
        return "pl";
    }
}
