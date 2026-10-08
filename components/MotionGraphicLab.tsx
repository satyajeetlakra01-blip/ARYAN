"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Sliders,
  Camera,
  Maximize2,
  Atom,
  Cpu,
  Trophy,
  Instagram,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import ScrambleText from "./ScrambleText";
import { playWarpSound, playUiClick } from "@/lib/sound";

interface CinemaStyle {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  photoSrc: string;
  themeColor: "solar" | "crimson" | "acid";
  headline: string;
  subtext: string;
  tags: string[];
}

export default function MotionGraphicLab() {
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(true);
  const [filterMood, setFilterMood] = useState<"natural" | "vibrant" | "monochrome">("natural");

  const styles: CinemaStyle[] = [
    {
      id: "solar-kinetic",
      name: "Solar Flare Cinematic",
      subtitle: "Dynamic solar ambient aura & cyber aperture geometry",
      badge: "STYLE 01 // SOLAR",
      photoSrc: "/images/optimized/aryan-hero.webp",
      themeColor: "solar",
      headline: "THE DIGITAL CREATOR",
      subtext: "Exploring high-performance tech, modern creative tools, and clean visual execution in natural light.",
      tags: ["NATURAL LIGHT", "SOLAR AURA", "RAW SENSOR", "PRECISION"],
    },
    {
      id: "rcb-arena",
      name: "RCB Crimson Stadium",
      subtitle: "Royal Challengers Bengaluru red & gold stadium pulse",
      badge: "STYLE 02 // VIRAT 18",
      photoSrc: "/images/optimized/aryan-sitting-rock-focused.webp",
      themeColor: "crimson",
      headline: "CHASING THE IMPOSSIBLE",
      subtext: "Inspired by Virat Kohli's relentless chase discipline, fitness standards, and composure under pressure.",
      tags: ["RCB CRIMSON", "KOHLI 18", "PRESSURE COMPOSURE", "BELIEF"],
    },
    {
      id: "acid-editorial",
      name: "Acid Cyber Editorial",
      subtitle: "High-contrast typography & academic telemetry",
      badge: "STYLE 03 // ACADEMIC",
      photoSrc: "/images/optimized/aryan-portrait-standing.webp",
      themeColor: "acid",
      headline: "ICSE CLASS 10 RIGOR",
      subtext: "First-principles mastery across mathematics, biology, English literature, and economic systems.",
      tags: ["CONCEPTUAL DEPTH", "SYSTEM DISCIPLINE", "INDIA CURRICULUM"],
    },
    {
      id: "stream-balance",
      name: "River Flow Balance",
      subtitle: "Poised stream log excursion with ambient depth lighting",
      badge: "STYLE 04 // BALANCE",
      photoSrc: "/images/optimized/aryan-stream-log-poised.webp",
      themeColor: "solar",
      headline: "NATURE & MACHINE",
      subtext: "Balancing intense screen deep-work sessions with grounding, authentic outdoor excursions.",
      tags: ["FOREST STREAM", "REAL OPTICS", "BALANCED LIFESTYLE"],
    },
  ];

  const current = styles[activeStyleIndex];

  return (
    <section id="motion-lab" className="py-24 sm:py-32 relative bg-canvas-950 overflow-hidden border-t border-white/10">
      {/* Dynamic Ambient Background Glow */}
      <div
        aria-hidden="true"
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          current.themeColor === "crimson"
            ? "bg-crimson-500/20"
            : current.themeColor === "acid"
            ? "bg-acid-400/15"
            : "bg-solar-500/20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
                FEATURED &middot; MOTION GRAPHIC STUDIO
              </span>
              <span className="h-px w-8 bg-solar-500/40" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
              Interactive Visual Lab
            </h2>
            <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-xl">
              Cinematic motion graphic perspectives featuring Aryan Tanty.
              Real camera captures framed with interactive telemetry, atmospheric lighting, and kinetic HUDs.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white/5 light:bg-slate-100 p-2 rounded-2xl border border-white/10 light:border-slate-300">
            {/* HUD Toggle */}
            <button
              onClick={() => setShowHUD(!showHUD)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                showHUD
                  ? "bg-solar-500 text-black font-bold shadow-md"
                  : "bg-white/10 text-graphite-300 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>HUD: {showHUD ? "ON" : "OFF"}</span>
            </button>

            {/* Filter Mood Selector */}
            <button
              onClick={() => {
                playUiClick();
                if (filterMood === "natural") setFilterMood("vibrant");
                else if (filterMood === "vibrant") setFilterMood("monochrome");
                else setFilterMood("natural");
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-1.5"
              data-cursor-text="COLOR"
            >
              <Sliders className="w-3.5 h-3.5 text-solar-400" />
              <span>GRADE: {filterMood.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Style Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {styles.map((style, idx) => {
            const isActive = activeStyleIndex === idx;
            return (
              <button
                key={style.id}
                onClick={() => {
                  playWarpSound();
                  setActiveStyleIndex(idx);
                }}
                data-cursor-text="PRESET"
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isActive
                    ? "bg-white/10 light:bg-slate-200 border-solar-500/50 shadow-lg"
                    : "glass-panel border-white/5 hover:border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-solar-400 font-bold uppercase">
                    {style.badge}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-solar-500 animate-pulse" />}
                </div>
                <div className="text-sm font-bold text-white light:text-slate-900 truncate">
                  {style.name}
                </div>
                <div className="text-[11px] text-graphite-400 truncate mt-0.5">
                  {style.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* The Motion Graphic Poster Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-canvas-900/90 rounded-3xl p-4 sm:p-6 md:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Ambient poster bloom */}
          <div
            aria-hidden="true"
            className={`absolute -inset-10 blur-3xl opacity-30 pointer-events-none transition-colors duration-700 ${
              current.themeColor === "crimson"
                ? "bg-gradient-to-r from-red-600 to-amber-600"
                : current.themeColor === "acid"
                ? "bg-gradient-to-r from-lime-600 to-teal-600"
                : "bg-gradient-to-r from-solar-500 to-crimson-500"
            }`}
          />

          {/* Left Canvas Column: Authentic High-Resolution Photo in Cinematic Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 bg-[#090b10] shadow-2xl group">
              {/* The Real Environmental Photo */}
              <Image
                src={current.photoSrc}
                alt={current.name}
                fill
                sizes="450px"
                className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                  filterMood === "vibrant"
                    ? "contrast-110 saturate-125"
                    : filterMood === "monochrome"
                    ? "grayscale contrast-125"
                    : ""
                }`}
              />

              {/* Natural Vignette & Contrast Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Subtle Cyber Radar Reticle in Background */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none"
              >
                <div className="w-[340px] h-[340px] rounded-full border border-dashed border-white/40 animate-spin-slow" />
              </div>

              {/* Corner Crosshairs */}
              <div className="absolute top-4 left-4 text-solar-400 font-mono text-xs select-none pointer-events-none">
                +
              </div>
              <div className="absolute top-4 right-4 text-solar-400 font-mono text-xs select-none pointer-events-none">
                +
              </div>
              <div className="absolute bottom-4 left-4 text-solar-400 font-mono text-xs select-none pointer-events-none">
                +
              </div>
              <div className="absolute bottom-4 right-4 text-solar-400 font-mono text-xs select-none pointer-events-none">
                +
              </div>

              {/* HUD Elements */}
              {showHUD && (
                <>
                  <div className="absolute top-4 left-6 z-20 px-3 py-1.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-2 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{current.badge}</span>
                  </div>

                  <div className="absolute top-4 right-6 z-20 px-3 py-1.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-mono text-solar-400 flex items-center gap-1.5 shadow-lg">
                    <Atom className="w-3.5 h-3.5 text-solar-400 animate-spin-slow" />
                    <span>60 FPS CINEMATIC</span>
                  </div>

                  <div className="absolute bottom-5 inset-x-5 z-20 p-3.5 rounded-2xl glass-panel border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white tracking-wide">
                          Aryan Tanty
                        </div>
                        <div className="text-[10px] font-mono text-solar-400">
                          Excursion Trail &middot; 3072&times;4096
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          ORIGINAL OPTICS
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Canvas Column: Editorial Breakdown & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-solar-400 font-bold">
                {current.badge}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                <ScrambleText text={current.headline} />
              </h3>
              <p className="text-sm sm:text-base text-graphite-300 leading-relaxed pt-1">
                {current.subtext}
              </p>
            </div>

            {/* Poster Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono font-medium text-white"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Technical Telemetry Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-graphite-400">
                <span>SUBJECT IDENTIFIER:</span>
                <span className="text-white font-semibold">ARYAN TANTY</span>
              </div>
              <div className="flex items-center justify-between text-graphite-400">
                <span>OFFICIAL INSTAGRAM:</span>
                <Link
                  href="https://www.instagram.com/_aryan085/?__pwa=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>@_aryan085</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="flex items-center justify-between text-graphite-400">
                <span>IMAGE INTEGRITY:</span>
                <span className="text-emerald-400 font-semibold">100% UNTOUCHED NATURAL PHOTO</span>
              </div>
              <div className="flex items-center justify-between text-graphite-400">
                <span>ENVIRONMENT:</span>
                <span className="text-white">FOREST RIVER STREAM EXCURSION</span>
              </div>
            </div>

            {/* Quote on Motion Design Integrity */}
            <div className="p-4 rounded-xl border-l-2 border-solar-500 bg-white/5 text-xs text-graphite-300 italic">
              &ldquo;No artificial cutout tricks. True motion graphic design elevates the real subject
              with precision typography, interactive telemetry, and dynamic lighting.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
