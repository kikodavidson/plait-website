import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroMediaCard from "@/components/plait/HeroMediaCard";

export default function HeroSection() {
  const navigate = useNavigate();
  const mediaRef = useRef(null);

  // Media scales up as it scrolls into view (DEPT-style)
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);

  return (
    <section className="bg-white w-full overflow-hidden">
      {/* Headline + buttons */}
      <div className="min-h-[72vh] flex flex-col items-center justify-center px-6 pt-44 pb-20 text-center">
        <motion.h1
          className="hero-headline text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] uppercase font-bold"
          style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="block">Growth</span>
          <span className="block">built around</span>
          <span className="block">your customer.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/services")}
            className="rounded-full border border-black bg-transparent px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-black hover:text-white"
          >
            What We Do
          </button>
          <button
            onClick={() => navigate("/book")}
            className="rounded-full border border-black bg-black px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
          >
            Book a Free Audit
          </button>
        </motion.div>
      </div>

      {/* Scroll-scaling media */}
      <div ref={mediaRef} className="flex justify-center px-6 pb-24">
        <motion.div style={{ scale }} className="w-full max-w-5xl origin-center">
          <HeroMediaCard className="max-w-none" />
        </motion.div>
      </div>
    </section>
  );
}