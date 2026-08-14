import React from "react";
import ExampleCard from "./ExampleCard";

export default function BlockSection({ block, examples }) {
  const blockExamples = examples.filter((e) => e.block_id === block.id);
  return (
    <div className="pl-3 border-l-2 border-gray-200">
      <div className="flex items-baseline gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">{block.content_type}</h3>
        {block.quantity ? <span className="text-xs text-gray-400">×{block.quantity}</span> : null}
      </div>
      {block.direction && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{block.direction}</p>}
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