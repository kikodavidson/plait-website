import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3, Lightbulb, Megaphone, Globe } from "lucide-react";

const deliverables = [
  {
    icon: Globe,
    title: "A Full Funnel",
    desc: "A cross-channel top to bottom funnel that generates and captures demand via paid and organic strategies.",
  },
  {
    icon: BarChart3,
    title: "Complete Attribution",
    desc: "iOS 14 f***ed up attribution, but a high EMQ score is possible (and necessary).",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    desc: "Identify untapped channels, audiences, and angles you and/or your competitors haven't found yet.",
  },
  {
    icon: Lightbulb,
    title: "Ideate Killer Content to Test",
    desc: "Develop hooks, angles, messaging, offers, and formats, built for your audiences.",
  },
  {
    icon: Megaphone,
    title: "Paid Ads | Launch + Optimize",
    desc: "Launch new campaigns or take over existing ones. Meta, Google, TikTok, and beyond — to generate and capture demand in the market.",
  },
  {
    icon: Target,
    title: "Website Buildout / Uplift",
    desc: "Driving traffic to a poorly optimised site is burning money. Every page built to bring visitors across the finish line.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-3">What You Get</p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Turn{" "}
            <span className="relative inline-block">
              generated attention
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8.5 C40 3, 80 10, 120 6 C160 2, 200 9, 240 5.5 C270 3, 290 7, 298 6"
                  stroke="#0A0A0A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ filter: 'url(#pencil)' }}
                />
                <filter id="pencil">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </svg>
            </span>
            <br />into revenue.
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