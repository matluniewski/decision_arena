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
            "przeloz", 8,
            "poczek", 8,
            "cheaper", 9,
            "tansz", 9,
            "krotsz", 9,
            "skip", 10,
            "nie kup", 10,
            "nie jech", 10,
            "now", 3
    );

    @Override
    public DecisionFrame proposeDecisionFrame(String question, String locale) {
        String normalized = normalizeQuestion(question, locale);
        String q = normalized.toLowerCase(Locale.ROOT);
        boolean polish = isPolish(locale);

        if (containsAny(q, "wakacje", "trip", "travel", "holiday", "vacation", "japon")) {
            return new DecisionFrame(
                    normalized,
                    polish
                            ? List.of(
                            new DecisionOptionInput("Jechać w tym roku", "Zrealizować pełny wyjazd w pierwotnym terminie."),
                            new DecisionOptionInput("Przełożyć na przyszły rok", "Zachować kierunek, ale dać sobie więcej czasu."),
                            new DecisionOptionInput("Wybrać tańszą lub krótszą wersję", "Obniżyć koszt i skalę planu."),
                            new DecisionOptionInput("Na razie nie jechać", "Zostawić budżet na inne priorytety.")
                    )
                            : List.of(
                            new DecisionOptionInput("Go this year", "Take the full trip on the original timeline."),
                            new DecisionOptionInput("Delay to next year", "Keep the destination but buy more time."),
                            new DecisionOptionInput("Choose a cheaper or shorter version", "Reduce the cost and scope."),
                            new DecisionOptionInput("Do not go now", "Keep the budget for other priorities.")
                    ),
                    polish
                            ? List.of(
                            new CriterionInput("Całkowity koszt", 5),
                            new CriterionInput("Potrzeba odpoczynku", 4),
                            new CriterionInput("Wartość doświadczenia", 5),
                            new CriterionInput("Stres organizacyjny", 3),
                            new CriterionInput("Elastyczność finansowa po decyzji", 4)
                    )
                            : List.of(
                            new CriterionInput("Total cost", 5),
                            new CriterionInput("Need for rest", 4),
                            new CriterionInput("Experience value", 5),
                            new CriterionInput("Planning stress", 3),
                            new CriterionInput("Financial flexibility after the decision", 4)
                    ),
                    polish
                            ? List.of(
                            "Jaki jest realny budżet bez wchodzenia w dług?",
                            "Ile wolnego czasu możesz wykorzystać bez zwiększania stresu?",
                            "Czy istnieje tańsza wersja tego samego planu?"
                    )
                            : List.of(
                            "What is the real budget without debt?",
                            "How much time off can you use without adding stress?",
                            "Is there a cheaper version of the same plan?"
                    )
            );
        }

        if (containsAny(q, "buy", "kup", "laptop", "car", "samoch", "mieszk", "apartment")) {
            return new DecisionFrame(
                    normalized,
                    polish
                            ? List.of(
                            new DecisionOptionInput("Kupić teraz", "Zdecydować się na zakup od razu."),
                            new DecisionOptionInput("Poczekać i zebrać więcej danych", "Odłożyć decyzję o kilka tygodni lub miesięcy."),
                            new DecisionOptionInput("Wybrać tańszą lub mniejszą wersję", "Obniżyć koszt bez rezygnacji z głównego celu."),
                            new DecisionOptionInput("Na razie nie kupować", "Zostawić środki na inne priorytety.")
                    )
                            : List.of(
                            new DecisionOptionInput("Buy now", "Commit to the purchase immediately."),
                            new DecisionOptionInput("Wait and gather more data", "Delay the decision for a few weeks or months."),
                            new DecisionOptionInput("Choose a cheaper or smaller version", "Reduce cost while keeping the main goal."),
                            new DecisionOptionInput("Do not buy now", "Keep the money available for other priorities.")
                    ),
                    polish
                            ? List.of(
                            new CriterionInput("Wpływ na budżet", 5),
                            new CriterionInput("Pilność potrzeby", 4),
                            new CriterionInput("Wartość długoterminowa", 5),
                            new CriterionInput("Ryzyko złego zakupu", 3),
                            new CriterionInput("Alternatywy bez kupowania", 3)
                    )
                            : List.of(
                            new CriterionInput("Budget impact", 5),
                            new CriterionInput("Need urgency", 4),
                            new CriterionInput("Long-term value", 5),
                            new CriterionInput("Risk of a bad purchase", 3),
                            new CriterionInput("Alternatives without buying", 3)
                    ),
                    polish
                            ? List.of(
                            "Czy to realna potrzeba, czy głównie impuls?",
                            "Jak długo ta decyzja będzie dawać konkretną wartość?",
                            "Jakie są realistyczne alternatywy na najbliższe 3 miesiące?"
                    )
                            : List.of(
                            "Is this a real need or mainly an impulse?",
                            "How long will this choice create tangible value?",
                            "What are the realistic alternatives for the next 3 months?"
                    )
            );
        }

        return new DecisionFrame(
                normalized,
                polish
                        ? List.of(
                        new DecisionOptionInput("Zrobić to teraz", "Wykonać pełny ruch od razu."),
                        new DecisionOptionInput("Odłożyć decyzję", "Kupić sobie czas na dane i spokojniejsze myślenie."),
                        new DecisionOptionInput("Zrobić mniejszy test", "Sprawdzić kierunek w ograniczonej skali."),
                        new DecisionOptionInput("Na razie tego nie robić", "Świadomie wybrać bezruch.")
                )
                        : List.of(
                        new DecisionOptionInput("Do it now", "Take the full step immediately."),
                        new DecisionOptionInput("Delay the decision", "Buy time for data and calmer thinking."),
                        new DecisionOptionInput("Run a smaller test", "Try the direction in a limited scope."),
                        new DecisionOptionInput("Do not do it now", "Choose inaction on purpose.")
                ),
                polish
                        ? List.of(
                        new CriterionInput("Koszt", 4),
                        new CriterionInput("Stres i wysiłek", 4),
                        new CriterionInput("Potencjalny zysk", 5),
                        new CriterionInput("Odwracalność", 3),
                        new CriterionInput("Dopasowanie do obecnego etapu życia", 5)
                )
                        : List.of(
                        new CriterionInput("Cost", 4),
                        new CriterionInput("Stress and effort", 4),
                        new CriterionInput("Potential upside", 5),
                        new CriterionInput("Reversibility", 3),
                        new CriterionInput("Fit for your current season of life", 5)
                ),
                polish
                        ? List.of(
                        "Jak wygląda najgorszy realistyczny scenariusz?",
                        "Co tracisz, jeśli poczekasz miesiąc?",
                        "Czy da się sprawdzić ten kierunek mniejszym eksperymentem?"
                )
                        : List.of(
                        "What does the worst realistic scenario look like?",
                        "What do you lose if you wait one month?",
                        "Can you test the direction with a smaller experiment?"
                )
        );
    }

    @Override
    public DecisionAnalysisResult analyzeDecision(DecisionAnalysisRequest request) {
        boolean polish = isPolish(request.locale());
        List<OptionAnalysis> analyses = request.options().stream()
                .map(option -> buildOptionAnalysis(request, option))
                .toList();

        OptionAnalysis winner = analyses.stream()
                .max(Comparator.comparingInt(OptionAnalysis::weightedScore))
                .orElseThrow();

        int scoreSpread = analyses.stream().mapToInt(OptionAnalysis::weightedScore).max().orElse(0)
                - analyses.stream().mapToInt(OptionAnalysis::weightedScore).min().orElse(0);

        String confidence = scoreSpread >= 18 ? "High" : scoreSpread >= 10 ? "Medium" : "Low";
        String verdict = polish
                ? winner.optionLabel() + " ma obecnie najmocniejszy profil przy wybranych wagach i założeniach."
                : winner.optionLabel() + " currently has the strongest profile for the selected weights and assumptions.";

        List<String> unknowns = new ArrayList<>(request.draftMissingInfo());
        if (request.userContext() == null || request.userContext().isBlank()) {
            unknowns.add(polish
                    ? "Osobisty kontekst jest nadal zbyt ogólny, więc rekomendacja ma szeroki, a nie mocno dopasowany charakter."
                    : "Personal context is still thin, so the recommendation is broad rather than highly tailored.");
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
        boolean polish = isPolish(request.locale());
        List<CriterionScore> criterionScores = request.criteria().stream()
                .map(criterion -> scoreCriterion(request.normalizedQuestion(), option, criterion, polish))
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
                .map(score -> polish
                        ? "Mocna strona: " + score.criterion().toLowerCase(Locale.ROOT) + "."
                        : "Strong on: " + score.criterion().toLowerCase(Locale.ROOT) + ".")
                .toList();
        List<String> cons = weakest.stream()
                .map(score -> polish
                        ? "Słabszy punkt: " + score.criterion().toLowerCase(Locale.ROOT) + "."
                        : "Weaker on: " + score.criterion().toLowerCase(Locale.ROOT) + ".")
                .toList();
        List<String> risks = weakest.stream()
                .map(score -> polish
                        ? "Ryzyko, że ta opcja zawiedzie w obszarze: " + score.criterion().toLowerCase(Locale.ROOT) + "."
                        : "Risk that this option fails on: " + score.criterion().toLowerCase(Locale.ROOT) + ".")
                .distinct()
                .toList();

        String summary = polish
                ? weighted >= 75
                ? "Ta opcja wygląda mocno i dobrze pasuje do obecnych priorytetów."
                : weighted >= 60
                ? "Ta opcja jest sensowna, ale nadal zależy od kilku otwartych pytań."
                : "Ta opcja jest możliwa, ale obecnie przegrywa z bardziej zrównoważonymi alternatywami."
                : weighted >= 75
                ? "This option looks strong and aligned with the current priorities."
                : weighted >= 60
                ? "This option is viable, but still depends on a few open questions."
                : "This option is possible, but it currently loses to more balanced alternatives.";

        return new OptionAnalysis(option.label(), option.note(), pros, cons, risks, criterionScores, weighted, summary);
    }

    private CriterionScore scoreCriterion(String question, DecisionOptionInput option, CriterionInput criterion, boolean polish) {
        String optionKey = ascii(option.label()).toLowerCase(Locale.ROOT);
        String criterionKey = ascii(criterion.label()).toLowerCase(Locale.ROOT);
        int base = 4 + Math.floorMod((question + "|" + option.label() + "|" + criterion.label()).hashCode(), 5);

        if (criterionKey.contains("cost") || criterionKey.contains("budget") || criterionKey.contains("koszt") || criterionKey.contains("budzet")) {
            base = scoreByKeyword(optionKey, COST_FRIENDLY, 5);
        } else if (criterionKey.contains("rest") || criterionKey.contains("experience") || criterionKey.contains("upside")
                || criterionKey.contains("odpocz") || criterionKey.contains("doswiadc") || criterionKey.contains("zysk")) {
            if (matches(optionKey, "now", "go this year", "buy now", "do it now", "w tym roku", "kupic teraz", "zrobic to teraz", "jechac w tym roku")) {
                base = 9;
            } else if (matches(optionKey, "test", "cheaper", "shorter", "tansz", "krotsz", "mniejszy test")) {
                base = 7;
            } else {
                base = 4;
            }
        } else if (criterionKey.contains("stress") || criterionKey.contains("risk") || criterionKey.contains("stres") || criterionKey.contains("ryzyk")) {
            if (matches(optionKey, "delay", "do not", "skip", "przeloz", "poczek", "na razie nie")) {
                base = 8;
            } else {
                base = 5;
            }
        } else if (criterionKey.contains("reversibility") || criterionKey.contains("flexibility")
                || criterionKey.contains("odwracal") || criterionKey.contains("elastyczn")) {
            if (matches(optionKey, "test", "cheaper", "shorter", "delay", "tansz", "krotsz", "przeloz", "mniejszy test")) {
                base = 8;
            } else {
                base = 5;
            }
        }

        base = Math.max(1, Math.min(10, base));
        return new CriterionScore(criterion.label(), criterion.weight(), base, reasoningFor(base, polish));
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

    private String normalizeQuestion(String question, String locale) {
        String trimmed = question.trim().replaceAll("\\s+", " ");
        if (trimmed.isEmpty()) {
            return isPolish(locale) ? "Czy to jest dobry ruch na ten moment?" : "Is this a good move right now?";
        }
        return Character.toUpperCase(trimmed.charAt(0)) + trimmed.substring(1);
    }

    private String reasoningFor(int score, boolean polish) {
        if (score >= 8) {
            return polish
                    ? "Ta opcja wygląda mocno przy tym kryterium."
                    : "This option looks strong on that criterion.";
        }
        if (score >= 6) {
            return polish
                    ? "To kryterium wypada poprawnie, ale nie jest dominujące."
                    : "This criterion is acceptable, but not dominant.";
        }
        return polish
                ? "To kryterium osłabia tę opcję względem alternatyw."
                : "This criterion weakens the option against the alternatives.";
    }

    private String ascii(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
    }

    private boolean isPolish(String locale) {
        return "pl".equalsIgnoreCase(locale);
    }
}
