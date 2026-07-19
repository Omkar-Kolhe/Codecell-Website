"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
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


export default function CodeEditor({
  status, 
  activeAction,
  onRun,
  onSubmit,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<Language>("CPP");

  const [code, setCode] = useState("");

  const isRunning =
    activeAction === "RUN";

  const isJudging =
    activeAction === "SUBMIT";

  const isBusy =
    status === "QUEUED" ||
    status === "RUNNING";
  

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full">

      <div className="p-2 border-b border-slate-800 flex justify-between items-center">

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-slate-800 text-slate-200 rounded px-3 py-1.5 text-sm"
        >
          {Object.entries(LANG_CONFIG).map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          <button className="p-2 hover:bg-slate-800 rounded">
            <RotateCcw size={16} />
          </button>

          <button className="p-2 hover:bg-slate-800 rounded">
            <Settings size={16} />
          </button>

          <button className="p-2 hover:bg-slate-800 rounded">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <Editor
        height="100%"
        language={LANG_CONFIG[language].monaco}
        value={code}
        onChange={(v) => setCode(v ?? "")}
        theme="vs-dark"
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

      <div className="px-4 py-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
        <span>UTF-8</span>
        <span>{LANG_CONFIG[language].label}</span>
      </div>

      <div className="p-3 border-t border-slate-800 bg-[#0d1117] flex justify-between">

        <button className="flex items-center gap-2 text-slate-400">
          <Terminal size={16} />
          Console
        </button>

        <div className="flex gap-2">



          <button
            onClick={() => onRun?.(code, language)}
            disabled={isBusy}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded"
          >
          
          {isRunning ? ( 
          <>
                  <Loader2
                  size={16}
                  className="animate-spin"
                  />
            Running...
              </>
            ) : (
                  <>
                      <Play size={16}/>
                      Run
                  </>
        )}
          </button>

          <button
            onClick={() => onSubmit?.(code, language)}
            disabled={isBusy}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white px-5 py-2 rounded"
          >
            {isJudging ? (
                <>
                    <Loader2
                        size={16}
                        className="animate-spin"
                    />
                    Judging...
                </>
            ) : (
                <>
                    <Send size={16}/>
                    Submit
                </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}