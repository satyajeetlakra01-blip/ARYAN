import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface CircuitBoardProps {
  accentColor?: string;
  glowColor?: string;
  intensity?: number;
  piercing?: boolean;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
  accentColor = "#00f0ff",
  glowColor = "#ff6b00",
  intensity = 1.0,
  piercing = true,
}) => {
  const frame = useCurrentFrame();

  // Pulse animation along traces
  const progress = (frame * 0.04) % 1;
  const dashOffset = (frame * 12) % 400;

  // Piercing flare intensity
  const pierceFlare = piercing
    ? 0.5 + 0.5 * Math.sin(frame * 0.15)
    : 0.3;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <svg
        viewBox="0 0 1920 1080"
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.85 * intensity,
        }}
      >
        <defs>
          <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="circuit-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="circuit-grad-orange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffd000" stopOpacity="0.8" />
          </linearGradient>

          {/* Piercing Center Light */}
          <radialGradient id="pierce-light" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8 * pierceFlare} />
            <stop offset="30%" stopColor={accentColor} stopOpacity={0.5 * pierceFlare} />
            <stop offset="70%" stopColor={glowColor} stopOpacity={0.15 * pierceFlare} />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Piercing Energy Core */}
        {piercing && (
          <circle
            cx="960"
            cy="540"
            r={240 + 40 * Math.sin(frame * 0.2)}
            fill="url(#pierce-light)"
            filter="url(#circuit-glow)"
          />
        )}

        {/* Central Microprocessor Core Frame */}
        <g transform="translate(960, 540)">
          <rect
            x="-140"
            y="-140"
            width="280"
            height="280"
            fill="rgba(5, 7, 12, 0.75)"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeDasharray="16 8"
            filter="url(#circuit-glow)"
          />
          <rect
            x="-110"
            y="-110"
            width="220"
            height="220"
            fill="none"
            stroke={glowColor}
            strokeWidth="1.5"
            strokeDasharray="40 20"
            transform={`rotate(${frame * 0.4})`}
          />
          <circle
            r={60 + 10 * Math.sin(frame * 0.1)}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="12 6"
            transform={`rotate(${-frame * 0.6})`}
          />
          <circle r="12" fill="#ffffff" filter="url(#circuit-glow)" />
        </g>

        {/* Main PCB Circuit Traces Radiating Outward */}
        <g stroke="url(#circuit-grad-cyan)" strokeWidth="2.5" fill="none" filter="url(#circuit-glow)">
          {/* Top Left Quadrant Traces */}
          <path
            d="M 820 440 L 640 440 L 520 320 L 260 320 L 180 240 L 80 240"
            strokeDasharray="180 18"
            strokeDashoffset={-dashOffset}
          />
          <path
            d="M 860 400 L 860 260 L 720 120 L 400 120 L 320 40"
            strokeDasharray="240 24"
            strokeDashoffset={dashOffset}
          />
          <path
            d="M 820 500 L 580 500 L 440 640 L 200 640 L 120 720 L 60 720"
            strokeDasharray="150 15"
            strokeDashoffset={-dashOffset * 1.2}
          />

          {/* Top Right Quadrant Traces */}
          <path
            d="M 1100 440 L 1280 440 L 1400 320 L 1660 320 L 1740 240 L 1840 240"
            strokeDasharray="180 18"
            strokeDashoffset={dashOffset}
          />
          <path
            d="M 1060 400 L 1060 260 L 1200 120 L 1520 120 L 1600 40"
            strokeDasharray="240 24"
            strokeDashoffset={-dashOffset}
          />
          <path
            d="M 1100 500 L 1340 500 L 1480 640 L 1720 640 L 1800 720 L 1860 720"
            strokeDasharray="150 15"
            strokeDashoffset={dashOffset * 1.2}
          />

          {/* Bottom Left Quadrant Traces */}
          <path
            d="M 860 680 L 860 820 L 720 960 L 400 960 L 320 1040"
            strokeDasharray="200 20"
            strokeDashoffset={-dashOffset}
          />
          <path
            d="M 900 680 L 900 860 L 620 860 L 500 980 L 200 980"
            strokeDasharray="180 18"
            strokeDashoffset={dashOffset * 1.1}
          />

          {/* Bottom Right Quadrant Traces */}
          <path
            d="M 1060 680 L 1060 820 L 1200 960 L 1520 960 L 1600 1040"
            strokeDasharray="200 20"
            strokeDashoffset={dashOffset}
          />
          <path
            d="M 1020 680 L 1020 860 L 1300 860 L 1420 980 L 1720 980"
            strokeDasharray="180 18"
            strokeDashoffset={-dashOffset * 1.1}
          />
        </g>

        {/* Secondary Piercing Solar Orange Traces */}
        <g stroke="url(#circuit-grad-orange)" strokeWidth="1.8" fill="none">
          <path
            d="M 820 470 L 680 470 L 580 370 L 380 370 L 300 290"
            strokeDasharray="100 10"
            strokeDashoffset={dashOffset * 1.5}
          />
          <path
            d="M 1100 470 L 1240 470 L 1340 370 L 1540 370 L 1620 290"
            strokeDasharray="100 10"
            strokeDashoffset={-dashOffset * 1.5}
          />
          <path
            d="M 940 400 L 940 180 L 840 80 L 640 80"
            strokeDasharray="80 12"
            strokeDashoffset={dashOffset * 1.3}
          />
          <path
            d="M 980 400 L 980 180 L 1080 80 L 1280 80"
            strokeDasharray="80 12"
            strokeDashoffset={-dashOffset * 1.3}
          />
        </g>

        {/* Circuit Nodes / Solder Vias with Blinking Pulses */}
        {[
          [260, 320], [520, 320], [640, 440], [860, 260], [720, 120],
          [1660, 320], [1400, 320], [1280, 440], [1060, 260], [1200, 120],
          [440, 640], [200, 640], [1480, 640], [1720, 640],
          [720, 960], [400, 960], [1200, 960], [1520, 960]
        ].map(([cx, cy], idx) => {
          const isGlowing = Math.sin(frame * 0.2 + idx) > 0.3;
          return (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r="6"
                fill={isGlowing ? "#ffffff" : "rgba(0, 240, 255, 0.4)"}
                stroke={accentColor}
                strokeWidth="1.5"
                filter={isGlowing ? "url(#circuit-glow)" : undefined}
              />
              <circle
                cx={cx}
                cy={cy}
                r={10 + 4 * Math.sin(frame * 0.3 + idx)}
                fill="none"
                stroke={glowColor}
                strokeWidth="0.8"
                opacity={isGlowing ? 0.7 : 0.2}
              />
            </g>
          );
        })}

        {/* Microchip Labels & Logic Gates */}
        <g fill="rgba(0, 240, 255, 0.7)" fontFamily="'Courier New', monospace" fontSize="11" letterSpacing="0.1em">
          <text x="530" y="310">BUS_01 // 64-BIT</text>
          <text x="1390" y="310">NEURAL_PIPE // ACTIVE</text>
          <text x="450" y="630">SPATIAL_DAC // 44.1kHz</text>
          <text x="1350" y="630">VK_18_CHASE // CLOCKED</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
