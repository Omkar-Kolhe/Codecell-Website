export type SubmissionStatus =
  | "IDLE"
  | "QUEUED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED";

export type Language =
  | "CPP"
  | "JAVA"
  | "PYTHON";

export interface RunRequest {
  language: Language;
  sourceCode: string;
  stdin?: string;
}

export interface RunResponse {
  runId: string;
  status: string;
}

export interface RunResult {
  id: string;
  status: string;
  stdout: string;
  stderr: string;
  executionTimeMs: number;
}

export interface SubmitRequest {
  language: Language;
  sourceCode: string;
}

export interface SubmitResponse {
  submissionId: string;
  status: SubmissionStatus;
}

export interface SubmissionTestResult {
  testCaseId: string;
  orderNum: number;
  verdict: string;
  timeMs?: number;
  memoryKb?: number;
}

export interface SubmissionResult {
  id: string;

  status: SubmissionStatus;

  verdict: string;

  score: number;

  executionTimeMs: number;

  memoryUsedKb: number;

  errorMessage?: string;

  testResults: SubmissionTestResult[];
}

export interface SubmissionState {
  status: SubmissionStatus;

  verdict?: string;

  executionTime?: number;

  memoryUsed?: number;

  score?: number;

  stdout?: string;

  stderr?: string;

  submissionId?: string;

  errorMessage?: string;

  testResults: SubmissionTestResult[];
}