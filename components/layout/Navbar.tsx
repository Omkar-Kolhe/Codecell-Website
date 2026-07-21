"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "EVENTS",
    href: "/events",
    dropdownItems: [
      { label: "TSEC HACKS", href: "/events/tsec-hacks" },
      { label: "WEEKLY CHALLENGES", href: "/events/weekly-challenges" },
      { label: "MINI EVENT", href: "/events/mini-event" },
    ],
  },
  { label: "ABOUT US", href: "/about-us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  // Real-time scroll progress using rAF + direct DOM for zero-lag
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && progressRef.current) {
        const pct = (window.scrollY / totalScroll) * 100;
        progressRef.current.style.width = `${pct}%`;
      }
      setScrolled(window.scrollY > 20);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isEventPage = pathname.startsWith("/dashboard") ||
    pathname.startsWith("/leaderboard") ||
    pathname.startsWith("/events");

  const primaryAccent = isEventPage ? "#D4AF37" : "#4BE2C4";
  const secondaryAccent = isEventPage ? "#F5E6A3" : "#E8FF00";

  return (
    <>
      {/* 2px tall scroll progress bar — driven by ref for zero-lag */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[2px] z-[9999]"
        style={{
          width: "0%",
          willChange: "width",
          background: `linear-gradient(to right, ${primaryAccent}, ${secondaryAccent})`,
          boxShadow: isEventPage ? `0 0 10px ${primaryAccent}40` : "none"
        }}
      />

      <header
        className="sticky top-0 left-0 z-50 w-full border-b border-[#4BE2C4]/15 navbar-grid-bg"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* =====================================
              LOGO / BRAND
          ===================================== */}
          <div className="flex-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.18em] font-bold text-[#F0EDE6] transition-colors duration-200 group"
            >
              <div className="w-6 h-6 relative neon-glow-cyan">
                <Image
                  src="/logo.png"
                  alt="TSEC CodeCell Logo"
                  fill
                  sizes="24px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-[#F0EDE6] group-hover:text-[#4BE2C4] transition-colors duration-200">
                TSEC CODECELL_
              </span>
            </Link>
          </div>

          {/* =====================================
              DESKTOP NAV
          ===================================== */}
          <nav className="hidden lg:flex flex-none items-center gap-10">
            {navItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isHome = item.label === "HOME";
              const activeColor = isEventPage ? primaryAccent : (isEven ? "#E8FF00" : "#4BE2C4");
              const activeClass = isEventPage ? "text-[#D4AF37]" : (isEven ? "text-[#E8FF00]" : "text-[#4BE2C4]");

              if (item.dropdownItems) {
                const isSubActive = item.dropdownItems.some((sub) => pathname === sub.href);

                return (
                  <div
                    key={item.label}
                    className="relative py-2 group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`
                        flex
                        items-center
                        gap-1
                        font-mono
                        text-[12px]
                        font-bold
                        tracking-[0.15em]
                        transition-colors
                        duration-200
                        cursor-pointer
                        ${isSubActive ? activeClass : "text-[#F0EDE6]"}
                      `}
                      style={{
                        color: isSubActive ? activeColor : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubActive) e.currentTarget.style.color = activeColor;
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubActive) e.currentTarget.style.color = "#F0EDE6";
                      }}
                    >
                      <span className="hover:text-inherit transition-none">
                        {item.label}
                      </span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <span
                      className={`
                        absolute
                        bottom-0
                        left-0
                        h-[1.5px]
                        transition-all
                        duration-300
                        ${isSubActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                      style={{
                        backgroundColor: activeColor,
                      }}
                    />

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 ${isEventPage ? "bg-[#0A0A0A] border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(212,175,55,0.05)]" : "bg-[#0D0D0D] border-[#2A2A2A] shadow-[0_8px_32px_rgba(0,0,0,0.8)]"} border py-2 flex flex-col z-[1000] backdrop-blur-md bg-opacity-95`}>
                        {/* Bridge to prevent mouse leave in the gap */}
                        <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent" />
                        {item.dropdownItems.map((subItem) => {
                          const isSubItemActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`
                                px-4
                                py-2.5
                                text-[10px]
                                font-mono
                                font-bold
                                tracking-wider
                                transition-colors
                                duration-200
                                border-l-2
                                ${isSubItemActive
                                  ? (isEventPage ? "text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5" : "text-[#E8FF00] border-[#E8FF00] bg-[#141414]")
                                  : (isEventPage ? "text-[#8A8880] border-transparent hover:text-[#F0EDE6] hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/50" : "text-[#4A4A4A] border-transparent hover:text-[#F0EDE6] hover:bg-[#141414] hover:border-[#4BE2C4]")
                                }
                              `}
                            >
                              [ {subItem.label} ]
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    relative
                    py-2
                    font-mono
                    text-[12px]
                    font-bold
                    tracking-[0.15em]
                    transition-colors
                    duration-200
                    group
                    ${isActive ? activeClass : (isHome ? "text-[#E8FF00] neon-text-lime font-black" : "text-[#F0EDE6]")}
                  `}
                  style={{
                    color: isActive ? activeColor : (isHome ? "#E8FF00" : undefined),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = isHome ? "#E8FF00" : activeColor;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = isHome ? "#E8FF00" : "#F0EDE6";
                  }}
                >
                  {item.label}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-[1.5px]
                      transition-all
                      duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    style={{
                      backgroundColor: activeColor,
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* =====================================
              DESKTOP LOGIN BUTTON (Removed)
          ===================================== */}
          <div className="hidden lg:block flex-1"></div>

          {/* =====================================
              MOBILE HAMBURGER
          ===================================== */}
          <button
            onClick={() => setOpen(!open)}
            className={`
              lg:hidden
              p-2
              text-[#F0EDE6]
              transition-colors
              ${isEventPage ? "hover:text-[#D4AF37]" : "hover:text-[#4BE2C4]"}
            `}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* =====================================
            MOBILE EXPANDING MENU (Downwards)
        ===================================== */}
        {open && (
          <div
            className={`
              lg:hidden
              border-b
              px-8
              py-8
              border-[#4BE2C4]/35 bg-[#0D0D0D]/95 backdrop-blur-md
            `}
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => {
                const isEven = index % 2 === 0;
                const isHome = item.label === "HOME";
                const activeColor = isEventPage ? "text-[#D4AF37]" : (isEven ? "text-[#E8FF00]" : "text-[#4BE2C4]");
                const hoverColor = isEventPage ? "hover:text-[#D4AF37]" : "hover:text-[#E8FF00]";

                if (item.dropdownItems) {
                  const isSubActive = item.dropdownItems.some((sub) => pathname === sub.href);
                  const isMobileOpen = mobileDropdownOpen === item.label;

                  return (
                    <div
                      key={item.label}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      className={`
                        flex
                        flex-col
                        transition-all
                        duration-300
                        transform
                        border-b
                        border-[#161616]
                        pb-2
                        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                      `}
                    >
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className={`
                          font-mono
                          text-xs
                          font-bold
                          tracking-[0.15em]
                          py-2
                          h-[32px]
                          flex
                          items-center
                          justify-between
                          w-full
                          cursor-pointer
                          ${isSubActive ? activeColor : `text-[#F0EDE6] ${hoverColor}`}
                        `}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isMobileOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {isMobileOpen && (
                        <div className="pl-4 flex flex-col gap-3 mt-2 font-mono text-[11px]">
                          {item.dropdownItems.map((subItem) => {
                            const isSubItemActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setOpen(false)}
                                className={`
                                  py-1.5
                                  font-bold
                                  tracking-wider
                                  transition-colors
                                  ${isSubItemActive ? activeColor : `text-[#4A4A4A] hover:text-[#F0EDE6]`}
                                `}
                              >
                                [ {subItem.label} ]
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    className={`
                      font-mono
                      text-xs
                      font-bold
                      tracking-[0.15em]
                      py-2
                      border-b
                      border-[#161616]
                      h-[32px]
                      flex
                      items-center
                      transition-all
                      duration-300
                      transform
                      ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                      ${isActive ? activeColor : (isHome ? "text-[#E8FF00] neon-text-lime font-black" : `text-[#F0EDE6] ${hoverColor}`)}
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* LOGIN MOBILE BUTTON REMOVED */}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}