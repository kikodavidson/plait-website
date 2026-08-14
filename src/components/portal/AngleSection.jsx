import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlockSection from "./BlockSection";

const TYPE_BADGE = { audience: "Audience", concept: "Concept" };

export default function AngleSection({ angle, blocks, examples, defaultOpen = false, accent = "#2d2d2d" }) {
  const [open, setOpen] = useState(defaultOpen);
  const angleBlocks = blocks.filter((b) => b.angle_id === angle.id);

  return (
    <section className="bg-white rounded-2xl border border-[#E9E2D6] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 text-left px-5 sm:px-6 py-5 hover:bg-[#FAF7F1] transition-colors"
      >
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} style={{ color: open ? accent : "#8C8480" }} />
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <h2 className="text-base font-semibold text-[#2B2B2B] truncate">{angle.label}</h2>
          {angle.type && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ backgroundColor: accent, color: "#fff" }}
            >
              {TYPE_BADGE[angle.type] || angle.type}
            </span>
          )}
        </div>
        <span className="text-xs text-[#8C8480] shrink-0">{angleBlocks.length} block{angleBlocks.length === 1 ? "" : "s"}</span>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-6 pl-12 sm:pl-14">
          {angle.description && <p className="text-sm text-[#6B6258] leading-relaxed">{angle.description}</p>}
          {angle.insight && <p className="text-sm text-[#6B6258] mt-2 italic leading-relaxed">{angle.insight}</p>}
          {angleBlocks.length > 0 && (
            <div className="mt-4 space-y-2 border-l border-[#E9E2D6] pl-4">
              {angleBlocks.map((b) => (
                <BlockSection key={b.id} block={b} examples={examples} accent={accent} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}