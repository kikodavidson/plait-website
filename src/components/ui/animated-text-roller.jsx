"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AnimatedTextRoller({
  words = [],
  interval = 2000,
  heightRem = 2,
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
    <div
      className={cn("overflow-hidden text-left", className)}
      style={{ height: `${heightRem}rem` }}
    >
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${index * heightRem}rem)` }}
      >
        {words.map((w, i) => (
          <p
            key={i}
            className={cn("flex items-center justify-start whitespace-nowrap", lineClassName)}
            style={{ height: `${heightRem}rem` }}
          >
            {w}
          </p>
        ))}
      </div>
    </div>
  );
}