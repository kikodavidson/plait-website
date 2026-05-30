import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Monitor, BarChart2, Megaphone as MegaphoneIcon } from "lucide-react";

const STRANDS = [
  { key: "ads", label: "Ads", icon: Megaphone, color: "#E91E8C" },
  { key: "website", label: "Website", icon: Monitor, color: "#E91E8C" },
  { key: "attribution", label: "Attribution", icon: BarChart2, color: "#C6F135" },
];

function getState(ads, website, attribution) {
  const count = [ads, website, attribution].filter(Boolean).length;
  if (count === 3) return {
    label: "All three connected",
    title: "One system. Compounding returns.",
    body: "When all three strands work together, your messaging carries from ad to site to follow-up, attribution shows you what's working, and every campaign sharpens the next. This is what scales.",
    color: "#C6F135",
    border: "border-[#C6F135]/30",
  };
  if (count === 0) return {
    label: "Nothing connected",
    title: "No system. No revenue.",
    body: "Without any of the three strands working, there is no acquisition system. This is where most businesses start. The good news? It's where the biggest gains are.",
    color: "#E91E8C",
    border: "border-[#E91E8C]/30",
  };
  if (ads && !website && !attribution) return {
    label: "Ads only",
    title: "Pouring money into a void.",
    body: "Running ads without a site that converts and attribution to track them is the most expensive mistake in marketing. You're spending without knowing if it works or fixing what doesn't.",
    color: "#E91E8C",
    border: "border-[#E91E8C]/30",
  };
  if (!ads && website && !attribution) return {
    label: "Website only",
    title: "A storefront with no door.",
    body: "A converting website with no traffic and no measurement is just a brochure. No one's coming, and even if they did, you'd never know how they got there.",
    color: "#E91E8C",
    border: "border-[#E91E8C]/30",
  };
  if (!ads && !website && attribution) return {
    label: "Attribution only",
    title: "Tracking nothing.",
    body: "Clean tracking and reporting are powerful, but only when there's actual activity to track. Without ads driving traffic and a site converting it, you're measuring silence.",
    color: "#E91E8C",
    border: "border-[#E91E8C]/30",
  };
  if (ads && website && !attribution) return {
    label: "Missing attribution",
    title: "Sales without insight.",
    body: "Your ads and site are aligned, but you can't tell what's actually driving conversions. You may get sales, but you won't know from where, why, or how to scale them.",
    color: "#F5A623",
    border: "border-[#F5A623]/30",
  };
  if (ads && !website && attribution) return {
    label: "Missing acquisition",
    title: "A great machine. No fuel.",
    body: "You have a converting site and clean attribution, but no traffic flowing in. The system is ready, but it's starving. You need acquisition to make any of it matter.",
    color: "#F5A623",
    border: "border-[#F5A623]/30",
  };
  if (!ads && website && attribution) return {
    label: "Missing acquisition",
    title: "A great machine. No fuel.",
    body: "You have a converting site and clean attribution, but no traffic flowing in. The system is ready, but it's starving. You need acquisition to make any of it matter.",
    color: "#F5A623",
    border: "border-[#F5A623]/30",
  };
  return { label: "", title: "", body: "", color: "#E91E8C", border: "border-white/10" };
}

function PlaitViz({ ads, website, attribution }) {
  const adsColor = ads ? "#E91E8C" : "#3a1a2e";
  const attrColor = attribution ? "#C6F135" : "#2a3010";
  const siteColor = website ? "#E91E8C" : "#3a1a2e";

  const W = 240;
  const H = 360;
  const midX = W / 2;
  const amp = 48;

  // Three sinusoidal paths
  const pts = (offsetY, amplitude, phase) => {
    const steps = 60;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      const y = offsetY + t * (H - offsetY * 0.5);
      const x = midX + amplitude * Math.sin(phase + t * Math.PI * 3);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  const adsPath = pts(20, amp, 0);
  const attrPath = pts(20, amp * 0.6, Math.PI);
  const sitePath = pts(20, amp, Math.PI * 0.7);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px]">
      {/* Column labels */}
      <text x="42" y="14" fontSize="7" fill="#E91E8C" fontWeight="700" fontFamily="Manrope" letterSpacing="2" textAnchor="middle" opacity={ads ? 1 : 0.3}>ADS</text>
      <text x={midX} y="14" fontSize="7" fill="#C6F135" fontWeight="700" fontFamily="Manrope" letterSpacing="2" textAnchor="middle" opacity={attribution ? 1 : 0.3}>ATTRIBUTION</text>
      <text x={W - 42} y="14" fontSize="7" fill="#E91E8C" fontWeight="700" fontFamily="Manrope" letterSpacing="2" textAnchor="middle" opacity={website ? 1 : 0.3}>SITE</text>

      {/* Paths */}
      <path d={adsPath} stroke={adsColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray={ads ? "none" : "4 4"} />
      <path d={attrPath} stroke={attrColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray={attribution ? "none" : "4 4"} />
      <path d={sitePath} stroke={siteColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray={website ? "none" : "4 4"} />

      {/* Intersection dots */}
      {[H * 0.28, H * 0.54, H * 0.78].map((cy, i) => (
        <circle key={i} cx={midX} cy={cy} r="4" fill={attribution ? "#C6F135" : "#2a3010"} />
      ))}
    </svg>
  );
}

export default function PlaitSystem() {
  const [ads, setAds] = useState(true);
  const [website, setWebsite] = useState(true);
  const [attribution, setAttribution] = useState(true);

  const state = getState(ads, website, attribution);

  const toggles = [
    { key: "ads", label: "Ads", value: ads, set: setAds, icon: Megaphone },
    { key: "website", label: "Website", value: website, set: setWebsite, icon: Monitor },
    { key: "attribution", label: "Attribution", value: attribution, set: setAttribution, icon: BarChart2 },
  ];

  return (
    <section className="py-28 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">

        {/* Definition block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-l-2 border-[#E91E8C] pl-6 mb-16"
        >
          <p className="text-white text-base leading-relaxed">
            <span className="font-extrabold text-white">plait</span>{" "}
            <span className="text-white/40 italic text-sm">/plāt/</span>{" "}
            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-widest">noun</span>
            {"  "}
            <span className="text-white/60">A single length formed by intertwining three or more strands together. Stronger, more flexible, and more resistant to unraveling than any single strand alone.</span>
          </p>
        </motion.div>

        {/* Interactive section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#111111] border border-white/8 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: toggles + state card */}
            <div>
              <p className="text-[#E91E8C] text-xs font-bold uppercase tracking-widest mb-2">Toggle the strands</p>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Toggle a strand off and watch the system stop working. This is what happens to your funnel when ads, site, and tracking aren't speaking to each other.
              </p>

              <div className="space-y-3 mb-8">
                {toggles.map(({ key, label, value, set, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => set(!value)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all text-left ${
                      value
                        ? "bg-[#E91E8C]/10 border-[#E91E8C]/40"
                        : "bg-black/30 border-white/8"
                    }`}
                  >
                    {/* Toggle pill */}
                    <div
                      className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${
                        value ? "bg-[#E91E8C]" : "bg-white/15"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          value ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                    <Icon className={`w-4 h-4 shrink-0 ${value ? "text-[#E91E8C]" : "text-white/25"}`} />
                    <span
                      className={`text-xs font-extrabold uppercase tracking-widest ${
                        value ? "text-white" : "text-white/30"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {/* State feedback card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={`border rounded-xl p-5 ${state.border} bg-black/20`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: state.color }}>
                    {state.label}
                  </p>
                  <p className="text-white font-extrabold text-base mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {state.title}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{state.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Plait visualization */}
            <div className="flex justify-center items-center py-8">
              <PlaitViz ads={ads} website={website} attribution={attribution} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}