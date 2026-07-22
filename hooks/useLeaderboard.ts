// hooks/useLeaderboard.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  LeaderboardKind,
  LeaderboardTab,
  SeasonLeaderboardResponse,
  UserRole,
  WeeklyLeaderboardResponse,
} from "@/lib/types/leaderboard/leaderboard"

interface UseLeaderboardOptions {
  kind: LeaderboardKind;
  page?: number;
  limit?: number;
  weekId?: string; // weekly only, omit for the currently active week
}

type LeaderboardResponse = WeeklyLeaderboardResponse | SeasonLeaderboardResponse;

interface UseLeaderboardResult {
  data: LeaderboardResponse | null;
  isLoading: boolean;
  error: string | null;
  /** true if the backend rejected a /tsec_student/* request with 403 */
  forbidden: boolean;
  /** "TSEC" | "OTHER" — currently selected leaderboard segment */
  selectedTab: LeaderboardTab;
  setSelectedTab: (tab: LeaderboardTab) => void;
  /** only true for authenticated TSEC users — controls toggle visibility */
  showToggle: boolean;
  refetch: () => void;
}

function buildEndpoint(
  kind: LeaderboardKind,
  role: UserRole | undefined,
  selectedTab: LeaderboardTab
) {
  const useTsecEndpoint = role === UserRole.TSEC && selectedTab === "TSEC";
  const audience = useTsecEndpoint ? "tsec_student" : "other";
  return `/${audience}/${kind}_leaderboard`;
}

/**
 * Fetches weekly or season leaderboard data.
 *
 * Defaults `selectedTab` to "OTHER" — every user sees the Other leaderboard
 * first. The TSEC toggle (and the tsec_student/* endpoint) only becomes
 * reachable once `showToggle` is true, i.e. once we've confirmed the user
 * is an authenticated TSEC student.
 */
export function useLeaderboard({
  kind,
  page = 1,
  limit = 20,
  weekId,
}: UseLeaderboardOptions): UseLeaderboardResult {
  const { user, isTsecStudent } = useAuth();

  const [selectedTab, setSelectedTab] = useState<LeaderboardTab>("OTHER");
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [refetchToken, setRefetchToken] = useState(0);

  const showToggle = isTsecStudent;

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setForbidden(false);

    //const endpoint = buildEndpoint(kind, user?.role, selectedTab);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const endpoint = `${API_BASE}${buildEndpoint(kind, user?.role, selectedTab)}`;

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (kind === "weekly" && weekId) {
      params.set("week_id", weekId);
    }

    try {
      const res = await fetch(`${endpoint}?${params.toString()}`, {
        credentials: "include",
      });

      if (res.status === 403) {
        setForbidden(true);
        setData(null);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to load leaderboard (${res.status})`);
      }

      const json: LeaderboardResponse = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leaderboard");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [kind, user?.role, selectedTab, page, limit, weekId]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard, refetchToken]);

  // Non-TSEC users can never end up pointed at the TSEC tab, even if state
  // somehow got set that way (e.g. role resolves after an optimistic toggle).
  useEffect(() => {
    if (!showToggle && selectedTab === "TSEC") {
      setSelectedTab("OTHER");
    }
  }, [showToggle, selectedTab]);

  return {
    data,
    isLoading,
    error,
    forbidden,
    selectedTab,
    setSelectedTab,
    showToggle,
    refetch: () => setRefetchToken((t) => t + 1),
  };
}