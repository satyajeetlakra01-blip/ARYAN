"use client";

import { PERSONALITY_TRAITS, SKILLS_MATRIX } from "@/data/portfolioData";
import { Check, Sparkles, Tag, ShieldCheck, Flame } from "lucide-react";
import MotionCard from "./MotionCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Personality() {
  return (
    <section id="personality" className="py-24 sm:py-32 relative bg-canvas-900/50 light:bg-slate-50/70 border-t border-white/5 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
              08 / MINDSET &amp; STRENGTHS
            </span>
            <span className="h-px w-8 bg-solar-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
            How Aryan approaches things.
          </h2>
          <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-2xl">
            Character defined through restraint, curiosity, and execution. No artificial ratings—just
            the real qualities driving daily effort.
          </p>
        </ScrollReveal>

        {/* 6 Personality Trait Cards with Staggered Cascading Animation */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PERSONALITY_TRAITS.map((trait, index) => (
            <StaggerItem key={trait.keyword}>
              <MotionCard
                glowColor={index === 1 || index === 4 ? "crimson" : "solar"}
                className="p-6 sm:p-7 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black text-solar-400 tracking-widest">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-graphite-500 uppercase">
                      TRAIT
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white light:text-slate-900 mb-1">
                    {trait.keyword}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-solar-400 light:text-solar-600 mb-3 font-semibold">
                    // {trait.phrase}
                  </div>
                  <p className="text-xs sm:text-sm text-graphite-400 light:text-slate-600 leading-relaxed">
                    {trait.explanation}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] font-mono text-graphite-500">
                  <span>AUTHENTIC</span>
                  <span className="text-solar-400">NON-NEGOTIABLE</span>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Visual Skills & Strengths Matrix */}
        <ScrollReveal direction="up" distance={30} className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 light:border-slate-200">
          <div className="flex flex-col space-y-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-solar-400 font-bold">
              CAPABILITY MATRIX
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900">
              Core Strengths &amp; Competencies
            </h3>
            <p className="text-xs sm:text-sm text-graphite-400 light:text-slate-600">
              Qualitative competencies across creative, technical, and academic dimensions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {SKILLS_MATRIX.map((skill) => (
              <div
                key={skill.name}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 text-xs sm:text-sm text-graphite-200 light:text-slate-800 transition-all hover:border-solar-500/50 hover:bg-solar-500/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-solar-500" />
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] font-mono text-graphite-500 light:text-slate-500 ml-1">
                  &middot; {skill.category}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
