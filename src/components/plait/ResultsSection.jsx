import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const results = [
  { stat: "90%", label: "CAC Reduction", client: "Extern" },
  { stat: "345%", label: "Active User Jump", client: "Ivy Dating" },
  { stat: "30M+", label: "Reached", client: "Airia / Williams F1" },
  { stat: "70%", label: "Lower CPA", client: "HG Training" },
];

export default function ResultsSection() {
  return (
    /* Dark section — matches screenshot 1's black background with pink/red stat numbers */
    <section className="bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center text-white/50 text-sm font-semibold uppercase tracking-widest mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Clients Typically Experience…
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/10">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`py-10 flex flex-col items-center text-center ${
                i > 0 ? "border-l border-white/10" : ""
              }`}
            >
              {/* Accent color stat — matches screenshot 1's +83%, +94%, +91% in hot pink/indigo */}
              <p
                className="text-5xl sm:text-6xl font-extrabold text-[#4F46E5] leading-none mb-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {r.stat}
              </p>
              <p className="text-sm font-bold text-white/80 uppercase tracking-wider mb-1">{r.label}</p>
              <p className="text-xs text-white/40 font-medium">{r.client}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA row below stats — matches screenshot 1's two pill buttons */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#4F46E5] text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/40"
          >
            Book a Strategy Session
          </Link>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-white/10 text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors border border-white/10"
          >
            See Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}