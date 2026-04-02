import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const root = style({
  display: "grid",
  gap: vars.space.xs,
  maxWidth: "62ch"
});

export const title = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.displaySm,
  lineHeight: vars.lineHeight.tight
});

export const description = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});
