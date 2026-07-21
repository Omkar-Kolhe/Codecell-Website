"use client";

import React, { useEffect, useRef, useState } from "react";
import ProblemPanel from "@/components/sections/weekly-challenges/solve_page/ProblemPanel";
import CodeEditor from "@/components/sections/weekly-challenges/solve_page/CodeEditor";
import VerdictPanel from "@/components/sections/weekly-challenges/solve_page/VerdictPanel";
import {
  runCode,
  submitCode,
  getSubmission,
} from "@/lib/api-client";

import type { SubmissionState, Language } from "@/lib/types/submission";

type PageProps = {
  params: Promise<{
    problemId: string;
  }>;
};

const POLL_INTERVAL_MS = 1000;
const MAX_POLL_ERRORS = 3;

export default function Page({ params }: PageProps) {
  // params is a Promise even in the client — React.use() is the correct way
  // to unwrap it here, since a client component cannot be `async`.
  const { problemId } = React.use(params);

  const [activeAction, setActiveAction] = useState<"RUN" | "SUBMIT" | null>(null);
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "IDLE",
    testResults: [],
  });

  // Track mounted state + in-flight timers/errors so polling never leaks
  // and never spins forever on repeated failures.
  const isMountedRef = useRef(true);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollErrorCountRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
        pollTimeoutRef.current = null;
      }
    };
  }, []);

  const stopPolling = () => {
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  };

  const pollSubmission = async (submissionId: string) => {
    if (!isMountedRef.current) return;

    try {
      const result = await getSubmission(submissionId);

      if (!isMountedRef.current) return;

      pollErrorCountRef.current = 0;

      setSubmission((prev) => ({
        ...prev,
        status: result.status,
        verdict: result.verdict,
        score: result.score,
        executionTime: result.executionTimeMs,
        memoryUsed: result.memoryUsedKb,
        testResults: result.testResults ?? [],
        errorMessage: result.errorMessage,
      }));

      if (result.status === "COMPLETED" || result.status === "FAILED") {
        setActiveAction(null);
        stopPolling();
        return;
      }

      pollTimeoutRef.current = setTimeout(() => {
        pollSubmission(submissionId);
      }, POLL_INTERVAL_MS);
    } catch (err) {
      console.error("Polling failed:", err);

      pollErrorCountRef.current += 1;

      if (!isMountedRef.current) return;

      if (pollErrorCountRef.current >= MAX_POLL_ERRORS) {
        setSubmission((prev) => ({
          ...prev,
          status: "FAILED",
          errorMessage: "Lost connection while checking submission status.",
        }));
        setActiveAction(null);
        stopPolling();
        return;
      }

      // Back off and retry rather than giving up on a single transient error.
      pollTimeoutRef.current = setTimeout(() => {
        pollSubmission(submissionId);
      }, POLL_INTERVAL_MS);
    }
  };

  const handleRun = async (code: string, language: Language) => {
    if (!problemId) return;

    try {
      setActiveAction("RUN");
      const response = await runCode(problemId, {
        language,
        sourceCode: code,
      });
      console.log("Run Response:", response);
    } catch (err) {
      console.error("Run failed:", err);
    } finally {
      if (isMountedRef.current) {
        setActiveAction(null);
      }
    }
  };

  const handleSubmit = async (code: string, language: Language) => {
    if (!problemId) return;

    try {
      setActiveAction("SUBMIT");

      const response = await submitCode(problemId, {
        language,
        sourceCode: code,
      });

      if (!isMountedRef.current) return;

      setSubmission({
        status: "QUEUED",
        submissionId: response.submissionId,
        testResults: [],
      });

      pollSubmission(response.submissionId);

      console.log("Submit Response:", response);
    } catch (err) {
      console.error("Submit failed:", err);
      if (isMountedRef.current) {
        setActiveAction(null);
        setSubmission((prev) => ({
          ...prev,
          status: "FAILED",
          errorMessage: "Submission failed. Please try again.",
        }));
      }
    }
  };

  if (!problemId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Problem not found.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - 45% */}
      <div className="w-[45%] border-r border-slate-700">
        <ProblemPanel problemId={problemId} />
      </div>

      {/* Right Panel - 55% */}
      <div className="w-[55%] overflow-y-auto">
        {/* Code Editor - 60% */}
        <div className="h-[60vh]">
          <CodeEditor
            status={submission.status}
            activeAction={activeAction}
            onRun={handleRun}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Verdict Panel - 40% */}
        <div>
          <VerdictPanel
            status={submission.status}
            verdict={submission.verdict}
            executionTime={submission.executionTime}
            memoryUsed={submission.memoryUsed}
            score={submission.score}
            stdout={submission.stdout}
            stderr={submission.stderr}
            errorMessage={submission.errorMessage}
            testResults={submission.testResults}
          />
        </div>
      </div>
    </div>
  );
}