import React from "react";
import { motion } from "framer-motion";

const orbitCapabilities = [
  "Audience discovery and segmentation",
  "Competitive research at scale",
  "Creative angle iteration (100s, not 10s)",
  "Pattern recognition across ad accounts",
  "Copy variation testing frameworks",
  "Trend identification before it's obvious",
];

export default function OrbitSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-[#4F46E5] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
              ◎ Orbit — AI Agent
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6">
              I built the AI.<br />The strategy<br />is still mine.
            </h2>
            <p className="text-[#525252] text-base leading-relaxed mb-6">
              Orbit is the AI agent I co-founded to handle the volume work — the stuff that used to take days. Research, audience discovery, creative iteration, pattern recognition. It runs the grunt work. I run the strategy.
            </p>
            <p className="text-[#525252] text-base leading-relaxed">
              Everyone's feeding the same three LLMs the same prompts and wondering why their copy sounds identical to every other brand in their space. PLAIT doesn't do that.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F8F7FF] rounded-3xl p-8 border border-indigo-100"
          >
            <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-6">Orbit handles</p>
            <ul className="space-y-0">
              {orbitCapabilities.map((cap, i) => (
                <li key={cap} className={`py-4 flex items-center gap-4 ${i < orbitCapabilities.length - 1 ? "border-b border-indigo-100" : ""}`}>
                  <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-sm text-[#0A0A0A] font-medium">{cap}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 bg-[#4F46E5] text-white rounded-2xl p-5">
              <p className="text-sm font-semibold mb-1">Days of work. Hours of output.</p>
              <p className="text-xs text-indigo-200">Strategy stays human. Volume scales with AI.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}