import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ExampleCard from "./ExampleCard";

export default function BlockSection({ block, examples }) {
  const [open, setOpen] = useState(false);
  const blockExamples = examples.filter((e) => e.block_id === block.id);

  return (
    <div className="rounded-lg bg-gray-50/70">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-baseline gap-2 text-left px-3 py-2.5 hover:bg-gray-100/60 rounded-lg transition-colors"
      >
        <ChevronDown className={`w-3.5 h-3.5 text-[#777777] shrink-0 self-center transition-transform ${open ? "" : "-rotate-90"}`} />
        <h3 className="text-xs font-bold uppercase tracking-wide text-[#222222]">{block.content_type}</h3>
        {block.quantity ? <span className="text-xs text-[#777777]">×{block.quantity}</span> : null}
        <span className="text-xs text-[#777777] ml-auto">{blockExamples.length} example{blockExamples.length === 1 ? "" : "s"}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 pl-8">
          {block.direction && <p className="text-sm text-[#777777] leading-relaxed mb-3">{block.direction}</p>}
          {blockExamples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {blockExamples.map((ex) => (
                <ExampleCard key={ex.id} ex={ex} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#777777]">No examples attached.</p>
          )}
        </div>
      )}
    </div>
  );
}