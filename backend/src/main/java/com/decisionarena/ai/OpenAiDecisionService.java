package com.decisionarena.ai;

import com.decisionarena.config.AiProperties;
import com.decisionarena.domain.DecisionAnalysisRequest;
import com.decisionarena.domain.DecisionAnalysisResult;
import com.decisionarena.domain.DecisionFrame;
import com.decisionarena.support.AiIntegrationException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@ConditionalOnProperty(name = "app.ai.mode", havingValue = "openai")
public class OpenAiDecisionService implements AiDecisionService {

    private static final String DEFAULT_BASE_URL = "https://api.openai.com";
    private static final String DEFAULT_MODEL = "gpt-5.4-mini";

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final AiProperties aiProperties;

    public OpenAiDecisionService(ObjectMapper objectMapper, AiProperties aiProperties) {
        this.objectMapper = objectMapper;
        this.aiProperties = aiProperties;
        this.restClient = RestClient.builder()
                .baseUrl(resolveBaseUrl(aiProperties))
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + aiProperties.apiKey())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    public DecisionFrame proposeDecisionFrame(String question, String locale) {
        String prompt = DecisionPrompts.decisionFramePrompt(question, locale);

        return callJson(prompt, DecisionFrame.class);
    }

    @Override
    public DecisionAnalysisResult analyzeDecision(DecisionAnalysisRequest request) {
        String prompt = DecisionPrompts.decisionAnalysisPrompt(request, writeValue(request));

        return callJson(prompt, DecisionAnalysisResult.class);
    }

    private <T> T callJson(String prompt, Class<T> type) {
        if (aiProperties.apiKey() == null || aiProperties.apiKey().isBlank()) {
            throw new AiIntegrationException("OPENAI_API_KEY is required when app.ai.mode=openai.");
        }

        Map<String, Object> body = Map.of(
                "model", resolveModel(aiProperties),
                "input", List.of(
                        Map.of(
                                "role", "system",
                                "content", List.of(Map.of("type", "input_text", "text", DecisionPrompts.openAiSystemPrompt()))
                        ),
                        Map.of(
                                "role", "user",
                                "content", List.of(Map.of("type", "input_text", "text", prompt))
                        )
                ),
                "text", Map.of("format", Map.of("type", "json_object"))
        );

        try {
            JsonNode root = restClient.post()
                    .uri("/v1/responses")
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);

            String jsonText = extractText(root);
            return objectMapper.readValue(jsonText, type);
        } catch (Exception exception) {
            throw new AiIntegrationException("OpenAI response could not be parsed into the expected JSON contract.", exception);
        }
    }

    private String extractText(JsonNode root) {
        JsonNode outputText = root.path("output_text");
        if (outputText.isTextual()) {
            return outputText.asText();
        }

        for (JsonNode outputNode : root.path("output")) {
            for (JsonNode contentNode : outputNode.path("content")) {
                if ("output_text".equals(contentNode.path("type").asText()) && contentNode.path("text").isTextual()) {
                    return contentNode.path("text").asText();
                }
            }
        }

        throw new AiIntegrationException("No output_text field was found in the OpenAI response.");
    }

    private String writeValue(Object value) {
        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(value);
        } catch (Exception exception) {
            throw new AiIntegrationException("Decision payload could not be serialized.", exception);
        }
    }
    private String resolveBaseUrl(AiProperties properties) {
        String configured = properties.baseUrl();
        if (configured != null && !configured.isBlank()) {
            return configured;
        }
        return DEFAULT_BASE_URL;
    }

    private String resolveModel(AiProperties properties) {
        String configured = properties.model();
        if (configured != null && !configured.isBlank()) {
            return configured;
        }
        return DEFAULT_MODEL;
    }
}
