import React, { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, X } from "lucide-react";
import SectionCard from "./SectionCard";

export default function WorkspaceTab({ tab, data, userName }) {
  const [manage, setManage] = useState(false);
  const sections = data.sections.filter((s) => s.tab_id === tab.id);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px]">Sections</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setManage((m) => !m)}
            className="rounded-full p-2 text-[#6b6b6b] hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
            aria-label="Manage sections"
          >
            {manage ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </button>
          <button
            onClick={() => data.addSection(tab.id, "New section")}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#619e80]"
          >
            <Plus className="h-4 w-4" /> Add section
          </button>
        </div>
      </div>

      {manage && (
        <div className="mb-5 space-y-2 rounded-xl border border-[#e5e2dc] p-4">
          {sections.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                disabled={i === 0}
                onClick={() => data.moveSection(s.id, -1)}
                className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
                aria-label="Move section up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                disabled={i === sections.length - 1}
                onClick={() => data.moveSection(s.id, 1)}
                className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
                aria-label="Move section down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <input
                defaultValue={s.name}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v && v !== s.name) data.renameSection(s.id, v);
                }}
                className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-2 text-[15px] outline-none focus:border-[#619e80]"
              />
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${s.name}" and everything in it?`)) data.deleteSection(s.id);
                }}
                className="rounded-md p-1.5 text-[#9a9a9a] hover:bg-[#fdece8] hover:text-[#b0532f]"
                aria-label="Delete section"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {sections.length === 0 && (
            <p className="text-[14px] text-[#6b6b6b]">No sections yet.</p>
          )}
        </div>
      )}

      <div className="space-y-5">
        {sections.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#e5e2dc] px-4 py-8 text-center text-[15px] text-[#6b6b6b]">
            No sections yet. Add one to start deciding.
          </p>
        ) : (
          sections.map((s) => (
            <SectionCard key={s.id} section={s} data={data} userName={userName} />
          ))
        )}
      </div>
    </div>
  );
}