"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const PRIZES = [
  { rank: "02", title: "2nd Place", color: "#C0C0C0", desc: "Certificate of Excellence, and Premium Unlocks." },
  { rank: "01", title: "Grand Champion", color: "#eab308", desc: "The Ultimate Glory. Premium features unlock, Official Recognition." },
  { rank: "03", title: "3rd Place", color: "#CD7F32", desc: "Certificate of Excellence, and platform perks." },
];

const PERKS = [
  "Certificates for Top Participants",
  "Exclusive Internships",
];

export function Prizes() {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden border-b border-[#eab308]/20">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center'
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#eab308]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <span className="text-[#eab308] font-mono text-xs md:text-sm tracking-widest uppercase font-bold drop-shadow-md">
            // PERKS_OF_WINNING_AND_PRIZES
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl leading-tight text-white ${playfair.className} drop-shadow-lg`}>
            Rewards for the <br className="hidden md:block" />Ultimate Tacticians.
          </h2>
        </motion.div>

        {/* Prizes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRIZES.map((prize, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative overflow-hidden bg-[#070707] border border-[#1A1A1A] p-8 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Colored Top Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2"
                style={{ backgroundColor: prize.color }}
              />
              
              <div 
                className="text-6xl font-black mt-4 mb-6 font-mono tracking-tighter"
                style={{ color: prize.color }}
              >
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">&gt;</span>
                {prize.rank}
                <span className="animate-pulse opacity-80 group-hover:opacity-100 transition-opacity">_</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-white font-mono uppercase tracking-[0.2em]">{prize.title}</h3>
              <p className="text-[#8A8A8A] text-xs md:text-sm leading-relaxed max-w-xs">{prize.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERKS.map((perk, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="border border-[#1A1A1A] bg-[#070707] p-6 flex items-center justify-center text-center hover:border-white/30 hover:bg-[#111] transition-all duration-300 relative group overflow-hidden"
            >
              {/* Scanline hover effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
              <span className="text-[#8A8A8A] group-hover:text-white font-mono text-xs uppercase tracking-[0.15em] transition-colors">{perk}</span>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
