import React, { useState } from "react";
import { Plus } from "lucide-react";
import { byOrder } from "@/lib/funnelPlan";
import FeatureGroup from "./FeatureGroup";

const COLS = "md:grid-cols-[1fr_1fr_1fr_1.15fr_auto]";

export default function FeatureTable({ features, filter, onAdd, onSave, onDelete }) {
  const [collapsed, setCollapsed] = useState({});
  const rows = filter ? features.filter((f) => f.core_benefit === filter) : features;

  const groups = [];
  byOrder(rows).forEach((row) => {
    const key = row.service || "";
    const found = groups.find((g) => g.key === key);
    if (found) found.rows.push(row);
    else groups.push({ key, rows: [row] });
  });

  const rename = (from, to) => {
    features
      .filter((f) => (f.service || "") === from)
      .forEach((f) => onSave(f.id, { service: to }));
  };

  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-white p-4 sm:p-6">
      <div className={`hidden gap-3 pb-1 text-[10px] uppercase tracking-[0.2em] text-[#9a9a9a] md:grid ${COLS}`}>
        <span className="px-2">Feature (what we do)</span>
        <span className="px-2">Value (for the business)</span>
        <span className="px-2">Benefit (for the owner)</span>
        <span className="px-2">Core benefit</span>
        <span className="w-8" />
      </div>

      {rows.length === 0 && (
        <p className="py-4 text-[13px] text-[#9a9a9a]">
          {filter ? "No rows tagged to that core benefit yet." : "No rows yet. Add the first line."}
        </p>
      )}

      {groups.map((group) => (
        <FeatureGroup
          key={group.key || "ungrouped"}
          groupKey={group.key}
          rows={group.rows}
          collapsed={!!collapsed[group.key]}
          onToggle={() => setCollapsed((c) => ({ ...c, [group.key]: !c[group.key] }))}
          onRename={rename}
          onSave={onSave}
          onDelete={onDelete}
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