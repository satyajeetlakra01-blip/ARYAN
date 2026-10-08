import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface CyberHUDProps {
  sectionLabel: string;
  subLabel?: string;
  accentColor?: string;
}

export const CyberHUD: React.FC<CyberHUDProps> = ({
  sectionLabel,
  subLabel = "ARYAN_OS // 60 FPS MOTION ENGINE",
  accentColor = "#ff6b00",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const seconds = (frame / fps).toFixed(2);
  const framePadded = String(frame).padStart(4, "0");

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Top Telemetry Header */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 13,
          letterSpacing: "0.15em",
          color: "rgba(255, 255, 255, 0.6)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          paddingBottom: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          <span style={{ color: "#ffffff", fontWeight: 700 }}>ARYAN TANTY</span>
          <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>//</span>
          <span>{sectionLabel}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span>LOC: 20.95°N 85.09°E</span>
          <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
          <span style={{ color: accentColor }}>TC: {seconds}s</span>
          <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
          <span>FR: {framePadded}</span>
        </div>
      </div>

      {/* Corner Bracket Reticles */}
      {/* Top Left */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 20,
          height: 20,
          borderTop: `2px solid ${accentColor}`,
          borderLeft: `2px solid ${accentColor}`,
        }}
      />
      {/* Top Right */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 20,
          height: 20,
          borderTop: `2px solid ${accentColor}`,
          borderRight: `2px solid ${accentColor}`,
        }}
      />
      {/* Bottom Left */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 20,
          height: 20,
          borderBottom: `2px solid ${accentColor}`,
          borderLeft: `2px solid ${accentColor}`,
        }}
      />
      {/* Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 20,
          height: 20,
          borderBottom: `2px solid ${accentColor}`,
          borderRight: `2px solid ${accentColor}`,
        }}
      />

      {/* Bottom Status Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 12,
          letterSpacing: "0.12em",
          color: "rgba(255, 255, 255, 0.5)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: 12,
        }}
      >
        <span>{subLabel}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span>AUDIO ENGINE: SYNCED 120BPM</span>
          <span style={{ color: "#22c55e" }}>● ONLINE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
