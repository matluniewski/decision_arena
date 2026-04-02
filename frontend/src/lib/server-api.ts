import "server-only";

import type { AnalysisResponse, ApiError, DraftResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function serverRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    let payload: ApiError | null = null;
    try {
      payload = (await response.json()) as ApiError;
    } catch {
      payload = null;
    }

    throw new Error(payload?.message ?? "Request failed.");
  }

  return (await response.json()) as T;
}

export function getDraftServer(draftId: string) {
  return serverRequest<DraftResponse>(`/api/decision-drafts/${draftId}`);
}

export function getResultServer(shareSlug: string) {
  return serverRequest<AnalysisResponse>(`/api/results/${shareSlug}`);
}
