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

  // Act 4 Pacing (420 frames = 14 seconds: Master 31.0s - 45.0s):
  // Cut 1: 0 - 135 frames (31.0s - 35.5s) -> VIRAT KOHLI #18 DNA
  // Cut 2: 135 - 270 frames (35.5s - 40.0s) -> CHASE MASTER MENTALITY
  // Cut 3: 270 - 420 frames (40.0s - 45.0s) -> PLAY BOLD & ROYAL CHALLENGERS SPIRIT
  const isCut1 = frame < 135;
  const isCut2 = frame >= 135 && frame < 270;
  const isCut3 = frame >= 270;

  // Camera flashes on beat marks:
  // frame 0 (Cinematic Hit), 66 (Shutter), 135 (Vine Boom), 204 (Shutter), 270 (Punch)
  const isFlash =
    (frame >= 0 && frame <= 5) ||
    (frame >= 64 && frame <= 68) ||
    (frame >= 135 && frame <= 140) ||
    (frame >= 202 && frame <= 206) ||
    (frame >= 270 && frame <= 275);
  const flashOpacity = isFlash ? 0.92 : 0;

  // Screen shake on bass hit (frame 0) and vine boom (frame 135)
  const shake1 = frame < 20 ? (20 - frame) * 1.2 : 0;
  const shake2 = frame >= 135 && frame < 155 ? (155 - frame) * 1.0 : 0;
  const totalShake = shake1 + shake2;
  const shakeX = Math.sin(frame * 2.8) * totalShake;
  const shakeY = Math.cos(frame * 3.1) * totalShake;

  // Active cut local frame and zoom
  const localFrame = isCut1 ? frame : isCut2 ? frame - 135 : frame - 270;
  const enterSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 150 },
  });
  const zoom = 1.0 + (localFrame / 150) * 0.08;

  // Giant 3D "18" watermark pulse
  const num18Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 1.1, stiffness: 120 },
  });

  // Active photo per cut
  const currentPhoto = isCut1
    ? "images/aryan-waterfall-portrait.webp"
    : isCut2
    ? "images/aryan-waterfall-overlook.webp"
    : "images/aryan-waterfall-gorge-wide.webp";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05060a",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        overflow: "hidden",
      }}
    >
      <ParticlesBackground theme="stadium" accentColor="#e11d48" />

      {/* Cyber HUD */}
      <CyberHUD
        sectionLabel="ACT_04 // CRICKET DNA & UNYIELDING SPIRIT"
        subLabel={
          isCut1
            ? "VIRAT KOHLI #18 INFLUENCE // CHASE EXCELLENCE"
            : isCut2
            ? "THE CHASE MASTER MENTALITY // PRESSURE ABSORPTION"
            : "ROYAL CHALLENGERS BENGALURU // PLAY BOLD"
        }
        accentColor="#e11d48"
      />

      {/* Giant 3D Watermark "18" */}
      <div
        style={{
          position: "absolute",
          right: 30,
          top: "48%",
          transform: `translateY(-50%) scale(${num18Spring}) rotate(-6deg)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 500,
          fontWeight: 900,
          color: "rgba(225, 29, 72, 0.09)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
          WebkitTextStroke: "2px rgba(245, 158, 11, 0.25)",
        }}
      >
        18
      </div>

      {/* Content Container */}
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
        {/* Left Side: Authentic High-Energy Visual with Border Glow */}
        <div
          style={{
            position: "relative",
            width: 470,
            height: 610,
            borderRadius: 26,
            overflow: "hidden",
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.9), 0 0 50px rgba(225, 29, 72, 0.4)",
            border: "2px solid rgba(245, 158, 11, 0.6)",
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

          {/* Stadium lighting glow overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(225,29,72,0.2) 45%, transparent 100%)",
            }}
          />

          {/* Top Pill Badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              backgroundColor: "rgba(225, 29, 72, 0.95)",
              color: "#ffffff",
              padding: "7px 18px",
              borderRadius: 999,
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: "0.15em",
              boxShadow: "0 0 25px rgba(225,29,72,0.9)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {isCut1
              ? "RCB DNA // #18"
              : isCut2
              ? "CHASE MASTER // 100%"
              : "PLAY BOLD // NEVER BACK DOWN"}
          </div>

          {/* Bottom Card Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(14px)",
              padding: "16px 20px",
              borderRadius: 16,
              border: "1px solid rgba(245, 158, 11, 0.35)",
            }}
          >
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 19,
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              {isCut1
                ? "The Fierce Determination of Virat Kohli"
                : isCut2
                ? "Thriving Under Intense High-Stakes Pressure"
                : "Audacity, Passion & Relentless Execution"}
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: "#f59e0b",
                marginTop: 4,
                letterSpacing: "0.1em",
              }}
            >
              DISCIPLINE TRANSFERS TO EVERY LINE OF CODE
            </div>
          </div>
        </div>

        {/* Right Side: High-Impact Typography & Metric Stat Cards */}
        <div
          style={{
            maxWidth: 680,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            transform: `scale(${enterSpring})`,
          }}
        >
          {/* Category Tag */}
          <div
            style={{
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(225, 29, 72, 0.2)",
              border: "1px solid rgba(225, 29, 72, 0.5)",
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              letterSpacing: "0.22em",
              color: "#fb7185",
              fontWeight: 800,
            }}
          >
            {isCut1
              ? "04.1 // CRICKET OBSESSION"
              : isCut2
              ? "04.2 // INTENSITY & RESOLVE"
              : "04.3 // ROYAL CHALLENGERS SPIRIT"}
          </div>

          {/* Giant Dynamic Headline */}
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
                POWERED BY <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #e11d48, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  VIRAT KOHLI #18 DNA.
                </span>
              </>
            ) : isCut2 ? (
              <>
                BUILT TO CHASE. <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #e11d48)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PRESSURE IS A PRIVILEGE.
                </span>
              </>
            ) : (
              <>
                UNAPOLOGETIC PASSION. <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #e11d48, #ff6b00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PLAY BOLD PHILOSOPHY.
                </span>
              </>
            )}
          </h2>

          {/* Subtext Quote Box */}
          <div
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(225, 29, 72, 0.3)",
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 18,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.85)",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {isCut1
                ? "“Self-belief and hard work will always earn you success.” Cricket isn't just entertainment—it is a masterclass in relentless mental grit."
                : isCut2
                ? "When targets seem insurmountable, true leaders accelerate. Every engineering hurdle is tackled with match-winning focus."
                : "Whether debugging deeply nested architectures or building responsive 60 FPS motion graphics, the effort is always 100%."}
            </p>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: "#f59e0b",
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              — ARYAN TANTY // ETHOS
            </div>
          </div>

          {/* 3 Bold Stat Pills */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(225, 29, 72, 0.12)",
                border: "1px solid rgba(225, 29, 72, 0.35)",
                borderRadius: 14,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                #18
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  color: "#fb7185",
                  marginTop: 2,
                }}
              >
                ROLE MODEL
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                borderRadius: 14,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                RCB
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  color: "#f59e0b",
                  marginTop: 2,
                }}
              >
                PLAY BOLD
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 14,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 2,
                }}
              >
                TENACITY
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Screen Flash on Cut Beats */}
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
