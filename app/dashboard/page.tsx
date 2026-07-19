"use client";

import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "@/lib/api-client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Trophy,
  Users,
  Award,
  Zap,
  Play,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Bell,
  User,
  History,
  TrendingUp,
  Bookmark,
  Share2,
  ThumbsUp,
  ChevronRight,
  Search,
  Filter,
  Code2,
  Calendar,
  Lock,
  ExternalLink,
  ChevronDown,
  X,
  Menu,
  Shield,
  Briefcase,
  Compass,
  ArrowRight,
  Crown
} from "lucide-react";
import { Countdown } from "@/components/layout/Countdown";
import { LAUNCH_DATE } from "@/lib/countdown";
import { MarkdownRenderer } from "@/components/layout/MarkdownRenderer";

// Types
type PageId =
  | "dashboard"
  | "leaderboard"
  | "challenges"
  | "compiler"
  | "submissions"
  | "announcements"
  | "profile";

interface Post {
  id: string;
  author: string;
  college: string;
  role: string;
  avatar: string;
  rank: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  commentsCount: number;
  comments: Comment[];
  time: string;
}

interface Comment {
  author: string;
  content: string;
  time: string;
}

interface LeaderboardUser {
  rank: number;
  weeklyRank: number;
  name: string;
  college: string;
  score: number;
  solved: number;
  accuracy: string;
  streak: number;
  badge: string;
  movement: "up" | "down" | "flat";
}

// Mock Database / Prepopulated Data
const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: "Sneha Kulkarni",
    college: "COEP Pune",
    role: "Technical Executive",
    avatar: "SK",
    rank: "#3",
    title: "Week 3 · Greedy vs DP Trap: Locally optimal placements fail globally",
    content: "Most submissions on the **Guarded Diagonals** challenge got burned on the third hidden test case. The trap is that a greedy sweep coordinates locally optimal queen positions without calculating constraint propagation on outer edges. The correct $O(N \\log N)$ approach uses constraint tightness. Link to references in comments.",
    tags: ["DSA", "DP", "Week 3", "Editorial"],
    upvotes: 96,
    commentsCount: 2,
    time: "2 hours ago",
    comments: [
      { author: "ayush_m", content: "That tie-break key in constraint tightness is exactly where my solution was failing. Thanks for this breakdown! For a set of coordinates $S$, the mathematical formulation is:\n\n$$ f(S) = \\sum_{i \\in S} d(i) $$\n\nThis makes a huge difference.", time: "1h ago" },
      { author: "rohan_c", content: "Great note. We should do a deep dive coding session on this on Discord.", time: "45m ago" }
    ]
  },
  {
    id: "p2",
    author: "Wilbert Nadar",
    college: "TSEC Mumbai",
    role: "Core Organizer",
    avatar: "WN",
    rank: "#2",
    title: "Week 4 Announcement: The Sabotage Pawn on d3 explained",
    content: "Operatives, **Chapter IV - 'The Sabotage'** is now live on the meta board. A black pawn is planted at coordinate $d_3$. This forbids any placement that falls under the horizontal, vertical, or diagonal reach of this pawn. All 5 sub-challenges compile around backtracking filters with pre-marked static obstacles.\n\n$$\\text{Forbidden Cells} = \\{ (x, y) \\mid x = x_p \\lor y = y_p \\lor \\lvert x - x_p \\rvert = \\lvert y - y_p \\rvert \\}$$\n\nAll ELO points are survival-weighted.",
    tags: ["Graphs", "Backtracking", "Week 4", "Announcements"],
    upvotes: 142,
    commentsCount: 1,
    time: "4 hours ago",
    comments: [
      { author: "divya_s", content: "The ELO drop on dead-end squares is steep ($-15$). Check twice before hitting submit!", time: "2h ago" }
    ]
  },
  {
    id: "p3",
    author: "Kabir Mehta",
    college: "NIT Surathkal",
    role: "Technical Member",
    avatar: "KM",
    rank: "#4",
    title: "BFS optimization tips for Knight's Shortest Path",
    content: "If you're writing in Python, represent the coordinates as bit flags rather than tuples. Tuple allocation inside the main queue loop is causing TLE (Time Limit Exceeded) for board layouts greater than $32 \\times 32$. Using raw bit shifts speeds up state checks by almost $400\\%$, reducing time complexity to $O(V + E)$ where $V = N^2$ and $E = 8N^2$.",
    tags: ["BFS", "Graphs", "Optimization"],
    upvotes: 68,
    commentsCount: 0,
    time: "1 day ago",
    comments: []
  }
];

const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, weeklyRank: 1, name: "Ayush Mehrotra", college: "IIT Bombay", score: 2850, solved: 32, accuracy: "94.2%", streak: 8, badge: "Grandmaster", movement: "flat" },
  { rank: 2, weeklyRank: 4, name: "Rohan Chawla", college: "VJTI Mumbai", score: 2740, solved: 29, accuracy: "89.5%", streak: 7, badge: "Master", movement: "up" },
  { rank: 3, weeklyRank: 2, name: "Sneha Kulkarni", college: "COEP Pune", score: 2610, solved: 28, accuracy: "88.1%", streak: 6, badge: "Master", movement: "down" },
  { rank: 4, weeklyRank: 3, name: "Kabir Mehta", college: "NIT Surathkal", score: 2550, solved: 27, accuracy: "90.2%", streak: 6, badge: "Master", movement: "flat" },
  { rank: 5, weeklyRank: 11, name: "Divya Shah", college: "BITS Pilani", score: 2495, solved: 26, accuracy: "87.4%", streak: 5, badge: "Candidate Master", movement: "up" },
  { rank: 6, weeklyRank: 5, name: "Aanya Bishop", college: "TSEC Mumbai", score: 2310, solved: 24, accuracy: "86.0%", streak: 5, badge: "Candidate Master", movement: "down" },
  { rank: 7, weeklyRank: 8, name: "Shivam Thakur", college: "SPIT Mumbai", score: 2120, solved: 22, accuracy: "84.3%", streak: 4, badge: "Specialist", movement: "up" },
  { rank: 8, weeklyRank: 7, name: "Castle King", college: "DJ Sanghvi", score: 2010, solved: 21, accuracy: "81.9%", streak: 4, badge: "Specialist", movement: "down" },
  { rank: 9, weeklyRank: 6, name: "Pranav Soneji", college: "TSEC Mumbai", score: 1980, solved: 20, accuracy: "83.1%", streak: 4, badge: "Specialist", movement: "flat" },
  { rank: 10, weeklyRank: 15, name: "Yachna Sharma", college: "TSEC Mumbai", score: 1850, solved: 19, accuracy: "79.8%", streak: 3, badge: "Puppil", movement: "up" }
];

const WEEKS = [
  { id: 1, title: "THE EMPTY BOARD", difficulty: "Easy", problems: 4, startDate: "May 08, 2026", endDate: "May 14, 2026", status: "Completed", desc: "Initiate your chess-board state operations, logic gates, and prefix sweeps." },
  { id: 2, title: "THE FIRST MOVE", difficulty: "Easy-Medium", problems: 5, startDate: "May 15, 2026", endDate: "May 21, 2026", status: "Completed", desc: "First queen coordinates, monotonic sliding windows, and bitwise arrays." },
  { id: 3, title: "BUILDING HARMONY", difficulty: "Medium", problems: 5, startDate: "May 22, 2026", endDate: "Jun 04, 2026", status: "Completed", desc: "Pruned searches, binary tree constraints, and greedy optimization matrices." },
  { id: 4, title: "THE SABOTAGE", difficulty: "Medium-Hard", problems: 5, startDate: "Jun 08, 2026", endDate: "Jun 22, 2026", status: "Live", desc: "Backtracking with hostile blockades. Survive the d3 pawn diagonal threats." },
  { id: 5, title: "NEW TWIST", difficulty: "Hard", problems: 5, startDate: "Jun 23, 2026", endDate: "Jun 29, 2026", status: "Upcoming", desc: "Secondary moving threats. Advanced state-masking & dynamic programming." },
  { id: 6, title: "NARROW PATHS", difficulty: "Hard", problems: 6, startDate: "Jul 01, 2026", endDate: "Jul 07, 2026", status: "Upcoming", desc: "Tightening paths, binary trees segment routing, and ELO protection passes." },
  { id: 7, title: "THE FINAL STRETCH", difficulty: "Very Hard", problems: 5, startDate: "Jul 08, 2026", endDate: "Jul 14, 2026", status: "Upcoming", desc: "Recursive board mapping, heuristic branch and bound algorithms." },
  { id: 8, title: "VICTORY OR LESSON", difficulty: "Extreme", problems: 8, startDate: "Jul 15, 2026", endDate: "Jul 22, 2026", status: "Upcoming", desc: "The ultimate 8-queen full game-tree evaluation logic. Claim your checkmate." }
];

const COMPILER_PROBLEMS = [
  {
    id: "q2",
    title: "N-Queens Survival",
    difficulty: "Hard",
    points: 100,
    desc: "Given the coordinate of a hostile pawn on an $8 \\times 8$ chessboard, count the number of valid ways to place $8$ queens such that no two queens attack each other, and no queen shares a cell or diagonal coordinate attacked by the pawn. The solver must scale under $O(N!)$ worst case backtracking bound.",
    inputFormat: "A single coordinate string of the pawn (e.g. `'d3'`).",
    outputFormat: "Return the integer representing the count of valid board combinations.",
    constraints: [
      "Board is strictly $8 \\times 8$.",
      "The pawn is represented as a lowercase column letter $[a-h]$ and row number $[1-8]$.",
      "Pawn attack rule: A pawn attacks the two diagonally adjacent squares in the next rank (row) above it: $(r+1, c\\pm1)$."
    ],
    sampleInput: "pawn = 'd3'",
    sampleOutput: "46",
    explanation: "With the pawn on $d_3$, the cells $c_4$ and $e_4$ are forbidden coordinates. Backtracking through the $92$ base N-Queens solutions yields exactly $46$ placements that avoid these cells.",
    codeTemplates: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint countSurvival(string pawn) {\n    // Your backtracking logic here\n    // Pawn at pawn[0]-'a' and pawn[1]-'1'\n    return 46;\n}\n\nint main() {\n    cout << countSurvival("d3") << endl;\n    return 0;\n}`,
      python: `def count_survival(pawn: str) -> int:\n    # Write your N-Queens survival logic here\n    # pawn is format like "d3"\n    return 46\n\n# Test call\nprint(count_survival("d3"))`,
      java: `public class Solution {\n    public static int countSurvival(String pawn) {\n        // Your logic here\n        return 46;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(countSurvival("d3"));\n    }\n}`,
      javascript: `function countSurvival(pawn) {\n    // Your logic here\n    return 46;\n}\n\nconsole.log(countSurvival("d3"));`
    }
  },
  {
    id: "q1",
    title: "Knight's Shortest Path",
    difficulty: "Medium",
    points: 80,
    desc: "Find the minimum moves required for a standard chess Knight starting at coordinate `start` to reach target `target` on an $8 \\times 8$ board. The algorithm should complete within $O(N^2)$ time where $N$ represents board dimensions.",
    inputFormat: "Two space-separated board coordinate strings, e.g., `'a1 h8'`.",
    outputFormat: "Return minimum move count integer.",
    constraints: [
      "Coordinates are strictly within `'a1'` to `'h8'`.",
      "Knight must jump in L-shape ($2$ steps vertical, $1$ horizontal or vice versa)."
    ],
    sampleInput: "a1 h8",
    sampleOutput: "6",
    explanation: "Shortest route spans $6$ moves across the board cells.",
    codeTemplates: {
      cpp: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint minKnightMoves(string start, string target) {\n    return 6;\n}`,
      python: `def min_knight_moves(start: str, target: str) -> int:\n    return 6`,
      java: `public class Solution {\n    public static int minKnightMoves(String start, String target) {\n        return 6;\n    }\n}`,
      javascript: `function minKnightMoves(start, target) {\n    return 6;\n}`
    }
  }
];

export default function WeeklyPlatform() {
  // Navigation states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [activePage, setActivePage] = useState<PageId>("dashboard");
  const [username, setUsername] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Profile completion states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newCollegeName, setNewCollegeName] = useState("");
  const [newYear, setNewYear] = useState("");
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  // Dashboard states
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [upvotedPosts, setUpvotedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [composerTitle, setComposerTitle] = useState("");
  const [composerContent, setComposerContent] = useState("");
  const [composerTags, setComposerTags] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState("");

  // Leaderboard states
  const [leaderboardTab, setLeaderboardTab] = useState<"overall" | "weekly">("overall");
  const [searchQuery, setSearchQuery] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [weekFilter, setWeekFilter] = useState("All Weeks");

  // Compiler states
  const [selectedLanguage, setSelectedLanguage] = useState<"cpp" | "python" | "java" | "javascript">("python");
  const [activeProblem, setActiveProblem] = useState(COMPILER_PROBLEMS[0]);
  const [code, setCode] = useState(COMPILER_PROBLEMS[0].codeTemplates.python);
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("▸ Console ready. Click 'Run Code' to execute templates.");
  const [verdict, setVerdict] = useState<"idle" | "running" | "accepted" | "wrong_answer">("idle");
  const [submissionsHistory, setSubmissionsHistory] = useState<Array<{ time: string; verdict: string; lang: string }>>([]);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync code template with language & active problem
  useEffect(() => {
    setCode(activeProblem.codeTemplates[selectedLanguage]);
  }, [selectedLanguage, activeProblem]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Middleware ensures we are only here if authenticated via cookie
      setIsLoggedIn(true);
      
      // Fetch real profile from backend
      fetch(`${BASE_URL}/profile`, {
        credentials: "include"
      })
      .then(res => res.json())
      .then(resBody => {
        if (!resBody.success) {
          console.error("Profile fetch failed", resBody);
          return;
        }
        const data = resBody.data;
        
        if (data.username) {
          setUsername(data.username);
          setNewUsername(data.username);
        }
        if (data.college_name) setCollegeName(data.college_name);
        
        // Check if profile is incomplete
        if (!data.college_name || !data.year) {
          setShowProfileModal(true);
        }
      })
      .catch(err => console.error("Failed to fetch profile:", err));
    }
  }, []);

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollegeName.trim() || !newYear.trim() || !newUsername.trim()) return;
    
    setIsSubmittingProfile(true);
    try {
      const res = await fetch(`${BASE_URL}/profile/complete`, {
        method: "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: newUsername,
          college_name: newCollegeName,
          year: newYear
        })
      });
      
      if (res.ok) {
        setCollegeName(newCollegeName);
        setUsername(newUsername);
        setShowProfileModal(false);
      } else {
        const errorData = await res.json();
        alert(errorData.error?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg("Please enter a username.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard_isLoggedIn", "true");
      localStorage.setItem("dashboard_username", username);
      localStorage.setItem("dashboard_collegeName", collegeName);
    }
    setIsLoggedIn(true);
    setActivePage("dashboard");
  };

  // Handle Post Submit
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerTitle.trim() || !composerContent.trim()) return;

    const tagsArray = composerTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: username,
      college: collegeName,
      role: "Participant",
      avatar: (username || "?").split(" ").map(n => n?.[0] || "").join("").toUpperCase(),
      rank: "#47",
      title: composerTitle,
      content: composerContent,
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
      upvotes: 0,
      commentsCount: 0,
      time: "Just now",
      comments: []
    };

    setPosts([newPost, ...posts]);
    setComposerTitle("");
    setComposerContent("");
    setComposerTags("");
    setShowNewPostForm(false);
  };

  // Upvote Post
  const toggleUpvote = (id: string) => {
    const updatedUpvotes = new Set(upvotedPosts);
    if (updatedUpvotes.has(id)) {
      updatedUpvotes.delete(id);
      setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes - 1 } : p));
    } else {
      updatedUpvotes.add(id);
      setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
    }
    setUpvotedPosts(updatedUpvotes);
  };

  // Save Post
  const toggleSave = (id: string) => {
    const updatedSaved = new Set(savedPosts);
    if (updatedSaved.has(id)) {
      updatedSaved.delete(id);
    } else {
      updatedSaved.add(id);
    }
    setSavedPosts(updatedSaved);
  };

  // Submit Reply
  const handleAddComment = (postId: string) => {
    if (!replyInput.trim()) return;

    const newComment: Comment = {
      author: username,
      content: replyInput,
      time: "Just now"
    };

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    setReplyInput("");
    setActiveReplyPostId(null);
  };

  // Execute Code Simulator
  const handleRunCode = () => {
    setIsCompiling(true);
    setConsoleOutput("▸ Compiling...\n▸ g++ -O3 main.cpp -o main\n▸ Executing compiler testcases...");
    setVerdict("idle");

    setTimeout(() => {
      setIsCompiling(false);
      setConsoleOutput(`▸ Executing with sample case: [ ${activeProblem.sampleInput} ]\n▸ Output: ${activeProblem.sampleOutput}\n\n✓ SUCCESS: Code ran cleanly.\nVerify full submission correctness via 'Submit Solution'.`);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setIsCompiling(true);
    setConsoleOutput("▸ Compiling...\n▸ Testing 5 hidden test cases...\n▸ Test Case 1: PASSED (0.01s)\n▸ Test Case 2: PASSED (0.02s)");
    setVerdict("idle");

    setTimeout(() => {
      setIsCompiling(false);
      setVerdict("accepted");
      setConsoleOutput(`▸ Test Case 3: PASSED (0.01s)\n▸ Test Case 4: PASSED (0.03s)\n▸ Test Case 5: PASSED (0.02s)\n\n✓ VERDICT: ACCEPTED (100/100 points)\nELO Streaks updated.`);

      const newSub = {
        time: new Date().toLocaleTimeString(),
        verdict: "ACCEPTED",
        lang: selectedLanguage.toUpperCase()
      };
      setSubmissionsHistory([newSub, ...submissionsHistory]);
    }, 2000);
  };

  // Sponsor Banner Rotating List
  const sponsorAds = [
    { name: "Engaze", text: "Empowering next-gen CP operatives with elite internship opportunities.", cta: "Hiring Interns", link: "https://engaze.ai" },
    { name: "Mindflix Holidays", text: "Code hard, unwind harder. Planning retreats for tech guilds.", cta: "Visit Website", link: "https://mindflixholidays.com" }
  ];
  const [currentAdIdx, setCurrentAdIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIdx(prev => (prev + 1) % sponsorAds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-[#F3EDE2] font-sans selection:bg-[#D4AF37]/40 selection:text-white relative overflow-hidden">
      {/* Cinematic background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(75,226,196,0.08),_transparent_28%)] z-0" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" style={{
        backgroundImage: `
          linear-gradient(to right, #D4AF37 1px, transparent 1px),
          linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
        `,
        backgroundSize: "46px 46px"
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)`,
        backgroundSize: "18px 18px"
      }} />

      {/* Decorative glows */}
      <div className="absolute top-[-12%] right-[-10%] w-[520px] h-[520px] rounded-full bg-[#D4AF37] opacity-[0.045] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-12%] left-[-16%] w-[460px] h-[460px] rounded-full bg-[#4BE2C4] opacity-[0.03] blur-[140px] pointer-events-none" />

      {!isLoggedIn ? (
        /* ==================== COMING SOON SCREEN ==================== */
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-4xl glass border border-[#D4AF37]/20 bg-[#0E0E0E]/90 p-8 md:p-12 rounded-xl relative shadow-2xl overflow-hidden flex flex-col items-center text-center">

            {/* Corner Decorative Borders */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#D4AF37]" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#D4AF37]" />

            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/25 bg-[#D4AF37]/5 text-xs text-[#D4AF37] uppercase tracking-[0.25em] font-bold rounded-full mb-6">
              <Crown size={12} className="animate-bounce" /> INITIALIZING ARENA
            </div>

            <h1 className="font-serif text-4xl md:text-6xl text-[#FFFFFF] tracking-wider uppercase mb-3 leading-tight">
              WEEKLY CHALLENGES <span className="text-[#D4AF37]">2026</span>
            </h1>

            <p className="font-mono text-xs md:text-sm text-[#8A8880] uppercase tracking-[0.2em] max-w-2xl mb-8">
              8 Weeks. 40+ Tactical DSA Combat Missions. The Ultimate Arena of Competitive Programming.
            </p>

            {/* Countdown Container */}
            <div className="mb-10 flex justify-center">
              <Countdown target={LAUNCH_DATE} />
            </div>

            {/* Teaser Cards / Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10 text-left">
              <div className="border border-[#1A1A1A] bg-[#070707] p-4 rounded hover:border-[#D4AF37]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                  <Trophy size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">PREMIUM PRIZES</span>
                </div>
                <p className="text-xs text-[#8A8880] leading-relaxed">
                  Compete for a grand pool of rewards, special badges, and bragging rights in the leaderboards.
                </p>
              </div>

              <div className="border border-[#1A1A1A] bg-[#070707] p-4 rounded hover:border-[#D4AF37]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                  <Terminal size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">ELITE SANDBOX</span>
                </div>
                <p className="text-xs text-[#8A8880] leading-relaxed">
                  Code directly in our browser simulator supporting multi-language templates and test verification.
                </p>
              </div>

              <div className="border border-[#1A1A1A] bg-[#070707] p-4 rounded hover:border-[#D4AF37]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                  <Users size={16} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">CODTALK ARENA</span>
                </div>
                <p className="text-xs text-[#8A8880] leading-relaxed">
                  Discuss weekly test cases, solutions, and greedy traps with top coders in our community.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
              <button
                onClick={() => window.location.assign('/login')}
                className="flex-1 border border-[#D4AF37] bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-[#D4AF37] font-mono text-xs font-bold tracking-[0.2em] uppercase py-4 px-6 rounded transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] group"
              >
                CONNECT SHELL <Terminal size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 text-center">
              <span className="font-mono text-[9px] text-[#555550] tracking-widest uppercase">
                TSEC CODECELL // COMPILATION STAGE SECURE
              </span>
            </div>
          </div>
        </div>
      ) : showProfileModal ? (
        /* ==================== PROFILE COMPLETION FORM ==================== */
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center z-10 relative px-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md border border-[#D4AF37]/30 bg-[#0A0A0A] p-8 shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-4 h-[1px] bg-[#D4AF37]" />
            <div className="absolute top-0 left-0 w-[1px] h-4 bg-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-[#D4AF37]" />

            <div className="mb-6 border-b border-[#2A2A2A] pb-4">
              <h2 className="text-2xl font-bold uppercase text-[#F0EDE6] tracking-wider font-serif">
                COMPLETE PROFILE
              </h2>
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono mt-1">
                REQUIRED FOR RANKING
              </p>
            </div>

            <form onSubmit={handleCompleteProfile} className="space-y-5">
              <div>
                <label className="block font-mono text-[10px] text-[#8A8880] uppercase tracking-widest mb-1.5">
                  // USERNAME
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  className="w-full bg-transparent border border-[#2A2A2A] focus:border-[#D4AF37] px-4 py-3 rounded text-sm text-[#FFFFFF] outline-none font-mono tracking-wide"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-[#8A8880] uppercase tracking-widest mb-1.5">
                  // COLLEGE NAME
                </label>
                <input
                  type="text"
                  required
                  value={newCollegeName}
                  onChange={(e) => setNewCollegeName(e.target.value)}
                  placeholder="e.g. TSEC Mumbai"
                  className="w-full bg-transparent border border-[#2A2A2A] focus:border-[#D4AF37] px-4 py-3 rounded text-sm text-[#FFFFFF] outline-none font-mono tracking-wide"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-[#8A8880] uppercase tracking-widest mb-1.5">
                  // CURRENT YEAR
                </label>
                <select
                  required
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] px-4 py-3 rounded text-sm text-[#FFFFFF] outline-none font-mono tracking-wide appearance-none"
                >
                  <option value="" disabled>Select Year</option>
                  <option value="FE">First Year (FE)</option>
                  <option value="SE">Second Year (SE)</option>
                  <option value="TE">Third Year (TE)</option>
                  <option value="BE">Fourth Year (BE)</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmittingProfile}
                className="w-full border border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs font-bold tracking-[0.2em] uppercase py-4 rounded transition-all mt-4"
              >
                {isSubmittingProfile ? "UPDATING..." : "SAVE PROFILE"}
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        /* ==================== MAIN APPLICATION SHELL ==================== */
        <div className="min-h-screen flex flex-col z-10 relative">

          {/* TOP NAVIGATION HEADER */}
          <header className="sticky top-0 z-40 w-full border-b border-[#D4AF37]/20 bg-[#060606]/85 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,0,0,0.35)]">
            <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/20 to-[#F5E6A3]/10 text-xl text-[#D4AF37] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  ♛
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" /> live arena
                  </div>
                  <span className="font-serif text-sm tracking-wider font-bold text-[#FFFFFF] block uppercase">
                    TSEC CODECELL
                  </span>
                  <span className="font-mono text-[9px] text-[#8A8880] tracking-widest uppercase block -mt-1">
                    WEEKLY CHALLENGES 2026
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="rounded-full border border-[#D4AF37]/20 bg-[#0D0D0D] px-3 py-2 text-right shadow-inner">
                  <span className="font-mono text-[10px] text-[#D4AF37] block uppercase">// active session</span>
                  <span className="text-xs font-semibold text-[#FFFFFF] block">{username}</span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E6A3] text-[#0A0A0A] font-bold text-xs border border-[#D4AF37]/30 shadow-[0_0_18px_rgba(212,175,55,0.2)]">
                  {(username || "?").split(" ").map(n => n?.[0] || "").join("").toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    window.location.href = `${BASE_URL}/oauth/logout`;
                  }}
                  className="ml-2 flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                >
                  LOGOUT
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded border border-[#2A2A2A] bg-[#0D0D0D]/80 p-2 text-[#EBE6DD] shadow-inner"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </header>

          {/* MAIN CONTAINER LAYOUT */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6">

            {/* LEFT SIDEBAR: PROFILE & QUICK NAVIGATION (takes ~20% width) */}
            <aside className={`lg:w-1/5 shrink-0 flex flex-col gap-6 ${mobileMenuOpen ? "block" : "hidden lg:flex"}`}>
              {/* User Profile Card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#0E0E0E] via-[#111111] to-[#080808] p-6 shadow-[0_0_35px_rgba(0,0,0,0.3)]">
                <div className="absolute right-[-20px] bottom-[-24px] text-[#D4AF37]/8 font-serif text-9xl select-none pointer-events-none">
                  ♞
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.16),_transparent_32%)]" />

                <span className="relative font-mono text-[9px] text-[#D4AF37] tracking-widest block mb-4 uppercase">// operative dossier</span>

                <div className="relative flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#1C1C1C] text-[#D4AF37] font-bold text-sm font-mono shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
                    {(username || "?").split(" ").map(n => n?.[0] || "").join("").toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#FFFFFF] truncate max-w-[120px]">{username}</h3>
                    <p className="text-[10px] text-[#8A8880] truncate max-w-[120px]">{collegeName}</p>
                  </div>
                </div>

                <div className="relative grid grid-cols-2 gap-3 border-t border-[#2A2A2A] pt-4 font-mono">
                  <div className="rounded-xl border border-[#1F1F1F] bg-[#0A0A0A]/70 p-2.5">
                    <span className="text-[9px] text-[#8A8880] block uppercase tracking-wider">rank</span>
                    <span className="text-sm text-[#D4AF37] font-bold">#47</span>
                  </div>
                  <div className="rounded-xl border border-[#1F1F1F] bg-[#0A0A0A]/70 p-2.5">
                    <span className="text-[9px] text-[#8A8880] block uppercase tracking-wider">streak</span>
                    <span className="text-sm text-[#10B981] font-bold flex items-center gap-1">
                      <Zap size={10} className="fill-current" /> 4w
                    </span>
                  </div>
                  <div className="col-span-2 rounded-xl border border-[#1F1F1F] bg-[#0A0A0A]/70 p-2.5">
                    <span className="text-[9px] text-[#8A8880] block uppercase tracking-wider">trials solved</span>
                    <span className="text-xs text-[#FFFFFF]">08 / 15</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#2A2A2A] bg-[#0A0A0A]/80 p-4 shadow-[0_0_25px_rgba(0,0,0,0.25)]">
                <span className="font-mono text-[9px] text-[#8A8880] tracking-widest block mb-3 px-2 uppercase">// NAV_SYSTEM</span>
                <nav className="flex flex-col gap-1 text-sm font-mono">
                  {[
                    { id: "dashboard", label: "Dashboard", icon: Code2 },
                    { id: "discussions", label: "Discussions", icon: MessageSquare },
                    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
                    { id: "challenges", label: "Weekly Challenges", icon: Calendar },
                    { id: "submissions", label: "Submissions", icon: History },
                    { id: "announcements", label: "Announcements", icon: Bell },
                    { id: "profile", label: "Profile", icon: User }
                  ].map((item) => {
                    const Icon = item.icon;
                    // Highlight Discussions too since they share dashboard feed focus
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActivePage(item.id as PageId);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left uppercase text-xs tracking-wider ${isActive
                            ? "bg-[#D4AF37]/12 border-l-2 border-[#D4AF37] text-[#D4AF37] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            : "text-[#8A8880] hover:text-[#FFFFFF] hover:bg-[#121212] border-l-2 border-transparent"
                          }`}
                      >
                        <Icon size={14} />
                        {item.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("dashboard_isLoggedIn");
                        localStorage.removeItem("dashboard_username");
                        localStorage.removeItem("dashboard_collegeName");
                      }
                      setIsLoggedIn(false);
                      setShowLoginForm(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left uppercase text-xs tracking-wider text-red-500 hover:text-red-400 hover:bg-red-950/20 border-l-2 border-transparent mt-2 font-mono"
                  >
                    <Lock size={14} />
                    Disconnect
                  </button>
                </nav>
              </div>
            </aside>

            {/* MAIN CONTENT AREA: CENTER FEED / DYNAMIC PAGE VIEWS (takes ~65-70% width) */}
            <main className="flex-1 min-w-0 flex flex-col gap-6 relative z-10">

              <AnimatePresence mode="wait">
                {activePage === "dashboard" && (
                  /* ==================== 1. DASHBOARD / DISCUSSIONS ==================== */
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#101010] via-[#121212] to-[#080808] p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.16),_transparent_30%)]" />
                      <div className="relative mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                          <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] block mb-2 uppercase">// command center</span>
                          <h2 className="font-serif text-xl text-[#FFFFFF] tracking-wider uppercase">Signal board</h2>
                          <p className="mt-1 max-w-2xl text-xs text-[#8A8880]">
                            Share insights, coordinate strategies, and keep the team moving through the current week.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { label: "Live forum", value: "12 threads" },
                            { label: "Your streak", value: "4 weeks" },
                            { label: "Next trial", value: "Week 4" }
                          ].map((item) => (
                            <div key={item.label} className="rounded-full border border-[#2A2A2A] bg-[#0A0A0A]/80 px-3 py-1.5 text-[10px] font-mono text-[#8A8880]">
                              <span className="text-[#D4AF37]">{item.label}:</span> {item.value}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative flex items-start gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#1C1C1C] text-[#D4AF37] font-bold text-xs shrink-0">
                          {(username || "?").split(" ").map(n => n?.[0] || "").join("").toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <button
                            onClick={() => setShowNewPostForm(true)}
                            className="w-full text-left rounded-xl border border-[#2A2A2A] bg-[#0D0D0D]/90 px-4 py-3 text-xs text-[#8A8880] transition-all cursor-pointer font-mono shadow-inner hover:border-[#D4AF37]/35 hover:bg-[#121212]"
                          >
                            Start a discussion, ask a doubt, or share your approach...
                          </button>
                        </div>
                      </div>

                      {/* Expanding New Post Form */}
                      {showNewPostForm && (
                        <motion.form
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          onSubmit={handleCreatePost}
                          className="mt-5 pt-5 border-t border-[#1C1C1C] space-y-4"
                        >
                          <div>
                            <input
                              type="text"
                              placeholder="Discussion Title (e.g. Week 4 Backtracking approach)"
                              value={composerTitle}
                              onChange={(e) => setComposerTitle(e.target.value)}
                              className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#D4AF37] px-4 py-2.5 rounded text-sm text-[#FFFFFF] outline-none font-serif"
                              required
                            />
                          </div>
                          <div>
                            <textarea
                              placeholder="Describe your approach, share segment trees parameters, or ask algorithm logic..."
                              value={composerContent}
                              onChange={(e) => setComposerContent(e.target.value)}
                              className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#D4AF37] px-4 py-3 rounded text-sm text-[#FFFFFF] outline-none min-h-[120px] font-sans resize-y"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Tags (comma separated: DSA, DP, Graphs)"
                              value={composerTags}
                              onChange={(e) => setComposerTags(e.target.value)}
                              className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#D4AF37] px-4 py-2 rounded text-xs text-[#FFFFFF] outline-none font-mono"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setShowNewPostForm(false)}
                                className="px-4 py-2 border border-[#2A2A2A] text-xs font-mono rounded hover:bg-[#161616]"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2 bg-[#D4AF37] hover:bg-[#F5E6A3] text-[#0A0A0A] font-bold text-xs font-mono rounded transition-colors"
                              >
                                Submit Discussion
                              </button>
                            </div>
                          </div>
                        </motion.form>
                      )}
                    </div>

                    {/* Discussions Feed Title */}
                    <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                      <h2 className="font-serif text-lg text-[#FFFFFF] tracking-wider uppercase flex items-center gap-2">
                        <MessageSquare size={16} className="text-[#D4AF37]" /> CodeCell Arena
                      </h2>
                      <span className="font-mono text-[10px] text-[#8A8880] uppercase tracking-widest">{posts.length} active threads</span>
                    </div>

                    {/* Feed Posts */}
                    <div className="flex flex-col gap-4">
                      {posts.map((post) => {
                        const isUpvoted = upvotedPosts.has(post.id);
                        const isSaved = savedPosts.has(post.id);
                        return (
                          <div
                            key={post.id}
                            className="relative rounded-2xl border border-[#2A2A2A] bg-gradient-to-br from-[#101010] via-[#0F0F0F] to-[#090909] p-6 shadow-[0_0_30px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/35 hover:shadow-[0_0_35px_rgba(212,175,55,0.12)]"
                          >
                            {/* Header details */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#1C1C1C] border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-xs flex items-center justify-center font-mono">
                                  {post.avatar}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#FFFFFF]">{post.author}</span>
                                    <span className="px-1.5 py-0.5 border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[8px] text-[#D4AF37] font-mono rounded uppercase">
                                      Rank {post.rank}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-[#8A8880]">{post.college} · {post.time}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleSave(post.id)}
                                className={`text-[#8A8880] hover:text-[#D4AF37] transition-colors ${isSaved ? "text-[#D4AF37]" : ""}`}
                              >
                                <Bookmark size={14} className={isSaved ? "fill-current" : ""} />
                              </button>
                            </div>

                            {/* Content */}
                            <h3 className="font-serif text-base text-[#FFFFFF] font-bold tracking-wide mb-2 uppercase hover:text-[#D4AF37] transition-colors cursor-pointer">
                              {post.title}
                            </h3>
                            <MarkdownRenderer content={post.content} className="text-xs text-[#8A8880] leading-relaxed mb-4 font-sans" />

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-5">
                              {post.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="font-mono text-[9px] border border-[#1C1C1C] hover:border-[#D4AF37]/30 bg-[#070707] text-[#8A8880] px-2 py-0.5 tracking-wider uppercase transition-colors"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Footer Interaction Buttons */}
                            <div className="flex items-center justify-between border-t border-[#1C1C1C] pt-4 font-mono text-[10px] text-[#8A8880]">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => toggleUpvote(post.id)}
                                  className={`flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors ${isUpvoted ? "text-[#D4AF37] font-bold" : ""}`}
                                >
                                  <ThumbsUp size={12} className={isUpvoted ? "fill-current" : ""} />
                                  <span>{post.upvotes} UPVOTES</span>
                                </button>
                                <button
                                  onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                                  className="flex items-center gap-1.5 hover:text-[#FFFFFF] transition-colors"
                                >
                                  <MessageSquare size={12} />
                                  <span>{post.commentsCount} COMMENTS</span>
                                </button>
                              </div>

                              <button
                                onClick={() => {
                                  // Share action simulator
                                  alert(`Link copied to clipboard: ${post.title}`);
                                }}
                                className="flex items-center gap-1.5 hover:text-[#FFFFFF] transition-colors"
                              >
                                <Share2 size={12} />
                                <span>SHARE</span>
                              </button>
                            </div>

                            {/* Replies List */}
                            {post.comments.length > 0 && (
                              <div className="mt-4 border-t border-[#161616] pt-4 space-y-3">
                                {post.comments.map((comment, cIdx) => (
                                  <div key={cIdx} className="bg-[#121212]/40 p-3 border border-[#1C1C1C] rounded text-xs">
                                    <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] text-[#D4AF37]">
                                      <span className="font-bold">{comment.author}</span>
                                      <span className="text-[#4A4A4A]">{comment.time}</span>
                                    </div>
                                    <MarkdownRenderer content={comment.content} className="text-xs text-[#8A8880] leading-relaxed font-sans" />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Comment Input */}
                            {activeReplyPostId === post.id && (
                              <div className="mt-4 border-t border-[#161616] pt-4 flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Write a professional reply..."
                                  value={replyInput}
                                  onChange={(e) => setReplyInput(e.target.value)}
                                  className="flex-1 bg-[#121212] border border-[#2A2A2A] focus:border-[#D4AF37] px-3 py-2 rounded text-xs text-[#FFFFFF] outline-none font-sans"
                                />
                                <button
                                  onClick={() => handleAddComment(post.id)}
                                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F5E6A3] text-[#0A0A0A] font-bold text-xs font-mono rounded transition-colors"
                                >
                                  Reply
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activePage === "leaderboard" && (
                  /* ==================== 2. LEADERBOARD ==================== */
                  <motion.div
                    key="leaderboard"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Header Details */}
                    <div className="border border-[#D4AF37]/20 bg-[#0E0E0E] p-6 rounded-lg text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
                      <div className="absolute top-0 left-0 w-[1px] h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />

                      <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] block mb-2 uppercase">// GLOBAL_RANKS</span>
                      <h1 className="font-serif text-3xl text-[#FFFFFF] tracking-wider uppercase mb-1">
                        Operative Leaderboard
                      </h1>
                      <p className="font-mono text-xs text-[#8A8880] tracking-widest mt-1">
                        CLIMB THE TIER LEVELS TO ACHIEVE CHECKMATE
                      </p>
                    </div>

                    {/* Filter Strip */}
                    <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">

                      {/* Overall/Weekly Tab Toggle */}
                      <div className="flex border border-[#1A1A1A]">
                        <button
                          onClick={() => setLeaderboardTab("overall")}
                          className={`px-4 py-2 transition-colors uppercase ${leaderboardTab === "overall" ? "bg-[#D4AF37] text-[#0A0A0A] font-bold" : "text-[#8A8880] hover:text-[#FFFFFF]"
                            }`}
                        >
                          Overall Season
                        </button>
                        <button
                          onClick={() => setLeaderboardTab("weekly")}
                          className={`px-4 py-2 transition-colors uppercase ${leaderboardTab === "weekly" ? "bg-[#D4AF37] text-[#0A0A0A] font-bold" : "text-[#8A8880] hover:text-[#FFFFFF]"
                            }`}
                        >
                          Week 4 Live
                        </button>
                      </div>

                      {/* Search Bar */}
                      <div className="relative flex-1 max-w-xs">
                        <input
                          type="text"
                          placeholder="Search participant name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#121212] border border-[#2A2A2A] focus:border-[#D4AF37] pl-8 pr-4 py-2 rounded text-xs text-[#FFFFFF] outline-none"
                        />
                        <Search size={12} className="absolute left-2.5 top-2.5 text-[#8A8880]" />
                      </div>

                      {/* College Dropdown */}
                      <div className="flex items-center gap-2 text-xs">
                        <Filter size={12} className="text-[#D4AF37]" />
                        <select
                          value={collegeFilter}
                          onChange={(e) => setCollegeFilter(e.target.value)}
                          className="bg-[#121212] border border-[#2A2A2A] text-[#EBE6DD] rounded px-2.5 py-1.5 outline-none focus:border-[#D4AF37]"
                        >
                          <option value="All">All Colleges</option>
                          <option value="TSEC Mumbai">TSEC Mumbai</option>
                          <option value="IIT Bombay">IIT Bombay</option>
                          <option value="VJTI Mumbai">VJTI Mumbai</option>
                          <option value="COEP Pune">COEP Pune</option>
                        </select>
                      </div>
                    </div>

                    {/* TOP 3 PODIUM DESIGN */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto w-full py-8 items-end text-center select-none">

                      {/* Rank 2 (Left) */}
                      <div className="flex flex-col items-center">
                        <div className="h-14 w-14 rounded-full bg-[#1C1C1C] border-2 border-slate-400 text-slate-400 font-bold text-sm flex items-center justify-center font-mono mb-2 relative shadow-lg">
                          RC
                          <span className="absolute -top-2 right-[-5px] bg-slate-400 text-[#0a0a0a] text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#0a0a0a]">2</span>
                        </div>
                        <h4 className="text-xs font-serif font-bold text-[#FFFFFF] truncate max-w-[90px]">Rohan Chawla</h4>
                        <p className="text-[9px] text-[#8A8880] truncate max-w-[90px]">VJTI Mumbai</p>

                        <div className="w-full bg-slate-400/10 border-t border-slate-400/30 h-24 mt-3 rounded-t-lg flex flex-col justify-center p-3 relative overflow-hidden">
                          <span className="font-mono text-xs text-[#FFFFFF]">2740 PTS</span>
                          <span className="font-mono text-[9px] text-slate-400 tracking-wider">MASTER</span>
                        </div>
                      </div>

                      {/* Rank 1 (Center - Elevated) */}
                      <div className="flex flex-col items-center">
                        <Crown className="text-[#D4AF37] mb-1 animate-bounce" size={24} />
                        <div className="h-16 w-16 rounded-full bg-[#1C1C1C] border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-base flex items-center justify-center font-mono mb-2 relative shadow-2xl">
                          AM
                          <span className="absolute -top-2 right-[-5px] bg-[#D4AF37] text-[#0a0a0a] text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center border border-[#0a0a0a]">1</span>
                        </div>
                        <h4 className="text-sm font-serif font-bold text-[#D4AF37] truncate max-w-[100px]">Ayush Mehrotra</h4>
                        <p className="text-[10px] text-[#8A8880] truncate max-w-[100px]">IIT Bombay</p>

                        <div className="w-full bg-[#D4AF37]/10 border-t-2 border-[#D4AF37] h-32 mt-3 rounded-t-lg flex flex-col justify-center p-3 relative overflow-hidden shadow-2xl">
                          <span className="font-mono text-sm text-[#FFFFFF] font-bold">2850 PTS</span>
                          <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest font-black uppercase">GRANDMASTER</span>
                        </div>
                      </div>

                      {/* Rank 3 (Right) */}
                      <div className="flex flex-col items-center">
                        <div className="h-14 w-14 rounded-full bg-[#1C1C1C] border-2 border-amber-600 text-amber-600 font-bold text-sm flex items-center justify-center font-mono mb-2 relative shadow-lg">
                          SK
                          <span className="absolute -top-2 right-[-5px] bg-amber-600 text-[#0a0a0a] text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#0a0a0a]">3</span>
                        </div>
                        <h4 className="text-xs font-serif font-bold text-[#FFFFFF] truncate max-w-[90px]">Sneha Kulkarni</h4>
                        <p className="text-[9px] text-[#8A8880] truncate max-w-[90px]">COEP Pune</p>

                        <div className="w-full bg-amber-600/10 border-t border-amber-600/30 h-20 mt-3 rounded-t-lg flex flex-col justify-center p-3 relative overflow-hidden">
                          <span className="font-mono text-xs text-[#FFFFFF]">2610 PTS</span>
                          <span className="font-mono text-[9px] text-amber-600 tracking-wider">MASTER</span>
                        </div>
                      </div>
                    </div>

                    {/* Rankings Table */}
                    <div className="border border-[#1A1A1A] bg-[#0E0E0E] rounded-lg overflow-hidden shadow-xl">
                      <table className="w-full border-collapse font-mono text-xs text-left">
                        <thead>
                          <tr className="bg-[#0A0A0A] border-b border-[#1A1A1A] text-[#8A8880] uppercase tracking-wider">
                            <th className="py-4 px-6">RANK</th>
                            <th className="py-4 px-6">PARTICIPANT</th>
                            <th className="py-4 px-6">COLLEGE</th>
                            <th className="py-4 px-6 text-center">STREAK</th>
                            <th className="py-4 px-6 text-center">ACCURACY</th>
                            <th className="py-4 px-6 text-right">SCORE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#161616]">
                          {LEADERBOARD_DATA
                            .filter(user => {
                              const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
                              const matchesCollege = collegeFilter === "All" || user.college === collegeFilter;
                              return matchesSearch && matchesCollege;
                            })
                            .map((user) => {
                              const isMe = user.name === "You";
                              const rankDisplay = leaderboardTab === "overall" ? user.rank : user.weeklyRank;

                              let badgeColor = "border-[#333] text-[#8A8880]";
                              if (user.badge === "Grandmaster") badgeColor = "border-[#D4AF37]/45 text-[#D4AF37] bg-[#D4AF37]/5";
                              else if (user.badge === "Master") badgeColor = "border-slate-400 text-slate-300";

                              return (
                                <tr
                                  key={user.rank}
                                  className={`hover:bg-[#121212] transition-colors ${isMe ? "bg-[#D4AF37]/5 font-bold border-l-2 border-l-[#D4AF37]" : ""
                                    }`}
                                >
                                  {/* Rank Column */}
                                  <td className="py-4 px-6 flex items-center gap-2">
                                    <span className={rankDisplay <= 3 ? "text-[#D4AF37] font-bold" : "text-[#8A8880]"}>
                                      #{rankDisplay}
                                    </span>
                                    {user.movement === "up" && <span className="text-[#10B981] text-[10px]">▲</span>}
                                    {user.movement === "down" && <span className="text-red-500 text-[10px]">▼</span>}
                                    {user.movement === "flat" && <span className="text-[#4A4A4A] text-[10px]">•</span>}
                                  </td>

                                  {/* Participant Detail */}
                                  <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[#FFFFFF]">{user.name}</span>
                                      <span className={`border text-[8px] px-1.5 py-0.5 rounded uppercase tracking-wide font-black ${badgeColor}`}>
                                        {user.badge}
                                      </span>
                                    </div>
                                  </td>

                                  {/* College Detail */}
                                  <td className="py-4 px-6 text-[#8A8880]">
                                    {user.college}
                                  </td>

                                  {/* Streak Detail */}
                                  <td className="py-4 px-6 text-center text-[#10B981] font-bold">
                                    <span className="inline-flex items-center gap-1">
                                      <Zap size={11} className="fill-current" /> {user.streak}w
                                    </span>
                                  </td>

                                  {/* Accuracy Detail */}
                                  <td className="py-4 px-6 text-center text-[#8A8880]">
                                    {user.accuracy}
                                  </td>

                                  {/* Total Score Detail */}
                                  <td className="py-4 px-6 text-right text-[#FFFFFF] font-bold">
                                    {user.score} <span className="text-[#8A8880] text-[10px] font-normal">PTS</span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activePage === "challenges" && (
                  /* ==================== 3. WEEKLY CHALLENGES ==================== */
                  <motion.div
                    key="challenges"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Header Strip */}
                    <div className="border border-[#D4AF37]/20 bg-[#0E0E0E] p-6 rounded-lg text-center relative overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#D4AF37] to-transparent" />
                      <div className="absolute bottom-0 right-0 w-[1px] h-24 bg-gradient-to-t from-[#D4AF37] to-transparent" />

                      <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] block mb-2 uppercase">// TIMELINE_COORDINATES</span>
                      <h1 className="font-serif text-3xl text-[#FFFFFF] tracking-wider uppercase mb-1">
                        8 Weeks · 8 Queens
                      </h1>
                      <p className="font-mono text-xs text-[#8A8880] tracking-widest mt-1">
                        SOLVE EACH STAGE TO DEPLOY ALL EIGHT QUEENS ON THE META BOARD
                      </p>
                    </div>

                    {/* Challenges List Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {WEEKS.map((week) => {
                        const isLive = week.status === "Live";
                        const isCompleted = week.status === "Completed";
                        const isLocked = week.status === "Upcoming";

                        let borderStyle = "border-[#1A1A1A] hover:border-[#D4AF37]/30 bg-[#0A0A0A]";
                        let tagStyle = "border-[#4A4A4A] text-[#8A8880] bg-[#111]";
                        if (isLive) {
                          borderStyle = "border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#D4AF37]/5 shadow-[inset_0_1px_15px_rgba(212,175,55,0.05)]";
                          tagStyle = "border-[#D4AF37]/45 text-[#D4AF37] bg-[#D4AF37]/10";
                        } else if (isCompleted) {
                          borderStyle = "border-[#1A1A1A]/70 bg-[#0E0E0E]/50 opacity-70";
                          tagStyle = "border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5";
                        }

                        return (
                          <div
                            key={week.id}
                            className={`p-6 border rounded-lg relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${borderStyle}`}
                          >
                            <div>
                              {/* Header info */}
                              <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-[10px] text-[#8A8880] tracking-wider uppercase block">
                                  WEEK 0{week.id}
                                </span>
                                <span className={`font-mono text-[9px] border px-2 py-0.5 uppercase tracking-widest rounded ${tagStyle}`}>
                                  {week.status}
                                </span>
                              </div>

                              <h3 className="font-serif text-lg text-[#FFFFFF] font-bold tracking-wide uppercase mb-2">
                                {week.title}
                              </h3>
                              <p className="text-xs text-[#8A8880] leading-relaxed mb-4 font-sans">
                                {week.desc}
                              </p>
                            </div>

                            {/* Footer stats / CTA */}
                            <div className="border-t border-[#1C1C1C] pt-4 mt-4 flex items-center justify-between font-mono text-[10px] text-[#8A8880]">
                              <div className="space-y-1">
                                <div>DIFFICULTY: <span className="text-[#D4AF37]">{week.difficulty}</span></div>
                                <div>TRIALS: <span className="text-[#FFFFFF]">{week.problems} PROBLEMS</span></div>
                              </div>

                              {isLocked ? (
                                <div className="flex items-center gap-1.5 text-[#4A4A4A] border border-[#222] px-4 py-2 uppercase tracking-widest text-[9px] font-bold rounded">
                                  <Lock size={10} /> Locked
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setActiveProblem(COMPILER_PROBLEMS[0]);
                                    setActivePage("dashboard");
                                  }}
                                  className={`px-4 py-2 border uppercase tracking-widest text-[9px] font-bold rounded transition-all flex items-center gap-1 ${isLive
                                      ? "border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-[#D4AF37]"
                                      : "border-[#8A8880]/30 hover:border-[#8A8880] text-[#8A8880] hover:text-[#FFFFFF]"
                                    }`}
                                >
                                  Enter Challenge <ChevronRight size={10} />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activePage === "compiler" && (
                  /* ==================== 4. CODING EXECUTION ENGINE ==================== */
                  <motion.div
                    key="compiler"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-5 h-full"
                  >
                    {/* Problem / Selector Strip */}
                    <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center gap-2.5">
                        <Code2 size={16} className="text-[#D4AF37]" />
                        <span className="font-bold uppercase text-[#FFFFFF]">Select Trial:</span>
                        <div className="flex gap-2">
                          {COMPILER_PROBLEMS.map((prob) => (
                            <button
                              key={prob.id}
                              onClick={() => {
                                setActiveProblem(prob);
                                setVerdict("idle");
                                setConsoleOutput("▸ Console ready. Click 'Run Code' to execute templates.");
                              }}
                              className={`px-3 py-1 border rounded text-[10px] font-bold uppercase transition-all ${activeProblem.id === prob.id
                                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                                  : "border-[#222] text-[#8A8880] hover:text-[#FFFFFF]"
                                }`}
                            >
                              {prob.title} ({prob.difficulty})
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Language Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#8A8880] uppercase tracking-wider text-[10px]">Lang:</span>
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value as any)}
                          className="bg-[#121212] border border-[#2A2A2A] text-[#EBE6DD] rounded px-3 py-1.5 outline-none focus:border-[#D4AF37] text-xs font-mono"
                        >
                          <option value="cpp">C++ (GCC 13)</option>
                          <option value="python">Python (3.11)</option>
                          <option value="java">Java (JDK 21)</option>
                          <option value="javascript">JavaScript (Node 20)</option>
                        </select>
                      </div>
                    </div>

                    {/* Split View Compiler Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[500px]">

                      {/* Left: Problem Description (takes 5 cols) */}
                      <div className="lg:col-span-5 border border-[#1A1A1A] bg-[#0E0E0E] p-6 rounded-lg flex flex-col justify-between overflow-y-auto max-h-[620px] custom-scrollbar">
                        <div>
                          {/* Title & Badge */}
                          <div className="flex justify-between items-start mb-4 border-b border-[#1C1C1C] pb-3">
                            <div>
                              <h2 className="font-serif text-lg text-[#FFFFFF] font-bold tracking-wide uppercase">
                                {activeProblem.title}
                              </h2>
                              <p className="font-mono text-[9px] text-[#8A8880] tracking-widest mt-0.5">TRIAL_0{activeProblem.id === "q2" ? "4" : "3"}</p>
                            </div>
                            <span className={`font-mono text-[9px] border px-2 py-0.5 uppercase tracking-wider rounded ${activeProblem.difficulty === "Hard"
                                ? "border-[#FF3333]/30 text-[#FF3333] bg-[#FF3333]/5"
                                : "border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5"
                              }`}>
                              {activeProblem.difficulty}
                            </span>
                          </div>

                          {/* Description */}
                          <div className="space-y-4 text-xs leading-relaxed text-[#8A8880] font-sans">
                            <MarkdownRenderer content={activeProblem.desc} className="text-[#FFFFFF]" />

                            <div>
                              <h4 className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1">// INPUT_FORMAT</h4>
                              <div className="bg-[#070707] border border-[#1C1C1C] p-2.5 rounded">
                                <MarkdownRenderer content={activeProblem.inputFormat} className="font-mono text-[10px]" />
                              </div>
                            </div>

                            <div>
                              <h4 className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1">// OUTPUT_FORMAT</h4>
                              <div className="bg-[#070707] border border-[#1C1C1C] p-2.5 rounded">
                                <MarkdownRenderer content={activeProblem.outputFormat} className="font-mono text-[10px]" />
                              </div>
                            </div>

                            <div>
                              <h4 className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1">// CONSTRAINTS</h4>
                              <ul className="list-disc list-inside space-y-1 font-mono text-[10px]">
                                {activeProblem.constraints.map((c, i) => (
                                  <li key={i} className="list-item">
                                    <MarkdownRenderer content={c} className="inline-block" />
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-t border-[#1C1C1C] pt-4">
                              <h4 className="font-mono text-[10px] text-[#FFFFFF] uppercase tracking-widest mb-2">// SAMPLECASE 01</h4>
                              <div className="bg-[#070707] border border-[#1C1C1C] p-3 font-mono text-[10px] space-y-1.5 rounded">
                                <div>Input: <span className="text-[#D4AF37]">{activeProblem.sampleInput}</span></div>
                                <div>Output: <span className="text-[#10B981]">{activeProblem.sampleOutput}</span></div>
                              </div>
                              <MarkdownRenderer content={activeProblem.explanation} className="text-[10px] mt-2 italic text-[#555550]" />
                            </div>
                          </div>
                        </div>

                        {/* Point Reward Indicator */}
                        <div className="border-t border-[#1C1C1C] pt-4 mt-6 flex justify-between items-center font-mono text-[10px] text-[#8A8880]">
                          <span>ESTIMATED XP REWARD:</span>
                          <span className="text-[#D4AF37] font-bold">{activeProblem.points} PTS</span>
                        </div>
                      </div>

                      {/* Right: Code Editor & Console Output (takes 7 cols) */}
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        {/* Editor Box */}
                        <div className="flex-1 border border-[#1A1A1A] bg-[#0E0E0E] rounded-lg overflow-hidden flex flex-col min-h-[360px]">
                          {/* Editor header panel */}
                          <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] px-4 py-2.5 flex items-center justify-between font-mono text-[10px] text-[#8A8880]">
                            <span>solution.{selectedLanguage === "cpp" ? "cpp" : selectedLanguage === "python" ? "py" : selectedLanguage === "java" ? "java" : "js"}</span>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                              <span className="w-2 h-2 rounded-full bg-yellow-500" />
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                          </div>

                          {/* Editor Textarea with simulated line numbers */}
                          <div className="flex-1 flex overflow-hidden relative">
                            {/* Lines indicator */}
                            <div className="w-10 bg-[#070707] border-r border-[#1C1C1C] text-right pr-2.5 py-4 font-mono text-[10px] text-[#3A3A35] select-none space-y-1.5 leading-[1.6]">
                              {Array.from({ length: 18 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                              ))}
                            </div>
                            <textarea
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              spellCheck={false}
                              className="flex-1 bg-transparent p-4 font-mono text-xs text-[#EBE6DD] leading-[1.6] resize-none outline-none border-none focus:ring-0 w-full min-h-[280px]"
                              style={{ tabSize: 4 }}
                            />
                          </div>
                        </div>

                        {/* Compiler Console Box */}
                        <div className="border border-[#1A1A1A] bg-[#0E0E0E] rounded-lg overflow-hidden flex flex-col h-[180px]">
                          {/* Header console */}
                          <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] px-4 py-2.5 flex items-center justify-between font-mono text-[10px]">
                            <span className="text-[#FFFFFF] font-bold">JUDGE CONSOLE</span>
                            <div className="flex items-center gap-2">
                              {verdict === "accepted" && (
                                <span className="text-[#10B981] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                                  <CheckCircle size={10} /> ACCEPTED
                                </span>
                              )}
                              {verdict === "wrong_answer" && (
                                <span className="text-red-500 font-bold uppercase tracking-wider">
                                  WRONG ANSWER
                                </span>
                              )}
                              {isCompiling ? (
                                <span className="text-[#D4AF37] font-bold uppercase tracking-wider animate-pulse">
                                  COMPILING...
                                </span>
                              ) : (
                                <span className="text-[#4A4A4A]">READY</span>
                              )}
                            </div>
                          </div>

                          {/* Console Output Logs */}
                          <pre className="flex-1 p-4 bg-[#070707] font-mono text-[10px] text-[#8A8880] overflow-y-auto leading-relaxed whitespace-pre-wrap">
                            {consoleOutput}
                          </pre>

                          {/* Action Strip */}
                          <div className="bg-[#0A0A0A] border-t border-[#1C1C1C] px-4 py-3 flex justify-end gap-3 shrink-0">
                            <button
                              onClick={handleRunCode}
                              disabled={isCompiling}
                              className="border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-[10px] tracking-wider uppercase px-4 py-2 rounded transition-colors disabled:opacity-50"
                            >
                              Run Code
                            </button>
                            <button
                              onClick={handleSubmitCode}
                              disabled={isCompiling}
                              className="bg-[#D4AF37] hover:bg-[#F5E6A3] text-[#0A0A0A] font-mono text-[10px] tracking-widest font-bold uppercase px-5 py-2 rounded transition-colors disabled:opacity-50"
                            >
                              Submit Solution
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePage === "submissions" && (
                  /* ==================== 5. SUBMISSIONS ==================== */
                  <motion.div
                    key="submissions"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="border border-[#1A1A1A] bg-[#0E0E0E] p-6 rounded-lg relative overflow-hidden">
                      <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] block mb-3 uppercase">// EX_EXEC_HISTORY</span>
                      <h2 className="font-serif text-xl text-[#FFFFFF] tracking-wider uppercase mb-1">Your Submission Log</h2>
                      <p className="font-mono text-xs text-[#8A8880] tracking-widest mt-1">ALL TRANSLATIONS DEPLOYED TO THE MAIN SHELL</p>
                    </div>

                    <div className="border border-[#1A1A1A] bg-[#0A0A0A] rounded-lg overflow-hidden shadow-xl">
                      <table className="w-full border-collapse font-mono text-xs text-left">
                        <thead>
                          <tr className="bg-[#0E0E0E] border-b border-[#1A1A1A] text-[#8A8880] uppercase tracking-wider">
                            <th className="py-4 px-6">TIMESTAMP</th>
                            <th className="py-4 px-6">TRIAL TITLE</th>
                            <th className="py-4 px-6 text-center">LANG</th>
                            <th className="py-4 px-6 text-right">VERDICT</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#161616]">
                          {submissionsHistory.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="py-12 text-center text-[#4A4A4A] italic uppercase tracking-wider select-none">
                                No compiler outputs submitted in this active session
                              </td>
                            </tr>
                          ) : (
                            submissionsHistory.map((sub, idx) => (
                              <tr key={idx} className="hover:bg-[#121212]">
                                <td className="py-4 px-6 text-[#8A8880]">{sub.time}</td>
                                <td className="py-4 px-6 text-[#FFFFFF] font-bold uppercase">{activeProblem.title}</td>
                                <td className="py-4 px-6 text-center text-[#D4AF37]">{sub.lang}</td>
                                <td className="py-4 px-6 text-right text-[#10B981] font-bold tracking-widest uppercase">
                                  ✓ {sub.verdict}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activePage === "announcements" && (
                  /* ==================== 6. ANNOUNCEMENTS ==================== */
                  <motion.div
                    key="announcements"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="border border-[#D4AF37]/20 bg-[#0E0E0E] p-6 rounded-lg relative overflow-hidden">
                      <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] block mb-2 uppercase">// BROADCASTS</span>
                      <h2 className="font-serif text-xl text-[#FFFFFF] tracking-wider uppercase mb-1">Official Signals</h2>
                      <p className="font-mono text-xs text-[#8A8880] tracking-widest mt-1">LATEST UPDATES DIRECT FROM TSEC CODECELL CORE</p>
                    </div>

                    <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-3 font-mono text-[10px] text-[#D4AF37]">
                        <span>SIGNAL_REF: #2026.06.17</span>
                        <span>LIVE NOW</span>
                      </div>
                      <h3 className="font-serif text-base text-[#FFFFFF] uppercase tracking-wide font-bold mb-2">
                        Week 4 Survival ELO Rating update
                      </h3>
                      <p className="text-xs text-[#8A8880] leading-relaxed mb-4">
                        All participants who clear the N-Queens Survival with exactly O(N) auxiliary space will be awarded a secondary tie-break bonus (+15 ELO Points). Real-time leaderboard calculations have been synchronized with our core test suite.
                      </p>
                      <div className="h-px w-12 bg-[#D4AF37]" />
                    </div>
                  </motion.div>
                )}

                {activePage === "profile" && (
                  /* ==================== 7. PROFILE ==================== */
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="border border-[#D4AF37]/20 bg-[#0E0E0E] p-6 rounded-lg relative overflow-hidden">
                      <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] block mb-2 uppercase">// IDENTITY_DOSSIER</span>
                      <h2 className="font-serif text-xl text-[#FFFFFF] tracking-wider uppercase mb-1">Operative Details</h2>
                      <p className="font-mono text-xs text-[#8A8880] tracking-widest mt-1">MANAGE SYSTEM PARAMETERS AND PRE-REGISTRATION ACCESS</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                      {/* Stats Overview */}
                      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 rounded-lg space-y-4">
                        <h3 className="font-serif text-sm text-[#FFFFFF] uppercase tracking-wider border-b border-[#1C1C1C] pb-2">Season statistics</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#8A8880]">USER:</span>
                            <span className="text-[#FFFFFF]">{username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8A8880]">COLLEGE:</span>
                            <span className="text-[#FFFFFF]">{collegeName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8A8880]">GLOBAL RANK:</span>
                            <span className="text-[#D4AF37] font-bold">#47</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8A8880]">ACTIVE STREAK:</span>
                            <span className="text-[#10B981] font-bold">4 WEEKS ACTIVE</span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 rounded-lg space-y-4">
                        <h3 className="font-serif text-sm text-[#FFFFFF] uppercase tracking-wider border-b border-[#1C1C1C] pb-2">Guild Badges</h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {["Segment tree guru", "Bitmask survivor", "Chessboard commander"].map((badge, idx) => (
                            <span key={idx} className="border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[9px] px-3 py-1.5 uppercase rounded text-[#D4AF37] font-bold tracking-wider">
                              ★ {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* RIGHT SIDEBAR: AD SPONSOR PANEL (takes ~12-15% width) */}
            <aside className="lg:w-[13%] shrink-0 flex flex-col gap-6">

              {/* Sponsor Module Wrapper */}
              <div className="border border-[#D4AF37]/20 bg-[#0E0E0E]/90 p-4 rounded-lg relative overflow-hidden flex flex-col h-full min-h-[480px] shadow-2xl justify-between">

                {/* Visual Chess Grid Header decoration */}
                <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <div className="mb-4">
                  <span className="font-mono text-[9px] text-[#8A8880] tracking-[0.25em] block text-center uppercase mb-3">// SPONSORS</span>
                  <div className="w-full h-[1px] bg-[#1C1C1C] mb-4" />

                  {/* Title Sponsor Placeholder */}
                  <div className="border border-[#D4AF37]/30 bg-[#070707] p-2.5 rounded text-center relative mb-4">
                    <span className="font-mono text-[7px] text-[#D4AF37] tracking-widest uppercase block mb-1">TITLE SPONSOR</span>
                    <div className="font-serif text-[11px] font-bold text-[#FFFFFF] tracking-wider uppercase">TSEC CODECELL</div>
                    <span className="font-mono text-[6px] text-[#8A8880] block mt-0.5">// 2026 Season</span>
                  </div>

                  {/* PLATINUM SPONSORS - Rotator Ad Panel */}
                  <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-3 rounded flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
                    <span className="font-mono text-[7px] text-[#8A8880] tracking-widest uppercase block mb-1">PLATINUM PARTNER</span>

                    {/* Rotating Ad Banner animation wrapper */}
                    <div className="flex-1 flex flex-col justify-center my-2 select-none">
                      <h4 className="font-serif text-[13px] font-bold text-[#D4AF37] uppercase tracking-wide leading-tight mb-1">
                        {sponsorAds[currentAdIdx].name}
                      </h4>
                      <p className="text-[9px] text-[#8A8880] leading-relaxed font-sans">
                        {sponsorAds[currentAdIdx].text}
                      </p>
                    </div>

                    <a
                      href={sponsorAds[currentAdIdx].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-[#D4AF37] font-mono text-[8px] font-bold tracking-widest uppercase py-1.5 rounded text-center transition-all flex items-center justify-center gap-1"
                    >
                      {sponsorAds[currentAdIdx].cta} <ExternalLink size={8} />
                    </a>
                  </div>
                </div>

                {/* Additional Tiers Grid */}
                <div className="space-y-3 pt-4 border-t border-[#1C1C1C] mt-auto">
                  <span className="font-mono text-[7px] text-[#4A4A4A] tracking-wider block text-center uppercase">// PLATINUM & GOLD</span>

                  {/* Mindflix Holiday card */}
                  <div className="border border-[#1A1A1A] bg-[#070707] p-2.5 rounded text-center group hover:border-[#D4AF37]/30 transition-colors">
                    <div className="font-serif text-[10px] text-[#FFFFFF] font-bold uppercase tracking-wide group-hover:text-[#D4AF37]">Mindflix</div>
                    <span className="font-mono text-[7px] text-[#8A8880] block uppercase mt-0.5">Holidays Partner</span>
                  </div>

                  {/* Engaze Card */}
                  <div className="border border-[#1A1A1A] bg-[#070707] p-2.5 rounded text-center group hover:border-[#D4AF37]/30 transition-colors">
                    <div className="font-serif text-[10px] text-[#FFFFFF] font-bold uppercase tracking-wide group-hover:text-[#D4AF37]">Engaze.ai</div>
                    <span className="font-mono text-[7px] text-[#8A8880] block uppercase mt-0.5">Ecosystem Partner</span>
                  </div>
                </div>

                {/* Cyber accent decoration footer */}
                <div className="font-mono text-[6px] text-[#333] text-center mt-3 tracking-widest select-none uppercase">
                  cc_sponsor_auth_ok
                </div>
              </div>

            </aside>
          </div>

          {/* SYSTEM STATUS FOOTER STRIP */}
          <footer className="w-full bg-[#0A0A0A] border-t border-[#D4AF37]/15 py-3.5 px-6 font-mono text-[10px] text-[#8A8880] text-center select-none relative z-40">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>SHELL v2.0 CONNECTED // TSEC_CODECELL_SECURE</span>
              </div>
              <div className="hover:text-[#FFFFFF] transition-colors">
                CODE. COMPETE. CONQUER. © 2026
              </div>
            </div>
          </footer>

        </div>
      )}
    </div>
  );
}
