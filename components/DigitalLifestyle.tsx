"use client";

import Image from "next/image";
import { DIGITAL_LIFESTYLE_ITEMS } from "@/data/portfolioData";
import {
  Monitor,
  Headphones,
  Cloud,
  Sparkles,
  Layers,
  Shield,
  Smartphone,
  Sliders,
  Flame,
} from "lucide-react";
import MotionCard from "./MotionCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function DigitalLifestyle() {
  const habits = [
    "Clean desktop, zero random files on workspace",
    "Curated notifications: alerts only for what matters",
    "High-fidelity acoustics during intensive deep-work sessions",
    "Cross-device sync for notes, readings, and image experiments",
    "Continuous hardware hygiene and deliberate cable discipline",
  ];

  return (
    <section id="lifestyle" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
              07 / LIFESTYLE &middot; ENVIRONMENT
            </span>
            <span className="h-px w-8 bg-solar-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
            A curated digital life.
          </h2>
          <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-2xl">
            Technology is most powerful when it remains invisible and purposeful.
            Aryan values intentional setups over mindless gadget accumulation.
          </p>
        </ScrollReveal>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Image Context with Natural River Log Photo */}
          <ScrollReveal direction="left" distance={40} className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/20 light:border-slate-200 p-2.5 shadow-2xl">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#111622] to-[#080a0f]">
                {/* Radial forest bloom */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-radial from-solar-500/20 via-transparent to-transparent blur-2xl"
                />

                {/* Real Environmental Photo */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src="/images/optimized/aryan-stream-log-poised.webp"
                    alt="Aryan standing poised on a natural river log in the forest"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

                <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl glass-panel border border-white/15 backdrop-blur-md z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        Balance &middot; Screen to Nature
                      </div>
                      <div className="text-[10px] font-mono text-solar-400">
                        Forest Excursion &middot; River Log Poise
                      </div>
                    </div>
                    <Sliders className="w-4 h-4 text-solar-400" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Setup Tenets with Staggered Cascading Animation */}
          <ScrollReveal direction="right" distance={40} className="lg:col-span-7 space-y-6">
            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIGITAL_LIFESTYLE_ITEMS.map((item, idx) => (
                <StaggerItem key={item.title}>
                  <MotionCard
                    glowColor={idx === 1 ? "crimson" : "solar"}
                    className="p-5 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-solar-400 uppercase mb-1 font-bold">
                        // {item.category}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-graphite-400 light:text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </MotionCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Daily Digital Disciplines */}
            <div className="p-6 rounded-3xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-solar-400 light:text-slate-700 mb-4 font-mono flex items-center gap-2">
                <Flame className="w-4 h-4 text-solar-500" />
                <span>Digital Rituals &amp; Standards</span>
              </h3>
              <ul className="space-y-2.5">
                {habits.map((habit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-xs sm:text-sm text-graphite-300 light:text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-solar-500 shrink-0" />
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
