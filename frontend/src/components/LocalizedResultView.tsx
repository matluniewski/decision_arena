import type { AnalysisResponse } from "../lib/types";
import { useI18n } from "../i18n/I18nProvider";

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
    <div className="result-grid">
      <section className="panel verdict-panel">
        <div className="panel-header">
          <span className="panel-label">{messages.resultView.verdict}</span>
          <span className={`confidence confidence-${result.confidence.toLowerCase()}`}>
            {messages.resultView.confidence(confidenceLabel)}
          </span>
        </div>
        <h2>{result.normalizedQuestion}</h2>
        <p className="verdict-copy">{result.verdict}</p>
        <div className="winner-chip">{messages.resultView.leadingOption(winner.optionLabel, winner.weightedScore)}</div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <span className="panel-label">{messages.resultView.scoreboard}</span>
        </div>
        <div className="scoreboard">
          {sortedOptions.map((option) => (
            <div key={option.optionLabel} className="score-row">
              <div>
                <strong>{option.optionLabel}</strong>
                <p>{option.summary}</p>
              </div>
              <div className="score-badge">
                <span>{option.weightedScore}</span>
                <small>{bandLabel(option.weightedScore)}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel comparison-panel">
        <div className="panel-header">
          <span className="panel-label">{messages.resultView.comparison}</span>
        </div>
        <div className="option-grid">
          {sortedOptions.map((option) => (
            <article key={option.optionLabel} className="option-card">
              <div className="option-card-head">
                <h3>{option.optionLabel}</h3>
                <div className="score-pill">{option.weightedScore}/100</div>
              </div>
              {option.note ? <p className="muted-copy">{option.note}</p> : null}

              <div className="card-list-block">
                <h4>{messages.resultView.pros}</h4>
                <ul>
                  {option.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card-list-block">
                <h4>{messages.resultView.cons}</h4>
                <ul>
                  {option.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card-list-block">
                <h4>{messages.resultView.risks}</h4>
                <ul>
                  {option.risks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="criteria-table">
                {option.criterionScores.map((criterion) => (
                  <div key={`${option.optionLabel}-${criterion.criterion}`} className="criterion-row">
                    <div>
                      <strong>{criterion.criterion}</strong>
                      <p>{criterion.reasoning}</p>
                    </div>
                    <div className="criterion-metrics">
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

      <section className="panel">
        <div className="panel-header">
          <span className="panel-label">{messages.resultView.unknowns}</span>
        </div>
        <ul className="unknowns-list">
          {result.unknowns.map((unknown) => (
            <li key={unknown}>{unknown}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
