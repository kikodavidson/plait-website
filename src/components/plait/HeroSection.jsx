import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING = [
  "Scale.",
  "Convert.",
  "Attract Attention.",
  "Attribute.",
  "Measure.",
  "Improve Performance.",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-gradient min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-semibold px-4 py-2 rounded-full mb-10 shadow-sm"
        >
          <span className="bg-[#4F46E5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">New</span>
          Battle Tested Marketing, Enhanced by AI.
        </motion.div>

        {/* Static headline line 1 */}
        <motion.h1
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold text-[#0A0A0A] leading-[1.05] tracking-[-0.03em] mb-0"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Growth Partner,
        </motion.h1>
        <motion.h1
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold text-[#0A0A0A] leading-[1.05] tracking-[-0.03em] mb-2"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Built to Help Brands
        </motion.h1>

        {/* Rotating word */}
        <div
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold text-[#4F46E5] leading-[1.15] tracking-[-0.03em] mb-8 h-[1.25em] flex items-center justify-center overflow-hidden"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="block"
            >
              {ROTATING[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-[#525252] text-lg max-w-xl leading-relaxed mb-10 font-medium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Battle Tested Marketing, Enhanced by AI.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#4F46E5] text-white font-bold text-base px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 group"
          >
            Work With Me
            <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors text-sm">→</span>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-20 w-full max-w-2xl bg-[#0A0A0A] rounded-3xl px-6 py-8 grid grid-cols-3 gap-0 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { value: "$2M+", label: "Tested on Ads" },
            { value: "80+", label: "Brands Scaled" },
            { value: "11+", label: "Growth Channels" },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center ${i > 0 ? "border-l border-white/10" : ""}`}>
              <p
                className="text-4xl sm:text-5xl font-extrabold text-[#4F46E5] tracking-tight leading-none"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {s.value}
              </p>
              <p className="text-xs text-white/60 font-semibold mt-2 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}