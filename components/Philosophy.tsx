"use client";

import { PHILOSOPHY_TENETS } from "@/data/portfolioData";
import { Check, ShieldCheck, Zap, Layers, Flame } from "lucide-react";
import MotionCard from "./MotionCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Philosophy() {
  const criteria = [
    "Saves time and eliminates unnecessary steps",
    "Reduces cognitive and visual clutter",
    "Serves a clear, practical purpose",
    "Looks intentional and refined",
    "Functions consistently and reliably",
    "Feels polished in daily interaction",
  ];

  return (
    <section id="philosophy" className="py-24 sm:py-32 relative bg-canvas-900/60 light:bg-slate-50/70 border-y border-white/5 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
              02 / PHILOSOPHY
            </span>
            <span className="h-px w-8 bg-solar-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white light:text-slate-900 leading-[1.12]">
            Make it useful. <br />
            Make it beautiful. <br />
            <span className="solar-gradient-text">Make it feel right.</span>
          </h2>
          <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-2xl pt-2">
            A personal design and digital manifesto. If a device, application, or layout doesn&apos;t
            elevate how life functions, it doesn&apos;t belong.
          </p>
        </ScrollReveal>

        {/* 3 Core Tenets with Staggered Scroll Animation */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {PHILOSOPHY_TENETS.map((tenet, idx) => (
            <StaggerItem key={tenet.number}>
              <MotionCard
                glowColor={idx === 1 ? "crimson" : "solar"}
                className="p-8 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-3xl font-black text-solar-400">
                      {tenet.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      TENET
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 mb-2">
                    {tenet.title}
                  </h3>
                  <div className="text-xs font-mono text-solar-400 light:text-solar-600 uppercase tracking-wider mb-4 font-semibold">
                    // {tenet.subtitle}
                  </div>
                  <p className="text-sm text-graphite-400 light:text-slate-600 leading-relaxed">
                    {tenet.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] font-mono text-graphite-500">
                  <span>NON-NEGOTIABLE</span>
                  <span className="text-solar-400">0{idx + 1} / 03</span>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* The Criteria Matrix Box */}
        <ScrollReveal direction="up" distance={30} className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 light:border-slate-200 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="flex flex-col space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-solar-400 font-bold">
              THE ARYAN TANTY STANDARD
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white light:text-slate-900">
              Six Questions Every Project Must Pass
            </h3>
            <p className="text-xs sm:text-sm text-graphite-400 light:text-slate-600">
              Before committing time to an idea, tool, or build, Aryan evaluates against these benchmarks:
            </p>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {criteria.map((item, index) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 hover:border-solar-500/40 transition-colors h-full">
                  <div className="p-1 rounded-lg bg-solar-500/20 text-solar-400 mt-0.5 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-graphite-500 uppercase">
                      CRITERION 0{index + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white light:text-slate-900 mt-0.5">
                      {item}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
}
