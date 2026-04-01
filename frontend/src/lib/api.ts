import type {
  AnalysisResponse,
  ApiError,
  CriterionInput,
  DecisionOptionInput,
  DraftResponse
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers
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

export function createDraft(question: string) {
  return request<DraftResponse>("/api/decision-drafts", {
    method: "POST",
    body: JSON.stringify({ question })
  });
}

export function getDraft(draftId: string) {
  return request<DraftResponse>(`/api/decision-drafts/${draftId}`);
}

export function createAnalysis(
  draftId: string,
  options: DecisionOptionInput[],
  criteria: CriterionInput[],
  userContext: string
) {
  return request<AnalysisResponse>("/api/decision-analyses", {
    method: "POST",
    body: JSON.stringify({ draftId, options, criteria, userContext })
  });
}

export function getResult(shareSlug: string) {
  return request<AnalysisResponse>(`/api/results/${shareSlug}`);
}
