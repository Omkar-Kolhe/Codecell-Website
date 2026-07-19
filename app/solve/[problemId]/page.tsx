"use client";

import React from "react";
import ProblemPanel from "@/components/sections/weekly-challenges/solve_page/ProblemPanel";
import CodeEditor from "@/components/sections/weekly-challenges/solve_page/CodeEditor";
import VerdictPanel from "@/components/sections/weekly-challenges/solve_page/VerdictPanel";
import { useState } from "react";
// import RunButton from "@/components/sections/weekly-challenges/solve_page/RunButton";
// import SubmitButton from "@/components/sections/weekly-challenges/solve_page/SubmitButton";
import {
  runCode,
  submitCode,
  getSubmission,
} from "@/lib/api-client";

import type { SubmissionState, Language } from "@/lib/types/submission";

interface PageProps {
  params: {
    problemId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { problemId } = params;

  const [activeAction, setActiveAction] = useState<"RUN" | "SUBMIT" | null >(null);
  
  const [submission, setSubmission] = useState<SubmissionState>({ status: "IDLE", testResults: [], });

  const pollSubmission = async (submissionId: string) => {
  try {
    const submission = await getSubmission(submissionId);

    setSubmission(prev => ({
      ...prev,
      status: submission.status,
      verdict: submission.verdict,
      score: submission.score,
      executionTime: submission.executionTimeMs,
      memoryUsed: submission.memoryUsedKb,
      testResults: submission.testResults,
      errorMessage: submission.errorMessage,
    }));

    if (
      submission.status === "COMPLETED" ||
      submission.status === "FAILED"
    ) 
    {
      setActiveAction(null);
      return;
    }

    setTimeout(() => {
      pollSubmission(submissionId);
    }, 1000);
  } catch (err) {
    console.error("Polling failed:", err);

    setSubmission(prev => ({
      ...prev,
      status: "FAILED",
      stderr: "Polling failed.",
    }));
  }
};


  const handleRun = async (
      code: string,
      language: Language
    ) => {
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
         setActiveAction(null);
      }
    };

  const handleSubmit = async (
  code: string,
  language: Language
) => {
  try {
    
    const response = await submitCode(problemId, {
      language,
      sourceCode: code,
    });

    setSubmission({
      status: "QUEUED",
      submissionId: response.submissionId, 
      testResults: []
    });
    
    pollSubmission(response.submissionId);

    console.log("Submit Response:", response);

  } catch (err) {
    console.error("Submit failed:", err);
  } 
};

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
};

export default Page;