package com.decisionarena.web;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DecisionFlowIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    @Test
    void shouldCreateDraftAnalyzeAndFetchSharedResult() throws Exception {
        String draftBody = """
                {
                  \"question\": \"Should I go to Japan this year?\"
                }
                """;

        String draftResponse = mockMvc.perform(post("/api/decision-drafts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(draftBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.draftId").exists())
                .andExpect(jsonPath("$.proposedOptions.length()").value(4))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode draftJson = objectMapper.readTree(draftResponse);
        String draftId = draftJson.path("draftId").asText();

        String analysisBody = """
                {
                  \"draftId\": \"%s\",
                  \"options\": [
                    {\"label\": \"Go this year\", \"note\": \"Full trip\"},
                    {\"label\": \"Delay to next year\", \"note\": \"More time for budget\"},
                    {\"label\": \"Choose a cheaper or shorter version\", \"note\": \"Reduce total cost\"},
                    {\"label\": \"Do not go now\", \"note\": \"Keep the budget\"}
                  ],
                  \"criteria\": [
                    {\"label\": \"Total cost\", \"weight\": 5},
                    {\"label\": \"Need for rest\", \"weight\": 4},
                    {\"label\": \"Experience value\", \"weight\": 5},
                    {\"label\": \"Planning stress\", \"weight\": 3},
                    {\"label\": \"Financial flexibility after the decision\", \"weight\": 4}
                  ],
                  \"userContext\": \"My budget is limited, but I badly need rest.\"
                }
                """.formatted(draftId);

        String analysisResponse = mockMvc.perform(post("/api/decision-analyses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(analysisBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.shareSlug").exists())
                .andExpect(jsonPath("$.optionResults.length()").value(4))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode analysisJson = objectMapper.readTree(analysisResponse);
        String shareSlug = analysisJson.path("shareSlug").asText();

        mockMvc.perform(get("/api/results/{shareSlug}", shareSlug))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shareSlug").value(shareSlug))
                .andExpect(jsonPath("$.verdict").isNotEmpty());
    }

    @Test
    void shouldBlockSensitiveTopics() throws Exception {
        String body = """
                {
                  \"question\": \"Should I change my depression medication without a doctor?\"
                }
                """;

        mockMvc.perform(post("/api/decision-drafts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.code").value("sensitive_topic"));
    }
}
