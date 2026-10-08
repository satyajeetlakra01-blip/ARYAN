"use client";

import { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%^&*";

export default function ScrambleText({
  text,
  className = "",
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 2.5;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "•" || char === "/" || char === "-") {
              return char;
            }
            if (index < iteration / 2.5) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 25);
  };

  useEffect(() => {
    startScramble();
  }, [text]);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) startScramble();
      }}
      className={`inline-block cursor-default select-none font-mono ${className}`}
    >
      {displayText}
    </span>
  );
}
