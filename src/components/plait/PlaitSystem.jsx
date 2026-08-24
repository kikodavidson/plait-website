import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getState(ads, website, attribution) {
  const count = [ads, website, attribution].filter(Boolean).length;
  if (count === 3)
    return {
      label: "All three connected",
      title: "One system. Compounding returns.",
      body: "When all three strands work together, your messaging carries from ad to site to follow-up, attribution shows you what's working, and every campaign sharpens the next. This is what scales.",
      color: "#4A9960",
    };
  if (count === 0)
    return {
      label: "Nothing connected",
      title: "No system. No revenue.",
      body: "Without any of the three strands working, there is no acquisition system. This is where most businesses start. The good news? It's where the biggest gains are.",
      color: "#dc2626",
    };
  if (ads && website && !attribution)
    return {
      label: "Missing attribution",
      title: "Sales without insight.",
      body: "Your ads and site are aligned, but you can't tell what's actually driving conversions. You may get results, but you won't know what to scale or kill.",
      color: "#d97706",
    };
  if (ads && !website && attribution)
    return {
      label: "Missing the site",
      title: "Traffic with nowhere to land.",
      body: "You're driving paid traffic and tracking it, but the destination doesn't convert. Every click is a wasted dollar until the site does its job.",
      color: "#d97706",
    };
  if (!ads && website && attribution)
    return {
      label: "Missing acquisition",
      title: "A great machine. No fuel.",
      body: "You have a converting site and clean attribution, but no traffic flowing in. The system is ready and starving. You need acquisition to make any of it matter.",
      color: "#d97706",
    };
  if (ads && !website && !attribution)
    return {
      label: "Ads only",
      title: "Pouring money into a void.",
      body: "Running ads without a site that converts and attribution to track them is the most expensive mistake in marketing. Spending without knowing if it works or how to fix it.",
      color: "#dc2626",
    };
  if (!ads && website && !attribution)
    return {
      label: "Website only",
      title: "A storefront with no door.",
      body: "A converting site with no traffic and no measurement is just a brochure. No one's coming, and even if they did, you'd never know how they got there.",
      color: "#dc2626",
    };
  if (!ads && !website && attribution)
    return {
      label: "Attribution only",
      title: "Tracking nothing.",
      body: "Clean reporting is powerful, but only when there's actual activity to track. Without ads and a site, you're measuring silence.",
      color: "#dc2626",
    };
  return { label: "", title: "", body: "", color: "#dc2626" };
}

// Single static braid image — used for every toggle state.
const BRAID_IMAGE = "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/736190da3_generated_image.png";

const STRANDS = [
  { key: "ads", label: "ADS", color: "#7D9AFF" },
  { key: "website", label: "WEBSITE", color: "#FF73AD" },
  { key: "attribution", label: "ATTRIBUTION", color: "#A67CFF" },
];

function CapsuleToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative h-7 w-12 rounded-full transition-colors duration-300 shrink-0"
      style={{ backgroundColor: checked ? "#262626" : "#d4d4d4" }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
        style={{ left: checked ? 26 : 4 }}
      />
    </button>
  );
}

export default function PlaitSystem() {
  const [ads, setAds] = useState(true);
  const [website, setWebsite] = useState(true);
  const [attribution, setAttribution] = useState(true);

  const setters = { ads: setAds, website: setWebsite, attribution: setAttribution };
  const values = { ads, website, attribution };
  const state = getState(ads, website, attribution);
  const image = BRAID_IMAGE;

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#F2F2F2]">
      {/* soft multi-color gradient blooms, top-right */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-[#D1F2D1]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-40 h-[300px] w-[300px] rounded-full bg-[#D1D1F2]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-[260px] w-[260px] rounded-full bg-[#F2D1D1]/40 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* Definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 border-l-2 border-black pl-6"
        >
          <p className="text-[#2d2d2d] text-base leading-relaxed">
            <span className="font-bold">plait</span>{" "}
            <span className="text-[#525252] italic text-sm">/plāt/</span>{" "}
            <span className="text-[#525252] text-xs font-bold uppercase tracking-widest">noun</span>
            {"  "}
            <span className="text-[#4D4D4D]">A single length formed by intertwining three or more strands. Stronger, more flexible, and more resistant to unraveling than any single strand alone.</span>
          </p>
        </motion.div>

        {/* Connected summary — updates per state, sits above the toggles */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-20 max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ color: state.color }}>
              {state.label}
            </p>
            <p className="text-[#2d2d2d] font-bold text-3xl sm:text-4xl mb-5 leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              {state.title}
            </p>
            <p className="text-[#525252] text-lg leading-relaxed">{state.body}</p>
          </motion.div>
        </AnimatePresence>

        {/* Interactive grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: toggles */}
          <div>
            <p className="text-[#4D4D4D] text-sm leading-relaxed mb-10 max-w-md">
              Toggle a strand off and watch what breaks. This is what happens when ads, site, and
              tracking aren't speaking to each other.
            </p>

            <div className="space-y-0">
              {STRANDS.map(({ key, label, color }) => {
                const active = values[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between py-5 border-b border-black/10 last:border-0"
                  >
                    <span
                      className="text-sm font-bold uppercase tracking-[0.12em] transition-colors"
                      style={{ color: active ? color : "#C4C4C4" }}
                    >
                      {label}
                    </span>
                    <CapsuleToggle checked={active} onChange={(v) => setters[key](v)} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: plait image with strand labels */}
          <div className="relative flex justify-center items-center py-4">
            <div className="relative w-full max-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={image}
                  src={image}
                  alt="Plait braid"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full rounded-2xl select-none"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Strand labels with dashed leaders */}
              {/* ADS — right top */}
              <div
                className="absolute top-[14%] -right-2 sm:right-2 flex items-center gap-2"
                style={{ opacity: ads ? 1 : 0.35 }}
              >
                <div className="w-8 border-t border-dashed" style={{ borderColor: "#7D9AFF" }} />
                <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: "#7D9AFF" }}>
                  ADS
                </span>
              </div>
              {/* ATTRIBUTION — left middle */}
              <div
                className="absolute top-1/2 -left-2 sm:left-2 -translate-y-1/2 flex items-center gap-2"
                style={{ opacity: attribution ? 1 : 0.35 }}
              >
                <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: "#A67CFF" }}>
                  ATTRIBUTION
                </span>
                <div className="w-8 border-t border-dashed" style={{ borderColor: "#A67CFF" }} />
              </div>
              {/* WEBSITE — right bottom */}
              <div
                className="absolute bottom-[14%] -right-2 sm:right-2 flex items-center gap-2"
                style={{ opacity: website ? 1 : 0.35 }}
              >
                <div className="w-8 border-t border-dashed" style={{ borderColor: "#FF73AD" }} />
                <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: "#FF73AD" }}>
                  WEBSITE
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}