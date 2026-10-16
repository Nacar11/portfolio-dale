import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { theme } from "@/config/theme";

const { colors } = theme;

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number, italic = false) {
  // Use the Google Fonts CSS API to discover the woff/woff2 URL for one weight,
  // then fetch the binary. Wrapped in try/catch so a network blip falls back to
  // the system serif rather than failing the OG image build.
  const style = italic ? "ital,wght@1," : "wght@";
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:${style}${weight}&display=swap`;
  const css = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype|woff2?)'\)/);
  if (!match) throw new Error(`Could not locate font URL for ${family}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Image() {
  let fonts: { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" | "italic" }[] = [];
  try {
    const [display, italic, body] = await Promise.all([
      loadGoogleFont("Fraunces", 500, false),
      loadGoogleFont("Fraunces", 400, true),
      loadGoogleFont("Inter", 400, false),
    ]);
    fonts = [
      { name: "Fraunces", data: display, weight: 500, style: "normal" },
      { name: "Fraunces", data: italic, weight: 400, style: "italic" },
      { name: "Inter", data: body, weight: 400, style: "normal" },
    ];
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: colors.paper,
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: fonts.length ? "Fraunces, Georgia, serif" : "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: colors.taupe,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: fonts.length ? "Inter, system-ui, sans-serif" : "system-ui, sans-serif",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              color: colors.ink,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            {site.name}
            <span style={{ color: colors.accent }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: colors.accent,
              fontStyle: "italic",
              marginTop: 24,
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: `1px solid ${colors.hairline}`,
            fontFamily: fonts.length ? "Inter, system-ui, sans-serif" : "system-ui, sans-serif",
            fontSize: 18,
            color: colors.inkSoft,
          }}
        >
          <span>Calm, useful web products</span>
          <span style={{ color: colors.taupe }}>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
