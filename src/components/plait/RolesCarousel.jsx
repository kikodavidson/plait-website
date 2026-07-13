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
  const [direction, setDirection] = useState(0);

  const goTo = (newCenter) => {
    const diff = newCenter - center;
    const shortest = ((diff % N) + N) % N;
    const forward = shortest <= N / 2;
    setDirection(forward ? 1 : -1);
    setCenter(newCenter);
  };

  const next = () => goTo(rotateIndex(center, 1));
  const prev = () => goTo(rotateIndex(center, -1));

  const prevRole = rotateIndex(center, -1);
  const nextRole = rotateIndex(center, 1);

  const slide = {
    initial: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

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

        {/* Coverflow Carousel */}
        <div className="relative h-[260px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          <motion.div
            key={center}
            custom={direction}
            variants={slide}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex items-center justify-center w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Left side card */}
            <div
              className="absolute"
              style={{ transform: "translateX(-190px) rotateY(35deg)", zIndex: 1 }}
            >
              <div className="bg-white shadow-lg border border-gray-100 w-[180px] h-[110px] rounded-xl flex items-center justify-center text-center px-4">
                <span
                  className="text-[#525252] text-sm font-bold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                >
                  {ROLES[prevRole]}
                </span>
              </div>
            </div>

            {/* Center card */}
            <div className="relative z-10">
              <div className="bg-white shadow-2xl border border-gray-100 w-[280px] h-[160px] rounded-2xl flex items-center justify-center text-center px-6">
                <span
                  className="text-[#2d2d2d] text-xl font-bold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                >
                  {ROLES[center]}
                </span>
              </div>
            </div>

            {/* Right side card */}
            <div
              className="absolute"
              style={{ transform: "translateX(190px) rotateY(-35deg)", zIndex: 1 }}
            >
              <div className="bg-white shadow-lg border border-gray-100 w-[180px] h-[110px] rounded-xl flex items-center justify-center text-center px-4">
                <span
                  className="text-[#525252] text-sm font-bold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                >
                  {ROLES[nextRole]}
                </span>
              </div>
            </div>
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
                  i === center ? "bg-[#2d2d2d] w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
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