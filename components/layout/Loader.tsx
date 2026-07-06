"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Setup chronological timeline steps
    const t1 = setTimeout(() => setStep(1), 400);  // loading challenges... ✓
    const t2 = setTimeout(() => setStep(2), 800);  // syncing leaderboard... ✓
    const t3 = setTimeout(() => setStep(3), 1100); // ready.
    const t4 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1400); // Start fade-out

    // Skip loader on keydown
    const handleSkip = () => {
      setVisible(false);
      document.body.style.overflow = "";
    };

    window.addEventListener("keydown", handleSkip);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleSkip);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            flex-col
            items-start
            justify-center
            bg-[#0D0D0D]
            p-8
            font-mono
            md:p-24
            select-none
          "
        >
          <div className="max-w-2xl text-[13px] md:text-[14px] leading-relaxed text-[#F0EDE6] tracking-wider">
            {/* Step 0 */}
            <div className="min-h-[24px] flex items-center">
              <span>{`> booting codecell.exe...`}</span>
              {step === 0 && (
                <span className="ml-1 w-2 h-4 bg-[#4BE2C4] animate-[pulse_1s_infinite]" />
              )}
            </div>

            {/* Step 1 */}
            {step >= 1 && (
              <div className="min-h-[24px] flex items-center mt-2 text-[#8A8880]">
                <span>{`> loading challenges... ✓`}</span>
                {step === 1 && (
                  <span className="ml-1 w-2 h-4 bg-[#4BE2C4] animate-[pulse_1s_infinite]" />
                )}
              </div>
            )}

            {/* Step 2 */}
            {step >= 2 && (
              <div className="min-h-[24px] flex items-center mt-2 text-[#8A8880]">
                <span>{`> syncing leaderboard... ✓`}</span>
                {step === 2 && (
                  <span className="ml-1 w-2 h-4 bg-[#4BE2C4] animate-[pulse_1s_infinite]" />
                )}
              </div>
            )}

            {/* Step 3 */}
            {step >= 3 && (
              <div className="min-h-[24px] flex items-center mt-2 text-[#E8FF00] font-bold">
                <span>{`> ready.`}</span>
                {step === 3 && (
                  <span className="ml-1 w-2 h-4 bg-[#E8FF00] animate-[pulse_1s_infinite]" />
                )}
              </div>
            )}
          </div>

          {/* Skip Label */}
          <div className="absolute bottom-6 left-8 md:left-24 font-mono text-[10px] text-[#3E3E3C] uppercase tracking-[0.15em]">
            PRESS ANY KEY TO SKIP INITIALIZATION
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
