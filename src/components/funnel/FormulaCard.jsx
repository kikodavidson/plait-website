import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ACCENT } from "@/lib/funnelPlan";
import NameIdeaRow from "./NameIdeaRow";

export default function FormulaCard({ formula, ideas, topId, onAdd, onVote, onNote, onDelete }) {
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    onAdd(name.trim());
    setName("");
  };

  return (
    <div className="flex flex-col rounded-3xl border border-[#26262A] bg-[#141416] p-5">
      <div className="flex items-start gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[15px] font-extrabold text-black"
          style={{ backgroundColor: ACCENT }}
        >
          {formula.key}
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-extrabold leading-tight text-white">{formula.title}</p>
          <p className="mt-1 text-[11px] leading-snug text-[#8E9089]">{formula.hint}</p>
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-2">
        {ideas.length === 0 && <p className="text-[12px] text-[#5A5C55]">No names yet. Drop a few in.</p>}
        {ideas.map((idea) => (
          <NameIdeaRow
            key={idea.id}
            idea={idea}
            isTop={idea.id === topId}
            onVote={(partner, delta) => onVote(idea.id, partner, delta)}
            onNote={(note) => onNote(idea.id, note)}
            onDelete={() => onDelete(idea.id)}
          />
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add a name"
          className="min-w-0 flex-1 rounded-xl border border-[#2C2C31] bg-[#0F0F11] px-3 py-2 text-sm text-white outline-none placeholder:text-[#5A5C55] focus:border-[#C8FF3D]"
        />
        <button
          onClick={submit}
          className="rounded-xl px-3 text-black"
          style={{ backgroundColor: ACCENT }}
          aria-label="Add name"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}