import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    word: "Audit",
    desc: "We dig into your accounts, attribution, funnel, and creative. Find the leaks before we start spending.",
  },
  {
    num: "02",
    word: "Strategize",
    desc: "Build the roadmap. Channels, offers, messaging hierarchy, creative angles, and testing priorities.",
  },
  {
    num: "03",
    word: "Execute",
    desc: "Launch campaigns, build pages, set up tracking — everything goes live with intention, not hope.",
  },
  {
    num: "04",
    word: "Optimize",
    desc: "Iterate fast. Kill what's not working, double down on what is. Data-driven decisions, weekly.",
  },
  {
    num: "05",
    word: "Scale",
    desc: "When the unit economics work, we push the throttle. Controlled, profitable, sustainable growth.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-28 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3">The Process</p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            How we work together.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[22px] top-8 bottom-8 w-px bg-white/10 hidden md:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-8 items-start py-8 border-b border-white/10 last:border-0 group"
              >
                {/* Step dot */}
                <div className="w-11 h-11 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 flex items-center justify-center shrink-0 group-hover:bg-[#4F46E5] group-hover:border-[#4F46E5] transition-all">
                  <span className="text-[#4F46E5] group-hover:text-white text-[10px] font-extrabold transition-colors">{step.num}</span>
                </div>

                <div className="flex-1 md:flex md:items-center md:gap-12 pt-1">
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight w-48 shrink-0 mb-2 md:mb-0"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {step.word}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}