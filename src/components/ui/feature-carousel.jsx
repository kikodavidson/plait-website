"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "motives",
    label: "Verified Buyer Motives",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
    description: "We map the real reasons your customers buy so every message hits the nerve that converts.",
  },
  {
    id: "advantages",
    label: "Defined Market Advantages",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
    description: "Sharp positioning that separates you from competitors and makes the choice obvious.",
  },
  {
    id: "efficiency",
    label: "Higher Ad Efficiency",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
    description: "More revenue from the same spend through tighter targeting, creative, and bidding.",
  },
  {
    id: "architecture",
    label: "Optimal Account Architecture",
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1200",
    description: "Campaign, ad set, and audience structures built to scale without waste.",
  },
  {
    id: "swipe",
    label: "Swipe File Warehouse",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    description: "A living library of proven ads and angles that fuels nonstop content ideation.",
  },
  {
    id: "checkout",
    label: "Optimized Checkout Flows",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "Conversion paths engineered to move visitors from interest to purchase.",
  },
  {
    id: "tracking",
    label: "Clean Data Tracking",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Accurate events and attribution so you trust every number in your reports.",
  },
  {
    id: "nurture",
    label: "Automated Nurture & Retention",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Email and lifecycle sequences that turn one-time buyers into repeat revenue.",
  },
  {
    id: "dashboard",
    label: "Custom KPI Dashboard",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    description: "A dashboard built around the metrics that actually drive your business.",
  },
  {
    id: "pipelines",
    label: "Managed Content Pipelines",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    description: "A production pipeline that keeps fresh, on-brand creative shipping on schedule.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-indigo-400/30 shadow-[0_0_40px_rgba(99,102,241,0.35),0_0_90px_rgba(99,102,241,0.25),0_0_160px_rgba(99,102,241,0.18)]">
        {/* Left: deliverable pills — static vertical stack */}
        <div className="w-full lg:w-[40%] relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-12 lg:pl-12 lg:pr-10 bg-black py-10 lg:py-12">
          <div className="relative w-full flex flex-col justify-center gap-2 md:gap-2.5 z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={feature.id}
                  onClick={() => handleChipClick(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={cn(
                    "relative flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-500 text-left group border",
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/45 border-white/15 hover:border-white/30 hover:text-white/80"
                  )}
                >
                  <span className="font-normal text-xs md:text-sm tracking-tight whitespace-nowrap uppercase">
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: image card */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-secondary/30 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border border-border/40 bg-background origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                    )}
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-border/50">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;