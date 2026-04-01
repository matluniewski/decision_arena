package com.decisionarena.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.decision")
public record DecisionProperties(
        int maxQuestionLength,
        int minOptions,
        int maxOptions,
        int minCriteria,
        int maxCriteria,
        int minWeight,
        int maxWeight
) {
}
