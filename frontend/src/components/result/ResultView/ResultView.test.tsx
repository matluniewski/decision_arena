import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { LocalizedResultView } from "../LocalizedResultView/LocalizedResultView";
import { renderWithProviders } from "../../../test/test-utils";
import type { AnalysisResponse } from "../../../lib/types";

const sampleResult: AnalysisResponse = {
  analysisId: "analysis-1",
  shareSlug: "share-1",
  question: "Czy pojechac do Japonii w tym roku?",
  normalizedQuestion: "Czy pojechac do Japonii w tym roku?",
  verdict: "Pojechac w tym roku ma obecnie najsilniejszy profil przy podanych wagach i zalozeniach.",
  confidence: "Medium",
  unknowns: ["Jak wyglada realny budzet?"],
  optionResults: [
    {
      optionLabel: "Pojechac w tym roku",
      note: "Pelny wyjazd",
      pros: ["Mocny punkt w obszarze: wartosc doswiadczenia."],
      cons: ["Slabszy profil w obszarze: koszt calkowity."],
      risks: ["Ryzyko, ze decyzja zawiedzie przez czynnik: koszt calkowity."],
      weightedScore: 78,
      summary: "Opcja wyglada na mocna i spojna z obecnymi priorytetami.",
      criterionScores: [
        {
          criterion: "Wartosc doswiadczenia",
          weight: 5,
          score: 9,
          reasoning: "Ta opcja wyglada mocno wzgledem tego kryterium."
        }
      ]
    }
  ]
};

describe("ResultView", () => {
  it("renders verdict, score, and risks", () => {
    renderWithProviders(<LocalizedResultView result={sampleResult} />);

    expect(screen.getByText(/prowadzi opcja/i)).toBeInTheDocument();
    expect(screen.getAllByText(/78\/100/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/niewiadome/i)).toBeInTheDocument();
    expect(screen.getByText(/jak wyglada realny budzet/i)).toBeInTheDocument();
  });
});
