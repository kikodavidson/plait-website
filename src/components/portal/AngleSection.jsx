import React from "react";
import BlockSection from "./BlockSection";

const TYPE_BADGE = { audience: "Audience", concept: "Concept" };

export default function AngleSection({ angle, blocks, examples }) {
  const angleBlocks = blocks.filter((b) => b.angle_id === angle.id);
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 flex-wrap">
        <h2 className="text-lg font-bold text-[#2d2d2d]">{angle.label}</h2>
        {angle.type && (
          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${angle.type === "audience" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
            {TYPE_BADGE[angle.type] || angle.type}
          </span>
        )}
      </div>
      {angle.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{angle.description}</p>}
      {angle.insight && <p className="text-sm text-gray-500 mt-2 italic leading-relaxed">{angle.insight}</p>}
      <div className="mt-4 space-y-5">
        {angleBlocks.map((b) => (
          <BlockSection key={b.id} block={b} examples={examples} />
        ))}
      </div>
    </section>
  );
}