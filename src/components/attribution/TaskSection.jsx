import React from "react";
import { ChevronDown } from "lucide-react";
import TaskRow from "./TaskRow";

export default function TaskSection({ section, open, onToggleOpen, progressByTask, onToggleTask, onNote, showOnlyIncomplete }) {
  const done = section.tasks.filter((t) => progressByTask[t.id]?.completed).length;
  const visibleTasks = showOnlyIncomplete
    ? section.tasks.filter((t) => !progressByTask[t.id]?.completed)
    : section.tasks;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left"
      >
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
        <span className="font-bold text-sm text-gray-900 flex-1">{section.title}</span>
        <span className="text-xs text-gray-500 shrink-0">
          {done} / {section.tasks.length}
        </span>
      </button>
      {open && visibleTasks.length > 0 && (
        <div className="border-t border-gray-100">
          {visibleTasks.map((t) => (
            <TaskRow key={t.id} task={t} progress={progressByTask[t.id]} onToggle={onToggleTask} onNote={onNote} />
          ))}
        </div>
      )}
      {open && visibleTasks.length === 0 && (
        <div className="border-t border-gray-100 px-4 py-4 text-xs text-gray-400">
          All tasks in this section are done.
        </div>
      )}
    </div>
  );
}