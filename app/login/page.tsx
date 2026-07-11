"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [authPhase, setAuthPhase] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const setAuthCookie = () => {
    if (typeof document !== "undefined") {
      document.cookie = "auth-token=codecell-dashboard; path=/; max-age=86400; SameSite=Lax";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (usernameInput.trim()) {
      setIsAuthenticating(true);
      setAuthProgress(0);
    } else {
      setErrorMessage("USERNAME_REQUIRED: ENTER A USER ID");
    }
  };

  useEffect(() => {
    if (!isAuthenticating) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setAuthProgress(progress);

      // Phase logs
      if (progress < 25) {
        setAuthPhase("DECRYPTING HASH SHA-256...");
      } else if (progress < 60) {
        setAuthPhase("STABILIZING SECURE HANDSHAKE...");
      } else if (progress < 90) {
        setAuthPhase("VERIFYING LOCAL ACCESS TOKENS...");
      } else {
        setAuthPhase("SESSION AUTHENTICATED. REDIRECTING...");
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setAuthCookie();
          localStorage.setItem("dashboard_isLoggedIn", "true");
          localStorage.setItem("dashboard_username", usernameInput || "root_operator");
          localStorage.setItem("dashboard_collegeName", "TSEC Mumbai");
          window.location.assign("/dashboard");
        }, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isAuthenticating, usernameInput]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-transparent flex items-center justify-center px-6 py-12 select-none">
      <div className="w-full max-w-md border border-[#2A2A2A] bg-[#111111]/80 backdrop-blur-sm p-8 font-mono shadow-2xl relative">
        {/* Decorative corner lines */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#E8FF00] pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#4BE2C4] pointer-events-none" />

        {/* Back Link */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[10px] text-[#4A4A4A] hover:text-[#E8FF00] mb-6 transition-colors"
        >
          <ArrowLeft size={12} /> BACK_TO_ROOT.exe
        </Link>

        {/* Header */}
        <div className="border-b border-[#2A2A2A] pb-4 mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <Shield size={14} className="text-[#FF4D00]" />
            <span className="text-[10px] text-[#4A4A4A] uppercase tracking-widest">SECURE_LOGIN_SHELL</span>
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#F0EDE6] font-display">
            LOGIN
          </h2>
        </div>

        {/* Decryption Interface Overlay */}
        {isAuthenticating ? (
          <div className="space-y-6 py-4 font-mono text-xs">
            <div className="flex justify-between items-center text-[#4BE2C4] font-bold">
              <span className="animate-pulse">&gt; ESTABLISHING ACCESS PIPELINE...</span>
              <span>{authProgress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#1A1A1A] h-1.5 rounded-none overflow-hidden border border-[#222222]">
              <motion.div
                className="bg-[#4BE2C4] h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${authProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Simulated Mainframe Logs */}
            <div className="bg-[#0D0D0D] border border-[#222222] p-4 text-[10px] leading-relaxed text-[#8A8880] h-[120px] overflow-hidden flex flex-col justify-end">
              <div className="space-y-1">
                <div>{`[OK] SOCKET CONNECTED TO SERVER`}</div>
                {authProgress > 20 && <div>{`[OK] PARSING HASH CODES`}</div>}
                {authProgress > 50 && <div>{`[OK] SYNC HANDSHAKE ESTABLISHED`}</div>}
                {authProgress > 80 && <div>{`[OK] CREDENTIAL VALIDATION COMPLETE`}</div>}
                <div className="text-[#E8FF00] font-bold mt-2">{`> ${authPhase}`}</div>
              </div>
            </div>
          </div>
        ) : (
          /* Form */
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] text-[#4A4A4A] uppercase tracking-wider mb-1.5">
                User ID / Email:
              </label>
              <input
                type="text"
                required
                placeholder="root_operator"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="
                  w-full
                  bg-[#0D0D0D]
                  border
                  border-[#2A2A2A]
                  px-4
                  py-3
                  text-xs
                  text-[#F0EDE6]
                  focus:outline-none
                  focus:border-[#E8FF00]
                  transition-colors
                "
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#4A4A4A] pt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="bg-transparent border border-[#2A2A2A] checked:bg-[#4BE2C4] rounded-none focus:ring-0"
                />
                <span>RETAIN_SESSION</span>
              </label>
              <span className="text-[#4A4A4A]">ACCESS_READY</span>
            </div>

            {errorMessage && (
              <div className="text-[#FF4D00] text-xs font-bold font-mono tracking-wider border border-[#FF4D00]/30 bg-[#FF4D00]/5 px-4 py-2.5 mt-4 animate-pulse">
                &gt; {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="
                w-full
                mt-6
                btn-sweep
                bg-[#E8FF00]
                text-[#0D0D0D]
                border
                border-[#E8FF00]
                py-3.5
                text-xs
                font-bold
                tracking-[0.15em]
              "
            >
              [ AUTHENTICATE SYSTEM ACCESS ]
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-[9px] text-[#4A4A4A]">
          SYSTEM WARNING: UNAUTHORIZED ACCESS ATTEMPTS ARE DETECTED AND LOGGED.
        </div>
      </div>
    </div>
  );
}
