import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ResultsSection() {
  return (
    <section className="py-28 px-6 bg-[#1c1b1a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-[#f4f2ee]/10 pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-xs font-bold text-[#5E58D5] uppercase tracking-widest mb-4">Proof</p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#f4f2ee] leading-[1.1] font-body"
            >
              Results that speak<br />for themselves.
            </h2>
          </div>

          <Link
            to="/case-studies"
            className="inline-flex items-center gap-3 text-[#f4f2ee] font-bold text-base group shrink-0"
          >
            See the case studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}