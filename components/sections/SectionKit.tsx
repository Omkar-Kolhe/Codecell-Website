"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type HTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1400;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = p * (2 - p);
      setDisplayValue(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(tick);
      else setDisplayValue(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function SectionHeader({
  index,
  title,
  subtitle,
  align = "left",
}: {
  index: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center mx-auto max-w-3xl" : ""}`}
    >
      <span className="text-label-tag text-[#4BE2C4] block mb-4 tracking-[0.2em]">
        {index}
      </span>
      <h2 className="text-h1-scale font-bold uppercase tracking-tight text-[#F0EDE6]">
        {title}
      </h2>
      <p className="text-mono-body text-[#8A8880] mt-4">{subtitle}</p>
    </motion.header>
  );
}

export function SectionWrap({
  id,
  children,
  className = "",
  narrow = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 border-b border-[#222222]/80 ${className}`}
    >
      <div
        className={`mx-auto px-6 md:px-12 lg:px-16 ${narrow ? "max-w-4xl" : "max-w-7xl"}`}
      >
        {children}
      </div>
    </section>
  );
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  ...props
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass-card ${hover ? "glass-card-hover" : ""} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function HexButton({ href, label = "CRUSH CHALLENGES" }: { href: string; label?: string }) {
  return (
    <Link href={href} className="relative group block w-fit">
      <div
        className="relative bg-transparent p-[1.5px] drop-shadow-[0_0_15px_rgba(75,226,196,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(232,255,0,0.45)]"
        style={{
          clipPath:
            "polygon(16px 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0% 50%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#4BE2C4] via-[#00B4D8] to-[#E8FF00] opacity-90 group-hover:opacity-100 transition-opacity" />
        <div
          className="relative bg-[#0D0D0D] px-10 md:px-12 py-3 font-mono text-xs md:text-sm font-black tracking-[0.18em] text-[#4BE2C4] transition-all duration-300 group-hover:text-[#0D0D0D] group-hover:bg-gradient-to-r group-hover:from-[#4BE2C4] group-hover:to-[#E8FF00] uppercase"
          style={{
            clipPath:
              "polygon(15.5px 0%, calc(100% - 15.5px) 0%, 100% 50%, calc(100% - 15.5px) 100%, 15.5px 100%, 0% 50%)",
          }}
        >
          {label}
        </div>
      </div>
    </Link>
  );
}

export type FaqItem = { q: string; a: string };

export function PremiumFaq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard hover={false} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span className="font-mono text-[10px] text-[#3E3E3C] pt-1 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm md:text-base font-semibold text-[#F0EDE6] group-hover:text-[#E8FF00] transition-colors">
                    {faq.q}
                  </span>
                </div>
                <span
                  className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#2E2E2E] bg-[#161616]/80 transition-all duration-300 ${isOpen ? "rotate-180 border-[#4BE2C4]/40 text-[#E8FF00]" : "text-[#8A8880]"
                    }`}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="h-px bg-gradient-to-r from-[#4BE2C4]/40 via-[#E8FF00]/20 to-transparent mb-4 ml-9" />
                      <p className="text-sm text-[#8A8880] leading-relaxed pl-9">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}

export function BentoMotion({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
