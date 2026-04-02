"use client";

import type { AnalysisResponse } from "../../../lib/types";
import { useI18n } from "../../../i18n/I18nProvider";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./LocalizedResultView.css";

type LocalizedResultViewProps = {
  result: AnalysisResponse;
};

function bandForScore(score: number) {
  if (score >= 75) return "Strong";
  if (score >= 60) return "Balanced";
  return "Fragile";
}

export function LocalizedResultView({ result }: LocalizedResultViewProps) {
  const { locale, messages } = useI18n();
  const sortedOptions = [...result.optionResults].sort((a, b) => b.weightedScore - a.weightedScore);
  const winner = sortedOptions[0];

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

  return (
    <div className={styles.resultGrid}>
      <section className={cx(primitives.panel, styles.verdictPanel)}>
        <div className={styles.panelHeader}>
          <span className={primitives.sectionLabel}>{messages.resultView.verdict}</span>
          <span className={cx(styles.confidenceBadge, styles.confidenceTone[result.confidence.toLowerCase() as keyof typeof styles.confidenceTone])}>
            {messages.resultView.confidence(confidenceLabel)}
          </span>
        </div>
        <h2 className={styles.verdictTitle}>{result.normalizedQuestion}</h2>
        <p className={styles.verdictCopy}>{result.verdict}</p>
        <div className={styles.winnerChip}>{messages.resultView.leadingOption(winner.optionLabel, winner.weightedScore)}</div>
      </section>

      <section className={primitives.panel}>
        <div className={styles.panelHeader}>
          <span className={primitives.sectionLabel}>{messages.resultView.scoreboard}</span>
        </div>
        <div className={styles.scoreboard}>
          {sortedOptions.map((option) => (
            <div key={option.optionLabel} className={styles.scoreRow}>
              <div>
                <strong>{option.optionLabel}</strong>
                <p className={styles.scoreSummary}>{option.summary}</p>
              </div>
              <div className={styles.scoreBadge}>
                <span className={styles.scoreBadgeValue}>{option.weightedScore}</span>
                <small>{bandLabel(option.weightedScore)}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={cx(primitives.panel, styles.comparisonPanel)}>
        <div className={styles.panelHeader}>
          <span className={primitives.sectionLabel}>{messages.resultView.comparison}</span>
        </div>
        <div className={styles.optionGrid}>
          {sortedOptions.map((option) => (
            <article key={option.optionLabel} className={styles.optionCard}>
              <div className={styles.optionCardHead}>
                <h3 className={styles.optionTitle}>{option.optionLabel}</h3>
                <div className={styles.scorePill}>{option.weightedScore}/100</div>
              </div>
              {option.note ? <p className={styles.note}>{option.note}</p> : null}

              <div className={styles.listBlock}>
                <h4 className={styles.listTitle}>{messages.resultView.pros}</h4>
                <ul className={styles.bulletList}>
                  {option.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.listBlock}>
                <h4 className={styles.listTitle}>{messages.resultView.cons}</h4>
                <ul className={styles.bulletList}>
                  {option.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.listBlock}>
                <h4 className={styles.listTitle}>{messages.resultView.risks}</h4>
                <ul className={styles.bulletList}>
                  {option.risks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.criteriaTable}>
                {option.criterionScores.map((criterion) => (
                  <div key={`${option.optionLabel}-${criterion.criterion}`} className={styles.criterionRow}>
                    <div>
                      <strong>{criterion.criterion}</strong>
                      <p className={styles.criterionReasoning}>{criterion.reasoning}</p>
                    </div>
                    <div className={styles.criterionMetrics}>
                      <span>{criterion.score}/10</span>
                      <small>{messages.resultView.weightShort(criterion.weight)}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={primitives.panel}>
        <div className={styles.panelHeader}>
          <span className={primitives.sectionLabel}>{messages.resultView.unknowns}</span>
        </div>
        <ul className={styles.unknownList}>
          {result.unknowns.map((unknown) => (
            <li key={unknown}>{unknown}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
