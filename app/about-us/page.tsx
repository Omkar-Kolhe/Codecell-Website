"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Users, Shield, Github, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import AboutHero from "@/components/sections/AboutHero";
import {
  SectionHeader,
  SectionWrap,
  GlassCard,
  HexButton,
  PremiumFaq,
  BentoMotion,
  AnimatedNumber,
  type FaqItem,
} from "@/components/sections/SectionKit";

const teamCrew = [
  { name: "Aryan Bhuimbar", role: "Marketing, Design & Overall Coordination", handle: "@aryan.b", photo: "/Scoms%20pics/Aryan.jpeg", team: "Scom", github: "", linkedin: "" },
  { name: "Darryl Mathias", role: "Tech (Backend, DevOps & Cloud)", handle: "@darryl.m", photo: "/Scoms%20pics/darryl.jpg", team: "Scom", github: "", linkedin: "" },
  { name: "Darsh Nagrani", role: "Marketing & Tech (Problem Setting & Backend)", handle: "@darsh.n", photo: "/Scoms%20pics/Darsh.png", team: "Scom", github: "https://github.com/darshnagraniwork-png", linkedin: "https://www.linkedin.com/in/darsh-nagrani", position: "object-top" },
  { name: "Krishna Jaiswal", role: "Tech (Frontend & Backend)", handle: "@krishna.j", photo: "/Scoms%20pics/Krishna.jpg", team: "Scom", github: "https://github.com/Coderkrishna12", linkedin: "https://www.linkedin.com/in/krishna-jaiswal10/" },
  { name: "Laksh Shetty", role: "Tech & Documentation", handle: "@laksh.s", photo: "/team_lead.png", team: "Scom", github: "", linkedin: "" },
  { name: "Omkar Kolhe", role: "Tech(Frontend, Problem Setting) and Design", handle: "@omkar.k", photo: "/Scoms%20pics/Omkar.jpeg", team: "Scom", github: "https://github.com/Omkar-Kolhe", linkedin: "https://www.linkedin.com/in/omkarkolhe14/" },
  { name: "Piyusha Bhadane", role: "Design, Tech (Frontend) & Brochure", handle: "@piyusha.b", photo: "/team_pr.png", team: "Scom", github: "", linkedin: "" },
  { name: "Pranav Soneji", role: "Coordinations, Marketing & Tech", handle: "@pranav.s", photo: "/Scoms%20pics/pranav.jpg", team: "Scom", github: "https://github.com/PranavSoneji-07", linkedin: "https://www.linkedin.com/in/pranav-soneji" },
  { name: "Rucha Sinkar", role: "Tech & Social Media", handle: "@rucha.s", photo: "/Scoms%20pics/Rucha.jpg", team: "Scom", github: "https://github.com/RuchaSinkar", linkedin: "https://www.linkedin.com/in/rucha-sinkar-b81003322/" },
  { name: "Sanket Bhandari", role: "Tech (Backend) & Documentation", handle: "@sanket.b", photo: "/Scoms%20pics/sanket.jpg", team: "Scom", github: "https://github.com/SanketBhandarii", linkedin: "https://linkedin.com/in/sanketbhandari", position: "object-[center_35%]" },
  { name: "Shaurya Wajge", role: "Tech (Frontend, Backend & Integration)", handle: "@shaurya.w", photo: "/team_tech.png", team: "Scom", github: "https://github.com/shaurya-w", linkedin: "https://in.linkedin.com/in/shaurya-wajge" },
  { name: "Shivam Thakur", role: "Tech", handle: "@shivam.t", photo: "/team_lead.png", team: "Scom", github: "https://github.com/codexllamma", linkedin: "https://www.linkedin.com/in/shivam-thakur-a404a033b/" },
  { name: "Shloka Shetiya", role: "Tech (Frontend & Backend)", handle: "@shloka.s", photo: "/Scoms%20pics/Shloka.png", team: "Scom", github: "https://github.com/Shloka21", linkedin: "https://www.linkedin.com/in/shloka-shetiya-534bb0265" },
  { name: "Shreya Awari", role: "Publicity Head", handle: "@shreya.a", photo: "/team_pr.png", team: "Scom", github: "https://github.com/shreyaawari28", linkedin: "https://www.linkedin.com/in/shreya-awari-/" },
  { name: "Soham Keswani", role: "Marketing, Design & Overall Coordination", handle: "@soham.k", photo: "/Scoms%20pics/Soham.jpg", team: "Scom", github: "https://github.com/sohamk273", linkedin: "https://www.linkedin.com/in/soham-keswani-b7b1a6355/" },
  { name: "Suhani Motwani", role: "Marketing, Overall Coordination & Tech", handle: "@suhani.m", photo: "/team_event.png", team: "Scom", github: "https://github.com/SuhaniMotwani", linkedin: "https://www.linkedin.com/in/suhani-motwani-502b7135a/" },
  { name: "Tanvir Singh Kohli", role: "Marketing, Design & Tech", handle: "@tanvir.s", photo: "/team_lead.png", team: "Scom", github: "https://github.com/MrTSinghK", linkedin: "https://www.linkedin.com/in/tanvir-harpreet-singh-kohli-a45716219/" },
  { name: "Tejas Halvankar", role: "Marketing Head", handle: "@tejas.h", photo: "/team_tech.png", team: "Scom", github: "https://github.com/Tejas-H01", linkedin: "https://www.linkedin.com/in/tejashalvankar" },
  { name: "Wilbert Nadar", role: "Tech (Backend & Problem Setting)", handle: "@wilbert.n", photo: "/team_tech.png", team: "Scom", github: "https://github.com/wilbert0838n", linkedin: "https://www.linkedin.com/in/wilbert-nadar/" },
  { name: "Yachna Sharma", role: "Brochure", handle: "@yachna.s", photo: "/team_pr.png", team: "Scom", github: "https://github.com/yach26", linkedin: "https://www.linkedin.com/in/yachna-sharma-005063346" },
  { name: "Krishna Phirke", role: "", handle: "@krishna.p", photo: "/Codecell%20Jcoms%20pics/Krishna_Photo.png", team: "jcom", github: "https://github.com/krishnaphirke", linkedin: "https://www.linkedin.com/in/krishnayuvarajphirke" },
  { name: "Atharva Davkhar", role: "", handle: "@atharva.d", photo: "/Codecell%20Jcoms%20pics/AtharvaDavkhar_photo.png", team: "jcom", github: "https://github.com/davkharatharva", linkedin: "https://www.linkedin.com/in/atharva-davkhar-2622b23b6?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Tiya Jain", role: "", handle: "@tiya.j", photo: "/Codecell%20Jcoms%20pics/Tiya_photo.png", team: "jcom", github: "https://github.com/tiyaj", linkedin: "https://linkedin.com/in/tiya-jain-2a44a5387" },
  { name: "Naman Sabhagani", role: "", handle: "@naman.s", photo: "/Codecell%20Jcoms%20pics/Naman_photo.png", team: "jcom", github: "https://github.com/nmn-s", linkedin: "https://www.linkedin.com/in/naman-sabhagani-3068323b8?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Anuj Gupta", role: "", handle: "@anuj.g", photo: "/Codecell%20Jcoms%20pics/AnujGupta.png", team: "jcom", github: "https://github.com/anuj-devspace", linkedin: "https://www.linkedin.com/in/anuj-gupta-25a0ab376" },
  { name: "Atharva Deshmukh", role: "", handle: "@atharva.de", photo: "/Codecell%20Jcoms%20pics/Atharva_Deshmukh.jpg", team: "jcom", github: "https://github.com/atharvadeshmukh10", linkedin: "https://www.linkedin.com/in/atharva-deshmukh-318316356" },
  { name: "Yash Kirpalani", role: "", handle: "@yash.k", photo: "/Codecell%20Jcoms%20pics/Yash_photo.jpg", team: "jcom", github: "https://github.com/YashKirpalani", linkedin: "" },
  { name: "Purva Bhagwani", role: "", handle: "@purva.b", photo: "/Codecell%20Jcoms%20pics/Purva_photo.png", team: "jcom", github: "https://github.com/PurvaBhagwani07", linkedin: "https://www.linkedin.com/in/purva-bhagwani07/" },
  { name: "Ananya Puranik", role: "", handle: "@ananya.p", photo: "/Codecell%20Jcoms%20pics/ananya_photo.jpg", team: "jcom", github: "https://github.com/anabanana2617", linkedin: "https://www.linkedin.com/in/ananya-puranik-170018370?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  { name: "Ankita Dharmani", role: "", handle: "@ankita.d", photo: "/Codecell%20Jcoms%20pics/Ankita_Photo.jpeg", team: "jcom", github: "https://github.com/ankidharmani-tech", linkedin: "https://www.linkedin.com/in/ankita-dharmani/" },
  { name: "Jiya Ganwani", role: "", handle: "@jiya.g", photo: "/Codecell%20Jcoms%20pics/jiya_photo.png", team: "jcom", github: "https://github.com/jiyaganwani15", linkedin: "https://www.linkedin.com/in/jiya-ganwani-7397543b9" },
  { name: "Ishaan Kumar", role: "", handle: "@ishaan.k", photo: "/Codecell%20Jcoms%20pics/Ishaan_Photo.jpg", team: "jcom", github: "https://github.com/ishaaaaaaan-nismo", linkedin: "https://www.linkedin.com/in/ishaan-kumar-9252b2392?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { name: "Aum Nair", role: "", handle: "@aum.n", photo: "/Codecell%20Jcoms%20pics/Aum_Photo.png", team: "jcom", github: "https://github.com/4umN", linkedin: "https://www.linkedin.com/in/aum-nair-70504b367?trk=contact-info" },
  { name: "Keshav Ashar", role: "", handle: "@keshav.a", photo: "/Codecell%20Jcoms%20pics/Keshav.jpg", team: "jcom", github: "https://github.com/Vertician", linkedin: "https://www.linkedin.com/in/keshav-a-628927359/" },
  { name: "Pranav Dewoolkar", role: "", handle: "@pranav.d", photo: "/Codecell%20Jcoms%20pics/Pranav%20Dewoolkar.jpg", team: "jcom", github: "https://github.com/2166pranav", linkedin: "https://www.linkedin.com/in/pranav-dewoolkar-bb9a38285/" },
  { name: "Dhanvin Penkar", role: "", handle: "@dhanvin.p", photo: "/Codecell%20Jcoms%20pics/Dhanvin_Photo.png", team: "jcom", github: "https://github.com/DaddyisLegit", linkedin: "https://in.linkedin.com/in/dhanvin-penkar-4356943b9" },
  { name: "Jordan Mendonca", role: "", handle: "@jordan.m", photo: "/Codecell%20Jcoms%20pics/Jordan_Photo.jpg", team: "jcom", github: "https://github.com/jordan210507", linkedin: "https://www.linkedin.com/in/jordan21/" },
  // Associated professor (image located in public/professor/associated_prof.jpeg)
  { name: "Associated Professor", role: "Associated Professor", handle: "", photo: "/professor/associated_prof.jpeg", team: "assoc", github: "", linkedin: "" },
];

const values = [
  {
    icon: Code,
    title: "Engineering Craft",
    desc: "We focus on clean coding, micro-animations, and production-ready architectures. Slides don't build projects, code does.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "A collaborative hub designed to accelerate learning, mentorship, and peer-to-peer code review workflows.",
  },
  {
    icon: Shield,
    title: "Algorithmic Integrity",
    desc: "From Weekly Sandboxes to 24-Hour Hackathons, we evaluate raw engineering skills and competitive capabilities.",
  },
];

const timeline = [
  { year: "2023", title: "SYSTEM INIT", desc: "CodeCell kernel booted. First set of competitive challenges deployed." },
  { year: "2024", title: "V1.0 RELEASE", desc: "100+ students on the leaderboard. Hosted the first Git & Docker bootcamp." },
  { year: "2025", title: "TSEC HACKS", desc: "Flagship hackathon scaling to 500+ builders across the nation." },
  { year: "2026", title: "PROD STAGE", desc: "Current iteration. Building advanced systems and open-source contributions." },
];

const metrics = [
  { value: 500, suffix: "+", label: "Active Students", sub: "Guild members enrolled" },
  { value: 20, suffix: "+", label: "Events Hosted", sub: "Hackathons & workshops" },
  { value: 50, suffix: "+", label: "Challenges", sub: "Weekly problem sets" },
  { value: 94.8, suffix: "%", label: "Compile Success", sub: "Sandbox pass rate", isDecimal: true },
];

const faqs: FaqItem[] = [
  {
    q: "Who can join CodeCell?",
    a: "CodeCell is open to all students of Thadomal Shahani Engineering College (TSEC), Mumbai. Whether you are a beginner writing your first loop or an experienced dev shipping production apps, we have a place for you.",
  },
  {
    q: "What technologies does CodeCell focus on?",
    a: "We focus on a wide range of modern technologies including Frontend (React, Next.js), Backend (FastAPI, Node.js), DevOps & infrastructure (Docker, Git), and Competitive Programming using C++, Python, and Java.",
  },
  {
    q: "How can I join the core committee?",
    a: "Recruitment drives for the junior and senior committee take place at the start of the academic year. Stay tuned to our Instagram, WhatsApp, and Discord channels for announcements and application forms.",
  },
  {
    q: "Is prior programming experience required?",
    a: "Not at all! We structure our workshops and coding sandboxes to accommodate all skill levels. We start from basic logic building and guide you up to systems design and competitive coding algorithms.",
  },
  
];

function CrewCarousel() {
  const [activeTab, setActiveTab] = useState<"Scom" | "jcom" | "assoc">("assoc");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredTeam = teamCrew.filter(m => m.team === activeTab);
  


  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth / 2, behavior: "smooth" });
    }
  };
  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth / 2, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("assoc")}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border rounded-sm ${activeTab === "assoc" ? "bg-[#B388FF]/10 border-[#B388FF] text-[#B388FF]" : "border-[#333] text-[#888] hover:border-[#B388FF]/50 hover:text-[#ccc]"}`}
        >
          Associate Professor
        </button>
        <button
          onClick={() => setActiveTab("Scom")}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border rounded-sm ${activeTab === "Scom" ? "bg-[#4BE2C4]/10 border-[#4BE2C4] text-[#4BE2C4]" : "border-[#333] text-[#888] hover:border-[#4BE2C4]/50 hover:text-[#ccc]"}`}
        >
          Scom
        </button>
        <button
          onClick={() => setActiveTab("jcom")}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border rounded-sm ${activeTab === "jcom" ? "bg-[#E8FF00]/10 border-[#E8FF00] text-[#E8FF00]" : "border-[#333] text-[#888] hover:border-[#E8FF00]/50 hover:text-[#ccc]"}`}
        >
          jcom
        </button>
      </div>

      <div className="relative group px-4 md:px-12">
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredTeam.map((member, idx) => (
            <div key={idx} className="w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw] shrink-0 snap-start">
              <GlassCard className={`overflow-hidden p-0 group/card glass-card-glow w-full h-full flex flex-col ${activeTab === "Scom" ? "card-scanner" : "card-scanner-cyan"}`}>
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className={`object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500 group-hover/card:scale-105 ${member.position || 'object-center'}`}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent">
                    <div className="flex gap-2">
                      <a href={member.github || "#"} onClick={(e) => { if(!member.github) e.preventDefault(); }} target={member.github ? "_blank" : undefined} rel={member.github ? "noopener noreferrer" : undefined} className={`flex items-center gap-1.5 font-mono text-[9px] px-3 py-1.5 rounded-sm bg-[#0D0D0D]/90 border border-[#2E2E2E] transition-colors z-20 ${member.github ? "text-[#4BE2C4] hover:border-[#4BE2C4]" : "text-[#8A8880] opacity-50 cursor-default"}`}><Github size={12} /> GitHub</a>
                      <a href={member.linkedin || "#"} onClick={(e) => { if(!member.linkedin) e.preventDefault(); }} target={member.linkedin ? "_blank" : undefined} rel={member.linkedin ? "noopener noreferrer" : undefined} className={`flex items-center gap-1.5 font-mono text-[9px] px-3 py-1.5 rounded-sm bg-[#0D0D0D]/90 border border-[#2E2E2E] transition-colors z-20 ${member.linkedin ? "text-[#E8FF00] hover:border-[#E8FF00]" : "text-[#8A8880] opacity-50 cursor-default"}`}><Linkedin size={12} /> LinkedIn</a>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-[#111111] flex-1 bg-[#050505] relative z-10">
                  <h4 className="font-sans text-sm font-semibold text-[#F0EDE6] truncate">{member.name}</h4>
                  <p className={`font-mono text-[9px] mt-1 truncate ${activeTab === "Scom" ? "text-[#E8FF00]" : activeTab === "jcom" ? "text-[#4BE2C4]" : "text-[#B388FF]"}`}>{member.role}</p>
                  <p className="font-mono text-[9px] text-[#8A8880] mt-0.5">{member.handle}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
        
        <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#888] hover:text-[#E8FF00] hover:border-[#E8FF00] transition-colors z-10 hidden md:flex opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <ChevronLeft size={20} />
        </button>
        <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#888] hover:text-[#4BE2C4] hover:border-[#4BE2C4] transition-colors z-10 hidden md:flex opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <AboutHero />

      {/* MISSION / VISION */}
      <SectionWrap id="mission">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <BentoMotion className="lg:col-span-7">
            <span className="text-label-tag text-[#E8FF00] block mb-4">// GUILD_MISSION</span>
            <h2 className="text-h1-scale font-bold uppercase text-[#F0EDE6] tracking-tight leading-[1.05] mb-8">
              Accelerating Student Engineering Capabilities
            </h2>
            <div className="space-y-6 text-body-scale text-[#8A8880] leading-relaxed max-w-2xl">
              <p>
                TSEC CodeCell serves as the primary technical nucleus for Thadomal Shahani Engineering College. We bridge the gap between academic guidelines and the fluid requirements of modern software engineering.
              </p>
              <p>
                We design sandboxes, organize workshops, compile programming directories, and host TSEC Hacks—our flagship hackathon. Every line of code written on our sandbox compiler represents a step towards mastering systems, UI, and computational algorithms.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 mt-10 font-mono text-xs tracking-widest text-[#4BE2C4] hover:text-[#E8FF00] transition-colors"
            >
              ENTER SANDBOX →
            </Link>
          </BentoMotion>

          <BentoMotion className="lg:col-span-5" delay={0.12}>
            <div className="grid grid-cols-1 gap-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <GlassCard key={val.title} className="p-6 flex gap-5 glass-card-glow">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#161616] border border-[#2E2E2E] flex items-center justify-center">
                      <Icon size={20} className={idx === 0 ? "text-[#4BE2C4]" : idx === 1 ? "text-[#E8FF00]" : "text-[#FF4D00]"} />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-[#F0EDE6] uppercase tracking-tight">
                        {val.title}
                      </h4>
                      <p className="text-sm text-[#8A8880] mt-2 leading-relaxed">{val.desc}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </BentoMotion>
        </div>
      </SectionWrap>



      {/* TEAM */}
      <SectionWrap>
        <SectionHeader
          index="02 — COMMAND REGISTRY"
          title="Meet The Crew"
          subtitle="// core operators running the guild systems"
          align="center"
        />
        <CrewCarousel />
      </SectionWrap>

      {/* FAQ */}
      <SectionWrap narrow>
        <SectionHeader
          index="03 — FAQ"
          title="Frequently Asked Questions"
          subtitle="// everything you need before your first commit"
          align="center"
        />
        <PremiumFaq faqs={faqs} />
      </SectionWrap>


    </div>
  );
}
