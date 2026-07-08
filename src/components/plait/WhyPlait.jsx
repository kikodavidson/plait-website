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
    <section className="section-gradient py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-4">Why PLAIT</p>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'Google Sans Flex, sans-serif', letterSpacing: '0.02em' }}
            >
              When our clients win,<br />we win.
            </h2>
            <p className="text-[#525252] text-base leading-relaxed max-w-md">
              The word <em>plait</em> means to braid or interweave. A funnel isn't a series of disconnected tactics — it's a braid. Break one strand and the whole thing unravels. Every case study here is proof that when our clients succeed, so do we.
            </p>
          </motion.div>

          {/* Photo block — matches screenshot 1's right-side image with brand badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Team working"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow-md">
              <div className="w-5 h-5 rounded-md bg-[#4F46E5] flex items-center justify-center">
                <span className="text-white text-[9px] font-extrabold">P</span>
              </div>
              <span className="text-xs font-extrabold text-[#0A0A0A]">PLAIT Studio</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-[#4F46E5] text-xs font-bold uppercase tracking-widest mb-3">0{i + 1}</div>
              <h3 className="text-xl font-extrabold text-[#0A0A0A] mb-3" style={{ fontFamily: 'Google Sans Flex, sans-serif', letterSpacing: '0.02em' }}>{p.title}</h3>
              <p className="text-[#525252] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}