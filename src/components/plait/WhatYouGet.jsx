import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3, Lightbulb, Megaphone, Globe } from "lucide-react";

const deliverables = [
  {
    icon: Globe,
    title: "A Full Funnel",
    desc: "Top to bottom. Awareness through conversion. Every stage mapped, built, and connected — so nothing leaks.",
  },
  {
    icon: BarChart3,
    title: "Complete Attribution",
    desc: "Pixel + Conversion API setup. Know exactly what's working, what isn't, and where every sale came from.",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    desc: "Identify untapped channels, audiences, and angles your competitors haven't found yet.",
  },
  {
    icon: Lightbulb,
    title: "Creative Angles to Test",
    desc: "Develop hooks, messaging, and formats built for your audience — not recycled templates.",
  },
  {
    icon: Megaphone,
    title: "Paid Ads — Launched & Optimized",
    desc: "Launch new campaigns or take over existing ones. Meta, Google, TikTok, and beyond.",
  },
  {
    icon: Target,
    title: "Website Buildout / Uplift",
    desc: "From first impression to checkout — every page designed to convert, not just look good.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="py-28 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3">What You Get</p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Turn generated attention<br />into revenue.
          </h2>
          <p className="text-[#525252] text-base leading-relaxed">
            Not just ads. A complete system — from first click to closed sale — with the infrastructure to actually measure what's working.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          {deliverables.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white p-8 flex flex-col gap-4 hover:bg-[#F8F7FF] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0A0A0A] text-base mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-[#525252] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}