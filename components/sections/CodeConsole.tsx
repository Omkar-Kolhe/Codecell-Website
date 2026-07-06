"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const snippets = [
  {
    lang: "cpp",
    name: "C++",
    code: `#include <iostream>
#include <vector>
using namespace std;

// CodeCell Weekly #47
int main() {
    vector<int> arr = {1, 2, 47};
    Node* root = buildBST(arr);
    cout << "COMPILATION SUCCESSFUL\\n";
    return 0;
}`,
  },
  {
    lang: "python",
    name: "PYTHON",
    code: `def solve(arr):
    # Find max subarray XOR sum
    ans, mask = 0, 0
    for i in range(30, -1, -1):
        mask |= (1 << i)
        s = {x & mask for x in arr}
        temp = ans | (1 << i)
        if any(temp ^ pref in s for pref in s):
            ans = temp
    return ans

# Weekly #47 Solved`,
  },
  {
    lang: "javascript",
    name: "JAVASCRIPT",
    code: `const startServer = async () => {
  const app = express();
  await connectVectorDB();
  app.use(express.json());
  
  app.post("/query", async (req, res) => {
    const { query } = req.body;
    const emb = await getEmbeddings(query);
    const nodes = await searchIndex(emb);
    res.json({ status: "SUCCESS", nodes });
  });

  app.listen(8080, () => log("Online"));
};`,
  },
  {
    lang: "sql",
    name: "SQL",
    code: `SELECT 
  u.handle,
  COUNT(s.id) AS solves,
  MAX(s.created_at) AS last_solved
FROM users u
LEFT JOIN submissions s ON u.id = s.user_id
WHERE s.status = 'ACCEPTED'
GROUP BY u.id, u.handle
ORDER BY solves DESC, last_solved ASC
LIMIT 5;`,
  },
];

export default function CodeConsole() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [charIdx, setCharIdx] = useState(0);
  const [stage, setStage] = useState<"typing" | "compiling" | "completed">("typing");
  const [compileProgress, setCompileProgress] = useState(0);

  const currentSnippet = snippets[snippetIdx];

  // Reset states when changing index
  const selectSnippet = (idx: number) => {
    setSnippetIdx(idx);
    setTypedText("");
    setCharIdx(0);
    setStage("typing");
    setCompileProgress(0);
  };

  useEffect(() => {
    if (stage === "typing") {
      if (charIdx < currentSnippet.code.length) {
        const timeout = setTimeout(() => {
          setTypedText((prev) => prev + currentSnippet.code[charIdx]);
          setCharIdx((prev) => prev + 1);
        }, 15); // Fast typing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished typing. Move to compiling stage
        setStage("compiling");
      }
    }
  }, [charIdx, stage, currentSnippet.code]);

  useEffect(() => {
    if (stage === "compiling") {
      setCompileProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setCompileProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setStage("completed");
        }
      }, 120);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "completed") {
      // Stay on completed for 4 seconds, then go to next tab
      const timeout = setTimeout(() => {
        const nextIdx = (snippetIdx + 1) % snippets.length;
        selectSnippet(nextIdx);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [stage, snippetIdx]);

  // Syntax highlighting mock function
  const highlightSyntax = (text: string, lang: string) => {
    if (!text) return "";
    
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (lang === "python") {
      escaped = escaped
        .replace(/\b(def|for|in|range|if|any|return)\b/g, '<span class="text-[#E8FF00]">$1</span>')
        .replace(/(#.*)/g, '<span class="text-[#8A8880]">$1</span>')
        .replace(/\b(solve|print|any|range)\b/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/(\d+)/g, '<span class="text-[#FF4D00]">$1</span>');
    } else if (lang === "javascript") {
      escaped = escaped
        .replace(/\b(const|let|var|async|await|new|return|import)\b/g, '<span class="text-[#E8FF00]">$1</span>')
        .replace(/\b(app|express|connectVectorDB|getEmbeddings|searchIndex|res|json|listen|log)\b/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/(\/\/.+)/g, '<span class="text-[#8A8880]">$1</span>');
    } else if (lang === "sql") {
      escaped = escaped
        .replace(/\b(SELECT|FROM|LEFT JOIN|ON|WHERE|GROUP BY|ORDER BY|LIMIT|DESC|ASC|AS)\b/g, '<span class="text-[#E8FF00]">$1</span>')
        .replace(/\b(COUNT|MAX|SUM)\b/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/('.*?')/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/(\d+)/g, '<span class="text-[#FF4D00]">$1</span>');
    } else if (lang === "cpp") {
      escaped = escaped
        .replace(/\b(int|double|char|void|vector|return|using|namespace|include)\b/g, '<span class="text-[#E8FF00]">$1</span>')
        .replace(/(#\w+)/g, '<span class="text-[#FF4D00]">$1</span>')
        .replace(/(&lt;\w+&gt;)/g, '<span class="text-[#4BE2C4]">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="text-[#8A8880]">$1</span>')
        .replace(/(".*?")/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/\b(main|cout|buildBST)\b/g, '<span class="text-[#A8D8FF]">$1</span>')
        .replace(/(\d+)/g, '<span class="text-[#FF4D00]">$1</span>');
    }

    return escaped;
  };

  return (
    <div
      data-code-block="true"
      className="
        w-full
        bg-[#111111]
        border
        border-[#2E2E2E]
        font-mono
        text-xs
        p-6
        relative
        min-h-[340px]
        flex
        flex-col
        justify-between
        shadow-[0_0_40px_rgba(232,255,0,0.02)]
      "
    >
      {/* Title / Tab Bar */}
      <div>
        <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-4 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4BE2C4] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8D8FF] block" />
          </div>
          <span className="text-[10px] text-[#4A4A4A] tracking-widest uppercase">
            [ COMPILE_CONSOLES.exe ]
          </span>
        </div>

        {/* Interactive Tabs */}
        <div className="flex gap-2 border-b border-[#1A1A1A] pb-3 mb-4 select-none">
          {snippets.map((snip, idx) => (
            <button
              key={snip.lang}
              onClick={() => selectSnippet(idx)}
              className={`
                px-2.5
                py-1
                text-[10px]
                font-bold
                tracking-wider
                border
                transition-all
                duration-200
                ${
                  snippetIdx === idx
                    ? "bg-[#E8FF00] text-[#0D0D0D] border-[#E8FF00]"
                    : "bg-transparent text-[#8A8880] border-[#222222] hover:border-[#4BE2C4] hover:text-[#4BE2C4]"
                }
              `}
            >
              {snip.name}
            </button>
          ))}
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 font-mono text-[11px] sm:text-xs leading-relaxed text-[#F0EDE6] overflow-x-auto select-text whitespace-pre mb-4 min-h-[140px]">
        <code
          dangerouslySetInnerHTML={{
            __html: highlightSyntax(typedText, currentSnippet.lang),
          }}
        />
        {stage === "typing" && (
          <span className="inline-block w-1.5 h-4 bg-[#E8FF00] ml-0.5 animate-[pulse_1s_infinite] align-middle" />
        )}
      </div>

      {/* Compiler Execution Interface overlay */}
      <div className="border-t border-[#222222] pt-4 select-none">
        {stage === "compiling" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] text-[#4BE2C4] font-bold">
              <span className="animate-pulse">{`> COMPILING FILE_${currentSnippet.lang.toUpperCase()}...`}</span>
              <span>{compileProgress}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#1A1A1A] h-1 rounded-none overflow-hidden">
              <motion.div
                className="bg-[#4BE2C4] h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${compileProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-[9px] text-[#4A4A4A] leading-tight">
              {compileProgress > 20 && <div>{`[1] PARSING ABSTRACT SYNTAX TREE...`}</div>}
              {compileProgress > 60 && <div>{`[2] ALLOCATING RUNTIME REGISTERS...`}</div>}
            </div>
          </div>
        )}

        {stage === "completed" && (
          <div className="space-y-1 text-[10px]">
            <div className="text-[#E8FF00] font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF00]" />
              <span>{`> COMPILATION SUCCESSFUL [EXIT_CODE_0]`}</span>
            </div>
            <div className="text-[#8A8880] text-[9px]">
              <div>{`Target: weekly_challenge_${currentSnippet.lang}.o`}</div>
              <div>{`Solves matched in database: YES`}</div>
              <div className="text-[#4BE2C4] font-semibold">{`Execution time: ${
                currentSnippet.lang === "cpp" ? "2ms" : currentSnippet.lang === "python" ? "24ms" : "11ms"
              } | Mem usage: ~1.2MB`}</div>
            </div>
          </div>
        )}

        {stage === "typing" && (
          <div className="flex justify-between items-center text-[9px] text-[#3E3E3C]">
            <span>STATUS: CODE_INPUT_STREAM</span>
            <span>LN {typedText.split("\n").length}, COL {typedText.split("\n").pop()?.length || 0}</span>
          </div>
        )}
      </div>
    </div>
  );
}
