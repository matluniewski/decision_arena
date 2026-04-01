export type DecisionOptionInput = {
  label: string;
  note: string;
};

export type CriterionInput = {
  label: string;
  weight: number;
};

export type DraftResponse = {
  draftId: string;
  normalizedQuestion: string;
  proposedOptions: DecisionOptionInput[];
  proposedCriteria: CriterionInput[];
  missingInfo: string[];
};

export type CriterionScore = {
  criterion: string;
  weight: number;
  score: number;
  reasoning: string;
};

export type OptionAnalysis = {
  optionLabel: string;
  note: string | null;
  pros: string[];
  cons: string[];
  risks: string[];
  criterionScores: CriterionScore[];
  weightedScore: number;
  summary: string;
};

export type AnalysisResponse = {
  analysisId: string;
  shareSlug: string;
  question: string;
  normalizedQuestion: string;
  verdict: string;
  confidence: string;
  optionResults: OptionAnalysis[];
  unknowns: string[];
};

export type ApiError = {
  code: string;
  message: string;
  timestamp?: string;
};
