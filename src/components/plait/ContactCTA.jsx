import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function ContactCTA() {
  const navigate = useNavigate();
  return (
    <section className="section-gradient py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <p className="text-xs font-bold text-[#2d2d2d] uppercase tracking-widest mb-4">Not Sure What You Need?</p>
            <h2 className="font-body text-4xl sm:text-5xl font-bold text-[#2d2d2d] tracking-tight mb-6">That's normal.</h2>
            <p className="text-[#525252] leading-relaxed mb-4">
              Most clients don't come to us asking for a new attribution model, a landing page rebuild, or a creative testing framework.
            </p>
            <p className="text-[#525252] leading-relaxed mb-4">
              They come because something feels off. Performance has stalled. Costs are rising. Revenue isn't matching effort.
            </p>
            <p className="text-[#525252] leading-relaxed font-medium">
              We help figure out why.
            </p>
          </div>
          <div className="bg-[#2d2d2d] rounded-3xl p-10 flex flex-col gap-6">
            <h3 className="font-body text-3xl font-bold text-[#f4f2ee] leading-tight">Let's find the missing piece.</h3>
            <p className="text-[#f4f2ee]/60 leading-relaxed text-sm">
              If your marketing feels disconnected, inefficient, or harder than it should be, there's usually a reason. Let's find it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <LiquidButton size="lg" onClick={() => navigate("/book")}>
                Pull The Thread
              </LiquidButton>
              <LiquidButton size="lg" onClick={() => navigate("/case-studies")}>
                View Our Work
              </LiquidButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}