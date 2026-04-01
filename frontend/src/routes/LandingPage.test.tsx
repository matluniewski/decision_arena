import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { LandingPage } from "./LandingPage";
import { renderWithProviders } from "../test/test-utils";

describe("LandingPage", () => {
  it("renders the main value proposition and example prompts", () => {
    renderWithProviders(<LandingPage />);

    expect(screen.getByText(/zamień niejasny życiowy dylemat/i)).toBeInTheDocument();
    expect(screen.getByText(/rozpocznij analizę/i)).toBeInTheDocument();
    expect(screen.getAllByText(/japonii/i).length).toBeGreaterThan(0);
  });
});
