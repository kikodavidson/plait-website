import React from "react";
import { sectionByKey } from "@/lib/salesFunnel";

const jump = (id) => {
  const el = document.getElementById(`item-${id}`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
};

export default function ToDiscuss({ items }) {
  const flagged = items.filter((item) => item.need_discuss);

  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-white p-4 sm:p-5">
      <h2 className="text-[17px] font-extrabold text-[#1a1a1a]">To Discuss</h2>
      <p className="mt-1 text-[13px] text-[#6b6b6b]">Everything flagged for a call, in one place.</p>

      <ul className="mt-3 space-y-2">
        {flagged.length === 0 && (
          <li className="text-[13px] text-[#9a9a9a]">Nothing flagged. Tick “Need to discuss” on an item to add it here.</li>
        )}
        {flagged.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => jump(item.id)}
              className="w-full rounded-xl border border-[#f0b27a] bg-[#fffaf3] p-3 text-left transition-colors hover:border-[#d97706]"
            >
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[#9a9a9a]">
                {(sectionByKey(item.section) || {}).title || "Section"}
              </span>
              <span className="mt-0.5 block text-[14px] font-bold leading-snug text-[#1a1a1a]">{item.title}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-[#9a9a9a]">{item.owner}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}