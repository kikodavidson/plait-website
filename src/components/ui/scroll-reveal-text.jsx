"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ScrollRevealText({
  text,
  className = "",
  wordClassName = "",
  activeColor = "#2d2d2d",
  startOffset = "0.9",
  endOffset = "0.25",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startOffset}`, `start ${endOffset}`],
  });
  const [reveal, setReveal] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReveal(v));

  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((w, i) => {
        const span = 1 / words.length;
        const threshold = i * span;
        const r = Math.max(0, Math.min(1, (reveal - threshold) / span));
        const opacity = 0.2 + 0.8 * r;
        return (
          <span key={i} className={cn(wordClassName)} style={{ color: activeColor, opacity }}>
            {w}{" "}
          </span>
        );
      })}
    </span>
  );
}