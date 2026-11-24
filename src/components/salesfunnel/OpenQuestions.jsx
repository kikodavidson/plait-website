import React, { useState } from "react";
import { Plus } from "lucide-react";
import { OWNERS } from "@/lib/salesFunnel";

export default function OpenQuestions({ questions, onAdd, onToggle, author }) {
  const [draft, setDraft] = useState("");
  const [owner, setOwner] = useState("Both");
  const [showAnswered, setShowAnswered] = useState(false);

  const open = questions.filter((q) => !q.answered);
  const answered = questions.filter((q) => q.answered);

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    onAdd(text, owner, author);
    setDraft("");
  };

  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-white p-4 sm:p-5">
      <h2 className="text-[17px] font-extrabold text-[#1a1a1a]">Open Questions</h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a question…"
          className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-2 text-[14px] outline-none focus:border-[#619e80]"
        />
        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="rounded-lg border border-[#e5e2dc] bg-white px-2 py-2 text-[12px] font-semibold text-[#3a3a3a] outline-none focus:border-[#619e80]"
        >
          {OWNERS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={add}
          disabled={!draft.trim()}
          className="flex items-center gap-1.5 rounded-full bg-[#619e80] px-3.5 py-2 text-[12px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {open.length === 0 && <li className="text-[13px] text-[#9a9a9a]">Nothing open right now.</li>}
        {open.map((q) => (
          <li key={q.id} className="flex items-start gap-2.5 rounded-xl border border-[#efece8] bg-[#faf9f7] p-3">
            <input
              type="checkbox"
              checked={false}
              onChange={() => onToggle(q.id, true)}
              className="mt-0.5 h-4 w-4 accent-[#619e80]"
              aria-label="Mark answered"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] leading-snug text-[#1a1a1a]">{q.question}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-[#9a9a9a]">{q.owner}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-[#efece8] pt-3">
        <button
          onClick={() => setShowAnswered((v) => !v)}
          className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a] transition-colors hover:text-[#3d6b52]"
        >
          Answered ({answered.length})
        </button>
        {showAnswered && (
          <ul className="mt-2 space-y-1.5">
            {answered.length === 0 && <li className="text-[13px] text-[#9a9a9a]">Nothing answered yet.</li>}
            {answered.map((q) => (
              <li key={q.id} className="flex items-start gap-2.5 px-1 py-1">
                <input
                  type="checkbox"
                  checked
                  onChange={() => onToggle(q.id, false)}
                  className="mt-0.5 h-4 w-4 accent-[#619e80]"
                  aria-label="Reopen question"
                />
                <span className="min-w-0 flex-1 text-[13px] leading-snug text-[#9a9a9a] line-through">{q.question}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}