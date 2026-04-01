package com.decisionarena.domain;

import java.util.List;

public record DecisionAnalysisResult(
        String normalizedQuestion,
        String verdict,
        String confidence,
        List<OptionAnalysis> optionResults,
        List<String> unknowns
) {
}
