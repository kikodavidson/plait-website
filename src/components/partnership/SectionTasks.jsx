import React from "react";
import { Plus } from "lucide-react";
import TaskRow from "./TaskRow";

export default function SectionTasks({ section, tasks, data }) {
  const open = tasks.filter((t) => t.status !== "done");
  const done = tasks.filter((t) => t.status === "done");
  const add = () =>
    data.addTask(section, { title: "New task", owner: "Both", status: "todo", note: "", due_date: null });

  return (
    <div className="mt-5 border-t border-[#efece8] pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-[#6b6b6b]">Tasks</h4>
        <button
          onClick={add}
          className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-[13px] text-[#9a9a9a]">No tasks.</p>
      ) : (
        <ul className="space-y-2">
          {[...open, ...done].map((t) => (
            <TaskRow key={t.id} task={t} data={data} />
          ))}
        </ul>
      )}
    </div>
  );
}