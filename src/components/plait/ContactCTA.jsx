import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="section-gradient py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-4">Let's Talk</p>
          <h2 className="font-body text-5xl sm:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-6">
            Tired of paying for traffic that doesn't convert?
          </h2>
          <p className="text-[#525252] text-base leading-relaxed mb-8 max-w-lg">
            Your funnel has a leak. Maybe it's the offer. Maybe it's the creative. Maybe it's the LP that hasn't changed since 2021. Either way, it's costing you money every single day. Let's find it.
          </p>
          <Link
            to="/contact"
            className="btn-gradient inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-base"
          >
            Work With Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}