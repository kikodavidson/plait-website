import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import ShinyButton from "@/components/ui/shiny-button";
import ConstellationGrid from "@/components/ui/constellation-grid";
import { TextEffect } from "@/components/ui/text-effect";
import { motion, AnimatePresence } from "framer-motion";
import HeroMediaCard from "@/components/plait/HeroMediaCard";

const ROTATING = [
  "Scale.",
  "Convert More Customers.",
  "Attract Attention.",
  "Attribute Sales.",
  "Improve Performance.",
  "Maximize Clicks.",
];

function CashBurst() {
  return null;
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);
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
    const t1 = setTimeout(() => setTrigger(false), 2000);
    const t2 = setTimeout(() => {
      setIndex((i) => (i + 1) % ROTATING.length);
      setTrigger(true);
    }, 2550);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [index]);

  return (
    <section className="hero-gradient min-h-[92vh] flex flex-col items-start justify-center text-left px-6 pt-40 sm:pt-48 pb-20 relative overflow-hidden">
      <ConstellationGrid className="pointer-events-none opacity-[0.6]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col items-start">
        {/* Static headline */}
        <motion.h1
          className="hero-headline text-[clamp(2rem,5.2vw,3.8rem)] font-black leading-[0.98] tracking-[-0.03em] mb-0 font-body uppercase"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Growth Partner,
        </motion.h1>
        <motion.h1
          className="hero-headline text-[clamp(2rem,5.2vw,3.8rem)] font-black leading-[0.98] tracking-[-0.03em] mb-2 font-body uppercase"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Built to Help Brands
        </motion.h1>

        {/* Rotating word */}
        <div className="relative">
          <div className="text-[clamp(1.8rem,5vw,4rem)] font-bold text-[#2d2d2d] leading-[1.15] tracking-tight mb-8 h-[1.4em] flex items-center justify-start overflow-visible font-body" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            <TextEffect per="line" preset="fade" as="span" trigger={trigger} className="inline-block text-[#2d2d2d]">
              {ROTATING[index]}
            </TextEffect>
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
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <LiquidButton size="xl" className="bg-white/30 text-[#2d2d2d] font-semibold" onClick={() => navigate("/services")}>
              What We Do
            </LiquidButton>
            <ShinyButton onClick={() => navigate("/book")}>
              Book a Free Audit
              <span className="w-5 h-5 sm:w-7 sm:h-7 bg-white/20 rounded-full inline-flex items-center justify-center ml-2 align-middle text-xs sm:text-sm">→</span>
            </ShinyButton>
          </div>
        </motion.div>
      </div>

        <div className="flex justify-center lg:justify-end mt-12 lg:mt-0">
          <HeroMediaCard />
        </div>
      </div>
    </section>
  );
}