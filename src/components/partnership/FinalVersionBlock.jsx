import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { ACCENT, ACCENT_TEXT } from "./accent";

/** The section's final text in large readable type, edited in place. */
export default function FinalVersionBlock({ section, data }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const locked = section.stage === "locked";

  if (editing) {
    return (
      <div
        className="rounded-2xl border border-[#e5e2dc] bg-[#fcfdfc] p-5 sm:p-6"
        style={{ borderLeft: `3px solid ${ACCENT}` }}
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          autoFocus
          className="w-full resize-none rounded-lg border border-[#dcd5c9] bg-white px-3 py-2.5 text-[17px] leading-[1.65] outline-none focus:border-[#619e80]"
        />
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              data.saveContent(section.id, draft);
              setEditing(false);
            }}
            className="rounded-full px-4 py-2 text-[14px] font-semibold hover:opacity-90"
            style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px]"
          >
            Cancel
          </button>
          <span className="text-[12px] text-[#9a9a9a]">Saving clears both approvals.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-[#e5e2dc] bg-[#fcfdfc] p-5 sm:p-6"
      style={{ borderLeft: `3px solid ${ACCENT}` }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#6b6b6b]">Final version</p>
        {!locked && (
          <button
            onClick={() => {
              setDraft(section.content || "");
              setEditing(true);
            }}
            className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        )}
      </div>
      <p className="mt-2 whitespace-pre-wrap text-[18px] leading-[1.65] text-[#1a1a1a] sm:text-[19px]">
        {section.content}
      </p>
    </div>
  );
}