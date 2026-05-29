import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Communication",
    desc: "You know what's happening, why it's happening, and what we're doing about it. No monthly PDFs that take a week to decipher. Real talk, in real time.",
  },
  {
    title: "Clarity",
    desc: "No 40-slide decks that bury the signal in noise. Strategy is clear, metrics are honest, and you never have to guess whether things are working.",
  },
  {
    title: "One System",
    desc: "One person. All six strands. No handoff gaps, no account manager middlemen, no 'that's not my department.' Every layer of the funnel is connected.",
  },
];

export default function WhyPlait() {
  return (
    <section className="section-gradient py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-3">Why PLAIT</p>
          <h2 className="font-display text-5xl sm:text-6xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6">
            A funnel only holds<br />when it's actually connected.
          </h2>
          <p className="text-[#525252] text-base leading-relaxed">
            The word <em>plait</em> means to braid or interweave. A funnel isn't a series of disconnected tactics — it's a braid. Break one strand and the whole thing unravels. Most growth failures aren't a bad ad or a slow page. They're a broken link between two strands that nobody owned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
            >
              <div className="text-[#4F46E5] text-xs font-bold uppercase tracking-widest mb-3">0{i + 1}</div>
              <h3 className="font-display text-2xl font-extrabold text-[#0A0A0A] mb-3">{p.title}</h3>
              <p className="text-[#525252] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}