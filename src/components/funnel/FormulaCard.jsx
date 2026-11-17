import React, { useState } from "react";
import { Plus } from "lucide-react";
import NameIdeaRow from "./NameIdeaRow";

export default function FormulaCard({ formula, ideas, topId, onAdd, onVote, onNote, onDelete }) {
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    onAdd(name.trim());
    setName("");
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[#e5e2dc] bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5f1] text-[15px] font-extrabold text-[#3d6b52]">
          {formula.key}
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-extrabold leading-tight text-[#1a1a1a]">{formula.title}</p>
          <p className="mt-1 text-[11px] leading-snug text-[#9a9a9a]">{formula.hint}</p>
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-2">
        {ideas.length === 0 && <p className="text-[12px] text-[#9a9a9a]">No names yet. Drop a few in.</p>}
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
          className="min-w-0 flex-1 rounded-xl border border-[#e5e2dc] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none placeholder:text-[#b3aea6] focus:border-[#619e80]"
        />
        <button
          onClick={submit}
          className="rounded-xl bg-[#619e80] px-3 text-white transition-opacity hover:opacity-90"
          aria-label="Add name"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}