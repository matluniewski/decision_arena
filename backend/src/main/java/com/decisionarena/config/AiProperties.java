package com.decisionarena.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.ai")
public record AiProperties(
        String mode,
        String model,
        String apiKey,
        String baseUrl
) {
}
