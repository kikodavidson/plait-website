import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import BlockSection from "./BlockSection";

const TYPE_BADGE = { audience: "Audience", concept: "Concept" };

export default function AngleSection({ angle, blocks, examples, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const angleBlocks = blocks.filter((b) => b.angle_id === angle.id);

  return (
    <section className="bg-[#141416] border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 text-left px-6 py-5 hover:bg-white/5 transition-colors"
      >
        <ChevronDown className={`w-4 h-4 text-white/50 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="text-base font-bold text-white truncate">{angle.label}</h2>
          {angle.type && (
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${angle.type === "audience" ? "bg-blue-500/15 text-blue-300" : "bg-purple-500/15 text-purple-300"}`}>
              {TYPE_BADGE[angle.type] || angle.type}
            </span>
          )}
        </div>
        <span className="text-xs text-white/50 shrink-0">{angleBlocks.length} block{angleBlocks.length === 1 ? "" : "s"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 pl-14">
          {angle.description && <p className="text-sm text-white/60 leading-relaxed">{angle.description}</p>}
          {angle.insight && <p className="text-sm text-white/60 mt-2 italic leading-relaxed">{angle.insight}</p>}
          {angleBlocks.length > 0 && (
            <div className="mt-4 space-y-2 border-l border-white/10 pl-4">
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