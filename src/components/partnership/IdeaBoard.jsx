import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import IdeaCard from "./IdeaCard";
import { ACCENT, ACCENT_TEXT } from "./accent";

/** Grid of idea cards, sorted by most Loves first. */
export default function IdeaBoard({ section, data, userName, ideas, composerOpen, onComposerClose }) {
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const boardRef = useRef(null);

  const showComposer = composerOpen || open;

  useEffect(() => {
    if (composerOpen) boardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [composerOpen]);

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    data.addIdea(section, t, userName);
    setDraft("");
    setOpen(false);
    onComposerClose();
  };

  const loves = (i) => ["vote_luke", "vote_max"].filter((k) => i[k] === "love").length;
  const sorted = [...ideas].sort(
    (a, b) =>
      loves(b) - loves(a) || new Date(b.created_date || 0) - new Date(a.created_date || 0)
  );

  return (
    <div ref={boardRef} className="mt-10 scroll-mt-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[18px]">Idea board</h2>
        <div className="flex items-center gap-3">
          {ideas.length > 0 && (
            <span className="text-[12px] text-[#9a9a9a]">Sorted by most loved</span>
          )}
          {!showComposer && (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 rounded-full border border-[#e5e2dc] px-3 py-1.5 text-[13px] transition-colors hover:border-[#1a1a1a]"
            >
              <Plus className="h-3.5 w-3.5" /> Add idea
            </button>
          )}
        </div>
      </div>

      {showComposer && (
        <div className="mt-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) add();
            }}
            rows={3}
            autoFocus
            placeholder="Drop an idea…"
            className="w-full resize-none rounded-xl border border-[#dcd5c9] px-3 py-2.5 text-[15px] leading-[1.6] outline-none focus:border-[#619e80]"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={add}
              disabled={!draft.trim()}
              className="rounded-full px-4 py-1.5 text-[13px] font-semibold hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
            >
              Add idea
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onComposerClose();
              }}
              className="inline-flex items-center gap-1 rounded-full border border-[#e5e2dc] px-4 py-1.5 text-[13px]"
            >
              <X className="h-3 w-3" /> Cancel
            </button>
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <p className="mt-4 text-[15px] text-[#9a9a9a]">
          No ideas yet — the first one can be rough.
        </p>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {sorted.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} data={data} userName={userName} />
          ))}
        </div>
      )}
    </div>
  );
}