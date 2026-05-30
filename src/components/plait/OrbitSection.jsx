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
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/a52635986_Untitleddesign-2026-05-29T153256805.png"
                alt="Orbit"
                className="h-24 w-auto brightness-0 invert opacity-90"
              />
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">MCP</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 font-body"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              AI should amplify<br />your thinking.<br />
              <span className="text-[#4F46E5]">Not replace it.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              Most marketers are outsourcing their strategy to a chatbot and wondering why everything sounds the same. Prompting GPT for a media plan isn't strategy. It's delegation to something that has never spent a dollar on ads.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              I helped bring Orbit to life — not as the engineer, but as the marketer behind it. The concept, the positioning, and the use case came from years of frustration with AI tools that had no real context. I took that idea and made it something people could actually understand and use.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Orbit is a Model Context Protocol (MCP) built specifically for marketing workflows. The difference between an MCP and a standard AI tool is context depth. Orbit connects directly to your live data — ad accounts, CRM, analytics, attribution. It doesn't guess. It reads. And I use it in every engagement.
            </p>

            <div className="mt-6">
              <a
                href="https://orbitllm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#B8972A] text-sm font-bold hover:text-[#D4AF37] transition-colors"
              >
                See how it works
                <span className="text-lg leading-none">↗</span>
              </a>
            </div>
          </motion.div>

          {/* Right — phone image + accordion list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10"
          >
            {/* Phone mockup image */}
            <div className="flex justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full bg-[#B8972A] opacity-30 blur-3xl" />
              </div>
              <img
                src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/d6c6a8615_Untitleddesign-2026-05-29T165457959.png"
                alt="Orbit app"
                className="w-full max-w-sm object-contain drop-shadow-2xl relative z-10"
              />
            </div>

            {/* Accordion */}
            <div>
              {orbitCapabilities.map((cap, i) => (
                <AccordionItem key={cap.title} title={cap.title} desc={cap.desc} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}