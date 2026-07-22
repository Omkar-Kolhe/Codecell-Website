// components/LeaderboardToggle.tsx
"use client";

import { LeaderboardTab } from "@/lib/types/leaderboard/leaderboard"

interface LeaderboardToggleProps {
  show: boolean;
  selectedTab: LeaderboardTab;
  onChange: (tab: LeaderboardTab) => void;
}

/**
 * TSEC / Other segmented control.
 * Renders nothing when `show` is false — Other students never see this,
 * and it stays hidden for TSEC users until their role has been confirmed.
 */
export default function LeaderboardToggle({
  show,
  selectedTab,
  onChange,
}: LeaderboardToggleProps) {
  if (!show) return null;

  return (
    <div className="flex gap-2 font-mono text-xs select-none">
      <button
        onClick={() => onChange("TSEC")}
        aria-pressed={selectedTab === "TSEC"}
        className={`px-5 py-2.5 font-bold tracking-widest transition-colors shadow-[0_0_10px_rgba(212,175,55,0.1)] ${
          selectedTab === "TSEC"
            ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]"
            : "bg-[#0A0A0A] text-[#8A8880] border border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/50"
        }`}
      >
        TSEC
      </button>
      <button
        onClick={() => onChange("OTHER")}
        aria-pressed={selectedTab === "OTHER"}
        className={`px-5 py-2.5 font-bold tracking-widest transition-colors shadow-[0_0_10px_rgba(212,175,55,0.1)] ${
          selectedTab === "OTHER"
            ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]"
            : "bg-[#0A0A0A] text-[#8A8880] border border-[#2A2A2A] hover:text-[#D4AF37] hover:border-[#D4AF37]/50"
        }`}
      >
        OTHER
      </button>
    </div>
  );
}