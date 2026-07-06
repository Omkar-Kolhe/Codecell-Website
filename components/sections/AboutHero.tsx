"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const FLOAT_CHARS = [
  { t: "guild", x: 8, y: 12, d: 0 },
  { t: "{ }", x: 92, y: 8, d: 1.2 },
  { t: "0xCC", x: 6, y: 78, d: 0.6 },
  { t: "TSEC", x: 88, y: 72, d: 2 },
  { t: "=>", x: 78, y: 18, d: 1.5 },
  { t: "init()", x: 14, y: 42, d: 0.3 },
  { t: "build", x: 72, y: 88, d: 1.8 },
  { t: "ship()", x: 22, y: 62, d: 2.4 },
];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 17 + 11) % 100,
  y: (i * 23 + 7) % 100,
  size: 1 + (i % 3),
  delay: (i % 8) * 0.4,
  duration: 4 + (i % 5),
}));

function BackgroundLayers() {
  return (
    <>
      <div className="about-hero-aurora about-hero-aurora-cyan" />
      <div className="about-hero-aurora about-hero-aurora-lime" />
      <div className="about-hero-aurora about-hero-aurora-mid" />
      <div className="about-hero-noise" />
      <div className="about-hero-core-glow" />
      <div className="about-hero-grid absolute inset-0 pointer-events-none" />
      <div className="about-hero-scanline absolute left-0 right-0 h-px z-[3] pointer-events-none" />
      <div className="about-hero-scanline about-hero-scanline-slow absolute left-0 right-0 h-px z-[3] pointer-events-none" />
    </>
  );
}

function OrbitRing({
  size,
  duration,
  reverse,
  id,
}: {
  size: number;
  duration: number;
  reverse?: boolean;
  id: string;
}) {
  return (
    <div
      className="about-hero-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4BE2C4" />
            <stop offset="100%" stopColor="#E8FF00" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="0.5"
          strokeDasharray="4 8"
          opacity="0.35"
        />
        <polygon points="100,4 108,28 100,22 92,28" fill="#4BE2C4" opacity="0.8" />
      </svg>
    </div>
  );
}

const titleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4, delayChildren: 0.2 },
  },
};

const titleLine: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.8, ease: "easeInOut" },
  },
};

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const ringParallaxX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const ringParallaxY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="about-hero relative min-h-[calc(100vh-72px)] flex flex-col items-center justify-center overflow-hidden border-b border-[#222222]/80 bg-[#0D0D0D]"
    >
      <BackgroundLayers />

      {/* Particle field */}
      {mounted && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="about-hero-particle absolute rounded-full bg-[#4BE2C4]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Orbital rings with parallax */}
      <motion.div
        style={{ x: ringParallaxX, y: ringParallaxY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
      >
        <OrbitRing size={380} duration={40} id="orbitGrad1" />
        <OrbitRing size={520} duration={55} reverse id="orbitGrad2" />
        <OrbitRing size={680} duration={75} id="orbitGrad3" />
      </motion.div>

      {/* Hex + rings parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none"
      >
        <motion.div
          animate={{ y: [-12, 12, -12], rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[min(65vw,480px)] h-[min(65vw,480px)] opacity-7"
        >
          <Image
            src="/about_logo.png"
            alt="CodeCell Logo"
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Floating code tokens */}
      {mounted &&
        FLOAT_CHARS.map((c, i) => (
          <span
            key={i}
            className="about-hero-token absolute font-mono text-[10px] md:text-[11px] text-[#4BE2C4]/25 pointer-events-none z-[2] select-none"
            style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${c.d}s` }}
          >
            {c.t}
          </span>
        ))}

      {/* Connection lines */}
      <svg
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="10" y1="30" x2="50" y2="50" stroke="rgba(75,226,196,0.2)" strokeWidth="0.12" className="about-hero-line-pulse" />
        <line x1="90" y1="25" x2="50" y2="50" stroke="rgba(232,255,0,0.15)" strokeWidth="0.12" className="about-hero-line-pulse about-hero-line-delay-1" />
        <line x1="15" y1="75" x2="50" y2="50" stroke="rgba(75,226,196,0.12)" strokeWidth="0.12" className="about-hero-line-pulse about-hero-line-delay-2" />
        <line x1="85" y1="80" x2="50" y2="50" stroke="rgba(232,255,0,0.12)" strokeWidth="0.12" className="about-hero-line-pulse about-hero-line-delay-3" />
        <circle cx="50" cy="50" r="1.5" fill="#4BE2C4" className="about-hero-hub-pulse" />
      </svg>

      {/* Title — z-20 above all decor */}
      <div className="relative z-20 text-center px-6 max-w-6xl pt-12 pb-28">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="about-hero-kicker font-mono text-[10px] md:text-[11px] text-[#4BE2C4] block mb-10 uppercase"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8FF00] mr-2 align-middle animate-pulse shadow-[0_0_8px_#E8FF00]" />
          Dossier — About CodeCell
        </motion.span>

        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="about-hero-title-group select-none font-orbitron italic font-black leading-[0.92] tracking-tight flex justify-center gap-4 md:gap-8"
        >
          <motion.span variants={titleLine} className="inline-block">
            <span className="about-hero-shine" data-text="WHO">
              WHO
            </span>
          </motion.span>
          <motion.span variants={titleLine} className="inline-block">
            <span className="about-hero-shine" data-text="WE">
              WE
            </span>
          </motion.span>
          <motion.span variants={titleLine} className="inline-block">
            <span className="about-hero-shine" data-text="ARE">
              ARE
            </span>
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-32 md:w-48 mx-auto mt-10 origin-center bg-gradient-to-r from-transparent via-[#4BE2C4] to-transparent"
        />


      </div>

      {/* Scroll cue */}
      <motion.a
        href="#mission"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#8A8880] hover:text-[#4BE2C4] transition-colors"
        aria-label="Scroll to mission"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={18} className="about-hero-bounce" />
      </motion.a>

      <div className="absolute inset-0 pointer-events-none z-[15] about-hero-vignette" />
    </section>
  );
}
