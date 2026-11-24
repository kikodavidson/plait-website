import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ItemCard from "./ItemCard";

export default function SectionCard({ section, items, open, onToggle, editor, onSave }) {
  const done = items.filter((item) => item.status === "done").length;

  return (
    <section className="rounded-2xl border border-[#e5e2dc] bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
      >
        <span className="mt-0.5 shrink-0 text-[#9a9a9a]">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#619e80]">
              {section.number}
            </span>
            <span className="text-[17px] font-extrabold leading-tight text-[#1a1a1a]">{section.title}</span>
          </span>
          <span className="mt-1 block text-[13px] leading-relaxed text-[#6b6b6b]">{section.description}</span>
        </span>
        <span className="shrink-0 rounded-full border border-[#e5e2dc] px-2.5 py-1 text-[11px] font-semibold text-[#6b6b6b]">
          {done} of {items.length} done
        </span>
      </button>

      {open && (
        <div className="space-y-2 border-t border-[#efece8] px-3 py-3 sm:px-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} editor={editor} onSave={(patch, by) => onSave(item.id, patch, by)} />
          ))}
        </div>
      )}
    </section>
  );
}