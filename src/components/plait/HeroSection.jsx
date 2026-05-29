import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING = ["Scale.", "Convert.", "Compound.", "Actually Grow."];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-gradient pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Pill label */}
        <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-semibold px-4 py-2 rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] inline-block"></span>
          New · Human strategy. AI velocity.
        </div>

        {/* Headline */}
        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-[#0A0A0A] leading-[0.92] tracking-tight mb-8 max-w-5xl">
          Brands built to{" "}
          <span className="inline-block relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="text-[#4F46E5] inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                {ROTATING[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Sub copy */}
        <p className="text-lg text-[#525252] max-w-xl leading-relaxed mb-10">
          Not an agency. Not a media buyer. A growth partner who runs paid acquisition, builds funnels, audits CRO, and obsesses over unit economics. Everyone's using the same three LLMs — PLAIT keeps the strategy human and uses AI for the rest.
        </p>

        {/* CTA */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#4F46E5] text-white font-semibold px-7 py-4 rounded-full text-base hover:bg-indigo-700 transition-colors"
        >
          Work With Me →
        </Link>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-[#0A0A0A]/10">
          {[
            { value: "$2M+", label: "Revenue Produced" },
            { value: "80+", label: "Brands Scaled" },
            { value: "11+", label: "Channels" },
          ].map((s, i) => (
            <div key={s.label} className={`pt-8 ${i > 0 ? "sm:pl-12 sm:border-l border-[#0A0A0A]/10" : ""}`}>
              <p className="font-display text-5xl font-extrabold text-[#0A0A0A] tracking-tight">{s.value}</p>
              <p className="text-xs font-semibold text-[#525252] uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}