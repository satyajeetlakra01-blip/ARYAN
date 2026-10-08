"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Send,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Instagram,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { playSuccessChime, playUiClick } from "@/lib/sound";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedFullMessage, setCopiedFullMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const email = "vroaryan25@gmail.com";
  const instaUrl = "https://www.instagram.com/_aryan085/?__pwa=1";

  // Build URLs
  const getSubject = () =>
    `Portfolio Note from ${formData.name.trim() || "Visitor"}`;

  const getBody = () => {
    let b = formData.message.trim();
    if (formData.name) b += `\n\n— From: ${formData.name}`;
    if (formData.contact) b += ` (${formData.contact})`;
    return b;
  };

  // 1. Direct Gmail in browser (100% reliable for Gmail users)
  const handleOpenGmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.message.trim()) {
      setStatusMessage("Please enter a message before sending.");
      return;
    }

    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    playSuccessChime();
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setStatusMessage("Opening Gmail in a new tab with your pre-filled note!");
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // 2. Default desktop mail client (mailto protocol)
  const handleOpenDefaultMail = () => {
    if (!formData.message.trim()) {
      setStatusMessage("Please enter a message before sending.");
      return;
    }

    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBody());
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    playUiClick();
    window.location.href = mailtoUrl;
    setStatusMessage("Launching your system default email app...");
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 3. One-click copy entire prepared note
  const handleCopyFullMessage = () => {
    const fullText = `To: ${email}\nSubject: ${getSubject()}\n\n${getBody()}`;
    navigator.clipboard.writeText(fullText);
    playSuccessChime();
    setCopiedFullMessage(true);
    setStatusMessage("Copied recipient, subject, and message to your clipboard!");
    setTimeout(() => {
      setCopiedFullMessage(false);
      setStatusMessage(null);
    }, 3500);
  };

  const copyEmailOnly = () => {
    navigator.clipboard.writeText(email);
    playUiClick();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-solar-400 tracking-wider uppercase font-bold">
              09 / REACH OUT &middot; CONNECT
            </span>
            <span className="h-px w-8 bg-solar-500/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900">
            Let&apos;s connect.
          </h2>
          <p className="text-base sm:text-lg text-graphite-400 light:text-slate-600 max-w-xl">
            Send a note directly to Aryan Tanty. Choose your preferred way:
            open directly in Gmail Web, use your system email app, or copy in 1 click.
          </p>
        </ScrollReveal>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Direct Channels */}
          <ScrollReveal direction="left" distance={40} className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 light:border-slate-200">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-solar-500/40 bg-canvas-900 shrink-0 shadow-lg shadow-solar-500/10">
                  <Image
                    src="/images/optimized/aryan-hero.webp"
                    alt="Aryan Tanty avatar"
                    fill
                    sizes="56px"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white light:text-slate-900">
                    Aryan Tanty
                  </h3>
                  <p className="text-xs font-mono text-solar-400">
                    Student &middot; Digital Creator &middot; Tech Enthusiast
                  </p>
                </div>
              </div>

              <p className="text-sm text-graphite-400 light:text-slate-600 leading-relaxed mb-8">
                Feel free to send a note or initiate a conversation. Whether discussing smart hardware,
                the latest in generative AI, or sharing thoughts on cricket, clarity and respect for
                time are always appreciated.
              </p>

              <div className="space-y-3.5 mb-8">
                {/* Official Instagram Channel */}
                <a
                  href={instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="FOLLOW"
                  onClick={() => playUiClick()}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/15 via-amber-500/10 to-transparent border border-rose-500/30 flex items-center justify-between group hover:border-rose-500/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-rose-400 uppercase font-semibold">
                        Official Instagram
                      </div>
                      <div className="text-xs font-mono text-white light:text-slate-900 font-bold">
                        @_aryan085
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 uppercase px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/20 font-bold group-hover:bg-rose-500 group-hover:text-white transition-all flex items-center gap-1">
                    <span>FOLLOW</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>

                {/* Direct Verified Email */}
                <div className="p-3.5 rounded-2xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 flex items-center justify-between">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-solar-400 transition-colors"
                    title="Open vroaryan25@gmail.com directly in Gmail"
                  >
                    <div className="w-9 h-9 rounded-xl bg-solar-500/20 border border-solar-500/30 flex items-center justify-center text-solar-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-graphite-400 uppercase">
                        Direct Email Address
                      </div>
                      <div className="text-xs font-mono text-white light:text-slate-900 font-bold">
                        {email}
                      </div>
                    </div>
                  </a>
                  <button
                    onClick={copyEmailOnly}
                    data-cursor-text="COPY"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-graphite-400 hover:text-white transition-colors"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 light:border-slate-200 flex items-center gap-2.5 text-xs text-graphite-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authentic communication. No spam, no automated noise.</span>
            </div>
          </ScrollReveal>

          {/* Right Column: Multi-Option Direct Contact Composer */}
          <ScrollReveal direction="right" distance={40} className="lg:col-span-7 p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 light:border-slate-200">
            <form onSubmit={handleOpenGmail} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white light:text-slate-900 mb-1">
                    Send a direct note
                  </h3>
                  <p className="text-xs text-graphite-400 light:text-slate-600">
                    Target: <span className="text-solar-400 font-mono font-semibold">{email}</span>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GMAIL VERIFIED</span>
                </div>
              </div>

              {/* Status Banner */}
              {statusMessage && (
                <div className="p-3.5 rounded-2xl bg-solar-500/15 border border-solar-500/30 text-xs font-mono text-white flex items-center gap-2 animate-fadeIn">
                  <Sparkles className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-graphite-300 light:text-slate-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 text-sm text-white light:text-slate-900 placeholder:text-graphite-500 focus:outline-none focus:border-solar-500/60 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-graphite-300 light:text-slate-700">
                    Your Email or Handle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. alex@example.com / @handle"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 text-sm text-white light:text-slate-900 placeholder:text-graphite-500 focus:outline-none focus:border-solar-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-graphite-300 light:text-slate-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What would you like to discuss with Aryan?..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-300 text-sm text-white light:text-slate-900 placeholder:text-graphite-500 focus:outline-none focus:border-solar-500/60 transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* 1. Primary Action: Open in Gmail Web (100% reliable) */}
                <button
                  type="submit"
                  data-cursor-text="GMAIL"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-solar-500 via-orange-500 to-rcb-500 hover:from-solar-400 hover:to-rcb-400 text-white transition-all shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_40px_rgba(255,42,77,0.6)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Mail className="w-4 h-4 fill-white" />
                  <span>Open Directly in Gmail (mail.google.com)</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Secondary Actions Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 2. Default Desktop Mail Client */}
                  <button
                    type="button"
                    onClick={handleOpenDefaultMail}
                    data-cursor-text="APP"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-graphite-300 hover:text-white transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-solar-400" />
                    <span>Default Mail App</span>
                  </button>

                  {/* 3. 1-Click Copy Prepared Note */}
                  <button
                    type="button"
                    onClick={handleCopyFullMessage}
                    data-cursor-text="COPY"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-graphite-300 hover:text-white transition-all"
                  >
                    {copiedFullMessage ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-solar-400" />
                    )}
                    <span>{copiedFullMessage ? "Copied Full Note!" : "Copy Full Note"}</span>
                  </button>
                </div>
              </div>

              {/* Clarification Note */}
              <p className="text-[11px] font-mono text-graphite-500 text-center pt-1">
                Clicking <span className="text-solar-400">Open in Gmail</span> directly opens your browser compose tab with <span className="text-white">vroaryan25@gmail.com</span> ready.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
