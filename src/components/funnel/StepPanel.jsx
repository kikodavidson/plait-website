import React, { useState } from "react";
import { X } from "lucide-react";
import { STATUS } from "@/lib/funnelPlan";

const NEXT = { not_started: "in_progress", in_progress: "done", done: "not_started" };
const box =
  "w-full rounded-xl border border-[#e5e2dc] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none placeholder:text-[#b3aea6] focus:border-[#619e80]";
const cap = "text-[10px] uppercase tracking-[0.2em] text-[#9a9a9a]";

export default function StepPanel({ step, linkedTasks, allTasks, notes, onSaveNotes, onLink, onUnlink, onPatchTask }) {
  const [draft, setDraft] = useState(notes || "");
  const available = allTasks.filter((t) => t.funnel_step !== step.key);

  return (
    <div className="mt-3 rounded-2xl border border-[#e5e2dc] bg-white p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#619e80]">{step.label}</p>
      <p className="mt-1 text-[13px] text-[#6b6b6b]">{step.blurb}</p>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <p className={cap}>Linked tasks</p>
          <div className="mt-2 space-y-2">
            {linkedTasks.length === 0 && <p className="text-[12px] text-[#9a9a9a]">Nothing linked yet.</p>}
            {linkedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 rounded-xl border border-[#efece8] bg-[#faf9f7] px-3 py-2"
              >
                <button
                  onClick={() => onPatchTask(task.id, { status: NEXT[task.status] || "in_progress" })}
                  className="h-3 w-3 shrink-0 rounded-full border border-[#e5e2dc]"
                  style={{ backgroundColor: (STATUS[task.status] || STATUS.not_started).dot }}
                  aria-label="Change status"
                />
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#1a1a1a]">{task.title}</p>
                <button
                  onClick={() => onUnlink(task.id)}
                  className="text-[#b3aea6] transition-colors hover:text-[#b0532f]"
                  aria-label="Unlink task"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <select
            value=""
            onChange={(e) => e.target.value && onLink(e.target.value)}
            className={`${box} mt-3`}
          >
            <option value="">Link a task…</option>
            {available.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className={cap}>Notes</p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => onSaveNotes(step.key, draft)}
            rows={8}
            placeholder={`What has to happen at the ${step.label.toLowerCase()} step?`}
            className={`${box} mt-2 resize-none`}
          />
          <p className="mt-1 text-[10px] text-[#b3aea6]">Saves when you click away.</p>
        </div>
      </div>
    </div>
  );
}