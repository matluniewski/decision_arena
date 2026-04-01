import type { AnalysisResponse } from "../lib/types";

type ResultViewProps = {
  result: AnalysisResponse;
};

function bandForScore(score: number) {
  if (score >= 75) return "Strong";
  if (score >= 60) return "Balanced";
  return "Fragile";
}

export function ResultView({ result }: ResultViewProps) {
  const sortedOptions = [...result.optionResults].sort((a, b) => b.weightedScore - a.weightedScore);
  const winner = sortedOptions[0];

  return (
    <div className="result-grid">
      <section className="panel verdict-panel">
        <div className="panel-header">
          <span className="panel-label">Verdict</span>
          <span className={`confidence confidence-${result.confidence.toLowerCase()}`}>{result.confidence} confidence</span>
        </div>
        <h2>{result.normalizedQuestion}</h2>
        <p className="verdict-copy">{result.verdict}</p>
        <div className="winner-chip">
          Leading option: <strong>{winner.optionLabel}</strong> with {winner.weightedScore}/100
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <span className="panel-label">Scoreboard</span>
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
                <small>{bandForScore(option.weightedScore)}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel comparison-panel">
        <div className="panel-header">
          <span className="panel-label">Option comparison</span>
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
                <h4>Pros</h4>
                <ul>
                  {option.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card-list-block">
                <h4>Cons</h4>
                <ul>
                  {option.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card-list-block">
                <h4>Risks</h4>
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
                      <small>w{criterion.weight}</small>
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
          <span className="panel-label">Unknowns</span>
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
