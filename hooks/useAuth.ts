// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { AuthUser, UserRole } from "@/lib/types/leaderboard/leaderboard";


interface UseAuthResult {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  /** true only when the authenticated user's role is TSEC */
  isTsecStudent: boolean;
}

/**
 * Reads the current authenticated user and derives `isTsecStudent`.
 *
 * Wire this up to however auth already works in the app:
 *  - If you have a session/JWT cookie, point `fetch` at your "/me" endpoint.
 *  - If you already have an AuthContext / NextAuth session elsewhere,
 *    swap the body of this hook to read from that instead of fetching.
 *
 * Defaults to `isTsecStudent: false` while loading and on any error, so
 * the TSEC toggle never flashes visible before we actually know the role
 * — the leaderboard silently falls back to the "Other" endpoints.
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Failed to load session (${res.status})`);
        }

        const data: AuthUser = await res.json();
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setUser(null);
          setError(err instanceof Error ? err.message : "Failed to load session");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const isTsecStudent = !isLoading && user?.role === UserRole.TSEC;

  return { user, isLoading, error, isTsecStudent };
}