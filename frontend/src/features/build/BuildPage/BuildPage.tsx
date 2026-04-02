"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAnalysis, getDraft } from "../../../lib/api";
import type { CriterionInput, DecisionOptionInput } from "../../../lib/types";
import { AppShell } from "../../../components/layout/AppShell/AppShell";
import { StatePanel } from "../../../components/ui/StatePanel";
import { useI18n } from "../../../i18n/I18nProvider";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./BuildPage.css";

type BuildPageProps = {
  draftId: string;
};

export function BuildPage({ draftId }: BuildPageProps) {
  const router = useRouter();
  const { locale, messages } = useI18n();
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
    mutationFn: () => createAnalysis(draftId, options, criteria, userContext, locale),
    onSuccess: (result) => router.push(`/result/${result.shareSlug}`)
  });

  const canSubmit = useMemo(() => {
    return options.every((option) => option.label.trim()) && criteria.every((criterion) => criterion.label.trim());
  }, [criteria, options]);

  if (isLoading) {
    return (
      <AppShell eyebrow={messages.build.stepEyebrow} title={messages.build.loadingTitle} description={messages.build.loadingDescription}>
        <StatePanel message={messages.build.loadingDraft} />
      </AppShell>
    );
  }

  if (error || !data) {
    return (
      <AppShell eyebrow={messages.build.stepEyebrow} title={messages.build.unavailableTitle} description={messages.build.unavailableDescription}>
        <StatePanel tone="error" message={error instanceof Error ? error.message : messages.build.draftNotFound} />
      </AppShell>
    );
  }

  return (
    <AppShell eyebrow={messages.build.stepEyebrow} title={messages.build.title} description={messages.build.description}>
      <section className={styles.buildLayout}>
        <article className={cx(primitives.panel, styles.stickyPanel)}>
          <span className={primitives.sectionLabel}>{messages.build.decision}</span>
          <h2 className={styles.decisionTitle}>{data.normalizedQuestion}</h2>
          <div className={primitives.listBlock}>
            <h4>{messages.build.missingInfoTitle}</h4>
            <ul className={primitives.bulletList}>
              {data.missingInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <label className={primitives.inputLabel} htmlFor="context">
            {messages.build.extraContext}
          </label>
          <textarea
            id="context"
            className={primitives.textareaInput}
            maxLength={400}
            value={userContext}
            onChange={(event) => setUserContext(event.target.value)}
            placeholder={messages.build.extraContextPlaceholder}
          />
          <button
            className={cx(primitives.primaryButton, primitives.fullWidth)}
            disabled={!canSubmit || analyzeMutation.isPending}
            onClick={() => analyzeMutation.mutate()}
            type="button"
          >
            {analyzeMutation.isPending ? messages.build.runningAnalysis : messages.build.generateVerdict}
          </button>
          {analyzeMutation.error ? <p className={primitives.errorBanner}>{analyzeMutation.error.message}</p> : null}
        </article>

        <article className={primitives.panel}>
          <div className={primitives.headerRow}>
            <span className={primitives.sectionLabel}>{messages.build.options}</span>
          </div>
          <div className={styles.editorGrid}>
            {options.map((option, index) => (
              <div key={`option-${index}`} className={styles.editorCard}>
                <label className={primitives.inputLabel}>{messages.build.optionLabel(index + 1)}</label>
                <input
                  className={primitives.textInput}
                  maxLength={80}
                  value={option.label}
                  onChange={(event) =>
                    setOptions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: event.target.value } : item
                      )
                    )
                  }
                />
                <label className={primitives.inputLabel}>{messages.build.optionalNote}</label>
                <textarea
                  className={primitives.textareaInput}
                  maxLength={160}
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

        <article className={primitives.panel}>
          <div className={primitives.headerRow}>
            <span className={primitives.sectionLabel}>{messages.build.criteria}</span>
          </div>
          <div className={styles.criteriaEditor}>
            {criteria.map((criterion, index) => (
              <div key={`criterion-${index}`} className={styles.criterionEditorRow}>
                <input
                  className={primitives.textInput}
                  maxLength={100}
                  value={criterion.label}
                  onChange={(event) =>
                    setCriteria((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: event.target.value } : item
                      )
                    )
                  }
                />
                <div className={styles.weightControl}>
                  <label className={primitives.inputLabel} htmlFor={`weight-${index}`}>
                    {messages.build.weight}
                  </label>
                  <input
                    id={`weight-${index}`}
                    className={styles.rangeInput}
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
                  <span className={primitives.metricPill}>{criterion.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
