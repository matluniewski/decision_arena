"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAnalysis, getDraft } from "../../../lib/api";
import type { CriterionInput, DecisionOptionInput, DraftResponse } from "../../../lib/types";
import { AppShell } from "../../../components/layout/AppShell/AppShell";
import { Input, Textarea } from "../../../components/ui/Field";
import { StatePanel } from "../../../components/ui/StatePanel";
import { useI18n } from "../../../i18n/I18nProvider";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./BuildPage.css";

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const MIN_CRITERIA = 4;
const MAX_CRITERIA = 6;

function emptyOption(): DecisionOptionInput {
  return { label: "", note: "" };
}

function emptyCriterion(): CriterionInput {
  return { label: "", weight: 3 };
}

type BuildPageProps = {
  draftId: string;
  initialDraft?: DraftResponse | null;
  initialErrorMessage?: string | null;
};

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" focusable="false">
      <path
        d="M9 3.75h6m-8.25 3h10.5m-9.75 0 .6 11.1a1.5 1.5 0 0 0 1.5 1.4h4.8a1.5 1.5 0 0 0 1.5-1.4l.6-11.1m-5.25 3.15v5.25m3-5.25v5.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BuildPage({ draftId, initialDraft = null, initialErrorMessage = null }: BuildPageProps) {
  const router = useRouter();
  const { locale, messages } = useI18n();
  const { data, isLoading, error } = useQuery({
    queryKey: ["draft", draftId],
    queryFn: () => getDraft(draftId),
    enabled: Boolean(draftId) && !initialDraft,
    initialData: initialDraft ?? undefined
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

  const addOption = () => {
    if (options.length >= MAX_OPTIONS) {
      return;
    }

    setOptions((current) => [...current, emptyOption()]);
  };

  const removeOption = (index: number) => {
    if (options.length <= MIN_OPTIONS) {
      return;
    }

    setOptions((current) => current.filter((_, currentIndex) => currentIndex !== index));
  };

  const addCriterion = () => {
    if (criteria.length >= MAX_CRITERIA) {
      return;
    }

    setCriteria((current) => [...current, emptyCriterion()]);
  };

  const removeCriterion = (index: number) => {
    if (criteria.length <= MIN_CRITERIA) {
      return;
    }

    setCriteria((current) => current.filter((_, currentIndex) => currentIndex !== index));
  };

  if (isLoading) {
    return (
      <AppShell eyebrow={messages.build.stepEyebrow} title={messages.build.loadingTitle} description={messages.build.loadingDescription}>
        <StatePanel message={messages.build.loadingDraft} />
      </AppShell>
    );
  }

  if (error || initialErrorMessage || !data) {
    return (
      <AppShell eyebrow={messages.build.stepEyebrow} title={messages.build.unavailableTitle} description={messages.build.unavailableDescription}>
        <StatePanel
          tone="error"
          message={initialErrorMessage ?? (error instanceof Error ? error.message : messages.build.draftNotFound)}
        />
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
          <Textarea
            id="context"
            clearLabel={messages.build.clearField}
            maxLength={400}
            onClear={() => setUserContext("")}
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
          <div className={styles.sectionHeader}>
            <div>
              <span className={primitives.sectionLabel}>{messages.build.options}</span>
              <p className={styles.sectionMeta}>{messages.build.optionsCount(options.length, MAX_OPTIONS)}</p>
            </div>
            <button
              aria-label={messages.build.addOption}
              className={cx(primitives.secondaryButton, styles.iconButton, styles.iconButtonAdd)}
              disabled={options.length >= MAX_OPTIONS}
              onClick={addOption}
              type="button"
            >
              +
            </button>
          </div>
          <div className={styles.editorGrid}>
            {options.map((option, index) => (
              <div key={`option-${index}`} className={styles.editorCard}>
                <div className={styles.cardHeader}>
                  <label className={primitives.inputLabel}>{messages.build.optionLabel(index + 1)}</label>
                  <div className={styles.panelActions}>
                    <button
                      aria-label={messages.build.removeOption}
                      className={cx(primitives.secondaryButton, styles.iconButton, styles.iconButtonRemove)}
                      disabled={options.length <= MIN_OPTIONS}
                      onClick={() => removeOption(index)}
                      type="button"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
                <Input
                  clearLabel={messages.build.clearField}
                  maxLength={80}
                  onClear={() =>
                    setOptions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: "" } : item
                      )
                    )
                  }
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
                <Textarea
                  clearLabel={messages.build.clearField}
                  maxLength={160}
                  onClear={() =>
                    setOptions((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, note: "" } : item
                      )
                    )
                  }
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
          <div className={styles.sectionHeader}>
            <div>
              <span className={primitives.sectionLabel}>{messages.build.criteria}</span>
              <p className={styles.sectionMeta}>{messages.build.criteriaCount(criteria.length, MAX_CRITERIA)}</p>
            </div>
            <button
              aria-label={messages.build.addCriterion}
              className={cx(primitives.secondaryButton, styles.iconButton, styles.iconButtonAdd)}
              disabled={criteria.length >= MAX_CRITERIA}
              onClick={addCriterion}
              type="button"
            >
              +
            </button>
          </div>
          <div className={styles.criteriaEditor}>
            {criteria.map((criterion, index) => (
              <div key={`criterion-${index}`} className={styles.criterionEditorRow}>
                <div className={styles.criterionHeader}>
                  <label className={primitives.inputLabel} htmlFor={`criterion-${index}`}>
                    {messages.build.criteria} {index + 1}
                  </label>
                  <div className={styles.panelActions}>
                    <button
                      aria-label={messages.build.removeCriterion}
                      className={cx(primitives.secondaryButton, styles.iconButton, styles.iconButtonRemove)}
                      disabled={criteria.length <= MIN_CRITERIA}
                      onClick={() => removeCriterion(index)}
                      type="button"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
                <Input
                  id={`criterion-${index}`}
                  clearLabel={messages.build.clearField}
                  maxLength={100}
                  onClear={() =>
                    setCriteria((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: "" } : item
                      )
                    )
                  }
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
