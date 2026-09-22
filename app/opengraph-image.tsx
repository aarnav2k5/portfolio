import { ImageResponse } from "next/og";

import { Site } from "@/constants";

/**
 * The link preview card, generated at build time (no static asset to keep in sync).
 * Mirrors the site: near-black, square corners, mono, one blue accent.
 * ImageResponse supports flexbox only — no grid, no custom properties.
 */
export const alt = `${Site.name} — ${Site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0c0a09";
const FG = "#fafafa";
const MUTED = "#a1a1aa";
const BORDER = "#27272a";
const ACCENT = "#60a5fa";
const MONO = "ui-monospace, 'DejaVu Sans Mono', monospace";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 72,
          border: `1px solid ${BORDER}`,
        }}
      >
        {/* breadcrumb, same as the in-app one */}
        <div style={{ display: "flex", fontFamily: MONO, fontSize: 24 }}>
          <span style={{ color: MUTED }}>{Site.domain}</span>
          <span style={{ color: BORDER, padding: "0 10px" }}>/</span>
          <span style={{ color: ACCENT }}>README.md</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              borderLeft: `4px solid ${ACCENT}`,
              paddingLeft: 32,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 92,
                fontWeight: 700,
                color: FG,
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              {Site.name}
            </div>
            <div style={{ fontSize: 38, color: MUTED, marginTop: 14 }}>
              {Site.role}
            </div>
          </div>

          <div
            style={{
              fontSize: 27,
              color: MUTED,
              marginTop: 34,
              maxWidth: 900,
              lineHeight: 1.45,
            }}
          >
            {Site.bio}
          </div>
        </div>

        {/* stack strip */}
        <div style={{ display: "flex", gap: 12, fontFamily: MONO }}>
          {["React", "Next.js", "Node.js", "Postgres", "AWS"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: `1px solid ${BORDER}`,
                color: MUTED,
                fontSize: 22,
                padding: "8px 16px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
