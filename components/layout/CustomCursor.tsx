"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowSvgRef = useRef<SVGSVGElement>(null);
  const bracketsWrapperRef = useRef<HTMLDivElement>(null);
  const codeCursorRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<HTMLSpanElement>(null);
  const hashRef = useRef<HTMLSpanElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const cursorSize = useRef({ w: 26, h: 26 });
  const dotPos = useRef({ x: 0, y: 0 });
  
  const [isVisible, setIsVisible] = useState(false);
  const isCodeHovered = useRef(false);
  const hoveredElement = useRef<HTMLElement | null>(null);
  const isClicked = useRef(false);

  useEffect(() => {
    // Detect mobile/tablet to disable custom cursor
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      document.body.style.cursor = "auto";
      return;
    }

    // Hide standard cursor globally on desktop
    document.body.style.cursor = "none";

    const updateMousePos = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering clickable/interactive elements
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .interactive-hover'
      ) as HTMLElement | null;
      hoveredElement.current = interactive;

      // Check if hovering code blocks or consoles
      const isCode = target.closest(
        'pre, code, .code-console, [data-code-block="true"]'
      );
      isCodeHovered.current = !!isCode;
    };

    const handleMouseDown = () => {
      isClicked.current = true;
    };

    const handleMouseUp = () => {
      isClicked.current = false;
    };

    window.addEventListener("mousemove", updateMousePos, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // LERP animation loop
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let curW = 26;
    let curH = 26;
    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;

    const animateCursor = () => {
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;
      let targetW = 26;
      let targetH = 26;
      let isSnapped = false;

      // Snapping check
      if (hoveredElement.current) {
        const rect = hoveredElement.current.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        
        // Dynamic target size on snap (shrink slightly when clicked for visual feel)
        if (isClicked.current) {
          targetW = rect.width + 4;
          targetH = rect.height + 4;
        } else {
          targetW = rect.width + 12;
          targetH = rect.height + 8;
        }
        isSnapped = true;
      } else if (isCodeHovered.current) {
        targetW = 6;
        targetH = 24;
      } else if (isClicked.current) {
        targetW = 16;
        targetH = 16;
      }

      // LERP coordinates and size
      curX = lerp(curX, targetX, isSnapped ? 0.22 : 0.15);
      curY = lerp(curY, targetY, isSnapped ? 0.22 : 0.15);
      curW = lerp(curW, targetW, 0.2);
      curH = lerp(curH, targetH, 0.2);

      // Inner dot follows mouse position with faster LERP for zero input lag feeling
      dotX = lerp(dotX, mousePos.current.x, 0.45);
      dotY = lerp(dotY, mousePos.current.y, 0.45);

      cursorPos.current = { x: curX, y: curY };
      cursorSize.current = { w: curW, h: curH };
      dotPos.current = { x: dotX, y: dotY };

      // Update Outer Cursor Brackets styling and position
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
        cursorRef.current.style.width = `${curW}px`;
        cursorRef.current.style.height = `${curH}px`;

        // Style outer cursor color
        let activeColor = "#E8FF00"; // default: neon lime
        if (isClicked.current) {
          activeColor = "#FF4D00"; // click: neon orange/burn
        } else if (isSnapped) {
          activeColor = "#4BE2C4"; // snap: neon cyan
        }
        cursorRef.current.style.color = activeColor;
        
        // Snapped background grid opacity
        if (isSnapped) {
          cursorRef.current.style.backgroundColor = "rgba(75, 226, 196, 0.03)";
        } else {
          cursorRef.current.style.backgroundColor = "transparent";
        }
      }

      // Update Inner Dot & Arrow styling and position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(0%, 0%)`; // align top-left pointer tip
        
        let activeColor = "#E8FF00";
        if (isClicked.current) {
          activeColor = "#FF4D00";
        } else if (isSnapped) {
          activeColor = "#4BE2C4";
        }
        dotRef.current.style.color = activeColor;
      }

      // Animate Arrow Svg
      if (arrowSvgRef.current) {
        arrowSvgRef.current.style.opacity = isCodeHovered.current ? "0" : "1";
        arrowSvgRef.current.style.transform = isClicked.current ? "scale(0.85)" : "scale(1)";
      }

      // Sub-elements visibility toggle
      if (bracketsWrapperRef.current) {
        if (isCodeHovered.current) {
          bracketsWrapperRef.current.style.opacity = "0";
          bracketsWrapperRef.current.style.animation = "none";
        } else {
          bracketsWrapperRef.current.style.opacity = "1";
          if (isSnapped) {
            bracketsWrapperRef.current.style.animation = "none";
            bracketsWrapperRef.current.style.transform = "rotate(0deg)";
          } else {
            // Spin slowly in normal mode
            bracketsWrapperRef.current.style.animation = "cyber-spin 16s infinite linear";
          }
        }
      }

      if (codeCursorRef.current) {
        codeCursorRef.current.style.opacity = isCodeHovered.current ? "1" : "0";
      }

      if (scannerRef.current) {
        scannerRef.current.style.opacity = isSnapped ? "1" : "0";
      }

      // Direct DOM updates for HUD
      if (coordsRef.current) {
        coordsRef.current.textContent = `${Math.round(targetX)}, ${Math.round(targetY)}`;
      }
      
      if (modeRef.current) {
        let modeText = "[SYS_OK]";
        if (isClicked.current) {
          modeText = "[EXEC_TRG]";
        } else if (isSnapped) {
          modeText = "[LCK_SYS]";
        } else if (isCodeHovered.current) {
          modeText = "[CODE_EDT]";
        }
        modeRef.current.textContent = modeText;
      }

      if (hashRef.current) {
        const hashVal = ((Math.round(targetX) * 29 + Math.round(targetY) * 53) % 4096)
          .toString(16)
          .toUpperCase()
          .padStart(3, "0");
        hashRef.current.textContent = `0x${hashVal}`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener("mousemove", updateMousePos);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Self-contained custom cyber cursor keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cyber-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cyber-scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes cyber-blink {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
      `}} />

      {/* 1. Outer Brackets Container */}
      <div
        ref={cursorRef}
        className="
          pointer-events-none
          fixed
          top-0
          left-0
          z-[99999]
          hidden
          md:block
          transition-[background-color]
          duration-300
          ease-out
        "
        style={{
          width: "26px",
          height: "26px",
        }}
      >
        {/* Outer Bracket Corners */}
        <div
          ref={bracketsWrapperRef}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-current transition-all duration-300 ease-out" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-current transition-all duration-300 ease-out" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-current transition-all duration-300 ease-out" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-current transition-all duration-300 ease-out" />

          {/* An inner rotating target circle for extra premium tech vibe when normal */}
          <div className="absolute inset-1.5 border border-dashed border-current opacity-25 rounded-full" />
        </div>

        {/* Scanline pattern for snapped state */}
        <div
          ref={scannerRef}
          className="
            absolute
            inset-[2.5px]
            overflow-hidden
            transition-opacity
            duration-300
            opacity-0
          "
        >
          {/* Scanning grid background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(75,226,196,0.025)_50%,transparent_50%)] bg-[length:100%_4px]" />
          {/* Scanning moving light line */}
          <div 
            className="absolute inset-x-0 h-[1.5px] bg-[#4BE2C4]/60 shadow-[0_0_6px_#4BE2C4] pointer-events-none"
            style={{
              animation: "cyber-scan 2s infinite linear",
            }}
          />
        </div>
      </div>

      {/* 2. Inner Dot / Cyber Arrow Container & HUD Overlay */}
      <div
        ref={dotRef}
        className="
          pointer-events-none
          fixed
          top-0
          left-0
          z-[99999]
          hidden
          md:flex
          items-center
          justify-center
          transition-colors
          duration-200
        "
        style={{
          width: "0px",
          height: "0px",
        }}
      >
        {/* Giant Cyber Pointer Arrow */}
        <svg
          ref={arrowSvgRef}
          width="32"
          height="42"
          viewBox="0 0 28 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="
            absolute
            left-0
            top-0
            text-current
            transition-opacity
            duration-200
            origin-top-left
          "
        >
          {/* Holographic Cyan Shadow (chromatic aberration offset) */}
          <path
            d="M2 2 L2 30 L10 22 L17 33 L21 30 L14 19 L23 19 Z"
            fill="rgba(75, 226, 196, 0.12)"
            stroke="#4BE2C4"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Main Arrow */}
          <path
            d="M0 0 L0 28 L8 20 L15 31 L19 28 L12 17 L21 17 Z"
            fill="rgba(13, 13, 13, 0.85)"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
        </svg>

        {/* Code Cursor vertical line */}
        <div
          ref={codeCursorRef}
          className="
            absolute
            left-[1px]
            top-0
            w-[2.5px]
            h-[22px]
            bg-current
            shadow-[0_0_8px_currentColor]
            transition-opacity
            duration-200
            opacity-0
            -translate-y-1/2
          "
          style={{
            animation: "cyber-blink 1s infinite steps(2, start)",
          }}
        />

        {/* Cyber telemetry HUD panel */}
        <div
          ref={hudRef}
          className="
            absolute
            left-8
            top-8
            font-mono
            text-[8px]
            leading-none
            text-[#8A8880]
            flex
            flex-col
            gap-1
            pointer-events-none
            bg-[#0D0D0D]/90
            backdrop-blur-md
            border
            border-[#222222]/80
            p-2
            select-none
            w-28
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#222222] pb-1 mb-1">
            <span className="text-[#8A8880] font-bold">CC_SYS_v2.0</span>
            <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
          </div>
          
          {/* Coordinates */}
          <div className="flex justify-between">
            <span>LOC:</span>
            <span ref={coordsRef} className="text-[#F0EDE6] font-semibold">0, 0</span>
          </div>
          
          {/* Status */}
          <div className="flex justify-between">
            <span>MODE:</span>
            <span ref={modeRef} className="font-bold text-current uppercase">[SYS_OK]</span>
          </div>

          {/* Real-time calculated Hash checksum */}
          <div className="flex justify-between text-[7px] opacity-60">
            <span>HASH:</span>
            <span ref={hashRef}>0x000</span>
          </div>
        </div>
      </div>
    </>
  );
}
