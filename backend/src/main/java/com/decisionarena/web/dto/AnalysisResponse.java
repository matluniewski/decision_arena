package com.decisionarena.web.dto;

import java.util.List;

public record AnalysisResponse(
        String analysisId,
        String shareSlug,
        String question,
        String normalizedQuestion,
        String verdict,
        String confidence,
        List<OptionAnalysisDto> optionResults,
        List<String> unknowns
) {
}
