"use client";
import React from "react";

/* ============================================================
   DESIGN SYSTEM — HIGH-FIDELITY CYBERNETIC ISOMETRIC SVG ICONS
   All icons use proper isometric projection and detailed telemetry overlays:
   - Mint-Cyan (#4BE2C4)
   - Neon-Lime (#E8FF00)
   - Warning-Burn (#FF4D00)
   - Dark background panels with glassmorphic semi-transparency
   ============================================================ */

/* ============================================================
   1. 3D Mechanical Keyboard — full isometric perspective
   ============================================================ */
export function KeyboardSvg() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 12px 36px rgba(75,226,196,0.3)) drop-shadow(0 4px 12px rgba(0,0,0,0.85))" }}>
      
      {/* Definitions for gradients */}
      <defs>
        <linearGradient id="kbdBase" x1="0" y1="0" x2="280" y2="180">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="50%" stopColor="#121212" />
          <stop offset="100%" stopColor="#0B0B0B" />
        </linearGradient>
        <linearGradient id="neonCyanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4BE2C4" />
          <stop offset="100%" stopColor="#00B4D8" />
        </linearGradient>
      </defs>

      {/* === KEYBOARD BASE BODY — ISOMETRIC === */}
      {/* Bottom shadow base */}
      <ellipse cx="140" cy="158" rx="110" ry="14" fill="#4BE2C4" opacity="0.05" />
      
      {/* Left side depth */}
      <path d="M20 90 L140 135 L140 157 L20 112 Z" fill="#060606" stroke="#4BE2C4" strokeWidth="1" strokeOpacity="0.3" />
      {/* Right side depth */}
      <path d="M260 90 L140 135 L140 157 L260 112 Z" fill="#0A0A0A" stroke="#4BE2C4" strokeWidth="1" strokeOpacity="0.25" />
      
      {/* Main Top Face Plate */}
      <path d="M20 90 L140 45 L260 90 L140 135 Z" fill="url(#kbdBase)" stroke="#4BE2C4" strokeWidth="1.5" strokeOpacity="0.8" />

      {/* Motherboard PCB Traces printed on Plate */}
      <path d="M50 72 L110 50 L140 62 L180 48 M100 115 L140 100 L210 120" 
        stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="3 3" fill="none" />
      <circle cx="110" cy="50" r="1.5" fill="#4BE2C4" opacity="0.2" />
      <circle cx="140" cy="100" r="1.5" fill="#4BE2C4" opacity="0.2" />

      {/* OLED Screen Widget on top edge */}
      <g>
        {/* Screen Bezel */}
        <path d="M125 51 L155 40 L165 44 L135 55 Z" fill="#0A0A0A" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.7" />
        {/* Frequency Wave representation */}
        <path d="M130 51 L135 48 L140 51 L145 44 L150 49 L155 45 L160 48" 
          stroke="#E8FF00" strokeWidth="0.6" strokeOpacity="0.8" fill="none" />
      </g>

      {/* === KEY ROWS ON TOP FACE === */}
      {/* Row 1 — top row of keys */}
      {Array.from({ length: 13 }).map((_, i) => {
        const baseX = 35 + i * 16;
        const baseY = 55 + i * 3.5;
        const kw = 13, kh = 8;
        const isEsc = i === 0;
        return (
          <g key={`r1-${i}`}>
            {/* key body */}
            <path
              d={`M${baseX} ${baseY - 4} L${baseX + kw} ${baseY - 4 - kh * 0.3} L${baseX + kw} ${baseY + kh * 0.5} L${baseX} ${baseY + kh * 0.5 + kh * 0.3} Z`}
              fill={isEsc ? "rgba(232,255,0,0.1)" : "#161616"}
              stroke={isEsc ? "#E8FF00" : "#4BE2C4"}
              strokeWidth={isEsc ? "1" : "0.5"}
              strokeOpacity="0.75"
            />
            {/* Keycap top face highlighting */}
            <path
              d={`M${baseX + 2} ${baseY - 2} L${baseX + kw - 2} ${baseY - 2 - kh * 0.3} L${baseX + kw - 2} ${baseY + kh * 0.2} L${baseX + 2} ${baseY + kh * 0.2 + kh * 0.3} Z`}
              fill={isEsc ? "#E8FF00" : "#242424"}
              fillOpacity={isEsc ? "0.2" : "0.5"}
            />
          </g>
        );
      })}

      {/* Row 2 */}
      {Array.from({ length: 13 }).map((_, i) => {
        const baseX = 38 + i * 16;
        const baseY = 71 + i * 3.5;
        const kw = 13, kh = 8;
        return (
          <g key={`r2-${i}`}>
            <path
              d={`M${baseX} ${baseY - 4} L${baseX + kw} ${baseY - 4 - kh * 0.3} L${baseX + kw} ${baseY + kh * 0.5} L${baseX} ${baseY + kh * 0.5 + kh * 0.3} Z`}
              fill="#141414"
              stroke="#4BE2C4"
              strokeWidth="0.5"
              strokeOpacity="0.6"
            />
            <path
              d={`M${baseX + 2} ${baseY - 2} L${baseX + kw - 2} ${baseY - 2 - kh * 0.3} L${baseX + kw - 2} ${baseY + kh * 0.2} L${baseX + 2} ${baseY + kh * 0.2 + kh * 0.3} Z`}
              fill="#202020"
              fillOpacity="0.4"
            />
          </g>
        );
      })}

      {/* Row 3 */}
      {Array.from({ length: 12 }).map((_, i) => {
        const baseX = 42 + i * 16;
        const baseY = 87 + i * 3.5;
        const kw = 13, kh = 8;
        const isEnter = i === 11;
        return (
          <g key={`r3-${i}`}>
            <path
              d={`M${baseX} ${baseY - 4} L${baseX + kw} ${baseY - 4 - kh * 0.3} L${baseX + kw} ${baseY + kh * 0.5} L${baseX} ${baseY + kh * 0.5 + kh * 0.3} Z`}
              fill={isEnter ? "rgba(232,255,0,0.08)" : "#161616"}
              stroke={isEnter ? "#E8FF00" : "#4BE2C4"}
              strokeWidth={isEnter ? "1" : "0.5"}
              strokeOpacity="0.7"
            />
            <path
              d={`M${baseX + 2} ${baseY - 2} L${baseX + kw - 2} ${baseY - 2 - kh * 0.3} L${baseX + kw - 2} ${baseY + kh * 0.2} L${baseX + 2} ${baseY + kh * 0.2 + kh * 0.3} Z`}
              fill={isEnter ? "#E8FF00" : "#202020"}
              fillOpacity={isEnter ? "0.15" : "0.4"}
            />
          </g>
        );
      })}

      {/* Row 4 — spacebar row */}
      {[0, 1, 2].map((i) => {
        const baseX = 48 + i * 16;
        const baseY = 103 + i * 3.5;
        return (
          <g key={`r4l-${i}`}>
            <path
              d={`M${baseX} ${baseY - 4} L${baseX + 13} ${baseY - 5.9} L${baseX + 13} ${baseY + 4} L${baseX} ${baseY + 5.9} Z`}
              fill="#141414" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.6"
            />
          </g>
        );
      })}

      {/* Spacebar */}
      <g>
        {/* Shadow base */}
        <path d="M97 108 L175 90 L175 101 L97 119 Z" fill="#1C1C1C" stroke="#E8FF00" strokeWidth="1.2" strokeOpacity="0.8" />
        {/* Glow surface */}
        <path d="M99 109 L173 92 L173 99 L99 116 Z" fill="#E8FF00" fillOpacity="0.08" />
        {/* Depth shadows */}
        <path d="M97 119 L97 108 L95 109.5 L95 120.5 Z" fill="#050505" />
        <path d="M175 101 L175 90 L177 91 L177 102 Z" fill="#0B0B0B" />
      </g>

      {/* === "Ju" JUPYTER ACCENT BADGE === */}
      <g>
        <path d="M218 88 L238 81 L238 94 L218 101 Z" fill="#0A0A0A" stroke="#E8FF00" strokeWidth="1.5" />
        <path d="M220 89 L236 83 L236 91 L220 97 Z" fill="#E8FF00" fillOpacity="0.1" />
        <path d="M218 101 L218 88 L216 89 L216 102 Z" fill="#050505" />
        <text x="228" y="93.5" fill="#E8FF00" fontSize="8.5" fontWeight="900" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle" style={{ filter: "drop-shadow(0 0 3px #E8FF00)" }}>Ju</text>
      </g>

      {/* Neon Cyber status line along top edge */}
      <line x1="22" y1="90" x2="258" y2="90" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.15" />
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <g key={`led-${i}`}>
          <circle cx={35 + i * 35} cy={90} r="1.5" fill="#4BE2C4" opacity="0.3" />
          <circle cx={35 + i * 35} cy={90} r="0.6" fill="#4BE2C4" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   2. Floating Keycap — proper 3D isometric single key
   ============================================================ */
export function KeycapSvg({ letter, color = "#E8FF00" }: { letter: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 6px 18px ${color}44) drop-shadow(0 2px 4px rgba(0,0,0,0.6))` }}>
      
      {/* Bottom base shadow */}
      <path d="M10 44 L30 52 L50 44 L30 36 Z" fill={color} opacity="0.05" />

      {/* Front-left side */}
      <path d="M10 22 L30 30 L30 52 L10 44 Z" fill="#0C0C0C" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      {/* Front-right side */}
      <path d="M50 22 L30 30 L30 52 L50 44 Z" fill="#080808" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      
      {/* Top face body */}
      <path d="M10 22 L30 14 L50 22 L30 30 Z" fill="#1C1C1C" stroke={color} strokeWidth="1.8" />
      
      {/* Inner dish recess */}
      <path d="M16 23 L30 17.5 L44 23 L30 28.5 Z" fill="#141414" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
      
      {/* Tech corner ticks inside top */}
      <path d="M18 21.5 L18 20 L19.5 20 M42 21.5 L42 20 L40.5 20" stroke={color} strokeWidth="0.5" strokeOpacity="0.7" />

      {/* Glowing Letter Legend */}
      <text x="30" y="24" fill={color} fontSize="11" fontWeight="900" fontFamily="monospace"
        textAnchor="middle" dominantBaseline="middle"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
        {letter}
      </text>
    </svg>
  );
}

/* ============================================================
   3. Server Stack — true 3D isometric stacked servers
   ============================================================ */
export function ServerStackSvg() {
  const layers = [
    { y: 95, accent: "#E8FF00", fill: "#141414" },
    { y: 73, accent: "#4BE2C4", fill: "#161616" },
    { y: 51, accent: "#E8FF00", fill: "#141414" },
    { y: 29, accent: "#4BE2C4", fill: "#161616" },
  ];
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 10px 28px rgba(75,226,196,0.2))" }}>
      
      {layers.map((layer, i) => (
        <g key={i}>
          {/* Left depth face */}
          <path
            d={`M20 ${layer.y} L60 ${layer.y + 14} L60 ${layer.y + 28} L20 ${layer.y + 14} Z`}
            fill="#060606"
            stroke={layer.accent}
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          {/* Right depth face */}
          <path
            d={`M100 ${layer.y} L60 ${layer.y + 14} L60 ${layer.y + 28} L100 ${layer.y + 14} Z`}
            fill="#0A0A0A"
            stroke={layer.accent}
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          
          {/* Top cover face */}
          <path
            d={`M20 ${layer.y} L60 ${layer.y - 14} L100 ${layer.y} L60 ${layer.y + 14} Z`}
            fill={layer.fill}
            stroke={layer.accent}
            strokeWidth="1.5"
          />
          
          {/* Top PCB trace detail lines */}
          <path d={`M30 ${layer.y - 2} L55 ${layer.y - 10} L70 ${layer.y - 5}`} 
            stroke={layer.accent} strokeWidth="0.6" strokeOpacity="0.25" fill="none" />
          <circle cx="70" cy={layer.y - 5} r="1" fill={layer.accent} opacity="0.4" />

          {/* LED diagnostic node */}
          <circle cx="88" cy={layer.y + 2} r="2.2" fill={layer.accent} opacity="0.8" style={{ filter: `drop-shadow(0 0 3px ${layer.accent})` }}>
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${1.2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>

          {/* Detailed Connection Ports on Front Panel */}
          <g transform={`translate(0, ${layer.y})`}>
            {/* Port A */}
            <path d="M30 8 L38 11 L38 14 L30 11 Z" fill="#050505" stroke={layer.accent} strokeWidth="0.5" strokeOpacity="0.6" />
            {/* Port B */}
            <path d="M42 12 L50 15 L50 18 L42 15 Z" fill="#050505" stroke={layer.accent} strokeWidth="0.5" strokeOpacity="0.6" />
            
            {/* Status lines inside ports */}
            <line x1="32" y1="9.5" x2="36" y2="11" stroke={layer.accent} strokeWidth="0.8" opacity="0.8" />
          </g>
        </g>
      ))}

      {/* Floating data connection fiber thread */}
      <path d="M60 43 L20 73 L60 109 L100 81 L60 51" fill="none" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />
      {/* Ground shadow overlay */}
      <ellipse cx="60" cy="132" rx="42" ry="6" fill="#4BE2C4" opacity="0.05" />
    </svg>
  );
}

/* ============================================================
   4. Jupyter Logo — 3D sphere with orbital rings
   ============================================================ */
export function JupyterSvg() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 24px rgba(232,255,0,0.35))" }}>
      
      {/* Gradients */}
      <defs>
        <radialGradient id="jupSphereGold" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFF9A6" />
          <stop offset="40%" stopColor="#E8FF00" />
          <stop offset="85%" stopColor="#1E2000" />
          <stop offset="100%" stopColor="#080800" />
        </radialGradient>
        <linearGradient id="ringCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4BE2C4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Tech alignment crosshair behind */}
      <circle cx="50" cy="50" r="46" stroke="#E8FF00" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 6" />
      <line x1="50" y1="2" x2="50" y2="98" stroke="#E8FF00" strokeWidth="0.5" strokeOpacity="0.1" />
      <line x1="2" y1="50" x2="98" y2="50" stroke="#E8FF00" strokeWidth="0.5" strokeOpacity="0.1" />

      {/* Orbital ring 1 (Lime) */}
      <ellipse cx="50" cy="50" rx="43" ry="15" stroke="#E8FF00" strokeWidth="1.8" strokeOpacity="0.8"
        transform="rotate(-30 50 50)" fill="none" />
      
      {/* Orbital ring 2 (Cyan Gradient) */}
      <ellipse cx="50" cy="50" rx="43" ry="15" stroke="url(#ringCyan)" strokeWidth="1.5"
        transform="rotate(35 50 50)" fill="none" />
      
      {/* Orbital ring 3 (Faded backdrop) */}
      <ellipse cx="50" cy="50" rx="43" ry="15" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.25"
        transform="rotate(90 50 50)" fill="none" />

      {/* Central sphere with premium radial gold gradient */}
      <circle cx="50" cy="50" r="21" fill="url(#jupSphereGold)" stroke="#E8FF00" strokeWidth="1" />
      <circle cx="50" cy="50" r="21" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Central "Ju" Symbol */}
      <text x="50" y="54" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="monospace"
        textAnchor="middle" dominantBaseline="middle" style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.75))" }}>
        Ju
      </text>

      {/* Satellite telemetry nodes */}
      <g>
        <circle cx="12" cy="28" r="5" fill="#E8FF00" />
        <circle cx="12" cy="28" r="2" fill="#FFFFFF" />
        <circle cx="12" cy="28" r="8" stroke="#E8FF00" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2" />
      </g>
      <g>
        <circle cx="88" cy="72" r="5" fill="#4BE2C4" />
        <circle cx="88" cy="72" r="1.5" fill="#FFFFFF" />
      </g>
      <circle cx="50" cy="7" r="3.5" fill="#E8FF00" opacity="0.8" />
    </svg>
  );
}

/* ============================================================
   5. Python Logo — 3D extruded python snakes
   ============================================================ */
export function PythonLogoSvg() {
  return (
    <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(75,226,196,0.3))" }}>
      
      {/* Technical Grid Blueprint Overlay */}
      <rect x="5" y="5" width="80" height="80" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="5 5" />
      <line x1="45" y1="5" x2="45" y2="85" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.08" />

      {/* Top snake — Gold/Lime */}
      <g>
        {/* Glow Drop shadow path */}
        <path d="M44 12 C30 12, 22 18, 22 27 L22 36 L45 36 L45 38 L16 38 C10 38, 5 43, 5 51 C5 59, 10 65, 16 65 L24 65 L24 56 C24 50, 29 45, 36 45 L50 45 C56 45, 60 40, 60 35 L60 27 C60 19, 53 12, 44 12 Z"
          fill="#0A0A0A" stroke="#E8FF00" strokeWidth="2.5" />
        {/* Inner circuit layout on snake body */}
        <path d="M28 20 L38 20 L44 26 L54 26" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        {/* Eye */}
        <circle cx="32" cy="24" r="3.5" fill="#E8FF00" style={{ filter: "drop-shadow(0 0 4px #E8FF00)" }} />
        <circle cx="32" cy="24" r="1.2" fill="#000000" />
      </g>

      {/* Bottom snake — Cyan */}
      <g>
        <path d="M46 78 C60 78, 68 72, 68 63 L68 54 L45 54 L45 52 L74 52 C80 52, 85 47, 85 39 C85 31, 80 25, 74 25 L66 25 L66 34 C66 40, 61 45, 54 45 L40 45 C34 45, 30 49, 30 54 L30 62 C30 70, 36 78, 46 78 Z"
          fill="#080808" stroke="#4BE2C4" strokeWidth="2.5" />
        <path d="M62 70 L52 70 L46 64 L36 64" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        {/* Eye */}
        <circle cx="58" cy="66" r="3.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 4px #4BE2C4)" }} />
        <circle cx="58" cy="66" r="1.2" fill="#000000" />
      </g>
    </svg>
  );
}

/* ============================================================
   6. Docker Whale — 3D whale with isometric containers
   ============================================================ */
export function DockerWhaleSvg() {
  return (
    <svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 8px 28px rgba(75,226,196,0.3))" }}>
      
      {/* Water spouts styled as high-tech data beams */}
      <path d="M118 28 Q115 16, 120 8 Q122 4, 126 8 Q128 14, 124 22"
        stroke="#4BE2C4" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.8" />
      <path d="M122 26 Q119 12, 126 6"
        stroke="#E8FF00" strokeWidth="0.8" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
      <circle cx="120" cy="8" r="1" fill="#4BE2C4" />
      <circle cx="126" cy="6" r="1" fill="#E8FF00" />

      {/* Whale body — holographic contour rib lines */}
      <g>
        {/* Base dark fill shape */}
        <path d="M10 62 C10 48, 22 40, 40 40 L95 36 C115 36, 128 44, 128 56 C128 68, 115 76, 92 80 C65 84, 25 80, 10 62 Z"
          fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2.5" />
        
        {/* Internal wireframe contours */}
        <path d="M22 55 Q50 50, 90 48 M28 65 Q60 62, 105 58 M15 58 Q40 45, 80 43" 
          stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.25" fill="none" />
      </g>

      {/* Containers — detailed 3D isometric boxes */}
      {[0, 1, 2, 3, 4].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const bx = 38 + col * 18;
        const by = 20 - row * 14;
        const colAccent = i % 2 === 0 ? "#E8FF00" : "#4BE2C4";
        return (
          <g key={i}>
            {/* Top face */}
            <path d={`M${bx} ${by} L${bx + 14} ${by - 4} L${bx + 14} ${by + 8} L${bx} ${by + 12} Z`}
              fill="#161616" stroke={colAccent} strokeWidth="1" strokeOpacity="0.9" />
            {/* Left face */}
            <path d={`M${bx} ${by + 12} L${bx} ${by} L${bx - 3} ${by + 2} L${bx - 3} ${by + 14} Z`}
              fill="#080808" stroke={colAccent} strokeWidth="0.6" strokeOpacity="0.4" />
            {/* Key lock detail lines on container */}
            <line x1={bx + 7} y1={by + 2} x2={bx + 7} y2={by + 10} stroke={colAccent} strokeWidth="0.5" strokeOpacity="0.5" />
          </g>
        );
      })}

      {/* Top single container */}
      <g>
        <path d="M56 6 L70 2 L70 14 L56 18 Z" fill="#1C1C1C" stroke="#4BE2C4" strokeWidth="1" strokeOpacity="0.9" />
        <path d="M56 18 L56 6 L53 8 L53 20 Z" fill="#0A0A0A" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.4" />
        <line x1="63" y1="4" x2="63" y2="16" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.5" />
      </g>

      {/* Glowing Whale eye */}
      <circle cx="115" cy="54" r="4.5" fill="#4BE2C4" opacity="0.4" style={{ filter: "drop-shadow(0 0 3px #4BE2C4)" }} />
      <circle cx="115" cy="54" r="1.8" fill="#4BE2C4" />

      {/* Tail fin */}
      <path d="M10 62 C4 56, 2 46, 8 42" stroke="#4BE2C4" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M8 63 C2 58, 0 50, 5 46" stroke="#E8FF00" strokeWidth="0.8" strokeLinecap="round" fill="none" strokeOpacity="0.6" />

      {/* Ground ambient shadow */}
      <ellipse cx="75" cy="89" rx="60" ry="7" fill="#4BE2C4" opacity="0.05" />
    </svg>
  );
}

/* ============================================================
   7. Kubernetes Logo — 3D helm wheel with depth
   ============================================================ */
export function KubernetesSvg() {
  const cx = 50, cy = 52, r = 36;
  const spokes = 7;
  const spokePoints = Array.from({ length: spokes }, (_, i) => {
    const angle = (i * 2 * Math.PI) / spokes - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      ix: cx + (r * 0.52) * Math.cos(angle),
      iy: cy + (r * 0.52) * Math.sin(angle),
    };
  });
  const outerPath = spokePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 22px rgba(75,226,196,0.3))" }}>
      
      {/* 3D shadow extrusion */}
      <path d={outerPath} fill="#050505" stroke="none" transform="translate(2, 6)" opacity="0.6" />
      
      {/* Outer heptagon wheel structure */}
      <path d={outerPath} fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2.5" strokeLinejoin="round" />
      
      {/* Concentric inner radar circle rings */}
      <circle cx={cx} cy={cy} r="26" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="2 3" />
      <circle cx={cx} cy={cy} r="18" fill="#141414" stroke="#4BE2C4" strokeWidth="1.8" />
      
      {/* Wheel Spokes styled as cylinders */}
      {spokePoints.map((p, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={p.ix} y2={p.iy}
            stroke="#E8FF00" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1={cx} y1={cy} x2={p.ix} y2={p.iy}
            stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.4" />
        </g>
      ))}
      
      {/* Central Power Core */}
      <circle cx={cx} cy={cy} r="8" fill="#E8FF00" opacity="0.9" style={{ filter: "drop-shadow(0 0 5px #E8FF00)" }} />
      <circle cx={cx} cy={cy} r="3.5" fill="#0D0D0D" />
      
      {/* Outer nodes / handle bars */}
      {spokePoints.map((p, i) => (
        <g key={`n-${i}`}>
          <circle cx={p.x} cy={p.y} r="5.5" fill="#0D0D0D" stroke="#E8FF00" strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="2.2" fill="#E8FF00" opacity="0.9" style={{ filter: "drop-shadow(0 0 2px #E8FF00)" }}>
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <ellipse cx={cx} cy="104" rx="34" ry="4.5" fill="#4BE2C4" opacity="0.05" />
    </svg>
  );
}

/* ============================================================
   8. Git Branch SVG
   ============================================================ */
export function GitBranchSvg() {
  return (
    <svg viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 18px rgba(75,226,196,0.25))" }}>
      
      {/* Main trunk node path */}
      <line x1="25" y1="15" x2="25" y2="85" stroke="#4BE2C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="25" y1="15" x2="25" y2="85" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" />

      {/* Branch lines */}
      <path d="M25 45 C40 45, 50 30, 50 20" stroke="#E8FF00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M25 65 C38 65, 45 55, 48 48" stroke="#E8FF00" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.4" />

      {/* Junction Nodes styled with glowing concentric rings */}
      <g>
        <circle cx="25" cy="15" r="7.5" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="25" cy="15" r="5.5" fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2.5" />
        <circle cx="25" cy="15" r="2" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 3px #4BE2C4)" }} />
      </g>
      
      <g>
        <circle cx="25" cy="85" r="7.5" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="25" cy="85" r="5.5" fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2.5" />
        <circle cx="25" cy="85" r="2" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 3px #4BE2C4)" }} />
      </g>
      
      <g>
        <circle cx="50" cy="20" r="7.5" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="50" cy="20" r="5.5" fill="#0D0D0D" stroke="#E8FF00" strokeWidth="2.5" />
        <circle cx="50" cy="20" r="2" fill="#E8FF00" style={{ filter: "drop-shadow(0 0 3px #E8FF00)" }} />
      </g>

      <g>
        <circle cx="48" cy="48" r="4.5" fill="#0D0D0D" stroke="#E8FF00" strokeWidth="2" strokeOpacity="0.6" />
        <circle cx="48" cy="48" r="1.5" fill="#E8FF00" strokeOpacity="0.6" />
      </g>
    </svg>
  );
}

/* ============================================================
   9. Network Graph
   ============================================================ */
export function NetworkGraphSvg() {
  const nodes = [
    { x: 15, y: 20, c: "#E8FF00" }, { x: 50, y: 10, c: "#4BE2C4" },
    { x: 85, y: 25, c: "#E8FF00" }, { x: 20, y: 55, c: "#4BE2C4" },
    { x: 55, y: 50, c: "#E8FF00" }, { x: 80, y: 60, c: "#4BE2C4" },
    { x: 35, y: 80, c: "#E8FF00" }, { x: 65, y: 85, c: "#4BE2C4" },
    { x: 90, y: 80, c: "#E8FF00" },
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8]];
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 14px rgba(75,226,196,0.2))" }}>
      
      {/* Outer bounding blueprint frame */}
      <rect x="2" y="2" width="96" height="96" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.08" />
      <path d="M2 10 L6 10 M10 2 L10 6 M98 10 L94 10 M90 2 L90 6 M2 90 L6 90 M10 98 L10 94 M98 90 L94 90 M90 98 L90 94" 
        stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.3" />

      {/* Network edge cables */}
      {edges.map(([a, b], i) => (
        <g key={i}>
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="#4BE2C4" strokeWidth="1" strokeOpacity="0.2" />
        </g>
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {/* Node halo ring */}
          <circle cx={n.x} cy={n.y} r="6.5" stroke={n.c} strokeWidth="0.5" strokeOpacity="0.25" />
          {/* Main node shell */}
          <circle cx={n.x} cy={n.y} r="4.5" fill="#0D0D0D" stroke={n.c} strokeWidth="1.8" />
          {/* Active glowing core */}
          <circle cx={n.x} cy={n.y} r="1.6" fill={n.c} style={{ filter: `drop-shadow(0 0 2px ${n.c})` }}>
            <animate attributeName="opacity" values="1;0.3;1" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   10. Twitter Bird
   ============================================================ */
export function TwitterBirdSvg() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 14px rgba(75,226,196,0.25))" }}>
      <path d="M50 16 C48 18, 44 20, 40 20 C42 18, 44 15, 44 12 C42 14, 38 15, 35 15 C32 12, 28 10, 24 10 C18 10, 13 15, 13 21 C13 22, 13 23, 13.5 24 C10 23.5, 6 21, 4 18 C3 20, 3 23, 5 25 C4 25, 3 24, 2 23 C2 27, 5 30, 9 31 C8 31.5, 7 31.5, 6 31 C7 34, 10 36, 14 37 C11 39, 7 40, 3 40 C7 42, 12 43, 17 43 C30 43, 40 33, 40 22 L40 21 C42 20, 44 18, 46 16 L50 16 Z"
        fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2" />
      <circle cx="22" cy="19" r="1.8" fill="#E8FF00" style={{ filter: "drop-shadow(0 0 2px #E8FF00)" }} />
    </svg>
  );
}

/* ============================================================
   11. Code Tag
   ============================================================ */
export function CodeTagSvg() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 4px 14px rgba(75,226,196,0.2))" }}>
      <path d="M30 5 L55 15 L55 40 L30 55 L5 40 L5 15 Z" fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2" />
      <path d="M22 25 L14 30 L22 35" stroke="#E8FF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M38 25 L46 30 L38 35" stroke="#E8FF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="33" y1="22" x2="27" y2="38" stroke="#4BE2C4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   12. Left Code Block — floating editor panel
   ============================================================ */
export function LeftCodeBlockSvg() {
  return (
    <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 12px 32px rgba(75,226,196,0.25))" }}>
      
      {/* 3D Glass panel background */}
      <path d="M5 18 L175 8 L175 118 L5 128 Z" fill="#090909" fillOpacity="0.94" stroke="#4BE2C4" strokeWidth="1.5" />
      
      {/* Shiny glass gradient overlay line */}
      <path d="M8 20 L172 10" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.25" />

      {/* Editor Tabs bar */}
      <path d="M5 29 L175 19" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.4" />
      
      {/* Interactive tab block */}
      <path d="M48 26.5 L90 24 L95 13.5 L53 16 Z" fill="#141414" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.6" />
      
      {/* Status LEDs on window */}
      <circle cx="18" cy="22" r="2.2" fill="#FF4D00" />
      <circle cx="27" cy="21.5" r="2.2" fill="#E8FF00" />
      <circle cx="36" cy="21" r="2.2" fill="#4BE2C4" />
      
      <text x="60" y="22" fill="#8A8880" fontSize="7" fontWeight="bold" fontFamily="monospace">main.cpp</text>
      
      {/* Line numbers column bar */}
      <line x1="42" y1="29" x2="42" y2="125" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.2" />
      {Array.from({ length: 6 }).map((_, i) => (
        <text key={i} x="30" y={43 + i * 13} fill="#3E3E3C" fontSize="6.5" fontFamily="monospace" textAnchor="end">
          {`0${i + 1}`}
        </text>
      ))}

      {/* Code Text lines */}
      <text x="48" y="43" fill="#4BE2C4" fontSize="7.5" fontFamily="monospace" fontWeight="bold">#include &lt;CC_Engine&gt;</text>
      <text x="48" y="56" fill="#E8FF00" fontSize="7.5" fontFamily="monospace" fontWeight="bold">int NPT_STATE = 0x48;</text>
      <text x="48" y="69" fill="#8A8880" fontSize="7.5" fontFamily="monospace">void execute_trials() {"{"}</text>
      <text x="56" y="82" fill="#4BE2C4" fontSize="7.5" fontFamily="monospace">  if (security == LOCKED)</text>
      <text x="64" y="95" fill="#FF4D00" fontSize="7.5" fontFamily="monospace">    breach_mainframe();</text>
      <text x="48" y="108" fill="#8A8880" fontSize="7.5" fontFamily="monospace">{"}"}</text>

      {/* Mini console output line at bottom */}
      <path d="M5 116 L175 106" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.2" />
      <text x="14" y="123" fill="#4BE2C4" fontSize="6" fontFamily="monospace" opacity="0.6">&gt; CC_SYS: [ACTIVE] COMPILED SUCCESSFULLY</text>

      {/* 3D Bottom edge drop thickness */}
      <path d="M5 128 L5 132 L175 122 L175 118 Z" fill="#040404" />
    </svg>
  );
}

/* ============================================================
   13. Vertical Number Stack — system stats panel
   ============================================================ */
export function VerticalNumberStackSvg() {
  const data = [
    { label: "00:15:A2:3B:5C", val: "94%", active: true },
    { label: "SYS_STATUS: 100", val: "OK", active: false },
    { label: "VAL_A: 0x7FFA", val: "ACT", active: true },
    { label: "LATENCY: 12MS", val: "MIN", active: false },
    { label: "MEM_USE: 41.2%", val: "SYS", active: true },
    { label: "NODE_ID: 1098", val: "DIS", active: false },
  ];
  return (
    <svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(232,255,0,0.15))" }}>
      {data.map((item, i) => (
        <g key={i} transform={`translate(0, ${i * 20})`}>
          {/* Row container bg */}
          <rect x="0" y="3" width="126" height="15" rx="1.5"
            fill="#090909" fillOpacity="0.9"
            stroke={item.active ? "#E8FF00" : "#2E2E2E"}
            strokeWidth={item.active ? "1" : "0.5"}
            strokeOpacity={item.active ? "0.85" : "0.3"} />
          
          {/* Dotted target reticle for active labels */}
          {item.active && (
            <line x1="4" y1="10.5" x2="8" y2="10.5" stroke="#E8FF00" strokeWidth="0.8" />
          )}

          {/* Label Text */}
          <text x={item.active ? "12" : "6"} y="13" fill={item.active ? "#E8FF00" : "#4BE2C4"}
            fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="0.04em">
            {item.label}
          </text>
          
          {/* Telemetry data value */}
          <text x="104" y="13" fill="#3E3E3C" fontSize="6.5" fontFamily="monospace" textAnchor="end">
            {item.val}
          </text>

          {/* Glowing Status LED indicator */}
          <circle cx="118" cy="10.5" r="2.2" fill={item.active ? "#E8FF00" : "#1A1A1A"} opacity="0.9" 
            style={item.active ? { filter: "drop-shadow(0 0 2px #E8FF00)" } : {}}>
            {item.active && <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />}
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   14. Hexagon Mini Logo
   ============================================================ */
export function HexagonMiniLogoSvg() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 10px rgba(75,226,196,0.45))" }}>
      {/* 3D thickness */}
      <path d="M20 5 L37 14 L37 32 L20 41 L3 32 L3 14 Z" fill="#040404" transform="translate(1.5, 2.5)" opacity="0.5" />
      
      {/* Glowing Outer Hexagon */}
      <path d="M20 3 L37 12 L37 30 L20 38 L3 30 L3 12 Z" fill="#090909" stroke="#4BE2C4" strokeWidth="1.8" />
      
      {/* Inner dashed ring */}
      <path d="M20 7 L33 14.5 L33 27.5 L20 35 L7 27.5 L7 14.5 Z" fill="none" stroke="#E8FF00" strokeWidth="0.8" strokeDasharray="2 3" />
      
      {/* Central power core node */}
      <circle cx="20" cy="20" r="4.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 3px #4BE2C4)" }} />
      <circle cx="20" cy="20" r="1.5" fill="#0D0D0D" />
    </svg>
  );
}

/* ============================================================
   15. Numerical Data Grid
   ============================================================ */
export function NumericalDataGridSvg() {
  const rows = [
    ["109.2", "409.1", "002.3"],
    ["761.5", "008.2", "991.0"],
    ["325.9", "654.4", "110.7"]
  ];
  return (
    <svg viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(75,226,196,0.22))" }}>
      {/* 3D drop depth */}
      <rect x="2.5" y="4.5" width="124" height="102" fill="#040404" rx="2" />
      {/* Main glass frame */}
      <rect x="0.5" y="2.5" width="124" height="102" rx="2"
        fill="#090909" fillOpacity="0.93" stroke="#4BE2C4" strokeWidth="1.5" />
      
      {/* Inner Technical HUD elements */}
      <path d="M4 8 L8 8 M4 8 L4 12 M120 8 L116 8 M120 8 L120 12" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.5" />

      {/* Grid lines vertical */}
      <line x1="42" y1="3" x2="42" y2="104" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.25" />
      <line x1="83" y1="3" x2="83" y2="104" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.25" />
      
      {/* Grid lines horizontal */}
      <line x1="1" y1="38" x2="124" y2="38" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.25" />
      <line x1="1" y1="72" x2="124" y2="72" stroke="#4BE2C4" strokeWidth="0.6" strokeOpacity="0.25" />
      
      {/* Grid cells */}
      {rows.map((row, rIdx) =>
        row.map((val, cIdx) => {
          const isActive = rIdx === cIdx;
          return (
            <g key={`${rIdx}-${cIdx}`}>
              {/* Highlight cell backing on active diagonal */}
              {isActive && (
                <rect x={1 + cIdx * 41} y={3 + rIdx * 34} width="40" height="34" fill="#E8FF00" fillOpacity="0.03" />
              )}
              {/* Value Text */}
              <text
                x={21 + cIdx * 41} y={24 + rIdx * 34}
                fill={isActive ? "#E8FF00" : "#F0EDE6"}
                fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                style={isActive ? { filter: "drop-shadow(0 0 3px #E8FF00)" } : {}}>
                {val}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}

/* ============================================================
   16. Network Tree
   ============================================================ */
export function NetworkTreeSvg() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(232,255,0,0.2))" }}>
      
      {/* Technical coordinate grids */}
      <line x1="10" y1="60" x2="150" y2="60" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="2 4" />

      {/* Branch trunk connectors */}
      <line x1="80" y1="95" x2="80" y2="75" stroke="#4BE2C4" strokeWidth="2.5" />
      <line x1="80" y1="95" x2="80" y2="75" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.3" />

      <path d="M80 75 Q50 65, 40 45" stroke="#E8FF00" strokeWidth="1.8" fill="none" />
      <path d="M80 75 Q110 65, 120 45" stroke="#E8FF00" strokeWidth="1.8" fill="none" />
      <path d="M40 45 Q25 40, 20 25" stroke="#4BE2C4" strokeWidth="1.5" fill="none" />
      <path d="M40 45 Q50 35, 55 25" stroke="#4BE2C4" strokeWidth="1.5" fill="none" />
      <path d="M120 45 Q110 35, 105 25" stroke="#4BE2C4" strokeWidth="1.5" fill="none" />
      <path d="M120 45 Q135 40, 140 25" stroke="#4BE2C4" strokeWidth="1.5" fill="none" />
      
      {/* Core connection nodes */}
      <g>
        <circle cx="80" cy="75" r="5.5" fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2" />
        <circle cx="80" cy="75" r="1.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 2px #4BE2C4)" }} />
      </g>
      
      <g>
        <circle cx="40" cy="45" r="4.5" fill="#0D0D0D" stroke="#E8FF00" strokeWidth="1.8" />
        <circle cx="40" cy="45" r="1.2" fill="#E8FF00" />
      </g>
      
      <g>
        <circle cx="120" cy="45" r="4.5" fill="#0D0D0D" stroke="#E8FF00" strokeWidth="1.8" />
        <circle cx="120" cy="45" r="1.2" fill="#E8FF00" />
      </g>

      {/* Terminal Node Leaves */}
      <circle cx="20" cy="25" r="3.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 2.5px #4BE2C4)" }} />
      <circle cx="55" cy="25" r="3.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 2.5px #4BE2C4)" }} />
      <circle cx="105" cy="25" r="3.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 2.5px #4BE2C4)" }} />
      <circle cx="140" cy="25" r="3.5" fill="#4BE2C4" style={{ filter: "drop-shadow(0 0 2.5px #4BE2C4)" }} />

      {/* CODECELL Tag Panel */}
      <g>
        <rect x="38" y="88" width="84" height="17" rx="2" fill="#070707" stroke="#4BE2C4" strokeWidth="1.2" />
        <rect x="40" y="90" width="80" height="13" fill="#4BE2C4" fillOpacity="0.05" />
        <text x="80" y="99" fill="#4BE2C4" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em" style={{ filter: "drop-shadow(0 0 3px rgba(75,226,196,0.5))" }}>CODECELL</text>
      </g>
    </svg>
  );
}

/* ============================================================
   17. Geometric Node Array
   ============================================================ */
export function GeometricNodeArraySvg() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(75,226,196,0.22))" }}>
      
      {/* Double nested wireframe boundary rings */}
      <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" stroke="#E8FF00" strokeWidth="1.5" strokeOpacity="0.75" />
      <path d="M50 20 L77 35 L77 65 L50 80 L23 65 L23 35 Z" stroke="#4BE2C4" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="3 2" />
      
      {/* 3D central axes */}
      <line x1="50" y1="10" x2="50" y2="90" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="15" y1="30" x2="85" y2="70" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.25" />
      <line x1="15" y1="70" x2="85" y2="30" stroke="#E8FF00" strokeWidth="0.8" strokeOpacity="0.25" />

      {/* Nodes mapping */}
      {[
        { x: 50, y: 50, c: "#4BE2C4", r: 4.5 }, { x: 32, y: 40, c: "#E8FF00", r: 4 },
        { x: 68, y: 40, c: "#E8FF00", r: 4 }, { x: 32, y: 60, c: "#E8FF00", r: 4 },
        { x: 68, y: 60, c: "#E8FF00", r: 4 }, { x: 50, y: 20, c: "#4BE2C4", r: 4 },
        { x: 50, y: 80, c: "#4BE2C4", r: 4 }
      ].map((pt, idx) => (
        <g key={idx}>
          <circle cx={pt.x} cy={pt.y} r={pt.r + 2} stroke={pt.c} strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx={pt.x} cy={pt.y} r={pt.r} fill="#0C0C0C" stroke={pt.c} strokeWidth="1.5" />
          <circle cx={pt.x} cy={pt.y} r="1.5" fill={pt.c} style={{ filter: `drop-shadow(0 0 2px ${pt.c})` }}>
            <animate attributeName="opacity" values="1;0.2;1" dur={`${1.2 + idx * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   18. Hexagon Badge with text
   ============================================================ */
export function HexagonBadgeSvg({ text }: { text: string }) {
  const gradId = React.useId();
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 6px 20px rgba(75,226,196,0.25))" }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8FF00" />
          <stop offset="100%" stopColor="#4BE2C4" />
        </linearGradient>
      </defs>
      {/* 3D drop depth */}
      <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" fill="#040404" transform="translate(2.5,4.5)" />
      
      {/* Glowing Outer Hexagon */}
      <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" fill="#080808" stroke={`url(#${gradId})`} strokeWidth="3" />
      
      {/* Inner thin blueprint lines */}
      <path d="M50 12 L82 31 L82 69 L50 88 L18 69 L18 31 Z" fill="transparent" stroke="#3E3E3C" strokeWidth="0.8" />
      
      <text x="50" y="44" fill="#E8FF00" fontSize="9.5" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="0.05em" style={{ filter: "drop-shadow(0 0 3px #E8FF00)" }}>TSEC</text>
      <text x="50" y="60" fill="#4BE2C4" fontSize="9" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="0.03em" style={{ filter: "drop-shadow(0 0 3px #4BE2C4)" }}>CodeCell</text>
    </svg>
  );
}

/* ============================================================
   19. N Logo Ticker
   ============================================================ */
export function NLogoSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-[#E8FF00]"
      style={{ filter: "drop-shadow(0 0 8px rgba(232,255,0,0.7))" }}>
      <path d="M5 4 V20 H8 L16 8 V20 H19 V4 H16 L8 16 V4 Z" fill="currentColor" />
    </svg>
  );
}

/* ============================================================
   20. 3D Elephant / Hadoop — big data icon
   ============================================================ */
export function ElephantSvg() {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 8px 24px rgba(75,226,196,0.3))" }}>
      
      {/* Ground drop shadow */}
      <ellipse cx="52" cy="100" rx="30" ry="4.5" fill="#4BE2C4" opacity="0.05" />
      
      {/* Body */}
      <ellipse cx="52" cy="52" rx="30" ry="26" fill="#0D0D0D" stroke="#4BE2C4" strokeWidth="2.2" />
      
      {/* Body 3D shaded contour */}
      <ellipse cx="50" cy="50" rx="27" ry="23" fill="none" stroke="#4BE2C4" strokeWidth="0.5" strokeOpacity="0.2" />

      {/* Head */}
      <ellipse cx="52" cy="30" rx="22" ry="19" fill="#090909" stroke="#4BE2C4" strokeWidth="2" />

      {/* Trunk styled with neon nodes */}
      <path d="M38 38 C30 45, 26 55, 28 65 C29 70, 33 72, 36 68 C38 64, 34 56, 38 50"
        stroke="#4BE2C4" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="65" r="1.5" fill="#4BE2C4" />

      {/* Glowing Ear */}
      <path d="M30 24 C18 18, 12 28, 16 38 C18 44, 26 44, 30 38"
        fill="#121212" stroke="#E8FF00" strokeWidth="1.8" />

      {/* Eye */}
      <circle cx="58" cy="26" r="3.5" fill="#4BE2C4" opacity="0.4" style={{ filter: "drop-shadow(0 0 3px #4BE2C4)" }} />
      <circle cx="58" cy="26" r="1.5" fill="#4BE2C4" />

      {/* Tusk */}
      <path d="M48 38 C50 44, 58 46, 62 42" stroke="#E8FF00" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Legs */}
      {[38, 52, 62].map((x, i) => (
        <rect key={i} x={x} y="72" width="9.5" height="23" rx="4.5"
          fill="#060606" stroke="#4BE2C4" strokeWidth="1.2" strokeOpacity="0.75" />
      ))}
    </svg>
  );
}

/* ============================================================
   21. 3D Floating Cube — generic tech/3D icon
   ============================================================ */
export function FloatingCubeSvg({ color = "#4BE2C4" }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 8px 24px ${color}45)` }}>
      
      {/* Ground shadows */}
      <ellipse cx="40" cy="84" rx="28" ry="4" fill={color} opacity="0.06" />

      {/* Outer Wireframe Box Shell (bigger, nested structure) */}
      <path d="M6 35 L40 17 L74 35 L74 73 L40 90 L6 73 Z" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.15" strokeDasharray="3 3" />

      {/* Left Face (detailed matrix line grids) */}
      <path d="M10 40 L40 24 L40 64 L10 80 Z" fill="#070707" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <path d="M20 35 L20 75 M30 30 L30 70" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
      
      {/* Right Face */}
      <path d="M70 40 L40 24 L40 64 L70 80 Z" fill="#0D0D0D" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M50 30 L50 70 M60 35 L60 75" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
      
      {/* Top Face */}
      <path d="M40 4 L70 20 L40 36 L10 20 Z" fill="#141414" stroke={color} strokeWidth="1.8" />
      
      {/* Highlight center axis */}
      <line x1="40" y1="4" x2="40" y2="36" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
      
      {/* Glowing Energy center core */}
      <circle cx="40" cy="20" r="4.5" fill={color} opacity="0.8" style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      <circle cx="40" cy="20" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}