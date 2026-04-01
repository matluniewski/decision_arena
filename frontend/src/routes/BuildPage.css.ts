import { style } from "@vanilla-extract/css";
import { media, vars } from "../styles/theme.css";
import { softCard } from "../styles/primitives.css";

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

export const decisionTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.displayMd,
  lineHeight: vars.lineHeight.tight
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

export const weightControl = style({
  display: "flex",
  alignItems: "center",
  gap: "14px"
});

export const rangeInput = style({
  flex: 1
});
