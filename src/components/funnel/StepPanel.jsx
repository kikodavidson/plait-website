import React, { useState } from "react";
import { X } from "lucide-react";
import { ACCENT, STATUS } from "@/lib/funnelPlan";

const NEXT = { not_started: "in_progress", in_progress: "done", done: "not_started" };
const box = "w-full rounded-xl border border-[#2C2C31] bg-[#0F0F11] px-3 py-2 text-sm text-white outline-none";
const cap = "text-[10px] uppercase tracking-[0.2em] text-[#8E9089]";

export default function StepPanel({ step, linkedTasks, allTasks, notes, onSaveNotes, onLink, onUnlink, onPatchTask }) {
  const [draft, setDraft] = useState(notes || "");
  const available = allTasks.filter((t) => t.funnel_step !== step.key);

  return (
    <div className="mt-3 rounded-3xl border border-[#26262A] bg-[#141416] p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
        {step.label}
      </p>
      <p className="mt-1 text-[13px] text-[#A9ACA2]">{step.blurb}</p>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <p className={cap}>Linked tasks</p>
          <div className="mt-2 space-y-2">
            {linkedTasks.length === 0 && <p className="text-[12px] text-[#5A5C55]">Nothing linked yet.</p>}
            {linkedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 rounded-xl border border-[#26262A] bg-[#0F0F11] px-3 py-2"
              >
                <button
                  onClick={() => onPatchTask(task.id, { status: NEXT[task.status] || "in_progress" })}
                  className="h-3 w-3 shrink-0 rounded-full border"
                  style={{ backgroundColor: (STATUS[task.status] || STATUS.not_started).dot, borderColor: "#0F0F11" }}
                  aria-label="Change status"
                />
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-white">{task.title}</p>
                <button
                  onClick={() => onUnlink(task.id)}
                  className="text-[#5A5C55] transition-colors hover:text-white"
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
            style={{ colorScheme: "dark" }}
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
          <p className="mt-1 text-[10px] text-[#5A5C55]">Saves when you click away.</p>
        </div>
      </div>
    </div>
  );
}