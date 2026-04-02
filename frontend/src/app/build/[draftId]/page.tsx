import { BuildPage } from "../../../features/build/BuildPage/BuildPage";

type BuildRoutePageProps = {
  params: Promise<{
    draftId: string;
  }>;
};

export default async function BuildRoutePage({ params }: BuildRoutePageProps) {
  const { draftId } = await params;

  return <BuildPage draftId={draftId} />;
}
