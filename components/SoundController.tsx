"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Radio, Sparkles } from "lucide-react";
import {
  isSoundMuted,
  setSoundMuted,
  playUiClick,
  toggleAmbientPad,
  isAmbientPadActive,
} from "@/lib/sound";

export default function SoundController() {
  const [muted, setMuted] = useState(false);
  const [ambientActive, setAmbientActive] = useState(false);

  useEffect(() => {
    setMuted(isSoundMuted());
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (nextMuted && ambientActive) {
      setAmbientActive(false);
    } else if (!nextMuted) {
      playUiClick();
    }
  };

  const handleToggleAmbient = () => {
    if (muted) {
      setMuted(false);
      setSoundMuted(false);
    }
    const active = toggleAmbientPad();
    setAmbientActive(active);
    playUiClick();
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-2 sm:left-4 z-40 flex items-center gap-2">
      {/* Sound Pill HUD */}
      <div className="relative flex items-center bg-canvas-900/90 light:bg-white/90 backdrop-blur-xl border border-white/10 light:border-slate-300 rounded-full p-1.5 shadow-2xl transition-all duration-300 hover:border-solar-500/40">
        {/* Master Mute / Unmute Button */}
        <button
          onClick={handleToggleMute}
          title={muted ? "Unmute Audio FX" : "Mute Audio FX"}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
            muted
              ? "text-graphite-400 hover:text-white bg-white/5"
              : "text-solar-400 bg-solar-500/10 border border-solar-500/20"
          }`}
          data-cursor-text={muted ? "UNMUTE" : "MUTE"}
        >
          {muted ? (
            <VolumeX className="w-3.5 h-3.5 text-graphite-400" />
          ) : (
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-solar-400" />
              {/* Mini Animated Audio Equalizer Bars */}
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-solar-400 rounded-full animate-[pulse_0.7s_infinite_ease-in-out]" />
                <span className="w-0.5 h-2 bg-solar-400 rounded-full animate-[pulse_1.1s_infinite_ease-in-out_0.2s]" />
                <span className="w-0.5 h-3.5 bg-solar-400 rounded-full animate-[pulse_0.8s_infinite_ease-in-out_0.4s]" />
                <span className="w-0.5 h-1.5 bg-solar-400 rounded-full animate-[pulse_0.9s_infinite_ease-in-out_0.1s]" />
              </div>
            </div>
          )}
          <span className="hidden sm:inline">
            {muted ? "SFX: OFF" : "SFX: ON"}
          </span>
        </button>

        {/* Ambient Synthesizer Pad Button */}
        <button
          onClick={handleToggleAmbient}
          title={ambientActive ? "Pause Generative Ambient Pad" : "Play Lo-Fi Cyber Drone Pad"}
          className={`flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
            ambientActive
              ? "text-rcb-400 bg-rcb-500/15 border border-rcb-500/30 shadow-[0_0_12px_rgba(255,42,77,0.3)] animate-pulse"
              : "text-graphite-400 hover:text-white hover:bg-white/5"
          }`}
          data-cursor-text={ambientActive ? "STOP PAD" : "PLAY PAD"}
        >
          <Radio className={`w-3.5 h-3.5 ${ambientActive ? "text-rcb-400" : ""}`} />
          <span className="hidden sm:inline">
            {ambientActive ? "PAD: PLAYING" : "CYBER PAD"}
          </span>
        </button>
      </div>
    </div>
  );
}
