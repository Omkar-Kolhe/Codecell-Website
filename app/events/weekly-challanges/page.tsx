import { Hero } from "@/components/sections/weekly-challenges/Hero";
import { Overview } from "@/components/sections/weekly-challenges/Overview";
import { Timeline } from "@/components/sections/weekly-challenges/Timeline";
import { Prizes } from "@/components/sections/weekly-challenges/Prizes";
import { FAQ } from "@/components/sections/weekly-challenges/FAQ";
import { FinalCTA } from "@/components/sections/weekly-challenges/FinalCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-gold/30 selection:text-gold-glow">
      <Hero />
      <Prizes />
      <Overview />
      <Timeline />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
