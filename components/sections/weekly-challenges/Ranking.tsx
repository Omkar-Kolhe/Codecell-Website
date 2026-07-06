"use client";

import { motion } from "framer-motion";

const RANKS = [
  { name: "Pawn", piece: "♙", xp: "0 - 500", desc: "The foundation of the board." },
  { name: "Knight", piece: "♘", xp: "501 - 1500", desc: "Learning to maneuver over obstacles." },
  { name: "Bishop", piece: "♗", xp: "1501 - 3000", desc: "Controlling the long diagonals." },
  { name: "Rook", piece: "♖", xp: "3001 - 5000", desc: "A pillar of strength and structure." },
  { name: "Queen", piece: "♕", xp: "5001 - 8000", desc: "Master of all directions." },
  { name: "King", piece: "♔", xp: "8001 - 12000", desc: "The leader of the board." },
  { name: "Grandmaster", piece: "♛", xp: "12000+", desc: "The ultimate tactician." },
];

export function Ranking() {
  return (
    <section className="relative py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 font-outfit uppercase tracking-wider text-white"
          >
            Progression System
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {RANKS.map((rank, i) => (
            <motion.div
              key={rank.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card w-40 p-6 flex flex-col items-center text-center group hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all"
            >
              <div className={`text-5xl mb-4 transition-transform group-hover:scale-110 group-hover:-translate-y-2 ${
                rank.name === 'Grandmaster' ? 'text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]' : 'text-white/80'
              }`}>
                {rank.piece}
              </div>
              <h4 className={`font-bold font-outfit mb-1 ${rank.name === 'Grandmaster' ? 'text-gold' : 'text-white'}`}>{rank.name}</h4>
              <p className="text-xs font-mono text-white/50">{rank.xp} XP</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
