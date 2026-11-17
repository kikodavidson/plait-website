import React from "react";
import { ACCENT } from "@/lib/funnelPlan";

export default function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#eeece7]">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: ACCENT }}
      />
    </div>
  );
}