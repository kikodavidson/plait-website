import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { ACCENT, ACCENT_TEXT } from "./accent";

const DEFAULT_QUESTIONS = {
  "North Star": "what type of people in business do we want to be",
  Values: "What do we always do, even when it costs us?",
  "Origin Story": "Why did we start this?",
  Name: "What should people feel when they hear it?",
  Voice: "How would we talk to a client over a beer?",
};
const FALLBACK = "What's the first thing we need to figure out here?";

/** Large guiding question + Add an idea, shown while a section has no final content. */
export default function GuidedEmptyState({ section, data, onAddIdea }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const question = section.guiding_question || DEFAULT_QUESTIONS[section.name] || FALLBACK;

  if (editing) {
    return (
      <div className="py-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          autoFocus
          className="w-full resize-none rounded-lg border border-[#dcd5c9] px-3 py-2 text-[20px] leading-snug outline-none focus:border-[#619e80]"
        />
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => {
              const v = draft.trim();
              if (v && v !== question) data.setGuidingQuestion(section.id, v);
              setEditing(false);
            }}
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold hover:opacity-90"
            style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded-full border border-[#e5e2dc] px-4 py-1.5 text-[13px]"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <p className="max-w-xl font-light text-[24px] leading-[1.35] text-[#b3b3b3] sm:text-[28px]">
        {question}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={onAddIdea}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold hover:opacity-90"
          style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
        >
          <Plus className="h-4 w-4" /> Add an idea
        </button>
        <button
          onClick={() => {
            setDraft(question);
            setEditing(true);
          }}
          className="inline-flex items-center gap-1 text-[13px] text-[#9a9a9a] transition-colors hover:text-[#1a1a1a]"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit question
        </button>
      </div>
    </div>
  );
}