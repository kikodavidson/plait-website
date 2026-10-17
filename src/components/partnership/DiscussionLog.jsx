import React, { useState } from "react";
import moment from "moment";
import { Pencil, Plus, Trash2 } from "lucide-react";
import PanelEditor from "./PanelEditor";

export default function DiscussionLog({ section, entries, data, userName }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState("");
  const sorted = [...entries].sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );

  const saveNew = () => {
    const body = draft.trim();
    if (body) data.addEntry(section.id, section.tab_id, body, userName);
    setDraft("");
    setAdding(false);
  };
  const cancelNew = () => {
    setDraft("");
    setAdding(false);
  };
  const startEdit = (e) => {
    setEditingId(e.id);
    setEditDraft(e.body);
  };
  const saveEdit = () => {
    const body = editDraft.trim();
    if (editingId && body) data.updateEntry(editingId, { body });
    setEditingId(null);
    setEditDraft("");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft("");
  };

  return (
    <div className="mt-5 border-t border-[#efece8] pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-[#6b6b6b]">Discussion log</h4>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      {sorted.length === 0 && !adding ? (
        <p className="text-[13px] text-[#9a9a9a]">Nothing logged yet.</p>
      ) : (
        <ul className="space-y-2">
          {adding && (
            <li className="rounded-xl border border-[#e5e2dc] p-3">
              <PanelEditor
                value={draft}
                onChange={setDraft}
                onSave={saveNew}
                onCancel={cancelNew}
                placeholder="What we talked about, ideas, where we landed…"
              />
            </li>
          )}
          {sorted.map((e) =>
            editingId === e.id ? (
              <li key={e.id} className="rounded-xl border border-[#e5e2dc] p-3">
                <PanelEditor value={editDraft} onChange={setEditDraft} onSave={saveEdit} onCancel={cancelEdit} />
              </li>
            ) : (
              <li key={e.id} className="group rounded-xl border border-[#efece8] bg-[#faf9f7] p-3">
                <div className="flex items-start gap-2.5">
                  <p className="min-w-0 flex-1 whitespace-pre-wrap text-[14px] leading-[1.55] text-[#3a3a3a]">
                    {e.body}
                  </p>
                  <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => startEdit(e)}
                      aria-label="Edit entry"
                      className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => window.confirm("Delete this entry?") && data.deleteEntry(e.id)}
                      aria-label="Delete entry"
                      className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#b0532f]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-[12px] text-[#6b6b6b]">
                  {e.author} · {moment(e.created_date).format("MMM D")}
                </p>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}