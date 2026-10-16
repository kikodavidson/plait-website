import React, { useState } from "react";
import moment from "moment";
import { Check, Pencil, Trash2, X } from "lucide-react";

export const NOTE_STATUS = {
  draft: { label: "Draft", pill: "bg-[#f4f2ef] text-[#6b6b6b]" },
  decided: { label: "Decided", pill: "bg-[#e8f2ec] text-[#3d6b52]" },
  needs_discussion: { label: "Needs Discussion", pill: "bg-amber-50 text-[#92600a]" },
};

const inputClass =
  "w-full rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[15px] outline-none focus:border-[#619e80]";

export default function NoteCard({ note, data }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [status, setStatus] = useState(note.status);

  const save = () => {
    data.updateNote(note.id, { title: title.trim() || "Untitled", body, status });
    setEditing(false);
  };

  const startEdit = () => {
    setTitle(note.title);
    setBody(note.body);
    setStatus(note.status);
    setEditing(true);
  };

  if (editing) {
    return (
      <div className="break-inside-avoid rounded-xl border border-[#619e80] p-5">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className={inputClass} />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          placeholder="Write it out…"
          className={`mt-2 ${inputClass} leading-[1.7]`}
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[14px] outline-none">
            <option value="draft">Draft</option>
            <option value="decided">Decided</option>
            <option value="needs_discussion">Needs Discussion</option>
          </select>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1.5 rounded-full bg-[#619e80] px-4 py-2 text-[14px] text-white hover:opacity-90">
              <Check className="h-4 w-4" /> Save
            </button>
            <button onClick={() => setEditing(false)} className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const meta = NOTE_STATUS[note.status] || NOTE_STATUS.draft;

  return (
    <div
      className={`break-inside-avoid rounded-xl p-5 ${
        note.status === "decided" ? "border-2 border-[#619e80]" : "border border-[#e5e2dc]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[17px] leading-snug">{note.title || "Untitled"}</h3>
        <div className="flex shrink-0 gap-1">
          <button onClick={startEdit} className="rounded-md p-1 text-[#9a9a9a] hover:text-[#1a1a1a]" aria-label="Edit note">
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this note?")) data.deleteNote(note.id);
            }}
            className="rounded-md p-1 text-[#9a9a9a] hover:text-[#b0532f]"
            aria-label="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {note.body && <p className="mt-2 whitespace-pre-wrap text-[15px] leading-[1.7] text-[#3a3a3a]">{note.body}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${meta.pill}`}>{meta.label}</span>
        <span className="text-[12px] text-[#6b6b6b]">
          {note.author} · edited {moment(note.updated_date).format("MMM D")}
        </span>
      </div>
    </div>
  );
}