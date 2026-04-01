import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { LocalizedResultView } from "../components/LocalizedResultView";
import { getResult } from "../lib/api";
import { useI18n } from "../i18n/I18nProvider";

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
      <section className="panel share-panel">
        <div>
          <span className="panel-label">{messages.resultPage.shareableResult}</span>
          <p className="hero-copy">{messages.resultPage.shareDescription}</p>
        </div>
        <button className="secondary-button" onClick={() => void copyLink()} type="button">
          {messages.resultPage.copyLink}
        </button>
      </section>

      {isLoading ? <section className="panel">{messages.resultPage.loadingResult}</section> : null}
      {error ? <section className="panel"><p className="error-banner">{error instanceof Error ? error.message : messages.resultPage.resultLoadError}</p></section> : null}
      {data ? <LocalizedResultView result={data} /> : null}
    </AppShell>
  );
}
