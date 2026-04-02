import { style } from "@vanilla-extract/css";
import { headerRow } from "../styles/primitives.css";
import { media, vars } from "../styles/theme.css";

export const sharePanel = style([
  headerRow,
  {
    alignItems: "flex-start",
    gap: vars.space.md,
    padding: vars.space.xl,
    "@media": {
      [media.mobile]: {
        padding: vars.space.lg
      }
    }
  }
]);
