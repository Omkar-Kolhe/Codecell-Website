"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#02040A] border-b border-[#eab308]/20">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center'
        }}
      />

      {/* Floating Background Code Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[8%] text-[#eab308] font-mono text-xs md:text-sm pointer-events-none -rotate-6 select-none hidden md:block z-0"
      >
        <pre>{`const evaluatePosition = (board) => {
  return calculateAdvantage(board);
};`}</pre>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.03, 0.1, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] right-[8%] text-cyan-400 font-mono text-xs md:text-sm pointer-events-none rotate-3 select-none hidden md:block z-0"
      >
        <pre>{`interface Move {
  piece: string;
  target: [number, number];
  isCapture: boolean;
}`}</pre>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.02, 0.08, 0.02] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[65%] left-[12%] text-white font-mono text-[10px] md:text-xs pointer-events-none -rotate-12 select-none hidden lg:block z-0"
      >
        <pre>{`while (left <= right) {
  let mid = Math.floor((left+right)/2);
  if (arr[mid] === target) return mid;
}`}</pre>
      </motion.div>

      {/* Inner Hero Card */}
      <div className="relative z-10 w-[95%] max-w-7xl mx-auto bg-[#070707] border border-[#1A1A1A] py-24 flex flex-col items-center justify-center text-center px-4 overflow-hidden">

        {/* Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Header Text with lines */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent to-[#4a3e1c]" />
          <span className="text-[#8B7344] text-[10px] md:text-xs tracking-[0.3em] font-mono uppercase">
            TSEC CODECELL • 2026
          </span>
          <div className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent to-[#4a3e1c]" />
        </motion.div>

        {/* Chess Pieces */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex items-center gap-4 md:gap-6 mb-8 text-[#5E4E2A] text-xl md:text-2xl"
        >
          {['♜', '♞', '♝'].map((piece, i) => (
            <span key={`left-${i}`} className="drop-shadow-lg opacity-60 hover:opacity-100 transition-opacity">
              {piece}
            </span>
          ))}
          <span className="text-gold scale-125 mx-1 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            ♛
          </span>
          <span className="text-gold scale-125 mx-1 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            ♚
          </span>
          {['♝', '♞', '♜'].map((piece, i) => (
            <span key={`right-${i}`} className="drop-shadow-lg opacity-60 hover:opacity-100 transition-opacity">
              {piece}
            </span>
          ))}
        </motion.div>

        {/* Massive Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`relative ${playfair.className} text-4xl md:text-6xl lg:text-[6rem] font-black leading-none tracking-wide flex flex-col items-center`}
        >
          <div className="text-[#F3F3F3] drop-shadow-2xl">WEEKLY</div>
          <div className="text-gold drop-shadow-[0_0_40px_rgba(212,175,55,0.15)] -mt-1 md:-mt-3 lg:-mt-5">CHALLENGES</div>
        </motion.h1>

        {/* Code Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-10 bg-[#0A0D08]/80 border border-[#2A2A2A] shadow-2xl rounded px-6 py-3 font-mono text-[13px] md:text-[15px] backdrop-blur-sm flex items-center"
        >
          <span className="text-[#4ADE80]">function</span>
          <span className="text-white ml-2">masterDSA</span>
          <span className="text-[#A39A80] ml-2">(6_weeks)</span>
          <span className="inline-block w-2 h-4 ml-3 bg-[#4ADE80] animate-pulse" />
        </motion.div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative mt-14 text-[#8A8A8A] text-[10px] md:text-xs tracking-[0.25em] font-mono flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pb-6 md:pb-0"
        >
          <span>6 WEEKS</span>
          <span>N DSA PROBLEMS</span>
          <span className="text-[#333]">•</span>
          <span>THREE CHAMPIONS</span>
        </motion.div>

        {/* Bottom Glowing Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#eab308]/30 to-transparent opacity-80" />
      </div>
    </section>
  );
}
