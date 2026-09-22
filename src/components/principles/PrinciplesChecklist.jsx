import React, { useState } from "react";

export default function PrinciplesChecklist({ items, storageKey }) {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return items.map((_, i) => saved.includes(i));
    } catch {
      return items.map(() => false);
    }
  });

  const toggle = (i) => {
    setChecked((prev) => {
      const next = prev.map((v, idx) => (idx === i ? !v : v));
      try {
        const on = next.flatMap((v, idx) => (v ? [idx] : []));
        localStorage.setItem(storageKey, JSON.stringify(on));
      } catch {}
      return next;
    });
  };

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => toggle(i)}
            className="flex w-full items-start gap-3 rounded-lg border border-[#e7e2da] bg-white px-4 py-3 text-left transition-colors hover:border-[#c9c0b2]"
          >
            <span
              className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border ${
                checked[i]
                  ? "border-[#2d2d2d] bg-[#2d2d2d] text-white"
                  : "border-[#c9c0b2] bg-white"
              }`}
            >
              {checked[i] && (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                  <path
                    d="M2 6.5 4.8 9.2 10 3.4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`text-[15px] leading-[1.7] ${
                checked[i] ? "text-[#8a8a8a] line-through" : "text-[#1a1a1a]"
              }`}
            >
              {item}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}