"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/lib/api-client";

export default function LoginPage() {
  useEffect(() => {
    // If the user already has the cookie, middleware will let them into dashboard.
    // We don't need to check localStorage here anymore.
  }, []);

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

        {/* Google OAuth Button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-[10px] text-[#4A4A4A] pt-2 mb-4">
            <span className="text-[#4BE2C4]">SECURE_CHANNEL</span>
            <span className="uppercase">OAUTH_V2</span>
          </div>
          <button
            onClick={() => window.location.href = `${BASE_URL}/oauth/google/login`}
            className="
              w-full 
              bg-white text-black 
              hover:bg-[#E8FF00] hover:text-black
              px-4 py-4 
              font-mono text-sm
              font-medium
              rounded
              shadow-sm
              transition-all
              flex items-center justify-center gap-3
            "
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[9px] text-[#4A4A4A]">
          SYSTEM WARNING: UNAUTHORIZED ACCESS ATTEMPTS ARE DETECTED AND LOGGED.
        </div>
      </div>
    </div>
  );
}
