import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Luke doesn't just run ads — he owns the whole problem. CAC down 90%, acquisition finally makes sense at our margins.",
    name: "Jordan M.",
    role: "Founder, Extern",
  },
  {
    quote: "We went from invisible to 30 million impressions on a campaign nobody expected to work. Luke found the angle everyone else missed.",
    name: "Sarah T.",
    role: "Marketing Lead, Airia",
  },
  {
    quote: "Ivy's active user count jumped 345% in a quarter. I've worked with a lot of agencies. This is what an actual growth partner feels like.",
    name: "Chris L.",
    role: "CEO, Ivy Dating",
  },
  {
    quote: "CPA dropped 70% in the first 60 days. Luke audited what we were doing, rebuilt the offer architecture, and the numbers followed.",
    name: "Marcus W.",
    role: "Founder, HG Training",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#4F46E5] uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
            Don't take my word for it.
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-[#F8F7FF] rounded-3xl p-10 md:p-14 border border-indigo-100"
            >
              <p className="text-xl md:text-2xl text-[#0A0A0A] font-medium leading-relaxed mb-8 max-w-3xl">
                "{testimonials[current].quote}"
              </p>
              <div>
                <p className="font-bold text-[#0A0A0A] text-sm">{testimonials[current].name}</p>
                <p className="text-xs text-[#525252]">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 ml-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-[#4F46E5]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}