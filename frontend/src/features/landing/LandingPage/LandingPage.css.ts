import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { media, vars } from "../../../styles/theme.css";
import { panel } from "../../../styles/primitives.css";
import * as typography from "../../../styles/typography.css";

const floatIn = keyframes({
  from: { opacity: 0, transform: "translateY(18px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" }
});

const driftA = keyframes({
  "0%, 100%": { transform: "rotate(-4deg) translateX(-52px) translateY(0)" },
  "50%": { transform: "rotate(-2deg) translateX(-40px) translateY(-8px)" }
});

const driftB = keyframes({
  "0%, 100%": { transform: "rotate(5deg) translateY(0)" },
  "50%": { transform: "rotate(3deg) translateY(10px)" }
});

const spinSlow = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
});

export const heroShowcase = style({
  gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
  alignItems: "center",
  gap: "28px",
  maxWidth: "none",
  marginBottom: "12px",
  minHeight: "68vh",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr",
      minHeight: "auto"
    }
  }
});

export const heroContentShowcase = style({
  maxWidth: "640px"
});

export const heroPreviewShell = style({
  position: "relative",
  display: "grid",
  gap: "18px",
  animation: `${floatIn} 900ms ease both`,
  selectors: {
    "&::before, &::after": {
      content: "",
      position: "absolute",
      borderRadius: vars.radius.pill,
      filter: "blur(8px)",
      zIndex: 0
    },
    "&::before": {
      inset: "18% auto auto -8%",
      width: "140px",
      height: "140px",
      background: "rgba(255, 107, 44, 0.16)"
    },
    "&::after": {
      inset: "auto -6% 6% auto",
      width: "170px",
      height: "170px",
      background: "rgba(15, 139, 141, 0.16)"
    }
  },
  "@media": {
    [media.reducedMotion]: {
      animation: "none"
    }
  }
});

const previewPanelBase = style({
  position: "relative",
  zIndex: 1,
  background: "rgba(255, 250, 244, 0.9)",
  border: "1px solid rgba(31, 36, 33, 0.08)",
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.floating,
  backdropFilter: "blur(14px)",
  overflow: "hidden",
  transition: "box-shadow 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 320ms ease, background 320ms ease, transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      inset: "-20% auto auto -120%",
      width: "70%",
      height: "160%",
      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.34), transparent)",
      transform: "rotate(12deg)",
      transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)"
    },
    "&:hover": {
      borderColor: "rgba(255, 107, 44, 0.22)",
      boxShadow: vars.shadow.floatingStrong
    },
    "&:hover::after": {
      transform: "translate3d(310%, 0, 0) rotate(12deg)"
    }
  },
  "@media": {
    [media.reducedMotion]: {
      transition: "none"
    }
  }
});

export const heroPreviewMain = style([
  previewPanelBase,
  {
    padding: "26px",
    display: "grid",
    gap: "14px",
    selectors: {
      "&:hover": {
        background: "linear-gradient(135deg, rgba(255, 250, 244, 0.98), rgba(255, 246, 239, 0.92))"
      }
    },
    "@media": {
      [media.mobile]: {
        padding: "22px"
      }
    }
  }
]);

export const heroPreviewTitle = style({
  fontFamily: vars.font.display,
  fontSize: "clamp(1.75rem, 3vw, 2.45rem)",
  lineHeight: vars.lineHeight.tight
});

export const previewBody = style([typography.bodyMd, typography.muted]);

export const heroHighlightRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px"
});

export const heroHighlightChip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: vars.radius.pill,
  background: "rgba(255, 107, 44, 0.1)",
  border: "1px solid rgba(255, 107, 44, 0.18)",
  fontSize: vars.text.sm,
  fontWeight: 700
});

export const heroPreviewStack = style({
  position: "relative",
  display: "grid",
  justifyItems: "end",
  minHeight: "220px",
  "@media": {
    [media.tablet]: {
      justifyItems: "stretch",
      minHeight: "auto"
    }
  }
});

export const heroPreviewCard = style([
  previewPanelBase,
  {
    width: "min(320px, 100%)",
    padding: "20px",
    display: "grid",
    gap: "10px"
  }
]);

export const heroPreviewCardTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displaySm,
  lineHeight: vars.lineHeight.tight
});

export const heroPreviewCardOffset = styleVariants({
  1: {
    transform: "rotate(-4deg) translateX(-52px)",
    animation: `${driftA} 9s ease-in-out infinite`,
    selectors: {
      "&:hover": {
        transform: "rotate(-6deg) translateX(-52px) scale(1.03)"
      }
    },
    "@media": {
      [media.tablet]: { transform: "none", animation: "none" },
      [media.reducedMotion]: { transform: "none", animation: "none" }
    }
  },
  2: {
    marginTop: "-22px",
    transform: "rotate(5deg)",
    animation: `${driftB} 10s ease-in-out infinite`,
    selectors: {
      "&:hover": {
        transform: "rotate(7deg) scale(1.03)"
      }
    },
    "@media": {
      [media.tablet]: { marginTop: 0, transform: "none", animation: "none" },
      [media.reducedMotion]: { transform: "none", animation: "none" }
    }
  }
});

export const anchorBar = style({
  position: "sticky",
  top: "14px",
  zIndex: 20,
  marginTop: "-8px",
  opacity: 0,
  transform: "translateY(-10px)",
  pointerEvents: "none",
  transition: "opacity 220ms ease, transform 220ms ease"
});

export const anchorBarVisible = style({
  opacity: 1,
  transform: "translateY(0)",
  pointerEvents: "auto"
});

export const anchorShell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "10px 14px",
  border: "1px solid rgba(31, 36, 33, 0.08)",
  borderRadius: vars.radius.pill,
  background: "rgba(255, 250, 244, 0.78)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 16px 40px rgba(46, 24, 8, 0.08)",
  "@media": {
    [media.tablet]: {
      borderRadius: vars.radius.panel,
      alignItems: "flex-start",
      flexDirection: "column"
    }
  }
});

export const anchorNav = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap"
});

export const anchorLink = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: vars.radius.pill,
  color: vars.color.muted,
  transition: "background 180ms ease, color 180ms ease, transform 180ms ease",
  selectors: {
    "&:hover": {
      background: "rgba(255, 107, 44, 0.1)",
      color: vars.color.accentDeep,
      transform: "translateY(-1px)"
    }
  }
});

export const anchorLinkActive = style({
  background: "linear-gradient(135deg, rgba(255, 107, 44, 0.14), rgba(15, 139, 141, 0.12))",
  color: vars.color.accentDeep,
  boxShadow: "inset 0 0 0 1px rgba(255, 107, 44, 0.12)"
});

export const anchorButton = style({
  whiteSpace: "nowrap",
  "@media": {
    [media.mobile]: {
      width: "100%"
    }
  }
});

export const section = style({
  scrollMarginTop: "32px",
  position: "relative"
});

export const introSection = style({
  paddingTop: "18px"
});

export const spaciousSection = style({
  paddingBlock: "clamp(32px, 7vw, 96px)",
  minHeight: "clamp(360px, 58vh, 720px)",
  alignContent: "center",
  "@media": {
    [media.tablet]: {
      minHeight: "auto",
      paddingBlock: "28px"
    }
  }
});

export const introGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.05fr) minmax(300px, 0.95fr)",
  gap: "22px",
  alignItems: "start",
  minHeight: "clamp(420px, 54vh, 680px)",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const primaryPanel = style({
  display: "grid",
  gap: "24px"
});

export const sidePanel = style([
  panel,
  {
    padding: "28px",
    display: "grid",
    gap: "20px",
    alignContent: "space-between",
    "@media": {
      [media.mobile]: {
        padding: "22px"
      }
    }
  }
]);

export const sectionCopy = style({
  display: "grid",
  gap: "10px"
});

export const sectionCopyWide = style({
  maxWidth: "820px"
});

export const promptIntro = style({
  gap: "14px"
});

export const promptForm = style({
  display: "grid",
  gap: "16px"
});

export const formFooter = style({
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

export const checklist = style({
  display: "grid",
  gap: "14px"
});

export const checklistItem = style({
  display: "grid",
  gridTemplateColumns: "34px minmax(0, 1fr)",
  gap: "14px",
  padding: "14px 0",
  borderTop: `1px solid ${vars.color.line}`,
  selectors: {
    "&:first-child": {
      borderTop: 0,
      paddingTop: 0
    }
  }
});

export const checklistMark = style({
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, rgba(255, 107, 44, 0.16), rgba(15, 139, 141, 0.18))",
  color: vars.color.accentDeep,
  fontWeight: 700
});

export const exampleHeader = style({
  marginBottom: "28px"
});

export const exampleGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))",
  justifyContent: "start",
  gap: "22px",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

const exampleCardBase = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "240px",
  padding: "24px",
  overflow: "hidden",
  textAlign: "left",
  border: `1px solid ${vars.color.line}`,
  background: vars.color.panelStrong,
  borderRadius: vars.radius.card,
  boxShadow: vars.shadow.panel,
  cursor: "pointer",
  transition: "box-shadow 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 320ms ease, transform 420ms cubic-bezier(0.16, 1, 0.3, 1), background 320ms ease",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      inset: "auto -20% -35% auto",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255, 107, 44, 0.22), transparent 70%)",
      transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease"
    },
    "&::after": {
      content: "",
      position: "absolute",
      inset: "auto 18px 18px auto",
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      border: "1px solid rgba(31, 36, 33, 0.08)",
      opacity: 0.55,
      transition: "transform 320ms ease, border-color 320ms ease, opacity 320ms ease"
    },
    "&:hover": {
      transform: "translate3d(0, -10px, 0) scale(1.01)",
      borderColor: "rgba(255, 107, 44, 0.22)",
      boxShadow: vars.shadow.floatingStrong,
      background: "rgba(255, 250, 244, 0.98)"
    },
    "&:hover::before": {
      transform: "translate3d(-18px, -12px, 0) scale(1.08)"
    },
    "&:hover::after": {
      transform: "scale(1.2)",
      borderColor: "rgba(255, 107, 44, 0.22)",
      opacity: 0.9
    }
  }
});

export const exampleCard = style([exampleCardBase]);

export const exampleCardOffset = styleVariants({
  1: { transform: "translateY(0)" },
  2: { transform: "translateY(48px)", "@media": { [media.tablet]: { transform: "none" } } },
  3: { transform: "translateY(18px)", "@media": { [media.tablet]: { transform: "none" } } }
});

export const exampleCardTitle = style([
  typography.headingLg,
  {
    position: "relative",
    zIndex: 1,
    marginTop: "auto",
    fontSize: "1.4rem",
    lineHeight: 1.08,
    maxWidth: "12ch",
    paddingTop: "20px"
  }
]);

export const exampleCardIndex = style({
  position: "absolute",
  top: "22px",
  right: "24px",
  fontFamily: vars.font.display,
  fontSize: "1.7rem",
  lineHeight: 1,
  color: "rgba(31, 36, 33, 0.16)"
});

export const infoSection = style({
  display: "grid",
  gap: "28px"
});

export const infoSectionHeader = style({
  display: "grid",
  gap: "10px",
  maxWidth: "760px"
});

export const storyHeader = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 240px",
  gap: "24px",
  alignItems: "center",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

export const storyTitle = style([
  typography.displayLg,
  {
    maxWidth: "12ch"
  }
]);

export const storyOrbit = style({
  position: "relative",
  height: "220px",
  display: "grid",
  placeItems: "center"
});

export const storyOrbitRing = style({
  position: "absolute",
  inset: "18px",
  borderRadius: "50%",
  border: "1px solid rgba(31, 36, 33, 0.12)",
  animation: `${spinSlow} 16s linear infinite`,
  "@media": {
    [media.reducedMotion]: {
      animation: "none"
    }
  }
});

export const storyOrbitCore = style({
  position: "absolute",
  width: "92px",
  height: "92px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, rgba(255, 107, 44, 0.24), rgba(15, 139, 141, 0.24))",
  boxShadow: "0 20px 50px rgba(46, 24, 8, 0.12)"
});

export const processGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 880px)",
  gap: "28px",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

const processCardBase = style({
  position: "relative",
  minHeight: "200px",
  padding: "32px 32px 32px 110px",
  background: "linear-gradient(135deg, rgba(255, 250, 244, 0.96), rgba(255, 247, 239, 0.86)), linear-gradient(135deg, rgba(255, 107, 44, 0.08), rgba(15, 139, 141, 0.08))",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      inset: "28px auto 28px 42px",
      width: "1px",
      background: "linear-gradient(180deg, rgba(255, 107, 44, 0.24), rgba(15, 139, 141, 0.16))"
    }
  }
});

export const processCard = style([panel, processCardBase]);

export const processCardOffset = styleVariants({
  1: {},
  2: { marginLeft: "56px", "@media": { [media.tablet]: { marginLeft: 0 } } },
  3: { marginLeft: "112px", "@media": { [media.tablet]: { marginLeft: 0 } } }
});

export const processCardTitle = style([
  typography.displaySm,
  {
    lineHeight: "1.08"
  }
]);

export const processCardBody = style([typography.bodyMd, typography.muted]);

export const processStepIndex = style({
  position: "absolute",
  left: "18px",
  top: "24px",
  fontFamily: vars.font.display,
  fontSize: "1.8rem",
  color: vars.color.accentDeep
});

export const comparisonHeader = style({
  maxWidth: "860px"
});

export const comparisonGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
  alignItems: "stretch",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

const comparisonCardBase = style({
  minHeight: "340px",
  padding: "30px",
  position: "relative",
  overflow: "hidden",
  display: "grid",
  gap: "22px",
  alignContent: "space-between",
  borderRadius: vars.radius.panel,
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      inset: "auto -14% -14% auto",
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 70%)"
    }
  }
});

export const comparisonCard = style([comparisonCardBase]);

export const comparisonTone = styleVariants({
  chat: {
    background: "linear-gradient(160deg, rgba(31, 36, 33, 0.92), rgba(60, 61, 58, 0.92))",
    color: "#fff7ee"
  },
  arena: {
    background: "linear-gradient(145deg, rgba(255, 107, 44, 0.9), rgba(15, 139, 141, 0.84))",
    color: "white"
  }
});

export const comparisonCardHeader = style({
  position: "relative",
  zIndex: 1,
  display: "grid",
  gap: "12px"
});

export const comparisonEyebrow = style({
  position: "relative",
  zIndex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifySelf: "start",
  padding: "8px 12px",
  borderRadius: vars.radius.pill,
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: "rgba(255, 255, 255, 0.92)",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.12)"
});

export const comparisonCardTitle = style([
  typography.displayMd,
  {
    position: "relative",
    zIndex: 1,
    fontSize: "clamp(1.7rem, 3vw, 2rem)",
    lineHeight: "1",
    maxWidth: "10ch"
  }
]);

export const comparisonDivider = style({
  position: "relative",
  zIndex: 1,
  height: "1px",
  background: "rgba(255, 255, 255, 0.16)"
});

export const comparisonList = style({
  position: "relative",
  zIndex: 1,
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: "12px"
});

export const comparisonListItem = style({
  display: "grid",
  gridTemplateColumns: "22px minmax(0, 1fr)",
  gap: "12px",
  alignItems: "start",
  padding: "14px 16px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: vars.text.md,
  lineHeight: 1.5
});

export const comparisonListItemMark = style({
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  fontWeight: 700,
  background: "rgba(255, 255, 255, 0.14)",
  border: "1px solid rgba(255, 255, 255, 0.16)"
});

export const comparisonCardFooter = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  paddingTop: "6px"
});

export const comparisonFooterLabel = style({
  fontSize: vars.text.sm,
  color: "rgba(255, 255, 255, 0.72)",
  letterSpacing: "0.04em"
});

export const comparisonFooterValue = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: vars.radius.pill,
  fontWeight: 700,
  fontSize: vars.text.sm,
  background: "rgba(255, 255, 255, 0.12)",
  border: "1px solid rgba(255, 255, 255, 0.14)"
});

export const useCasesPanel = style([
  panel,
  {
    display: "grid",
    gap: "18px",
    padding: "40px",
    background: "linear-gradient(180deg, rgba(255, 250, 244, 0.94), rgba(255, 245, 236, 0.88)), radial-gradient(circle at top right, rgba(255, 107, 44, 0.1), transparent 30%)",
    "@media": {
      [media.mobile]: {
        padding: "22px"
      }
    }
  }
]);

export const useCasesGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
  gap: "18px",
  maxWidth: "980px",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr"
    }
  }
});

const useCaseCardBase = style({
  display: "grid",
  gap: "18px",
  minHeight: "180px",
  padding: "22px",
  borderRadius: vars.radius.panel,
  border: `1px solid ${vars.color.line}`,
  background: "rgba(255, 250, 244, 0.84)",
  boxShadow: vars.shadow.panel,
  transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
  selectors: {
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 28px 80px rgba(46, 24, 8, 0.16)",
      borderColor: "rgba(255, 107, 44, 0.18)"
    }
  }
});

export const useCaseCard = style([useCaseCardBase]);

export const useCaseSpan = styleVariants({
  wide: { gridColumn: "span 3", "@media": { [media.tablet]: { gridColumn: "auto" } } },
  medium: { gridColumn: "span 2", "@media": { [media.tablet]: { gridColumn: "auto" } } },
  default: {}
});

export const useCaseIndex = style({
  fontFamily: vars.font.display,
  fontSize: "1.6rem",
  lineHeight: 1,
  color: "rgba(31, 36, 33, 0.2)"
});

export const useCaseText = style([
  typography.headingLg,
  {
    lineHeight: "1.18"
  }
]);

export const ctaBand = style([
  panel,
  {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(260px, 0.9fr)",
    gap: "28px",
    alignItems: "center",
    padding: "38px 40px",
    background: "linear-gradient(145deg, rgba(255, 107, 44, 0.14), rgba(15, 139, 141, 0.12)), rgba(255, 250, 244, 0.94)",
    "@media": {
      [media.tablet]: {
        gridTemplateColumns: "1fr"
      },
      [media.mobile]: {
        padding: "22px"
      }
    }
  }
]);

export const ctaCopy = style({
  display: "grid",
  gap: "12px",
  maxWidth: "720px"
});

export const ctaTitle = style([
  typography.displayLg,
  {
    maxWidth: "12ch"
  }
]);

export const ctaBody = style([typography.bodyMd, typography.muted]);

export const ctaActions = style({
  display: "grid",
  gap: "16px",
  justifyItems: "start"
});

export const ctaLinks = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px"
});

export const ctaLink = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: vars.radius.pill,
  color: vars.color.muted,
  transition: "background 180ms ease, color 180ms ease, transform 180ms ease",
  selectors: {
    "&:hover": {
      background: "rgba(255, 107, 44, 0.1)",
      color: vars.color.accentDeep,
      transform: "translateY(-1px)"
    }
  }
});

const revealBase = style({
  opacity: 0,
  filter: "blur(8px)",
  transition: "opacity 700ms ease, transform 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 900ms cubic-bezier(0.16, 1, 0.3, 1)",
  selectors: {
    '&[data-visible="true"]': {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1)",
      filter: "blur(0)"
    }
  },
  "@media": {
    [media.reducedMotion]: {
      opacity: 1,
      filter: "none",
      transform: "none",
      transition: "none"
    }
  }
});

export const reveal = style([revealBase]);

export const revealDirection = styleVariants({
  up: { transform: "translate3d(0, 44px, 0) scale(0.98)" },
  left: { transform: "translate3d(-44px, 0, 0) scale(0.98)" },
  right: { transform: "translate3d(44px, 0, 0) scale(0.98)" }
});

export const revealDelay = styleVariants({
  0: { transitionDelay: "0ms" },
  1: { transitionDelay: "80ms" },
  2: { transitionDelay: "160ms" },
  3: { transitionDelay: "240ms" },
  4: { transitionDelay: "320ms" }
});

