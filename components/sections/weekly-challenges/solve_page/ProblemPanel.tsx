"use client";

/**
 * ProblemPanel
 * ------------
 * A left-side panel that renders the response of GET /api/problems/{problemId}.
 *
 * Usage — pass data you already fetched:
 *   <ProblemPanel problem={problemData} />
 *
 * Usage — let the panel fetch it for you:
 *   <ProblemPanel problemId="11111111-1111-1111-1111-111111111111" />
 *
 * Usage — custom fetch base (e.g. different API host):
 *   <ProblemPanel problemId={id} apiBaseUrl="https://api.example.com" />
 */

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  MemoryStick,
  Trophy,
  ChevronDown,
  Copy,
  Check,
  Tag as TagIcon,
} from "lucide-react";
import type {
  ProblemDetail,
  ProblemExample,
  APIResponse,
} from "@/lib/types/problem";

// ---------------------------------------------------------------------------
// Public props
// ---------------------------------------------------------------------------

interface ProblemPanelProps {
  /** Fully-loaded problem data. Skips fetching entirely if provided. */
  problem?: ProblemDetail;
  /** Problem id to fetch from the API. Ignored if `problem` is provided. */
  problemId?: string;
  /** Base URL to prefix onto /api/problems/{id}. Defaults to same-origin. */
  apiBaseUrl?: string;
  /** Extra class names for the outer panel. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Design tokens (kept local so the component ports cleanly between projects)
// ---------------------------------------------------------------------------

const tokens = {
  bg: "#0A0A0A",
  panel: "#0D0D0C",
  border: "rgba(201,169,97,0.14)",
  gold: "#C9A961",
  goldBright: "#E4C368",
  ink: "#F2F0EA",
  muted: "#87847C",
  green: "#3FA66E",
  red: "#C9605A",
};

const difficultyColor = (difficulty: string) => {
  const d = difficulty.toUpperCase();
  if (d === "EASY") return tokens.green;
  if (d === "HARD") return tokens.red;
  return tokens.gold; // MEDIUM or unknown
};

// Small pawn glyph — the one signature nod to the chess motif, used sparingly.
const PawnGlyph = ({ color }: { color: string }) => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
    <path
      d="M6 0.5C7.10457 0.5 8 1.39543 8 2.5C8 3.05228 7.77614 3.55228 7.41421 3.91421C8.35543 4.35335 9 5.30231 9 6.4C9 7.03816 8.77716 7.62537 8.40706 8.08761C9.35314 8.68123 10 9.75894 10 11C10 11.5 10 12 9.5 12H2.5C2 12 2 11.5 2 11C2 9.75894 2.64686 8.68123 3.59294 8.08761C3.22284 7.62537 3 7.03816 3 6.4C3 5.30231 3.64457 4.35335 4.58579 3.91421C4.22386 3.55228 4 3.05228 4 2.5C4 1.39543 4.89543 0.5 6 0.5Z"
      fill={color}
    />
    <rect x="1" y="12.5" width="10" height="1.2" rx="0.4" fill={color} />
  </svg>
);

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5"
      style={{
        border: `1px solid ${tokens.border}`,
        color: tokens.muted,
      }}
    >
      <span style={{ color: tokens.gold }}>{icon}</span>
      <span className="text-[11px] tracking-wide" style={{ fontFamily: "ui-monospace, monospace" }}>
        {label}
      </span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <PawnGlyph color={tokens.gold} />
        <h3
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: tokens.gold }}
        >
          {title}
        </h3>
      </div>
      <div
        className="text-[13.5px] leading-relaxed"
        style={{ color: tokens.ink, opacity: 0.9 }}
      >
        {children}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {
          // clipboard access denied — fail silently, nothing to recover
        }
      }}
      className="flex items-center gap-1 rounded px-1.5 py-1 text-[10px] uppercase tracking-wide transition-colors"
      style={{ color: copied ? tokens.green : tokens.muted }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ExampleCard({ example, index }: { example: ProblemExample; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: `1px solid ${tokens.border}` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5"
        style={{ background: "rgba(201,169,97,0.05)" }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: tokens.ink }}
        >
          Example {index + 1}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronDown size={14} style={{ color: tokens.muted }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-col gap-2.5 px-3 pb-3 pt-1">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: tokens.muted }}>
                    Input
                  </span>
                  <CopyButton text={example.input} />
                </div>
                <pre
                  className="whitespace-pre-wrap break-words rounded-md px-2.5 py-2 text-[12px]"
                  style={{
                    background: tokens.bg,
                    color: tokens.ink,
                    fontFamily: "ui-monospace, monospace",
                    border: `1px solid ${tokens.border}`,
                  }}
                >
                  {example.input || "\u2014"}
                </pre>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: tokens.muted }}>
                    Output
                  </span>
                  <CopyButton text={example.output} />
                </div>
                <pre
                  className="whitespace-pre-wrap break-words rounded-md px-2.5 py-2 text-[12px]"
                  style={{
                    background: tokens.bg,
                    color: tokens.ink,
                    fontFamily: "ui-monospace, monospace",
                    border: `1px solid ${tokens.border}`,
                  }}
                >
                  {example.output || "\u2014"}
                </pre>
              </div>

              {example.explanation && (
                <div>
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: tokens.muted }}>
                    Explanation
                  </span>
                  <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: tokens.ink, opacity: 0.85 }}>
                    {example.explanation}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading / error states
// ---------------------------------------------------------------------------

function PanelSkeleton() {
  const bar = (w: string) => (
    <div
      className="h-3 rounded animate-pulse"
      style={{ width: w, background: "rgba(201,169,97,0.10)" }}
    />
  );
  return (
    <div className="flex flex-col gap-4 p-6">
      {bar("40%")}
      {bar("70%")}
      <div className="flex gap-2 pt-2">
        {bar("28%")}
        {bar("28%")}
        {bar("28%")}
      </div>
      <div className="pt-4 flex flex-col gap-2">
        {bar("100%")}
        {bar("95%")}
        {bar("85%")}
      </div>
    </div>
  );
}

function PanelError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-start gap-2 p-6">
      <span className="text-[11px] uppercase tracking-wide" style={{ color: tokens.red }}>
        Could not load problem
      </span>
      <p className="text-[13px]" style={{ color: tokens.muted }}>
        {message}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const DEFAULT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

if (!DEFAULT_API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined. Check your .env.local file."
  );
}

export default function ProblemPanel({
  problem: problemProp,
  problemId,
  apiBaseUrl = DEFAULT_API_BASE_URL,
  className = "",
}: ProblemPanelProps) {
  const [problem, setProblem] = useState<ProblemDetail | null>(problemProp ?? null);
  const [loading, setLoading] = useState<boolean>(!problemProp && !!problemId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (problemProp || !problemId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    axios
      .get<APIResponse<ProblemDetail>>(
        `${apiBaseUrl.replace(/\/$/, "")}/api/problems/${problemId}`
      )
      .then((res) => {
        if (cancelled) return;
        if (res.data.success) {
          setProblem(res.data.data);
        } else {
          setError(res.data.error.message);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err?.response?.data?.error?.message ??
            err?.message ??
            "Something went wrong fetching this problem."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [problemId, problemProp, apiBaseUrl]);

  const defaultLanguage = useMemo(
    () => problem?.languages?.[0]?.language,
    [problem]
  );
  const [activeLanguage, setActiveLanguage] = useState<string | undefined>(defaultLanguage);

  useEffect(() => {
    setActiveLanguage(defaultLanguage);
  }, [defaultLanguage]);

  return (
    <aside
      className={`flex h-full w-[45vw] max-w-[700px] min-w-[500px] shrink-0 flex-col overflow-y-auto ${className}`}
      style={{
        background: tokens.panel,
        borderRight: `1px solid ${tokens.border}`,
      }}
    >
      {loading && <PanelSkeleton />}
      {!loading && error && <PanelError message={error} />}

      {!loading && !error && problem && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col gap-6 p-6"
        >
          {/* Title + difficulty */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PawnGlyph color={difficultyColor(problem.difficulty)} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: difficultyColor(problem.difficulty) }}
              >
                {problem.difficulty}
              </span>
            </div>
            <h1
              className="text-[26px] font-bold leading-tight"
              style={{
                color: tokens.ink,
                fontFamily:
                  "Georgia, 'Playfair Display', 'Times New Roman', serif",
              }}
            >
              {problem.title}
            </h1>
          </div>

          {/* Stat row */}
          <div className="flex flex-wrap gap-2">
            <StatChip icon={<Clock size={12} />} label={`${problem.timeLimitMs} ms`} />
            <StatChip icon={<MemoryStick size={12} />} label={`${problem.memoryLimitMb} MB`} />
            <StatChip icon={<Trophy size={12} />} label={`${problem.maxScore} pts`} />
          </div>

          {/* Tags */}
          {problem.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <TagIcon size={12} style={{ color: tokens.muted }} />
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-[10.5px] tracking-wide"
                  style={{
                    color: tokens.gold,
                    border: `1px solid ${tokens.border}`,
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ borderTop: `1px solid ${tokens.border}` }} />

          {/* Description */}
          <Section title="Description">
            <p className="whitespace-pre-line">{problem.description}</p>
          </Section>

          {/* Input / Output format */}
          {(problem.inputFormat || problem.outputFormat) && (
            <div className="grid grid-cols-1 gap-4">
              {problem.inputFormat && (
                <Section title="Input Format">
                  <p className="whitespace-pre-line">{problem.inputFormat}</p>
                </Section>
              )}
              {problem.outputFormat && (
                <Section title="Output Format">
                  <p className="whitespace-pre-line">{problem.outputFormat}</p>
                </Section>
              )}
            </div>
          )}

          {/* Constraints */}
          {problem.constraints && (
            <Section title="Constraints">
              <p
                className="whitespace-pre-line text-[12.5px]"
                style={{ fontFamily: "ui-monospace, monospace", color: tokens.muted }}
              >
                {problem.constraints}
              </p>
            </Section>
          )}

          {/* Examples */}
          {problem.examples.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <PawnGlyph color={tokens.gold} />
                <h3
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: tokens.gold }}
                >
                  Examples
                </h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {problem.examples.map((ex, i) => (
                  <ExampleCard key={i} example={ex} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {problem.languages.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <PawnGlyph color={tokens.gold} />
                <h3
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: tokens.gold }}
                >
                  Starter Code
                </h3>
              </div>

              <Tabs.Root value={activeLanguage} onValueChange={setActiveLanguage}>
                <Tabs.List className="flex gap-1 rounded-md p-1" style={{ background: tokens.bg }}>
                  {problem.languages.map((lang) => (
                    <Tabs.Trigger
                      key={lang.language}
                      value={lang.language}
                      className="rounded px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors data-[state=active]:bg-[#17140d]"
                      style={{
                        fontFamily: "ui-monospace, monospace",
                        color: lang.language === activeLanguage ? tokens.goldBright : tokens.muted,
                      }}
                    >
                      {lang.language}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                {problem.languages.map((lang) => (
                  <Tabs.Content key={lang.language} value={lang.language} className="mt-2">
                    <div className="relative">
                      <div className="absolute right-2 top-2 z-10">
                        <CopyButton text={lang.starterCode} />
                      </div>
                      <pre
                        className="max-h-64 overflow-auto whitespace-pre rounded-md px-3 py-3 text-[12px] leading-relaxed"
                        style={{
                          background: tokens.bg,
                          color: tokens.ink,
                          fontFamily: "ui-monospace, monospace",
                          border: `1px solid ${tokens.border}`,
                        }}
                      >
                        {lang.starterCode || "// No starter code yet"}
                      </pre>
                    </div>
                  </Tabs.Content>
                ))}
              </Tabs.Root>
            </div>
          )}
        </motion.div>
      )}
    </aside>
  );
}