import React from "react";
import { Pin } from "lucide-react";
import { ACCENT, RULES } from "@/lib/funnelPlan";

export default function RulesCard() {
  return (
    <div className="rounded-3xl border p-6 sm:p-8" style={{ borderColor: ACCENT, backgroundColor: "#101208" }}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
          Pinned
        </p>
        <Pin className="h-4 w-4" style={{ color: ACCENT }} />
      </div>

      <ol className="mt-5 space-y-5">
        {RULES.map((rule, i) => (
          <li key={rule} className="flex gap-4">
            <span className="pt-1 text-[11px] font-extrabold tracking-[0.12em]" style={{ color: ACCENT }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[18px] font-extrabold leading-snug text-white sm:text-[22px]">{rule}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}