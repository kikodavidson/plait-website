import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import ShinyButton from "@/components/ui/shiny-button";
import ConstellationGrid from "@/components/ui/constellation-grid";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING = [
  "Scale.",
  "Convert More Customers.",
  "Attract Attention.",
  "Attribute Sales.",
  "Improve Performance.",
  "Maximize Clicks.",
];

const STATS = [
  { prefix: "$", value: 4, suffix: "M+", label: "Revenue Generated", start: 1.1, decimals: 1 },
  { prefix: "", value: 80, suffix: "+", label: "Brands Scaled" },
  { prefix: "", value: 11, suffix: "+", label: "Growth Channels" },
];

function useCountUp(target, duration = 1600, start = false, startVal = 0, decimals = 0) {
  const [count, setCount] = useState(startVal);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startVal + (target - startVal) * progress;
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, startVal, decimals]);
  return count;
}

function StatItem({ stat, started, divider }) {
  const count = useCountUp(stat.value, 1800, started, stat.start || 0, stat.decimals || 0);

  const display = `${stat.prefix}${count}${stat.suffix}`;

  return (
    <div className={`flex flex-col items-center px-6 ${divider ? "border-l border-gray-200" : ""}`}>
      <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-none">
        {display}
      </p>
      <p className="text-xs text-[#525252] font-semibold mt-2 uppercase tracking-wider">{stat.label}</p>
    </div>
  );
}

function CashBurst() {
  return null;
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  const handleMagneticMove = (e) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 180;
    if (dist < maxDist) {
      const pull = (1 - dist / maxDist) * 0.5;
      btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
    } else {
      btn.style.transform = "";
    }
  };

  const handleMagneticLeave = () => {
    if (ctaRef.current) ctaRef.current.style.transform = "";
  };

  useEffect(() => {
    const word = ROTATING[index];
    let timeout;

    if (!isDeleting && displayText === word) {
      timeout = setTimeout(() => setIsDeleting(true), 1900);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % ROTATING.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? word.substring(0, prev.length - 1) : word.substring(0, prev.length + 1)
        );
      }, isDeleting ? 30 : 60);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const isScale = displayText === "Scale.";

  return (
    <section className="hero-gradient min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-40 sm:pt-48 pb-20 relative overflow-hidden">
      <ConstellationGrid className="pointer-events-none opacity-[0.6]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Static headline */}
        <motion.h1
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-bold text-[#2d2d2d] leading-[1.05] tracking-tight mb-0 font-body"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Growth Partner,
        </motion.h1>
        <motion.h1
          className="text-[clamp(2.4rem,6.5vw,5rem)] font-bold text-[#2d2d2d] leading-[1.05] tracking-tight mb-2 font-body"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Built to Help Brands
        </motion.h1>

        {/* Rotating word + cash burst */}
        <div className="relative">
          <CashBurst active={isScale} />
          <div           className="text-[clamp(1.8rem,5vw,4rem)] font-bold text-[#2d2d2d] leading-[1.15] tracking-tight mb-8 h-[1.4em] flex items-center justify-center overflow-visible font-body" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            <span className="block">
              {displayText}
              <span className="inline-block w-[3px] h-[0.8em] bg-[#2d2d2d] ml-1 align-middle animate-pulse" />
            </span>
          </div>
        </div>

        {/* Subtitle with highlighted tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[#525252] text-lg max-w-xl leading-relaxed mb-10 font-medium"
        >
          Like couples therapy for your ads, website, attribution, and analytics. Plait uses{' '}
          <span className="italic font-semibold text-indigo-600">
            Battle Tested Marketing, Enhanced by AI.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <LiquidButton size="xl" className="bg-white/30 text-[#2d2d2d] font-semibold" onClick={() => navigate("/services")}>
              What We Do
            </LiquidButton>
            <ShinyButton onClick={() => navigate("/book")}>
              Book a Free Audit
              <span className="w-5 h-5 sm:w-7 sm:h-7 bg-white/20 rounded-full inline-flex items-center justify-center ml-2 align-middle text-xs sm:text-sm">→</span>
            </ShinyButton>
          </div>
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