"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const FEATURES = [
  {
    icon: "♟",
    subtitle: "PAWN",
    title: "Weekly DSA Problems",
    description: "Each week drops CP/DSA problems spanning Easy → Hard. Problems reset every Sunday. Your solutions are judged on runtime, memory, and correctness.",
    badge: "Problems / Week",
    highlightIcon: false
  },
  {
    icon: "♞",
    subtitle: "KNIGHT",
    title: "N-Queens Narrative",
    description: "This isn't a standard contest. You're challenged — each week with new constraint. Miss a placement and lose path bonus points. Survive all 8 weeks to claim checkmate.",
    badge: "Story-Driven",
    highlightIcon: true
  },
  {
    icon: "♛",
    subtitle: "QUEEN",
    title: "Live Leaderboard",
    description: "Rankings update in real-time after submission. Season score persists across all 8 weeks. Weekly rank resets every Sunday — fight for both crowns: the sprint and the season.",
    badge: "Real-Time Rankings",
    highlightIcon: true
  },
  {
    icon: "♜",
    subtitle: "ROOK",
    title: "Editorial Deep-Dives",
    description: "Every problem ships with a full editorial after the week closes. Annotated code, complexity analysis, the two approaches that almost worked — and why they failed.",
    badge: "Post-Week Analysis",
    highlightIcon: false
  },
  {
    icon: "♝",
    subtitle: "BISHOP",
    title: "Community & Discord",
    description: "Many coders across colleges. Channels split by problem difficulty and college. Weekly study groups, blind hints, and post-contest strategy threads.",
    badge: "Many Colleges",
    highlightIcon: true
  },
  {
    icon: "♚",
    subtitle: "KING",
    title: "Certificates & Prizes",
    description: "Top season finalists win prizes from the prize pool. Top participants who clears 8 weeks earns a certificate of excellence. No participation reward — earn it.",
    badge: "Cash Prizes",
    highlightIcon: true
  }
];

export function Overview() {
  return (
    <section id="what-to-expect" className="relative py-24 bg-[#02040A] overflow-hidden border-b border-[#eab308]/20">
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
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-gold font-mono text-sm tracking-widest uppercase">
            // WHAT_TO_EXPECT
          </span>
          <div className="h-[1px] w-24 md:w-64 bg-gradient-to-r from-gold/30 to-transparent" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0D10]/80 backdrop-blur-sm border border-[#2A2A2A] hover:border-gold/30 transition-colors p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded text-xl shrink-0">
                    <span className={feature.highlightIcon ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" : "text-[#7A7A7A]"}>
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8A8A8A] tracking-[0.2em] font-mono uppercase mb-1">
                      {feature.subtitle}
                    </div>
                    <h3 className={`${playfair.className} text-lg md:text-xl font-bold text-white leading-tight`}>
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-[#8A8A8A] text-[13px] md:text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div>
                <div className="inline-block px-3 py-1.5 border border-gold/20 bg-gold/5 text-gold font-mono text-[10px] tracking-wider uppercase rounded-sm">
                  {feature.badge}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
