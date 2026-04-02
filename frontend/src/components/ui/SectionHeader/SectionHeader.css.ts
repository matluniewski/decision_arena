import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";
import * as typography from "../../../styles/typography.css";

export const root = style({
  display: "grid",
  gap: vars.space.xs,
  maxWidth: "62ch"
});

export const title = style([typography.displaySm]);

export const description = style([typography.bodyMd, typography.muted]);
