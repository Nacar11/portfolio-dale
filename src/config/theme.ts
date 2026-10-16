// Mirrors the CSS tokens in globals.css for contexts that can't read CSS
// variables (the generated Open Graph image). Keep the two in sync.
export const theme = {
  colors: {
    paper: "#F7F5F2",
    ink: "#2B2A27",
    inkSoft: "#5A5550",
    taupe: "#8A7F70",
    hairline: "#E8E2D8",
    accent: "#B5651D",
  },
} as const;
