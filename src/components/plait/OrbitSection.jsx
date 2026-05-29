import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const orbitCapabilities = [
  {
    title: "Faster Campaign Execution",
    desc: "Quicker turnaround time. Campaigns go from brief to live in a fraction of the time.",
  },
  {
    title: "Flawless Data in Every Report",
    desc: "More data scraped and analyzed than the human eye can process. Reports that are actually complete.",
  },
  {
    title: "Connects to All Your Tools",
    desc: "Integrates with your ad accounts, CRM, analytics, and tracking stack. One source of truth.",
  },
  {
    title: "Identifies Attribution Gaps",
    desc: "Finds where you're losing signal and fixes it before you waste another dollar on bad data.",
  },
  {
    title: "More Time on Strategy",
    desc: "Orbit handles execution overhead so the thinking stays human, where it matters most.",
  },
  {
    title: "Speed, Clarity, Execution",
    desc: "The trifecta. Faster decisions, clearer data, and execution that doesn't drop the ball.",
  },
];

function AccordionItem({ title, desc, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="flex items-center gap-4">
          <span className="text-white/20 text-xs font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-white font-extrabold text-base group-hover:text-[#4F46E5] transition-colors"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {title}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed pb-5 pl-10">{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrbitSection() {
  return (
    <section className="py-28 px-6 bg-[#0A0A0A]">
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
            <div className="inline-flex items-center gap-2 bg-white/5 text-white/60 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider border border-white/10">
              ◎ Orbit MCP
            </div>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              AI should amplify<br />your thinking.<br />
              <span className="text-[#4F46E5]">Not replace it.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              Most marketers are outsourcing their strategy to a chatbot and wondering why everything sounds the same. Prompting GPT for a media plan isn't strategy. It's delegation to something that has never spent a dollar on ads.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              I co-founded Orbit — a Model Context Protocol (MCP) designed specifically for marketing workflows. The difference between an MCP and a standard AI tool is context depth. Orbit connects directly to your live data: ad accounts, CRM, analytics, attribution. It doesn't guess. It reads.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              I built Orbit to increase output efficiency without surrendering the thing that actually drives performance: human judgment. The strategy stays mine. The volume scales with Orbit.
            </p>

            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white text-sm font-bold mb-1">Days of work. Hours of output.</p>
              <p className="text-white/40 text-xs">Strategy stays human. Volume scales with AI.</p>
            </div>
          </motion.div>

          {/* Right — accordion list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {orbitCapabilities.map((cap, i) => (
              <AccordionItem key={cap.title} title={cap.title} desc={cap.desc} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}