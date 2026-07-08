import React from "react";
import { motion } from "framer-motion";

const services = [
  { num: "01", label: "Paid Media" },
  { num: "02", label: "Attribution & Analytics" },
  { num: "03", label: "Websites & CRO" },
  { num: "04", label: "Creative & Messaging" },
  { num: "05", label: "Copywriting" },
  { num: "06", label: "Strategy & Network" },
];

export default function ServicesBanner() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#2d2d2d] rounded-[2rem] px-8 py-10 sm:px-12 sm:py-12"
      >
        <p className="text-[10px] sm:text-xs font-bold text-[#808080] uppercase tracking-[0.2em] mb-8 sm:mb-10">
          Our Services
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8">
          {services.map((s) => (
            <div key={s.num} className="flex flex-col">
              <span className="text-[#A2A2E0] text-3xl sm:text-4xl font-bold mb-2 font-body tracking-tight">
                {s.num}
              </span>
              <span className="text-white text-sm font-semibold leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}