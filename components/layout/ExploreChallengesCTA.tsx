import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ExploreChallengesCTA({ variant = "default" }: { variant?: "default" | "large" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="inline-block"
    >
      <Link
        href="/challenges"
        className={`group relative inline-flex items-center gap-3 rounded-full glass-gold overflow-hidden
          ${variant === "large" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}
          font-medium tracking-wide text-foreground transition-all
          hover:border-[oklch(0.82_0.14_85/0.7)]
          hover:shadow-[0_0_40px_oklch(0.82_0.14_85/0.35),0_0_80px_oklch(0.82_0.14_85/0.15)]`}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[oklch(0.82_0.14_85/0.15)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span aria-hidden className="text-gold-gradient text-lg leading-none">♛</span>
        <span className="relative">Explore Challenges</span>
        <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
