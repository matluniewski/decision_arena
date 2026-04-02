package com.decisionarena.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DecisionOptionInputDto(
        @NotBlank
        @Size(max = 80, message = "Option label must be 80 characters or fewer.")
        String label,
        @Size(max = 160, message = "Option note must be 160 characters or fewer.")
        String note
) {
}
