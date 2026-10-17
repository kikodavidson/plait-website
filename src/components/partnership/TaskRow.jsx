import React, { useState } from "react";
import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";
import { TASK_STATUS } from "./stageMeta";
import SheenPill from "./SheenPill";
import PanelEditor from "./PanelEditor";

const OWNERS = ["Luke", "Max", "Both"];
const metaInput =
  "w-full rounded-lg border border-[#dcd5c9] bg-white px-2.5 py-1.5 text-[13px] outline-none focus:border-[#00E676]";

export default function TaskRow({ task, data }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [form, setForm] = useState({
    owner: task.owner || "Both",
    status: task.status || "todo",
    due_date: task.due_date || "",
    note: task.note || "",
  });
  const done = task.status === "done";
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const cancel = () => {
    setTitle(task.title);
    setForm({
      owner: task.owner || "Both",
      status: task.status || "todo",
      due_date: task.due_date || "",
      note: task.note || "",
    });
    setEditing(false);
  };

  const save = () => {
    data.updateTask(task.id, {
      title: title.trim() || "Untitled",
      owner: form.owner,
      status: form.status,
      note: form.note,
      due_date: form.due_date || null,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <li
        className="rounded-xl border border-[#e5e2dc] p-3"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cancel();
          }
        }}
      >
        <PanelEditor value={title} onChange={setTitle} onSave={save} onCancel={cancel} placeholder="Task title">
          <div className="mt-2 grid grid-cols-3 gap-2">
            <select value={form.owner} onChange={set("owner")} className={metaInput}>
              {OWNERS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <select value={form.status} onChange={set("status")} className={metaInput}>
              {Object.entries(TASK_STATUS).map(([v, label]) => (
                <option key={v} value={v}>{label}</option>
              ))}
            </select>
            <input type="date" value={form.due_date} onChange={set("due_date")} className={metaInput} />
          </div>
          <textarea
            value={form.note}
            onChange={set("note")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                save();
              }
            }}
            rows={2}
            placeholder="Note (optional)"
            className={`mt-2 ${metaInput}`}
          />
        </PanelEditor>
      </li>
    );
  }

  return (
    <li className="group flex items-start gap-2.5 rounded-xl border border-[#e5e2dc] p-3">
      <button
        onClick={() => data.updateTask(task.id, { status: done ? "todo" : "done" })}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
          done ? "border-[#00E676] bg-[#00E676] text-[#0c130e]" : "border-[#c9c0b2] bg-white"
        }`}
        aria-label={done ? "Mark as to do" : "Mark as done"}
        title={done ? "Mark as to do" : "Mark as done"}
      >
        {done && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path d="M2 6.5 4.8 9.2 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`text-[14px] leading-[1.55] ${done ? "text-[#9a9a9a] line-through" : "text-[#1a1a1a]"}`}>
          {task.title}
        </p>
        {task.note && <p className="mt-0.5 text-[13px] leading-[1.5] text-[#6b6b6b]">{task.note}</p>}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[12px]">
          <SheenPill tint="rgba(107,107,107,0.10)" text="#6b6b6b" className="px-2.5 py-0.5">
            {task.owner}
          </SheenPill>
          <SheenPill
            tint={done ? "rgba(0,230,118,0.15)" : task.status === "in_progress" ? "rgba(217,164,0,0.15)" : "rgba(107,107,107,0.10)"}
            text={done ? "#0c130e" : task.status === "in_progress" ? "#92600a" : "#6b6b6b"}
            className="px-2.5 py-0.5"
          >
            {TASK_STATUS[task.status]}
          </SheenPill>
          {task.due_date && <span className="text-[#6b6b6b]">Due {moment(task.due_date).format("MMM D")}</span>}
        </div>
      </div>
      <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => {
            setTitle(task.title);
            setForm({
              owner: task.owner || "Both",
              status: task.status || "todo",
              due_date: task.due_date || "",
              note: task.note || "",
            });
            setEditing(true);
          }}
          className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
          aria-label="Edit task"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => window.confirm("Delete this task?") && data.deleteTask(task.id)}
          className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#b0532f]"
          aria-label="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}