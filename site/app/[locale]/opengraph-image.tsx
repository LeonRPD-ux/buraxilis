import { ImageResponse } from "next/og";

export const alt = "Buraxılışa hazırlıq — mobil tətbiq";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0f",
          color: "#f3f4f8",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: "#2b41d9",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: "-0.02em", fontWeight: 700 }}>
            Buraxılış
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Buraxılış imtahanına hazırlıq, cibində.
          </div>
          <div style={{ fontSize: 30, color: "#9aa1b4", letterSpacing: "-0.01em" }}>
            10 fənn · DİM 2026 düsturu · Offline
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6f7688" }}>
          V28.5 · buraxilis.az
        </div>
      </div>
    ),
    { ...size },
  );
}
