import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";
import * as typography from "../../../styles/typography.css";

export const root = style({
  display: "grid",
  gap: "2px"
});

export const align = styleVariants({
  start: {
    justifyItems: "start"
  },
  end: {
    justifyItems: "end"
  }
});

export const value = style([
  typography.displaySm,
  {
    fontSize: vars.text.xl
  }
]);

export const caption = style([typography.bodySm, typography.muted]);
