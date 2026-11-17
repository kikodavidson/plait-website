import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { CORE_BENEFITS } from "@/lib/funnelPlan";

const COLS = "md:grid-cols-[1fr_1fr_1fr_1.15fr_auto]";
const cell =
  "w-full resize-none rounded-lg bg-transparent px-2 py-1.5 text-[13.5px] leading-snug text-[#1a1a1a] outline-none placeholder:text-[#c9c4bb] focus:bg-[#faf9f7]";

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
      <p className="mb-1 px-2 text-[10px] uppercase tracking-[0.18em] text-[#9a9a9a] md:hidden">{title}</p>
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

  const core = (title) => (
    <div>
      <p className="mb-1 px-2 text-[10px] uppercase tracking-[0.18em] text-[#9a9a9a] md:hidden">{title}</p>
      <select
        value={row.core_benefit || ""}
        onChange={(e) => onSave({ core_benefit: e.target.value })}
        className="w-full rounded-lg border border-[#e5e2dc] bg-white px-2 py-1.5 text-[12px] leading-snug text-[#1a1a1a] outline-none focus:border-[#619e80]"
      >
        <option value="">Not tagged</option>
        {CORE_BENEFITS.map((benefit) => (
          <option key={benefit} value={benefit}>
            {benefit}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 gap-2 border-t border-[#f4f2ef] py-2 md:items-start md:gap-3 ${COLS}`}>
      {field("what_we_do", "Feature (what we do)", "Paid social")}
      {field("what_they_get", "Value (for the business)", "Budget goes where buyers are")}
      {field("why_they_care", "Benefit (for the owner)", "You stop guessing where growth comes from")}
      {core("Core benefit")}
      <button
        onClick={onDelete}
        className="justify-self-start rounded-lg p-2 text-[#b3aea6] transition-colors hover:bg-[#fdece8] hover:text-[#b0532f] md:justify-self-end"
        aria-label="Delete row"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}