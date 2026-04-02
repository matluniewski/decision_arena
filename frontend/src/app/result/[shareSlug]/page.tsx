import { ResultPage } from "../../../features/result/ResultPage/ResultPage";

type ResultRoutePageProps = {
  params: Promise<{
    shareSlug: string;
  }>;
};

export default async function ResultRoutePage({ params }: ResultRoutePageProps) {
  const { shareSlug } = await params;

  return <ResultPage shareSlug={shareSlug} />;
}
