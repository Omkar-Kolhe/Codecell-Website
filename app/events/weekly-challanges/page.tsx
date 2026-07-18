import { Hero } from "@/components/sections/weekly-challenges/Hero";
import { Overview } from "@/components/sections/weekly-challenges/Overview";
import { Timeline } from "@/components/sections/weekly-challenges/Timeline";
import { Prizes } from "@/components/sections/weekly-challenges/Prizes";
import { FAQ } from "@/components/sections/weekly-challenges/FAQ";
import { FinalCTA } from "@/components/sections/weekly-challenges/FinalCTA";
import { getWeeks } from "@/lib/api-client";

export default async function Home() {
  let weeks: Awaited<ReturnType<typeof getWeeks>> = [];
  try {
    weeks = await getWeeks();
    weeks.sort((a, b) => a.week_number - b.week_number);
  } catch (err) {
    console.error("Failed to fetch weeks:", err);
  }

  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-gold/30 selection:text-gold-glow">
      <Hero />
      <Prizes />
      <Overview />
      <Timeline weeks={weeks} />
      <FAQ />
      <FinalCTA />
    </main>
  );
}