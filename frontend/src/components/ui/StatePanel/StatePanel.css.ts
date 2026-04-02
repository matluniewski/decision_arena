import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const root = style({
  display: "grid",
  gap: vars.space.sm,
  alignItems: "start"
});

export const message = style({
  margin: 0,
  color: vars.color.text,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});

export const hint = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.body,
  maxWidth: "64ch"
});

export const tone = styleVariants({
  default: {},
  error: {
    color: vars.color.bad
  }
});
