"use client";

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HomeSections from "@/components/sections/HomeSections";

// Scrolling Ticker Data (removed)

// Flawless hexagonal cut-corner CTA button
const HexagonalButton = ({ href }: { href: string }) => (
  <a href="/login" className="relative group block w-fit">
    <div
      className="relative bg-transparent p-[1.5px] drop-shadow-[0_0_15px_rgba(75,226,196,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(232,255,0,0.5)]"
      style={{
        clipPath: "polygon(16px 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0% 50%)"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#4BE2C4] via-[#00B4D8] to-[#E8FF00] opacity-80 group-hover:opacity-100 transition-opacity" />
      <div
        className="relative flex items-center justify-center bg-[#0D0D0D] px-12 py-3.5 font-mono text-sm font-black tracking-[0.18em] text-[#4BE2C4] transition-all duration-300 group-hover:text-[#0D0D0D] group-hover:bg-gradient-to-r group-hover:from-[#4BE2C4] group-hover:to-[#E8FF00] uppercase"
        style={{
          clipPath: "polygon(15.5px 0%, calc(100% - 15.5px) 0%, 100% 50%, calc(100% - 15.5px) 100%, 15.5px 100%, 0% 50%)",
          paddingLeft: "calc(3rem + 0.18em)"
        }}
      >
        LOGIN
      </div>
    </div>
  </a>
);

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent">

      {/* ========================================================
          1. HERO SECTION â€” Anti-Gravity 3D Floating Design
          ======================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden" style={{ background: '#080c08' }}>

        {/* ========== BACKGROUND LAYER ========== */}
        {/* Scattered code characters */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none font-mono" style={{ color: 'rgba(0, 255, 100, 0.035)' }}>
          {[
            { t: '#include', x: '5%', y: '8%', s: 11 }, { t: 'void', x: '88%', y: '12%', s: 13 },
            { t: '{', x: '3%', y: '22%', s: 12 }, { t: 'int', x: '74%', y: '31%', s: 10 },
            { t: 'class', x: '45%', y: '9%', s: 11 }, { t: 'public', x: '32%', y: '19%', s: 13 },
            { t: '[ ]', x: '15%', y: '28%', s: 10 }, { t: 'return', x: '85%', y: '40%', s: 12 },
            { t: ';', x: '5%', y: '49%', s: 13 }, { t: '=', x: '91%', y: '62%', s: 11 },
            { t: '>', x: '18%', y: '71%', s: 10 }, { t: '<', x: '42%', y: '80%', s: 12 },
            { t: '/', x: '79%', y: '89%', s: 13 }, { t: '*', x: '12%', y: '93%', s: 11 },
            { t: '( )', x: '48%', y: '37%', s: 10 }, { t: '}', x: '31%', y: '58%', s: 12 },
            { t: '#', x: '68%', y: '77%', s: 13 }, { t: 'include', x: '54%', y: '66%', s: 11 },
            { t: 'void', x: '24%', y: '85%', s: 10 }, { t: 'int', x: '23%', y: '45%', s: 12 },
            { t: 'return', x: '77%', y: '53%', s: 13 }, { t: 'class', x: '71%', y: '3%', s: 11 },
            { t: 'public', x: '60%', y: '15%', s: 10 }, { t: '[ ]', x: '95%', y: '82%', s: 12 },
            { t: ';', x: '93%', y: '25%', s: 10 }, { t: '=', x: '5%', y: '73%', s: 13 },
            { t: '<', x: '6%', y: '35%', s: 12 }, { t: '/', x: '81%', y: '67%', s: 11 },
            { t: '*', x: '96%', y: '47%', s: 13 }, { t: '( )', x: '11%', y: '59%', s: 10 },
            { t: '}', x: '33%', y: '91%', s: 12 }, { t: '#', x: '84%', y: '79%', s: 11 },
            { t: 'include', x: '41%', y: '51%', s: 13 }, { t: 'void', x: '67%', y: '61%', s: 10 },
            { t: 'int', x: '38%', y: '75%', s: 12 }, { t: 'return', x: '10%', y: '87%', s: 11 },
          ].map((c, i) => (
            <span key={i} className="absolute" style={{ left: c.x, top: c.y, fontSize: `${c.s}px` }}>{c.t}</span>
          ))}
        </div>

        {/* Background hexagon outlines */}
        <svg className="absolute pointer-events-none z-[1]" style={{ top: '12%', left: '8%', width: 220, height: 220 }} viewBox="0 0 100 100"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="rgba(0,229,180,0.06)" strokeWidth="1.2" /></svg>
        <svg className="absolute pointer-events-none z-[1]" style={{ top: '55%', left: '60%', width: 400, height: 400 }} viewBox="0 0 100 100"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="rgba(0,229,180,0.06)" strokeWidth="1" /></svg>
        <svg className="absolute pointer-events-none z-[1]" style={{ top: '25%', left: '40%', width: 315, height: 315 }} viewBox="0 0 100 100"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="rgba(0,229,180,0.06)" strokeWidth="1.2" /></svg>

        {/* Vignette overlay */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #080c08 100%)' }} />

        {/* ========== CENTRAL TITLE BLOCK ========== */}
        <div className="relative z-10 text-center select-none w-full" style={{ lineHeight: 0.9 }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="title-tsec-ref about-hero-shine" data-text="TSEC" style={{
              display: 'block',
              width: '100%',
              fontFamily: "'Orbitron', 'Arial Black', 'Impact', sans-serif",
              fontSize: 'clamp(48px, 12vw, 140px)',
              fontStyle: 'italic',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 0.85,
              backgroundImage: 'linear-gradient(90deg, #4be2c4 0%, #e8ff00 22%, #f0ede6 45%, #4be2c4 68%, #e8ff00 100%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 50%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextStroke: '0px',
              WebkitTextStrokeColor: 'transparent',
              animation: 'about-title-shine 4s linear 0s infinite',
              whiteSpace: 'nowrap',
            }}>TSEC</div>
            <div className="title-codecell-ref about-hero-shine" data-text="CODECELL" style={{
              display: 'block',
              width: '100%',
              fontFamily: "'Orbitron', 'Arial Black', 'Impact', sans-serif",
              fontSize: 'clamp(38px, 11vw, 128px)',
              fontStyle: 'italic',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 0.85,
              backgroundImage: 'linear-gradient(90deg, #4be2c4 0%, #e8ff00 22%, #f0ede6 45%, #4be2c4 68%, #e8ff00 100%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 50%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextStroke: '0px',
              WebkitTextStrokeColor: 'transparent',
              animation: 'about-title-shine 4s linear 1.2s infinite',
              whiteSpace: 'nowrap',
            }}>CODECELL</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col items-center gap-4 mt-8 md:mt-12">
            <HexagonalButton href="/login" />
          </motion.div>
        </div>

        {/* ========== FLOATING 3D ELEMENTS ========== */}

        {/* ELEMENT 1 â€” 3D KEYBOARD */}
        <div className="absolute hidden lg:block z-[5]" style={{ left: '6%', bottom: '14%', width: 250, height: 140, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.2)', borderRadius: 8, padding: 10, boxShadow: '10px 12px 24px rgba(0,0,0,0.55), 0 0 18px rgba(0,229,180,0.06)', animation: 'float-keyboard 6s ease-in-out infinite alternate' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, width: '100%', height: '100%' }}>
            {Array.from({ length: 40 }).map((_, i) => {
              const isGlow = [4, 19, 20, 36].includes(i);
              const isLight = [0, 13, 27, 34].includes(i);
              return <div key={i} style={{ background: isGlow ? 'rgba(0,229,180,0.12)' : isLight ? '#1a2e1a' : '#111f11', border: `1px solid ${isGlow ? '#00e5b4' : isLight ? 'rgba(200,240,0,0.3)' : 'rgba(0,229,180,0.15)'}`, borderRadius: 3, boxShadow: isGlow ? '0 0 6px rgba(0,229,180,0.4)' : 'none' }} />;
            })}
          </div>
        </div>

        {/* ELEMENT 2 â€” 3D CODE EDITOR CARD */}
        <div className="absolute hidden lg:block z-[5]" style={{ left: '6%', top: '14%', width: 216, height: 153, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 6, overflow: 'hidden', boxShadow: '-10px 18px 36px rgba(0,0,0,0.65), 0 0 14px rgba(0,229,180,0.05)', animation: 'float-code 5s ease-in-out 0.8s infinite alternate' }}>
          <div style={{ height: 28, background: '#111f11', borderBottom: '1px solid rgba(0,229,180,0.1)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <span className="font-mono" style={{ fontSize: 11, color: '#4a7a4a', marginLeft: 4 }}>main.cpp</span>
          </div>
          <div className="font-mono" style={{ padding: 10, fontSize: 10, lineHeight: 1.6 }}>
            <div><span style={{ color: '#00e5b4' }}>#include</span> <span style={{ color: '#e8f5e8' }}>&lt;CC_Engine&gt;</span></div>
            <div><span style={{ color: '#00e5b4' }}>int</span> <span style={{ color: '#e8f5e8' }}>NPT_STATE =</span> <span style={{ color: '#7dff7d' }}>0x48</span><span style={{ color: '#e8f5e8' }}>;</span></div>
            <div><span style={{ color: '#00e5b4' }}>void</span> <span style={{ color: '#e8f5e8' }}>{"execute_trials() {"}</span></div>
            <div>&nbsp;&nbsp;<span style={{ color: '#00e5b4' }}>if</span> <span style={{ color: '#e8f5e8' }}>(security ==</span> <span style={{ color: '#c8f000' }}>LOCKED</span><span style={{ color: '#e8f5e8' }}>)</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff6b6b' }}>breach_mainframe()</span><span style={{ color: '#e8f5e8' }}>;</span></div>
            <div><span style={{ color: '#e8f5e8' }}>{"}"}</span></div>
          </div>
        </div>

        {/* ELEMENT 3 â€” HEXAGONAL BADGES */}
        <div className="absolute hidden lg:block z-[5]" style={{ top: '12%', right: '20%', width: 80, height: 80, filter: 'drop-shadow(0 0 10px rgba(0,229,180,0.35))', animation: 'float-badge1 7s ease-in-out 1.6s infinite alternate' }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#0d1a0d" stroke="#00e5b4" strokeWidth="3" /><text x="50" y="44" fontFamily="monospace" fontSize="11" fill="#c8f000" fontWeight="bold" textAnchor="middle">TSEC</text><text x="50" y="62" fontFamily="monospace" fontSize="8" fill="#00e5b4" fontWeight="bold" textAnchor="middle">CodeCell</text></svg>
        </div>
        <div className="absolute hidden lg:block z-[5]" style={{ bottom: '28%', right: '6%', width: 62, height: 62, filter: 'drop-shadow(0 0 7px rgba(200,240,0,0.28))', animation: 'float-badge2 5.5s ease-in-out 2.1s infinite alternate' }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#0d1a0d" stroke="#00e5b4" strokeWidth="3" /><text x="50" y="44" fontFamily="monospace" fontSize="11" fill="#c8f000" fontWeight="bold" textAnchor="middle">TSEC</text><text x="50" y="62" fontFamily="monospace" fontSize="8" fill="#00e5b4" fontWeight="bold" textAnchor="middle">CodeCell</text></svg>
        </div>

        {/* ELEMENT 4 â€” TECH TOOL ICON TILES */}
        <div className="absolute hidden lg:flex flex-col items-center justify-center gap-1 z-[5]" style={{ top: '14%', right: '10%', width: 58, height: 58, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 14, boxShadow: '8px 12px 22px rgba(0,0,0,0.45), 0 0 12px rgba(200,240,0,0.08)', animation: 'float-tile-a 6s ease-in-out 0.4s infinite alternate' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 6 2.5 6 5.5V7H12V8.5H6.5C4.5 8.5 3 10 3 12C3 14 4.5 15.5 6.5 15.5H8V14C8 11.8 9.8 10 12 10H18V8.5C18 5.5 17.52 2 12 2Z" fill="#c8f000" /><path d="M12 22C17.52 22 18 21.5 18 18.5V17H12V15.5H17.5C19.5 15.5 21 14 21 12C21 10 19.5 8.5 17.5 8.5H16V10C16 12.2 14.2 14 12 14H6V15.5C6 18.5 6.48 22 12 22Z" fill="#00e5b4" /><circle cx="9" cy="5" r="1" fill="#080c08" /><circle cx="15" cy="19" r="1" fill="#080c08" /></svg>
          <span className="font-mono" style={{ fontSize: 8, color: '#4a7a4a', fontWeight: 700 }}>Python</span>
        </div>
        <div className="absolute hidden lg:flex flex-col items-center justify-center gap-1 z-[5]" style={{ top: '28%', right: '8%', width: 58, height: 58, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 14, boxShadow: '7px 10px 20px rgba(0,0,0,0.45), 0 0 10px rgba(0,229,180,0.1)', animation: 'float-tile-b 4.5s ease-in-out 1.2s infinite alternate' }}>
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none"><rect x="2" y="2" width="4" height="3" fill="#00e5b4" opacity={0.8} /><rect x="7" y="2" width="4" height="3" fill="#00e5b4" opacity={0.8} /><rect x="12" y="2" width="4" height="3" fill="#00e5b4" opacity={0.8} /><rect x="7" y="6" width="4" height="3" fill="#00e5b4" /><rect x="12" y="6" width="4" height="3" fill="#00e5b4" /><rect x="17" y="6" width="4" height="3" fill="#00e5b4" /><rect x="12" y="10" width="4" height="3" fill="#00e5b4" /><path d="M1 14C3 13 5 13 7 14C11 16 16 16 19 14C21 13 22 11 23 10C24 9 26 9 27 10C28 11 27 13 26 14C24 16 21 18 18 18C13 18 7 18 2 17C1 16.5 0.5 15 1 14Z" fill="#00e5b4" /></svg>
          <span className="font-mono" style={{ fontSize: 8, color: '#4a7a4a', fontWeight: 700 }}>Docker</span>
        </div>
        <div className="absolute hidden lg:flex flex-col items-center justify-center gap-1 z-[5]" style={{ top: '8%', right: '12%', width: 58, height: 58, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 14, boxShadow: '6px 9px 18px rgba(0,0,0,0.45)', animation: 'float-tile-c 7s ease-in-out 2.8s infinite alternate' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2"><circle cx="18" cy="6" r="3" fill="#0d1a0d" /><circle cx="6" cy="18" r="3" fill="#0d1a0d" /><circle cx="6" cy="6" r="3" fill="#0d1a0d" /><path d="M6 9v6M18 9C18 13 6 11 6 15" strokeLinecap="round" /></svg>
          <span className="font-mono" style={{ fontSize: 8, color: '#4a7a4a', fontWeight: 700 }}>Git</span>
        </div>
        <div className="absolute hidden lg:flex flex-col items-center justify-center gap-1 z-[5]" style={{ top: '38%', right: '14%', width: 64, height: 64, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 14, boxShadow: '10px 14px 28px rgba(0,0,0,0.55)', animation: 'float-tile-d 5.2s ease-in-out 0.6s infinite alternate' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="6" fill="#ff9a3c" /><ellipse cx="16" cy="16" rx="14" ry="4" stroke="#ff9a3c" strokeWidth="1.5" transform="rotate(-30 16 16)" /><circle cx="6" cy="11" r="2.5" fill="#ff9a3c" /><circle cx="26" cy="21" r="2.5" fill="#ff9a3c" /></svg>
          <span className="font-mono" style={{ fontSize: 7, color: '#4a7a4a', fontWeight: 700 }}>Jupyter</span>
        </div>

        {/* ELEMENT 5 â€” 3D SERVER RACK */}
        <div className="absolute hidden lg:flex flex-col gap-1.5 z-[5]" style={{ right: '4%', top: '40%', width: 117, padding: 6, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 6, boxShadow: '-14px 16px 30px rgba(0,0,0,0.65), 0 0 18px rgba(57,255,20,0.04)', animation: 'float-server 8s ease-in-out 1.8s infinite alternate' }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="flex items-center gap-1.5 font-mono" style={{ height: 22, background: '#111f11', border: '1px solid rgba(0,229,180,0.1)', borderRadius: 3, padding: '0 8px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: n % 2 === 1 ? '#39ff14' : '#1a2e1a', boxShadow: n % 2 === 1 ? '0 0 6px #39ff14' : 'none' }} />
              <span style={{ fontSize: 8, color: '#4a7a4a', fontWeight: 700 }}>SRV-0{n}</span>
            </div>
          ))}
        </div>

        {/* ELEMENT 6 â€” STATS MATRIX CARD */}
        <div className="absolute hidden lg:block z-[5]" style={{ right: '8%', top: '10%', width: 144, padding: 8, background: '#0d1a0d', border: '1px solid rgba(0,229,180,0.18)', borderRadius: 4, boxShadow: '8px 12px 24px rgba(0,0,0,0.6)', animation: 'float-stats 4.8s ease-in-out 1.4s infinite alternate' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px 6px' }}>
            {['109.2', '409.1', '002.3', '761.5', '008.2', '991.0', '325.9', '654.4', '110.7'].map((v, i) => (
              <div key={i} className="font-mono text-center" style={{ fontSize: 13, color: [0, 4, 8].includes(i) ? '#c8f000' : '#e8f5e8', fontWeight: [0, 4, 8].includes(i) ? 700 : 400 }}>{v}</div>
            ))}
          </div>
        </div>

        {/* Bottom ticker removed */}
      </section>

      <HomeSections />
    </div>
  );
}
