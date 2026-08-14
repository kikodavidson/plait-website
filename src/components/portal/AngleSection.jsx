import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlockSection from "./BlockSection";

const TYPE_BADGE = { audience: "Audience", concept: "Concept" };

export default function AngleSection({ angle, blocks, examples, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const angleBlocks = blocks.filter((b) => b.angle_id === angle.id);

  return (
    <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 text-left px-6 py-5 hover:bg-gray-50 transition-colors"
      >
        <ChevronDown className={`w-4 h-4 text-[#777777] shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <h2 className="text-lg font-bold text-[#222222] truncate">{angle.label}</h2>
          {angle.type && (
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${angle.type === "audience" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
              {TYPE_BADGE[angle.type] || angle.type}
            </span>
          )}
          <span className="text-xs text-[#777777]">{angleBlocks.length} block{angleBlocks.length === 1 ? "" : "s"}</span>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 pl-14">
          {angle.description && <p className="text-sm text-[#777777] leading-relaxed">{angle.description}</p>}
          {angle.insight && <p className="text-sm text-[#777777] mt-2 italic leading-relaxed">{angle.insight}</p>}
          {angleBlocks.length > 0 && (
            <div className="mt-4 space-y-2 border-l border-gray-100 pl-4">
              {angleBlocks.map((b) => (
                <BlockSection key={b.id} block={b} examples={examples} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}