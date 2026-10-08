"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Info, Sparkles, Compass } from "lucide-react";
import { PortfolioPhoto } from "@/data/portfolioData";
import { playUiClick, playWarpSound } from "@/lib/sound";

interface LightboxProps {
  photo: PortfolioPhoto | null;
  photos: PortfolioPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: PortfolioPhoto) => void;
}

export default function LightboxModal({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showMeta, setShowMeta] = useState(true);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsZoomed(false);
  }, [photo]);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, photos]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const handlePrev = () => {
    playUiClick();
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };
  const handleNext = () => {
    playUiClick();
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  const handleToggleZoom = () => {
    playWarpSound();
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/90 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 font-mono">
          <span className="text-xs text-solar-400 font-bold px-2 py-0.5 rounded bg-solar-500/10 border border-solar-500/20">
            {String(currentIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <span className="text-white text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-md">
            {photo.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            onClick={handleToggleZoom}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            title={isZoomed ? "Zoom Out" : "Interactive Sensor Zoom (2.5x)"}
            data-cursor-text={isZoomed ? "RESET" : "MACRO"}
          >
            {isZoomed ? (
              <Minimize2 className="w-4 h-4 text-solar-400" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Info toggle */}
          <button
            onClick={() => {
              playUiClick();
              setShowMeta(!showMeta);
            }}
            className={`p-2 rounded-xl transition-colors ${
              showMeta ? "bg-solar-500 text-black font-bold" : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title="Toggle Details"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Close button */}
          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-rcb-500 hover:text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div
        className="relative w-full h-full max-w-5xl max-h-[85vh] p-4 flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`relative max-w-full max-h-full transition-transform duration-200 ${
            isZoomed ? "scale-150 cursor-crosshair" : "cursor-zoom-in"
          }`}
          onClick={handleToggleZoom}
          style={
            isZoomed
              ? {
                  transformOrigin: `${lensPos.x}% ${lensPos.y}%`,
                }
              : undefined
          }
        >
          <img
            src={photo.fullSrc || photo.src}
            alt={photo.alt}
            className="max-h-[78vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl mx-auto border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous Photo"
        data-cursor-text="PREV"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/10 text-white hover:bg-solar-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next Photo"
        data-cursor-text="NEXT"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/10 text-white hover:bg-solar-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-xl"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Bottom Metadata Panel */}
      {showMeta && (
        <div
          className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-xl w-auto sm:w-full p-3 sm:p-4 rounded-2xl glass-panel border border-white/15 backdrop-blur-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">
              {photo.title}
            </span>
            <span className="font-mono text-[10px] text-solar-400 uppercase font-bold">
              {photo.category}
            </span>
          </div>
          <p className="text-xs text-graphite-300 leading-relaxed mb-2">
            {photo.description}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-graphite-400">
            <span>RAW FILE: {photo.originalFileName}</span>
            <span className="text-acid-400">100% UNTOUCHED FOREST SENSOR &bull; 3072&times;4096</span>
          </div>
        </div>
      )}
    </div>
  );
}
