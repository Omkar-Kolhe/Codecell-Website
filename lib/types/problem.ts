// Types matching the backend contract for GET /api/problems/{problemId}

export type Difficulty = "EASY" | "MEDIUM" | "HARD" | string;

export interface ProblemExample {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemLanguageConfig {
  language: string; // "CPP" | "JAVA" | "PYTHON"
  starterCode: string;
}

export interface ProblemDetail {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  maxScore: number;
  timeLimitMs: number;
  memoryLimitMb: number;
  examples: ProblemExample[];
  languages: ProblemLanguageConfig[];
}

export interface APISuccess<T> {
  success: true;
  data: T;
}

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type APIResponse<T> = APISuccess<T> | APIError;