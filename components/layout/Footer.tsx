"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

export default function Footer() {
  const pathname = usePathname();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const isEventPage = pathname.startsWith("/dashboard");

  const primaryAccent = isEventPage ? "#D4AF37" : "#4BE2C4";
  const secondaryAccent = isEventPage ? "#F5E6A3" : "#E8FF00";

  return (
    <>
      <div
        className="relative z-10 h-1 w-full"
        style={{ background: `linear-gradient(to right, ${primaryAccent}, ${secondaryAccent})` }}
      />
      <footer className="relative z-10 w-full bg-[#0D0D0D] border-t border-[#222222] pt-20 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-[#222222] items-start">
          {/* Column 1: TSEC CODECELL */}
          <div className="flex flex-col justify-between h-full min-h-[140px]">
            <div>
              <div className="relative w-10 h-10 mb-4">
                <Image
                  src="/logo.png"
                  alt="TSEC CodeCell Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <h3 className="font-mono text-[13px] font-bold text-[#F0EDE6] uppercase tracking-[0.2em] mb-4">
                TSEC CODECELL
              </h3>
              <p className="font-mono text-xs text-[#8A8880] leading-relaxed">
                // where tsec students
                <br />
                ship production code
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#4BE2C4] mt-6 select-none uppercase tracking-wider font-bold">
              [ SECURE SHELL v2.0 ]
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div>
            <h3 className="font-mono text-[11px] text-[#F0EDE6] font-bold uppercase tracking-widest mb-4">
              EXPLORE
            </h3>
            <ul className="flex flex-col gap-3 font-sans text-[13px] text-[#8A8880]">
              <li>
                <Link href="/dashboard" className="hover:text-[#E8FF00] transition-colors duration-200">
                  Weekly Gambit
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#E8FF00] transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div>
            <h3 className="font-mono text-[11px] text-[#F0EDE6] font-bold uppercase tracking-widest mb-4">
              CONNECT
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://www.youtube.com/channel/UCPPF2ezbCXV10fROZRiobfg"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#222222] hover:border-[#FF0000] flex items-center justify-center bg-[#111111] transition-all duration-300 group"
                title="YouTube"
              >
                <Youtube size={18} className="text-[#8A8880] group-hover:text-[#FF0000] transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/tseccodecell/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-[#222222] hover:border-[#E1306C] flex items-center justify-center bg-[#111111] transition-all duration-300 group"
                title="Instagram"
              >
                <Instagram size={18} className="text-[#8A8880] group-hover:text-[#E1306C] transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 4: LEGAL */}
          <div>
            <h3 className="font-mono text-[11px] text-[#F0EDE6] font-bold uppercase tracking-widest mb-4">
              LEGAL
            </h3>
            <ul className="flex flex-col gap-3 font-sans text-[13px] text-[#8A8880]">
              <li>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="cursor-pointer text-left hover:text-[#F0EDE6] transition-colors focus:outline-none"
                >
                  Privacy Policy
                </button>
              </li>
              <li className="text-[10px] font-mono text-[#4A4A4A] mt-2 select-none uppercase tracking-widest">
                VER: 2026.06.01
              </li>
            </ul>
          </div>
        </div>

        {/* Footer base strip */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between mt-8 text-[10px] text-[#8A8880] font-mono tracking-wider select-none">
          <div className="hover:text-[#F0EDE6] transition-colors">TSEC CODECELL © 2026</div>
        </div>
      </footer>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}
