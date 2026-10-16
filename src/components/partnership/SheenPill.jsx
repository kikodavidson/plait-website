import React from "react";
import { cn } from "@/lib/utils";

/** Small status pill carrying the SheenPillButton design: a glassy rounded
 *  pill with a diagonal light band, inset highlights, and a soft inner rim.
 *  `tint` sets the translucent background wash, `text` the label color. */
export default function SheenPill({ tint, text, className, children }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1 overflow-hidden rounded-full border border-[rgba(51,51,51,0.08)] px-3 py-1 text-[12px] font-semibold whitespace-nowrap backdrop-blur-[5px]",
        "[box-shadow:inset_1px_-1px_1px_-1px_rgba(255,255,255,0.9),inset_-1px_1px_1px_-1px_rgba(255,255,255,0.9),inset_0_0_2px_rgba(0,0,0,0.35)]",
        className
      )}
      style={{ backgroundColor: tint || "rgba(255,255,255,0.08)", color: text || "#3e3e3e" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-80 blur-[3px]"
        style={{
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.8) 0%, transparent 15%, transparent 85%, rgba(255,255,255,0.8) 100%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2.5px] rounded-full border border-[rgba(255,255,255,0.2)]"
      />
      <span className="relative">{children}</span>
    </span>
  );
}