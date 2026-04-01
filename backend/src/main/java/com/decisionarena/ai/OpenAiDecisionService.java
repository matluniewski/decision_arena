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
        String prompt = """
                You are a structured decision framing assistant.
                Return JSON only.
                Return all user-facing strings in %s.
                Output keys:
                normalizedQuestion: string
                proposedOptions: array of 2 to 4 objects with label and note
                proposedCriteria: array of 4 to 6 objects with label and weight from 1 to 5
                missingInfo: array of 2 to 4 strings
                The question is: %s
                """.formatted(languageName(locale), question);

        return callJson(prompt, DecisionFrame.class);
    }

    @Override
    public DecisionAnalysisResult analyzeDecision(DecisionAnalysisRequest request) {
        String prompt = """
                You analyze a personal decision and return JSON only.
                Return all user-facing strings in %s.
                Keep confidence as one of these exact English enum values only: High, Medium, Low.
                Output keys:
                normalizedQuestion: string
                verdict: string under 280 chars
                confidence: one of High, Medium, Low
                unknowns: array of up to 4 strings
                optionResults: array of objects where each object has:
                  optionLabel: string
                  note: string or null
                  pros: array of 2 strings
                  cons: array of 2 strings
                  risks: array of 2 strings
                  summary: string
                  weightedScore: number from 0 to 100
                  criterionScores: array with one entry per criterion, each entry containing criterion, weight, score from 1 to 10, reasoning

                Decision payload:
                %s
                """.formatted(languageName(request.locale()), writeValue(request));

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
                                "content", List.of(Map.of("type", "input_text", "text", "Return valid JSON only."))
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

    private String languageName(String locale) {
        return "pl".equalsIgnoreCase(locale) ? "Polish" : "English";
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
