import { style } from "@vanilla-extract/css";
import { media, vars } from "../../../styles/theme.css";

export const pageShell = style({
  width: `min(${vars.size.content}, calc(100% - 32px))`,
  margin: "0 auto",
  padding: "24px 0 96px",
  "@media": {
    [media.mobile]: {
      width: `min(100% - 20px, ${vars.size.content})`,
      paddingTop: "16px"
    }
  }
});

export const topbar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "48px",
  "@media": {
    [media.mobile]: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  }
});

export const topbarActions = style({
  display: "flex",
  alignItems: "center",
  gap: "12px"
});

export const brand = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.lg,
  fontWeight: 700,
  letterSpacing: "0.04em"
});

export const topbarBadge = style({
  color: vars.color.accentDeep,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: vars.text.xs,
  fontWeight: 700
});

export const languageSwitch = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px",
  borderRadius: vars.radius.pill,
  background: "rgba(255, 250, 244, 0.75)",
  border: `1px solid ${vars.color.line}`
});

export const languageButton = style({
  border: 0,
  background: "transparent",
  color: vars.color.muted,
  borderRadius: vars.radius.pill,
  padding: "8px 12px",
  fontSize: vars.text.sm,
  fontWeight: 700,
  cursor: "pointer"
});

export const languageButtonActive = style({
  background: "rgba(255, 107, 44, 0.14)",
  color: vars.color.accentDeep
});

export const pageContent = style({
  display: "grid",
  gap: "56px"
});

export const hero = style({
  display: "grid",
  gap: "12px",
  maxWidth: "760px",
  marginBottom: "28px"
});

export const heroContent = style({
  display: "grid",
  gap: "12px"
});

export const heroTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.hero,
  lineHeight: vars.lineHeight.tight,
  maxWidth: "12ch",
  "@media": {
    [media.mobile]: {
      maxWidth: "none"
    }
  }
});

export const heroCopy = style({
  color: vars.color.muted,
  fontSize: vars.text.lg,
  lineHeight: vars.lineHeight.body,
  maxWidth: "58ch"
});

export const heroAside = style({
  position: "relative"
});

