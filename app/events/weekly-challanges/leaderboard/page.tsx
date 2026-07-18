"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Crown, Terminal, ChevronLeft, Flame, TrendingUp, TrendingDown, Minus, Shield } from "lucide-react";
import { motion } from "framer-motion";

const rankings = [
  { rank: 1, name: "Ayush Mehrotra", points: 2850, solved: 151, accuracy: "100%", trend: "up", handle: "@ayush_m", streak: 28 },
  { rank: 2, name: "Rohan Chawla", points: 2740, solved: 148, accuracy: "98%", trend: "up", handle: "@rohan_c", streak: 21 },
  { rank: 3, name: "Sneha Kulkarni", points: 2610, solved: 142, accuracy: "95%", trend: "same", handle: "@sneha_k", streak: 14 },
  { rank: 4, name: "Kabir Mehta", points: 2550, solved: 139, accuracy: "93%", trend: "down", handle: "@kabir_m", streak: 9 },
  { rank: 5, name: "Divya Shah", points: 2495, solved: 135, accuracy: "91%", trend: "up", handle: "@divya_s", streak: 12 },
  { rank: 6, name: "Pranav Iyer", points: 2380, solved: 128, accuracy: "89%", trend: "same", handle: "@pranav_i", streak: 7 },
  { rank: 7, name: "Ananya Sharma", points: 2310, solved: 125, accuracy: "88%", trend: "down", handle: "@ananya_s", streak: 5 },
  { rank: 8, name: "Vikram Malhotra", points: 2250, solved: 121, accuracy: "85%", trend: "up", handle: "@vikram_m", streak: 11 },
  { rank: 9, name: "Riya Sen", points: 2180, solved: 118, accuracy: "84%", trend: "up", handle: "@riya_s", streak: 8 },
  { rank: 10, name: "Aditya Roy", points: 2100, solved: 114, accuracy: "81%", trend: "down", handle: "@aditya_r", streak: 3 },
  { rank: 11, name: "Meera Nair", points: 2020, solved: 109, accuracy: "79%", trend: "same", handle: "@meera_n", streak: 6 },
  { rank: 12, name: "Siddharth Jain", points: 1950, solved: 105, accuracy: "78%", trend: "up", handle: "@siddharth_j", streak: 4 },
];

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"global" | "contest">("global");

  const filteredRankings = rankings.filter(
    (coder) =>
      coder.name.toLowerCase().includes(search.toLowerCase()) ||
      coder.handle.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = rankings.slice(0, 3);
  const rest = filteredRankings.filter((r) => r.rank > 3 || search.length > 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col">
      {/* Back to Challenges */}
      <div className="mb-8">
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-xs font-mono text-[#8A8880] hover:text-[#D4AF37] transition-colors">
            <ChevronLeft size={14} />
            RETURN TO THE ARENA
          </button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2A] pb-8 select-none">
        <div>
          <span className="font-mono text-[10px] text-[#D4AF37] tracking-[0.2em] block mb-2">
            // GRANDMASTER_ARENA.RANKINGS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F0EDE6] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            HALL OF KINGS
          </h1>
          <p className="font-sans text-sm text-[#8A8880] mt-3 max-w-lg leading-relaxed">
            Track top grandmasters across all Weekly Trials. Rankings update after each match based on difficulty, execution speed, and tactical accuracy.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="flex gap-8 font-mono text-xs">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#4A4A4A] uppercase mb-1">OPERATIVES</span>
            <span className="text-[#F0EDE6] font-bold text-xl">500+</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#4A4A4A] uppercase mb-1">AVG ACCURACY</span>
            <span className="text-[#D4AF37] font-bold text-xl">84.2%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#4A4A4A] uppercase mb-1">TRIALS</span>
            <span className="text-[#D4AF37] font-bold text-xl">48</span>
          </div>
        </div>
      </div>

      {/* Podium — Top 3 */}
      {search.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="grid grid-cols-3 gap-4 md:gap-6 items-end max-w-2xl mx-auto">
            {/* 2nd Place (Silver) */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#C0C0C0]/20 to-[#C0C0C0]/5 border border-[#C0C0C0]/50 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(192,192,192,0.15)]">
                <span className="font-serif text-xl font-bold text-[#C0C0C0]">♕</span>
              </div>
              <span className="font-sans text-sm font-bold text-[#F0EDE6] text-center">{top3[1].name.split(" ")[0]}</span>
              <span className="font-mono text-[10px] text-[#4A4A4A] mt-0.5">{top3[1].handle}</span>
              <div className="mt-3 w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 py-4 md:py-6 flex flex-col items-center">
                <span className="font-mono text-lg font-bold text-[#C0C0C0]">{top3[1].points}</span>
                <span className="font-mono text-[9px] text-[#4A4A4A] mt-1">ELO RATING</span>
              </div>
            </div>

            {/* 1st Place (Gold) */}
            <div className="flex flex-col items-center -mt-6">
              <Crown size={24} className="text-[#D4AF37] mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/5 border-2 border-[#D4AF37]/70 flex items-center justify-center mb-3 relative shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">♚</span>
                <div className="absolute inset-0 rounded-full animate-ping bg-[#D4AF37]/10" />
              </div>
              <span className="font-sans text-sm font-bold text-[#D4AF37] text-center">{top3[0].name.split(" ")[0]}</span>
              <span className="font-mono text-[10px] text-[#D4AF37]/60 mt-0.5">{top3[0].handle}</span>
              <div className="mt-3 w-full bg-[#0A0A0A] border border-[#D4AF37]/50 py-6 md:py-8 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
                <span className="font-mono text-xl font-bold text-[#D4AF37] relative z-10">{top3[0].points}</span>
                <span className="font-mono text-[9px] text-[#D4AF37]/60 mt-1 relative z-10">ELO RATING</span>
              </div>
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#CD7F32]/20 to-[#CD7F32]/5 border border-[#CD7F32]/50 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(205,127,50,0.15)]">
                <span className="font-serif text-xl font-bold text-[#CD7F32]">♘</span>
              </div>
              <span className="font-sans text-sm font-bold text-[#F0EDE6] text-center">{top3[2].name.split(" ")[0]}</span>
              <span className="font-mono text-[10px] text-[#4A4A4A] mt-0.5">{top3[2].handle}</span>
              <div className="mt-3 w-full bg-[#0A0A0A] border border-[#CD7F32]/30 py-3 md:py-5 flex flex-col items-center">
                <span className="font-mono text-lg font-bold text-[#CD7F32]">{top3[2].points}</span>
                <span className="font-mono text-[9px] text-[#4A4A4A] mt-1">ELO RATING</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls: Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 select-none">
        {/* Tabs */}
        <div className="flex gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("global")}
            className={`px-5 py-2.5 font-bold tracking-widest transition-colors shadow-[0_0_10px_rgba(212,175,55,0.1)] ${
              activeTab === "global"
                ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]"
                : "bg-[#0A0A0A] text-[#8A8880] border border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/50"
            }`}
          >
            GLOBAL ELO
          </button>
          <button
            onClick={() => setActiveTab("contest")}
            className={`px-5 py-2.5 font-bold tracking-widest transition-colors shadow-[0_0_10px_rgba(212,175,55,0.1)] ${
              activeTab === "contest"
                ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]"
                : "bg-[#0A0A0A] text-[#8A8880] border border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/50"
            }`}
          >
            TRIAL #48
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search grandmaster..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-2.5 pl-10 text-xs text-[#F0EDE6] focus:outline-none focus:border-[#D4AF37] font-mono shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
          />
          <Search size={14} className="absolute left-3.5 top-3 text-[#8A8880]" />
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-[#0A0A0A] border border-[#2A2A2A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#111111] text-[#8A8880] text-[11px] font-mono tracking-wider uppercase select-none">
                <th className="py-4 pl-6 pr-4 font-normal w-16">Rank</th>
                <th className="py-4 px-4 font-normal">Contestant</th>
                <th className="py-4 px-4 font-normal text-right">Rating</th>
                <th className="py-4 px-4 font-normal text-center hidden md:table-cell">Solved</th>
                <th className="py-4 px-4 font-normal text-center hidden lg:table-cell">Streak</th>
                <th className="py-4 px-4 font-normal text-center hidden sm:table-cell">Trend</th>
                <th className="py-4 px-4 font-normal text-right pr-6 hidden sm:table-cell">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {(search.length > 0 ? filteredRankings : rest.length > 0 ? rest : filteredRankings).map((coder) => {
                let rankColor = "text-[#8A8880]";
                if (coder.rank === 1) rankColor = "text-[#D4AF37]";
                else if (coder.rank === 2) rankColor = "text-[#C0C0C0]";
                else if (coder.rank === 3) rankColor = "text-[#CD7F32]";

                return (
                  <tr
                    key={coder.rank}
                    className="border-b border-[#1A1A1A] hover:bg-[#111111] hover:border-[#D4AF37]/30 transition-colors duration-200 group"
                  >
                    <td className={`py-4 pl-6 pr-4 font-mono text-xs font-bold ${rankColor}`}>
                      <div className="flex items-center gap-2">
                        {coder.rank <= 3 ? <Crown size={12} /> : null}
                        #{coder.rank}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar circle */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0"
                          style={{
                            backgroundColor: coder.rank === 1 ? "rgba(212,175,55,0.1)" : coder.rank === 2 ? "rgba(192,192,192,0.1)" : coder.rank === 3 ? "rgba(205,127,50,0.1)" : "rgba(255,255,255,0.05)",
                            color: coder.rank === 1 ? "#D4AF37" : coder.rank === 2 ? "#C0C0C0" : coder.rank === 3 ? "#CD7F32" : "#8A8880",
                          }}
                        >
                          {coder.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#F0EDE6] group-hover:text-[#D4AF37] transition-colors">
                            {coder.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#4A4A4A]">{coder.handle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono text-sm font-bold text-[#F0EDE6]">{coder.points}</span>
                    </td>
                    <td className="py-4 px-4 text-center hidden md:table-cell">
                      <span className="font-mono text-xs text-[#8A8880]">{coder.solved}</span>
                    </td>
                    <td className="py-4 px-4 text-center hidden lg:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <Flame size={12} className={coder.streak >= 14 ? "text-[#FF4D00]" : coder.streak >= 7 ? "text-[#D4AF37]" : "text-[#4A4A4A]"} />
                        <span className={`font-mono text-xs font-bold ${coder.streak >= 14 ? "text-[#FF4D00]" : coder.streak >= 7 ? "text-[#D4AF37]" : "text-[#8A8880]"}`}>
                          {coder.streak}d
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center hidden sm:table-cell">
                      {coder.trend === "up" && <TrendingUp size={14} className="text-[#D4AF37] mx-auto" />}
                      {coder.trend === "down" && <TrendingDown size={14} className="text-[#FF4D00] mx-auto" />}
                      {coder.trend === "same" && <Minus size={14} className="text-[#4A4A4A] mx-auto" />}
                    </td>
                    <td className="py-4 px-4 text-right pr-6 hidden sm:table-cell">
                      <span className="font-mono text-xs text-[#8A8880]">{coder.accuracy}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRankings.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center font-mono select-none">
            <Shield className="text-[#4A4A4A] mb-4" size={32} />
            <span className="text-xs text-[#8A8880]">NO GRANDMASTER FOUND.</span>
          </div>
        )}
      </div>
    </div>
  );
}