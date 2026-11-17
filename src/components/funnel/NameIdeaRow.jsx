import React from "react";
import { X } from "lucide-react";
import { ACCENT, scoreOf } from "@/lib/funnelPlan";

export default function NameIdeaRow({ idea, isTop, onVote, onNote, onDelete }) {
  return (
    <div
      className="rounded-2xl border p-3"
      style={{
        borderColor: isTop ? ACCENT : "#26262A",
        backgroundColor: "#0F0F11",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[14px] font-bold leading-snug text-white">{idea.name}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          {isTop && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-black"
              style={{ backgroundColor: ACCENT }}
            >
              Top
            </span>
          )}
          <span className="rounded-full border border-[#2C2C31] px-2 py-0.5 text-[11px] font-bold text-[#A9ACA2]">
            {scoreOf(idea)}
          </span>
          <button onClick={onDelete} className="text-[#5A5C55] transition-colors hover:text-white" aria-label="Delete name">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {["Luke", "Max"].map((partner) => {
          const key = partner === "Luke" ? "votes_luke" : "votes_max";
          return (
            <div key={partner} className="flex items-center gap-1">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#5A5C55]">{partner}</span>
              <button
                onClick={() => onVote(partner, -1)}
                className="h-6 w-6 rounded-md border border-[#2C2C31] text-[#8E9089] transition-colors hover:text-white"
                aria-label={`Remove ${partner} vote`}
              >
                −
              </button>
              <span className="w-4 text-center text-[13px] font-bold text-white">{idea[key] || 0}</span>
              <button
                onClick={() => onVote(partner, 1)}
                className="h-6 w-6 rounded-md border border-[#2C2C31] text-[#8E9089] transition-colors hover:text-white"
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
        className="mt-2 w-full rounded-lg bg-transparent px-0 py-1 text-[12px] text-[#A9ACA2] outline-none placeholder:text-[#4A4C46] focus:bg-[#16161A] focus:px-2"
      />
    </div>
  );
}