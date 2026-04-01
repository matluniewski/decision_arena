package com.decisionarena.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriterionInputDto(
        @NotBlank
        @Size(max = 60)
        String label,
        @Min(1)
        @Max(5)
        int weight
) {
}
