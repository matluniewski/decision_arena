package com.decisionarena.service;

import com.decisionarena.domain.CriterionScore;
import com.decisionarena.domain.OptionAnalysis;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeightedScoringService {

    public List<OptionAnalysis> normalizeScores(List<OptionAnalysis> optionResults) {
        return optionResults.stream()
                .map(this::normalize)
                .toList();
    }

    private OptionAnalysis normalize(OptionAnalysis optionAnalysis) {
        int totalWeight = optionAnalysis.criterionScores().stream()
                .mapToInt(CriterionScore::weight)
                .sum();

        int weightedScore = (int) Math.round(
                optionAnalysis.criterionScores().stream()
                        .mapToInt(score -> score.score() * score.weight())
                        .sum() * 100.0 / (Math.max(totalWeight, 1) * 10.0)
        );

        return new OptionAnalysis(
                optionAnalysis.optionLabel(),
                optionAnalysis.note(),
                optionAnalysis.pros(),
                optionAnalysis.cons(),
                optionAnalysis.risks(),
                optionAnalysis.criterionScores(),
                weightedScore,
                optionAnalysis.summary()
        );
    }
}
