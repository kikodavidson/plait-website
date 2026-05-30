import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING = [
  "Scale.",
  "Convert.",
  "Attract Attention.",
  "Attribute.",
  "Measure.",
  "Improve Performance",
];

const STATS = [
  { prefix: "$", value: 20, suffix: "+", label: "Tested on Ads", decimalDivide: 10 },
  { prefix: "", value: 80, suffix: "+", label: "Brands Scaled" },
  { prefix: "", value: 11, suffix: "+", label: "Growth Channels" },
];

function useCountUp(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, started, divider }) {
  const count = useCountUp(stat.value, 1800, started);

  const display = stat.decimalDivide
    ? `$${(count / stat.decimalDivide).toFixed(1)}M+`
    : `${stat.prefix}${count}${stat.suffix}`;

  return (
    <div className={`flex flex-col items-center px-6 ${divider ? "border-l border-gray-200" : ""}`}>
      <p className="text-4xl sm:text-5xl font-extrabold text-[#4F46E5] tracking-tight leading-none">
        {display}
      </p>
      <p className="text-xs text-[#525252] font-semibold mt-2 uppercase tracking-wider">{stat.label}</p>
    </div>
  );
}

function CashBurst({ active }) {
  const emojis = ["💵", "💸", "🤑", "💰", "💵", "💸", "💰", "🤑"];
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
      {emojis.map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl select-none"
          style={{ left: `${5 + i * 12}%`, top: "50%" }}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-10, -100 - i * 10],
            rotate: [-15 + i * 8, 15 - i * 6],
            scale: [0.5, 1.2, 1],
          }}
          transition={{ duration: 1.2, delay: i * 0.07, ease: "easeOut" }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const isScale = ROTATING[index] === "Scale.";

  return (
    <section className="hero-gradient min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-semibold px-4 py-2 rounded-full mb-10 shadow-sm"
        >
          Battle Tested Marketing, Enhanced by AI.
        </motion.div>

        {/* Static headline */}
        <motion.h1
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tight mb-0 font-body"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Growth Partner,
        </motion.h1>
        <motion.h1
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-extrabold text-[#0A0A0A] leading-[1.05] tracking-tight mb-2 font-body"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Built to Help Brands
        </motion.h1>

        {/* Rotating word + cash burst */}
        <div className="relative">
          <CashBurst active={isScale} />
          <div className="text-[clamp(1.8rem,5vw,4rem)] font-extrabold text-[#4F46E5] leading-[1.15] tracking-tight mb-8 h-[1.4em] flex items-center justify-center overflow-visible font-body" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="block"
              >
                {ROTATING[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-[#525252] text-lg max-w-xl leading-relaxed mb-10 font-medium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Like couples therapy for your ads, website, attribution, and analytics.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#4F46E5] text-white font-bold text-base px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 group"
          >
            See What's Possible
            <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors text-sm">→</span>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          ref={statsRef}
          className="mt-20 w-full max-w-2xl bg-white border border-gray-100 rounded-3xl px-6 py-8 grid grid-cols-3 gap-0 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} started={statsStarted} divider={i > 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}