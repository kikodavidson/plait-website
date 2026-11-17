import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const cell =
  "w-full resize-none rounded-lg bg-transparent px-2 py-1.5 text-[14px] leading-snug text-white outline-none placeholder:text-[#5A5C55] focus:bg-[#0F0F11]";

export default function FeatureRow({ row, onSave, onDelete }) {
  const [draft, setDraft] = useState({
    what_we_do: row.what_we_do || "",
    what_they_get: row.what_they_get || "",
    why_they_care: row.why_they_care || "",
  });

  const commit = (key) => {
    if ((row[key] || "") !== draft[key]) onSave({ [key]: draft[key] });
  };

  const field = (key, title, placeholder) => (
    <div>
      <p className="mb-1 px-2 text-[10px] uppercase tracking-[0.18em] text-[#5A5C55] md:hidden">{title}</p>
      <textarea
        rows={2}
        value={draft[key]}
        placeholder={placeholder}
        onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
        onBlur={() => commit(key)}
        className={cell}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-2 border-t border-[#26262A] py-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-start">
      {field("what_we_do", "What we do", "Ad account audit")}
      {field("what_they_get", "What they get", "You know exactly where your money is leaking")}
      {field("why_they_care", "Why they care", "You stop wasting budget and know what to fix first.")}
      <button
        onClick={onDelete}
        className="justify-self-start rounded-lg p-2 text-[#5A5C55] transition-colors hover:bg-[#222226] hover:text-white md:justify-self-end"
        aria-label="Delete row"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}