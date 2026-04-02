import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { LandingPage } from "./LandingPage";
import { renderWithProviders } from "../../../test/test-utils";

describe("LandingPage", () => {
  it("renders the main value proposition and example prompts", () => {
    renderWithProviders(<LandingPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/werdykt/i);
    expect(screen.getAllByText(/rozpocznij/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/japonii/i).length).toBeGreaterThan(0);
  });
});
