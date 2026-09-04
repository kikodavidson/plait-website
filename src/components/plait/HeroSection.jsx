import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroMediaCard from "@/components/plait/HeroMediaCard";
import HalftoneFlow from "@/components/ui/halftone-flow";

export default function HeroSection() {
  const navigate = useNavigate();
  const mediaRef = useRef(null);

  // Media scales up as it scrolls into view (DEPT-style)
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.45, 1]);

  return (
    <section className="bg-white w-full overflow-hidden">
      {/* Spacer clears the fixed navbar so the background starts below the logo/menu */}
      <div className="h-[200px]" aria-hidden="true" />

      {/* Headline + buttons */}
      <div className="relative min-h-[72vh] flex flex-col items-center justify-center px-6 pt-8 pb-10 text-center">
        {/* Halftone flow background */}
        <div className="absolute inset-0 pointer-events-none">
          <HalftoneFlow className="h-full w-full" />
        </div>
        {/* Bottom fade into the white page */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-[5]" />
        <motion.h1
          className="hero-headline relative z-10 text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] uppercase font-bold"
          style={{ fontFamily: "Benzin, sans-serif", letterSpacing: "-0.03em", color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="block">Growth</span>
          <span className="block">built around</span>
          <span className="block">your customer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mt-6 text-base sm:text-lg uppercase tracking-[0.12em] text-white"
          style={{ fontFamily: "Benzin, sans-serif" }}
        >
          Proven Marketing Strategy. Accelerated by AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/services")}
            className="rounded-full border border-white bg-transparent px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
          >
            What We Do
          </button>
          <button
            onClick={() => navigate("/book")}
            className="rounded-full border border-white bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Book a Free Audit
          </button>
        </motion.div>
      </div>

      {/* Scroll-scaling media */}
      <div ref={mediaRef} className="flex justify-center px-6 pb-24">
        <motion.div style={{ scale }} className="w-full max-w-7xl origin-center">
          <HeroMediaCard className="max-w-none" />
        </motion.div>
      </div>
    </section>
  );
}