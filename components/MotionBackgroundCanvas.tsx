"use client";

import { useEffect, useRef } from "react";

export default function MotionBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      radius: 180,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Kinetic particles
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseColor: string;
      glowColor: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const colors = [
      { base: "#ff6b00", glow: "rgba(255, 107, 0, 0.8)" },
      { base: "#ff2a4d", glow: "rgba(255, 42, 77, 0.8)" },
      { base: "#ffa043", glow: "rgba(255, 160, 67, 0.8)" },
      { base: "#e2fd52", glow: "rgba(226, 253, 82, 0.6)" },
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.2 + 1,
        baseColor: col.base,
        glowColor: col.glow,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    // Rotating 3D Gyro Rings in Background
    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Gyroscopic Orbital Rings in background
      angleX += 0.004;
      angleY += 0.006;
      const centerX = width > 1024 ? width * 0.72 : width * 0.5;
      const centerY = height * 0.45;
      const ringRadius = Math.min(220, width * 0.22);

      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 (Solar Amber)
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255, 107, 0, 0.22)";
      ctx.setLineDash([8, 8]);
      ctx.ellipse(
        0,
        0,
        ringRadius,
        ringRadius * Math.abs(Math.sin(angleX)),
        angleX,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // Ring 2 (RCB Crimson)
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 42, 77, 0.2)";
      ctx.setLineDash([12, 6]);
      ctx.ellipse(
        0,
        0,
        ringRadius * 0.8,
        ringRadius * 0.8 * Math.abs(Math.cos(angleY)),
        -angleY,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // Ring 3 (Acid Lime Inner Pulse)
      ctx.beginPath();
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(226, 253, 82, 0.18)";
      ctx.setLineDash([]);
      ctx.ellipse(
        0,
        0,
        ringRadius * 0.5,
        ringRadius * 0.5 * Math.abs(Math.sin(angleY * 1.5)),
        angleX * 1.2,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      ctx.restore();

      // 2. Update and draw particles with interactive mouse repulsion & connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 3;
            p.y -= Math.sin(angle) * force * 3;
          }
        }

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connecting lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 107, 0, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
