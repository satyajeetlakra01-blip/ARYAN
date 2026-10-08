import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { ParticlesBackground } from "../components/ParticlesBackground";
import { CyberHUD } from "../components/CyberHUD";

export const Scene5ClimaxEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0 - 120 frames (46s - 50.0s) -> Rapid kinetic words
  // Frame 120 (50.2s): THE GRAND DROP & END CARD!

  const isEndCard = frame >= 120;
  const endFrame = frame - 120;

  // Flash white/gold on drop at frame 120
  const flashOpacity = interpolate(frame, [118, 121, 136], [0, 0.95, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardSpring = spring({
    frame: endFrame,
    fps,
    config: { damping: 16, mass: 1, stiffness: 120 },
  });

  // Kinetic words in Phase 1
  const words = ["DISCIPLINE.", "INNOVATION.", "HARDWARE.", "CRICKET.", "VISION."];
  const wordIdx = Math.floor(frame / 24);
  const currentWord = words[Math.min(wordIdx, words.length - 1)];

  return (
    <AbsoluteFill style={{ backgroundColor: "#030407" }}>
      <ParticlesBackground theme="climax" accentColor="#ff6b00" />
      <CyberHUD
        sectionLabel="ACT_05 // THE_OFFICIAL_END_CARD"
        subLabel="CURIOUS BY NATURE. PRECISE BY CHOICE."
        accentColor="#ff6b00"
      />

      {/* PHASE 1: RAPID KINETIC WORDS FLASH (Frames 0 to 119) */}
      {!isEndCard && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 24,
              letterSpacing: "0.4em",
              color: "#ff6b00",
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            [ THE ACCELERATION ]
          </div>

          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              textTransform: "uppercase",
              textShadow: "0 0 50px rgba(255,107,0,0.5)",
              transform: `scale(${1 + ((frame % 24) / 24) * 0.1})`,
            }}
          >
            {currentWord}
          </div>
        </AbsoluteFill>
      )}

      {/* PHASE 2: GRAND OFFICIAL END-CARD (Frames 120 to 420 / 50.2s - 60s) */}
      {isEndCard && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          {/* Main End-Card Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 950,
              transform: `scale(${cardSpring})`,
            }}
          >
            {/* Solar Avatar Emblem */}
            <div
              style={{
                position: "relative",
                width: 130,
                height: 130,
                borderRadius: "50%",
                padding: 4,
                background: "linear-gradient(135deg, #ff6b00, #ffaa00, #06b6d4)",
                boxShadow: "0 0 50px rgba(255,107,0,0.45)",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Img
                  src={staticFile("images/aryan-hero.jpg")}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Official Title */}
            <h1
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#ffffff",
                margin: "0 0 10px 0",
              }}
            >
              ARYAN TANTY
            </h1>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 18,
                letterSpacing: "0.2em",
                color: "#ff6b00",
                fontWeight: 700,
                marginBottom: 26,
              }}
            >
              “CURIOUS BY NATURE. PRECISE BY CHOICE.”
            </div>

            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 22,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.4,
                margin: "0 0 32px 0",
                maxWidth: 720,
              }}
            >
              Student, digital creator, and technology purist. Experience the live, interactive 60 FPS motion portfolio.
            </p>

            {/* Official Website URL Box (CTA) */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 36px",
                borderRadius: 999,
                background: "linear-gradient(90deg, #ff6b00, #ff8c00)",
                color: "#ffffff",
                fontFamily: "'Courier New', monospace",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.08em",
                boxShadow: "0 10px 40px rgba(255,107,0,0.5)",
                marginBottom: 28,
              }}
            >
              <span>EXPLORE NOW:</span>
              <span style={{ color: "#ffffff", textDecoration: "underline" }}>
                aryantanty.vercel.app
              </span>
            </div>

            {/* Sub-Badges: Verified, Instagram, Email */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 28,
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#22c55e" }}>●</span>
                <span>GOOGLE & VERCEL VERIFIED</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#e1306c" }}>IG:</span>
                <span style={{ color: "#ffffff", fontWeight: 700 }}>@_aryan085</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#ff6b00" }}>MAIL:</span>
                <span style={{ color: "#ffffff", fontWeight: 700 }}>vroaryan25@gmail.com</span>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Screen flash overlay */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#ffaa00",
            opacity: flashOpacity,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
