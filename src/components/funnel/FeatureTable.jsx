import React from "react";
import { Plus } from "lucide-react";
import FeatureRow from "./FeatureRow";

export default function FeatureTable({ features, onAdd, onSave, onDelete }) {
  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-white p-4 sm:p-6">
      <div className="hidden gap-3 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#9a9a9a] md:grid md:grid-cols-[1fr_1fr_1fr_auto]">
        <span className="px-2">What we do</span>
        <span className="px-2">What they get</span>
        <span className="px-2">Why they care</span>
        <span className="w-8" />
      </div>

      {features.length === 0 && (
        <p className="py-4 text-[13px] text-[#9a9a9a]">No rows yet. Add the first line.</p>
      )}

      {features.map((row) => (
        <FeatureRow
          key={row.id}
          row={row}
          onSave={(patch) => onSave(row.id, patch)}
          onDelete={() => onDelete(row.id)}
        />
      ))}

      <button
        onClick={onAdd}
        className="mt-4 flex items-center gap-2 rounded-full border border-[#e5e2dc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors hover:border-[#619e80] hover:text-[#1a1a1a]"
      >
        <Plus className="h-3.5 w-3.5 text-[#619e80]" /> Add row
      </button>
    </div>
  );
}