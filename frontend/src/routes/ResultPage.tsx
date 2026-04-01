import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { ResultView } from "../components/ResultView";
import { getResult } from "../lib/api";

export function ResultPage() {
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
      eyebrow="Step 3"
      title="Your report is ready."
      description="Decision Arena returns a shareable comparison report instead of a loose conversation. Use it to compare tradeoffs, not to outsource judgment."
    >
      <section className="panel share-panel">
        <div>
          <span className="panel-label">Shareable result</span>
          <p className="hero-copy">Anyone with this link can open the report in read-only mode.</p>
        </div>
        <button className="secondary-button" onClick={() => void copyLink()} type="button">
          Copy link
        </button>
      </section>

      {isLoading ? <section className="panel">Loading result...</section> : null}
      {error ? <section className="panel"><p className="error-banner">{error instanceof Error ? error.message : "Result could not be loaded."}</p></section> : null}
      {data ? <ResultView result={data} /> : null}
    </AppShell>
  );
}
