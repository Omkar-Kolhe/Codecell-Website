"use client";

import React from "react";
import { Clock, Cpu, MemoryStick } from "lucide-react";
import {
  SubmissionStatus,
  SubmissionTestResult,
} from "@/lib/types/submission";

interface VerdictPanelProps {
  status?: SubmissionStatus;
  verdict?: string;
  score?: number;
  executionTime?: number;
  memoryUsed?: number;
  stdout?: string;
  stderr?: string;
  errorMessage?: string;
  testResults: SubmissionTestResult[];
}

// ---------------------------------------------------------------------------
// Brand tokens — kept in sync with ProblemPanel's palette
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
  blue: "#7FA7C9",
};

export default function VerdictPanel({
  status = "IDLE",
  verdict,
  score,
  executionTime,
  memoryUsed,
  stdout,
  stderr,
  errorMessage,
  testResults,
}: VerdictPanelProps) {
  const getStatusText = () => {
    switch (status) {
      case "IDLE":
        return "Idle";

      case "QUEUED":
        return "Queued...";

      case "RUNNING":
        return "Running...";

      case "COMPLETED":
        return verdict ?? "Completed";

      case "FAILED":
        return "System Error";

      default:
        return "Idle";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "IDLE":
        return tokens.muted;

      case "QUEUED":
        return tokens.blue;

      case "RUNNING":
        return tokens.goldBright;

      case "FAILED":
        return tokens.red;

      case "COMPLETED":
        switch (verdict) {
          case "ACCEPTED":
            return tokens.green;

          case "WRONG_ANSWER":
            return tokens.red;

          case "TIME_LIMIT_EXCEEDED":
            return tokens.goldBright;

          case "RUNTIME_ERROR":
            return "#D98E5C";

          case "COMPILATION_ERROR":
            return tokens.red;

          default:
            return tokens.blue;
        }

      default:
        return tokens.muted;
    }
  };

  const isPulsing = status === "RUNNING";

  const getOutput = () => {
    switch (status) {
      case "IDLE":
        return "Program output will appear here...";

      case "QUEUED":
        return "Submission queued...";

      case "RUNNING":
        return "Executing against test cases...";

      case "FAILED":
        return stderr || "A system error occurred while judging.";

      case "COMPLETED":
        return errorMessage || stderr || stdout || "Execution completed.";

      default:
        return "";
    }
  };

  return (
    <div style={{ background: tokens.panel, borderTop: `1px solid ${tokens.border}` }}>
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${tokens.border}` }}
      >
        <h2
          className="font-bold text-lg"
          style={{
            color: tokens.ink,
            fontFamily: "Georgia, 'Playfair Display', 'Times New Roman', serif",
          }}
        >
          Verdict
        </h2>

        <span
          className={`font-semibold text-sm ${isPulsing ? "animate-pulse" : ""}`}
          style={{ color: getStatusColor(), fontFamily: "ui-monospace, monospace" }}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 p-4">
        <StatCard
          icon={<Clock size={16} />}
          label="Time"
          value={
            status === "COMPLETED" && executionTime !== undefined
              ? `${executionTime} ms`
              : "--"
          }
        />

        <StatCard
          icon={<MemoryStick size={16} />}
          label="Memory"
          value={
            status === "COMPLETED" && memoryUsed !== undefined
              ? `${memoryUsed} KB`
              : "--"
          }
        />

        <StatCard
          icon={<Cpu size={16} />}
          label="Score"
          value={
            status === "COMPLETED" && score !== undefined ? `${score}` : "--"
          }
        />
      </div>

      {/* Scrollable Content */}
      <div className="p-4 space-y-4">
        {/* Output */}
        <div
          className="rounded-lg"
          style={{ background: tokens.bg, border: `1px solid ${tokens.border}` }}
        >
          <div
            className="px-4 py-2 text-sm font-medium"
            style={{ borderBottom: `1px solid ${tokens.border}`, color: tokens.muted }}
          >
            Output
          </div>

          <pre
            className="p-4 whitespace-pre-wrap overflow-x-auto text-sm"
            style={{ color: tokens.green, fontFamily: "ui-monospace, monospace" }}
          >
            {getOutput()}
          </pre>
        </div>

        {/* Test Case Results */}
        {testResults.length > 0 && (
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${tokens.border}` }}
          >
            <div
              className="px-4 py-2 text-sm font-medium"
              style={{ background: tokens.bg, borderBottom: `1px solid ${tokens.border}`, color: tokens.gold }}
            >
              Test Case Results
            </div>

            <table className="w-full text-sm">
              <thead style={{ background: tokens.bg, color: tokens.muted }}>
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Test</th>
                  <th className="px-4 py-2 text-left font-medium">Verdict</th>
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                  <th className="px-4 py-2 text-left font-medium">Memory</th>
                </tr>
              </thead>

              <tbody>
                {testResults.map((result) => (
                  <tr
                    key={result.testCaseId}
                    className="transition-colors hover:bg-[#C9A96110]"
                    style={{ borderTop: `1px solid ${tokens.border}`, color: tokens.ink }}
                  >
                    <td className="px-4 py-2" style={{ fontFamily: "ui-monospace, monospace" }}>
                      {result.orderNum + 1}
                    </td>

                    <td
                      className="px-4 py-2 font-medium"
                      style={{
                        color: result.verdict === "ACCEPTED" ? tokens.green : tokens.red,
                      }}
                    >
                      {result.verdict}
                    </td>

                    <td className="px-4 py-2" style={{ color: tokens.muted }}>
                      {result.timeMs !== undefined ? `${result.timeMs} ms` : "-"}
                    </td>

                    <td className="px-4 py-2" style={{ color: tokens.muted }}>
                      {result.memoryKb !== undefined ? `${result.memoryKb} KB` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: tokens.bg, border: `1px solid ${tokens.border}` }}
    >
      <div className="flex items-center gap-2 mb-2" style={{ color: tokens.gold }}>
        {icon}
        <span
          className="text-xs uppercase tracking-wide"
          style={{ fontFamily: "ui-monospace, monospace", color: tokens.muted }}
        >
          {label}
        </span>
      </div>

      <div
        className="text-lg font-semibold"
        style={{ color: tokens.ink, fontFamily: "ui-monospace, monospace" }}
      >
        {value}
      </div>
    </div>
  );
}