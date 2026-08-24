import React from "react";
import { motion } from "framer-motion";
import FeatureCarousel from "@/components/ui/feature-carousel";

export default function WhatYouGet() {
  return (
    <section className="py-28 px-6 border-t border-gray-100/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-3">What You Receive</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-[1.4] sm:leading-[1.1] mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Turn{" "}
            <span className="relative inline-block pb-2" style={{ WebkitTextFillColor: '#2d2d2d' }}>
              generated attention
              <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8.5 C40 3, 80 10, 120 6 C160 2, 200 9, 240 5.5 C270 3, 290 7, 298 6"
                  stroke="#2d2d2d"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ filter: 'url(#pencil)' }}
                />
                <filter id="pencil">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </svg>
            </span>
            <br />into revenue.
          </h2>
          <p className="text-[#525252] text-base leading-relaxed">
            Not just ads. A complete system — from first click to closed sale — with the infrastructure to actually measure what's working.
          </p>
        </motion.div>

        <FeatureCarousel />
      </div>
    </section>
  );
}