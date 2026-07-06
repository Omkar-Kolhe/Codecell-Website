import { motion } from "framer-motion";
import { useCountdown } from "@/lib/countdown";

const cell =
  "glass-gold flex flex-col items-center justify-center rounded-2xl px-4 py-5 sm:px-6 sm:py-7 min-w-[78px] sm:min-w-[110px]";

export function Countdown({ target, size = "lg" }: { target: Date; size?: "lg" | "sm" }) {
  const t = useCountdown(target);
  const units: Array<[string, number]> = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];
  return (
    <div className={`flex gap-2 sm:gap-3 ${size === "sm" ? "scale-90" : ""}`}>
      {units.map(([label, value], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.6, ease: "easeOut" }}
          className={cell}
        >
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-5xl text-gold-gradient tabular-nums leading-none"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
          <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
