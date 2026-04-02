import { getResultServer } from "../../../lib/server-api";
import { ResultPage } from "../../../features/result/ResultPage/ResultPage";

type ResultRoutePageProps = {
  params: Promise<{
    shareSlug: string;
  }>;
};

export default async function ResultRoutePage({ params }: ResultRoutePageProps) {
  const { shareSlug } = await params;
  try {
    const initialResult = await getResultServer(shareSlug);

    return <ResultPage shareSlug={shareSlug} initialResult={initialResult} />;
  } catch (error) {
    return (
      <ResultPage
        shareSlug={shareSlug}
        initialErrorMessage={error instanceof Error ? error.message : "Request failed."}
      />
    );
  }
}
