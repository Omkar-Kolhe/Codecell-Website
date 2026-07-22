// app/leaderboard/page.tsx
"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays, Trophy } from "lucide-react";

export default function LeaderboardHubPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-xs font-mono text-[#8A8880] hover:text-[#D4AF37] transition-colors">
            <ChevronLeft size={14} />
            RETURN TO THE ARENA
          </button>
        </Link>
      </div>

      <div className="mb-12 border-b border-[#2A2A2A] pb-8 select-none">
        <span className="font-mono text-[10px] text-[#D4AF37] tracking-[0.2em] block mb-2">
          // GRANDMASTER_ARENA.RANKINGS
        </span>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F0EDE6] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          LEADERBOARD
        </h1>
        <p className="font-sans text-sm text-[#8A8880] mt-3 max-w-lg leading-relaxed">
          Choose a leaderboard to view. Weekly rankings reset every trial;
          season rankings track cumulative standing across the weeks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
        <Link href="/leaderboard/weekly">
          <button className="w-full h-full text-left bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#D4AF37]/60 transition-colors p-8 flex flex-col gap-4 group shadow-[0_0_10px_rgba(212,175,55,0.05)]">
            <CalendarDays size={22} className="text-[#D4AF37]" />
            <div>
              <h2 className="font-bold uppercase text-[#F0EDE6] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                Weekly Leaderboard
              </h2>
              <p className="font-sans text-xs text-[#8A8880] mt-2 leading-relaxed">
                Rankings for the current Weekly Trial, based on problems
                solved and score this week.
              </p>
            </div>
            <span className="mt-auto font-mono text-[10px] text-[#4A4A4A] group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
              VIEW RANKINGS <ChevronRight size={12} />
            </span>
          </button>
        </Link>

        <Link href="/leaderboard/season">
          <button className="w-full h-full text-left bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#D4AF37]/60 transition-colors p-8 flex flex-col gap-4 group shadow-[0_0_10px_rgba(212,175,55,0.05)]">
            <Trophy size={22} className="text-[#D4AF37]" />
            <div>
              <h2 className="font-bold uppercase text-[#F0EDE6] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                Season Leaderboard
              </h2>
              <p className="font-sans text-xs text-[#8A8880] mt-2 leading-relaxed">
                Cumulative standing across the full season, based on season
                XP and final rating.
              </p>
            </div>
            <span className="mt-auto font-mono text-[10px] text-[#4A4A4A] group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
              VIEW RANKINGS <ChevronRight size={12} />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}