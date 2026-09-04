import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaitHelix from "@/components/plait/PlaitHelix";

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

const STRANDS = [
  { key: "ads", label: "ADS", color: "#879AF4" },
  { key: "website", label: "WEBSITE", color: "#E668A6" },
  { key: "attribution", label: "ATTRIBUTION", color: "#D476C5" },
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

  return (
    <section className="relative py-16 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 border-l-2 border-black pl-6"
        >
          <p className="text-black text-base leading-relaxed">
            <span className="font-bold">plait</span>{" "}
            <span className="text-black italic text-sm">/plāt/</span>{" "}
            <span className="text-black text-xs font-bold uppercase tracking-widest">noun</span>
            {"  "}
            <span className="text-black">A single length formed by intertwining three or more strands. Stronger, more flexible, and more resistant to unraveling than any single strand alone.</span>
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
            className="mb-10 max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ color: state.color }}>
              {state.label}
            </p>
            <p className="text-black font-bold text-3xl sm:text-4xl mb-5 leading-tight" style={{ fontFamily: "Benzin, sans-serif" }}>
              {state.title}
            </p>
            <p className="text-black text-lg leading-relaxed">{state.body}</p>
          </motion.div>
        </AnimatePresence>

        {/* Interactive grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: toggles */}
          <div>
            <p className="text-black text-sm leading-relaxed mb-6 max-w-md">
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
            <div className="relative w-full max-w-[200px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full select-none"
              >
                <PlaitHelix active={{ ads, website, attribution }} className="w-full h-auto" />
              </motion.div>

              {/* Strand labels with dashed leaders — each points to where its
                  own strand is on top of the braid. */}
              {/* ADS — right, upper (strand on top here) */}
              <div
                className="absolute top-[13%] -right-2 sm:right-2 flex items-center gap-2"
                style={{ opacity: ads ? 1 : 0.35 }}
              >
                <div className="w-8 border-t border-dashed" style={{ borderColor: "#879AF4" }} />
                <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: "#879AF4" }}>
                  ADS
                </span>
              </div>
              {/* WEBSITE — left, upper (strand on top here) */}
              <div
                className="absolute top-[23%] -left-2 sm:left-2 flex items-center gap-2"
                style={{ opacity: website ? 1 : 0.35 }}
              >
                <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: "#E668A6" }}>
                  WEBSITE
                </span>
                <div className="w-8 border-t border-dashed" style={{ borderColor: "#E668A6" }} />
              </div>
              {/* ATTRIBUTION — left, lower (strand on top here) */}
              <div
                className="absolute top-[65%] -left-2 sm:left-2 flex items-center gap-2"
                style={{ opacity: attribution ? 1 : 0.35 }}
              >
                <span className="text-[10px] font-bold tracking-[0.12em]" style={{ color: "#D476C5" }}>
                  ATTRIBUTION
                </span>
                <div className="w-8 border-t border-dashed" style={{ borderColor: "#D476C5" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}