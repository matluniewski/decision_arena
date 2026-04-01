import { style } from "@vanilla-extract/css";
import { media, vars } from "./theme.css";

export const panel = style({
  background: vars.color.panel,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.panel,
  backdropFilter: "blur(10px)",
  padding: vars.space.lg
});

export const softCard = style({
  padding: vars.space.md,
  borderRadius: vars.radius.card,
  background: vars.color.bgStrong,
  border: `1px solid ${vars.color.line}`
});

export const sectionLabel = style({
  color: vars.color.accentDeep,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: vars.text.xs,
  fontWeight: 700
});

export const eyebrow = sectionLabel;

export const bodyCopy = style({
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});

export const inputLabel = style({
  fontSize: vars.text.sm,
  fontWeight: 600
});

const textFieldBase = style({
  width: "100%",
  border: `1px solid ${vars.color.line}`,
  background: vars.color.bgStrong,
  borderRadius: vars.radius.field,
  padding: "16px 18px",
  color: vars.color.text,
  transition: "border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: "rgba(255, 107, 44, 0.42)",
      boxShadow: "0 0 0 4px rgba(255, 107, 44, 0.08)",
      transform: "translateY(-1px)"
    }
  }
});

export const textInput = style([textFieldBase, { minHeight: "auto" }]);

export const textareaInput = style([
  textFieldBase,
  {
    minHeight: "120px",
    resize: "vertical"
  }
]);

export const helperCopy = style({
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.compact
});

const buttonBase = style({
  border: "1px solid transparent",
  borderRadius: vars.radius.pill,
  padding: "14px 22px",
  cursor: "pointer",
  fontFamily: vars.font.display,
  fontSize: vars.text.sm,
  letterSpacing: "0.01em",
  transition: `
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 180ms ease,
    box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1),
    background 220ms ease,
    border-color 220ms ease,
    color 220ms ease
  `,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: `
        0 0 0 4px rgba(255, 107, 44, 0.12),
        0 18px 36px rgba(201, 75, 26, 0.16)
      `
    }
  },
  "@media": {
    [media.mobile]: {
      width: "100%"
    }
  }
});

export const primaryButton = style([
  buttonBase,
  {
    background: "linear-gradient(135deg, #c94b1a 0%, #f06a2d 45%, #0f8b8d 100%)",
    color: "#fffaf3",
    fontWeight: 700,
    boxShadow: `
      0 18px 36px rgba(201, 75, 26, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.18)
    `,
    textShadow: "0 1px 0 rgba(0, 0, 0, 0.18)",
    selectors: {
      "&:hover": {
        transform: "translateY(-2px) scale(1.01)",
        boxShadow: `
          0 24px 48px rgba(201, 75, 26, 0.24),
          inset 0 1px 0 rgba(255, 255, 255, 0.18)
        `
      },
      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed"
      }
    }
  }
]);

export const secondaryButton = style([
  buttonBase,
  {
    background: "rgba(255, 250, 244, 0.9)",
    color: vars.color.text,
    fontWeight: 600,
    borderColor: "rgba(31, 36, 33, 0.12)",
    boxShadow: `
      0 10px 24px rgba(46, 24, 8, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.42)
    `,
    selectors: {
      "&:hover": {
        transform: "translateY(-2px)",
        background: "rgba(255, 250, 244, 0.98)",
        borderColor: "rgba(216, 74, 16, 0.18)",
        boxShadow: `
          0 16px 32px rgba(46, 24, 8, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.48)
        `
      }
    }
  }
]);

export const fullWidth = style({
  width: "100%"
});

export const headerRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  "@media": {
    [media.mobile]: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  }
});

export const listBlock = style({
  display: "grid",
  gap: "12px"
});

export const bulletList = style({
  margin: 0,
  paddingLeft: "18px",
  display: "grid",
  gap: "8px",
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});

export const metricPill = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.pill,
  padding: "8px 12px",
  fontSize: vars.text.sm,
  fontWeight: 700,
  background: "rgba(255, 107, 44, 0.12)"
});

export const errorBanner = style({
  fontSize: vars.text.sm,
  color: vars.color.bad,
  fontWeight: 600
});
