"use client";

import Link from "next/link";
import { Instagram, ArrowUpRight, Flame, Sparkles } from "lucide-react";
import MotionCard from "./MotionCard";
import ScrambleText from "./ScrambleText";
import { playUiClick } from "@/lib/sound";

export default function InstagramCard() {
  const instaUrl = "https://www.instagram.com/_aryan085/?__pwa=1";

  return (
    <div className="py-8 sm:py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <MotionCard glowColor="crimson" className="p-5 sm:p-8 md:p-10 border border-white/15 bg-gradient-to-r from-canvas-900 via-[#180d12] to-canvas-900">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          {/* Left info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 shadow-xl shadow-rose-500/20 shrink-0 flex items-center justify-center group hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[22px] bg-canvas-950 flex items-center justify-center">
                <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                  OFFICIAL INSTAGRAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <ScrambleText text="@_aryan085" />
              </h3>
              <p className="text-xs sm:text-sm text-graphite-400 max-w-md">
                Follow Aryan on Instagram for visual stories, technology moments, creative experiments, and everyday highlights.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <div className="text-left sm:text-right hidden sm:block">
              <div className="text-xs font-mono text-white font-bold">
                183 Followers
              </div>
              <div className="text-[10px] font-mono text-graphite-400">
                Active Creator Channel
              </div>
            </div>

            <Link
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUiClick()}
              data-cursor-text="FOLLOW"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white hover:brightness-110 transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-95"
            >
              <span>Follow @_aryan085</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
