import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F7F5F2",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#8A7F70",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              color: "#2B2A27",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: "#B5651D",
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
            borderTop: "1px solid #E8E2D8",
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            color: "#5A5550",
          }}
        >
          <span>Calm, useful web products</span>
          <span style={{ color: "#8A7F70" }}>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
