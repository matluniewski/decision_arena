import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createAnalysis, getDraft } from "../lib/api";
import type { CriterionInput, DecisionOptionInput } from "../lib/types";
import { AppShell } from "../components/AppShell";

export function BuildPage() {
  const { draftId = "" } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["draft", draftId],
    queryFn: () => getDraft(draftId),
    enabled: Boolean(draftId)
  });

  const [options, setOptions] = useState<DecisionOptionInput[]>([]);
  const [criteria, setCriteria] = useState<CriterionInput[]>([]);
  const [userContext, setUserContext] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (data && !initialized) {
      setOptions(data.proposedOptions);
      setCriteria(data.proposedCriteria);
      setInitialized(true);
    }
  }, [data, initialized]);

  const analyzeMutation = useMutation({
    mutationFn: () => createAnalysis(draftId, options, criteria, userContext),
    onSuccess: (result) => navigate(`/result/${result.shareSlug}`)
  });

  const canSubmit = useMemo(() => {
    return options.every((option) => option.label.trim()) && criteria.every((criterion) => criterion.label.trim());
  }, [criteria, options]);

  if (isLoading) {
    return (
      <AppShell eyebrow="Step 2" title="Preparing your decision frame..." description="Fetching the proposed options and criteria.">
        <section className="panel">Loading draft...</section>
      </AppShell>
    );
  }

  if (error || !data) {
    return (
      <AppShell eyebrow="Step 2" title="Draft unavailable" description="This draft could not be loaded.">
        <section className="panel">
          <p className="error-banner">{error instanceof Error ? error.message : "Draft not found."}</p>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell
      eyebrow="Step 2"
      title="Approve the frame before the verdict is generated."
      description="The system proposed options and criteria. Edit anything that feels wrong, remove weak assumptions, and add a bit of context before analysis."
    >
      <section className="build-layout">
        <article className="panel sticky-panel">
          <span className="panel-label">Decision</span>
          <h2>{data.normalizedQuestion}</h2>
          <div className="card-list-block">
            <h4>Missing information flagged by the system</h4>
            <ul>
              {data.missingInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <label className="input-label" htmlFor="context">
            Extra context
          </label>
          <textarea
            id="context"
            className="support-input"
            value={userContext}
            onChange={(event) => setUserContext(event.target.value)}
            placeholder="Budget, timeline, fear of regret, family constraints, anything important."
          />
          <button className="primary-button full-width" disabled={!canSubmit || analyzeMutation.isPending} onClick={() => analyzeMutation.mutate()} type="button">
            {analyzeMutation.isPending ? "Running analysis..." : "Generate verdict"}
          </button>
          {analyzeMutation.error ? <p className="error-banner">{analyzeMutation.error.message}</p> : null}
        </article>

        <article className="panel">
          <div className="panel-header">
            <span className="panel-label">Options</span>
          </div>
          <div className="editor-grid">
            {options.map((option, index) => (
              <div key={`option-${index}`} className="editor-card">
                <label className="input-label">Option {index + 1}</label>
                <input
                  className="text-input"
                  value={option.label}
                  onChange={(event) =>
                    setOptions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: event.target.value } : item
                      )
                    )
                  }
                />
                <label className="input-label">Optional note</label>
                <textarea
                  className="support-input"
                  value={option.note}
                  onChange={(event) =>
                    setOptions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, note: event.target.value } : item
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <span className="panel-label">Criteria</span>
          </div>
          <div className="criteria-editor">
            {criteria.map((criterion, index) => (
              <div key={`criterion-${index}`} className="criterion-editor-row">
                <input
                  className="text-input"
                  value={criterion.label}
                  onChange={(event) =>
                    setCriteria((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: event.target.value } : item
                      )
                    )
                  }
                />
                <div className="weight-control">
                  <label className="input-label" htmlFor={`weight-${index}`}>
                    Weight
                  </label>
                  <input
                    id={`weight-${index}`}
                    className="range-input"
                    type="range"
                    min={1}
                    max={5}
                    value={criterion.weight}
                    onChange={(event) =>
                      setCriteria((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, weight: Number(event.target.value) } : item
                        )
                      )
                    }
                  />
                  <span className="weight-badge">{criterion.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
