"use client";

import Image from "next/image";
import { ACADEMIC_SUBJECTS } from "@/data/portfolioData";
import {
  Binary,
  Dna,
  BookOpen,
  TrendingUp,
  GraduationCap,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import MotionCard from "./MotionCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Academics() {
  const iconMap: Record<string, React.ReactNode> = {
    Binary: <Binary className="w-5 h-5 text-solar-400" />,
    Dna: <Dna className="w-5 h-5 text-emerald-400" />,
    BookOpen: <BookOpen className="w-5 h-5 text-amber-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-crimson-400" />,
  };

  const learningPrinciples = [
    {
      title: "First Principles & Clarity",
      desc: "Mastering fundamental theorems before tackling edge cases. If a concept cannot be explained plainly, it isn't understood.",
    },
    {
      title: "Practical Intuition",
      desc: "Linking textbook abstractions to observable biological systems, economic mechanisms, and real engineering.",
    },
    {
      title: "Structured Revision",
      desc: "Disciplined note architecture and spaced review cycles to keep understanding sharp without burnout.",
    },
  ];

  return (
    <section id="academics" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
              05 / ACADEMICS &middot; ICSE CLASS 10
            </span>
            <span className="h-px w-8 bg-solar-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
            Curiosity doesn&apos;t stop at technology.
          </h2>
          <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-2xl">
            Currently navigating the ICSE Class 10 curriculum with an emphasis on conceptual depth,
            practical understanding, and structured discipline.
          </p>
        </ScrollReveal>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Authentic Student Portrait with Blueprint Grid */}
          <ScrollReveal direction="left" distance={40} className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/20 light:border-slate-200 p-2.5 shadow-2xl">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#131722] to-[#0a0c12]">
                {/* Blueprint grid background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none"
                />

                {/* Animated circular diagram */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none"
                >
                  <div className="w-56 h-56 rounded-full border border-solar-400/50 animate-spin-slow" />
                </div>

                {/* Real Photo Portrait */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src="/images/optimized/aryan-portrait-standing.webp"
                    alt="Aryan Tanty in ICSE school uniform standing by woodland trees"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl glass-panel border border-white/15 backdrop-blur-md z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        ICSE Class 10
                      </div>
                      <div className="text-[10px] font-mono text-solar-400">
                        Academic Rigor &middot; India Curriculum
                      </div>
                    </div>
                    <GraduationCap className="w-5 h-5 text-solar-400" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Academic Subject Cards with Staggered Cascading Animation */}
          <StaggerContainer staggerDelay={0.12} className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACADEMIC_SUBJECTS.map((subject, idx) => (
              <StaggerItem key={subject.title}>
                <MotionCard
                  glowColor={idx % 2 === 0 ? "solar" : "crimson"}
                  className="p-6 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200">
                        {iconMap[subject.iconName]}
                      </div>
                      <span className="font-mono text-xs text-graphite-400">
                        {subject.code}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white light:text-slate-900 mb-1">
                      {subject.title}
                    </h3>
                    <div className="text-xs font-mono text-solar-400 light:text-solar-600 mb-3 font-semibold">
                      // {subject.focus}
                    </div>
                    <p className="text-xs text-graphite-400 light:text-slate-600 leading-relaxed mb-4">
                      {subject.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 light:border-slate-200 flex flex-wrap gap-1.5">
                    {subject.highlights.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-graphite-300 light:text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Learning Principles Box */}
        <ScrollReveal direction="up" distance={30} className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 light:border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold text-white light:text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-solar-500" />
            <span>Aryan&apos;s Approach to Study &amp; Problem Solving</span>
          </h3>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPrinciples.map((item, index) => (
              <StaggerItem key={item.title}>
                <div className="p-5 rounded-2xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 h-full">
                  <div className="text-xs font-mono text-solar-400 font-bold mb-1">
                    0{index + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-graphite-400 light:text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
}
