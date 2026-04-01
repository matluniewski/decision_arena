package com.decisionarena.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateDraftRequest(
        @NotBlank
        @Size(max = 280)
        String question
) {
}
