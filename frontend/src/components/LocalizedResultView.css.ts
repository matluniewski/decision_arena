import { style, styleVariants } from "@vanilla-extract/css";
import { media, vars } from "../styles/theme.css";
import { headerRow, metricPill, softCard } from "../styles/primitives.css";

export const resultGrid = style({
  display: "grid",
  gap: "20px"
});

export const verdictPanel = style({
  background: "linear-gradient(135deg, rgba(255, 107, 44, 0.16), rgba(15, 139, 141, 0.16))"
});

export const verdictTitle = style({
  fontFamily: vars.font.display,
  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
  lineHeight: vars.lineHeight.tight,
  marginTop: "8px"
});

export const verdictCopy = style({
  fontSize: vars.text.lg,
  margin: "12px 0 18px",
  maxWidth: "60ch",
  color: vars.color.text,
  lineHeight: vars.lineHeight.body
});

export const confidenceBadge = metricPill;

export const confidenceTone = styleVariants({
  high: {
    background: "rgba(12, 140, 85, 0.14)",
    color: vars.color.good
  },
  medium: {
    background: "rgba(197, 107, 19, 0.14)",
    color: vars.color.warn
  },
  low: {
    background: "rgba(159, 42, 42, 0.14)",
    color: vars.color.bad
  }
});

export const winnerChip = metricPill;
export const panelHeader = headerRow;

export const scoreboard = style({
  display: "grid",
  gap: "14px"
});

export const scoreRow = style([
  headerRow,
  {
    alignItems: "flex-start"
  }
]);

export const scoreSummary = style({
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body,
  marginTop: "6px"
});

export const scoreBadge = style({
  display: "grid",
  justifyItems: "end",
  gap: "2px",
  "@media": {
    [media.mobile]: {
      justifyItems: "start"
    }
  }
});

export const scoreBadgeValue = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.xl
});

export const comparisonPanel = style({
  display: "grid",
  gap: "18px"
});

export const optionGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
  gap: "16px"
});

export const optionCard = style([
  softCard,
  {
    display: "grid",
    gap: "16px"
  }
]);

export const optionCardHead = headerRow;

export const optionTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displaySm,
  lineHeight: vars.lineHeight.tight
});

export const scorePill = style([
  metricPill,
  {
    fontFamily: vars.font.display,
    fontSize: vars.text.xl
  }
]);

export const note = style({
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});

export const listBlock = style({
  display: "grid",
  gap: "12px"
});

export const listTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.md
});

export const bulletList = style({
  margin: 0,
  paddingLeft: "18px",
  display: "grid",
  gap: "8px"
});

export const criteriaTable = style({
  display: "grid",
  gap: "10px"
});

export const criterionRow = style([
  headerRow,
  {
    alignItems: "flex-start",
    paddingTop: "10px",
    borderTop: `1px solid ${vars.color.line}`,
    selectors: {
      "&:first-child": {
        borderTop: 0
      }
    }
  }
]);

export const criterionReasoning = style({
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.body,
  marginTop: "6px"
});

export const criterionMetrics = style({
  display: "grid",
  justifyItems: "end",
  gap: "4px",
  "@media": {
    [media.mobile]: {
      justifyItems: "start"
    }
  }
});

export const unknownList = style({
  margin: 0,
  paddingLeft: "18px",
  display: "grid",
  gap: "8px"
});
