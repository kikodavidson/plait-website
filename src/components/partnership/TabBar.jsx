import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Pencil, Plus, Trash2, X } from "lucide-react";

export default function TabBar({ tabs, activeId, onSelect, contentTabs, onAdd, onRename, onMove, onDelete }) {
  const [manage, setManage] = useState(false);

  return (
    <div className="mt-8">
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-[#e5e2dc]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`whitespace-nowrap px-4 py-2.5 text-[15px] transition-colors ${
              activeId === t.id
                ? "-mb-px border-b-2 border-[#619e80] font-semibold text-[#1a1a1a]"
                : "text-[#6b6b6b] hover:text-[#1a1a1a]"
            }`}
          >
            {t.name}
          </button>
        ))}
        <button
          onClick={() => setManage((m) => !m)}
          className="ml-auto shrink-0 rounded-full p-2 text-[#6b6b6b] hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
          aria-label="Manage tabs"
        >
          {manage ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
        </button>
      </div>

      {manage && (
        <div className="mt-4 space-y-2 rounded-xl border border-[#e5e2dc] p-4">
          {contentTabs.map((t, i) => (
            <div key={`${t.id}-${t.name}`} className="flex items-center gap-2">
              <button
                disabled={i === 0}
                onClick={() => onMove(t.id, -1)}
                className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
                aria-label="Move tab left"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                disabled={i === contentTabs.length - 1}
                onClick={() => onMove(t.id, 1)}
                className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
                aria-label="Move tab right"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <input
                defaultValue={t.name}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v && v !== t.name) onRename(t.id, v);
                }}
                className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-2 text-[15px] outline-none focus:border-[#619e80]"
              />
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${t.name}" and everything in it?`)) onDelete(t.id);
                }}
                className="rounded-md p-1.5 text-[#9a9a9a] hover:bg-[#fdece8] hover:text-[#b0532f]"
                aria-label="Delete tab"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => onAdd("New tab")}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] text-[#1a1a1a] hover:border-[#619e80]"
          >
            <Plus className="h-4 w-4" /> Add tab
          </button>
        </div>
      )}
    </div>
  );
}