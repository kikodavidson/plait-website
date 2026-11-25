import React from "react";

export default function ProgressBar({ value, step, total }) {
  const pct = Math.min(100, Math.max(0, (value / total) * 100));
  return (
    <div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#efece8]">
        <div
          className="h-full rounded-full bg-[#619e80] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">
        Step {step} of {total}
      </p>
    </div>
  );
}