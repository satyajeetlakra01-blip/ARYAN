"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Clock, Flame, Mail, Instagram, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/portfolioData";

export default function Footer() {
  const [istTime, setIstTime] = useState("");
  const email = "vroaryan25@gmail.com";
  const instaUrl = "https://www.instagram.com/_aryan085/?__pwa=1";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Tech", href: "#technology" },
    { label: "Motion Lab", href: "#motion-lab" },
    { label: "Creative", href: "#creative" },
    { label: "Academics", href: "#academics" },
    { label: "Cricket & RCB", href: "#cricket" },
    { label: "Connect", href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/10 light:border-slate-200 bg-canvas-950 light:bg-slate-50 py-10 sm:py-16 text-graphite-400 light:text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5 light:border-slate-200">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-bold text-white light:text-slate-900 tracking-wider">
                ARYAN TANTY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-solar-500" />
              <span className="text-xs font-mono text-solar-400">SOLAR KINETIC</span>
            </div>
            <p className="text-xs sm:text-sm text-graphite-400 light:text-slate-600">
              Student &bull; Digital Creator &bull; Technology Enthusiast
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-solar-400 hover:text-solar-300 transition-colors"
                title="Compose to vroaryan25@gmail.com in Gmail"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{email}</span>
                <ArrowUpRight className="w-3 h-3 text-solar-500" />
              </a>
              <span className="text-graphite-600">&bull;</span>
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@_aryan085</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-graphite-400 hover:text-solar-400 light:hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 light:border-slate-300 bg-white/5 light:bg-slate-100 text-xs text-graphite-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:border-solar-500/40 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-solar-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Bar: Copyright & Live Time */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-graphite-500">
          <div>
            &copy; 2026 Aryan Tanty. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {istTime && (
              <div className="flex items-center gap-1.5 text-graphite-400 light:text-slate-600">
                <Clock className="w-3 h-3 text-solar-400" />
                <span>IST (India): {istTime}</span>
              </div>
            )}
            <span className="text-solar-400 font-semibold">// MOTION GRAPHIC EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
