import React, { useState } from "react";
import { Plus } from "lucide-react";
import TaskRow from "./TaskRow";
import PanelEditor from "./PanelEditor";

export default function SectionTasks({ section, tasks, data }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const open = tasks.filter((t) => t.status !== "done");
  const done = tasks.filter((t) => t.status === "done");

  const save = () => {
    const body = draft.trim();
    if (body) data.addTask(section, { title: body, owner: "Both", status: "todo", note: "", due_date: null });
    setDraft("");
    setAdding(false);
  };
  const cancel = () => {
    setDraft("");
    setAdding(false);
  };

  return (
    <div className="mt-5 border-t border-[#efece8] pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-[#6b6b6b]">Tasks</h4>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      {tasks.length === 0 && !adding ? (
        <p className="text-[13px] text-[#9a9a9a]">No tasks.</p>
      ) : (
        <ul className="space-y-2">
          {adding && (
            <li className="rounded-xl border border-[#e5e2dc] p-3">
              <PanelEditor value={draft} onChange={setDraft} onSave={save} onCancel={cancel} placeholder="Task title" />
            </li>
          )}
          {[...open, ...done].map((t) => (
            <TaskRow key={t.id} task={t} data={data} />
          ))}
        </ul>
      )}
    </div>
  );
}