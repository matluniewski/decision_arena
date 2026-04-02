import { style, styleVariants } from "@vanilla-extract/css";
import { media, vars } from "../../../styles/theme.css";
import { metricPill, softCard } from "../../../styles/primitives.css";

export const replayLayout = style({
  display: "grid",
  gridTemplateColumns: "220px minmax(0, 1fr)",
  gap: vars.space.lg,
  alignItems: "start",
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const railShell = style({
  position: "sticky",
  top: "104px",
  '@media': {
    [media.tablet]: {
      top: "88px",
      zIndex: 3
    }
  }
});

export const railNav = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.md,
    padding: vars.space.md,
    '@media': {
      [media.tablet]: {
        padding: vars.space.sm,
        overflowX: "auto"
      }
    }
  }
]);

export const railTitle = style({
  fontSize: vars.text.xs,
  fontWeight: 700,
  color: vars.color.accentDeep,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  '@media': {
    [media.tablet]: {
      position: "absolute",
      width: "1px",
      height: "1px",
      overflow: "hidden",
      clip: "rect(0 0 0 0)"
    }
  }
});

export const railLinks = style({
  display: "grid",
  gap: vars.space.xs,
  '@media': {
    [media.tablet]: {
      display: "flex",
      flexWrap: "nowrap",
      gap: vars.space.xs,
      minWidth: "max-content"
    }
  }
});

export const railLink = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: "10px 12px",
  borderRadius: vars.radius.pill,
  color: vars.color.muted,
  textDecoration: "none",
  border: `1px solid transparent`,
  transition: "background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease",
  selectors: {
    '&:hover': {
      color: vars.color.text,
      background: "rgba(255, 250, 244, 0.88)",
      borderColor: "rgba(216, 74, 16, 0.12)"
    }
  },
  '@media': {
    [media.tablet]: {
      whiteSpace: "nowrap"
    }
  }
});

export const railLinkActive = style({
  color: vars.color.text,
  background: "rgba(255, 247, 238, 0.96)",
  borderColor: "rgba(216, 74, 16, 0.18)",
  boxShadow: "0 12px 28px rgba(46, 24, 8, 0.08)"
});

export const railIndex = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  borderRadius: "999px",
  background: "rgba(216, 74, 16, 0.1)",
  color: vars.color.accentDeep,
  fontSize: vars.text.xs,
  fontWeight: 700,
  flexShrink: 0
});

export const resultGrid = style({
  display: "grid",
  gap: vars.space.xl
});

export const replaySection = style({
  display: "grid",
  gap: vars.space.md,
  padding: vars.space.xl,
  scrollMarginTop: "124px",
  '@media': {
    [media.mobile]: {
      padding: vars.space.lg,
      scrollMarginTop: "112px"
    }
  }
});

export const revealSection = style({
  opacity: 0,
  transform: "translateY(28px)",
  transition: "opacity 560ms ease, transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  willChange: "opacity, transform",
  '@media': {
    [media.reducedMotion]: {
      opacity: 1,
      transform: "none",
      transition: "none"
    }
  }
});

export const revealVisible = style({
  opacity: 1,
  transform: "translateY(0)"
});

export const revealDelay = styleVariants({
  step0: { transitionDelay: "0ms" },
  step1: { transitionDelay: "60ms" },
  step2: { transitionDelay: "90ms" },
  step3: { transitionDelay: "120ms" },
  step4: { transitionDelay: "140ms" },
  step5: { transitionDelay: "160ms" }
});

export const sectionHeader = style({
  display: "grid",
  gap: vars.space.xs,
  maxWidth: "62ch"
});

export const sectionDescription = style({
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body,
  margin: 0
});

export const introPanel = style({
  background: "linear-gradient(145deg, rgba(255, 107, 44, 0.14), rgba(15, 139, 141, 0.14))"
});

export const introLayout = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.35fr) minmax(280px, 0.8fr)",
  gap: vars.space.lg,
  alignItems: "start",
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const introLead = style({
  display: "grid",
  gap: vars.space.sm
});

export const introTitle = style({
  fontFamily: vars.font.display,
  fontSize: "clamp(2rem, 4vw, 3.25rem)",
  lineHeight: vars.lineHeight.tight,
  margin: 0,
  maxWidth: "14ch"
});

export const introQuestion = style({
  fontFamily: vars.font.display,
  fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
  lineHeight: vars.lineHeight.tight,
  margin: 0,
  maxWidth: "18ch"
});

export const introCopy = style({
  margin: 0,
  fontSize: vars.text.lg,
  lineHeight: vars.lineHeight.body,
  color: vars.color.text,
  maxWidth: "58ch"
});

export const introMeta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm
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

export const stageBadge = style([
  metricPill,
  {
    background: "rgba(255, 250, 244, 0.88)",
    color: vars.color.accentDeep
  }
]);

export const spotlightCard = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.md,
    padding: vars.space.lg,
    minHeight: "100%",
    background: "rgba(255, 250, 244, 0.96)"
  }
]);

export const spotlightHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.space.sm
});

export const spotlightLabel = style({
  display: "grid",
  gap: vars.space.xxs
});

export const spotlightTitle = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.displaySm,
  lineHeight: vars.lineHeight.tight
});

export const spotlightSummary = style({
  margin: 0,
  color: vars.color.text,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});

export const scorePill = style([
  metricPill,
  {
    fontFamily: vars.font.display,
    fontSize: vars.text.xl
  }
]);

export const spotlightStats = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: vars.space.sm,
  '@media': {
    [media.mobile]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const summaryCard = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.xs,
    minHeight: "148px",
    alignContent: "start"
  }
]);

export const summaryLabel = style({
  color: vars.color.accentDeep,
  fontSize: vars.text.xs,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em"
});

export const summaryValue = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displaySm,
  lineHeight: vars.lineHeight.tight
});

export const summaryMeta = style({
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.compact
});

export const whyGrid = style({
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: vars.space.md,
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const whyColumn = style({
  display: "grid",
  gap: vars.space.md
});

export const reasonCard = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.sm
  }
]);

export const reasonHeader = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space.sm,
  alignItems: "center"
});

export const reasonTitle = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.lg
});

export const reasonList = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: vars.space.sm
});

export const reasonListItem = style({
  display: "grid",
  gap: vars.space.xxs,
  paddingLeft: vars.space.md,
  position: "relative",
  selectors: {
    '&::before': {
      content: '""',
      position: "absolute",
      left: 0,
      top: "0.72rem",
      width: "7px",
      height: "7px",
      borderRadius: "999px",
      background: vars.color.accent
    }
  }
});

export const reasonLead = style({
  margin: 0,
  fontWeight: 700
});

export const reasonMeta = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.body
});

export const tradeoffCard = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.sm,
    background: "rgba(255, 245, 237, 0.96)",
    borderColor: "rgba(216, 74, 16, 0.14)"
  }
]);

export const tradeoffTitle = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.lg
});

export const tradeoffCopy = style({
  margin: 0,
  color: vars.color.text,
  lineHeight: vars.lineHeight.body
});

export const scoreboard = style({
  display: "grid",
  gap: vars.space.sm
});

export const scoreRow = style([
  softCard,
  {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(180px, 0.42fr)",
    gap: vars.space.md,
    alignItems: "center",
    '@media': {
      [media.mobile]: {
        gridTemplateColumns: "1fr"
      }
    }
  }
]);

export const scoreRowMain = style({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr)",
  gap: vars.space.sm,
  alignItems: "start"
});

export const scoreRowCopy = style({
  display: "grid",
  gap: vars.space.xxs
});

export const scoreRowTitle = style({
  fontSize: vars.text.lg,
  margin: 0
});

export const scoreSummary = style({
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body,
  margin: 0
});

export const scoreRowAside = style({
  display: "grid",
  gap: vars.space.xs
});

export const scoreBadge = style({
  display: "grid",
  justifyItems: "end",
  gap: "2px",
  '@media': {
    [media.mobile]: {
      justifyItems: "start"
    }
  }
});

export const scoreBadgeValue = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.xl
});

export const scoreTrack = style({
  width: "100%",
  height: "10px",
  borderRadius: vars.radius.pill,
  background: "rgba(31, 36, 33, 0.08)",
  overflow: "hidden"
});

export const scoreTrackFill = style({
  display: "block",
  height: "100%",
  borderRadius: vars.radius.pill,
  background: "linear-gradient(90deg, rgba(255, 107, 44, 0.95), rgba(15, 139, 141, 0.95))",
  transition: "width 820ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  '@media': {
    [media.reducedMotion]: {
      transition: "none"
    }
  }
});

export const rankBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "start",
  borderRadius: vars.radius.pill,
  padding: "6px 10px",
  background: "rgba(216, 74, 16, 0.1)",
  color: vars.color.accentDeep,
  fontSize: vars.text.xs,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em"
});

export const detailsStack = style({
  display: "grid",
  gap: vars.space.sm
});

export const accordion = style([
  softCard,
  {
    padding: 0,
    overflow: "hidden"
  }
]);

export const accordionTrigger = style({
  width: "100%",
  border: 0,
  background: "transparent",
  cursor: "pointer",
  padding: vars.space.lg,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: vars.space.md,
  alignItems: "center",
  textAlign: "left"
});

export const accordionTriggerMain = style({
  display: "grid",
  gap: vars.space.xs
});

export const accordionSummary = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.body
});

export const accordionMeta = style({
  margin: 0,
  color: vars.color.accentDeep,
  fontSize: vars.text.xs,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase"
});

export const accordionChevron = style({
  color: vars.color.accentDeep,
  fontFamily: vars.font.display,
  fontSize: vars.text.lg
});

export const accordionBody = style({
  display: "grid",
  gap: vars.space.md,
  padding: `0 ${vars.space.lg} ${vars.space.lg}`
});

export const detailIntro = style({
  display: "grid",
  gap: vars.space.xxs
});

export const detailIntroCopy = style({
  margin: 0,
  color: vars.color.text,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body
});

export const listGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.space.sm,
  '@media': {
    [media.mobile]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const listBlock = style({
  display: "grid",
  gap: "12px"
});

export const listBlockCompact = style([
  softCard,
  {
    display: "grid",
    gap: "12px",
    padding: vars.space.md,
    background: "rgba(255, 250, 244, 0.92)"
  }
]);

export const listTitle = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: vars.text.md
});

export const bulletList = style({
  margin: 0,
  paddingLeft: "18px",
  display: "grid",
  gap: "8px",
  color: vars.color.text,
  lineHeight: vars.lineHeight.body
});

export const riskCallout = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.xs,
    padding: vars.space.md,
    background: "rgba(248, 252, 251, 0.96)"
  }
]);

export const riskCalloutText = style({
  margin: 0,
  color: vars.color.text,
  lineHeight: vars.lineHeight.body
});

export const criteriaSection = style({
  display: "grid",
  gap: vars.space.sm,
  paddingTop: vars.space.sm,
  borderTop: `1px solid ${vars.color.line}`
});

export const criteriaToggle = style({
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.field,
  background: "rgba(255, 250, 244, 0.92)",
  padding: `${vars.space.sm} ${vars.space.md}`,
  color: vars.color.text,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.sm,
  cursor: "pointer",
  fontSize: vars.text.sm,
  fontWeight: 700,
  textAlign: "left",
  transition: "border-color 180ms ease, background 180ms ease",
  selectors: {
    '&:hover': {
      borderColor: "rgba(216, 74, 16, 0.22)",
      background: "rgba(255, 247, 238, 0.98)"
    }
  }
});

export const criteriaToggleMeta = style({
  color: vars.color.muted,
  fontSize: vars.text.xs,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  flexShrink: 0
});

export const criteriaTable = style({
  display: "grid",
  gap: vars.space.sm,
  paddingTop: vars.space.xs
});

export const criterionRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(140px, 0.42fr)",
  gap: vars.space.sm,
  alignItems: "start",
  paddingTop: vars.space.sm,
  borderTop: `1px solid ${vars.color.line}`,
  selectors: {
    '&:first-child': {
      borderTop: 0,
      paddingTop: 0
    }
  },
  '@media': {
    [media.mobile]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const criterionCopy = style({
  display: "grid",
  gap: vars.space.xxs
});

export const criterionReasoning = style({
  color: vars.color.muted,
  fontSize: vars.text.sm,
  lineHeight: vars.lineHeight.body,
  margin: 0
});

export const criterionAside = style({
  display: "grid",
  gap: vars.space.xs
});

export const criterionMetrics = style({
  display: "grid",
  justifyItems: "end",
  gap: "4px",
  '@media': {
    [media.mobile]: {
      justifyItems: "start"
    }
  }
});

export const criterionTrack = style({
  width: "100%",
  height: "8px",
  borderRadius: vars.radius.pill,
  background: "rgba(31, 36, 33, 0.08)",
  overflow: "hidden"
});

export const criterionTrackFill = style({
  display: "block",
  height: "100%",
  borderRadius: vars.radius.pill,
  background: "linear-gradient(90deg, rgba(15, 139, 141, 0.95), rgba(255, 107, 44, 0.9))",
  transition: "width 520ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  '@media': {
    [media.reducedMotion]: {
      transition: "none"
    }
  }
});

export const unknownGrid = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: vars.space.sm
});

export const unknownCard = style([
  softCard,
  {
    listStyle: "none",
    lineHeight: vars.lineHeight.body,
    minHeight: "100px"
  }
]);

export const verdictCallout = style([
  softCard,
  {
    display: "grid",
    gap: vars.space.sm,
    padding: vars.space.xl,
    background: "linear-gradient(180deg, rgba(255, 250, 244, 0.98), rgba(248, 252, 251, 0.98))"
  }
]);

export const verdictText = style({
  margin: 0,
  fontFamily: vars.font.display,
  fontSize: "clamp(1.35rem, 2vw, 1.8rem)",
  lineHeight: vars.lineHeight.tight,
  maxWidth: "28ch"
});

export const verdictSupport = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body,
  maxWidth: "56ch"
});

export const finalActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm
});

