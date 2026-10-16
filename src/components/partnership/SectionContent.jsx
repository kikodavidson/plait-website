import React, { useState } from "react";
import { Pencil } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[15px] leading-[1.7] outline-none focus:border-[#619e80]";

export default function SectionContent({ section, data }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const locked = section.stage === "locked";

  if (editing) {
    return (
      <div className="mt-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          placeholder="Write the current thinking for this piece…"
          className={inputClass}
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => { data.saveContent(section.id, draft); setEditing(false); }}
            className="rounded-full bg-[#619e80] px-4 py-2 text-[14px] text-white hover:opacity-90"
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
    <div className="mt-4">
      {section.content ? (
        <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-[#3a3a3a]">{section.content}</p>
      ) : (
        <p className="text-[15px] text-[#9a9a9a]">Nothing written yet.</p>
      )}
      {!locked && (
        <button
          onClick={() => { setDraft(section.content || ""); setEditing(true); }}
          className="mt-1.5 inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      )}
    </div>
  );
}