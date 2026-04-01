package com.decisionarena.ai;

import com.decisionarena.domain.CriterionInput;
import com.decisionarena.domain.CriterionScore;
import com.decisionarena.domain.DecisionAnalysisRequest;
import com.decisionarena.domain.DecisionAnalysisResult;
import com.decisionarena.domain.DecisionFrame;
import com.decisionarena.domain.DecisionOptionInput;
import com.decisionarena.domain.OptionAnalysis;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@ConditionalOnProperty(name = "app.ai.mode", havingValue = "mock", matchIfMissing = true)
public class MockAiDecisionService implements AiDecisionService {

    private static final Map<String, Integer> COST_FRIENDLY = Map.of(
            "delay", 8,
            "cheaper", 9,
            "skip", 10,
            "now", 3
    );

    @Override
    public DecisionFrame proposeDecisionFrame(String question) {
        String normalized = normalizeQuestion(question);
        String q = normalized.toLowerCase(Locale.ROOT);

        if (containsAny(q, "wakacje", "trip", "travel", "holiday", "vacation", "japon")) {
            return new DecisionFrame(
                    normalized,
                    List.of(
                            new DecisionOptionInput("Go this year", "Take the full trip on the original timeline."),
                            new DecisionOptionInput("Delay to next year", "Keep the destination but buy more time."),
                            new DecisionOptionInput("Choose a cheaper or shorter version", "Reduce the cost and scope."),
                            new DecisionOptionInput("Do not go now", "Keep the budget for other priorities.")
                    ),
                    List.of(
                            new CriterionInput("Total cost", 5),
                            new CriterionInput("Need for rest", 4),
                            new CriterionInput("Experience value", 5),
                            new CriterionInput("Planning stress", 3),
                            new CriterionInput("Financial flexibility after the decision", 4)
                    ),
                    List.of(
                            "What is the real budget without debt?",
                            "How much time off can you use without adding stress?",
                            "Is there a cheaper version of the same plan?"
                    )
            );
        }

        if (containsAny(q, "buy", "kup", "laptop", "car", "samoch", "mieszk", "apartment")) {
            return new DecisionFrame(
                    normalized,
                    List.of(
                            new DecisionOptionInput("Buy now", "Commit to the purchase immediately."),
                            new DecisionOptionInput("Wait and gather more data", "Delay the decision for a few weeks or months."),
                            new DecisionOptionInput("Choose a cheaper or smaller version", "Reduce cost while keeping the main goal."),
                            new DecisionOptionInput("Do not buy now", "Keep the money available for other priorities.")
                    ),
                    List.of(
                            new CriterionInput("Budget impact", 5),
                            new CriterionInput("Need urgency", 4),
                            new CriterionInput("Long-term value", 5),
                            new CriterionInput("Risk of a bad purchase", 3),
                            new CriterionInput("Alternatives without buying", 3)
                    ),
                    List.of(
                            "Is this a real need or mainly an impulse?",
                            "How long will this choice create tangible value?",
                            "What are the realistic alternatives for the next 3 months?"
                    )
            );
        }

        return new DecisionFrame(
                normalized,
                List.of(
                        new DecisionOptionInput("Do it now", "Take the full step immediately."),
                        new DecisionOptionInput("Delay the decision", "Buy time for data and calmer thinking."),
                        new DecisionOptionInput("Run a smaller test", "Try the direction in a limited scope."),
                        new DecisionOptionInput("Do not do it now", "Choose inaction on purpose.")
                ),
                List.of(
                        new CriterionInput("Cost", 4),
                        new CriterionInput("Stress and effort", 4),
                        new CriterionInput("Potential upside", 5),
                        new CriterionInput("Reversibility", 3),
                        new CriterionInput("Fit for your current season of life", 5)
                ),
                List.of(
                        "What does the worst realistic scenario look like?",
                        "What do you lose if you wait one month?",
                        "Can you test the direction with a smaller experiment?"
                )
        );
    }

    @Override
    public DecisionAnalysisResult analyzeDecision(DecisionAnalysisRequest request) {
        List<OptionAnalysis> analyses = request.options().stream()
                .map(option -> buildOptionAnalysis(request, option))
                .toList();

        OptionAnalysis winner = analyses.stream()
                .max(Comparator.comparingInt(OptionAnalysis::weightedScore))
                .orElseThrow();

        int scoreSpread = analyses.stream().mapToInt(OptionAnalysis::weightedScore).max().orElse(0)
                - analyses.stream().mapToInt(OptionAnalysis::weightedScore).min().orElse(0);

        String confidence = scoreSpread >= 18 ? "High" : scoreSpread >= 10 ? "Medium" : "Low";
        String verdict = winner.optionLabel() + " currently has the strongest profile for the selected weights and assumptions.";

        List<String> unknowns = new ArrayList<>(request.draftMissingInfo());
        if (request.userContext() == null || request.userContext().isBlank()) {
            unknowns.add("Personal context is still thin, so the recommendation is broad rather than highly tailored.");
        }

        return new DecisionAnalysisResult(
                request.normalizedQuestion(),
                verdict,
                confidence,
                analyses,
                unknowns.stream().distinct().limit(4).toList()
        );
    }

    private OptionAnalysis buildOptionAnalysis(DecisionAnalysisRequest request, DecisionOptionInput option) {
        List<CriterionScore> criterionScores = request.criteria().stream()
                .map(criterion -> scoreCriterion(request.normalizedQuestion(), option, criterion))
                .toList();

        int totalWeight = criterionScores.stream().mapToInt(CriterionScore::weight).sum();
        int weighted = (int) Math.round(
                criterionScores.stream().mapToInt(score -> score.score() * score.weight()).sum() * 100.0 / (totalWeight * 10.0)
        );

        List<CriterionScore> strongest = criterionScores.stream()
                .sorted(Comparator.comparingInt(CriterionScore::score).reversed())
                .limit(2)
                .toList();
        List<CriterionScore> weakest = criterionScores.stream()
                .sorted(Comparator.comparingInt(CriterionScore::score))
                .limit(2)
                .toList();

        List<String> pros = strongest.stream()
                .map(score -> "Strong on: " + score.criterion().toLowerCase(Locale.ROOT) + ".")
                .toList();
        List<String> cons = weakest.stream()
                .map(score -> "Weaker on: " + score.criterion().toLowerCase(Locale.ROOT) + ".")
                .toList();
        List<String> risks = weakest.stream()
                .map(score -> "Risk that this option fails on: " + score.criterion().toLowerCase(Locale.ROOT) + ".")
                .distinct()
                .toList();

        String summary = weighted >= 75
                ? "This option looks strong and aligned with the current priorities."
                : weighted >= 60
                ? "This option is viable, but still depends on a few open questions."
                : "This option is possible, but it currently loses to more balanced alternatives.";

        return new OptionAnalysis(option.label(), option.note(), pros, cons, risks, criterionScores, weighted, summary);
    }

    private CriterionScore scoreCriterion(String question, DecisionOptionInput option, CriterionInput criterion) {
        String optionKey = ascii(option.label()).toLowerCase(Locale.ROOT);
        String criterionKey = ascii(criterion.label()).toLowerCase(Locale.ROOT);
        int base = 4 + Math.floorMod((question + "|" + option.label() + "|" + criterion.label()).hashCode(), 5);

        if (criterionKey.contains("cost") || criterionKey.contains("budget")) {
            base = scoreByKeyword(optionKey, COST_FRIENDLY, 5);
        } else if (criterionKey.contains("rest") || criterionKey.contains("experience") || criterionKey.contains("upside")) {
            if (matches(optionKey, "now", "go this year", "buy now", "do it now")) {
                base = 9;
            } else if (matches(optionKey, "test", "cheaper", "shorter")) {
                base = 7;
            } else {
                base = 4;
            }
        } else if (criterionKey.contains("stress") || criterionKey.contains("risk")) {
            if (matches(optionKey, "delay", "do not", "skip")) {
                base = 8;
            } else {
                base = 5;
            }
        } else if (criterionKey.contains("reversibility") || criterionKey.contains("flexibility")) {
            if (matches(optionKey, "test", "cheaper", "shorter", "delay")) {
                base = 8;
            } else {
                base = 5;
            }
        }

        base = Math.max(1, Math.min(10, base));
        return new CriterionScore(criterion.label(), criterion.weight(), base, reasoningFor(base));
    }

    private boolean containsAny(String value, String... snippets) {
        for (String snippet : snippets) {
            if (value.contains(snippet)) {
                return true;
            }
        }
        return false;
    }

    private boolean matches(String value, String... snippets) {
        for (String snippet : snippets) {
            if (value.contains(snippet)) {
                return true;
            }
        }
        return false;
    }

    private int scoreByKeyword(String optionKey, Map<String, Integer> mapping, int fallback) {
        return mapping.entrySet().stream()
                .filter(entry -> optionKey.contains(entry.getKey()))
                .map(Map.Entry::getValue)
                .findFirst()
                .orElse(fallback);
    }

    private String normalizeQuestion(String question) {
        String trimmed = question.trim().replaceAll("\\s+", " ");
        if (trimmed.isEmpty()) {
            return "Is this a good move right now?";
        }
        return Character.toUpperCase(trimmed.charAt(0)) + trimmed.substring(1);
    }

    private String reasoningFor(int score) {
        if (score >= 8) {
            return "This option looks strong on that criterion.";
        }
        if (score >= 6) {
            return "This criterion is acceptable, but not dominant.";
        }
        return "This criterion weakens the option against the alternatives.";
    }

    private String ascii(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
    }
}
