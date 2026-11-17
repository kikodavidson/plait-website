import React from "react";
import { CORE_BENEFITS } from "@/lib/funnelPlan";

export default function CoreBenefitCards({ features, active, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {CORE_BENEFITS.map((benefit, i) => {
        const count = features.filter((f) => f.core_benefit === benefit).length;
        const isActive = active === benefit;
        return (
          <button
            key={benefit}
            onClick={() => onSelect(benefit)}
            className={`rounded-2xl border p-3 text-left transition-colors ${
              isActive ? "border-[#619e80] bg-[#f2f7f4]" : "border-[#e5e2dc] bg-white hover:border-[#619e80]"
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#619e80]">
                Core {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  isActive ? "bg-[#619e80] text-white" : "border border-[#e5e2dc] text-[#6b6b6b]"
                }`}
              >
                {count}
              </span>
            </span>
            <p className="mt-2 text-[13px] font-bold leading-snug text-[#1a1a1a]">{benefit}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#9a9a9a]">
              {count === 1 ? "1 service row" : `${count} service rows`}
            </p>
          </button>
        );
      })}
    </div>
  );
}