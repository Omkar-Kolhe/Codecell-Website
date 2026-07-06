"use client";

import { motion } from "framer-motion";

const TOP_PLAYERS = [
  { rank: 1, name: "CodeMaster", xp: 4500, solved: 15, chessRank: "Grandmaster", piece: "♛" },
  { rank: 2, name: "AlgoNinja", xp: 4200, solved: 14, chessRank: "King", piece: "♔" },
  { rank: 3, name: "DebugKing", xp: 4100, solved: 14, chessRank: "King", piece: "♔" },
  { rank: 4, name: "ByteQueen", xp: 3800, solved: 13, chessRank: "Queen", piece: "♕" },
  { rank: 5, name: "StackRook", xp: 3500, solved: 12, chessRank: "Rook", piece: "♖" },
  { rank: 6, name: "PointerBishop", xp: 3200, solved: 11, chessRank: "Bishop", piece: "♗" },
  { rank: 7, name: "HashKnight", xp: 2900, solved: 10, chessRank: "Knight", piece: "♘" },
];

export function Leaderboard() {
  return (
    <section id="leaderboard" className="relative py-32 bg-[#050505] overflow-hidden border-b border-[#eab308]/20">
      <div className="absolute inset-0 z-0 flex justify-center items-center opacity-5 pointer-events-none">
        <span className="text-[40rem] text-gold leading-none">♛</span>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 font-outfit uppercase tracking-wider"
          >
            Hall of <span className="text-gold text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-glow">Grandmasters</span>
          </motion.h2>
          <p className="text-white/60">The elite tacticians of the arena.</p>
        </div>

        {/* Podium for Top 3 */}
        <div className="flex justify-center items-end h-64 mb-16 gap-2 sm:gap-6">
          {/* Rank 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center w-28 sm:w-36"
          >
            <div className="text-center mb-4">
              <div className="text-3xl mb-2 drop-shadow-[0_0_10px_rgba(192,192,192,0.8)]">♔</div>
              <p className="font-bold truncate w-full text-white/90">{TOP_PLAYERS[1].name}</p>
              <p className="text-sm font-mono text-white/60">{TOP_PLAYERS[1].xp} XP</p>
            </div>
            <div className="w-full h-32 bg-gradient-to-t from-surface to-[#c0c0c0]/20 border-t-2 border-[#c0c0c0] rounded-t-lg relative flex justify-center">
              <span className="absolute top-4 text-[#c0c0c0] font-black text-2xl">2</span>
            </div>
          </motion.div>

          {/* Rank 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center w-32 sm:w-44 z-10"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,1)]">♛</div>
              <p className="font-bold text-lg text-gold truncate w-full">{TOP_PLAYERS[0].name}</p>
              <p className="text-sm font-mono text-gold/80">{TOP_PLAYERS[0].xp} XP</p>
            </div>
            <div className="w-full h-40 bg-gradient-to-t from-surface to-gold/30 border-t-2 border-gold rounded-t-lg relative flex justify-center shadow-[0_-10px_40px_rgba(212,175,55,0.2)]">
              <span className="absolute top-4 text-gold font-black text-3xl drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">1</span>
            </div>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center w-28 sm:w-36"
          >
            <div className="text-center mb-4">
              <div className="text-3xl mb-2 drop-shadow-[0_0_10px_rgba(205,127,50,0.8)]">♔</div>
              <p className="font-bold truncate w-full text-white/90">{TOP_PLAYERS[2].name}</p>
              <p className="text-sm font-mono text-white/60">{TOP_PLAYERS[2].xp} XP</p>
            </div>
            <div className="w-full h-24 bg-gradient-to-t from-surface to-[#cd7f32]/20 border-t-2 border-[#cd7f32] rounded-t-lg relative flex justify-center">
              <span className="absolute top-4 text-[#cd7f32] font-black text-2xl">3</span>
            </div>
          </motion.div>
        </div>

        {/* List for others */}
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/60 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Rank</th>
                <th className="p-4 font-medium">Player</th>
                <th className="p-4 font-medium hidden sm:table-cell">Chess Rank</th>
                <th className="p-4 font-medium text-right">Solved</th>
                <th className="p-4 font-medium text-right">XP</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PLAYERS.slice(3).map((player, index) => (
                <motion.tr 
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4 text-white/40 font-mono font-bold group-hover:text-gold transition-colors">{player.rank}</td>
                  <td className="p-4 font-bold">{player.name}</td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="flex items-center gap-2 text-white/70">
                      <span>{player.piece}</span> {player.chessRank}
                    </span>
                  </td>
                  <td className="p-4 text-right text-white/80">{player.solved}</td>
                  <td className="p-4 text-right font-mono font-semibold text-gold/90 group-hover:text-gold-glow transition-colors">{player.xp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center border-t border-white/5">
            <button className="text-gold hover:text-gold-glow text-sm font-semibold transition-colors">
              View Full Standings →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
