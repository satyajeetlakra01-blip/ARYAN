"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable on touch devices or if prefers-reduced-motion is true
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovering(false);
        setCursorText(null);
        return;
      }

      // Check for custom cursor text attribute
      const textElem = target.closest("[data-cursor-text]") as HTMLElement | null;
      if (textElem) {
        setCursorText(textElem.getAttribute("data-cursor-text"));
        setIsHovering(true);
        return;
      } else {
        setCursorText(null);
      }

      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[role='button']") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Contextual Pill or Magnetic Ring */}
      {cursorText ? (
        <div
          className="fixed top-0 left-0 px-3 py-1 rounded-full bg-solar-500 text-black font-mono text-[10px] font-bold tracking-wider shadow-[0_0_20px_rgba(255,107,0,0.8)] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            transition: "transform 0.08s ease-out, opacity 0.15s ease-out",
          }}
        >
          {cursorText}
        </div>
      ) : (
        <>
          {/* Outer ring */}
          <div
            className={`fixed top-0 left-0 rounded-full border border-solar-500/40 transition-transform duration-150 ease-out will-change-transform ${
              isHovering
                ? "w-12 h-12 -ml-6 -mt-6 bg-solar-500/15 border-solar-400 scale-110 shadow-[0_0_20px_rgba(255,107,0,0.4)]"
                : "w-7 h-7 -ml-3.5 -mt-3.5"
            }`}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
          />
          {/* Inner precise dot */}
          <div
            className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-solar-500 will-change-transform shadow-[0_0_10px_rgba(255,107,0,1)]"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
          />
        </>
      )}
    </div>
  );
}
