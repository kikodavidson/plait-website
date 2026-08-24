"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AnimatedTextRoller({
  words = [],
  interval = 2500,
  className = "",
  lineClassName = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <div className={cn("overflow-hidden h-[1.1em] leading-[1.1]", className)}>
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${index * 1.1}em)` }}
      >
        {words.map((w, i) => (
          <p
            key={i}
            className={cn("h-[1.1em] leading-[1.1] flex items-center whitespace-nowrap", lineClassName)}
          >
            {w}
          </p>
        ))}
      </div>
    </div>
  );
}