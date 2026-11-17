import React from "react";
import { Plus } from "lucide-react";
import { ACCENT } from "@/lib/funnelPlan";
import FeatureRow from "./FeatureRow";

export default function FeatureTable({ features, onAdd, onSave, onDelete }) {
  return (
    <div className="rounded-3xl border border-[#26262A] bg-[#141416] p-4 sm:p-6">
      <div className="hidden gap-3 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#8E9089] md:grid md:grid-cols-[1fr_1fr_1fr_auto]">
        <span className="px-2">What we do</span>
        <span className="px-2">What they get</span>
        <span className="px-2">Why they care</span>
        <span className="w-8" />
      </div>

      {features.length === 0 && (
        <p className="py-4 text-[13px] text-[#5A5C55]">No rows yet. Add the first line.</p>
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
        className="mt-4 flex items-center gap-2 rounded-full border border-[#2C2C31] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#A9ACA2] transition-colors hover:border-[#C8FF3D] hover:text-white"
      >
        <Plus className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Add row
      </button>
    </div>
  );
}