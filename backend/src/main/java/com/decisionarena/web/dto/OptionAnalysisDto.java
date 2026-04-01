package com.decisionarena.web.dto;

import java.util.List;

public record OptionAnalysisDto(
        String optionLabel,
        String note,
        List<String> pros,
        List<String> cons,
        List<String> risks,
        List<CriterionScoreDto> criterionScores,
        int weightedScore,
        String summary
) {
}
