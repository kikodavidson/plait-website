import React from "react";
import { Check } from "lucide-react";
import { PHASES, phaseDone } from "./vibeMeta";

/** Horizontal 6-phase tracker: complete, current, or grayed out with its unlock label. */
export default function VibeTracker({ phases, selectedIndex, current, onSelect }) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {PHASES.map((p, i) => {
        const record = phases[i];
        const done = phaseDone(record);
        const unlocked = phases.slice(0, i).every(phaseDone);
        const active = i === selectedIndex;
        return (
          <button
            key={p.key}
            onClick={() => unlocked && onSelect(i)}
            disabled={!unlocked}
            className={`flex min-w-[124px] flex-1 flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition-colors ${
              !unlocked
                ? "cursor-not-allowed border-[#f0eeea] bg-[#faf9f7] opacity-60"
                : active
                  ? "border-[#619e80] bg-[#eef5f1]"
                  : "border-[#e5e2dc] bg-white hover:border-[#c9c2b6]"
            }`}
          >
            <span
              className={`flex items-center gap-1.5 text-[13.5px] font-semibold ${
                active ? "text-[#3d6b52]" : "text-[#1a1a1a]"
              }`}
            >
              {done ? (
                <Check className="h-4 w-4 shrink-0 text-[#619e80]" strokeWidth={3} />
              ) : (
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    unlocked ? "border-[#c9c2b6] text-[#6b6b6b]" : "border-[#e0dcd4] text-[#b0aca4]"
                  }`}
                >
                  {i + 1}
                </span>
              )}
              {p.label}
            </span>
            {!unlocked ? (
              <span className="text-[11px] text-[#9a9a9a]">Unlocks after {PHASES[i - 1].label}</span>
            ) : i === current ? (
              <span className="text-[11px] font-semibold text-[#619e80]">Current phase</span>
            ) : (
              <span className="text-[11px] text-[#9a9a9a]">{done ? "Complete" : "Open"}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}