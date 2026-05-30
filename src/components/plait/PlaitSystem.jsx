import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getState(ads, website, attribution) {
  const count = [ads, website, attribution].filter(Boolean).length;
  if (count === 3) return {
    label: "All three connected",
    title: "One system. Compounding returns.",
    body: "When all three strands work together, your messaging carries from ad to site to follow-up, attribution shows you what's working, and every campaign sharpens the next. This is what scales.",
    color: "#16a34a",
  };
  if (count === 0) return {
    label: "Nothing connected",
    title: "No system. No revenue.",
    body: "Without any of the three strands working, there is no acquisition system. This is where most businesses start. The good news? It's where the biggest gains are.",
    color: "#dc2626",
  };
  if (ads && website && !attribution) return {
    label: "Missing attribution",
    title: "Sales without insight.",
    body: "Your ads and site are aligned, but you can't tell what's actually driving conversions. You may get results, but you won't know what to scale or kill.",
    color: "#d97706",
  };
  if (ads && !website && attribution) return {
    label: "Missing the site",
    title: "Traffic with nowhere to land.",
    body: "You're driving paid traffic and tracking it, but the destination doesn't convert. Every click is a wasted dollar until the site does its job.",
    color: "#d97706",
  };
  if (!ads && website && attribution) return {
    label: "Missing acquisition",
    title: "A great machine. No fuel.",
    body: "You have a converting site and clean attribution, but no traffic flowing in. The system is ready and starving. You need acquisition to make any of it matter.",
    color: "#d97706",
  };
  if (ads && !website && !attribution) return {
    label: "Ads only",
    title: "Pouring money into a void.",
    body: "Running ads without a site that converts and attribution to track them is the most expensive mistake in marketing. Spending without knowing if it works or how to fix it.",
    color: "#dc2626",
  };
  if (!ads && website && !attribution) return {
    label: "Website only",
    title: "A storefront with no door.",
    body: "A converting site with no traffic and no measurement is just a brochure. No one's coming, and even if they did, you'd never know how they got there.",
    color: "#dc2626",
  };
  if (!ads && !website && attribution) return {
    label: "Attribution only",
    title: "Tracking nothing.",
    body: "Clean reporting is powerful, but only when there's actual activity to track. Without ads and a site, you're measuring silence.",
    color: "#dc2626",
  };
  return { label: "", title: "", body: "", color: "#dc2626" };
}

// Symmetric woven braid SVG
function PlaitViz({ ads, website, attribution }) {
  const W = 180;
  const H = 320;
  const cx = W / 2;
  const amp = 38;
  const freq = 3;

  const strandA = { active: ads, color: ads ? "#a0b4ff" : "#e5e7eb", label: "Ads" };
  const strandB = { active: attribution, color: attribution ? "#c084fc" : "#e5e7eb", label: "Attribution" };
  const strandC = { active: website, color: website ? "#f472b6" : "#e5e7eb", label: "Website" };

  const pathA = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    const y = 10 + t * (H - 20);
    const x = cx + amp * Math.sin(t * Math.PI * freq);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");

  const pathB = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    const y = 10 + t * (H - 20);
    const x = cx + amp * Math.sin(t * Math.PI * freq + (2 * Math.PI) / 3);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");

  const pathC = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    const y = 10 + t * (H - 20);
    const x = cx + amp * Math.sin(t * Math.PI * freq + (4 * Math.PI) / 3);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");

  // Label positions at top of each strand
  const labelY = 6;
  const labelAx = cx + amp * Math.sin(0);
  const labelBx = cx + amp * Math.sin((2 * Math.PI) / 3);
  const labelCx = cx + amp * Math.sin((4 * Math.PI) / 3);

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full max-w-[200px]">
      {/* Strand labels at top */}
      <text x={labelAx} y={labelY} textAnchor="middle" fontSize="8" fontWeight="700" fill={strandA.color} fontFamily="Manrope, sans-serif" letterSpacing="0.05em">
        {strandA.label.toUpperCase()}
      </text>
      <text x={labelBx} y={labelY} textAnchor="middle" fontSize="8" fontWeight="700" fill={strandB.color} fontFamily="Manrope, sans-serif" letterSpacing="0.05em">
        {strandB.label.toUpperCase()}
      </text>
      <text x={labelCx} y={labelY} textAnchor="middle" fontSize="8" fontWeight="700" fill={strandC.color} fontFamily="Manrope, sans-serif" letterSpacing="0.05em">
        {strandC.label.toUpperCase()}
      </text>
      {/* Braid paths offset below labels */}
      <g transform="translate(0, 14)">
        <path d={pathB} stroke={strandB.color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d={pathC} stroke={strandC.color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d={pathA} stroke={strandA.color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const TOGGLES = [
  { key: "ads", label: "Ads" },
  { key: "website", label: "Website" },
  { key: "attribution", label: "Attribution" },
];

export default function PlaitSystem() {
  const [ads, setAds] = useState(true);
  const [website, setWebsite] = useState(true);
  const [attribution, setAttribution] = useState(true);

  const setters = { ads: setAds, website: setWebsite, attribution: setAttribution };
  const values = { ads, website, attribution };

  const state = getState(ads, website, attribution);

  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">

        {/* Definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-l-2 border-[#0A0A0A] pl-6"
        >
          <p className="text-[#0A0A0A] text-base leading-relaxed">
            <span className="font-extrabold">plait</span>{" "}
            <span className="text-[#525252] italic text-sm">/plāt/</span>{" "}
            <span className="text-[#525252] text-xs font-bold uppercase tracking-widest">noun</span>
            {"  "}
            <span className="text-[#525252]">A single length formed by intertwining three or more strands. Stronger, more flexible, and more resistant to unraveling than any single strand alone.</span>
          </p>
        </motion.div>

        {/* Interactive grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: toggles + feedback */}
          <div>
            <p className="text-[#525252] text-sm leading-relaxed mb-10">
              Toggle a strand off and watch what breaks. This is what happens when ads, site, and tracking aren't speaking to each other.
            </p>

            {/* Toggle rows — clean, no boxes */}
            <div className="space-y-0">
              {TOGGLES.map(({ key, label }, i) => {
                const active = values[key];
                return (
                  <div key={key} className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0">
                    <span
                      className="text-sm font-extrabold uppercase tracking-widest"
                      style={{ color: active ? "#0A0A0A" : "#D1D5DB" }}
                    >
                      {label}
                    </span>
                    <button
                      onClick={() => setters[key](!active)}
                      className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${
                        active ? "bg-gradient-to-r from-[#a0b4ff] via-[#c084fc] to-[#f472b6]" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          active ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Inline state feedback — no box, just text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={state.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-10"
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: state.color }}>
                  {state.label}
                </p>
                <p className="text-[#0A0A0A] font-extrabold text-lg mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {state.title}
                </p>
                <p className="text-[#525252] text-sm leading-relaxed">{state.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: braid viz */}
          <div className="flex justify-center items-center py-4">
            <PlaitViz ads={ads} website={website} attribution={attribution} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}