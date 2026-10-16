import React, { useState } from "react";
import moment from "moment";
import { Trash2 } from "lucide-react";

export default function DiscussionLog({ section, entries, data, userName }) {
  const [draft, setDraft] = useState("");
  const sorted = [...entries].sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );
  const add = () => {
    const body = draft.trim();
    if (!body) return;
    data.addEntry(section.id, section.tab_id, body, userName);
    setDraft("");
  };

  return (
    <div className="mt-5 border-t border-[#efece8] pt-4">
      <h4 className="mb-2 text-[14px] font-semibold text-[#6b6b6b]">Discussion log</h4>
      <div className="flex flex-wrap gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="What we talked about, ideas, where we landed…"
          className="min-w-0 flex-1 rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#619e80]"
        />
        <button
          onClick={add}
          disabled={!draft.trim()}
          className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#619e80] disabled:opacity-40"
        >
          Add
        </button>
      </div>
      {sorted.length === 0 ? (
        <p className="mt-3 text-[13px] text-[#9a9a9a]">Nothing logged yet.</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {sorted.map((e) => (
            <li key={e.id} className="rounded-xl border border-[#efece8] bg-[#faf9f7] px-3.5 py-2.5">
              <p className="whitespace-pre-wrap text-[14px] leading-[1.6] text-[#3a3a3a]">{e.body}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[12px] text-[#6b6b6b]">
                  {e.author} · {moment(e.created_date).format("MMM D")}
                </span>
                <button
                  onClick={() => window.confirm("Delete this entry?") && data.deleteEntry(e.id)}
                  aria-label="Delete entry"
                  className="rounded-md p-1 text-[#c9c0b2] hover:text-[#b0532f]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}