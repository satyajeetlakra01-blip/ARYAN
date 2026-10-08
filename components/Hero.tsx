"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Sparkles,
  Flame,
  Camera,
  Compass,
  Instagram,
  ArrowUpRight,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import ScrambleText from "./ScrambleText";
import ScrollReveal from "./ScrollReveal";
import { playSuccessChime, playUiClick } from "@/lib/sound";

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const instaUrl = "https://www.instagram.com/_aryan085/?__pwa=1";
  const email = "vroaryan25@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    playSuccessChime();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden bg-subtle-grid"
    >
      {/* Ambient Radial Gradient Flares */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-solar-500/25 via-crimson-500/20 to-transparent rounded-full blur-[140px] -z-10 animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] bg-solar-500/15 rounded-full blur-[130px] -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Kinetic Editorial Typography & CTAs */}
          <ScrollReveal direction="up" distance={30} duration={0.8} className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow Label with Kinetic Solar Pulse & Instagram Tag & Email */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 light:border-slate-300 light:bg-slate-100/90 w-fit backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-solar-500 shadow-[0_0_12px_rgba(255,107,0,1)] animate-ping" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-solar-400 light:text-solar-600 font-bold">
                  <ScrambleText text="ARYAN TANTY" />
                </span>
                <span className="text-graphite-500 text-xs">/</span>
                <span className="text-[11px] font-mono text-acid-400 light:text-slate-700 font-semibold">
                  2026 OFFICIAL
                </span>
              </div>

              {/* Instagram Quick Link Pill */}
              <Link
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="INSTA"
                onClick={() => playUiClick()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:text-white hover:bg-rose-500/30 transition-all text-[11px] font-mono font-medium backdrop-blur-md group"
              >
                <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>@_aryan085</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              {/* Email 1-Click Copy Pill */}
              <button
                onClick={handleCopyEmail}
                data-cursor-text="COPY"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-graphite-300 hover:text-white hover:border-solar-500/40 transition-all text-[11px] font-mono backdrop-blur-md"
                title="Copy vroaryan25@gmail.com"
              >
                <Mail className="w-3 h-3 text-solar-400" />
                <span>{copiedEmail ? "COPIED EMAIL!" : "vroaryan25@gmail.com"}</span>
                {copiedEmail ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-graphite-500" />
                )}
              </button>
            </div>

            {/* Main Kinetic Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white light:text-slate-900">
                Curious by nature. <br />
                <span className="solar-gradient-text">
                  <ScrambleText text="Precise by choice." />
                </span>
              </h1>
            </div>

            {/* Subheadline & Bio */}
            <div className="space-y-4 max-w-xl">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm md:text-base font-mono text-graphite-300 light:text-slate-700">
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white light:text-slate-900 font-semibold">
                  [ STUDENT ]
                </span>
                <span className="text-solar-500">&bull;</span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white light:text-slate-900 font-semibold">
                  [ DIGITAL CREATOR ]
                </span>
                <span className="text-solar-500">&bull;</span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white light:text-slate-900 font-semibold">
                  [ TECH ENTHUSIAST ]
                </span>
              </div>
              <p className="text-sm sm:text-base text-graphite-400 light:text-slate-600 leading-relaxed">
                Exploring high-performance technology, creative digital tooling, structured ICSE Class 10 academics,
                and clean everyday execution. Built with intent, refined through curiosity.
              </p>
            </div>

            {/* CTAs with Solar / Crimson Kinetic Energy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="#creative"
                onClick={() => playUiClick()}
                data-cursor-text="GALLERY"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-solar-500 to-crimson-500 text-white hover:brightness-110 transition-all duration-200 shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_40px_rgba(255,42,77,0.55)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <span>Explore Visual World</span>
                <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>

              <Link
                href="#about"
                onClick={() => playUiClick()}
                data-cursor-text="MINDSET"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-white/15 light:border-slate-300 bg-white/5 light:bg-slate-100 text-white light:text-slate-800 hover:border-solar-500/50 hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <span>Discover Mindset</span>
                <ArrowDown className="w-4 h-4 text-solar-400" />
              </Link>
            </div>

            {/* Quick Metadata Telemetry Bar */}
            <div className="pt-6 border-t border-white/10 light:border-slate-200 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-solar-400 font-bold">
                  Academics
                </div>
                <div className="text-xs sm:text-sm font-medium text-white light:text-slate-900 mt-0.5">
                  ICSE Class 10
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-solar-400 font-bold">
                  Focus
                </div>
                <div className="text-xs sm:text-sm font-medium text-white light:text-slate-900 mt-0.5">
                  AI, Audio &amp; Hardware
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-crimson-400 font-bold">
                  Loyalty
                </div>
                <div className="text-xs sm:text-sm font-medium text-white light:text-slate-900 mt-0.5 flex items-center gap-1">
                  <span>RCB &bull; VK 18</span>
                  <Flame className="w-3.5 h-3.5 text-crimson-400 fill-crimson-400" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Authentic High-Resolution Portrait with Cinematic Motion Framing */}
          <ScrollReveal direction="up" distance={40} delay={0.15} duration={0.85} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer Radiant Glow Halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 bg-gradient-to-tr from-solar-500/30 via-crimson-500/25 to-solar-400/20 rounded-[2.5rem] blur-2xl opacity-80 transition duration-700 animate-pulse-glow"
              />

              {/* Rotating Cyber Aperture Ring Behind Card */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 flex items-center justify-center opacity-30 pointer-events-none"
              >
                <div className="w-[420px] h-[420px] rounded-full border border-dashed border-solar-400/60 animate-spin-slow" />
              </div>

              {/* Main Cinematic Card Frame */}
              <div className="relative rounded-[2.2rem] overflow-hidden border border-white/20 light:border-slate-300 bg-canvas-900 light:bg-white shadow-2xl p-2.5 sm:p-3 transition-transform duration-500 hover:scale-[1.01]">
                {/* Top Telemetry Header */}
                <div className="flex items-center justify-between mb-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-300 light:text-slate-700 font-bold">
                      AUTHENTIC CREATOR
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-solar-400 font-semibold">
                    ROYAL ENFIELD &middot; S24 ULTRA
                  </span>
                </div>

                {/* Viewport: Pristine Authentic Photo of Aryan */}
                <div className="relative aspect-[3/4] w-full rounded-[1.8rem] overflow-hidden bg-canvas-950">
                  <Image
                    src="/images/aryan-bike-portrait.webp"
                    alt="Aryan Tanty on his Royal Enfield motorcycle with an authentic smile"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                  />

                  {/* Editorial Gradient & Natural Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Corner Crosshairs for Motion Graphic Styling */}
                  <div className="absolute top-4 left-4 text-solar-400/80 font-mono text-xs select-none pointer-events-none">
                    +
                  </div>
                  <div className="absolute top-4 right-4 text-solar-400/80 font-mono text-xs select-none pointer-events-none">
                    +
                  </div>
                  <div className="absolute bottom-20 left-4 text-solar-400/80 font-mono text-xs select-none pointer-events-none">
                    +
                  </div>
                  <div className="absolute bottom-20 right-4 text-solar-400/80 font-mono text-xs select-none pointer-events-none">
                    +
                  </div>

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-6 px-3 py-1 rounded-full glass-panel border border-white/15 text-[10px] font-mono text-white/95 flex items-center gap-1.5 backdrop-blur-md shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AUTHENTIC IDENTITY</span>
                  </div>

                  {/* Bottom Image Info Bar */}
                  <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-2xl glass-panel border border-white/15 backdrop-blur-md z-10 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white tracking-wide">
                          Aryan Tanty
                        </div>
                        <div className="text-[10px] font-mono text-solar-400 mt-0.5">
                          River Stream &middot; Natural Daylight
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] font-mono text-graphite-400">
                          VERIFIED CREATOR
                        </div>
                        <div className="text-[11px] font-mono text-emerald-400 font-bold">
                          100% AUTHENTIC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
