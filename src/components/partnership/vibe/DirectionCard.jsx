import React, { useState } from "react";
import { Heart, Minus, Pencil, Trash2, X } from "lucide-react";
import { VOTE_OPTIONS } from "./vibeMeta";

const VOTE_ICONS = { love: Heart, maybe: Minus, no: X };

/** One named direction with inline editing and per-partner votes. */
export default function DirectionCard({ item, data, userName }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: item.title || "", body: item.body || "" });
  const myKey = userName === "Max" ? "vote_max" : "vote_luke";

  const save = async () => {
    const title = draft.title.trim();
    if (!title) return;
    await data.updateVibeItem(item.id, { title, body: draft.body.trim() });
    setEditing(false);
  };

  return (
    <div className="group relative rounded-xl border border-[#e5e2dc] bg-white p-4 transition-shadow hover:shadow-md">
      <div className="absolute right-2.5 top-2.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => setEditing((e) => !e)}
          className="rounded-md p-1 text-[#c4c4c4] hover:text-[#1a1a1a]"
          aria-label="Edit direction"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => window.confirm(`Delete "${item.title}"?`) && data.deleteVibeItem(item.id)}
          className="rounded-md p-1 text-[#c4c4c4] hover:text-[#b0532f]"
          aria-label="Delete direction"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {editing ? (
        <div className="space-y-2">
          <input
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="Direction name"
            className="w-full rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[14px] font-semibold outline-none focus:border-[#619e80]"
          />
          <textarea
            value={draft.body}
            onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
            rows={3}
            placeholder="What this direction means, the words that go with it…"
            className="w-full resize-none rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13.5px] outline-none focus:border-[#619e80]"
          />
          <button
            onClick={save}
            className="h-8 rounded-full bg-[#2d2d2d] px-3.5 text-[12px] font-semibold text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <h4 className="pr-12 text-[15.5px] font-semibold text-[#1a1a1a]">{item.title}</h4>
          {item.body && (
            <p className="mt-1.5 whitespace-pre-wrap text-[13.5px] leading-relaxed text-[#6b6b6b]">
              {item.body}
            </p>
          )}
        </>
      )}

      <div className="mt-3 flex items-center gap-1.5 border-t border-[#f0eeea] pt-3">
        {VOTE_OPTIONS.map((v) => {
          const Icon = VOTE_ICONS[v.icon];
          const active = item[myKey] === v.value;
          return (
            <button
              key={v.value}
              onClick={() => data.updateVibeItem(item.id, { [myKey]: active ? "" : v.value })}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors ${
                active ? "bg-[#eef5f1] text-[#3d6b52]" : "text-[#9a9a9a] hover:bg-[#f5f3ef]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {v.label}
            </button>
          );
        })}
        <span className="ml-auto text-[11.5px] text-[#9a9a9a]">{item.added_by || ""}</span>
      </div>
    </div>
  );
}