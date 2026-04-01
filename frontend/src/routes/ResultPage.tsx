import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { LocalizedResultView } from "../components/LocalizedResultView";
import { getResult } from "../lib/api";
import { useI18n } from "../i18n/I18nProvider";
import { cx } from "../lib/cx";
import * as primitives from "../styles/primitives.css";
import * as styles from "./ResultPage.css";

export function ResultPage() {
  const { messages } = useI18n();
  const { shareSlug = "" } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["result", shareSlug],
    queryFn: () => getResult(shareSlug),
    enabled: Boolean(shareSlug)
  });

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

      {isLoading ? <section className={primitives.panel}>{messages.resultPage.loadingResult}</section> : null}
      {error ? <section className={primitives.panel}><p className={primitives.errorBanner}>{error instanceof Error ? error.message : messages.resultPage.resultLoadError}</p></section> : null}
      {data ? <LocalizedResultView result={data} /> : null}
    </AppShell>
  );
}
