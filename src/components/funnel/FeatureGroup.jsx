import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import FeatureRow from "./FeatureRow";

export default function FeatureGroup({ groupKey, rows, collapsed, onToggle, onRename, onSave, onDelete }) {
  const [name, setName] = useState(groupKey);

  const commit = () => {
    const next = name.trim();
    if (!next || next === groupKey) {
      setName(groupKey);
      return;
    }
    setName(next);
    onRename(groupKey, next);
  };

  return (
    <div className="border-t border-[#efece8] py-3 first:border-t-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-[#9a9a9a] transition-colors hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
          aria-label={collapsed ? "Expand group" : "Collapse group"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          placeholder="Service group"
          className="min-w-0 flex-1 rounded-lg bg-transparent px-1 py-1 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#1a1a1a] outline-none placeholder:text-[#c9c4bb] focus:bg-[#faf9f7]"
        />
        <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-[#9a9a9a]">
          {rows.length} {rows.length === 1 ? "row" : "rows"}
        </span>
      </div>

      {!collapsed && (
        <div className="mt-2 md:pl-8">
          {rows.map((row) => (
            <FeatureRow
              key={row.id}
              row={row}
              onSave={(patch) => onSave(row.id, patch)}
              onDelete={() => onDelete(row.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}