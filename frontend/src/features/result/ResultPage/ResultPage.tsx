"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "../../../components/layout/AppShell/AppShell";
import { ResultReplayView } from "../../../components/result/ResultReplayView/ResultReplayView";
import { StatePanel } from "../../../components/ui/StatePanel";
import { getResult } from "../../../lib/api";
import { useI18n } from "../../../i18n/I18nProvider";
import { cx } from "../../../lib/cx";
import * as primitives from "../../../styles/primitives.css";
import * as styles from "./ResultPage.css";

type ResultPageProps = {
  shareSlug: string;
};

export function ResultPage({ shareSlug }: ResultPageProps) {
  const { locale, messages } = useI18n();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["result", shareSlug],
    queryFn: () => getResult(shareSlug),
    enabled: Boolean(shareSlug)
  });
  const [showWakeupHint, setShowWakeupHint] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowWakeupHint(false);
      return undefined;
    }

    const timer = window.setTimeout(() => setShowWakeupHint(true), 7000);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  const loadingHint =
    locale === "pl"
      ? "Środowisko developerskie może właśnie wybudzać backend. Przy darmowym hostingu może to potrwać kilkanaście sekund."
      : "The development environment may be waking the backend up. On free hosting this can take several seconds.";

  const retryLabel = locale === "pl" ? "Spróbuj ponownie" : "Try again";

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <AppShell
      eyebrow={messages.resultPage.eyebrow}
      title={messages.resultPage.title}
      description={messages.resultPage.description}
    >
      <section className={cx(primitives.panel, styles.sharePanel)}>
        <div>
          <span className={primitives.sectionLabel}>{messages.resultPage.shareableResult}</span>
          <p className={primitives.bodyCopy}>{messages.resultPage.shareDescription}</p>
        </div>
        <button className={primitives.secondaryButton} onClick={() => void copyLink()} type="button">
          {messages.resultPage.copyLink}
        </button>
      </section>

      {isLoading ? (
        <StatePanel
          className={styles.loadingPanel}
          label={messages.resultPage.loadingResult}
          message={messages.resultPage.shareDescription}
          hint={showWakeupHint ? loadingHint : undefined}
        />
      ) : null}
      {error ? (
        <StatePanel
          className={styles.loadingPanel}
          tone="error"
          message={error instanceof Error ? error.message : messages.resultPage.resultLoadError}
          action={
            <button className={primitives.secondaryButton} onClick={() => void refetch()} type="button">
              {retryLabel}
            </button>
          }
        />
      ) : null}
      {data ? <ResultReplayView result={data} /> : null}
    </AppShell>
  );
}
