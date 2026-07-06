"use client";

import { useEffect, useState, useCallback } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
}

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function GlitchText({ text, className = "", triggerOnMount = false }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const startGlitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iteration = 0;
    const maxIterations = 8;
    const intervalTime = 50; // ~50ms per step

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "." || char === "-" || char === "#") return char;
            
            // If we are far enough in iterations, lock this character in
            const lockProgress = iteration / maxIterations;
            const charProgress = index / text.length;
            
            if (charProgress < lockProgress) {
              return text[index];
            }
            
            // Otherwise, show a random uppercase alphanumeric character of similar width
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("");
      });

      iteration += 1;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, intervalTime);
  }, [text, isGlitching]);

  useEffect(() => {
    if (triggerOnMount) {
      startGlitch();
    }
  }, [triggerOnMount, startGlitch]);

  return (
    <span
      className={`select-none ${className}`}
      onMouseEnter={startGlitch}
    >
      {displayText}
    </span>
  );
}
