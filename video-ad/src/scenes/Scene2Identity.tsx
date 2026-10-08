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
    config: { damping: 16, mass: 0.9, stiffness: 130 },
  });

  // Photo 1 & Photo 2 swap around frame 180 (halfway through the 360-frame scene)
  const isSecondHalf = frame >= 180;
  const subFrame = isSecondHalf ? frame - 180 : frame;
  const cardSpring = spring({
    frame: subFrame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 140 },
  });

  // Slow subtle Ken Burns zoom
  const zoom1 = 1 + frame * 0.0004;

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
        {/* Left Column: Authentic Portrait with Tech Frame */}
        <div
          style={{
            position: "relative",
            width: 440,
            height: 600,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,107,0,0.25)",
            border: "1.5px solid rgba(255,107,0,0.4)",
            transform: `scale(${enterSpring})`,
          }}
        >
          <Img
            src={
              isSecondHalf
                ? staticFile("images/aryan-stream-log-poised.jpg")
                : staticFile("images/aryan-portrait-standing.jpg")
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom1})`,
            }}
          />

          {/* Vignette Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(5,6,8,0.9) 0%, rgba(5,6,8,0.1) 50%, rgba(5,6,8,0.3) 100%)",
            }}
          />

          {/* Portrait HUD Label */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              backgroundColor: "rgba(10, 12, 18, 0.85)",
              backdropFilter: "blur(12px)",
              padding: "14px 18px",
              borderRadius: 14,
              border: "1px solid rgba(255, 255, 255, 0.15)",
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
                {isSecondHalf ? "EXPLORER // NATURE SPRINT" : "PURIST // ICSE SCHOLAR"}
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
            transform: `scale(${cardSpring})`,
          }}
        >
          {/* Badge */}
          <div
            style={{
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(255,107,0,0.15)",
              border: "1px solid rgba(255,107,0,0.4)",
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
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            While others separate academics from code, Aryan blends mathematical discipline with cutting-edge visual motion design and AI engineering.
          </p>

          {/* 3 Metric Cards */}
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
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "16px 18px",
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
                  color: "rgba(255,255,255,0.7)",
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
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "16px 18px",
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
                  color: "rgba(255,255,255,0.7)",
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
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "16px 18px",
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
                  color: "rgba(255,255,255,0.7)",
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
    </AbsoluteFill>
  );
};
