package com.decisionarena.domain;

import java.util.List;

public record OptionAnalysis(
        String optionLabel,
        String note,
        List<String> pros,
        List<String> cons,
        List<String> risks,
        List<CriterionScore> criterionScores,
        int weightedScore,
        String summary
) {
}
