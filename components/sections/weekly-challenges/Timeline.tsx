"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const TimelineSceneDynamic = dynamic(() => import('@/components/3d/TimelineScene'), { ssr: false });

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(7, Math.max(0, Math.floor(latest * 8)));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Fade out the heading text smoothly as the user begins to scroll down
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  return (
    <section className="relative bg-[#0a0a0a] overflow-clip border-b border-[#eab308]/20" ref={containerRef}>
      
      {/* 3D Background - Sticky to stay in view during scroll */}
      <div className="absolute inset-0 z-0">
        <div className="sticky top-0 w-full h-screen">
          <TimelineSceneDynamic scrollProgress={scrollYProgress} />
        </div>
      </div>

      {/* The Scroll Driver - This empty div is 800vh tall to force scrolling */}
      <div className="h-[800vh] w-full relative z-10 pointer-events-none">
        
        {/* Header Title - fades out smoothly on scroll so it doesn't overlap the cards */}
        <motion.div 
          className="sticky top-0 pt-32 text-center pointer-events-none"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 font-outfit uppercase tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]"
          >
            The Path to <span className="text-gold">Grandmaster</span>
          </motion.h2>
          <p className="text-white/80 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">Scroll down to command your piece across the 3D board.</p>
        </motion.div>
        
        {/* We no longer render HTML text cards here. 
            They are rendered entirely inside TimelineScene.tsx using the <Html> component 
            so they can physically follow the 3D piece! */}
            
      </div>
    </section>
  );
}
