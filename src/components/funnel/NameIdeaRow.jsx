import React from "react";
import { X } from "lucide-react";
import { scoreOf } from "@/lib/funnelPlan";

export default function NameIdeaRow({ idea, isTop, onVote, onNote, onDelete }) {
  return (
    <div
      className={`rounded-xl border p-3 ${isTop ? "border-[#619e80] bg-[#fbfdfc]" : "border-[#efece8] bg-[#faf9f7]"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[14px] font-bold leading-snug text-[#1a1a1a]">{idea.name}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          {isTop && (
            <span className="rounded-full bg-[#619e80] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white">
              Top
            </span>
          )}
          <span className="rounded-full border border-[#e5e2dc] bg-white px-2 py-0.5 text-[11px] font-bold text-[#6b6b6b]">
            {scoreOf(idea)}
          </span>
          <button onClick={onDelete} className="text-[#b3aea6] transition-colors hover:text-[#b0532f]" aria-label="Delete name">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {["Luke", "Max"].map((partner) => {
          const key = partner === "Luke" ? "votes_luke" : "votes_max";
          return (
            <div key={partner} className="flex items-center gap-1">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#9a9a9a]">{partner}</span>
              <button
                onClick={() => onVote(partner, -1)}
                className="h-6 w-6 rounded-md border border-[#e5e2dc] bg-white text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
                aria-label={`Remove ${partner} vote`}
              >
                −
              </button>
              <span className="w-4 text-center text-[13px] font-bold text-[#1a1a1a]">{idea[key] || 0}</span>
              <button
                onClick={() => onVote(partner, 1)}
                className="h-6 w-6 rounded-md border border-[#e5e2dc] bg-white text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
                aria-label={`Add ${partner} vote`}
              >
                +
              </button>
            </div>
          );
        })}
      </div>

      <input
        defaultValue={idea.test_note || ""}
        onBlur={(e) => {
          if ((idea.test_note || "") !== e.target.value) onNote(e.target.value);
        }}
        placeholder="Test result or feedback"
        className="mt-2 w-full rounded-lg bg-transparent px-0 py-1 text-[12px] text-[#6b6b6b] outline-none placeholder:text-[#c9c4bb] focus:bg-white focus:px-2"
      />
    </div>
  );
}