import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const fieldShell = style({
  position: "relative",
  display: "grid"
});

export const fieldControl = style({
  paddingRight: "54px"
});

export const clearButton = style({
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "28px",
  height: "28px",
  borderRadius: "999px",
  border: `1px solid ${vars.color.line}`,
  background: "rgba(255, 250, 244, 0.96)",
  color: vars.color.muted,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: vars.text.md,
  fontWeight: 600,
  lineHeight: "1",
  boxShadow: "0 8px 18px rgba(46, 24, 8, 0.05)",
  transition: "background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease",
  selectors: {
    "&:hover": {
      background: "rgba(245, 239, 231, 1)",
      color: vars.color.text,
      borderColor: "rgba(31, 36, 33, 0.16)",
      transform: "translateY(-1px)"
    },
    "&:focus-visible": {
      outline: "none",
      borderColor: "rgba(31, 36, 33, 0.22)",
      boxShadow: "0 0 0 4px rgba(31, 36, 33, 0.08)"
    }
  }
});
