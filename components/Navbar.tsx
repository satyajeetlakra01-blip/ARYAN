"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Command, Menu, X, ArrowUpRight, Flame } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { playUiClick } from "@/lib/sound";

interface NavbarProps {
  onOpenCommand: () => void;
}

export default function Navbar({ onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "hero",
        "about",
        "philosophy",
        "technology",
        "motion-lab",
        "creative",
        "academics",
        "cricket",
        "lifestyle",
        "contact",
      ];

      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", id: "about" },
    { label: "Tech", href: "#technology", id: "technology" },
    { label: "Motion Lab", href: "#motion-lab", id: "motion-lab" },
    { label: "Creative", href: "#creative", id: "creative" },
    { label: "Academics", href: "#academics", id: "academics" },
    { label: "Cricket", href: "#cricket", id: "cricket" },
    { label: "Connect", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-canvas-950/85 dark:bg-canvas-950/90 light:bg-white/90 backdrop-blur-xl border-b border-white/10 light:border-slate-200/80 shadow-lg shadow-black/20"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Aryan Tanty */}
          <Link
            href="#hero"
            className="group flex items-center gap-3 select-none"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 dark:border-white/10 light:border-slate-300 group-hover:border-solar-500/50 transition-colors">
              <span className="font-mono text-xs font-bold text-solar-400 group-hover:scale-110 transition-transform">
                AT
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-solar-500 shadow-[0_0_8px_rgba(255,107,0,1)] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white light:text-slate-900 group-hover:text-solar-400 transition-colors">
                ARYAN TANTY
              </span>
              <span className="text-[10px] font-mono text-graphite-400 -mt-0.5 tracking-tight hidden sm:block">
                STUDENT &middot; CREATOR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-panel light:bg-slate-100/80 border border-white/10 light:border-slate-200"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white light:text-slate-900 bg-white/10 light:bg-white shadow-sm"
                      : "text-graphite-400 hover:text-white light:text-slate-600 light:hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-solar-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Command trigger + Theme toggle + CTA */}
          <div className="flex items-center gap-2">
            {/* Quick Command Trigger */}
            <button
              onClick={onOpenCommand}
              type="button"
              aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 light:border-slate-300 bg-white/5 light:bg-slate-100 text-graphite-400 hover:text-white light:hover:text-slate-900 text-xs font-mono transition-all hover:border-solar-500/40"
              title="Quick Search (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5 text-solar-400" />
              <span className="text-[11px]">⌘K</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Direct CTA */}
            <Link
              href="#contact"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-solar-500 to-crimson-500 text-white hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,107,0,0.3)] active:scale-95"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg border border-white/10 light:border-slate-300 text-graphite-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-solar-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] max-h-[calc(100vh-70px)] overflow-y-auto bg-canvas-950/98 dark:bg-canvas-950/98 light:bg-white/98 backdrop-blur-2xl border-b border-white/10 light:border-slate-200 px-6 py-6 transition-all duration-300 shadow-2xl animate-fade-in z-50">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  playUiClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-graphite-300 light:text-slate-700 hover:text-white light:hover:text-slate-950 hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-solar-400">
                  #
                </span>
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 light:border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommand();
                }}
                className="flex items-center gap-2 text-xs font-mono text-solar-400"
              >
                <Command className="w-4 h-4" />
                <span>Search / Commands</span>
              </button>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-solar-500 to-crimson-500 text-white"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
