"use client";

import { motion } from "framer-motion";
import { Play, MessageSquare, Lightbulb, Lock } from "lucide-react";

const CURRENT_WEEK = 1;

const CHALLENGES = [
  { day: 1, title: "Two Sum", difficulty: "Easy", piece: "♙", status: "solved", xp: 10 },
  { day: 2, title: "Valid Parentheses", difficulty: "Easy", piece: "♙", status: "solved", xp: 10 },
  { day: 3, title: "Binary Search", difficulty: "Medium", piece: "♘", status: "open", xp: 20 },
  { day: 4, title: "Linked List Basics", difficulty: "Medium", piece: "♘", status: "locked", xp: 20 },
  { day: 5, title: "Hashing Challenge", difficulty: "Medium", piece: "♘", status: "locked", xp: 25 },
  { day: 6, title: "Mini Contest", difficulty: "Hard", piece: "♜", status: "locked", xp: 50 },
  { day: 7, title: "Editorial Release", difficulty: "Review", piece: "♚", status: "locked", xp: 0 },
];

export function Challenges() {
  return (
    <section id="challenges" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 font-outfit uppercase tracking-wider"
            >
              Current Board <span className="text-gold">Position</span>
            </motion.h2>
            <p className="text-white/60">Week {CURRENT_WEEK} Active: The Opening (Arrays & Strings)</p>
          </div>
          
          <div className="glass-card px-6 py-4 flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Your Rank</p>
              <p className="text-xl font-bold text-gold flex items-center gap-2">♙ Pawn</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Total XP</p>
              <p className="text-xl font-bold font-mono">120</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CHALLENGES.map((challenge, index) => {
            const isLocked = challenge.status === "locked";
            const isSolved = challenge.status === "solved";
            
            return (
              <motion.div
                key={challenge.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 flex flex-col relative overflow-hidden group ${
                  isLocked ? 'opacity-70' : 'hover:-translate-y-1 transition-transform duration-300 hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]'
                }`}
              >
                {/* Status Indicator */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  isSolved ? 'bg-green-500/50' : isLocked ? 'bg-white/10' : 'bg-gold/50'
                }`} />

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] ${
                      challenge.difficulty === 'Easy' ? 'text-white' : 
                      challenge.difficulty === 'Medium' ? 'text-blue-400' : 
                      challenge.difficulty === 'Hard' ? 'text-red-400' : 'text-gold'
                    }`}>
                      {challenge.piece}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Day {challenge.day}</span>
                  </div>
                  {isLocked && <Lock size={16} className="text-white/20" />}
                </div>

                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                
                <div className="flex items-center gap-3 mb-8">
                  <span className={`text-xs px-2 py-1 rounded-sm border ${
                    challenge.difficulty === 'Easy' ? 'border-white/20 text-white/60 bg-white/5' : 
                    challenge.difficulty === 'Medium' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 
                    challenge.difficulty === 'Hard' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 
                    'border-gold/30 text-gold bg-gold/10'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  {challenge.xp > 0 && <span className="text-xs font-mono text-gold/80">+{challenge.xp} XP</span>}
                </div>

                <div className="mt-auto grid grid-cols-3 gap-2">
                  <button disabled={isLocked} className={`col-span-3 mb-2 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-colors ${
                    isSolved ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    isLocked ? 'bg-white/5 text-white/20 cursor-not-allowed' :
                    'bg-gold text-black hover:bg-gold-glow'
                  }`}>
                    {isSolved ? '✓ Solved' : isLocked ? 'Locked' : <><Play size={16} /> Solve Now</>}
                  </button>
                  
                  <button disabled={isLocked} className="col-span-1.5 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Editorial">
                    <Lightbulb size={16} />
                  </button>
                  
                  <button disabled={isLocked} className="col-span-1.5 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Discussion">
                    <MessageSquare size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
