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

export const Scene4Cricket: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 130 },
  });

  const num18Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, mass: 1.2, stiffness: 100 },
  });

  // Slow Ken burns zoom on waterfall shots
  const isSecond = frame >= 210;
  const currentPhoto = isSecond
    ? "images/aryan-waterfall-overlook.jpg"
    : "images/aryan-waterfall-portrait.jpg";

  const photoScale = 1 + frame * 0.0003;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050608" }}>
      <ParticlesBackground theme="stadium" accentColor="#e11d48" />
      <CyberHUD
        sectionLabel="ACT_04 // CRICKET & VK_18 MENTALITY"
        subLabel="ROYAL CHALLENGERS BENGALURU // TENACITY"
        accentColor="#e11d48"
      />

      {/* Giant 3D Watermark "18" */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: "50%",
          transform: `translateY(-50%) scale(${num18Spring}) rotate(-5deg)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 480,
          fontWeight: 900,
          color: "rgba(225, 29, 72, 0.08)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
          WebkitTextStroke: "2px rgba(245, 158, 11, 0.2)",
        }}
      >
        18
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 120px",
          zIndex: 5,
        }}
      >
        {/* Left Column: Authentic Waterfall / Outdoor Power Shot */}
        <div
          style={{
            position: "relative",
            width: 460,
            height: 600,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(225, 29, 72, 0.3)",
            border: "2px solid rgba(245, 158, 11, 0.5)",
            transform: `scale(${enterSpring})`,
          }}
        >
          <Img
            src={staticFile(currentPhoto)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${photoScale})`,
            }}
          />

          {/* Stadium Glow Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(17,24,39,0.95) 0%, rgba(225,29,72,0.15) 50%, transparent 100%)",
            }}
          />

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              backgroundColor: "rgba(225, 29, 72, 0.9)",
              color: "#ffffff",
              padding: "6px 14px",
              borderRadius: 999,
              fontFamily: "'Courier New', monospace",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.1em",
              boxShadow: "0 0 20px rgba(225,29,72,0.8)",
            }}
          >
            RCB SPIRIT // #18
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(10px)",
              padding: "14px 18px",
              borderRadius: 14,
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 18,
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              The Chase Master Ethos
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
                marginTop: 2,
              }}
            >
              Excellence is not an accident. It is disciplined aggression.
            </div>
          </div>
        </div>

        {/* Right Column: Kinetic Typography & RCB Theme */}
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
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(225, 29, 72, 0.2)",
                border: "1px solid rgba(225, 29, 72, 0.5)",
                fontFamily: "'Courier New', monospace",
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "#e11d48",
                fontWeight: 700,
              }}
            >
              04 // ATHLETIC DRIVE
            </span>

            <span
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                fontFamily: "'Courier New', monospace",
                fontSize: 13,
                letterSpacing: "0.15em",
                color: "#f59e0b",
                fontWeight: 700,
              }}
            >
              VIRAT KOHLI #18
            </span>
          </div>

          <h2
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "#ffffff",
              margin: 0,
            }}
          >
            WHEN THE PRESSURE PEAKS, <br />
            <span
              style={{
                background: "linear-gradient(90deg, #e11d48, #f59e0b, #ffffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              YOU DON’T BACK DOWN.
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
            Inspired by the unmatched intensity and work ethic of Virat Kohli and Royal Challengers Bengaluru. Applied to every line of code, every academic exam, and every visual project.
          </p>

          {/* 2 Quote Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginTop: 6,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(225, 29, 72, 0.08)",
                borderLeft: "4px solid #e11d48",
                padding: "14px 20px",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                "Relentless Preparation Over Hope."
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 4,
                }}
              >
                Pressure is a privilege. Focus turns steep climbs into milestones.
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.08)",
                borderLeft: "4px solid #f59e0b",
                padding: "14px 20px",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                "Play Bold in Every Arena."
              </div>
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 4,
                }}
              >
                From board examinations to AI motion engineering.
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
