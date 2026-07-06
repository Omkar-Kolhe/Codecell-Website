"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function PrivacyPolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#0A0A0A] border border-[#222222] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-[#222222] bg-[#050505]">
              <h2 className="font-orbitron text-lg md:text-xl font-bold text-[#F0EDE6] tracking-wide">
                PRIVACY POLICY
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-sm hover:bg-[#111111] text-[#8A8880] hover:text-[#4BE2C4] transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-5 md:p-8 overflow-y-auto font-sans text-[13px] md:text-sm text-[#8A8880] space-y-6 custom-scrollbar">
              <section>
                <h3 className="font-mono text-[11px] text-[#4BE2C4] uppercase tracking-widest mb-2">1. Data Collection</h3>
                <p className="leading-relaxed">
                  TSEC CodeCell ("we", "our", or "us") respects your privacy. We collect minimal personal information (such as name, email, and academic details) only when you voluntarily submit it through our membership forms, event registrations, or contact forms.
                </p>
              </section>
              <section>
                <h3 className="font-mono text-[11px] text-[#E8FF00] uppercase tracking-widest mb-2">2. How We Use Your Data</h3>
                <p className="leading-relaxed">
                  Your information is used strictly for organizing events, managing memberships, validating hackathon teams, and sending important updates related to CodeCell activities. We do not sell, rent, or share your personal data with third parties for marketing purposes.
                </p>
              </section>
              <section>
                <h3 className="font-mono text-[11px] text-[#4BE2C4] uppercase tracking-widest mb-2">3. Data Security</h3>
                <p className="leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet is 100% secure.
                </p>
              </section>
              <section>
                <h3 className="font-mono text-[11px] text-[#E8FF00] uppercase tracking-widest mb-2">4. Third-Party Links</h3>
                <p className="leading-relaxed">
                  Our website may contain links to third-party sites (e.g., GitHub, LinkedIn, Instagram). We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy statements of any site you visit.
                </p>
              </section>
              <section>
                <h3 className="font-mono text-[11px] text-[#4BE2C4] uppercase tracking-widest mb-2">5. Updates & Changes</h3>
                <p className="leading-relaxed">
                  We may occasionally update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this policy periodically.
                </p>
              </section>
              <section>
                <h3 className="font-mono text-[11px] text-[#E8FF00] uppercase tracking-widest mb-2">6. Contact Us</h3>
                <p className="leading-relaxed">
                  If you have any questions or concerns regarding this Privacy Policy or your data, please reach out to us through our official Discord server, Instagram page, or via email.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#222222] bg-[#050505] flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-[#111111] hover:bg-[#1A1A1A] border border-[#333333] text-[#F0EDE6] hover:text-[#4BE2C4] hover:border-[#4BE2C4] font-mono text-xs uppercase tracking-wider transition-all duration-300"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
