"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KineticTicker from "@/components/KineticTicker";
import About from "@/components/About";
import Philosophy from "@/components/Philosophy";
import Technology from "@/components/Technology";
import MotionGraphicLab from "@/components/MotionGraphicLab";
import InstagramCard from "@/components/InstagramCard";
import CreativeLab from "@/components/CreativeLab";
import Academics from "@/components/Academics";
import Cricket from "@/components/Cricket";
import DigitalLifestyle from "@/components/DigitalLifestyle";
import Personality from "@/components/Personality";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MotionBackgroundCanvas from "@/components/MotionBackgroundCanvas";
import SoundController from "@/components/SoundController";
import AryanOSHUD from "@/components/AryanOSHUD";
import CelebrationOverlay from "@/components/CelebrationOverlay";
import TelemetryBar from "@/components/TelemetryBar";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quick, non-blocking splash (under 380ms) for polish
    const timer = setTimeout(() => {
      setLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 60 FPS Interactive Particle & 3D Gyroscopic Background Canvas */}
      <MotionBackgroundCanvas />

      {/* Top Solar Scroll Indicator */}
      <ScrollProgress />

      {/* Desktop Contextual Glowing Magnetic Cursor */}
      <CustomCursor />

      {/* Confetti & Stadium Pyro Celebration Canvas */}
      <CelebrationOverlay />

      {/* Quick Non-blocking Intro Flash */}
      {loading && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas-950 text-white transition-opacity duration-300"
        >
          <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-solar-400 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-solar-500 shadow-[0_0_12px_rgba(255,107,0,1)]" />
            <span className="font-bold">ARYAN TANTY</span>
            <span className="text-graphite-500">//</span>
            <span className="text-white">SOLAR KINETIC MOTION LAB</span>
          </div>
        </div>
      )}

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette isOpen={commandOpen} setIsOpen={setCommandOpen} />

      {/* Main Page Layout */}
      <div className="min-h-screen flex flex-col selection:bg-solar-500/25 selection:text-white relative z-10">
        {/* Live Satellite & System Telemetry Header */}
        <TelemetryBar />

        {/* Navigation */}
        <Navbar onOpenCommand={() => setCommandOpen(true)} />

        {/* Major Sections */}
        <main className="flex-grow">
          {/* Hero Section with Pristine Authentic Photo & Cyber Motion Framing */}
          <Hero />

          {/* Kinetic Motion Graphic Ticker Ribbon */}
          <KineticTicker />

          {/* 01 / About Aryan */}
          <About />

          {/* 02 / Personal Philosophy Manifesto */}
          <Philosophy />

          {/* 03 / Technology Focus with Audio Waveform */}
          <Technology />

          {/* FEATURED: Interactive 3D Motion Graphic Studio */}
          <MotionGraphicLab />

          {/* Official Instagram Spotlight (@_aryan085) */}
          <InstagramCard />

          {/* 04 / Creative Lab & Raw Excursion Photo Gallery */}
          <CreativeLab />

          {/* 05 / Academic Side (ICSE Class 10 Rigor) */}
          <Academics />

          {/* 06 / Cricket: Royal Challengers Bengaluru & Virat Kohli Chase Engine */}
          <Cricket />

          {/* 07 / Digital Lifestyle & Forest Stream Excursion */}
          <DigitalLifestyle />

          {/* 08 / Mindset & Strengths Matrix */}
          <Personality />

          {/* 09 / Connect & Direct Inquiry */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Cinematic Music Player — Floating Center Bottom */}
      <MusicPlayer />

      {/* Audio Engine HUD: Web Audio API Synthesizer & Lo-Fi Ambient Pad */}
      <SoundController />

      {/* AryanOS v2.6 Cyber Console HUD (Toggle with ~ or Click) */}
      <AryanOSHUD />
    </>
  );
}
