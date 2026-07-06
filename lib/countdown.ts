import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calc = (target: Date): TimeLeft => {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export function useCountdown(target: Date): TimeLeft {
  // Start at zero on both server and first client render to avoid hydration mismatch.
  const [t, setT] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(calc(target));
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// Fixed launch target: 14 days from a stable epoch to avoid SSR drift
export const LAUNCH_DATE = new Date("2026-06-29T18:00:00Z");
