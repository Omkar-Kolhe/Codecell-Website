// components/LeaderboardTable.tsx
"use client";

import { useState } from "react";
import { Search, Crown, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface LeaderboardRow {
  rank: number;
  id: string | number;
  name: string;
  /** e.g. weekly_score or final_rating — shown as the big right-aligned number */
  primaryValue: number;
  primaryLabel: string;
  /** e.g. problems_solved or season_xp — shown as a secondary column */
  secondaryValue: number;
  secondaryLabel: string;
}

interface LeaderboardTableProps {
  title: string;
  eyebrow: string;
  description: string;
  rows: LeaderboardRow[];
  isLoading: boolean;
  error: string | null;
  forbidden: boolean;
  page: number;
  hasNext: boolean;
  onPageChange: (page: number) => void;
  /** rendered next to the title, e.g. the TSEC/Other toggle */
  controls?: React.ReactNode;
}

export default function LeaderboardTable({
  title,
  eyebrow,
  description,
  rows,
  isLoading,
  error,
  forbidden,
  page,
  hasNext,
  onPageChange,
  controls,
}: LeaderboardTableProps) {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = rows.slice(0, 3);
  const showPodium = search.length === 0 && page === 1 && top3.length === 3;
  const tableRows = search.length > 0 ? filteredRows : rows;

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2A] pb-8 select-none">
        <div>
          <span className="font-mono text-[10px] text-[#D4AF37] tracking-[0.2em] block mb-2">
            {eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F0EDE6] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            {title}
          </h1>
          <p className="font-sans text-sm text-[#8A8880] mt-3 max-w-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Podium — Top 3 */}
      {showPodium && (
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
              <span className="font-sans text-sm font-bold text-[#F0EDE6] text-center">
                {top3[1].name.split(" ")[0]}
              </span>
              <div className="mt-3 w-full bg-[#0A0A0A] border border-[#C0C0C0]/30 py-4 md:py-6 flex flex-col items-center">
                <span className="font-mono text-lg font-bold text-[#C0C0C0]">
                  {top3[1].primaryValue}
                </span>
                <span className="font-mono text-[9px] text-[#4A4A4A] mt-1">
                  {top3[1].primaryLabel}
                </span>
              </div>
            </div>

            {/* 1st Place (Gold) */}
            <div className="flex flex-col items-center -mt-6">
              <Crown size={24} className="text-[#D4AF37] mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/5 border-2 border-[#D4AF37]/70 flex items-center justify-center mb-3 relative shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">♚</span>
                <div className="absolute inset-0 rounded-full animate-ping bg-[#D4AF37]/10" />
              </div>
              <span className="font-sans text-sm font-bold text-[#D4AF37] text-center">
                {top3[0].name.split(" ")[0]}
              </span>
              <div className="mt-3 w-full bg-[#0A0A0A] border border-[#D4AF37]/50 py-6 md:py-8 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
                <span className="font-mono text-xl font-bold text-[#D4AF37] relative z-10">
                  {top3[0].primaryValue}
                </span>
                <span className="font-mono text-[9px] text-[#D4AF37]/60 mt-1 relative z-10">
                  {top3[0].primaryLabel}
                </span>
              </div>
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#CD7F32]/20 to-[#CD7F32]/5 border border-[#CD7F32]/50 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(205,127,50,0.15)]">
                <span className="font-serif text-xl font-bold text-[#CD7F32]">♘</span>
              </div>
              <span className="font-sans text-sm font-bold text-[#F0EDE6] text-center">
                {top3[2].name.split(" ")[0]}
              </span>
              <div className="mt-3 w-full bg-[#0A0A0A] border border-[#CD7F32]/30 py-3 md:py-5 flex flex-col items-center">
                <span className="font-mono text-lg font-bold text-[#CD7F32]">
                  {top3[2].primaryValue}
                </span>
                <span className="font-mono text-[9px] text-[#4A4A4A] mt-1">
                  {top3[2].primaryLabel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls: toggle & search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 select-none">
        {controls ?? <div />}

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

      {/* States: forbidden / error / loading */}
      {forbidden && (
        <div className="py-24 flex flex-col items-center justify-center text-center font-mono select-none border border-[#2A2A2A] bg-[#0A0A0A]">
          <Shield className="text-[#FF4D00] mb-4" size={32} />
          <span className="text-xs text-[#8A8880]">
            YOU DO NOT HAVE ACCESS TO THIS LEADERBOARD.
          </span>
        </div>
      )}

      {!forbidden && error && (
        <div className="py-24 flex flex-col items-center justify-center text-center font-mono select-none border border-[#2A2A2A] bg-[#0A0A0A]">
          <Shield className="text-[#FF4D00] mb-4" size={32} />
          <span className="text-xs text-[#8A8880]">{error.toUpperCase()}</span>
        </div>
      )}

      {!forbidden && !error && isLoading && (
        <div className="py-24 flex flex-col items-center justify-center text-center font-mono select-none border border-[#2A2A2A] bg-[#0A0A0A]">
          <span className="text-xs text-[#8A8880] animate-pulse">LOADING RANKINGS…</span>
        </div>
      )}

      {/* Rankings Table */}
      {!forbidden && !error && !isLoading && (
        <div className="bg-[#0A0A0A] border border-[#2A2A2A] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] bg-[#111111] text-[#8A8880] text-[11px] font-mono tracking-wider uppercase select-none">
                  <th className="py-4 pl-6 pr-4 font-normal w-16">Rank</th>
                  <th className="py-4 px-4 font-normal">Contestant</th>
                  <th className="py-4 px-4 font-normal text-right">
                    {rows[0]?.primaryLabel ?? "Score"}
                  </th>
                  <th className="py-4 px-4 font-normal text-right pr-6 hidden sm:table-cell">
                    {rows[0]?.secondaryLabel ?? "Detail"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => {
                  let rankColor = "text-[#8A8880]";
                  if (row.rank === 1) rankColor = "text-[#D4AF37]";
                  else if (row.rank === 2) rankColor = "text-[#C0C0C0]";
                  else if (row.rank === 3) rankColor = "text-[#CD7F32]";

                  return (
                    <tr
                      key={row.id}
                      className="border-b border-[#1A1A1A] hover:bg-[#111111] hover:border-[#D4AF37]/30 transition-colors duration-200 group"
                    >
                      <td className={`py-4 pl-6 pr-4 font-mono text-xs font-bold ${rankColor}`}>
                        <div className="flex items-center gap-2">
                          {row.rank <= 3 ? <Crown size={12} /> : null}#{row.rank}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0"
                            style={{
                              backgroundColor:
                                row.rank === 1
                                  ? "rgba(212,175,55,0.1)"
                                  : row.rank === 2
                                  ? "rgba(192,192,192,0.1)"
                                  : row.rank === 3
                                  ? "rgba(205,127,50,0.1)"
                                  : "rgba(255,255,255,0.05)",
                              color:
                                row.rank === 1
                                  ? "#D4AF37"
                                  : row.rank === 2
                                  ? "#C0C0C0"
                                  : row.rank === 3
                                  ? "#CD7F32"
                                  : "#8A8880",
                            }}
                          >
                            {row.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-[#F0EDE6] group-hover:text-[#D4AF37] transition-colors">
                            {row.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-mono text-sm font-bold text-[#F0EDE6]">
                          {row.primaryValue}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right pr-6 hidden sm:table-cell">
                        <span className="font-mono text-xs text-[#8A8880]">
                          {row.secondaryValue}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {tableRows.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center font-mono select-none">
              <Shield className="text-[#4A4A4A] mb-4" size={32} />
              <span className="text-xs text-[#8A8880]">NO GRANDMASTER FOUND.</span>
            </div>
          )}

          {/* Pagination */}
          {search.length === 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#2A2A2A] font-mono text-xs text-[#8A8880]">
              <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 disabled:opacity-30 hover:text-[#D4AF37] transition-colors"
              >
                <ChevronLeft size={14} /> PREV
              </button>
              <span>PAGE {page}</span>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNext}
                className="flex items-center gap-1 disabled:opacity-30 hover:text-[#D4AF37] transition-colors"
              >
                NEXT <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}