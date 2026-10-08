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

export const Scene3Tech: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rapid Cuts inside Act 3 (450 frames total = 15 seconds):
  // Cut 1: 0 - 150 frames (Master 16.0s - 21.0s) -> Piercing Circuit & AI Systems
  // Cut 2: 150 - 285 frames (Master 21.0s - 25.5s) -> Hardware & Spatial Audio
  // Cut 3: 285 - 450 frames (Master 25.5s - 31.0s) -> 60 FPS Motion Graphics
  const isCut1 = frame < 150;
  const isCut2 = frame >= 150 && frame < 285;
  const isCut3 = frame >= 285;

  // Flash hits on audio beats (0, 75, 150, 285, 414)
  const isFlash =
    (frame >= 0 && frame <= 5) ||
    (frame >= 74 && frame <= 78) ||
    (frame >= 148 && frame <= 153) ||
    (frame >= 283 && frame <= 288) ||
    (frame >= 412 && frame <= 417);
  const flashOpacity = isFlash ? 0.9 : 0;

  // Screen shake on piercing circuit drop (frames 0 - 25)
  const shake1 = frame < 25 ? (25 - frame) * 0.9 : 0;
  const shakeX = Math.sin(frame * 2.2) * shake1;
  const shakeY = Math.cos(frame * 2.7) * shake1;

  // Ken Burns zoom per cut
  const cutProgress = isCut1
    ? frame / 150
    : isCut2
    ? (frame - 150) / 135
    : (frame - 285) / 165;
  const zoom = 1.0 + cutProgress * 0.08;

  // Spring animations for pillar cards
  const cardSpring = spring({
    frame: isCut1 ? frame : isCut2 ? frame - 150 : frame - 285,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 140 },
  });

  // Animated EQ waveform bars (active in Cut 2)
  const eqBars = Array.from({ length: 32 }).map((_, i) => {
    return 15 + 75 * Math.abs(Math.sin((frame * 0.22) + (i * 0.35)));
  });

  // Active photo per cut
  const photoSrc = isCut1
    ? "images/aryan-sitting-rock-focused.webp"
    : isCut2
    ? "images/aryan-candid-laugh.webp"
    : "images/aryan-stream-log-sitting.webp";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030712",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      <ParticlesBackground theme="cyber" accentColor="#00f0ff" />

      {/* High-Tech Animated Circuit Board Piercing The Scene */}
      <CircuitBoard
        piercing={isCut1 || frame >= 380}
        intensity={isCut1 ? 1.0 : isCut2 ? 0.6 : 0.9}
        accentColor={isCut3 ? "#a855f7" : "#00f0ff"}
        glowColor={isCut3 ? "#ff6b00" : "#06b6d4"}
      />

      {/* Cyber HUD Overlay */}
      <CyberHUD
        sectionLabel="ACT_03 // NEURAL ARCHITECTURE & HARDWARE"
        subLabel={
          isCut1
            ? "PIERCING CIRCUIT // AGENTIC AI PIPELINES"
            : isCut2
            ? "ACOUSTIC ENGINEERING // SPATIAL SOUND ENGINE"
            : "MOTION DYNAMICS // 60 FPS ULTRA RESPONSIVE"
        }
        accentColor={isCut3 ? "#a855f7" : "#00f0ff"}
      />

      {/* Main Content Area */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 100px",
          zIndex: 10,
        }}
      >
        {/* LEFT COLUMN: Kinetic Content Card based on Cut */}
        <div
          style={{
            maxWidth: 680,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            transform: `scale(${cardSpring})`,
          }}
        >
          {/* Badge */}
          <div
            style={{
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              backgroundColor: isCut3
                ? "rgba(168, 85, 247, 0.2)"
                : isCut2
                ? "rgba(255, 107, 0, 0.2)"
                : "rgba(0, 240, 255, 0.2)",
              border: `1px solid ${
                isCut3 ? "#a855f7" : isCut2 ? "#ff6b00" : "#00f0ff"
              }`,
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              letterSpacing: "0.22em",
              color: isCut3 ? "#c084fc" : isCut2 ? "#ff944d" : "#00f0ff",
              fontWeight: 800,
              boxShadow: `0 0 20px ${
                isCut3
                  ? "rgba(168, 85, 247, 0.4)"
                  : isCut2
                  ? "rgba(255, 107, 0, 0.4)"
                  : "rgba(0, 240, 255, 0.4)"
              }`,
            }}
          >
            {isCut1
              ? "03.1 // SYNAPTIC CIRCUITRY"
              : isCut2
              ? "03.2 // HARDWARE & ACOUSTICS"
              : "03.3 // KINETIC GRAPHICS"}
          </div>

          {/* Dynamic Headline */}
          <h2
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#ffffff",
              margin: 0,
            }}
          >
            {isCut1 ? (
              <>
                PIERCING THE NOISE. <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #00f0ff, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PRACTICAL AI SYSTEMS.
                </span>
              </>
            ) : isCut2 ? (
              <>
                TACTILE HARDWARE. <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #ff6b00, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  SPATIAL SOUND ENGINE.
                </span>
              </>
            ) : (
              <>
                FLUID AFTER EFFECTS. <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  60 FPS PURE MOTION.
                </span>
              </>
            )}
          </h2>

          {/* Detail Description */}
          <div
            style={{
              backgroundColor: "rgba(10, 16, 28, 0.8)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${
                isCut3
                  ? "rgba(168, 85, 247, 0.35)"
                  : isCut2
                  ? "rgba(255, 107, 0, 0.35)"
                  : "rgba(0, 240, 255, 0.35)"
              }`,
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {isCut1 ? (
              <>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#00f0ff",
                      boxShadow: "0 0 10px #00f0ff",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    Custom Prompt Pipelines & Autonomous Workflows
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                  }}
                >
                  Integrating modern generative LLMs into daily problem-solving, code verification, and high-velocity development pipelines.
                </p>
              </>
            ) : isCut2 ? (
              <>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#ff6b00",
                      boxShadow: "0 0 10px #ff6b00",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    Analog-Inspired Web Audio & Ergonomic Engineering
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                  }}
                >
                  Deep fascination with mechanical switches, audio frequency response, spatial imaging, and hardware tactile feedback.
                </p>
              </>
            ) : (
              <>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#a855f7",
                      boxShadow: "0 0 10px #a855f7",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    Frame-Accurate Remotion & Motion Graphics Physics
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                  }}
                >
                  Zero dead gaps. Every transition is driven by mathematical springs, velocity physics, and beat-synced optical cues.
                </p>
              </>
            )}
          </div>

          {/* Quick Metrics Ticker */}
          <div
            style={{
              display: "flex",
              gap: 24,
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <div>
              STATUS:{" "}
              <span style={{ color: "#22c55e", fontWeight: 700 }}>SYNCHRONIZED</span>
            </div>
            <div>
              LATENCY:{" "}
              <span style={{ color: "#00f0ff", fontWeight: 700 }}>&lt; 1.2ms</span>
            </div>
            <div>
              FREQ:{" "}
              <span style={{ color: "#ff6b00", fontWeight: 700 }}>
                {Math.round(44100 + Math.sin(frame * 0.1) * 200)} Hz
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Photo Card + Visualizer */}
        <div
          style={{
            position: "relative",
            width: 460,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            transform: `scale(${cardSpring})`,
          }}
        >
          {/* Photo Frame */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 480,
              borderRadius: 24,
              overflow: "hidden",
              border: `2px solid ${
                isCut3
                  ? "rgba(168, 85, 247, 0.6)"
                  : isCut2
                  ? "rgba(255, 107, 0, 0.6)"
                  : "rgba(0, 240, 255, 0.6)"
              }`,
              boxShadow: `0 25px 60px rgba(0,0,0,0.85), 0 0 45px ${
                isCut3
                  ? "rgba(168, 85, 247, 0.35)"
                  : isCut2
                  ? "rgba(255, 107, 0, 0.35)"
                  : "rgba(0, 240, 255, 0.35)"
              }`,
            }}
          >
            <Img
              src={staticFile(photoSrc)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${zoom})`,
              }}
            />

            {/* Corner Badge */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "rgba(5, 7, 12, 0.85)",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                fontWeight: 800,
                color: isCut3 ? "#c084fc" : isCut2 ? "#ff944d" : "#00f0ff",
              }}
            >
              {isCut1
                ? "DEEP FOCUS // ACT 3.1"
                : isCut2
                ? "AUTHENTIC // ACT 3.2"
                : "DESIGN // ACT 3.3"}
            </div>

            {/* Bottom Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(3,7,18,0.8) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Equalizer Frequency Bar Monitor */}
          <div
            style={{
              width: "100%",
              backgroundColor: "rgba(8, 12, 22, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 18,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.15em",
              }}
            >
              <span>SPECTRUM ANALYZER</span>
              <span
                style={{
                  color: isCut3 ? "#c084fc" : isCut2 ? "#ff944d" : "#00f0ff",
                }}
              >
                LIVE PEAK: -0.5 dB
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: 48,
                gap: 4,
              }}
            >
              {eqBars.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    backgroundColor:
                      idx % 3 === 0
                        ? "#00f0ff"
                        : idx % 3 === 1
                        ? "#ff6b00"
                        : "#a855f7",
                    borderRadius: 2,
                    boxShadow: `0 0 8px ${
                      idx % 3 === 0
                        ? "rgba(0,240,255,0.7)"
                        : idx % 3 === 1
                        ? "rgba(255,107,0,0.7)"
                        : "rgba(168,85,247,0.7)"
                    }`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Screen flash on cut beats */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#ffffff",
            opacity: flashOpacity,
            pointerEvents: "none",
            zIndex: 99,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
