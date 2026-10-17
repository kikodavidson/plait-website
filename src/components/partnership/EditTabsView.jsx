import React, { useState } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { ACCENT, ACCENT_TEXT } from "./accent";

/** Inline view for reordering, renaming, adding and deleting areas (tabs). */
export default function EditTabsView({ data }) {
  const [name, setName] = useState("");

  const add = async () => {
    const n = name.trim();
    if (!n) return;
    await data.addTab(n);
    setName("");
  };

  return (
    <div>
      <h1 className="text-[24px]">Edit tabs</h1>
      <p className="mt-1 max-w-lg text-[14px] leading-[1.6] text-[#6b6b6b]">
        Reorder, rename or delete areas. Deleting an area removes its sections and
        everything in them.
      </p>

      <div className="mt-6 max-w-md space-y-1.5">
        {data.tabs.map((t, i) => (
          <div key={t.id} className="flex items-center gap-1.5">
            <button
              disabled={i === 0}
              onClick={() => data.moveTab(t.id, -1)}
              className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
              aria-label="Move tab up"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              disabled={i === data.tabs.length - 1}
              onClick={() => data.moveTab(t.id, 1)}
              className="rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#f4f2ef] disabled:opacity-30"
              aria-label="Move tab down"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
            <input
              defaultValue={t.name}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== t.name) data.renameTab(t.id, v);
              }}
              className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-1.5 text-[14px] outline-none focus:border-[#2d6a4f]"
            />
            <button
              onClick={() => {
                if (window.confirm(`Delete "${t.name}" and everything in it?`)) data.deleteTab(t.id);
              }}
              className="rounded-md p-1.5 text-[#9a9a9a] hover:bg-[#fdece8] hover:text-[#b0532f]"
              aria-label="Delete tab"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex max-w-md gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="New tab name"
          className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] px-3 py-1.5 text-[14px] outline-none focus:border-[#2d6a4f]"
        />
        <button
          onClick={add}
          className="rounded-full px-4 py-1.5 text-[13px] font-semibold hover:opacity-90"
          style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
        >
          Add
        </button>
      </div>
    </div>
  );
}