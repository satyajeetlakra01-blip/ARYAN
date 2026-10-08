"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, Radio, Compass, Clock, ShieldCheck, Mail, Instagram } from "lucide-react";

export default function TelemetryBar() {
  const [time, setTime] = useState("");
  const [fps, setFps] = useState(60);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // 1. Clock updater (Indian Standard Time)
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // 2. Real-time FPS counter using requestAnimationFrame
    let animId: number;
    const calcFps = (now: number) => {
      frameCountRef.current++;
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current)));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="w-full bg-canvas-950/80 border-b border-white/5 py-1 px-4 text-[11px] font-mono text-graphite-400 select-none overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Left Telemetry: Identity + Location */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-solar-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-solar-500 animate-ping inline-block" />
            <span>ARYAN TANTY</span>
            <span className="text-graphite-600">//</span>
            <span className="text-white font-normal">DIGITAL CREATOR</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-graphite-400">
            <Compass className="w-3 h-3 text-solar-400" />
            <span>20.2961° N, 85.8245° E (ODISHA)</span>
          </div>
        </div>

        {/* Center: Live Time + FPS */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-graphite-300">
            <Clock className="w-3 h-3 text-solar-400" />
            <span>IST {time || "--:--:--"} [UTC+5:30]</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-acid-400">
            <Activity className="w-3 h-3 text-acid-400" />
            <span>{fps} FPS ULTRA</span>
          </div>
        </div>

        {/* Right: Verified Direct Contact & Instagram */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=vroaryan25@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 hover:text-solar-400 transition-colors"
            title="Compose in Gmail to vroaryan25@gmail.com"
          >
            <Mail className="w-3 h-3 text-solar-400" />
            <span>vroaryan25@gmail.com</span>
          </a>
          <span className="hidden lg:inline text-graphite-700">|</span>
          <a
            href="https://www.instagram.com/_aryan085/?__pwa=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-solar-400 hover:text-solar-300 transition-colors"
          >
            <Instagram className="w-3 h-3" />
            <span>@_aryan085</span>
          </a>
        </div>
      </div>
    </div>
  );
}
