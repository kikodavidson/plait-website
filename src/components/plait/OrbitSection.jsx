import React from "react";
import { motion } from "framer-motion";
import { Zap, Database, Link2, Search, Clock, BarChart3 } from "lucide-react";

const orbitCapabilities = [
  {
    icon: Clock,
    title: "Faster Campaign Execution",
    desc: "Quicker turnaround time. Campaigns go from brief to live in a fraction of the time.",
  },
  {
    icon: BarChart3,
    title: "Flawless Data in Every Report",
    desc: "More data scraped and analyzed than the human eye can process. Reports that are actually complete.",
  },
  {
    icon: Link2,
    title: "Connects to All Your Tools",
    desc: "Integrates with your ad accounts, CRM, analytics, and tracking stack. One source of truth.",
  },
  {
    icon: Search,
    title: "Identifies Attribution Gaps",
    desc: "Finds where you're losing signal and fixes it before you waste another dollar on bad data.",
  },
  {
    icon: Zap,
    title: "More Time on Strategy",
    desc: "Orbit handles execution overhead so the thinking stays human, where it matters most.",
  },
  {
    icon: Database,
    title: "Speed, Clarity, Execution",
    desc: "The trifecta. Faster decisions, clearer data, and execution that doesn't drop the ball.",
  },
];

export default function OrbitSection() {
  return (
    <section className="py-28 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-32"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-[#4F46E5] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
              ◎ Orbit AI Agent
            </div>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight mb-6"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Faster output.<br />More robust results.<br />Real strategy stays<br />human.
            </h2>
            <p className="text-[#525252] text-base leading-relaxed mb-4">
              Orbit doesn't replace strategy. It makes every output faster and more robust. The intelligence behind every decision is still mine. Orbit just removes the ceiling on what I can execute.
            </p>
            <p className="text-[#525252] text-base leading-relaxed">
              Everyone's prompting the same three models and wondering why their copy sounds identical. PLAIT uses Orbit to go deeper: more data, more angles, more signal, without sacrificing the human thinking that actually moves the needle.
            </p>

            <div className="mt-8 bg-[#0A0A0A] rounded-2xl p-6">
              <p className="text-white text-sm font-bold mb-1">Days of work. Hours of output.</p>
              <p className="text-white/50 text-xs">Strategy stays human. Volume scales with AI.</p>
            </div>
          </motion.div>

          {/* Right — capability cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-0 border border-gray-100 rounded-3xl overflow-hidden"
          >
            {orbitCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`flex items-start gap-5 p-6 hover:bg-[#F8F7FF] transition-colors ${i > 0 ? "border-t border-gray-100" : ""}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#4F46E5]" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#0A0A0A] text-sm mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {cap.title}
                    </p>
                    <p className="text-[#525252] text-xs leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}