"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bstStates = [
  {
    code: "BST.search(60)",
    logs: [
      "> BST.search(60) initiated.",
      "> Checking root [50]...",
      "> 60 > 50: Traverse RIGHT to [70].",
      "> Checking node [70]...",
      "> 60 < 70: Traverse LEFT to [60].",
      "> Checking node [60]...",
      "> 60 == 60: Key found! Success. [OK]",
    ],
    highlighted: ["50", "70", "60"],
  },
  {
    code: "BST.insert(45)",
    logs: [
      "> BST.insert(45) initiated.",
      "> Checking root [50]...",
      "> 45 < 50: Traverse LEFT to [30].",
      "> Checking node [30]...",
      "> 45 > 30: Traverse RIGHT to [40].",
      "> Checking node [40]...",
      "> 45 > 40: Traverse RIGHT (empty node).",
      "> Inserting [45] at [40].right. [OK]",
    ],
    highlighted: ["50", "30", "40", "45"],
  },
  {
    code: "BST.findMin()",
    logs: [
      "> BST.findMin() initiated.",
      "> Checking root [50]...",
      "> Traverse LEFT to [30].",
      "> Checking node [30]...",
      "> Traverse LEFT to [20].",
      "> Checking node [20]...",
      "> No left child. Minimum value is 20. [OK]",
    ],
    highlighted: ["50", "30", "20"],
  },
];

const nodes = [
  { id: "50", left: "50%", top: "15%" },
  { id: "30", left: "28%", top: "42%" },
  { id: "70", left: "72%", top: "42%" },
  { id: "20", left: "14%", top: "70%" },
  { id: "40", left: "42%", top: "70%" },
  { id: "60", left: "60%", top: "70%" },
  { id: "45", left: "48%", top: "90%" },
];

const connections = [
  { from: "50", to: "30", x1: "50%", y1: "15%", x2: "28%", y2: "42%" },
  { from: "50", to: "70", x1: "50%", y1: "15%", x2: "72%", y2: "42%" },
  { from: "30", to: "20", x1: "28%", y1: "42%", x2: "14%", y2: "70%" },
  { from: "30", to: "40", x1: "28%", y1: "42%", x2: "42%", y2: "70%" },
  { from: "70", to: "60", x1: "72%", y1: "42%", x2: "60%", y2: "70%" },
  { from: "40", to: "45", x1: "42%", y1: "70%", x2: "48%", y2: "90%" },
];

export default function AsciiTerminal() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  useEffect(() => {
    const currentState = bstStates[cycleIndex];
    
    // Type log lines one by one
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        const next = prev + 1;
        if (next >= currentState.logs.length) {
          clearInterval(interval);
          // Wait 3.5 seconds before next cycle
          setTimeout(() => {
            setCycleIndex((c) => (c + 1) % bstStates.length);
            setLogIndex(0);
            setActiveHighlight(null);
          }, 3500);
          return prev;
        }

        // Highlight nodes based on log contents
        const logLine = currentState.logs[next];
        if (logLine.includes("root [50]")) setActiveHighlight("50");
        else if (logLine.includes("RIGHT to [70]")) setActiveHighlight("70");
        else if (logLine.includes("LEFT to [60]")) setActiveHighlight("60");
        else if (logLine.includes("LEFT to [30]")) setActiveHighlight("30");
        else if (logLine.includes("RIGHT to [40]")) setActiveHighlight("40");
        else if (logLine.includes("LEFT to [20]")) setActiveHighlight("20");
        else if (logLine.includes("Inserting [45]")) setActiveHighlight("45");
        
        return next;
      });
    }, 850);

    return () => clearInterval(interval);
  }, [cycleIndex]);

  const state = bstStates[cycleIndex];
  const renderedLogs = state.logs.slice(0, logIndex + 1);

  // Computes if a line path is part of current active traversal route
  const isLineActive = (from: string, to: string) => {
    const path = state.highlighted;
    const fromIdx = path.indexOf(from);
    const toIdx = path.indexOf(to);
    
    if (fromIdx !== -1 && toIdx !== -1 && toIdx === fromIdx + 1) {
      const activeIndex = path.indexOf(activeHighlight || "");
      return activeIndex >= toIdx;
    }
    return false;
  };

  return (
    <div className="w-full border border-[#2A2A2A] bg-[#111111] font-mono text-[11px] sm:text-xs leading-relaxed text-[#F0EDE6] p-5 shadow-2xl relative overflow-hidden flex flex-col h-[420px]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 mb-4 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF4D00] block" />
          <span className="w-2.5 h-2.5 bg-[#4BE2C4] block" />
          <span className="text-[10px] tracking-wider text-[#8A8880] uppercase ml-1">BST_VISUALIZER_v2.0.sh</span>
        </div>
        <div className="text-[10px] text-[#4A4A4A]">SECURE SHELL</div>
      </div>

      {/* Code execution simulation */}
      <div className="text-[#4A4A4A] mb-1 select-none">// Executing algorithm query:</div>
      <div className="text-[#E8FF00] font-bold mb-4 select-none">{`$ ${state.code}`}</div>

      {/* Split grid for Tree and Terminal output */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Left column: Tree visualization */}
        <div className="md:col-span-7 border border-[#222222] p-4 bg-[#0D0D0D] overflow-hidden select-none min-h-[220px] relative">
          
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, idx) => {
              // Hide line to 45 if we aren't in the insert cycle
              if (conn.to === "45" && !state.code.includes("insert(45)")) return null;

              const active = isLineActive(conn.from, conn.to);
              return (
                <g key={idx}>
                  {/* Base Line */}
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke="#222222"
                    strokeWidth="1.5"
                  />
                  {/* Glowing/Traversed Line */}
                  <motion.line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={active ? "#4BE2C4" : "transparent"}
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: active ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node) => {
            // Hide 45 if we aren't in the insert cycle
            if (node.id === "45" && !state.code.includes("insert(45)")) return null;

            const isCurrent = activeHighlight === node.id;
            const hasBeenVisited = state.highlighted.includes(node.id) && 
              state.highlighted.indexOf(node.id) <= state.highlighted.indexOf(activeHighlight || "");

            let nodeClass = "border-[#222222] bg-[#0D0D0D] text-[#4A4A4A]";
            if (isCurrent) {
              nodeClass = "border-[#E8FF00] bg-[#E8FF00] text-[#0D0D0D] font-bold shadow-[0_0_15px_rgba(232,255,0,0.4)] z-20";
            } else if (hasBeenVisited) {
              nodeClass = "border-[#4BE2C4] bg-[#111111] text-[#4BE2C4] font-bold z-10";
            }

            return (
              <motion.div
                key={node.id}
                layoutId={`node-${node.id}`}
                className={`
                  absolute
                  w-8
                  h-8
                  border
                  flex
                  items-center
                  justify-center
                  font-mono
                  text-[10px]
                  sm:text-xs
                  transition-[border-color,background-color,color]
                  duration-200
                  ${nodeClass}
                `}
                style={{
                  left: node.left,
                  top: node.top,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {node.id}
              </motion.div>
            );
          })}
        </div>

        {/* Right column: Running logs */}
        <div className="md:col-span-5 flex flex-col border border-[#222222] p-3.5 bg-[#0D0D0D] overflow-y-auto no-scrollbar h-full justify-end select-text">
          <div className="space-y-1.5">
            {renderedLogs.map((log, i) => (
              <div
                key={i}
                className={`${
                  log.includes("Success") || log.includes("[OK]")
                    ? "text-[#4BE2C4]"
                    : log.includes("checking") || log.includes("Checking")
                    ? "text-[#F0EDE6]"
                    : "text-[#4A4A4A]"
                }`}
              >
                {log}
              </div>
            ))}
            <div className="w-1.5 h-3.5 bg-[#E8FF00] inline-block animate-[pulse_1s_infinite] ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
