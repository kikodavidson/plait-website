import React from "react";
import FunnelAnswer from "./FunnelAnswer";

export default function FunnelSection({ section, items, editor, onSave }) {
  return (
    <section id={section.key} className="scroll-mt-24">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#619e80]">{section.number}</p>
      <h2 className="mt-2 text-2xl leading-tight text-[#1a1a1a] sm:text-3xl">{section.title}</h2>
      <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-[#6b6b6b]">{section.description}</p>

      {items.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[#e5e2dc] bg-white px-4 py-1 sm:px-5">
          {items.map((item) => (
            <FunnelAnswer
              key={item.id}
              item={item}
              editor={editor}
              onSave={(patch, by) => onSave(item.id, patch, by)}
            />
          ))}
        </div>
      )}
    </section>
  );
}