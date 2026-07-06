"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        fixed
        inset-0
        pointer-events-none
        z-0
        w-full
        h-full
        overflow-hidden
        bg-[#0D0D0D]
      "
      style={{
        backgroundImage: `
          radial-gradient(
            circle 300px at var(--mouse-x, -500px) var(--mouse-y, -500px),
            ${
              pathname.startsWith("/dashboard") || 
              pathname.startsWith("/leaderboard")
                ? "rgba(212, 175, 55, 0.08) 0%, rgba(245, 230, 163, 0.03) 50%," // Gold theme
                : "rgba(75, 226, 196, 0.08) 0%, rgba(232, 255, 0, 0.03) 50%," // Teal/Yellow theme
            }
            transparent 100%
          ),
          linear-gradient(to right, rgba(34, 34, 34, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(34, 34, 34, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      }}
    />
  );
}
