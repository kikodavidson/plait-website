import React, { useState } from "react";
import { Plus } from "lucide-react";
import TaskRow from "./TaskRow";

export const TASK_STATUS = { todo: "To Do", in_progress: "In Progress", done: "Done" };

const selectClass =
  "rounded-lg border border-[#e5e2dc] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#619e80]";

export default function TasksSection({ tab, tasks, data }) {
  const [owner, setOwner] = useState("all");
  const [status, setStatus] = useState("all");

  const add = () =>
    data.addTask(tab.id, { title: "New task", owner: "Both", status: "todo", note: "", due_date: null });

  const visible = tasks.filter(
    (t) => (owner === "all" || t.owner === owner) && (status === "all" || t.status === status)
  );

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[22px]">Tasks</h2>
        <div className="flex flex-wrap items-center gap-2">
          <select value={owner} onChange={(e) => setOwner(e.target.value)} className={selectClass}>
            <option value="all">All owners</option>
            <option value="Luke">Luke</option>
            <option value="Max">Max</option>
            <option value="Both">Both</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="all">All statuses</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#619e80]"
          >
            <Plus className="h-4 w-4" /> Add task
          </button>
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#e5e2dc] px-4 py-8 text-center text-[15px] text-[#6b6b6b]">
          No tasks here.
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((t) => (
            <TaskRow key={t.id} task={t} data={data} />
          ))}
        </ul>
      )}
    </section>
  );
}