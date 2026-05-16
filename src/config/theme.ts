export const theme = {
  colors: {
    paper: "#F7F5F2",
    surface: "#FFFFFF",
    ink: "#2B2A27",
    inkSoft: "#5A5550",
    taupe: "#8A7F70",
    hairline: "#E8E2D8",
    accent: "#B5651D",
    accentInk: "#8A4A14",
  },
  fonts: {
    display: "var(--font-fraunces)",
    sans: "var(--font-inter)",
    mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
} as const;

export type Theme = typeof theme;
