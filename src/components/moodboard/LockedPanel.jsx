import React from "react";
import { Lock } from "lucide-react";
import { LEVELS } from "@/lib/moodBoardConfig";

/** Locked Decisions: references both partners voted Love. */
export default function LockedPanel({ items, tab }) {
  return (
    <div className="mt-10 rounded-xl border border-[#e5e2dc] bg-[#f7f5f2] p-5">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-[#00854a]" />
        <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Locked Decisions</h3>
        <span className="text-[12px] text-[#8a857c]">
          ({tab === "all" ? "all levels" : LEVELS[tab].label}) · {items.length} locked
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-2 text-[13px] text-[#8a857c]">
          Nothing locked yet — a reference locks automatically when both partners vote Love.
        </p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-3">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex w-64 items-center gap-3 rounded-lg border border-[#e5e2dc] bg-white p-2.5"
            >
              <img src={i.image_url} alt="" className="h-11 w-14 shrink-0 rounded-md object-cover" loading="lazy" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-[#8a857c]">
                  {tab === "all" ? `${LEVELS[i.level]?.label || i.level} · ` : ""}
                  {i.sub_section}
                </p>
                <p className="truncate text-[12.5px] text-[#1a1a1a]">{i.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}