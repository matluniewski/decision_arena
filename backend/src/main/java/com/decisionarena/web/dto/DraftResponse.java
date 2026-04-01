package com.decisionarena.web.dto;

import java.util.List;

public record DraftResponse(
        String draftId,
        String normalizedQuestion,
        List<DecisionOptionInputDto> proposedOptions,
        List<CriterionInputDto> proposedCriteria,
        List<String> missingInfo
) {
}
