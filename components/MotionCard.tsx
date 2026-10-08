"use client";

import React, { useRef, useState } from "react";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "solar" | "crimson" | "acid";
}

export default function MotionCard({
  children,
  className = "",
  glowColor = "solar",
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setCoords({ x, y });
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const glowGradient =
    glowColor === "crimson"
      ? "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 42, 77, 0.18), transparent 70%)"
      : glowColor === "acid"
      ? "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(212, 255, 0, 0.16), transparent 70%)"
      : "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 107, 0, 0.18), transparent 70%)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s ease-out",
          "--mouse-x": `${coords.x}px`,
          "--mouse-y": `${coords.y}px`,
        } as React.CSSProperties
      }
      className={`relative rounded-3xl glass-panel border border-white/10 light:border-slate-200 overflow-hidden transition-colors ${className}`}
    >
      {/* Specular glare overlay following mouse */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-300"
          style={{ background: glowGradient }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
