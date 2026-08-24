import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DELIVERABLES = [
  {
    id: "motives",
    title: "Verified Buyer Motives",
    description:
      "We map the real reasons your customers buy so every message hits the nerve that converts.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
  },
  {
    id: "advantages",
    title: "Defined Market Advantages",
    description:
      "Sharp positioning that separates you from competitors and makes the choice obvious.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200",
  },
  {
    id: "efficiency",
    title: "Higher Ad Efficiency",
    description:
      "More revenue from the same spend through tighter targeting, creative, and bidding.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
  },
  {
    id: "architecture",
    title: "Optimal Account Architecture",
    description:
      "Campaign, ad set, and audience structures built to scale without waste.",
    image:
      "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1200",
  },
  {
    id: "swipe",
    title: "Swipe File Warehouse",
    description:
      "A living library of proven ads and angles that fuels nonstop content ideation.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
  },
  {
    id: "checkout",
    title: "Optimized Checkout Flows",
    description:
      "Conversion paths engineered to move visitors from interest to purchase.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
  },
  {
    id: "tracking",
    title: "Clean Data Tracking",
    description:
      "Accurate events and attribution so you trust every number in your reports.",
    image:
      "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
  },
  {
    id: "nurture",
    title: "Automated Nurture & Retention",
    description:
      "Email and lifecycle sequences that turn one-time buyers into repeat revenue.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
  },
  {
    id: "dashboard",
    title: "Custom KPI Dashboard",
    description:
      "A dashboard built around the metrics that actually drive your business.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
  },
  {
    id: "pipelines",
    title: "Managed Content Pipelines",
    description:
      "A production pipeline that keeps fresh, on-brand creative shipping on schedule.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
  },
];

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % DELIVERABLES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + DELIVERABLES.length) % DELIVERABLES.length);
  }, []);

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const pad = (n) => String(n + 1).padStart(2, "0");

  return (
    <div className="w-full py-8 md:py-12">
      <div className="w-full px-0 md:px-4 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: tab list */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="flex flex-col">
              {DELIVERABLES.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-4 md:py-5 text-left transition-all duration-500 border-t border-black/10 first:border-0",
                      isActive ? "text-[#2d2d2d]" : "text-[#9a9a9a] hover:text-[#2d2d2d]"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-black/10">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-[#2d2d2d] origin-top"
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "0%" } : { height: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>

                    <span className="text-[10px] md:text-[11px] font-medium mt-1 tabular-nums opacity-50">
                      /{pad(index)}
                    </span>

                    <div className="flex flex-col gap-1.5 flex-1">
                      <span
                        className={cn(
                          "text-xl md:text-2xl font-normal tracking-tight transition-colors duration-500",
                          isActive ? "text-[#2d2d2d]" : ""
                        )}
                      >
                        {item.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-[#6b6b6b] text-sm md:text-base font-light leading-relaxed max-w-sm pb-1">
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: image */}
          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-black/5 border border-black/10">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={DELIVERABLES[activeIndex].image}
                      alt={DELIVERABLES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 block"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 backdrop-blur-md border border-black/10 flex items-center justify-center text-[#2d2d2d] hover:bg-white transition-all active:scale-90"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 backdrop-blur-md border border-black/10 flex items-center justify-center text-[#2d2d2d] hover:bg-white transition-all active:scale-90"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;