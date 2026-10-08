"use client";

import { useEffect, useRef, useState } from "react";
import { playStadiumRoar, playSuccessChime } from "@/lib/sound";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vr: number;
}

export default function CelebrationOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleCelebrate = () => {
      setActive(true);
      playStadiumRoar();
      playSuccessChime();

      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // RCB Crimson, Solar Gold, Acid Chartreuse, White, Platinum
      const colors = ["#FF2A4D", "#FF6B00", "#E2FD52", "#FFFFFF", "#FFD700", "#FF477E"];
      const newParticles: Particle[] = [];

      // Spawn 160 confetti pieces from bottom corners and top center
      for (let i = 0; i < 180; i++) {
        const fromLeft = i % 2 === 0;
        const x = fromLeft ? Math.random() * 200 : window.innerWidth - Math.random() * 200;
        const y = window.innerHeight + 20;

        const angle = fromLeft
          ? -Math.PI / 3 - Math.random() * 0.4
          : -2 * (Math.PI / 3) + Math.random() * 0.4;
        const speed = 14 + Math.random() * 16;

        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 8,
          alpha: 1,
          decay: 0.006 + Math.random() * 0.008,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
        });
      }

      particlesRef.current = newParticles;

      let elapsed = 0;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = 0;

        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35; // gravity
          p.vx *= 0.985; // drag
          p.rotation += p.vr;
          p.alpha -= p.decay;

          if (p.alpha > 0) {
            alive++;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
          }
        });

        elapsed++;
        if (alive > 0 && elapsed < 300) {
          animIdRef.current = requestAnimationFrame(animate);
        } else {
          setActive(false);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      animIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("aryan:celebrate", handleCelebrate);
    return () => {
      window.removeEventListener("aryan:celebrate", handleCelebrate);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
