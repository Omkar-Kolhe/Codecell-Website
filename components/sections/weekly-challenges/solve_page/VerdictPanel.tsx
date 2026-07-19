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
        return "text-slate-400";

      case "QUEUED":
        return "text-blue-400";

      case "RUNNING":
        return "text-yellow-400 animate-pulse";

      case "FAILED":
        return "text-red-500";

      case "COMPLETED":
        switch (verdict) {
          case "ACCEPTED":
            return "text-green-400";

          case "WRONG_ANSWER":
            return "text-red-400";

          case "TIME_LIMIT_EXCEEDED":
            return "text-yellow-400";

          case "RUNTIME_ERROR":
            return "text-orange-400";

          case "COMPILATION_ERROR":
            return "text-red-500";

          default:
            return "text-blue-400";
        }

      default:
        return "text-slate-400";
    }
  };

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
        return (errorMessage ||stderr ||stdout ||"Execution completed.");

      default:
        return "";
    }
  };

  return (
    <div className="bg-[#111827] border-t border-slate-700">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">
          Verdict
        </h2>

        <span className={`font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 p-4">
        <StatCard
          icon={<Clock size={18} />}
          label="Time"
          value={
            status === "COMPLETED" && executionTime !== undefined
              ? `${executionTime} ms`
              : "--"
          }
        />

        <StatCard
          icon={<MemoryStick size={18} />}
          label="Memory"
          value={
            status === "COMPLETED" && memoryUsed !== undefined
              ? `${memoryUsed} KB`
              : "--"
          }
        />

        <StatCard
          icon={<Cpu size={18} />}
          label="Score"
          value={
            status === "COMPLETED" && score !== undefined
              ? `${score}`
              : "--"
          }
        />
      </div>

      {/* Scrollable Content */}
      <div className="p-4 space-y-4">

        {/* Output */}
        <div className="bg-[#0f172a] rounded-lg border border-slate-700">
          <div className="px-4 py-2 border-b border-slate-700 text-sm text-slate-300 font-medium">
            Output
          </div>

          <pre className="p-4 whitespace-pre-wrap overflow-x-auto font-mono text-sm text-green-300">
            {getOutput()}
          </pre>
        </div>

        {/* Test Case Results */}
        {testResults.length > 0 && (
          <div className="rounded-lg border border-slate-700 overflow-hidden">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-sm font-medium text-slate-300">
              Test Case Results
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-4 py-2 text-left">Test</th>
                  <th className="px-4 py-2 text-left">Verdict</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Memory</th>
                </tr>
              </thead>

              <tbody>
                {testResults.map((result) => (
                  <tr
                    key={result.testCaseId}
                    className="border-t border-slate-700 hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-2">
                      {result.orderNum + 1}
                    </td>

                    <td className="px-4 py-2">
                      {result.verdict}
                    </td>

                    <td className="px-4 py-2">
                      {result.timeMs !== undefined
                        ? `${result.timeMs} ms`
                        : "-"}
                    </td>

                    <td className="px-4 py-2">
                      {result.memoryKb !== undefined
                        ? `${result.memoryKb} KB`
                        : "-"}
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

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-lg bg-slate-800 border border-slate-700 p-3">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wide">
          {label}
        </span>
      </div>

      <div className="text-white text-lg font-semibold">
        {value}
      </div>
    </div>
  );
}