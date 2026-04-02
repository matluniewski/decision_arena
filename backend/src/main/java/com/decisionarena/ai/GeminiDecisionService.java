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
@ConditionalOnProperty(name = "app.ai.mode", havingValue = "gemini")
public class GeminiDecisionService implements AiDecisionService {

    private static final String DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
    private static final String DEFAULT_MODEL = "gemini-2.5-flash-lite";

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final AiProperties aiProperties;

    public GeminiDecisionService(ObjectMapper objectMapper, AiProperties aiProperties) {
        this.objectMapper = objectMapper;
        this.aiProperties = aiProperties;
        this.restClient = RestClient.builder()
                .baseUrl(resolveBaseUrl(aiProperties))
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    public DecisionFrame proposeDecisionFrame(String question, String locale) {
        String prompt = DecisionPrompts.decisionFramePrompt(question, locale);

        return callJson(prompt, decisionFrameSchema(), DecisionFrame.class);
    }

    @Override
    public DecisionAnalysisResult analyzeDecision(DecisionAnalysisRequest request) {
        String prompt = DecisionPrompts.decisionAnalysisPrompt(request, writeValue(request));

        return callJson(prompt, decisionAnalysisSchema(), DecisionAnalysisResult.class);
    }

    private <T> T callJson(String prompt, Map<String, Object> schema, Class<T> type) {
        String apiKey = aiProperties.apiKey();
        if (apiKey == null || apiKey.isBlank()) {
            throw new AiIntegrationException("APP_AI_API_KEY or GEMINI_API_KEY is required when app.ai.mode=gemini.");
        }

        String model = resolveModel(aiProperties);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "role", "user",
                                "parts", List.of(Map.of("text", prompt))
                        )
                ),
                "generationConfig", Map.of(
                        "responseMimeType", "application/json",
                        "responseJsonSchema", schema
                )
        );

        try {
            JsonNode root = restClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1beta/models/{model}:generateContent")
                            .queryParam("key", apiKey)
                            .build(model))
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);

            String jsonText = extractText(root);
            return objectMapper.readValue(jsonText, type);
        } catch (Exception exception) {
            throw new AiIntegrationException("Gemini response could not be parsed into the expected JSON contract.", exception);
        }
    }

    private String extractText(JsonNode root) {
        JsonNode candidates = root.path("candidates");
        if (!candidates.isArray() || candidates.isEmpty()) {
            throw new AiIntegrationException("No candidates were returned by Gemini.");
        }

        JsonNode firstCandidate = candidates.get(0);
        JsonNode parts = firstCandidate.path("content").path("parts");
        if (!parts.isArray()) {
            throw new AiIntegrationException("Gemini content parts were missing.");
        }

        for (JsonNode part : parts) {
            if (part.path("text").isTextual()) {
                return part.path("text").asText();
            }
        }

        throw new AiIntegrationException("No text part was found in the Gemini response.");
    }

    private Map<String, Object> decisionFrameSchema() {
        return Map.of(
                "type", "object",
                "required", List.of("normalizedQuestion", "proposedOptions", "proposedCriteria", "missingInfo"),
                "propertyOrdering", List.of("normalizedQuestion", "proposedOptions", "proposedCriteria", "missingInfo"),
                "properties", Map.of(
                        "normalizedQuestion", Map.of("type", "string"),
                        "proposedOptions", Map.of(
                                "type", "array",
                                "minItems", 2,
                                "maxItems", 4,
                                "items", Map.of(
                                        "type", "object",
                                        "required", List.of("label", "note"),
                                        "propertyOrdering", List.of("label", "note"),
                                        "properties", Map.of(
                                                "label", Map.of("type", "string"),
                                                "note", Map.of("type", "string")
                                        )
                                )
                        ),
                        "proposedCriteria", Map.of(
                                "type", "array",
                                "minItems", 4,
                                "maxItems", 6,
                                "items", Map.of(
                                        "type", "object",
                                        "required", List.of("label", "weight"),
                                        "propertyOrdering", List.of("label", "weight"),
                                        "properties", Map.of(
                                                "label", Map.of("type", "string"),
                                                "weight", Map.of("type", "integer", "minimum", 1, "maximum", 5)
                                        )
                                )
                        ),
                        "missingInfo", Map.of(
                                "type", "array",
                                "minItems", 2,
                                "maxItems", 4,
                                "items", Map.of("type", "string")
                        )
                )
        );
    }

    private Map<String, Object> decisionAnalysisSchema() {
        Map<String, Object> criterionScoreSchema = Map.of(
                "type", "object",
                "required", List.of("criterion", "weight", "score", "reasoning"),
                "propertyOrdering", List.of("criterion", "weight", "score", "reasoning"),
                "properties", Map.of(
                        "criterion", Map.of("type", "string"),
                        "weight", Map.of("type", "integer", "minimum", 1, "maximum", 5),
                        "score", Map.of("type", "integer", "minimum", 1, "maximum", 10),
                        "reasoning", Map.of("type", "string")
                )
        );

        Map<String, Object> optionAnalysisSchema = Map.of(
                "type", "object",
                "required", List.of("optionLabel", "note", "pros", "cons", "risks", "criterionScores", "weightedScore", "summary"),
                "propertyOrdering", List.of("optionLabel", "note", "pros", "cons", "risks", "criterionScores", "weightedScore", "summary"),
                "properties", Map.of(
                        "optionLabel", Map.of("type", "string"),
                        "note", Map.of("type", List.of("string", "null")),
                        "pros", Map.of(
                                "type", "array",
                                "minItems", 2,
                                "maxItems", 2,
                                "items", Map.of("type", "string")
                        ),
                        "cons", Map.of(
                                "type", "array",
                                "minItems", 2,
                                "maxItems", 2,
                                "items", Map.of("type", "string")
                        ),
                        "risks", Map.of(
                                "type", "array",
                                "minItems", 2,
                                "maxItems", 2,
                                "items", Map.of("type", "string")
                        ),
                        "criterionScores", Map.of(
                                "type", "array",
                                "items", criterionScoreSchema
                        ),
                        "weightedScore", Map.of("type", "integer", "minimum", 0, "maximum", 100),
                        "summary", Map.of("type", "string")
                )
        );

        return Map.of(
                "type", "object",
                "required", List.of("normalizedQuestion", "verdict", "confidence", "optionResults", "unknowns"),
                "propertyOrdering", List.of("normalizedQuestion", "verdict", "confidence", "optionResults", "unknowns"),
                "properties", Map.of(
                        "normalizedQuestion", Map.of("type", "string"),
                        "verdict", Map.of("type", "string"),
                        "confidence", Map.of("type", "string", "enum", List.of("High", "Medium", "Low")),
                        "optionResults", Map.of(
                                "type", "array",
                                "items", optionAnalysisSchema
                        ),
                        "unknowns", Map.of(
                                "type", "array",
                                "maxItems", 4,
                                "items", Map.of("type", "string")
                        )
                )
        );
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
