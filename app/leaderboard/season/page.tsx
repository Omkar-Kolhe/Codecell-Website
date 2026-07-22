// app/leaderboard/season/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import LeaderboardToggle from "@/components/sections/leaderboard/LeaderboardToggle";
import LeaderboardTable, { LeaderboardRow } from "@/components/sections/leaderboard/LeaderboardTable";
import { SeasonLeaderboardResponse } from "@/lib/types/leaderboard/leaderboard";

export default function SeasonLeaderboardPage() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    error,
    forbidden,
    selectedTab,
    setSelectedTab,
    showToggle,
  } = useLeaderboard({ kind: "season", page, limit: 20 });

  const response = data as SeasonLeaderboardResponse | null;

  const rows: LeaderboardRow[] =
    response?.data.map((entry) => ({
      rank: entry.rank,
      id: entry.user_id,
      name: entry.name,
      primaryValue: entry.final_rating,
      primaryLabel: "FINAL RATING",
      secondaryValue: entry.season_xp,
      secondaryLabel: "SEASON XP",
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
        title="Season Leaderboard"
        eyebrow="// GRANDMASTER_ARENA.SEASON_STANDINGS"
        description="Cumulative standing across the full season, based on season XP and final ELO rating."
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