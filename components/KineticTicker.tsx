"use client";

// ════════════════════════════════════════════════════════════
// AFTER EFFECTS–STYLE KINETIC TICKER RIBBON v2.0
// Dual infinite marquee with motion graphic visual language:
//  — Animated LED score dots  — Stroke separators
//  — RCB Crimson / Solar Amber / Acid Neon accent flares
//  — Cricket live score injection
//  — High-energy editorial type treatment
// ════════════════════════════════════════════════════════════

export default function KineticTicker() {
  const items1 = [
    "ARYAN TANTY",
    "@_ARYAN085",
    "DIGITAL CREATOR",
    "ICSE CLASS 10 RIGOR",
    "ROYAL CHALLENGERS BENGALURU",
    "VIRAT KOHLI MENTALITY",
    "HARDWARE ENTHUSIAST",
    "MOTION GRAPHICS & VISUALS",
    "CURIOUS BY NATURE",
    "SOLAR KINETIC 2026",
  ];

  const items2 = [
    "INSTAGRAM @_ARYAN085",
    "PRECISE BY CHOICE",
    "ZERO UNNECESSARY NOISE",
    "EE SALA CUP NAMDE",
    "CHASING IMPOSSIBLE RUN RATES",
    "SPATIAL AUDIO & WEARABLES",
    "AI SYSTEMS & AUTOMATION",
    "VROARYAN25@GMAIL.COM",
    "BUILT WITH INTENT",
  ];

  return (
    <div className="relative select-none overflow-hidden border-y border-white/[0.07]">
      {/* Gradient edge fades */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-canvas-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-canvas-950 to-transparent z-10" />

      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-solar-500/80 to-transparent" />
      {/* Bottom highlight line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rcb-500/60 to-transparent" />

      {/* ── BAND 1: PRIMARY — Forward marquee ── */}
      <div className="flex w-max animate-marquee space-x-0 whitespace-nowrap py-3 border-b border-white/[0.04]">
        {[...items1, ...items1, ...items1, ...items1].map((text, i) => (
          <div key={`b1-${i}`} className="inline-flex items-center">
            <span className="text-lg sm:text-2xl font-black tracking-tight text-white font-mono uppercase px-6">
              {text}
            </span>
            {/* Animated separator */}
            <span className="relative mx-1 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-solar-500 shadow-[0_0_8px_rgba(255,107,0,1)] animate-pulse" />
              <span className="w-px h-5 bg-white/20 mx-2" />
            </span>
          </div>
        ))}
      </div>

      {/* ── BAND 2: SECONDARY — Reverse marquee ── */}
      <div className="flex w-max animate-marquee-reverse space-x-0 whitespace-nowrap py-2.5">
        {[...items2, ...items2, ...items2, ...items2].map((text, i) => (
          <div key={`b2-${i}`} className="inline-flex items-center">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase font-mono px-5">
              <span className="text-solar-400/90">//</span>
              <span className="ml-2 text-graphite-300">{text}</span>
            </span>
            <span className="text-rcb-500 text-xs font-black px-1">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
