package com.decisionarena.service;

import com.decisionarena.domain.CriterionScore;
import com.decisionarena.domain.OptionAnalysis;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class WeightedScoringServiceTest {

    private final WeightedScoringService weightedScoringService = new WeightedScoringService();

    @Test
    void shouldNormalizeWeightedScoreToPercent() {
        OptionAnalysis optionAnalysis = new OptionAnalysis(
                "Try it now",
                null,
                List.of("Fast upside"),
                List.of("Costs time"),
                List.of("Could be distracting"),
                List.of(
                        new CriterionScore("Cost", 5, 4, "Expensive."),
                        new CriterionScore("Upside", 5, 9, "Strong upside.")
                ),
                0,
                "Balanced choice."
        );

        List<OptionAnalysis> normalized = weightedScoringService.normalizeScores(List.of(optionAnalysis));

        assertThat(normalized.getFirst().weightedScore()).isEqualTo(65);
    }
}
