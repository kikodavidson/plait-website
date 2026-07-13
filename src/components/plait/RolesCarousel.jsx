import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const ROLES = [
  "Paid Media Manager",
  "Creative Strategist",
  "CRO Specialist",
  "Web Designer / Landing Page Developer",
  "Growth Marketing Manager",
  "Marketing Analytics Manager",
  "Email Marketing Manager",
  "Copywriter",
];

const N = ROLES.length;

function rotateIndex(i, delta) {
  return (i + delta + N) % N;
}

export default function RolesCarousel() {
  const [center, setCenter] = useState(0);
  const [rotation, setRotation] = useState(0);

  const goTo = (newCenter) => {
    const diff = newCenter - center;
    // shortest path
    const shortest = ((diff % N) + N) % N;
    const forward = shortest <= N / 2;
    const steps = forward ? shortest : N - shortest;
    const dir = forward ? -1 : 1;
    setCenter(newCenter);
    setRotation((r) => r + dir * steps * (360 / N));
  };

  const next = () => goTo(rotateIndex(center, 1));
  const prev = () => goTo(rotateIndex(center, -1));

  // Only front-facing cards: center + 1 on each side
  const offsets = [-1, 0, 1];

  return (
    <section className="py-28 px-6 border-t border-gray-100/50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#525252]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#525252]">Your extended team</span>
          </div>
          <h2
            className="font-body text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] tracking-tight leading-tight mb-4"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
          >
            The roles you're adding<br />to your team.
          </h2>
          <p className="text-[#525252] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            When you work with us, you're not just getting an agency, you're filling eight specialized seats that would otherwise cost a fortune to hire in house.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative h-[320px] flex items-center justify-center">
          <div style={{ perspective: "1200px", perspectiveOrigin: "center center" }}>
            <motion.div
              animate={{ rotateY: rotation }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {offsets.map((offset) => {
                const roleIndex = rotateIndex(center, offset);
                const isCenter = offset === 0;
                const angle = (360 / N) * offset;
                const radius = 280;

                return (
                  <div
                    key={offset}
                    className="absolute"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformOrigin: "center center",
                      left: "-110px",
                      top: "-65px",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className={`flex items-center justify-center text-center px-6 transition-all duration-300 ${
                        isCenter
                          ? "bg-white shadow-2xl border border-gray-100 w-[220px] h-[130px] rounded-2xl"
                          : "bg-white shadow-lg border border-gray-100 w-[170px] h-[100px] rounded-xl opacity-80"
                      }`}
                    >
                      <span
                        className={`font-bold leading-tight ${
                          isCenter ? "text-[#2d2d2d] text-lg sm:text-xl" : "text-[#525252] text-sm"
                        }`}
                        style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                      >
                        {ROLES[roleIndex]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors"
            aria-label="Previous role"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors"
            aria-label="Next role"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Dot indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {ROLES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === center ? "bg-[#2d2d2d] w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to role ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}