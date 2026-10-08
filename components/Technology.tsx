"use client";

import { useState } from "react";
import { TECH_INTERESTS } from "@/data/portfolioData";
import {
  Cpu,
  Glasses,
  Laptop,
  Headphones,
  Sparkles,
  Workflow,
  ArrowUpRight,
  Flame,
  Activity,
} from "lucide-react";
import MotionCard from "./MotionCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { playUiClick, toggleAmbientPad, playWarpSound } from "@/lib/sound";

export default function Technology() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-6 h-6 text-solar-400" />,
    Glasses: <Glasses className="w-6 h-6 text-amber-400" />,
    Laptop: <Laptop className="w-6 h-6 text-orange-400" />,
    Headphones: <Headphones className="w-6 h-6 text-crimson-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-acid-400" />,
    Workflow: <Workflow className="w-6 h-6 text-emerald-400" />,
  };

  const filterOptions = [
    { label: "All Areas", value: "all" },
    { label: "AI & Intelligence", value: "ai-systems" },
    { label: "Hardware & Audio", value: "hardware" },
    { label: "Creative & Flow", value: "creative" },
  ];

  const filteredItems = TECH_INTERESTS.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai-systems") return item.id === "ai-systems";
    if (activeFilter === "hardware")
      return (
        item.id === "wearable-tech" ||
        item.id === "hardware-craft" ||
        item.id === "premium-audio"
      );
    if (activeFilter === "creative")
      return item.id === "creative-tools" || item.id === "productivity-systems";
    return true;
  });

  return (
    <section id="technology" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
                03 / TECHNOLOGY
              </span>
              <span className="h-px w-8 bg-solar-500/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
              Technology, without the noise.
            </h2>
            <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-xl">
              Exploring ecosystems that empower rather than distract. Clean hardware,
              emerging AI models, spatial acoustics, and high-focus digital tools.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 light:bg-slate-100 p-1.5 rounded-2xl border border-white/10 light:border-slate-300 w-fit">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  playUiClick();
                  setActiveFilter(opt.value);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeFilter === opt.value
                    ? "bg-solar-500 text-slate-950 font-bold shadow-md"
                    : "text-graphite-400 hover:text-white light:text-slate-600 light:hover:text-slate-900"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tech Grid with Staggered Cascading Animation */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((tech) => {
            const isAudio = tech.id === "premium-audio";
            return (
              <StaggerItem key={tech.id}>
                <MotionCard
                  glowColor={isAudio ? "crimson" : "solar"}
                  className="group p-6 sm:p-7 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Card Icon & Corner Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 light:bg-slate-100 light:border-slate-200 group-hover:scale-110 transition-transform">
                        {iconMap[tech.iconName]}
                      </div>
                      <span className="font-mono text-xs text-graphite-500 group-hover:text-solar-400 transition-colors">
                        {tech.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white light:text-slate-900 mb-2 group-hover:text-solar-400 transition-colors">
                      {tech.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-graphite-400 light:text-slate-600 leading-relaxed mb-6">
                      {tech.description}
                    </p>

                    {/* Audio Waveform Visualizer for Premium Audio Card */}
                    {isAudio && (
                      <button
                        onClick={() => {
                          playWarpSound();
                          toggleAmbientPad();
                        }}
                        data-cursor-text="PLAY AUDIO"
                        className="w-full mb-6 p-3 rounded-xl bg-rcb-500/15 border border-rcb-500/30 hover:border-rcb-500/60 flex items-center justify-between transition-all group/wave"
                        title="Click to toggle generative ambient sound"
                      >
                        <div className="flex items-center gap-1.5 h-6">
                          {[18, 12, 24, 8, 22, 16, 26, 14, 20, 10, 18, 24].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 bg-rcb-400 group-hover/wave:bg-solar-400 rounded-full animate-pulse"
                              style={{
                                height: `${h}px`,
                                animationDelay: `${i * 90}ms`,
                                animationDuration: "1.2s",
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-rcb-400 font-bold uppercase flex items-center gap-1">
                          <span>24-BIT SYNTH</span>
                          <span className="text-white text-[9px] bg-white/10 px-1.5 py-0.5 rounded">CLICK</span>
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Tag Pills */}
                  <div className="pt-4 border-t border-white/5 light:border-slate-200 flex flex-wrap gap-2">
                    {tech.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 text-[11px] font-mono text-graphite-300 light:text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
