"use client";

import { useState } from "react";
import { CRICKET_INSIGHTS } from "@/data/portfolioData";
import { Trophy, Flame, Target, Quote, Zap, Activity, Sparkles, Volume2, ExternalLink, Globe } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { playUiClick, playStadiumRoar, playSuccessChime } from "@/lib/sound";

export default function Cricket() {
  const [runRate, setRunRate] = useState<number>(11.5);
  const [isPlayingBall, setIsPlayingBall] = useState(false);
  const [activeBallText, setActiveBallText] = useState<string | null>(null);

  const getPressureState = (rrr: number) => {
    if (rrr < 8) {
      return {
        label: "CALCULATED STRIKE ROTATION",
        desc: "Low-risk boundary finding, precise gaps, building the platform.",
        color: "text-emerald-400",
        borderColor: "border-emerald-500/40",
        pulse: "bg-emerald-500",
      };
    } else if (rrr < 14) {
      return {
        label: "STEPPING ON THE ACCELERATOR",
        desc: "Tactical boundary targeting, converting ones into twos, relentless body language.",
        color: "text-amber-400",
        borderColor: "border-amber-500/40",
        pulse: "bg-amber-500",
      };
    } else {
      return {
        label: "KING KOHLI CHASE MODE (MELBOURNE 82*)",
        desc: "Unwavering self-belief, absolute laser focus, snatching victory from impossible odds.",
        color: "text-rcb-400",
        borderColor: "border-rcb-500/60 shadow-[0_0_20px_rgba(255,42,77,0.3)]",
        pulse: "bg-rcb-500 animate-ping",
      };
    }
  };

  const handleSliderChange = (newVal: number) => {
    setRunRate(newVal);
    playUiClick();
    if (newVal >= 17.5) {
      playStadiumRoar();
      window.dispatchEvent(new CustomEvent("aryan:celebrate"));
    }
  };

  const handleSimulateMelbourne = () => {
    setIsPlayingBall(true);
    playStadiumRoar();
    window.dispatchEvent(new CustomEvent("aryan:celebrate"));
    setActiveBallText("18.5 // Haris Rauf to Kohli: PUNCHED STRAIGHT BACK OVER THE BOWLER'S HEAD FOR SIX! THE SHOT OF AN EMPEROR!");
    setTimeout(() => {
      setActiveBallText("18.6 // Flicked off the hip over fine leg for SIX! 12 off 2 balls! MELBOURNE ERUPTS!");
    }, 2800);
    setTimeout(() => {
      setIsPlayingBall(false);
    }, 5500);
  };

  const pressure = getPressureState(runRate);

  return (
    <section
      id="cricket"
      className="py-24 sm:py-32 relative bg-canvas-950 border-y border-white/10 overflow-hidden"
    >
      {/* Stadium Floodlight Radial Accents */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-rcb-500/15 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 left-10 w-[450px] h-[450px] bg-solar-500/10 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-rcb-400 tracking-wider uppercase font-bold">
              06 / PASSION &middot; THE CHASE
            </span>
            <span className="h-px w-8 bg-rcb-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
            Off-screen, there&apos;s cricket.
          </h2>
          <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-2xl">
            Royal Challengers Bengaluru loyalty &bull; Virat Kohli inspiration &bull; The art of chasing under fire.
          </p>
        </ScrollReveal>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Big RCB Stadium Card & Quote with Scroll Reveal */}
          <ScrollReveal direction="left" distance={40} className="lg:col-span-7 p-5 sm:p-8 md:p-10 rounded-3xl glass-panel border border-rcb-500/30 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#180509] via-canvas-900 to-[#0e0305]">
            {/* Giant Background 18 Watermark */}
            <div
              aria-hidden="true"
              className="absolute -right-8 -bottom-10 text-[180px] sm:text-[240px] font-black font-mono text-white/[0.04] select-none pointer-events-none leading-none"
            >
              18
            </div>

            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-rcb-500/30 text-rcb-400 border border-rcb-500/40 flex items-center gap-1.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-rcb-500" />
                  <span>ROYAL CHALLENGERS BENGALURU</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-solar-500/20 text-solar-300 border border-solar-500/30 flex items-center gap-1.5 shadow-md">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>VIRAT KOHLI #18</span>
                </span>
              </div>

              {/* Core Quote */}
              <div className="relative mb-6 pl-4 border-l-2 border-rcb-500">
                <Quote className="w-8 h-8 text-white/10 absolute -top-4 -left-2 -z-10" />
                <p className="text-lg sm:text-2xl font-bold text-white light:text-slate-900 leading-snug">
                  &ldquo;{CRICKET_INSIGHTS.coreQuote}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base text-graphite-300 light:text-slate-600 leading-relaxed mb-6">
                For Aryan, cricket is a masterclass in psychology, stamina, and ruthless execution.
                Watching Virat Kohli chase down impossible fourth-innings totals with sheer willpower,
                physical conditioning, and tactical composure provides a direct blueprint for handling
                pressure in academics, code, and creative projects.
              </p>

              {/* Interactive Melbourne Replay Trigger */}
              <div className="pt-2">
                <button
                  onClick={handleSimulateMelbourne}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-rcb-600 to-solar-600 hover:from-rcb-500 hover:to-solar-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,42,77,0.4)] hover:shadow-[0_0_35px_rgba(255,42,77,0.7)] hover:scale-[1.02] active:scale-[0.98]"
                  data-cursor-text="MELBOURNE 82*"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Simulate Melbourne 82* Climax</span>
                  <Sparkles className="w-3.5 h-3.5 text-acid-300 animate-spin" />
                </button>
              </div>

              {/* Dynamic Live Ball Commentary Ticker */}
              {activeBallText && (
                <div className="mt-4 p-4 rounded-2xl bg-rcb-950/80 border border-rcb-500/50 text-xs font-mono text-white animate-fadeIn flex items-start gap-3 shadow-lg">
                  <Volume2 className="w-4 h-4 text-rcb-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="text-rcb-400 font-bold block mb-1">
                      LIVE MCG COMMENTARY:
                    </span>
                    <span className="text-white leading-relaxed">{activeBallText}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-graphite-400">
              <span className="flex items-center gap-2 text-rcb-400 font-semibold">
                <Flame className="w-4 h-4 text-rcb-400" />
                <span>UNCONDITIONAL RCB BELIEF</span>
              </span>
              <span className="flex items-center gap-2 text-solar-400 font-semibold">
                <Target className="w-4 h-4 text-solar-400" />
                <span>100% INTENSITY OR NOTHING</span>
              </span>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Chase Simulator with Scroll Reveal */}
          <ScrollReveal direction="right" distance={40} className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-8 rounded-3xl glass-panel border border-white/10 bg-canvas-900/90 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-solar-400 font-bold">
                    INTERACTIVE SIMULATOR
                  </span>
                  <h3 className="text-xl font-bold text-white light:text-slate-900">
                    The Run-Chase Engine
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-rcb-500/20 border border-rcb-500/30 flex items-center justify-center text-rcb-400">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              {/* Slider Control */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-graphite-400">REQUIRED RUN RATE:</span>
                  <span className="text-white font-bold text-sm text-solar-400">
                    {runRate.toFixed(1)} RPO
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="18"
                  step="0.5"
                  value={runRate}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="w-full accent-rcb-500 h-2 bg-white/10 rounded-lg cursor-pointer"
                  data-cursor-text="DRAG RPO"
                />
                <div className="flex justify-between text-[10px] font-mono text-graphite-500">
                  <span>6.0 (Steady)</span>
                  <span>12.0 (High Pressure)</span>
                  <span>18.0 (King Kohli)</span>
                </div>
              </div>

              {/* Dynamic Mindset Display */}
              <div
                className={`p-5 rounded-2xl border ${pressure.borderColor} bg-white/5 transition-all duration-300`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${pressure.pulse}`} />
                  <span
                    className={`text-xs font-mono font-bold tracking-wider ${pressure.color}`}
                  >
                    {pressure.label}
                  </span>
                </div>
                <p className="text-xs text-graphite-300 light:text-slate-600 leading-relaxed">
                  {pressure.desc}
                </p>
              </div>

              {/* Work Ethic Pillars */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                  <span className="font-mono text-graphite-400">FITNESS STANDARD:</span>
                  <span className="text-white font-semibold">ZERO COMPROMISE</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                  <span className="font-mono text-graphite-400">PRESSURE RESPONSE:</span>
                  <span className="text-solar-400 font-semibold">ATTACK THE RUNS</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                  <span className="font-mono text-graphite-400">TEAM PASSION:</span>
                  <span className="text-rcb-400 font-semibold">RCB FOREVER</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Official Cricket Portals: Team India (BCCI) & Royal Challengers Bengaluru */}
        <ScrollReveal direction="up" distance={30} className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 bg-canvas-900/80 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-solar-500 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-solar-400 font-bold">
                  OFFICIAL CRICKET NETWORKS &bull; VERIFIED PORTALS
                </span>
              </div>
              <span className="text-[11px] font-mono text-graphite-500">
                DIRECT FEDERATION &amp; FRANCHISE ACCESS
              </span>
            </div>

            {/* 3 Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Team India (BCCI) */}
              <a
                href="https://www.bcci.tv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick()}
                data-cursor-text="BCCI.TV"
                className="group p-5 rounded-2xl bg-gradient-to-br from-[#071329] to-canvas-950 border border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <span>🇮🇳 TEAM INDIA</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    BCCI Official
                  </h4>
                  <p className="text-xs text-graphite-400 mt-1 leading-relaxed">
                    Official Board of Control for Cricket in India portal — live fixtures, player archives, and national squad news.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-blue-400 font-semibold">
                  <span>bcci.tv</span>
                  <span className="group-hover:underline">Visit Portal &rarr;</span>
                </div>
              </a>

              {/* Card 2: Royal Challengers Bengaluru (RCB) */}
              <a
                href="https://www.royalchallengers.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick()}
                data-cursor-text="RCB.COM"
                className="group p-5 rounded-2xl bg-gradient-to-br from-[#20050b] to-canvas-950 border border-rcb-500/40 hover:border-rcb-400 hover:shadow-[0_0_25px_rgba(255,42,77,0.35)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-rcb-500/25 text-rcb-400 border border-rcb-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <Flame className="w-3 h-3 fill-rcb-500" />
                      <span>RCB HUB</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-rcb-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-rcb-300 transition-colors">
                    Royal Challengers
                  </h4>
                  <p className="text-xs text-graphite-400 mt-1 leading-relaxed">
                    Official RCB franchise home — match schedules, Bold Diaries, team rosters, and Virat Kohli #18 legacy.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-rcb-400 font-semibold">
                  <span>royalchallengers.com</span>
                  <span className="group-hover:underline">Visit Portal &rarr;</span>
                </div>
              </a>

              {/* Card 3: ICC (International Cricket Council) */}
              <a
                href="https://www.icc-cricket.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick()}
                data-cursor-text="ICC"
                className="group p-5 rounded-2xl bg-gradient-to-br from-[#121020] to-canvas-950 border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <Trophy className="w-3 h-3" />
                      <span>GLOBAL CRICKET</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    ICC Official
                  </h4>
                  <p className="text-xs text-graphite-400 mt-1 leading-relaxed">
                    World cricket governing body — World Cup tournaments, World Test Championship rankings, and global statistics.
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-purple-400 font-semibold">
                  <span>icc-cricket.com</span>
                  <span className="group-hover:underline">Visit Portal &rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Side Insight Cards with Staggered Cascading Animation */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CRICKET_INSIGHTS.points.map((pt, index) => (
            <StaggerItem key={pt.title}>
              <div className="p-6 rounded-3xl glass-panel border border-white/10 light:border-slate-200 hover:border-rcb-500/40 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-rcb-500" />
                  <h3 className="text-sm font-bold text-white light:text-slate-900">
                    {pt.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-graphite-400 light:text-slate-600 leading-relaxed">
                  {pt.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
