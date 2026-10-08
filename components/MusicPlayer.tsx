"use client";

import { useState, useEffect, useRef } from "react";
import { Music2, Volume2, VolumeX, Pause, Play, Sliders } from "lucide-react";
import {
  startMusic,
  stopMusic,
  isMusicPlaying,
  setMusicVolume,
} from "@/lib/music";
import { playUiClick } from "@/lib/sound";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [showVol, setShowVol] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(10).fill(4));
  const volRef = useRef<HTMLDivElement | null>(null);

  // Animate eq bars while playing
  useEffect(() => {
    if (!playing) {
      setBars(Array(10).fill(4));
      return;
    }
    const id = setInterval(() => {
      setBars((prev) => prev.map(() => Math.round(8 + Math.random() * 22)));
    }, 120);
    return () => clearInterval(id);
  }, [playing]);

  // Click outside to close vol panel
  useEffect(() => {
    const onClickOut = (e: MouseEvent) => {
      if (volRef.current && !volRef.current.contains(e.target as Node)) {
        setShowVol(false);
      }
    };
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, []);

  const handlePlayPause = () => {
    playUiClick();
    if (playing) {
      stopMusic();
      setPlaying(false);
    } else {
      startMusic();
      setPlaying(true);
    }
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    setMusicVolume(v);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center max-w-[calc(100vw-24px)]">
      {/* Glassmorphic Floating Music Player Pill */}
      <div className="relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 bg-canvas-900/95 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50">
        {/* Now Playing Label */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <Music2 className="w-3.5 h-3.5 text-solar-400" />
          <span className="text-[10px] font-mono text-graphite-400 tracking-wider">
            {playing ? "NOW PLAYING" : "ARYAN — SOLAR SCORE"}
          </span>
        </div>

        {/* Eq Visualizer Bars */}
        <div className="flex items-end gap-0.5 h-5 shrink-0">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`w-0.5 rounded-full transition-all ${playing ? "bg-solar-400" : "bg-white/20"}`}
              style={{
                height: `${h}px`,
                transitionDuration: "120ms",
              }}
            />
          ))}
        </div>

        {/* Song Info */}
        {playing && (
          <div className="hidden md:block text-[10px] font-mono text-white/70 max-w-[120px] truncate shrink-0">
            Solar Cinematic Loop
          </div>
        )}

        {/* Play / Pause */}
        <button
          onClick={handlePlayPause}
          data-cursor-text={playing ? "PAUSE" : "PLAY"}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-black font-bold transition-all shrink-0 ${
            playing
              ? "bg-solar-500 shadow-[0_0_20px_rgba(255,107,0,0.8)]"
              : "bg-white/20 hover:bg-solar-500 hover:text-black hover:shadow-[0_0_15px_rgba(255,107,0,0.6)]"
          }`}
        >
          {playing ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>

        {/* Volume Control */}
        <div ref={volRef} className="relative shrink-0">
          <button
            onClick={() => {
              playUiClick();
              setShowVol((p) => !p);
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-graphite-400 hover:text-solar-400 transition-colors"
            title="Volume"
          >
            {volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {showVol && (
            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 bg-canvas-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col items-center gap-2 w-10">
              <Sliders className="w-3 h-3 text-solar-400" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => handleVolume(parseFloat(e.target.value))}
                className="h-20 appearance-none cursor-pointer accent-solar-500"
                style={{ writingMode: "vertical-lr", direction: "rtl" }}
              />
              <span className="text-[9px] font-mono text-graphite-400">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
