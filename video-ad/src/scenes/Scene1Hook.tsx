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

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // DROP FRAME: Frame 78 (2.6s Vine Boom)
  const DROP_FRAME = 78;

  // Screen shake on drop
  const isDrop = frame >= DROP_FRAME && frame <= DROP_FRAME + 20;
  const shakeIntensity = isDrop ? (DROP_FRAME + 20 - frame) * 1.8 : 0;
  const shakeX = Math.sin(frame * 2.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 2.8) * shakeIntensity;

  // Camera flashes at frames 40, 60, and DROP_FRAME
  const isFlash1 = frame >= 40 && frame <= 44;
  const isFlash2 = frame >= 60 && frame <= 64;
  const isDropFlash = frame >= DROP_FRAME && frame <= DROP_FRAME + 8;
  const flashOpacity = isDropFlash
    ? interpolate(frame, [DROP_FRAME, DROP_FRAME + 2, DROP_FRAME + 8], [0, 0.95, 0])
    : isFlash1 || isFlash2
    ? 0.75
    : 0;

  // Pre-drop typography spring
  const preScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 140 },
  });

  // Post-drop elements spring
  const postSpring = spring({
    frame: frame - DROP_FRAME,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        backgroundColor: "#050608",
      }}
    >
      <ParticlesBackground theme="cyber" accentColor="#ff6b00" />
      <CyberHUD sectionLabel="ACT_01 // THE_HOOK" accentColor="#ff6b00" />

      {/* PHASE A (0 - 77 frames): WHO IS ARYAN TANTY? */}
      {frame < DROP_FRAME && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Quick teaser photo flashing in background with rapid cut */}
          <div
            style={{
              position: "absolute",
              width: 520,
              height: 520,
              borderRadius: 24,
              overflow: "hidden",
              opacity: interpolate(frame, [20, 40, 60, 75], [0.15, 0.5, 0.25, 0.6]),
              filter: "grayscale(100%) contrast(160%) brightness(85%)",
              border: "1px solid rgba(255,107,0,0.4)",
              transform: `scale(${1 + frame * 0.003})`,
            }}
          >
            <Img
              src={
                frame >= 40 && frame < 60
                  ? staticFile("images/aryan-bike-helmet.webp")
                  : staticFile("images/aryan-bike-portrait.webp")
              }
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Kinetic typography */}
          <div
            style={{
              zIndex: 10,
              textAlign: "center",
              transform: `scale(${preScale})`,
            }}
          >
            <div
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 22,
                letterSpacing: "0.4em",
                color: "#ff6b00",
                marginBottom: 16,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              [ SYSTEM QUERY DETECTED ]
            </div>

            <h1
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 94,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#ffffff",
                margin: 0,
                textTransform: "uppercase",
                textShadow: "0 0 50px rgba(255,107,0,0.5)",
              }}
            >
              WHO IS <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #ff6b00, #ffaa00, #ffffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ARYAN TANTY?
              </span>
            </h1>

            <div
              style={{
                marginTop: 24,
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 16,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              TRANSMISSION LOCKED // 60 FPS
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* PHASE B (78 - 180 frames): THE IMPACT DROP & PATTERN INTERRUPT */}
      {frame >= DROP_FRAME && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 100px",
          }}
        >
          {/* Authentic Portrait in Cyber Hex-Card with Punch Tilt */}
          <div
            style={{
              position: "absolute",
              right: 180,
              width: 380,
              height: 480,
              borderRadius: 20,
              overflow: "hidden",
              border: "2px solid rgba(255,107,0,0.7)",
              boxShadow: "0 0 60px rgba(255,107,0,0.45)",
              transform: `scale(${postSpring}) rotate(${Math.sin((frame - DROP_FRAME) * 0.05) * 3}deg)`,
            }}
          >
            <Img
              src={staticFile("images/aryan-bike-portrait.webp")}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                backgroundColor: "rgba(5, 6, 8, 0.88)",
                backdropFilter: "blur(8px)",
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: "#ff6b00",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>TARGET // AUTHENTIC</span>
              <span>2026</span>
            </div>
          </div>

          {/* Left Text Block */}
          <div
            style={{
              position: "absolute",
              left: 160,
              maxWidth: 750,
              transform: `scale(${postSpring})`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(255, 107, 0, 0.2)",
                border: "1px solid rgba(255, 107, 0, 0.5)",
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: "0.2em",
                color: "#ff6b00",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              ● PATTERN INTERRUPT
            </div>

            <h2
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 74,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#ffffff",
                margin: "0 0 20px 0",
              }}
            >
              NOT JUST ANOTHER <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #ff6b00, #ffffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PORTFOLIO.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 26,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.4,
                margin: "0 0 30px 0",
              }}
            >
              Meet the young creator redefining how students build, think, and innovate in India.
            </p>

            <div
              style={{
                display: "flex",
                gap: 16,
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span style={{ color: "#ff6b00", fontWeight: 700 }}>STUDENT</span>
              <span>//</span>
              <span style={{ color: "#ffffff", fontWeight: 700 }}>DIGITAL CREATOR</span>
              <span>//</span>
              <span style={{ color: "#06b6d4", fontWeight: 700 }}>TECH PURIST</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Screen flash overlay */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#ffffff",
            opacity: flashOpacity,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
