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

export const Scene2Identity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 150 },
  });

  // Fast cuts inside Scene 2:
  // Cut 1: 0 - 85 frames (Standing portrait in uniform)
  // Cut 2: 85 - 190 frames (Stream log poised)
  // Cut 3: 190 - 300 frames (Candid laugh / metrics peak)
  const isCut1 = frame < 85;
  const isCut2 = frame >= 85 && frame < 190;
  const isCut3 = frame >= 190;

  // Flash on cut points (frame 85 and frame 190)
  const isFlash =
    (frame >= 83 && frame <= 88) || (frame >= 188 && frame <= 193);
  const flashOpacity = isFlash ? 0.85 : 0;

  // Current photo for this cut
  const currentPhoto = isCut1
    ? "images/aryan-portrait-standing.webp"
    : isCut2
    ? "images/aryan-stream-log-poised.webp"
    : "images/aryan-candid-laugh.webp";

  // Ken Burns zoom per cut
  const cutFrame = isCut1 ? frame : isCut2 ? frame - 85 : frame - 190;
  const zoom = 1 + cutFrame * 0.0008;

  // Metric spring animations
  const m1Spring = spring({ frame: frame - 120, fps, config: { damping: 12, stiffness: 180 } });
  const m2Spring = spring({ frame: frame - 160, fps, config: { damping: 12, stiffness: 180 } });
  const m3Spring = spring({ frame: frame - 200, fps, config: { damping: 12, stiffness: 180 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050608" }}>
      <ParticlesBackground theme="solar" accentColor="#ff6b00" />
      <CyberHUD
        sectionLabel="ACT_02 // CORE_IDENTITY & DISCIPLINE"
        subLabel="ACADEMIC RIGOR × DIGITAL ARCHITECTURE"
        accentColor="#ff6b00"
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 120px",
        }}
      >
        {/* Left Column: Authentic Portrait with Punch Cuts */}
        <div
          style={{
            position: "relative",
            width: 440,
            height: 600,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(255,107,0,0.35)",
            border: "2px solid rgba(255,107,0,0.6)",
            transform: `scale(${enterSpring})`,
          }}
        >
          <Img
            src={staticFile(currentPhoto)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
            }}
          />

          {/* Vignette Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.1) 50%, rgba(5,6,8,0.3) 100%)",
            }}
          />

          {/* Portrait HUD Label */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              backgroundColor: "rgba(10, 12, 18, 0.88)",
              backdropFilter: "blur(12px)",
              padding: "14px 18px",
              borderRadius: 14,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Aryan Tanty
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  color: "#ff6b00",
                  letterSpacing: "0.1em",
                }}
              >
                {isCut1
                  ? "PURIST // ICSE SCHOLAR"
                  : isCut2
                  ? "EXPLORER // NATURE LOG"
                  : "CREATOR // ENERGETIC"}
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: "#22c55e",
                fontWeight: 700,
              }}
            >
              ● VERIFIED
            </div>
          </div>
        </div>

        {/* Right Column: Kinetic Feature Cards */}
        <div
          style={{
            maxWidth: 700,
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Badge */}
          <div
            style={{
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(255,107,0,0.2)",
              border: "1px solid rgba(255,107,0,0.5)",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "#ff6b00",
              fontWeight: 700,
            }}
          >
            02 // THE FOUNDATION
          </div>

          <h2
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
            }}
          >
            ICSE CLASS 10 RIGOR <br />
            <span
              style={{
                background: "linear-gradient(90deg, #ff6b00, #ffc107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MEETS DIGITAL CREATIVITY.
            </span>
          </h2>

          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 20,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            While others separate academics from code, Aryan blends mathematical discipline with cutting-edge visual motion design and AI engineering.
          </p>

          {/* 3 Metric Cards popping on beats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 10,
            }}
          >
            {/* Metric 1 */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,107,0,0.3)",
                borderRadius: 14,
                padding: "16px 18px",
                transform: `scale(${Math.max(0, m1Spring)})`,
                boxShadow: "0 0 20px rgba(255,107,0,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#ff6b00",
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                DISCIPLINE & FOCUS
              </div>
            </div>

            {/* Metric 2 */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(6,182,212,0.3)",
                borderRadius: 14,
                padding: "16px 18px",
                transform: `scale(${Math.max(0, m2Spring)})`,
                boxShadow: "0 0 20px rgba(6,182,212,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#06b6d4",
                }}
              >
                60 FPS
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                FLUID MOTION LAB
              </div>
            </div>

            {/* Metric 3 */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 14,
                padding: "16px 18px",
                transform: `scale(${Math.max(0, m3Spring)})`,
                boxShadow: "0 0 20px rgba(34,197,94,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#22c55e",
                }}
              >
                #18
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                CHASE SPIRIT
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Screen flash on cut points */}
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
