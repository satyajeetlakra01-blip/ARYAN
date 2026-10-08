"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, X, CornerDownLeft, Sparkles, Trophy, Mail, Instagram, Radio, Cpu, RefreshCw } from "lucide-react";
import { playUiClick, playSuccessChime, toggleAmbientPad, playWarpSound } from "@/lib/sound";

interface HistoryItem {
  id: string;
  type: "input" | "output" | "error" | "success";
  text: string;
  badge?: string;
}

export default function AryanOSHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-1",
      type: "output",
      text: "ARYAN_OS v2.6.4 (Solar Kinetic Core) — SYSTEM READY",
      badge: "SYSTEM",
    },
    {
      id: "init-2",
      type: "output",
      text: "Type 'help' or click quick chips below to run cyber routines.",
      badge: "INFO",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Shortcut key ~ or ` to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
          playUiClick();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    playUiClick();

    // Add to input history
    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const newHistory: HistoryItem[] = [
      ...history,
      { id: Math.random().toString(), type: "input", text: `$ ${trimmed}` },
    ];

    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case "help":
        newHistory.push({
          id: Math.random().toString(),
          type: "output",
          text: "Available routines:\n  • profile  - Inspect Aryan's personal identity matrix\n  • insta    - Open verified Instagram (@_aryan085)\n  • email    - Copy vroaryan25@gmail.com to clipboard\n  • rcb      - Trigger Royal Challengers Bengaluru celebration confetti\n  • chase    - Run Virat Kohli Melbourne 82* pressure routine\n  • synth    - Toggle Web Audio generative Lo-Fi pad\n  • skills   - List digital creator & technical proficiencies\n  • photos   - Index all 10 untouched forest excursion captures\n  • clear    - Clear terminal stream\n  • exit     - Close terminal HUD",
          badge: "HELP",
        });
        break;

      case "profile":
        newHistory.push({
          id: Math.random().toString(),
          type: "output",
          text: "NAME: Aryan Tanty\nROLE: Student, Digital Creator & Tech Enthusiast\nACADEMICS: ICSE Class 10 Scholar\nLOCATION: Odisha, India [20.2961° N, 85.8245° E]\nPHILOSOPHY: 'Make it useful. Make it beautiful. Make it feel right.'\nPASSIONS: AI systems, Cricket (RCB/Kohli), Premium Audio, Excursion Photography",
          badge: "PROFILE",
        });
        break;

      case "insta":
      case "instagram":
        window.open("https://www.instagram.com/_aryan085/?__pwa=1", "_blank");
        playSuccessChime();
        newHistory.push({
          id: Math.random().toString(),
          type: "success",
          text: "REDIRECTING -> https://www.instagram.com/_aryan085/?__pwa=1 (@_aryan085)",
          badge: "INSTA",
        });
        break;

      case "email":
      case "contact":
        navigator.clipboard.writeText("vroaryan25@gmail.com");
        playSuccessChime();
        newHistory.push({
          id: Math.random().toString(),
          type: "success",
          text: "COPIED TO CLIPBOARD: vroaryan25@gmail.com [Direct Comms Channel]",
          badge: "COPIED",
        });
        break;

      case "rcb":
      case "celebrate":
        window.dispatchEvent(new CustomEvent("aryan:celebrate"));
        newHistory.push({
          id: Math.random().toString(),
          type: "success",
          text: "RCB CONFETTI & STADIUM PYRO FIRED! Play Bold. Ee Sala Cup Namde!",
          badge: "CHAMPION",
        });
        break;

      case "chase":
      case "kohli":
        window.dispatchEvent(new CustomEvent("aryan:celebrate"));
        newHistory.push({
          id: Math.random().toString(),
          type: "output",
          text: "SCENARIO: MCG 2022 // 28 needed off 8 balls.\n-> 18.5: Haris Rauf to Kohli — PUNCHED BACK OVER THE BOWLER'S HEAD FOR SIX!\n-> 18.6: Haris Rauf to Kohli — FLICKED OVER FINE LEG FOR SIX!\n-> 19.6: WIN BY 4 WICKETS! Virat Kohli 82*(53). Mental fortitude at 100%.",
          badge: "CLUTCH",
        });
        break;

      case "synth":
      case "music":
      case "audio":
        const active = toggleAmbientPad();
        playWarpSound();
        newHistory.push({
          id: Math.random().toString(),
          type: "output",
          text: active
            ? "WEB AUDIO GENERATIVE PAD: ONLINE [Dmaj7 warm chord shimmer]"
            : "WEB AUDIO GENERATIVE PAD: MUTED",
          badge: "SYNTH",
        });
        break;

      case "skills":
        newHistory.push({
          id: Math.random().toString(),
          type: "output",
          text: "CORE COMPETENCIES:\n  [██████████] 98% Digital Tooling & AI Workflows\n  [██████████] 95% Visual Editing & Excursion Color Grading\n  [█████████░] 92% ICSE Class 10 STEM & Analytical Logic\n  [█████████░] 90% Modern Hardware, Wearables & High-Res Audio",
          badge: "CAPABILITY",
        });
        break;

      case "photos":
        newHistory.push({
          id: Math.random().toString(),
          type: "output",
          text: "RAW EXCURSION ASSETS [0% Cutouts // 100% Forest Lighting]:\n  1. aryan-hero.jpg (Standing Portrait, 3072x4096)\n  2. aryan-sitting-rock-focused.jpg (Boulder Meditation)\n  3. aryan-stream-log-poised.jpg (River Stream Log)\n  4. aryan-stream-crossing.jpg (River Traverse)\n  5. aryan-stream-looking-away.jpg (Valley Overlook)\n  6. aryan-portrait-standing.jpg (Uniform Stand)\n  7. aryan-stream-profile.jpg (Stream Silhouette)\n  8. aryan-rock-stride.jpg (Trail Navigation)\n  9. aryan-boulder-stride.jpg (Ascent)\n  10. aryan-forest-profile.jpg (Canopy Gaze)",
          badge: "VAULT",
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "close":
        setIsOpen(false);
        setInput("");
        return;

      default:
        newHistory.push({
          id: Math.random().toString(),
          type: "error",
          text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`,
          badge: "ERR",
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <>
      {/* Floating HUD Launcher Pill in Bottom Right */}
      <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 z-40">
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            playUiClick();
          }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 shadow-2xl backdrop-blur-xl border ${
            isOpen
              ? "bg-solar-500 text-black border-solar-400 shadow-[0_0_20px_rgba(255,107,0,0.5)]"
              : "bg-canvas-900/90 light:bg-white/90 text-white light:text-slate-900 border-white/10 light:border-slate-300 hover:border-solar-500/50 hover:text-solar-400"
          }`}
          data-cursor-text={isOpen ? "CLOSE" : "TERMINAL"}
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-solar-400" />
          <span>AryanOS</span>
          <span className="hidden sm:inline">v2.6</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-graphite-300">
            ~
          </span>
        </button>
      </div>

      {/* Terminal Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-canvas-950/95 border border-solar-500/30 rounded-2xl shadow-[0_0_50px_rgba(255,107,0,0.2)] overflow-hidden flex flex-col h-[85vh] max-h-[520px] font-mono">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-canvas-900/90 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rcb-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-solar-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-acid-500/80 inline-block" />
                <span className="ml-3 text-xs text-graphite-300 font-semibold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-solar-400" />
                  aryan-tanty@solar-core:~
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  playUiClick();
                }}
                className="text-graphite-400 hover:text-white p-1 rounded transition-colors"
                title="Close Terminal (~)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-2 text-xs leading-relaxed select-text"
            >
              {history.map((item) => (
                <div key={item.id} className="whitespace-pre-wrap">
                  {item.type === "input" ? (
                    <div className="text-solar-400 font-semibold">{item.text}</div>
                  ) : item.type === "error" ? (
                    <div className="text-rcb-400">
                      {item.badge && (
                        <span className="mr-2 px-1.5 py-0.5 rounded bg-rcb-500/20 text-rcb-400 text-[10px]">
                          [{item.badge}]
                        </span>
                      )}
                      {item.text}
                    </div>
                  ) : item.type === "success" ? (
                    <div className="text-acid-400">
                      {item.badge && (
                        <span className="mr-2 px-1.5 py-0.5 rounded bg-acid-500/20 text-acid-400 text-[10px]">
                          [{item.badge}]
                        </span>
                      )}
                      {item.text}
                    </div>
                  ) : (
                    <div className="text-graphite-200">
                      {item.badge && (
                        <span className="mr-2 px-1.5 py-0.5 rounded bg-white/10 text-solar-400 text-[10px]">
                          [{item.badge}]
                        </span>
                      )}
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Interactive Chips */}
            <div className="px-4 py-2 bg-canvas-900/60 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
              <span className="text-graphite-500 text-[10px] mr-1 uppercase tracking-wider">Quick:</span>
              <button
                onClick={() => executeCommand("profile")}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-solar-500/20 hover:text-solar-400 text-graphite-300 transition-colors whitespace-nowrap"
              >
                profile
              </button>
              <button
                onClick={() => executeCommand("rcb")}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-rcb-500/20 hover:text-rcb-400 text-graphite-300 transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <Trophy className="w-3 h-3 text-rcb-400" /> rcb
              </button>
              <button
                onClick={() => executeCommand("email")}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-solar-500/20 hover:text-solar-400 text-graphite-300 transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> email
              </button>
              <button
                onClick={() => executeCommand("insta")}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-solar-500/20 hover:text-solar-400 text-graphite-300 transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <Instagram className="w-3 h-3" /> insta
              </button>
              <button
                onClick={() => executeCommand("synth")}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-acid-500/20 hover:text-acid-400 text-graphite-300 transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <Radio className="w-3 h-3 text-acid-400" /> synth
              </button>
              <button
                onClick={() => executeCommand("help")}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-solar-500/20 hover:text-solar-400 text-graphite-300 transition-colors whitespace-nowrap"
              >
                help
              </button>
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 px-4 py-3 bg-canvas-900 border-t border-white/10">
              <span className="text-solar-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type routine (e.g. 'help', 'rcb', 'profile', 'email')..."
                className="flex-grow bg-transparent text-white text-xs outline-none placeholder:text-graphite-600"
              />
              <button
                onClick={() => executeCommand(input)}
                className="p-1 text-graphite-400 hover:text-solar-400 transition-colors"
                title="Execute"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
