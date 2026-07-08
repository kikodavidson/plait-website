import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Audit",
    tagline: "Find the real problem.",
    body: "Most businesses think they know what's broken. Usually it's something adjacent. We audit your ads, analytics, tracking, website, and creative, and map where the signal is getting lost.",
  },
  {
    num: "02",
    title: "Diagnose",
    tagline: "Understand the bottleneck.",
    body: "Not every problem needs the same fix. After the audit, we identify the highest-leverage bottleneck: the one thing, if fixed, that unlocks the most upside. Then we build a plan around that.",
  },
  {
    num: "03",
    title: "Execute",
    tagline: "Do the work.",
    body: "Strategy is worthless without execution. We build, launch, and manage — whether that's campaigns, landing pages, tracking infrastructure, creative briefs, or all of the above.",
  },
  {
    num: "04",
    title: "Optimize",
    tagline: "Improve what's working. Kill what isn't.",
    body: "Every campaign, every page, every creative is a hypothesis. We test systematically, read the data honestly, and make decisions based on what the numbers actually say, not what we hoped they'd say.",
  },
  {
    num: "05",
    title: "Scale",
    tagline: "Pour fuel on a fire that's already burning.",
    body: "Scaling before the system is ready just accelerates losses. Once the foundation is solid with the right offer, the right creative, and the right tracking, we scale with confidence.",
  },
];

export default function OurProcess() {
  return (
    <div className="pt-28 pb-24">
      <div className="hero-gradient pb-16 px-6 pt-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-4">Our Process</p>
            <h1 className="font-body text-6xl sm:text-7xl font-bold text-[#0A0A0A] tracking-tight leading-tight mb-6 max-w-3xl">
              How we actually work.
            </h1>
            <p className="text-[#525252] text-lg max-w-xl leading-relaxed">
              No black boxes. No mystery deliverables. Here's exactly how we go from first conversation to measurable results.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-100 hidden sm:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="sm:pl-20 relative"
              >
                {/* Step dot */}
                <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-white border border-gray-200 items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-[#4F46E5]">{step.num}</span>
                </div>

                <span className="sm:hidden text-[#4F46E5] text-xs font-bold uppercase tracking-widest">{step.num}</span>
                <h2 className="font-body text-4xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight mt-1 mb-2">
                  {step.title}
                </h2>
                <p className="text-[#4F46E5] font-semibold text-sm mb-4 italic">{step.tagline}</p>
                <p className="text-[#525252] leading-relaxed max-w-2xl">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-[#0A0A0A] rounded-3xl p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        >
          <div>
            <h3 className="font-body text-3xl font-bold text-white mb-2">Ready to start?</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Every engagement starts with an honest conversation. No pitch, no pressure.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-gradient shrink-0 inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
          >
            Let's Talk
          </Link>
        </motion.div>
      </div>
    </div>
  );
}