"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Compass,
  User,
  Sparkles,
  Cpu,
  Camera,
  GraduationCap,
  Trophy,
  Sliders,
  Send,
  Sun,
  Copy,
  Check,
  X,
  CornerDownLeft,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Action";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1200);
    }
  };

  const toggleTheme = () => {
    setIsOpen(false);
    const currentTheme = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("aryan_portfolio_theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  const commands: CommandItem[] = [
    {
      id: "home",
      title: "Hero / Introduction",
      subtitle: "Return to the top of the portfolio",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-electric-cyan" />,
      action: () => scrollTo("hero"),
    },
    {
      id: "about",
      title: "About Aryan",
      subtitle: "Personal profile, mindset, and background",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-sky-400" />,
      action: () => scrollTo("about"),
    },
    {
      id: "philosophy",
      title: "Personal Philosophy",
      subtitle: "Utility, beauty, and authentic restraint",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo("philosophy"),
    },
    {
      id: "technology",
      title: "Technology Focus",
      subtitle: "AI, hardware, wearables, audio & systems",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => scrollTo("technology"),
    },
    {
      id: "motion-lab",
      title: "3D Motion Graphic Studio",
      subtitle: "Interactive cutouts, HUD telemetry & poster presets",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-solar-400" />,
      action: () => scrollTo("motion-lab"),
    },
    {
      id: "creative",
      title: "Creative Lab & Gallery",
      subtitle: "High-resolution photos and visual captures",
      category: "Navigation",
      icon: <Camera className="w-4 h-4 text-amber-400" />,
      action: () => scrollTo("creative"),
    },
    {
      id: "academics",
      title: "Academic Focus (ICSE 10)",
      subtitle: "Mathematics, Biology, Literature & Economics",
      category: "Navigation",
      icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
      action: () => scrollTo("academics"),
    },
    {
      id: "cricket",
      title: "Cricket & RCB",
      subtitle: "Inspiration from Virat Kohli and the sport",
      category: "Navigation",
      icon: <Trophy className="w-4 h-4 text-rose-400" />,
      action: () => scrollTo("cricket"),
    },
    {
      id: "lifestyle",
      title: "Digital Lifestyle",
      subtitle: "Curated setups and mindful tech hygiene",
      category: "Navigation",
      icon: <Sliders className="w-4 h-4 text-teal-400" />,
      action: () => scrollTo("lifestyle"),
    },
    {
      id: "contact",
      title: "Contact & Connect",
      subtitle: "Direct inquiry channel and placeholders",
      category: "Navigation",
      icon: <Send className="w-4 h-4 text-blue-400" />,
      action: () => scrollTo("contact"),
    },
    {
      id: "theme",
      title: "Toggle Theme",
      subtitle: "Switch seamlessly between dark and light appearance",
      category: "Action",
      icon: <Sun className="w-4 h-4 text-yellow-400" />,
      action: toggleTheme,
    },
    {
      id: "copy",
      title: copied ? "Copied to Clipboard!" : "Copy Portfolio Link",
      subtitle: "Share Aryan Tanty's personal portfolio",
      category: "Action",
      icon: copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4 text-graphite-300" />
      ),
      action: copyUrl,
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-28 px-3 sm:px-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/10 light:border-slate-300 light:bg-white"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 light:border-slate-200">
          <Search className="w-4 h-4 text-electric-cyan mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent text-sm text-white light:text-slate-900 placeholder:text-graphite-500 focus:outline-none"
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
            className="p-1 rounded text-graphite-400 hover:text-white light:hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-graphite-400">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                    active
                      ? "bg-electric-cyan/15 text-white light:bg-sky-100 light:text-slate-900"
                      : "text-graphite-300 hover:bg-white/5 light:text-slate-700 light:hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 shrink-0 light:bg-white light:border-slate-200">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-medium leading-snug flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-graphite-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-graphite-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  {active && (
                    <CornerDownLeft className="w-3.5 h-3.5 text-electric-cyan shrink-0 ml-2" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-black/40 light:bg-slate-50 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] text-graphite-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-electric-cyan">Aryan Tanty Command Palette</span>
        </div>
      </div>
    </div>
  );
}
