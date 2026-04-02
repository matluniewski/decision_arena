package com.decisionarena.ai;

import com.decisionarena.domain.DecisionAnalysisRequest;

final class DecisionPrompts {

    private DecisionPrompts() {
    }

    static String decisionFramePrompt(String question, String locale) {
        return """
                You are a structured decision framing assistant for everyday personal decisions.
                Return JSON only that matches the expected schema.
                Return every user-facing string in %s.

                Your job:
                - Rewrite the question into one clear, neutral decision question.
                - Propose 2 to 4 realistic, distinct options.
                - Propose 4 to 6 evaluation criteria that a normal person would actually use to compare those options.
                - Surface 2 to 4 high-impact unknowns or clarifying questions.

                Quality rules:
                - Prefer concrete and mutually distinct options, not cosmetic rewordings of the same idea.
                - Include a "wait", "postpone", or "do nothing for now" option when that is a realistic path.
                - Criteria should be specific, non-overlapping, and useful for tradeoff analysis.
                - Missing info should focus on the few facts most likely to change the decision.
                - Keep labels concise and natural. Do not use markdown, bullets, or numbering inside strings.
                - Do not sound clinical, legal, or therapeutic.

                Decision question:
                %s
                """.formatted(languageName(locale), question);
    }

    static String decisionAnalysisPrompt(DecisionAnalysisRequest request, String payload) {
        return """
                You are analyzing a structured personal decision for an everyday user.
                Return JSON only that matches the expected schema.
                Return every user-facing string in %s.
                Confidence must be exactly one of: High, Medium, Low.

                Goal:
                - Compare the provided options using the provided criteria and weights.
                - Explain tradeoffs clearly.
                - Keep the verdict useful but cautious.

                Decision quality rules:
                - Base the analysis only on the provided payload and clearly implied common-sense assumptions.
                - Do not invent facts, prices, timelines, or personal context.
                - Confidence reflects how complete and consistent the available information is, not certainty about the future.
                - If key unknowns remain, lower the confidence instead of pretending certainty.
                - The verdict should read like a practical recommendation, not an absolute command.
                - Prefer language such as "leans toward", "looks stronger", "seems safer", or "based on the current inputs".
                - Pros, cons, and risks should be concrete, non-redundant, and specific to that option.
                - Each option summary should explain the option's overall shape in one compact paragraph.
                - Criterion reasoning should explain why the score fits that criterion.
                - Weighted scores must be consistent with the scores and weights you assign.
                - Unknowns should include only the few factors most likely to change the ranking.
                - Do not use markdown, bullets, or numbering inside strings.

                Decision payload:
                %s
                """.formatted(languageName(request.locale()), payload);
    }

    static String openAiSystemPrompt() {
        return """
                Return valid JSON only.
                Follow the requested schema exactly.
                Be concrete, comparative, and cautious.
                Treat confidence as information quality, not certainty.
                Avoid absolute or overconfident verdicts.
                """;
    }

    private static String languageName(String locale) {
        return "pl".equalsIgnoreCase(locale) ? "Polish" : "English";
    }
}
