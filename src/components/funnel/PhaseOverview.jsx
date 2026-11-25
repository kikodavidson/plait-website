import React from "react";
import { PHASES } from "@/lib/funnelPlan";

export default function PhaseOverview() {
  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-white p-4 sm:p-6">
      <ul className="divide-y divide-[#efece8]">
        {PHASES.map((phase) => (
          <li key={phase.key} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5f1] text-[12px] font-extrabold text-[#3d6b52]">
              {phase.number}
            </span>
            <p className="text-[15px] font-extrabold leading-tight text-[#1a1a1a] sm:text-base">{phase.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}