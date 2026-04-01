package com.decisionarena.domain;

import java.util.List;

public record DecisionFrame(
        String normalizedQuestion,
        List<DecisionOptionInput> proposedOptions,
        List<CriterionInput> proposedCriteria,
        List<String> missingInfo
) {
}
