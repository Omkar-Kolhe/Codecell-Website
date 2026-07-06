"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

export function FinalCTA() {
  return (
    <section className="relative py-24 px-6 w-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-7xl mx-auto border border-[#1A1A1A] bg-[#070707] overflow-hidden flex flex-col md:flex-row items-center justify-between p-12 md:p-16 lg:px-24 mb-32">
        
        {/* Abstract Knight visual representation for background */}
        <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 z-0 opacity-5 pointer-events-none select-none">
          <div className="text-[20rem] md:text-[30rem] leading-none text-white blur-[2px]">
            ♞
          </div>
        </div>

        {/* Content Left */}
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#eab308] font-mono text-[11px] md:text-[13px] tracking-widest font-bold uppercase"
          >
            // FIND_YOUR_PEOPLE
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-xl md:text-3xl lg:text-4xl leading-[1.4] text-white/95 ${playfair.className}`}
          >
            Across all colleges, the board is shared.<br />
            Trade ideas the moment editorials<br className="hidden md:block" /> drop.
          </motion.h2>
        </div>

        {/* Buttons Right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative z-10 flex flex-col sm:flex-row gap-6 mt-12 md:mt-0 md:ml-10"
        >
          <a
  href="https://discord.gg/2p9JYTwbd"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 border border-[#eab308]/30 bg-[#eab308]/5 text-[#eab308] hover:bg-[#eab308]/10 transition-all font-mono font-bold text-xs md:text-sm tracking-[0.2em] flex items-center justify-center whitespace-nowrap"
>
  [ JOIN DISCORD ]
</a>
          <a href="https://www.reddit.com/r/TSECCodeCell/" target="_blank" className="px-8 py-4 border border-white/20 bg-white/5 text-white/90 hover:bg-white/10 transition-all font-mono font-bold text-xs md:text-sm tracking-[0.2em] flex items-center justify-center whitespace-nowrap">
            [ REDDIT ]
          </a>
        </motion.div>
      </div>

      {/* 'Your Next Move Starts Here.' Text before footer */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full text-center pb-12"
      >
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight ${playfair.className}`}>
          Your Next Move <br className="md:hidden" />
          Starts Here.
        </h2>
      </motion.div>
    </section>
  );
}
