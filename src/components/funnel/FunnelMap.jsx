import React from "react";
import { ACCENT, STEPS } from "@/lib/funnelPlan";

export default function FunnelMap({ tasks, selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {STEPS.map((step, i) => {
        const linked = tasks.filter((t) => t.funnel_step === step.key).length;
        const active = selected === step.key;
        return (
          <button
            key={step.key}
            onClick={() => onSelect(step.key)}
            className={`rounded-xl border p-3 text-left transition-colors ${
              active
                ? "border-transparent text-white"
                : "border-[#e5e2dc] bg-white hover:border-[#619e80]"
            }`}
            style={active ? { backgroundColor: ACCENT } : undefined}
          >
            <span className={`text-[10px] font-extrabold tracking-[0.2em] ${active ? "text-white/70" : "text-[#9a9a9a]"}`}>
              0{i + 1}
            </span>
            <p className={`mt-1 text-[13px] font-extrabold leading-tight ${active ? "text-white" : "text-[#1a1a1a]"}`}>
              {step.label}
            </p>
            <p className={`mt-1 text-[10px] ${active ? "text-white/70" : "text-[#9a9a9a]"}`}>
              {linked} {linked === 1 ? "task" : "tasks"}
            </p>
          </button>
        );
      })}
    </div>
  );
}