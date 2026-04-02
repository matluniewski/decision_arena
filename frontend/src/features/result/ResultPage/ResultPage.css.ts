import { style } from "@vanilla-extract/css";
import { headerRow } from "../../../styles/primitives.css";
import { media, vars } from "../../../styles/theme.css";

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

export const loadingPanel = style({
  display: "grid",
  gap: vars.space.sm,
  alignItems: "start"
});

export const loadingHint = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.body,
  maxWidth: "64ch"
});

