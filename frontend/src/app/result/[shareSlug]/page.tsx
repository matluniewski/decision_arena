import type { Metadata } from "next";
import { getResultServer } from "../../../lib/server-api";
import { ResultPage } from "../../../features/result/ResultPage/ResultPage";

type ResultRoutePageProps = {
  params: Promise<{
    shareSlug: string;
  }>;
};

function clamp(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function buildResultMetadata(result: Awaited<ReturnType<typeof getResultServer>>): Metadata {
  const leadingOption = [...result.optionResults].sort((a, b) => b.weightedScore - a.weightedScore)[0];
  const title = clamp(`${result.normalizedQuestion} | Decision Arena`, 60);
  const description = leadingOption
    ? clamp(`Leading option: ${leadingOption.optionLabel}. ${result.verdict}`, 160)
    : clamp(result.verdict, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export async function generateMetadata({ params }: ResultRoutePageProps): Promise<Metadata> {
  const { shareSlug } = await params;

  try {
    const result = await getResultServer(shareSlug);
    return buildResultMetadata(result);
  } catch {
    return {
      title: "Result unavailable | Decision Arena",
      description: "This shared Decision Arena result is temporarily unavailable."
    };
  }
}

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
