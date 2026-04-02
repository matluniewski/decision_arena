import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { AnalysisResponse, CriterionScore, OptionAnalysis } from "../lib/types";
import { useI18n } from "../i18n/I18nProvider";
import { cx } from "../lib/cx";
import * as primitives from "../styles/primitives.css";
import * as styles from "./ResultReplayView.css";

type ResultReplayViewProps = {
  result: AnalysisResponse;
};

type ReplayStep = {
  id: string;
  label: string;
};

function bandForScore(score: number) {
  if (score >= 75) return "Strong";
  if (score >= 60) return "Balanced";
  return "Fragile";
}

function topCriteria(option: OptionAnalysis) {
  return [...option.criterionScores]
    .sort((left, right) => right.score * right.weight - left.score * left.weight)
    .slice(0, 2);
}

export function ResultReplayView({ result }: ResultReplayViewProps) {
  const { locale, messages } = useI18n();
  const sortedOptions = useMemo(
    () => [...result.optionResults].sort((a, b) => b.weightedScore - a.weightedScore),
    [result.optionResults]
  );
  const winner = sortedOptions[0];
  const [expandedOption, setExpandedOption] = useState(winner?.optionLabel ?? "");
  const [criteriaOption, setCriteriaOption] = useState("");
  const [activeSection, setActiveSection] = useState("intro");

  if (!winner) {
    return null;
  }

  const confidenceLabel =
    locale === "pl"
      ? result.confidence === "High"
        ? "Wysoka"
        : result.confidence === "Low"
          ? "Niska"
          : "Średnia"
      : result.confidence;

  const bandLabel = (score: number) => {
    const band = bandForScore(score);
    if (band === "Strong") return messages.resultView.strong;
    if (band === "Balanced") return messages.resultView.balanced;
    return messages.resultView.fragile;
  };

  const replayCopy =
    locale === "pl"
      ? {
          introLabel: "Decision Replay",
          introTitle: "Najpierw sygnał, potem pełny obraz.",
          introDescription:
            "Najpierw zobacz kierunek tej decyzji, potem najważniejsze kompromisy, a dopiero niżej pełne porównanie wszystkich opcji.",
          spotlightLabel: "Aktualnie prowadzi",
          whyTitle: "Dlaczego ta opcja prowadzi",
          whyDescription:
            "Ta sekcja pokazuje, co najmocniej podniosło wynik lidera i gdzie ukryty jest główny koszt decyzji.",
          strongestCriteria: "Najmocniejsze kryteria",
          strongestPros: "Co realnie działa na korzyść tej opcji",
          keyTradeoff: "Najważniejszy kompromis",
          rankingTitle: "Pełny ranking opcji",
          rankingDescription: "Dopiero tutaj pojawia się pełne zestawienie wszystkich wariantów.",
          detailsTitle: "Rozbij to na części",
          detailsDescription:
            "Jeśli chcesz przejść z narracji do analizy, rozwiń konkretną opcję i zobacz jej plusy, minusy, ryzyka i scoring.",
          optionSnapshot: "Szybki obraz opcji",
          previewPros: "Najmocniejsze plusy",
          previewCons: "Co ciągnie ją w dół",
          previewRisks: "Ryzyko, które może odwrócić wynik",
          openCriteria: "Pokaż breakdown kryteriów",
          closeCriteria: "Ukryj breakdown kryteriów",
          criteriaLabel: "kryteria",
          quickCounts: (option: OptionAnalysis) =>
            `${option.pros.length} plusy | ${option.cons.length} minusy | ${option.risks.length} ryzyka`,
          unknownsTitle: "Co jeszcze może zmienić wynik",
          finalTitle: "Finalny werdykt",
          finalDescription:
            "Traktuj ten wynik jako uporządkowaną mapę kompromisów. Jeśli któraś z niewiadomych się zmieni, wynik też może się przesunąć.",
          bestCriteriaMeta: (criterion: CriterionScore) => `${criterion.score}/10 | waga ${criterion.weight}`,
          emptyUnknowns: "Na tym etapie system nie wskazał dodatkowych niewiadomych.",
          rerun: "Nowa analiza",
          railLabel: "Etapy replay",
          railSteps: [
            { id: "intro", label: "Start" },
            { id: "why", label: "Dlaczego" },
            { id: "ranking", label: "Ranking" },
            { id: "details", label: "Szczegóły" },
            { id: "unknowns", label: "Niewiadome" },
            { id: "verdict", label: "Werdykt" }
          ] as ReplayStep[]
        }
      : {
          introLabel: "Decision Replay",
          introTitle: "Signal first, full picture after.",
          introDescription:
            "Start with the direction of the decision, then the key tradeoffs, and only then the full comparison of every option.",
          spotlightLabel: "Currently leading",
          whyTitle: "Why this option leads",
          whyDescription:
            "This section shows what pushed the leading option up and where the main tradeoff sits.",
          strongestCriteria: "Strongest criteria",
          strongestPros: "What works in this option's favor",
          keyTradeoff: "Key tradeoff",
          rankingTitle: "Full option ranking",
          rankingDescription: "This is where the complete comparison of all options appears.",
          detailsTitle: "Break it down",
          detailsDescription:
            "If you want to move from narrative to analysis, expand an option and inspect the pros, cons, risks, and score logic.",
          optionSnapshot: "Quick option snapshot",
          previewPros: "Strongest upsides",
          previewCons: "What drags it down",
          previewRisks: "Risk that could flip the result",
          openCriteria: "Show criteria breakdown",
          closeCriteria: "Hide criteria breakdown",
          criteriaLabel: "criteria",
          quickCounts: (option: OptionAnalysis) =>
            `${option.pros.length} pros | ${option.cons.length} cons | ${option.risks.length} risks`,
          unknownsTitle: "What could still change this result",
          finalTitle: "Final verdict",
          finalDescription:
            "Treat this as a structured map of tradeoffs. If one of the unknowns changes, the verdict can shift too.",
          bestCriteriaMeta: (criterion: CriterionScore) => `${criterion.score}/10 | weight ${criterion.weight}`,
          emptyUnknowns: "No additional unknowns were flagged at this stage.",
          rerun: "Run another decision",
          railLabel: "Replay steps",
          railSteps: [
            { id: "intro", label: "Intro" },
            { id: "why", label: "Why" },
            { id: "ranking", label: "Ranking" },
            { id: "details", label: "Details" },
            { id: "unknowns", label: "Unknowns" },
            { id: "verdict", label: "Verdict" }
          ] as ReplayStep[]
        };

  useEffect(() => {
    const sectionIds = replayCopy.railSteps.map((step) => step.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const probeLine = window.innerWidth <= 980 ? 144 : 180;
      let currentSection = sectionIds[0];

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= probeLine && rect.bottom > probeLine) {
          currentSection = section.id;
          break;
        }

        if (rect.top > probeLine) {
          break;
        }

        currentSection = section.id;
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [locale]);

  const leadingCriteria = topCriteria(winner);
  const leadingPros = winner.pros.slice(0, 2);
  const leadingTradeoff = winner.cons[0] ?? winner.risks[0] ?? winner.summary;

  const toggleOption = (optionLabel: string) => {
    setExpandedOption((current) => {
      const next = current === optionLabel ? "" : optionLabel;

      if (next !== optionLabel) {
        setCriteriaOption((currentCriteria) => (currentCriteria === optionLabel ? "" : currentCriteria));
      }

      return next;
    });
  };

  const toggleCriteria = (optionLabel: string) => {
    setCriteriaOption((current) => (current === optionLabel ? "" : optionLabel));
  };

  return (
    <div className={styles.replayLayout}>
      <aside className={styles.railShell}>
        <nav className={styles.railNav} aria-label={replayCopy.railLabel}>
          <span className={styles.railTitle}>{replayCopy.railLabel}</span>
          <div className={styles.railLinks}>
            {replayCopy.railSteps.map((step, index) => (
              <a
                key={step.id}
                href={`#${step.id}`}
                className={cx(styles.railLink, activeSection === step.id && styles.railLinkActive)}
              >
                <span className={styles.railIndex}>{`0${index + 1}`}</span>
                <span>{step.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>

      <div className={styles.resultGrid}>
        <section id="intro" className={cx(primitives.panel, styles.replaySection, styles.introPanel)}>
          <div className={styles.introLayout}>
            <div className={styles.introLead}>
              <span className={primitives.sectionLabel}>{replayCopy.introLabel}</span>
              <h2 className={styles.introTitle}>{replayCopy.introTitle}</h2>
              <p className={styles.introQuestion}>{result.normalizedQuestion}</p>
              <p className={styles.introCopy}>{replayCopy.introDescription}</p>
              <div className={styles.introMeta}>
                <span
                  className={cx(
                    styles.confidenceBadge,
                    styles.confidenceTone[result.confidence.toLowerCase() as keyof typeof styles.confidenceTone]
                  )}
                >
                  {messages.resultView.confidence(confidenceLabel)}
                </span>
                <span className={styles.stageBadge}>
                  {messages.resultView.leadingOption(winner.optionLabel, winner.weightedScore)}
                </span>
              </div>
            </div>

            <div className={styles.spotlightCard}>
              <div className={styles.spotlightHeader}>
                <div className={styles.spotlightLabel}>
                  <span className={primitives.sectionLabel}>{replayCopy.spotlightLabel}</span>
                  <h3 className={styles.spotlightTitle}>{winner.optionLabel}</h3>
                </div>
                <div className={styles.scorePill}>
                  {winner.weightedScore}
                  {messages.resultView.scoreOutOf}
                </div>
              </div>
              <p className={styles.spotlightSummary}>{winner.summary}</p>
            </div>
          </div>
        </section>

        <section id="why" className={cx(primitives.panel, styles.replaySection)}>
          <div className={styles.sectionHeader}>
            <span className={primitives.sectionLabel}>{replayCopy.whyTitle}</span>
            <p className={styles.sectionDescription}>{replayCopy.whyDescription}</p>
          </div>

          <div className={styles.spotlightStats}>
            <article className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{messages.resultView.leadingOptionShort}</span>
              <strong className={styles.summaryValue}>{winner.optionLabel}</strong>
              <span className={styles.summaryMeta}>
                {winner.weightedScore}
                {messages.resultView.scoreOutOf}
              </span>
            </article>

            <article className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{messages.resultView.confidenceShort}</span>
              <strong className={styles.summaryValue}>{confidenceLabel}</strong>
              <span className={styles.summaryMeta}>{bandLabel(winner.weightedScore)}</span>
            </article>

            <article className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{messages.resultView.unknownCount}</span>
              <strong className={styles.summaryValue}>
                {messages.resultView.unknownCountValue(result.unknowns.length)}
              </strong>
              <span className={styles.summaryMeta}>{messages.resultView.unknowns}</span>
            </article>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyColumn}>
              <article className={styles.reasonCard}>
                <div className={styles.reasonHeader}>
                  <h3 className={styles.reasonTitle}>{replayCopy.strongestCriteria}</h3>
                </div>
                <ul className={styles.reasonList}>
                  {leadingCriteria.map((criterion) => (
                    <li key={`${winner.optionLabel}-${criterion.criterion}`} className={styles.reasonListItem}>
                      <p className={styles.reasonLead}>{criterion.criterion}</p>
                      <p className={styles.reasonMeta}>{replayCopy.bestCriteriaMeta(criterion)}</p>
                      <p className={styles.reasonMeta}>{criterion.reasoning}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.reasonCard}>
                <div className={styles.reasonHeader}>
                  <h3 className={styles.reasonTitle}>{replayCopy.strongestPros}</h3>
                </div>
                <ul className={styles.reasonList}>
                  {leadingPros.map((item) => (
                    <li key={item} className={styles.reasonListItem}>
                      <p className={styles.reasonLead}>{item}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className={styles.tradeoffCard}>
              <span className={primitives.sectionLabel}>{replayCopy.keyTradeoff}</span>
              <h3 className={styles.tradeoffTitle}>{winner.optionLabel}</h3>
              <p className={styles.tradeoffCopy}>{leadingTradeoff}</p>
            </article>
          </div>
        </section>

        <section id="ranking" className={cx(primitives.panel, styles.replaySection)}>
          <div className={styles.sectionHeader}>
            <span className={primitives.sectionLabel}>{replayCopy.rankingTitle}</span>
            <p className={styles.sectionDescription}>{replayCopy.rankingDescription}</p>
          </div>

          <div className={styles.scoreboard}>
            {sortedOptions.map((option, index) => (
              <div key={option.optionLabel} className={styles.scoreRow}>
                <div className={styles.scoreRowMain}>
                  <span className={styles.rankBadge}>{messages.resultView.rankLabel(index + 1)}</span>
                  <div className={styles.scoreRowCopy}>
                    <p className={styles.scoreRowTitle}>{option.optionLabel}</p>
                    <p className={styles.scoreSummary}>{option.summary}</p>
                  </div>
                </div>

                <div className={styles.scoreRowAside}>
                  <div className={styles.scoreBadge}>
                    <span className={styles.scoreBadgeValue}>{option.weightedScore}</span>
                    <small>{bandLabel(option.weightedScore)}</small>
                  </div>
                  <div className={styles.scoreTrack} aria-hidden="true">
                    <span className={styles.scoreTrackFill} style={{ width: `${option.weightedScore}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="details" className={cx(primitives.panel, styles.replaySection)}>
          <div className={styles.sectionHeader}>
            <span className={primitives.sectionLabel}>{replayCopy.detailsTitle}</span>
            <p className={styles.sectionDescription}>{replayCopy.detailsDescription}</p>
          </div>

          <div className={styles.detailsStack}>
            {sortedOptions.map((option, index) => {
              const expanded = expandedOption === option.optionLabel;
              const criteriaExpanded = criteriaOption === option.optionLabel;
              const previewPros = option.pros.slice(0, 2);
              const previewCons = option.cons.slice(0, 2);
              const previewRisk = option.risks[0];

              return (
                <article key={option.optionLabel} className={styles.accordion}>
                  <button
                    className={styles.accordionTrigger}
                    type="button"
                    onClick={() => toggleOption(option.optionLabel)}
                    aria-expanded={expanded}
                  >
                    <div className={styles.accordionTriggerMain}>
                      <span className={styles.rankBadge}>{messages.resultView.rankLabel(index + 1)}</span>
                      <h3 className={styles.scoreRowTitle}>{option.optionLabel}</h3>
                      <p className={styles.accordionSummary}>{option.summary}</p>
                      <p className={styles.accordionMeta}>{replayCopy.quickCounts(option)}</p>
                    </div>
                    <div className={styles.scoreBadge}>
                      <span className={styles.scoreBadgeValue}>
                        {option.weightedScore}
                        {messages.resultView.scoreOutOf}
                      </span>
                      <span className={styles.accordionChevron}>{expanded ? "-" : "+"}</span>
                    </div>
                  </button>

                  {expanded ? (
                    <div className={styles.accordionBody}>
                      {option.note ? <p className={styles.sectionDescription}>{option.note}</p> : null}

                      <div className={styles.detailIntro}>
                        <span className={primitives.sectionLabel}>{replayCopy.optionSnapshot}</span>
                        <p className={styles.detailIntroCopy}>
                          {messages.resultView.leadingOption(option.optionLabel, option.weightedScore)}
                        </p>
                      </div>

                      <div className={styles.listGrid}>
                        <div className={styles.listBlockCompact}>
                          <h4 className={styles.listTitle}>{replayCopy.previewPros}</h4>
                          <ul className={styles.bulletList}>
                            {previewPros.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.listBlockCompact}>
                          <h4 className={styles.listTitle}>{replayCopy.previewCons}</h4>
                          <ul className={styles.bulletList}>
                            {previewCons.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={styles.riskCallout}>
                        <span className={primitives.sectionLabel}>{replayCopy.previewRisks}</span>
                        <p className={styles.riskCalloutText}>{previewRisk ?? option.summary}</p>
                      </div>

                      <div className={styles.criteriaSection}>
                        <button
                          type="button"
                          className={styles.criteriaToggle}
                          onClick={() => toggleCriteria(option.optionLabel)}
                          aria-expanded={criteriaExpanded}
                        >
                          <span>{criteriaExpanded ? replayCopy.closeCriteria : replayCopy.openCriteria}</span>
                          <span className={styles.criteriaToggleMeta}>
                            {option.criterionScores.length} {replayCopy.criteriaLabel}
                          </span>
                        </button>

                        {criteriaExpanded ? (
                          <div className={styles.criteriaTable}>
                            {option.criterionScores.map((criterion) => (
                              <div key={`${option.optionLabel}-${criterion.criterion}`} className={styles.criterionRow}>
                                <div className={styles.criterionCopy}>
                                  <strong>{criterion.criterion}</strong>
                                  <p className={styles.criterionReasoning}>{criterion.reasoning}</p>
                                </div>
                                <div className={styles.criterionAside}>
                                  <div className={styles.criterionMetrics}>
                                    <span>{criterion.score}/10</span>
                                    <small>{messages.resultView.weightShort(criterion.weight)}</small>
                                  </div>
                                  <div className={styles.criterionTrack} aria-hidden="true">
                                    <span className={styles.criterionTrackFill} style={{ width: `${criterion.score * 10}%` }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="unknowns" className={cx(primitives.panel, styles.replaySection)}>
          <div className={styles.sectionHeader}>
            <span className={primitives.sectionLabel}>{replayCopy.unknownsTitle}</span>
            <p className={styles.sectionDescription}>{messages.resultView.unknownsDescription}</p>
          </div>

          {result.unknowns.length > 0 ? (
            <ul className={styles.unknownGrid}>
              {result.unknowns.map((unknown) => (
                <li key={unknown} className={styles.unknownCard}>
                  {unknown}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.sectionDescription}>{replayCopy.emptyUnknowns}</p>
          )}
        </section>

        <section id="verdict" className={cx(primitives.panel, styles.replaySection)}>
          <div className={styles.sectionHeader}>
            <span className={primitives.sectionLabel}>{replayCopy.finalTitle}</span>
            <p className={styles.sectionDescription}>{replayCopy.finalDescription}</p>
          </div>

          <div className={styles.verdictCallout}>
            <p className={styles.verdictText}>{result.verdict}</p>
            <p className={styles.verdictSupport}>
              {messages.resultView.confidence(confidenceLabel)} | {messages.resultView.leadingOption(winner.optionLabel, winner.weightedScore)}
            </p>
            <div className={styles.finalActions}>
              <Link className={primitives.primaryButton} to="/">
                {replayCopy.rerun}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
