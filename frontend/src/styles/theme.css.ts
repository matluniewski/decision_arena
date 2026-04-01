import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    bg: "#f6efe6",
    bgStrong: "#fefaf4",
    panel: "rgba(255, 250, 244, 0.78)",
    panelStrong: "rgba(255, 250, 244, 0.94)",
    text: "#1f2421",
    muted: "#4d514b",
    line: "rgba(31, 36, 33, 0.1)",
    accent: "#ff6b2c",
    accentDeep: "#d84a10",
    accentCool: "#0f8b8d",
    good: "#0c8c55",
    warn: "#c56b13",
    bad: "#9f2a2a"
  },
  font: {
    body: '"IBM Plex Sans", "Segoe UI", sans-serif',
    display: '"Space Grotesk", sans-serif'
  },
  text: {
    xs: "0.78rem",
    sm: "0.92rem",
    md: "1rem",
    lg: "1.1rem",
    xl: "1.25rem",
    displaySm: "1.5rem",
    displayMd: "1.85rem",
    displayLg: "clamp(2rem, 4vw, 3.25rem)",
    hero: "clamp(2.9rem, 7vw, 4.8rem)"
  },
  lineHeight: {
    tight: "1.02",
    display: "0.98",
    body: "1.62",
    compact: "1.45"
  },
  shadow: {
    panel: "0 20px 60px rgba(46, 24, 8, 0.12)",
    floating: "0 24px 70px rgba(46, 24, 8, 0.14)",
    floatingStrong: "0 36px 90px rgba(46, 24, 8, 0.18)"
  },
  radius: {
    panel: "28px",
    card: "24px",
    pill: "999px",
    field: "18px"
  },
  space: {
    xxs: "6px",
    xs: "10px",
    sm: "14px",
    md: "18px",
    lg: "24px",
    xl: "32px",
    xxl: "40px"
  },
  size: {
    content: "1200px"
  }
});

export const media = {
  tablet: "screen and (max-width: 980px)",
  mobile: "screen and (max-width: 640px)",
  reducedMotion: "(prefers-reduced-motion: reduce)"
} as const;
