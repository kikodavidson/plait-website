import React from "react";
import ExampleCard from "./ExampleCard";

export default function BlockSection({ block, examples }) {
  const blockExamples = examples.filter((e) => e.block_id === block.id);
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[#222222]">{block.content_type}</h3>
        {block.quantity ? <span className="text-xs text-[#777777]">×{block.quantity}</span> : null}
      </div>
      {block.direction && <p className="text-sm text-[#777777] mt-1 leading-relaxed">{block.direction}</p>}
      {blockExamples.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {blockExamples.map((ex) => (
            <ExampleCard key={ex.id} ex={ex} />
          ))}
        </div>
      )}
    </div>
  );
}