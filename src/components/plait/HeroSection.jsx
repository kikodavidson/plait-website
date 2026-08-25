import React from "react";
import { useNavigate } from "react-router-dom";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import ShinyButton from "@/components/ui/shiny-button";
import ConstellationGrid from "@/components/ui/constellation-grid";
import { motion } from "framer-motion";
import HeroMediaCard from "@/components/plait/HeroMediaCard";
import AnimatedTextRoller from "@/components/ui/animated-text-roller";

const ROTATING = [
"Scale.",
"Convert More Customers.",
"Attract Attention.",
"Attribute Sales.",
"Improve Performance.",
"Maximize Clicks."];


export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-gradient min-h-[92vh] flex flex-col items-start justify-center text-left px-6 pt-40 sm:pt-48 pb-20 relative overflow-hidden">
      <ConstellationGrid className="pointer-events-none opacity-[0.6]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:pl-16 lg:pr-8 opacity-100">
        <div className="flex flex-col items-start">
          {/* Static headline — continuous printed-ink gradient across all lines */}
          <motion.h1
            className="hero-headline text-[clamp(2rem,5.2vw,3.8rem)] leading-[0.95] tracking-[-0.03em] mb-0 uppercase font-normal [font-family:'Benzin',_sans-serif]"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            
            Your Growth
            <br />
            Partner,
            <br />
            Built to Help
            <br />
            Brands
          </motion.h1>

          {/* Rotating word — rolls upward */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2"
            style={{ fontFamily: "Inter, sans-serif" }}>
            
            <AnimatedTextRoller
              words={ROTATING}
              interval={2500}
              heightRem={3}
              lineClassName="hero-headline text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-[-0.02em]" />
            
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-black text-lg max-w-xl leading-relaxed mt-10 mb-10 font-medium">
            
            Like couples therapy for your ads, website, attribution, and analytics. Plait uses{" "}
            <span className="italic font-semibold text-indigo-600">
              Battle Tested Marketing, Enhanced by AI.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            
            <LiquidButton
              size="xl"
              className="bg-white/30 text-[#2d2d2d] font-semibold"
              onClick={() => navigate("/services")}>
              
              What We Do
            </LiquidButton>
            <ShinyButton onClick={() => navigate("/book")}>
              Book a Free Audit
              <span className="w-5 h-5 sm:w-7 sm:h-7 bg-white/20 rounded-full inline-flex items-center justify-center ml-2 align-middle text-xs sm:text-sm">
                →
              </span>
            </ShinyButton>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end mt-12 lg:mt-0">
          <HeroMediaCard />
        </div>
      </div>
    </section>);

}