import { style } from "@vanilla-extract/css";
import { vars } from "./styles/theme.css";

export const appRoot = style({
  minHeight: "100vh",
  fontFamily: vars.font.body,
  fontSize: vars.text.md,
  lineHeight: vars.lineHeight.body,
  color: vars.color.text,
  background: `
    radial-gradient(circle at top left, rgba(255, 107, 44, 0.2), transparent 35%),
    radial-gradient(circle at top right, rgba(15, 139, 141, 0.18), transparent 25%),
    linear-gradient(180deg, #fcf5ed 0%, #f0e3d3 100%)
  `
});
