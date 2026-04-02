import { getDraftServer } from "../../../lib/server-api";
import { BuildPage } from "../../../features/build/BuildPage/BuildPage";

type BuildRoutePageProps = {
  params: Promise<{
    draftId: string;
  }>;
};

export default async function BuildRoutePage({ params }: BuildRoutePageProps) {
  const { draftId } = await params;
  try {
    const initialDraft = await getDraftServer(draftId);

    return <BuildPage draftId={draftId} initialDraft={initialDraft} />;
  } catch (error) {
    return (
      <BuildPage
        draftId={draftId}
        initialErrorMessage={error instanceof Error ? error.message : "Request failed."}
      />
    );
  }
}
