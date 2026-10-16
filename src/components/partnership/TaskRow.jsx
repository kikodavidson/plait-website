import React, { useState } from "react";
import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";
import { TASK_STATUS } from "./TasksSection";

const OWNERS = ["Luke", "Max", "Both"];
const inputClass =
  "w-full rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[15px] outline-none focus:border-[#619e80]";

export default function TaskRow({ task, data }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(task);
  const done = task.status === "done";

  if (editing) {
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    return (
      <li className="rounded-xl border border-[#619e80] p-4">
        <input value={form.title} onChange={set("title")} placeholder="Task title" className={inputClass} />
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <select value={form.owner} onChange={set("owner")} className={`${inputClass} text-[14px]`}>
            {OWNERS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <select value={form.status} onChange={set("status")} className={`${inputClass} text-[14px]`}>
            {Object.entries(TASK_STATUS).map(([v, label]) => (
              <option key={v} value={v}>{label}</option>
            ))}
          </select>
          <input type="date" value={form.due_date || ""} onChange={set("due_date")} className={`${inputClass} text-[14px]`} />
        </div>
        <textarea
          value={form.note || ""}
          onChange={set("note")}
          rows={2}
          placeholder="Note (optional)"
          className={`mt-2 ${inputClass} text-[14px]`}
        />
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              data.updateTask(task.id, {
                title: form.title.trim() || "Untitled",
                owner: form.owner,
                status: form.status,
                note: form.note,
                due_date: form.due_date || null,
              });
              setEditing(false);
            }}
            className="rounded-full bg-[#619e80] px-4 py-2 text-[14px] text-white hover:opacity-90"
          >
            Save
          </button>
          <button
            onClick={() => {
              setForm(task);
              setEditing(false);
            }}
            className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px]"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-[#e5e2dc] p-4">
      <button
        onClick={() => data.updateTask(task.id, { status: done ? "todo" : "done" })}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
          done ? "border-[#619e80] bg-[#619e80] text-white" : "border-[#c9c0b2] bg-white"
        }`}
        aria-label={done ? "Mark as to do" : "Mark as done"}
      >
        {done && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path d="M2 6.5 4.8 9.2 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`text-[15px] ${done ? "text-[#9a9a9a] line-through" : ""}`}>{task.title}</p>
        {task.note && <p className="mt-0.5 text-[13px] text-[#6b6b6b]">{task.note}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
          <span className="rounded-full bg-[#f4f2ef] px-2.5 py-1 font-semibold text-[#6b6b6b]">{task.owner}</span>
          <span
            className={`rounded-full px-2.5 py-1 font-semibold ${
              done
                ? "bg-[#e8f2ec] text-[#3d6b52]"
                : task.status === "in_progress"
                  ? "bg-amber-50 text-[#92600a]"
                  : "bg-[#f4f2ef] text-[#6b6b6b]"
            }`}
          >
            {TASK_STATUS[task.status]}
          </span>
          {task.due_date && <span className="text-[#6b6b6b]">Due {moment(task.due_date).format("MMM D")}</span>}
        </div>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          onClick={() => {
            setForm(task);
            setEditing(true);
          }}
          className="rounded-md p-1 text-[#9a9a9a] hover:text-[#1a1a1a]"
          aria-label="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            if (window.confirm("Delete this task?")) data.deleteTask(task.id);
          }}
          className="rounded-md p-1 text-[#9a9a9a] hover:text-[#b0532f]"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}