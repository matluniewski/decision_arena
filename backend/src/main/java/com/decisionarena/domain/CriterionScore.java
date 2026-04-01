package com.decisionarena.domain;

public record CriterionScore(
        String criterion,
        int weight,
        int score,
        String reasoning
) {
}
