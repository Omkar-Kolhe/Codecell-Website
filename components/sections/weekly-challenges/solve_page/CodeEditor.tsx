"use client";

import { useState } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import {
  Play,
  Send,
  RotateCcw,
  Settings,
  Maximize2,
  Terminal,
  Loader2,
} from "lucide-react";

import type { SubmissionStatus, Language } from "@/lib/types/submission";

interface CodeEditorProps {
  status: SubmissionStatus;

  activeAction: "RUN" | "SUBMIT" | null;
  onRun?: (
    code: string,
    language: Language
  ) => Promise<void>;

  onSubmit?: (
    code: string,
    language: Language
  ) => Promise<void>;
}

const LANG_CONFIG = {
  CPP: {
    label: "C++",
    monaco: "cpp",
  },
  JAVA: {
    label: "Java",
    monaco: "java",
  },
  PYTHON: {
    label: "Python",
    monaco: "python",
  },
} as const;

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
};

const MONACO_THEME_NAME = "codecell-gold-dark";

// Registers a Monaco theme matching the brand palette instead of the stock
// vs-dark, so the editor doesn't look like a foreign island next to the panel.
const handleEditorMount: OnMount = (_editor, monaco) => {
  monaco.editor.defineTheme(MONACO_THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "87847C", fontStyle: "italic" },
      { token: "keyword", foreground: "C9A961" },
      { token: "string", foreground: "3FA66E" },
      { token: "number", foreground: "E4C368" },
    ],
    colors: {
      "editor.background": tokens.bg,
      "editor.foreground": tokens.ink,
      "editorLineNumber.foreground": "#4a463c",
      "editorLineNumber.activeForeground": tokens.gold,
      "editor.selectionBackground": "#C9A96130",
      "editorCursor.foreground": tokens.goldBright,
      "editor.lineHighlightBackground": "#C9A9610a",
      "editorIndentGuide.background": "#C9A96120",
    },
  });
  monaco.editor.setTheme(MONACO_THEME_NAME);
};

export default function CodeEditor({
  status,
  activeAction,
  onRun,
  onSubmit,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<Language>("CPP");

  const [code, setCode] = useState("");

  const isRunning = activeAction === "RUN";

  const isJudging = activeAction === "SUBMIT";

  const isBusy = status === "QUEUED" || status === "RUNNING";

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col h-full shadow-xl"
      style={{ background: tokens.panel, border: `1px solid ${tokens.border}` }}
    >
      <div
        className="p-2 flex justify-between items-center"
        style={{ borderBottom: `1px solid ${tokens.border}` }}
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="rounded px-3 py-1.5 text-sm outline-none"
          style={{
            background: tokens.bg,
            color: tokens.ink,
            border: `1px solid ${tokens.border}`,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {Object.entries(LANG_CONFIG).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          <button
            className="p-2 rounded transition-colors hover:bg-[#C9A96114]"
            style={{ color: tokens.muted }}
          >
            <RotateCcw size={16} />
          </button>

          <button
            className="p-2 rounded transition-colors hover:bg-[#C9A96114]"
            style={{ color: tokens.muted }}
          >
            <Settings size={16} />
          </button>

          <button
            className="p-2 rounded transition-colors hover:bg-[#C9A96114]"
            style={{ color: tokens.muted }}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <Editor
        height="100%"
        language={LANG_CONFIG[language].monaco}
        value={code}
        onChange={(v) => setCode(v ?? "")}
        theme={MONACO_THEME_NAME}
        onMount={handleEditorMount}
        options={{
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          scrollBeyondLastLine: false,
          fontLigatures: true,
          tabSize: 4,
          bracketPairColorization: {
            enabled: true,
          },
          padding: {
            top: 12,
            bottom: 12,
          },
        }}
      />

      <div
        className="px-4 py-2 flex justify-between text-xs"
        style={{ borderTop: `1px solid ${tokens.border}`, color: tokens.muted }}
      >
        <span>UTF-8</span>
        <span>{LANG_CONFIG[language].label}</span>
      </div>

      <div
        className="p-3 flex justify-between"
        style={{ borderTop: `1px solid ${tokens.border}`, background: tokens.bg }}
      >
        <button
          className="flex items-center gap-2 text-sm"
          style={{ color: tokens.muted }}
        >
          <Terminal size={16} />
          Console
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onRun?.(code, language)}
            disabled={isBusy}
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors disabled:cursor-not-allowed"
            style={{
              background: isBusy ? "#1a1712" : "#17140d",
              color: isBusy ? tokens.muted : tokens.ink,
              border: `1px solid ${tokens.border}`,
            }}
          >
            {isRunning ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={16} />
                Run
              </>
            )}
          </button>

          <button
            onClick={() => onSubmit?.(code, language)}
            disabled={isBusy}
            className="flex items-center gap-2 px-5 py-2 rounded text-sm font-semibold transition-colors disabled:cursor-not-allowed"
            style={{
              background: isBusy ? "#3a3324" : tokens.gold,
              color: isBusy ? tokens.muted : "#0A0A0A",
            }}
          >
            {isJudging ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Judging...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}