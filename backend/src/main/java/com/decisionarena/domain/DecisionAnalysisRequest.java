package com.decisionarena.domain;

import java.util.List;

public record DecisionAnalysisRequest(
        String normalizedQuestion,
        List<DecisionOptionInput> options,
        List<CriterionInput> criteria,
        String userContext,
        List<String> draftMissingInfo,
        String locale
) {
}
