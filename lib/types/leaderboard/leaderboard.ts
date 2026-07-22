// types/leaderboard.ts

export enum UserRole {
  TSEC = "TSEC",
  OTHER = "OTHER",
}

export interface AuthUser {
  id: number;
  role: UserRole;
  name: string;
}

export type LeaderboardTab = "TSEC" | "OTHER";

// ---- Weekly ----

export interface WeeklyLeaderboardEntry {
  rank: number;
  user_id: string;
  name: string;
  weekly_score: number;
  problems_solved: number;
}

export interface WeeklyLeaderboardResponse {
  week_id: string;
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
  data: WeeklyLeaderboardEntry[];
}

// ---- Season ----

export interface SeasonLeaderboardEntry {
  rank: number;
  user_id: number;
  name: string;
  season_xp: number;
  final_rating: number;
}

export interface SeasonLeaderboardResponse {
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
  data: SeasonLeaderboardEntry[];
}

export type LeaderboardKind = "weekly" | "season";