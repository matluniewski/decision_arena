import { globalStyle } from "@vanilla-extract/css";
import { media, vars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box"
});

globalStyle("html", {
  scrollBehavior: "smooth"
});

globalStyle("body", {
  margin: 0,
  minWidth: "320px",
  colorScheme: "light",
  backgroundColor: vars.color.bg
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none"
});

globalStyle("button, input, textarea", {
  font: "inherit"
});

globalStyle("button", {
  appearance: "none"
});

globalStyle("h1, h2, h3, h4, p", {
  margin: 0
});

globalStyle("img", {
  maxWidth: "100%",
  display: "block"
});

globalStyle("::selection", {
  background: "rgba(255, 107, 44, 0.22)"
});

globalStyle("html", {
  "@media": {
    [media.reducedMotion]: {
      scrollBehavior: "auto"
    }
  }
});
