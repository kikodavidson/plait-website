import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const ROLES = [
  {
    title: "Paid Media Manager",
    alt: "Often split into Paid Social Manager + Paid Search Manager",
    desc: "Owns your ad spend across Meta, Google, TikTok, and beyond. Manages budgets, bidding, and scaling decisions so every dollar is accountable.",
  },
  {
    title: "Creative Strategist",
    alt: null,
    desc: "Bridges data and design. Turns performance insights into ad creative that stops the scroll and drives clicks — the engine behind winning campaigns.",
  },
  {
    title: "CRO Specialist",
    alt: null,
    desc: "Conversion Rate Optimization. Finds where your funnel leaks revenue and fixes it — A/B testing, landing page tweaks, and friction elimination.",
  },
  {
    title: "Web Designer / Landing Page Developer",
    alt: null,
    desc: "Builds the pages your ads send traffic to. Fast, conversion-focused, and aligned with your brand so clicks actually become customers.",
  },
  {
    title: "Growth Marketing Manager",
    alt: null,
    desc: "The quarterback. Coordinates across channels, sets the strategy, and ensures every part of the funnel is working toward the same revenue goal.",
  },
  {
    title: "Marketing Analytics Manager",
    alt: "Tracking & Attribution",
    desc: "Owns your tracking stack, server-side tagging, and attribution modeling. Makes sure you know exactly what's working and what to kill.",
  },
  {
    title: "Email Marketing Manager",
    alt: "Lifecycle Marketing Manager",
    desc: "Nurtures leads into customers and customers into repeat buyers. Automated flows, segmentation, and lifecycle campaigns that compound revenue.",
  },
  {
    title: "Copywriter",
    alt: null,
    desc: "Every ad headline, landing page, and email needs words that convert. A dedicated copywriter ensures your messaging is sharp, consistent, and persuasive.",
  },
];

export default function RolesCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % ROLES.length);
  const prev = () => setIndex((i) => (i - 1 + ROLES.length) % ROLES.length);

  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#525252]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#525252]">Your extended team</span>
          </div>
          <h2
            className="font-body text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
          >
            The roles you're adding<br />to your team.
          </h2>
          <p className="text-[#525252] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            When you work with us, you're not just getting an agency — you're filling eight specialized seats that would otherwise cost a fortune to hire in-house.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors"
            aria-label="Previous role"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors"
            aria-label="Next role"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden px-12">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 sm:p-10 max-w-2xl w-full text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-xs font-bold tabular-nums text-[#525252]">
                    {String(index + 1).padStart(2, "0")} / {String(ROLES.length).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="font-body text-2xl sm:text-3xl font-bold text-[#2d2d2d] mb-2"
                  style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                >
                  {ROLES[index].title}
                </h3>
                {ROLES[index].alt && (
                  <p className="text-[#5E58D5] text-sm font-semibold mb-4 italic">
                    Also known as: {ROLES[index].alt}
                  </p>
                )}
                <p className="text-[#525252] text-base leading-relaxed mb-6">
                  {ROLES[index].desc}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {ROLES.map((role, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === index ? "bg-[#2d2d2d] w-6" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to role ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}