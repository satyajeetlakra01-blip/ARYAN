import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

interface ParticlesBackgroundProps {
  accentColor?: string;
  theme?: "cyber" | "solar" | "stadium" | "climax";
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  accentColor = "#ff6b00",
  theme = "cyber",
}) => {
  const frame = useCurrentFrame();

  // Deterministic particles calculated from index
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const seedX = ((i * 137.5) % 1920);
    const seedY = ((i * 223.7) % 1080);
    const speed = 0.4 + (i % 5) * 0.3;
    const y = (seedY + frame * speed) % 1080;
    const size = 2 + (i % 4) * 2;
    const opacity = 0.2 + 0.5 * Math.sin((frame * 0.05) + i);
    return { x: seedX, y, size, opacity };
  });

  const getGradient = () => {
    switch (theme) {
      case "stadium":
        return "radial-gradient(circle at 50% 40%, rgba(225, 29, 72, 0.25) 0%, rgba(10, 10, 18, 0.95) 75%, #050608 100%)";
      case "climax":
        return "radial-gradient(circle at 50% 50%, rgba(255, 107, 0, 0.35) 0%, rgba(15, 12, 28, 0.95) 70%, #030407 100%)";
      case "solar":
        return "radial-gradient(circle at 65% 35%, rgba(255, 107, 0, 0.2) 0%, rgba(8, 10, 15, 0.95) 70%, #050608 100%)";
      default:
        return "radial-gradient(circle at 35% 35%, rgba(6, 182, 212, 0.15) 0%, rgba(8, 10, 15, 0.95) 70%, #050608 100%)";
    }
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050608",
        backgroundImage: getGradient(),
        overflow: "hidden",
      }}
    >
      {/* Cyber Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateY(${(frame * 0.5) % 80}px)`,
          opacity: 0.6,
        }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 3 === 0 ? accentColor : "#ffffff",
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${i % 3 === 0 ? accentColor : "#ffffff"}`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
