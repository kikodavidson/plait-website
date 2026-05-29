import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const FULL_QUOTE = `"Success is neither magical or mysterious. Success is the natural consequence of consistently applying basic fundamentals."`;
const ATTRIBUTION = "— Jim Rohn";

export default function QuoteSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(FULL_QUOTE.slice(0, i));
        if (i >= FULL_QUOTE.length) clearInterval(interval);
      }, 22);
      return () => clearInterval(interval);
    }
  }, [inView, started]);

  return (
    <section ref={ref} className="py-28 px-6 bg-[#F8F7FF] border-t border-indigo-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Philosophy
        </motion.p>

        <div
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-[1.3] tracking-tight mb-8 min-h-[8rem] flex items-center justify-center"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <span>
            {displayed}
            {displayed.length < FULL_QUOTE.length && started && (
              <span className="inline-block w-0.5 h-8 bg-[#4F46E5] ml-1 animate-pulse align-middle" />
            )}
          </span>
        </div>

        <motion.p
          className="text-[#525252] font-semibold text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: displayed.length === FULL_QUOTE.length ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {ATTRIBUTION}
        </motion.p>
      </div>
    </section>
  );
}