package com.decisionarena.web.dto;

public record CriterionScoreDto(
        String criterion,
        int weight,
        int score,
        String reasoning
) {
}
