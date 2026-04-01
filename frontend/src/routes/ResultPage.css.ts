import { style } from "@vanilla-extract/css";
import { headerRow } from "../styles/primitives.css";

export const sharePanel = style([
  headerRow,
  {
    alignItems: "flex-start"
  }
]);
