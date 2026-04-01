package com.decisionarena.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DecisionOptionInputDto(
        @NotBlank
        @Size(max = 80)
        String label,
        @Size(max = 160)
        String note
) {
}
