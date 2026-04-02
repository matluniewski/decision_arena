import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const eyebrow = style({
  color: vars.color.accentDeep,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: vars.text.xs,
  fontWeight: 700
});

export const displayHero = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.hero,
  lineHeight: vars.lineHeight.tight,
  margin: 0
});

export const displayLg = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displayLg,
  lineHeight: vars.lineHeight.display,
  margin: 0
});

export const displayMd = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displayMd,
  lineHeight: vars.lineHeight.tight,
  margin: 0
});

export const displaySm = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displaySm,
  lineHeight: vars.lineHeight.tight,
  margin: 0
});

export const headingLg = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.xl,
  lineHeight: vars.lineHeight.tight,
  margin: 0
});

export const bodyLg = style({
  fontSize: vars.text.lg,
  lineHeight: vars.lineHeight.body,
  margin: 0
});

export const bodyMd = style({
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body,
  margin: 0
});

export const bodySm = style({
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.compact,
  margin: 0
});

export const muted = style({
  color: vars.color.muted
});
