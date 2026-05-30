import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResultsSection() {
  return (
    <section className="py-28 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-4">Proof</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] font-body"
            >
              Results that speak<br />for themselves.
            </h2>
          </div>

          <Link
            to="/case-studies"
            className="inline-flex items-center gap-3 text-white font-extrabold text-base group shrink-0"
          >
            See the case studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}