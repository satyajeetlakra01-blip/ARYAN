"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_PHOTOS, PortfolioPhoto } from "@/data/portfolioData";
import LightboxModal from "./LightboxModal";
import {
  Sparkles,
  Maximize2,
  Camera,
  Layers,
  Palette,
  Wand2,
  Sliders,
  Flame,
  ArrowRight,
} from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { playUiClick } from "@/lib/sound";

export default function CreativeLab() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioPhoto | null>(null);

  const categories = [
    { label: "All Captures", value: "all" },
    { label: "Portraits", value: "portrait" },
    { label: "Nature & Setting", value: "nature" },
    { label: "Spontaneous", value: "moments" },
  ];

  const filteredPhotos = PORTFOLIO_PHOTOS.filter((photo) => {
    if (activeCategory === "all") return true;
    return photo.category === activeCategory;
  });

  const creativePillars = [
    {
      icon: <Camera className="w-5 h-5 text-solar-400" />,
      title: "Natural Composition",
      desc: "Framing human subjects naturally in authentic environments with honest light and realistic depth.",
    },
    {
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      title: "Tone & Color Science",
      desc: "Appreciating neutral balances, subtle contrast curves, and avoiding over-saturated or artificial filters.",
    },
    {
      icon: <Wand2 className="w-5 h-5 text-crimson-400" />,
      title: "Generative Experiments",
      desc: "Curious exploration into neural synthesis, prompt iteration, and modern computer vision algorithms.",
    },
    {
      icon: <Sliders className="w-5 h-5 text-acid-400" />,
      title: "Digital Refinement",
      desc: "Fine-tuning layout hierarchy, micro-typography, and purposeful image treatments that let the subject speak.",
    },
  ];

  return (
    <section id="creative" className="py-24 sm:py-32 relative bg-canvas-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
                04 / CREATIVE LAB &middot; GALLERY
              </span>
              <span className="h-px w-8 bg-solar-500/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
              Visual World &amp; Gallery
            </h2>
            <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-xl">
              Authentic visual moments and excursion perspectives featuring Aryan Tanty.
              Click any image to explore in high-resolution detail.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 light:bg-slate-100 p-1.5 rounded-2xl border border-white/10 light:border-slate-300 w-fit">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  playUiClick();
                  setActiveCategory(cat.value);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-solar-500 text-slate-950 font-bold shadow-md"
                    : "text-graphite-400 hover:text-white light:text-slate-600 light:hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dynamic Gallery Grid with Staggered Cascading Reveal */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPhotos.map((photo, index) => {
            const isWide = index === 0 || index === 5;
            return (
              <StaggerItem
                key={photo.id}
                className={isWide ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <div
                  onClick={() => {
                    playUiClick();
                    setSelectedPhoto(photo);
                  }}
                  data-cursor-text="ZOOM"
                  className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 light:border-slate-200 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-solar-500/50 hover:shadow-[0_0_30px_rgba(255,107,0,0.25)] h-full"
                >
                  {/* Photo container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-900">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                    {/* Top category badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-panel border border-white/15 text-[10px] font-mono text-white uppercase tracking-wider backdrop-blur-md">
                      {photo.category}
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5 text-solar-400" />
                    </div>

                    {/* Bottom caption details */}
                    <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-2xl glass-panel border border-white/15 backdrop-blur-md">
                      <div className="text-xs font-bold text-white tracking-wide truncate">
                        {photo.title}
                      </div>
                      <div className="text-[11px] text-graphite-300 truncate mt-0.5">
                        {photo.description}
                      </div>
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[9px] font-mono text-solar-400">
                        <span>{photo.originalFileName}</span>
                        <span className="text-white font-semibold">CLICK TO EXPAND</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Digital Creator & Creative Lab Focus */}
        <ScrollReveal direction="up" distance={30} className="p-5 sm:p-8 md:p-12 rounded-3xl glass-panel border border-white/10 light:border-slate-200">
          <div className="flex flex-col space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-solar-400 font-bold">
              CREATIVE LAB &middot; EXPERIMENTAL FOCUS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900">
              Always experimenting.
            </h3>
            <p className="text-sm sm:text-base text-graphite-400 light:text-slate-600 max-w-2xl">
              Aryan approaches creative work as an evolving sandbox—blending visual sensibility
              with emerging AI generation, color manipulation, and modern interface craft.
            </p>
          </div>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creativePillars.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-5 rounded-2xl bg-white/5 light:bg-slate-100/70 border border-white/5 light:border-slate-200 transition-all hover:border-solar-500/40 h-full">
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1">
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

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        photos={PORTFOLIO_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />
    </section>
  );
}
