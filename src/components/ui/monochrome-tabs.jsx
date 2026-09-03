import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "motives",
    label: "Verified Buyer Motives",
    description: "We map the real reasons your customers buy so every message hits the nerve that converts.",
  },
  {
    id: "advantages",
    label: "Defined Market Advantages",
    description: "Sharp positioning that separates you from competitors and makes the choice obvious.",
  },
  {
    id: "efficiency",
    label: "Higher Ad Efficiency",
    description: "More revenue from the same spend through tighter targeting, creative, and bidding.",
  },
  {
    id: "architecture",
    label: "Optimal Account Architecture",
    description: "Campaign, ad set, and audience structures built to scale without waste.",
  },
  {
    id: "swipe",
    label: "Swipe File Warehouse",
    description: "A living library of proven ads and angles that fuels nonstop content ideation.",
  },
  {
    id: "checkout",
    label: "Optimized Checkout Flows",
    description: "Conversion paths engineered to move visitors from interest to purchase.",
  },
  {
    id: "tracking",
    label: "Clean Data Tracking",
    description: "Accurate events and attribution so you trust every number in your reports.",
  },
  {
    id: "nurture",
    label: "Automated Nurture & Retention",
    description: "Email and lifecycle sequences that turn one-time buyers into repeat revenue.",
  },
  {
    id: "dashboard",
    label: "Custom KPI Dashboard",
    description: "A dashboard built around the metrics that actually drive your business.",
  },
  {
    id: "pipelines",
    label: "Managed Content Pipelines",
    description: "A production pipeline that keeps fresh, on-brand creative shipping on schedule.",
  },
];

export default function MonochromeTabs() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  const setCardGlow = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200 shadow-[0_36px_120px_-70px_rgba(15,15,15,0.18)] flex flex-col lg:flex-row min-h-[600px]"
      >
        {/* Left — dark vertical tab pills */}
        <div className="w-full lg:w-[40%] bg-neutral-950 px-6 md:px-10 lg:pl-12 lg:pr-10 py-8 lg:py-12 flex flex-col justify-center">
          <div className="flex lg:flex-col gap-2 md:gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TABS.map((tab, index) => {
              const isActive = index === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex items-center px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-500 text-left group border shrink-0",
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-neutral-500 border-[#262626] hover:border-neutral-500 hover:text-neutral-300"
                  )}
                >
                  <span className="font-normal text-xs md:text-sm tracking-tight whitespace-nowrap uppercase">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — display area with stacked deck card */}
        <div
          className="flex-1 relative flex items-center justify-center px-6 md:px-12 lg:px-10 py-16 md:py-24 lg:py-16 border-t lg:border-t-0 lg:border-l border-neutral-200"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(15, 23, 42, 0.08), rgba(255, 255, 255, 0.95) 70%)",
          }}
        >
          <div className="relative w-full max-w-xl aspect-[4/3]" onMouseMove={setCardGlow} onMouseLeave={clearCardGlow}>
            {/* Stacked deck — faded cards behind */}
            <div className="absolute inset-0 rounded-[1.5rem] bg-neutral-200/70 rotate-[2deg] translate-x-3 translate-y-3" />
            <div className="absolute inset-0 rounded-[1.5rem] bg-neutral-200/40 -rotate-[1.5deg] -translate-x-2 translate-y-2" />

            {/* Main white card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1] }}
                className="group absolute inset-0 rounded-[1.5rem] border border-neutral-200 bg-white overflow-hidden flex flex-col justify-center gap-5 md:gap-6 px-8 md:px-12 shadow-[0_36px_140px_-60px_rgba(10,10,10,0.35)]"
              >
                {/* Hover glow following the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(15, 15, 15, 0.08), transparent 70%)",
                  }}
                />

                <p className="relative text-xs uppercase tracking-[0.35em] text-neutral-400">
                  {current.label}
                </p>

                <span className="relative inline-flex w-fit items-center rounded-full border border-neutral-200 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-neutral-600">
                  {active + 1} • {current.label}
                </span>

                <p className="relative text-2xl md:text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}