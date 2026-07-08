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
        className="bg-[#2d2d2d] rounded-3xl px-8 py-10"
      >
        <p className="text-xs font-bold text-[#f4f2ee]/40 uppercase tracking-widest mb-6">Our Services</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((s) => (
            <div key={s.num} className="flex flex-col">
              <span className="text-[#aeb8ee] text-2xl font-bold mb-1 font-body">{s.num}</span>
              <span className="text-[#f4f2ee] text-sm font-semibold leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}