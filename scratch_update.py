import sys

file_path = 'd:\\CodeCell-2.0\\components\\sections\\HomeSections.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_ide_files = """const ideFiles = [
  {
    id: "core",
    name: "core_nucleus.tsx",
    icon: Terminal,
    content: `// TSEC CodeCell - Core System
// ---------------------------
// For Beginners: We are a community that helps you start your tech journey.
// We teach you how to write your first lines of code and build projects.
//
// For Advanced Devs: We are a guild of systems engineers.
// We scale web apps, build compilers, and compete globally.

import { Community } from '@tsec/core';

export const CoreNucleus = () => {
  return (
    <Mission>
      Bridging the gap between academia and 
      modern software architecture.
      No matter your skill level, there is a place for you here.
    </Mission>
  );
};\`,
    accent: "#E8FF00",
    colorClass: "text-[#E8FF00]",
    sequence: [
      "Initializing Core Engine v2.0...",
      "Allocating resources for Beginners...",
      "SUCCESS: Mentorship modules loaded.",
      "Compiling Advanced Algorithms...",
      "Optimizing system architecture...",
      "SUCCESS: Production environments ready.",
      "Connecting to global leaderboard...",
      "Bypassing mainframe security...",
      "ACCESS GRANTED.",
      "Welcome to TSEC CodeCell."
    ],
    output: (
      <>
        <h2 className="text-[#E8FF00] text-xl md:text-2xl font-bold mb-6">== CORE DIRECTORY ACCESS ==</h2>
        <p className="mb-6 text-base text-[#888]">
          TSEC CodeCell is not just another committee. We are a guild of builders, hackers, and systems engineers at Thadomal Shahani Engineering College. Our mission is to bridge the gap between academia and modern software architecture.
        </p>
        <div className="mb-6 border-l-2 border-[#4BE2C4] pl-4">
          <strong className="text-[#4BE2C4] text-base block mb-1">&gt;&gt; BEGINNER TRACK:</strong>
          If you are writing your very first line of code, we will mentor you. You will learn logic building, basic web development, and participate in your first hackathons. You will never code alone.
        </div>
        <div className="mb-6 border-l-2 border-[#E8FF00] pl-4">
          <strong className="text-[#E8FF00] text-base block mb-1">&gt;&gt; ADVANCED TRACK:</strong>
          If you are already shipping, we provide the ultimate proving ground. Master dynamic programming, graph theory, Git internals, Docker scaling, and compete in our rigorous Weekly Sandboxes.
        </div>
        <div className="mb-8 border-l-2 border-[#FF4D00] pl-4">
          <strong className="text-[#FF4D00] text-base block mb-1">&gt;&gt; FLAGSHIP EVENTS:</strong>
          We host TSEC Hacks, our flagship 48-hour national hackathon where 500+ builders compete for massive prizes, deploying production-level code.
        </div>
      </>
    )
  },
  {
    id: "competitive",
    name: "sandbox.cpp",
    icon: Terminal,
    content: `// Competitive Programming Sandbox
// -------------------------------
// Beginners: Learn logic building, loops, and basic arrays.
// Advanced: Master Dynamic Programming, Graph Theory, and Segment Trees.

#include <bits/stdc++.h>
using namespace std;

void crack_algorithm() {
    // We host weekly challenges for all levels.
    // Start small, climb the global leaderboard,
    // and prepare for top-tier tech interviews.
    
    execute_optimization_pass();
}\`,
    accent: "#4BE2C4",
    colorClass: "text-[#4BE2C4]",
    sequence: [
      "Compiling sandbox.cpp with g++ -O3...",
      "Running test cases...",
      "Test Case 1: Passed (0.012s)",
      "Test Case 2: Passed (0.015s)",
      "Test Case 3: Passed (0.040s)",
      "SUCCESS: All tests passed.",
      "Analyzing complexity...",
      "Time: O(N log N) | Space: O(N)",
      "ACCESS GRANTED."
    ],
    output: (
      <>
        <h2 className="text-[#4BE2C4] text-xl md:text-2xl font-bold mb-6">== COMPETITIVE SANDBOX RESULTS ==</h2>
        <div className="mb-6 text-[#888] font-mono">
          Execution Time: <span className="text-[#e5e5e5]">0.067s</span><br/>
          Memory Used: <span className="text-[#e5e5e5]">12.4 MB</span>
        </div>
        <div className="mb-6 border-l-2 border-[#4BE2C4] pl-4">
          <strong className="text-[#4BE2C4] text-base block mb-1">&gt;&gt; ALGORITHM ANALYSIS:</strong>
          Your implementation of the segment tree approach was optimal. 
        </div>
        <div className="mb-8 border-l-2 border-[#E8FF00] pl-4">
          <strong className="text-[#E8FF00] text-base block mb-1">&gt;&gt; NEXT STEPS:</strong>
          Join our weekly competitive programming contests on Codeforces. Mentors are available in the Discord #cp-discussion channel.
        </div>
      </>
    )
  },
  {
    id: "hacks",
    name: "tsec_hacks.yml",
    icon: Award,
    content: `name: TSEC Hacks 2026
type: flagship_hackathon
duration: 48_hours
participants: 500+
description: >
  Our annual developer assembly.
  
  Beginners: Experience your first hackathon in a supportive
  environment with mentors guiding you.
  
  Advanced: 48 hours of intense coding, scaling systems,
  and competing for massive prize pools.
status: 'READY'\`,
    accent: "#FF4D00",
    colorClass: "text-[#FF4D00]",
    sequence: [
      "Parsing YAML configuration...",
      "Validating hackathon parameters...",
      "Allocating 48 hours of compute...",
      "Connecting 500+ participants...",
      "Initializing prize pools...",
      "Setting up sponsor booths...",
      "SUCCESS: Event deployed.",
      "ACCESS GRANTED."
    ],
    output: (
      <>
        <h2 className="text-[#FF4D00] text-xl md:text-2xl font-bold mb-6">== TSEC HACKS 2026 STATUS ==</h2>
        <div className="mb-6 text-[#888] font-mono">
          Status: <span className="text-[#27c93f]">DEPLOYED & ACTIVE</span><br/>
          Registrations: <span className="text-[#e5e5e5]">500+ Builders</span>
        </div>
        <div className="mb-6 border-l-2 border-[#4BE2C4] pl-4">
          <strong className="text-[#4BE2C4] text-base block mb-1">&gt;&gt; FOR BEGINNERS:</strong>
          Mentors have been assigned. Starter templates are ready. Do not be afraid to break things. This is your playground.
        </div>
        <div className="mb-8 border-l-2 border-[#E8FF00] pl-4">
          <strong className="text-[#E8FF00] text-base block mb-1">&gt;&gt; FOR EXPERTS:</strong>
          Bounty tracks are live. Scalability tests are active. Show us what you can build in 48 hours. May the best system win.
        </div>
      </>
    )
  },
  {
    id: "workshops",
    name: "bootcamps.sh",
    icon: Laptop,
    content: `#!/bin/bash
# CodeCell Masterclasses
# ----------------------
# Hands-on workshops led by senior devs.

echo "Level 1: Git, GitHub, and HTML/CSS Basics"
echo "Level 2: React, Node.js, and APIs"
echo "Level 3: Docker virtualization & Web Scaling"

# From writing 'Hello World' to deploying microservices.
deploy_workshops --mode=inclusive\`,
    accent: "#4BE2C4",
    colorClass: "text-[#4BE2C4]",
    sequence: [
      "Executing bootcamps.sh...",
      "Pulling latest Docker images...",
      "Setting up Node.js environments...",
      "Provisioning AWS instances...",
      "SUCCESS: Masterclass environments ready.",
      "Broadcasting live streams...",
      "ACCESS GRANTED."
    ],
    output: (
      <>
        <h2 className="text-[#4BE2C4] text-xl md:text-2xl font-bold mb-6">== MASTERCLASS DEPLOYMENT ==</h2>
        <p className="mb-6 text-base text-[#888]">
          All learning environments have been successfully provisioned.
        </p>
        <div className="mb-6 border-l-2 border-[#4BE2C4] pl-4">
          <strong className="text-[#4BE2C4] text-base block mb-1">&gt;&gt; LEVEL 1 (Beginner):</strong>
          Git, GitHub, HTML/CSS sandboxes are ready at port 3000. Start building your first static sites.
        </div>
        <div className="mb-6 border-l-2 border-[#E8FF00] pl-4">
          <strong className="text-[#E8FF00] text-base block mb-1">&gt;&gt; LEVEL 2 & 3 (Intermediate/Advanced):</strong>
          React, Node.js, and Docker environments are live at port 8080. Time to build scalable full-stack apps.
        </div>
        <div className="mb-8 border-l-2 border-[#FF4D00] pl-4">
          <strong className="text-[#FF4D00] text-base block mb-1">&gt;&gt; INSTRUCTIONS:</strong>
          Follow the senior developers' live streams. Interactive Q&A is enabled.
        </div>
      </>
    )
  },
  {
    id: "rankings",
    name: "leaderboard.json",
    icon: Sparkles,
    content: `{
  "system": "CodeCell Rankings",
  "beginner_friendly": true,
  "features": [
    "Earn XP for every problem solved",
    "Claim weekly streaks",
    "Track real-time scores"
  ],
  "goal": "Gamify your learning journey from Noob to Pro"
}\`,
    accent: "#E8FF00",
    colorClass: "text-[#E8FF00]",
    sequence: [
      "Fetching leaderboard data...",
      "Calculating XP...",
      "Updating weekly streaks...",
      "Compiling global ranks...",
      "SUCCESS: Leaderboard synchronized.",
      "ACCESS GRANTED."
    ],
    output: (
      <>
        <h2 className="text-[#E8FF00] text-xl md:text-2xl font-bold mb-6">== GLOBAL LEADERBOARD SYNC ==</h2>
        <div className="mb-6 text-[#888] font-mono">
          Last Sync: <span className="text-[#e5e5e5]">Just now</span><br/>
          Active Players: <span className="text-[#e5e5e5]">1,204</span>
        </div>
        <div className="mb-6 border-l-2 border-[#4BE2C4] pl-4">
          <strong className="text-[#4BE2C4] text-base block mb-1">&gt;&gt; YOUR STATUS:</strong>
          You have successfully logged your compilation hits and claimed your weekly streak.
        </div>
        <div className="mb-8 border-l-2 border-[#FF4D00] pl-4">
          <strong className="text-[#FF4D00] text-base block mb-1">&gt;&gt; CURRENT TARGET:</strong>
          You are 420 XP away from the "Elite Hacker" rank. Keep solving problems in the Competitive Sandbox.
        </div>
      </>
    )
  }
];

function RunCodeOverlay({ file, onClose }: { file: typeof ideFiles[0], onClose: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const isComplete = logs.length >= file.sequence.length;
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < file.sequence.length) {
        setLogs(prev => [...prev, file.sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 800);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, [file, onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 px-4 py-2 text-[#888] hover:text-[#fff] font-mono text-sm transition-colors"
      >
        [ X ] CANCEL
      </button>

      {!showOutput ? (
        <div className="w-full max-w-4xl p-8 font-mono text-sm md:text-base text-[#4BE2C4] drop-shadow-[0_0_10px_rgba(75,226,196,0.5)] flex flex-col items-start min-h-[400px]">
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 ${log?.includes("SUCCESS") || log?.includes("GRANTED") || log?.includes("Welcome") ? "text-[#E8FF00]" : ""}`}
            >
              <span className="opacity-50 mr-4">{`[${(index * 0.4).toFixed(3)}s]`}</span>
              {log}
            </motion.div>
          ))}
          
          {!isComplete && (
            <div className="mt-4 animate-pulse">_</div>
          )}
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-3xl bg-[#0d0d0d] border border-[#333] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Mac-style Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-[#222]">
            <div className="flex gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group transition-colors">
                <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-[#888] tracking-widest uppercase">output.log</span>
            <div className="w-12"></div> {/* Spacer to keep title centered */}
          </div>
          
          {/* Output Content */}
          <div className="p-6 md:p-10 font-mono text-sm leading-relaxed text-[#e5e5e5] max-h-[70vh] overflow-y-auto hide-scrollbar relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-[#555] hover:text-[#fff] font-mono text-xs transition-colors hidden md:block"
            >
              [ X ] Close
            </button>
            {file.output}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function InteractiveIde() {
  const [isRunning, setIsRunning] = useState(false);
  const [openFiles, setOpenFiles] = useState<string[]>(ideFiles.map(f => f.id));
  const [activeFileId, setActiveFileId] = useState<string | null>("core");
  
  const activeFile = activeFileId ? ideFiles.find((f) => f.id === activeFileId) || null : null;
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    setDisplayedContent("");
    if (!activeFile) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedContent(activeFile.content.substring(0, i));
      i++;
      if (i > activeFile.content.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [activeFileId, activeFile]);

  const handleCloseFile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(fId => fId !== id);
    setOpenFiles(newOpenFiles);
    if (activeFileId === id) {
       setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[0] : null);
    }
  };

  const handleOpenFile = (id: string) => {
    if (!openFiles.includes(id)) {
      setOpenFiles([...openFiles, id]);
    }
    setActiveFileId(id);
  };

  return (
    <div className="w-full flex flex-col md:flex-row border border-[#222] rounded-xl overflow-hidden bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.8)] mt-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#050505] border-b md:border-b-0 md:border-r border-[#222] flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-[#222] flex items-center gap-2 bg-[#080808]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-mono text-[#888] ml-2 uppercase tracking-wider">Explorer</span>
        </div>
        <div className="p-2 flex-1 overflow-y-auto">
          <div className="text-[10px] text-[#555] font-mono mb-2 px-2 uppercase tracking-widest mt-2">TSEC_CodeCell</div>
          {ideFiles.map((file) => {
            const Icon = file.icon;
            const isActive = activeFileId === file.id;
            return (
              <button
                key={file.id}
                onClick={() => handleOpenFile(file.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-mono transition-all ${
                  isActive ? "bg-[#222] text-[#fff]" : "text-[#888] hover:bg-[#111] hover:text-[#ccc]"
                }`}
              >
                <Icon size={14} className={isActive ? file.colorClass : "text-[#666]"} />
                <span className={openFiles.includes(file.id) ? "text-[#fff]" : ""}>{file.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Editor Tabs */}
        <div className="flex bg-[#0a0a0a] border-b border-[#222] justify-between">
          <div className="flex overflow-x-auto hide-scrollbar">
            {openFiles.map((fileId) => {
              const file = ideFiles.find(f => f.id === fileId);
              if (!file) return null;
              const isActive = activeFileId === file.id;
              const Icon = file.icon;
              return (
                <button
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-r border-[#222] font-mono text-xs whitespace-nowrap transition-colors shrink-0 ${
                    isActive ? "bg-[#111] text-[#fff] border-t-2" : "text-[#666] hover:bg-[#111] border-t-2 border-t-transparent"
                  }`}
                  style={{ borderTopColor: isActive ? file.accent : "transparent" }}
                >
                  <Icon size={12} className={isActive ? file.colorClass : ""} />
                  {file.name}
                  <span className="ml-2 text-[#666] hover:text-[#fff] hover:bg-[#333] rounded-sm p-0.5 transition-colors" onClick={(e) => handleCloseFile(e, file.id)}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </span>
                </button>
              );
            })}
          </div>
          {activeFile && (
            <button 
              onClick={() => setIsRunning(true)}
              className="flex items-center gap-2 px-4 py-3 font-mono text-xs bg-[#4BE2C4]/10 text-[#4BE2C4] hover:bg-[#4BE2C4]/20 transition-colors border-l border-[#222] shrink-0 group"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M8 5v14l11-7z"/></svg>
              <span className="hidden sm:inline">RUN CODE</span>
            </button>
          )}
        </div>
        
        {/* Code Area */}
        <div className="flex-1 p-4 md:p-6 bg-[#0d0d0d] relative overflow-hidden group min-h-[300px] md:min-h-[400px] flex">
          {activeFile ? (
            <>
              {/* Line Numbers */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col items-end py-4 md:py-6 pr-3 text-[#333] font-mono text-sm select-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i} className="leading-[1.6]">{i + 1}</span>
                ))}
              </div>
              
              {/* Code Content */}
              <pre className="pl-12 font-mono text-sm leading-[1.6] text-[#e5e5e5] whitespace-pre-wrap outline-none break-all sm:break-normal w-full" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                <code 
                  dangerouslySetInnerHTML={{ 
                    __html: displayedContent
                      .replace(/\/\/ (.*)/g, '<span style="color:#5c6370;font-style:italic">//$1</span>')
                      .replace(/#include (.*)/g, '<span style="color:#c678dd">#include <span style="color:#98c379">$1</span></span>')
                      .replace(/import (.*) from (.*);/g, '<span style="color:#c678dd">import</span> <span style="color:#e5c07b">$1</span> <span style="color:#c678dd">from</span> <span style="color:#98c379">$2</span>;')
                      .replace(/export const (.*) =/g, '<span style="color:#c678dd">export const</span> <span style="color:#61afef">$1</span> <span style="color:#56b6c2">=</span>')
                      .replace(/void (.*)\(/g, '<span style="color:#c678dd">void</span> <span style="color:#61afef">$1</span>(')
                      .replace(/return \(/g, '<span style="color:#c678dd">return</span> (')
                      .replace(/echo "(.*)"/g, '<span style="color:#56b6c2">echo</span> <span style="color:#98c379">"$1"</span>')
                      .replace(/deploy_workshops/g, '<span style="color:#61afef">deploy_workshops</span>')
                      .replace(/"(.*)":/g, '<span style="color:#e06c75">"$1"</span>:')
                      .replace(/name:/g, '<span style="color:#e06c75">name:</span>')
                      .replace(/type:/g, '<span style="color:#e06c75">type:</span>')
                      .replace(/duration:/g, '<span style="color:#e06c75">duration:</span>')
                      .replace(/description:/g, '<span style="color:#e06c75">description:</span>')
                      .replace(/status:/g, '<span style="color:#e06c75">status:</span>')
                      .replace(/#!/g, '<span style="color:#5c6370;font-style:italic">#!</span>')
                      + (displayedContent.length < activeFile.content.length ? '<span class="inline-block w-2 h-4 bg-[#fff] animate-pulse align-middle ml-1"></span>' : '')
                  }}
                />
              </pre>
              
              {/* Status Bar inside editor */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                 <div className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded font-mono text-[10px] text-[#888] flex items-center gap-2">
                    UTF-8
                 </div>
                 <div className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded font-mono text-[10px] text-[#888] flex items-center gap-2 uppercase">
                    {activeFile.name.split('.').pop()}
                 </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#555] font-mono text-sm">
               <div className="flex flex-col items-center justify-center gap-4 text-[#333] w-full mt-20">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span className="tracking-widest uppercase mt-4 text-[#444]">Select a file to continue</span>
               </div>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isRunning && activeFile && <RunCodeOverlay file={activeFile} onClose={() => setIsRunning(false)} />}
      </AnimatePresence>
    </div>
  );
}
"""

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if line.startswith('const ideFiles = ['):
        start_idx = i
    if line.startswith('export default function HomeSections() {'):
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    lines[start_idx:end_idx] = [new_ide_files + '\n\n']
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully replaced the component.")
else:
    print("Could not find the target lines.")
