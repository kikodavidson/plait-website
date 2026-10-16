import React from "react";
import { Plus } from "lucide-react";
import NoteCard from "./NoteCard";

export default function NotesSection({ tab, notes, data, userName }) {
  const add = () =>
    data.addNote(tab.id, { title: "", body: "", status: "draft", author: userName });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px]">Notes</h2>
        <button
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#619e80]"
        >
          <Plus className="h-4 w-4" /> Add note
        </button>
      </div>
      {notes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#e5e2dc] px-4 py-8 text-center text-[15px] text-[#6b6b6b]">
          No notes yet.
        </p>
      ) : (
        <div className="columns-1 gap-4 md:columns-2 [&>*]:mb-4">
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} data={data} />
          ))}
        </div>
      )}
    </section>
  );
}