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

  // 0 - 90 frames (0 - 3s): Riser buildup
  // Frame 90 (3.0s): Hard Bass Drop / Impact!

  // Shake effect around frame 90
  const isDrop = frame >= 88 && frame <= 104;
  const shakeX = isDrop ? (Math.sin(frame * 2.5) * (104 - frame) * 1.5) : 0;
  const shakeY = isDrop ? (Math.cos(frame * 2.8) * (104 - frame) * 1.5) : 0;

  // Flash white/orange on drop
  const flashOpacity = interpolate(frame, [89, 91, 102], [0, 0.95, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pre-drop typography spring
  const preScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  // Post-drop elements spring
  const postSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 15, mass: 1, stiffness: 140 },
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

      {/* PHASE A (0 - 89 frames): WHO IS ARYAN TANTY? */}
      {frame < 90 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Quick teaser photo flashing in background */}
          <div
            style={{
              position: "absolute",
              width: 520,
              height: 520,
              borderRadius: 24,
              overflow: "hidden",
              opacity: interpolate(frame, [20, 45, 75, 88], [0.15, 0.35, 0.2, 0.45]),
              filter: "grayscale(100%) contrast(160%) brightness(85%)",
              border: "1px solid rgba(255,107,0,0.3)",
              transform: `scale(${1 + frame * 0.002})`,
            }}
          >
            <Img
              src={staticFile("images/aryan-hero.jpg")}
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
                fontSize: 92,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#ffffff",
                margin: 0,
                textTransform: "uppercase",
                textShadow: "0 0 40px rgba(255,107,0,0.4)",
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
                color: "rgba(255,255,255,0.6)",
              }}
            >
              INITIALIZING TRANSMISSION IN 3... 2... 1...
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* PHASE B (90 - 180 frames): THE IMPACT DROP */}
      {frame >= 90 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 100px",
          }}
        >
          {/* Authentic Portrait in Cyber Hex-Card */}
          <div
            style={{
              position: "absolute",
              right: 180,
              width: 380,
              height: 480,
              borderRadius: 20,
              overflow: "hidden",
              border: "2px solid rgba(255,107,0,0.6)",
              boxShadow: "0 0 50px rgba(255,107,0,0.35)",
              transform: `scale(${postSpring}) rotate(2deg)`,
            }}
          >
            <Img
              src={staticFile("images/aryan-hero.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                backgroundColor: "rgba(5, 6, 8, 0.85)",
                backdropFilter: "blur(8px)",
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
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
                backgroundColor: "rgba(255, 107, 0, 0.15)",
                border: "1px solid rgba(255, 107, 0, 0.4)",
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
                color: "rgba(255,255,255,0.8)",
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
            backgroundColor: "#ff6b00",
            opacity: flashOpacity,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
