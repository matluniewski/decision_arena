package com.decisionarena.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateAnalysisRequest(
        @NotBlank
        String draftId,
        @Valid
        @Size(min = 2, max = 4)
        List<DecisionOptionInputDto> options,
        @Valid
        @Size(min = 4, max = 6)
        List<CriterionInputDto> criteria,
        @Size(max = 400)
        String userContext
) {
}
