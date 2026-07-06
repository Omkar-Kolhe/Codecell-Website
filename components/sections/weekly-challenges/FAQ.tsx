"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  { q: "What are Weekly Challenges?", a: "Weekly Challenges is an 8-week intensive coding arena. Every week unlocks a new set of algorithmic problems themed around a chess strategy. Solve problems to earn XP and climb the leaderboard." },
  { q: "How long is the competition?", a: "The competition runs for 8 continuous weeks. A new week starts every Monday at 00:00 IST." },
  { q: "Can beginners participate?", a: "Absolutely. We start from the 'Pawn' level (Easy) and gradually progress to 'Grandmaster' (Hard/Expert). There's something for everyone to learn and conquer." },
  { q: "How is ranking calculated?", a: "Ranking is based on Total XP. You earn XP by solving daily challenges. Faster solutions (optimal time/space complexity) might yield bonus XP in special rounds." },
  { q: "When are solutions released?", a: "Editorials and optimal solutions are released at the end of each week, allowing everyone to study the 'Grandmaster Analysis'." },
  { q: "Can I discuss solutions?", a: "Yes, once a challenge is unlocked, you can discuss hints and approaches in 'The Analysis Room' (Forum). However, directly sharing code is discouraged until the editorial is released." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 bg-[#02040A] overflow-hidden border-b border-[#eab308]/20">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-gold font-mono text-sm tracking-widest uppercase">
            // FAQ
          </span>
          <div className="h-[1px] w-24 md:w-64 bg-gradient-to-r from-gold/30 to-transparent" />
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden bg-[#070707] transition-all duration-300 border ${isOpen ? 'border-[#eab308]/30 shadow-[0_4px_20px_rgba(234,179,8,0.05)]' : 'border-[#1A1A1A] hover:border-[#eab308]/20'}`}
              >
                {/* Active Left Accent Line */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#eab308] transition-transform duration-300 origin-top" 
                  style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
                />

                <button 
                  className="w-full px-6 md:px-8 py-6 text-left flex justify-between items-center group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className={`text-[18px] md:text-[20px] text-[#eab308] drop-shadow-sm transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {"♟\uFE0E"}
                    </span>
                    <span className={`font-mono text-[14px] md:text-[16px] tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#8A8A8A] group-hover:text-white'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <span className={`text-2xl font-mono shrink-0 ml-4 font-light transition-transform duration-500 flex items-center justify-center ${isOpen ? 'rotate-45 text-[#eab308]' : 'text-[#444] group-hover:text-[#eab308]'}`}>
                    +
                  </span>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 md:pl-[4.5rem] pl-[3.5rem] text-[#A0A0A0] text-[13px] md:text-[15px] leading-relaxed border-t border-[#1A1A1A] bg-[#050505]">
                        <div className="pt-6 flex gap-4">
                          <span className="text-[#eab308] font-mono text-xs opacity-70 shrink-0 mt-1">
                            // A:
                          </span>
                          <span className="font-mono">
                            {faq.a}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
