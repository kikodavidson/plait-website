import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ExampleCard from "./ExampleCard";

export default function BlockSection({ block, examples, accent = "#2d2d2d" }) {
  const [open, setOpen] = useState(false);
  const blockExamples = examples.filter((e) => e.block_id === block.id);

  return (
    <div className="rounded-lg bg-[#FAF7F1] border border-[#EFE8DB]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-baseline gap-2 text-left px-3 py-3 hover:bg-[#F5F1E9] rounded-lg transition-colors"
      >
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 self-center transition-transform ${open ? "" : "-rotate-90"}`} style={{ color: open ? accent : "#8C8480" }} />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[#2B2B2B]">{block.content_type}</h3>
        {block.quantity ? <span className="text-xs text-[#8C8480]">×{block.quantity}</span> : null}
        <span className="text-xs text-[#8C8480] ml-auto">{blockExamples.length} example{blockExamples.length === 1 ? "" : "s"}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 pl-8">
          {block.direction && <p className="text-sm text-[#6B6258] leading-relaxed mb-3">{block.direction}</p>}
          {blockExamples.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {blockExamples.map((ex) => (
                <ExampleCard key={ex.id} ex={ex} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8C8480]">No examples attached.</p>
          )}
        </div>
      )}
    </div>
  );
}