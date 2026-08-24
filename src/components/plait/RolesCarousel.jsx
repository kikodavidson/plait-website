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
const ANGLE = 360 / N; // degrees between each card
const RADIUS = 420; // px — how wide the cylinder is

export default function RolesCarousel() {
  const [active, setActive] = useState(0);

  const goTo = (i) => setActive(((i % N) + N) % N);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // Rotate the ring so the active card faces front.
  // Negative because we rotate the ring opposite to the card's position.
  const ringRotation = -active * ANGLE;

  return (
    <section className="py-28 px-6 overflow-hidden">
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
        </motion.div>

        {/* Mobile: single contained card */}
        <div className="sm:hidden flex justify-center">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-xl border border-gray-100 rounded-2xl w-full max-w-[300px] h-[150px] flex items-center justify-center text-center px-6 mx-8"
          >
            <span
              className="leading-tight font-bold text-[#2d2d2d] text-lg"
              style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
            >
              {ROLES[active]}
            </span>
          </motion.div>
        </div>

        {/* Desktop: cylinder carousel */}
        <div className="hidden sm:flex relative h-[280px] items-center justify-center" style={{ perspective: "1400px" }}>
          <motion.div
            className="relative"
            style={{ transformStyle: "preserve-3d", width: 0, height: 0 }}
            animate={{ rotateY: ringRotation }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {ROLES.map((role, i) => {
              const cardAngle = i * ANGLE;
              const isActive = i === active;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${RADIUS}px)`,
                    transformStyle: "preserve-3d",
                    marginLeft: "-140px",
                    marginTop: "-80px",
                    top: "50%",
                    left: "50%",
                  }}
                >
                  <div
                    className={`rounded-2xl border flex items-center justify-center text-center px-6 transition-shadow duration-300 ${
                      isActive
                        ? "bg-white shadow-2xl border-gray-100 w-[280px] h-[160px]"
                        : "bg-white shadow-lg border-gray-100 w-[280px] h-[160px]"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <span
                      className={`leading-tight font-bold ${
                        isActive ? "text-[#2d2d2d] text-xl" : "text-[#525252] text-lg"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation arrows + dots */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors"
            aria-label="Previous role"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="flex items-center gap-2">
            {ROLES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "bg-[#2d2d2d] w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to role ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-colors"
            aria-label="Next role"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}