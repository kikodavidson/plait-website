import React, { useState } from "react";
import { Plus, X } from "lucide-react";

/** Feel Words bar: up to 5 editable word chips, each showing who added it. */
export default function FeelWordsBar({ words, onAdd, onDelete }) {
  const [draft, setDraft] = useState("");
  const canAdd = words.length < 5;

  const add = () => {
    const w = draft.trim();
    if (!w || !canAdd) return;
    onAdd(w);
    setDraft("");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {words.map((w) => (
        <span
          key={w.id}
          className="group inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] bg-[#f7f5f2] px-3 py-1.5 text-[13px] text-[#1a1a1a]"
        >
          {w.word}
          <span className="text-[11px] text-[#8a857c]">· {w.added_by}</span>
          <button
            onClick={() => onDelete(w.id)}
            aria-label={`Remove ${w.word}`}
            className="rounded-full p-0.5 text-[#8a857c] transition-colors hover:bg-[#e9e6e0] hover:text-[#1a1a1a]"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {canAdd ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#d5d1c8] px-2 py-1">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a feel word"
            className="w-28 bg-transparent px-1 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#8a857c]"
          />
          <button
            onClick={add}
            disabled={!draft.trim()}
            aria-label="Add feel word"
            className="rounded-full p-0.5 text-[#8a857c] transition-colors hover:bg-[#e9e6e0] hover:text-[#1a1a1a] disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </span>
      ) : (
        <span className="text-[12px] text-[#8a857c]">5 word limit reached</span>
      )}
    </div>
  );
}