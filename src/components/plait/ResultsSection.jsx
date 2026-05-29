import React from "react";
import { motion } from "framer-motion";

const results = [
  { stat: "90%", label: "CAC Reduction", client: "Extern" },
  { stat: "345%", label: "Active User Jump", client: "Ivy Dating" },
  { stat: "30M+", label: "Reached", client: "Airia / Williams Racing F1" },
  { stat: "70%", label: "Lower CPA", client: "HG Training" },
];

export default function ResultsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-3">Results</p>
          <h2 className="font-display text-5xl sm:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight">
            Numbers that<br />don't lie.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[#0A0A0A]">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`pt-10 pb-10 ${i > 0 ? "lg:pl-10 lg:border-l border-gray-200" : ""} border-b border-gray-200 sm:border-b-0`}
            >
              <p className="font-display text-6xl font-extrabold text-[#4F46E5] tracking-tight mb-2">{r.stat}</p>
              <p className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">{r.label}</p>
              <p className="text-xs text-[#525252]">{r.client}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}