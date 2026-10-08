"use client";

import Image from "next/image";
import { Cpu, Eye, BookOpen, Sparkles, Flame, CheckCircle2 } from "lucide-react";
import MotionCard from "./MotionCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function About() {
  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-solar-400" />,
      title: "Technological Curiosity",
      desc: "Keen to understand how emerging AI systems, modern silicon, and connected hardware reshape everyday life.",
      glowColor: "solar" as const,
    },
    {
      icon: <Eye className="w-5 h-5 text-crimson-400" />,
      title: "Visual Sensitivity",
      desc: "Appreciates honest composition, realistic lighting, and intentional design over bloated effects or artificial filters.",
      glowColor: "crimson" as const,
    },
    {
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      title: "Focused Student Discipline",
      desc: "Dedicated ICSE Class 10 student who values clear concepts, logical deduction, and structured thinking.",
      glowColor: "solar" as const,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
              01 / IDENTITY
            </span>
            <span className="h-px w-8 bg-solar-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
            More than a profile.
          </h2>
          <p className="text-base sm:text-lg text-solar-400/90 light:text-solar-600 font-mono">
            // Young &bull; Smart &bull; Digital &bull; Creative &bull; Precise &bull; Ambitious
          </p>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Visual Presentation: Dual Natural Photo Collage */}
          <ScrollReveal direction="left" distance={40} duration={0.8} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Outer Ambient Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 bg-gradient-to-tr from-solar-500/25 to-crimson-500/20 rounded-[2.5rem] blur-2xl opacity-75"
              />

              {/* Primary Focused Portrait */}
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-white/20 light:border-slate-300 bg-canvas-900 shadow-2xl group">
                <Image
                  src="/images/aryan-bike-portrait.webp"
                  alt="Aryan Tanty seated on Royal Enfield motorcycle with authentic confident smile"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl glass-panel border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-solar-500 animate-pulse" />
                  <span>DIRECT FOCUS // AUTHENTIC</span>
                </div>

                {/* Bottom Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl glass-panel border border-white/15 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        Royal Enfield Classic &middot; Outdoor
                      </div>
                      <div className="text-[10px] font-mono text-solar-400 mt-0.5">
                        High Dynamic Sensor &middot; Galaxy S24 Ultra
                      </div>
                    </div>
                    <Flame className="w-4 h-4 text-solar-400" />
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Snapshot */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-44 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-solar-500/50 shadow-2xl bg-canvas-900 group">
                <Image
                  src="/images/aryan-bike-helmet.webp"
                  alt="Aryan on motorcycle with helmet and visor"
                  fill
                  sizes="180px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[9px] font-mono text-solar-400">
                  RIDER // 9156
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Editorial Text & Character Traits */}
          <ScrollReveal direction="right" distance={40} duration={0.8} className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base sm:text-lg text-graphite-300 light:text-slate-700 leading-relaxed font-normal">
              <p>
                Aryan Tanty is a curious, energetic, and practical digital creator and
                student based in India. Rather than following trends passively, Aryan approaches
                the digital world with an analytical eye and an appetite for learning how
                systems, software, and gadgets genuinely work.
              </p>
              <p>
                He has a natural preference for clean design, realistic presentation, and
                solutions that save time. Whether exploring recent developments in artificial
                intelligence, testing creative visual workflows, or diving into high-fidelity
                audio gear, his mindset remains grounded:{" "}
                <strong className="text-white light:text-slate-900 font-semibold underline decoration-solar-500 decoration-2 underline-offset-4">
                  useful beats unnecessary
                </strong>
                .
              </p>
              <p>
                As an ICSE Class 10 student, Aryan balances his tech-forward passions with
                academic rigor—valuing conceptual clarity over superficial memorization in
                mathematics, biology, English literature, and economics.
              </p>
            </div>

            {/* Core Pillars with Staggered Cascading Animation */}
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <MotionCard
                    glowColor={pillar.glowColor}
                    className="p-5 border border-white/10 h-full"
                  >
                    <div className="mb-3">{pillar.icon}</div>
                    <h3 className="text-sm font-bold text-white light:text-slate-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-graphite-400 light:text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </MotionCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Quick Quote / Callout with Solar Border */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border-l-4 border-solar-500 light:bg-slate-100">
              <p className="text-xs sm:text-sm italic text-graphite-200 light:text-slate-700">
                &ldquo;I respect tools and technology that earn their place. Clean design isn&apos;t
                about adding flourishes—it is about stripping away whatever distracts from what matters.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
