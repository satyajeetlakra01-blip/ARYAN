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
import { CircuitBoard } from "../components/CircuitBoard";

export const Scene5ClimaxEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // DROP FRAME: Frame 150 (Master 50.0s: Cinematic Hit + Vine Boom)
  const DROP_FRAME = 150;
  const isEndCard = frame >= DROP_FRAME;
  const endFrame = Math.max(0, frame - DROP_FRAME);

  // Screen shake on drop impact (frames 150 - 175)
  const isDrop = frame >= DROP_FRAME && frame <= DROP_FRAME + 24;
  const shakeIntensity = isDrop ? (DROP_FRAME + 24 - frame) * 1.5 : 0;
  const shakeX = Math.sin(frame * 2.7) * shakeIntensity;
  const shakeY = Math.cos(frame * 3.2) * shakeIntensity;

  // Flash white/gold on drop (frame 148 - 165)
  const isDropFlash = frame >= 148 && frame <= 165;
  const flashOpacity = isDropFlash
    ? interpolate(frame, [148, 150, 165], [0, 0.98, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Spring animation for Grand End Card
  const cardSpring = spring({
    frame: endFrame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 130 },
  });

  // CTA button pop at frame 180 (Master 51.0s)
  const ctaSpring = spring({
    frame: Math.max(0, frame - 175),
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 180 },
  });

  // Badges pop at frame 205 (Master 52.0s)
  const badgesSpring = spring({
    frame: Math.max(0, frame - 200),
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 160 },
  });

  // Phase 1 kinetic words (0 to 149 frames)
  const words = [
    "DISCIPLINE.",
    "PRECISION.",
    "INNOVATION.",
    "CODE.",
    "CRICKET.",
    "VISION.",
  ];
  const wordIdx = Math.floor(frame / 25);
  const currentWord = words[Math.min(wordIdx, words.length - 1)];

  // Pulse glow on CTA
  const ctaGlow = 0.5 + 0.5 * Math.sin(frame * 0.18);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030407",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        overflow: "hidden",
      }}
    >
      <ParticlesBackground theme="climax" accentColor="#ff6b00" />

      {/* Cyber Circuit Board background traces */}
      <CircuitBoard
        piercing={!isEndCard}
        intensity={!isEndCard ? interpolate(frame, [0, 140], [0.6, 1.4]) : 0.22}
        accentColor="#00f0ff"
        glowColor="#ff6b00"
      />

      <CyberHUD
        sectionLabel="ACT_05 // THE_OFFICIAL_END_CARD"
        subLabel="CURIOUS BY NATURE. PRECISE BY CHOICE."
        accentColor="#ff6b00"
      />

      {/* ============================================================ */}
      {/* PHASE 1: RAPID KINETIC WORDS SURGE (Frames 0 to 149)        */}
      {/* ============================================================ */}
      {!isEndCard && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 15,
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 22,
              letterSpacing: "0.4em",
              color: "#ff6b00",
              fontWeight: 800,
              marginBottom: 16,
              textShadow: "0 0 20px rgba(255,107,0,0.8)",
            }}
          >
            [ THE ACCELERATION ]
          </div>

          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 128,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              textTransform: "uppercase",
              textShadow: "0 0 60px rgba(255,107,0,0.6)",
              transform: `scale(${1.0 + ((frame % 25) / 25) * 0.12})`,
            }}
          >
            {currentWord}
          </div>

          {/* Acceleration progress bar */}
          <div
            style={{
              marginTop: 40,
              width: 380,
              height: 4,
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(frame / 149) * 100}%`,
                height: "100%",
                backgroundColor: "#ff6b00",
                boxShadow: "0 0 14px #ff6b00",
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* ============================================================ */}
      {/* PHASE 2: GRAND OFFICIAL BRAND END-CARD (Frames 150 to 450)   */}
      {/* ============================================================ */}
      {isEndCard && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            zIndex: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 960,
              transform: `scale(${cardSpring})`,
            }}
          >
            {/* Glowing Avatar Emblem with Closer Portrait */}
            <div
              style={{
                position: "relative",
                width: 130,
                height: 130,
                borderRadius: "50%",
                padding: 4,
                background:
                  "linear-gradient(135deg, #ff6b00, #ffaa00, #00f0ff)",
                boxShadow:
                  "0 0 50px rgba(255,107,0,0.6), 0 0 90px rgba(0,240,255,0.35)",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#000",
                }}
              >
                <Img
                  src={staticFile("images/aryan-bike-portrait.webp")}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 22%",
                    transform: "scale(1.25)",
                  }}
                />
              </div>
            </div>

            {/* Official Title */}
            <h1
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
                color: "#ffffff",
                margin: "0 0 8px 0",
                textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              ARYAN TANTY
            </h1>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 17,
                letterSpacing: "0.22em",
                color: "#ff6b00",
                fontWeight: 800,
                marginBottom: 18,
                textShadow: "0 0 20px rgba(255,107,0,0.5)",
              }}
            >
              “CURIOUS BY NATURE. PRECISE BY CHOICE.”
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 20,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.45,
                margin: "0 0 24px 0",
                maxWidth: 720,
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              Student, digital creator, and technology purist. Experience the live, interactive 60 FPS motion portfolio.
            </p>

            {/* Primary CTA Button: aryantanty.vercel.app */}
            <div
              style={{
                transform: `scale(${ctaSpring})`,
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 44px",
                borderRadius: 999,
                background: "linear-gradient(90deg, #ff6b00, #ff8c00)",
                color: "#ffffff",
                fontFamily: "'Courier New', monospace",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.08em",
                boxShadow: `0 10px 45px rgba(255,107,0,${0.5 + 0.3 * ctaGlow}), 0 0 35px rgba(255,200,0,${0.35 * ctaGlow})`,
                border: "2px solid rgba(255,255,255,0.5)",
                marginBottom: 22,
              }}
            >
              <span>EXPLORE NOW:</span>
              <span
                style={{
                  color: "#ffffff",
                  textDecoration: "underline",
                  textUnderlineOffset: "6px",
                }}
              >
                aryantanty.vercel.app
              </span>
            </div>

            {/* Sub-Badges (Verified, Instagram, Email) */}
            <div
              style={{
                transform: `scale(${badgesSpring})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 28,
                fontFamily: "'Courier New', monospace",
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "rgba(8, 12, 22, 0.85)",
                backdropFilter: "blur(14px)",
                padding: "10px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    color: "#22c55e",
                    textShadow: "0 0 10px #22c55e",
                  }}
                >
                  ●
                </span>
                <span style={{ fontWeight: 700 }}>GOOGLE & VERCEL VERIFIED</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#e1306c", fontWeight: 800 }}>IG:</span>
                <span style={{ color: "#ffffff", fontWeight: 700 }}>
                  @_aryan085
                </span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#ff6b00", fontWeight: 800 }}>MAIL:</span>
                <span style={{ color: "#ffffff", fontWeight: 700 }}>
                  vroaryan25@gmail.com
                </span>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Screen flash on climax drop */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#ffaa00",
            opacity: flashOpacity,
            pointerEvents: "none",
            zIndex: 99,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
