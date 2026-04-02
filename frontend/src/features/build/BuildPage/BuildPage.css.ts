import { style } from "@vanilla-extract/css";
import { media, vars } from "../../../styles/theme.css";
import { softCard } from "../../../styles/primitives.css";

export const buildLayout = style({
  display: "grid",
  gridTemplateColumns: "minmax(260px, 320px) 1.2fr 1fr",
  gap: "20px",
  alignItems: "start",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const stickyPanel = style({
  position: "sticky",
  top: "20px",
  display: "grid",
  gap: "18px",
  "@media": {
    [media.tablet]: {
      position: "static"
    }
  }
});

export const sectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap"
});

export const sectionMeta = style({
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.compact
});

export const decisionTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displayMd,
  lineHeight: vars.lineHeight.tight
});

export const panelActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs
});

export const iconButton = style({
  width: "36px",
  height: "36px",
  padding: 0,
  minWidth: "36px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panelStrong,
  color: vars.color.text,
  fontSize: vars.text.lg,
  fontWeight: 700,
  lineHeight: "1",
  boxShadow: "0 10px 24px rgba(46, 24, 8, 0.06)",
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)"
    },
    "&:disabled": {
      opacity: 0.45,
      boxShadow: "none"
    }
  }
});

export const iconButtonAdd = style({
  borderColor: "rgba(12, 140, 85, 0.18)",
  background: "rgba(237, 249, 243, 0.96)",
  color: vars.color.good,
  selectors: {
    "&:hover": {
      background: "rgba(228, 245, 236, 1)",
      borderColor: "rgba(12, 140, 85, 0.32)",
      color: vars.color.good
    }
  }
});

export const iconButtonRemove = style({
  borderColor: "rgba(159, 42, 42, 0.18)",
  background: "rgba(252, 241, 241, 0.96)",
  color: vars.color.bad,
  selectors: {
    "&:hover": {
      background: "rgba(248, 232, 232, 1)",
      borderColor: "rgba(159, 42, 42, 0.32)",
      color: vars.color.bad
    }
  }
});

export const editorGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px"
});

export const editorCard = style([
  softCard,
  {
    display: "grid",
    gap: "12px"
  }
]);

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.xs
});

export const criteriaEditor = style({
  display: "grid",
  gap: "18px"
});

export const criterionEditorRow = style({
  display: "grid",
  gap: "10px",
  paddingBottom: "18px",
  borderBottom: `1px solid ${vars.color.line}`,
  selectors: {
    "&:last-child": {
      borderBottom: 0,
      paddingBottom: 0
    }
  }
});

export const criterionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.xs,
  flexWrap: "wrap"
});

export const weightControl = style({
  display: "flex",
  alignItems: "center",
  gap: "14px"
});

export const rangeInput = style({
  flex: 1
});

