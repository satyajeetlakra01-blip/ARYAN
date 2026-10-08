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

export const Scene3Tech: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.9, stiffness: 120 },
  });

  // Animated EQ waveform bars
  const eqBars = Array.from({ length: 28 }).map((_, i) => {
    const height = 15 + 65 * Math.abs(Math.sin((frame * 0.15) + (i * 0.4)));
    return height;
  });

  // Alternate photos halfway
  const isSecond = frame >= 210;
  const currentPhoto = isSecond
    ? "images/aryan-candid-laugh.jpg"
    : "images/aryan-sitting-rock-focused.jpg";

  return (
    <AbsoluteFill style={{ backgroundColor: "#050608" }}>
      <ParticlesBackground theme="cyber" accentColor="#06b6d4" />
      <CyberHUD
        sectionLabel="ACT_03 // TECH_LAB & SPATIAL AUDIO"
        subLabel="NEURAL PIPELINES × HARDWARE ENGINEERING"
        accentColor="#06b6d4"
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
        {/* Left Side: 3 Tech Pillar Cards */}
        <div
          style={{
            maxWidth: 680,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            transform: `scale(${enterSpring})`,
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              letterSpacing: "0.2em",
              color: "#06b6d4",
              fontWeight: 700,
            }}
          >
            03 // INNOVATION ENGINE
          </div>

          <h2
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
            }}
          >
            BUILDING WITH <br />
            <span
              style={{
                background: "linear-gradient(90deg, #06b6d4, #3b82f6, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NEXT-GEN INTELLIGENCE.
            </span>
          </h2>

          {/* Pillar 1 */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "rgba(6, 182, 212, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Courier New', monospace",
                fontWeight: 900,
                color: "#06b6d4",
                fontSize: 16,
              }}
            >
              01
            </div>
            <div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Practical AI & Automated Systems
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 2,
                }}
              >
                Agentic workflows, prompt architectures, and intelligent tooling.
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255, 107, 0, 0.25)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "rgba(255, 107, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Courier New', monospace",
                fontWeight: 900,
                color: "#ff6b00",
                fontSize: 16,
              }}
            >
              02
            </div>
            <div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Smart Hardware & Spatial Acoustics
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 2,
                }}
              >
                Web Audio synthesizer, acoustic balance, and hardware ergonomics.
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(168, 85, 247, 0.25)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "rgba(168, 85, 247, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Courier New', monospace",
                fontWeight: 900,
                color: "#a855f7",
                fontSize: 16,
              }}
            >
              03
            </div>
            <div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Motion Graphics & After Effects Craft
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 2,
                }}
              >
                Kinetic typography, particle physics, and high-energy transitions.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentic Visual Card + Pulsing Waveform */}
        <div
          style={{
            position: "relative",
            width: 450,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            transform: `scale(${enterSpring})`,
          }}
        >
          {/* Photo Card */}
          <div
            style={{
              width: "100%",
              height: 480,
              borderRadius: 24,
              overflow: "hidden",
              border: "2px solid rgba(6, 182, 212, 0.4)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(6, 182, 212, 0.2)",
            }}
          >
            <Img
              src={staticFile(currentPhoto)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "rgba(5, 6, 8, 0.8)",
                backdropFilter: "blur(10px)",
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: "#06b6d4",
              }}
            >
              FOCUS // 100%
            </div>
          </div>

          {/* Equalizer Visualizer */}
          <div
            style={{
              width: "100%",
              backgroundColor: "rgba(10, 12, 18, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em",
              }}
            >
              <span>REAL-TIME AUDIO MONITOR</span>
              <span style={{ color: "#06b6d4" }}>44.1 kHz / STEREO</span>
            </div>

            {/* Bars */}
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
                    backgroundColor: idx % 2 === 0 ? "#06b6d4" : "#ff6b00",
                    borderRadius: 2,
                    boxShadow: `0 0 8px ${idx % 2 === 0 ? "rgba(6,182,212,0.6)" : "rgba(255,107,0,0.6)"}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
