"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, Code, ArrowRight } from "lucide-react";

export function Editorials() {
  return (
    <section id="editorials" className="relative py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 font-outfit uppercase tracking-wider"
          >
            Grandmaster <span className="text-gold">Analysis</span>
          </motion.h2>
          <p className="text-white/60">Study the optimal moves. Learn from the organizers' solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-0 overflow-hidden flex flex-col group hover:border-gold/30 transition-colors"
          >
            <div className="h-48 bg-[#111] relative border-b border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              <Video className="w-16 h-16 text-gold/80 z-10 drop-shadow-lg" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-3 py-1 bg-gold/10 text-gold rounded-full">Week 1 Recap</span>
                <span className="text-xs text-white/40 flex items-center gap-1"><Clock size={12}/> 45 min</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Mastering the Opening</h3>
              <p className="text-white/60 mb-6">Deep dive into Arrays and Strings. We analyze the top 3 optimal solutions from the community and break down the time/space complexity.</p>
              <button className="text-gold font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Watch Analysis <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/30 transition-colors">
                  {i % 2 === 0 ? <Code className="text-gold" /> : <BookOpen className="text-gold" />}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-gold transition-colors">Editorial: Valid Parentheses</h4>
                  <p className="text-sm text-white/50 line-clamp-2 mb-2">Understand the stack approach. Why it works and how to implement it cleanly in C++ and Python.</p>
                  <span className="text-xs font-mono text-gold/80">O(N) Time | O(N) Space</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Need to import Clock for Editorials since I used it above
import { Clock } from "lucide-react";
