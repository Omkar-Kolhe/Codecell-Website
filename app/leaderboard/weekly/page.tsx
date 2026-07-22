// app/leaderboard/weekly/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import LeaderboardToggle from "@/components/sections/leaderboard/LeaderboardToggle";
import LeaderboardTable, { LeaderboardRow } from "@/components/sections/leaderboard/LeaderboardTable";
import { SeasonLeaderboardResponse, WeeklyLeaderboardResponse } from "@/lib/types/leaderboard/leaderboard";

export default function WeeklyLeaderboardPage() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    error,
    forbidden,
    selectedTab,
    setSelectedTab,
    showToggle,
  } = useLeaderboard({ kind: "weekly", page, limit: 20 });

  const response = data as WeeklyLeaderboardResponse | null;

  const rows: LeaderboardRow[] =
    response?.data.map((entry) => ({
      rank: entry.rank,
      id: entry.user_id,
      name: entry.name,
      primaryValue: entry.weekly_score,
      primaryLabel: "WEEKLY SCORE",
      secondaryValue: entry.problems_solved,
      secondaryLabel: "SOLVED",
    })) ?? [];

  return (
    <>
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-12">
        <Link href="/leaderboard">
          <button className="flex items-center gap-2 text-xs font-mono text-[#8A8880] hover:text-[#D4AF37] transition-colors mb-2">
            <ChevronLeft size={14} />
            BACK TO LEADERBOARDS
          </button>
        </Link>
      </div>

      <LeaderboardTable
        title="Weekly Leaderboard"
        eyebrow="// GRANDMASTER_ARENA.WEEKLY_TRIAL"
        description="Rankings update after each match based on difficulty, execution speed, and tactical accuracy this week."
        rows={rows}
        isLoading={isLoading}
        error={error}
        forbidden={forbidden}
        page={page}
        hasNext={response?.has_next ?? false}
        onPageChange={setPage}
        controls={
          <LeaderboardToggle
            show={showToggle}
            selectedTab={selectedTab}
            onChange={(tab) => {
              setSelectedTab(tab);
              setPage(1);
            }}
          />
        }
      />
    </>
  );
}