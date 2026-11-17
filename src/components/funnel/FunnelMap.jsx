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
            className={`rounded-2xl border p-3 text-left transition-colors ${
              active ? "border-[#C8FF3D]" : "border-[#26262A] bg-[#141416] hover:border-[#4A4C46]"
            }`}
            style={active ? { backgroundColor: ACCENT } : undefined}
          >
            <span
              className={`text-[10px] font-extrabold tracking-[0.2em] ${active ? "text-black/60" : "text-[#5A5C55]"}`}
            >
              0{i + 1}
            </span>
            <p className={`mt-1 text-[13px] font-extrabold leading-tight ${active ? "text-black" : "text-white"}`}>
              {step.label}
            </p>
            <p className={`mt-1 text-[10px] ${active ? "text-black/60" : "text-[#8E9089]"}`}>
              {linked} {linked === 1 ? "task" : "tasks"}
            </p>
          </button>
        );
      })}
    </div>
  );
}