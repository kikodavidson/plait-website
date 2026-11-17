import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PHASES, OWNERS, STEPS, ACCENT } from "@/lib/funnelPlan";

const field =
  "w-full rounded-xl border border-[#2C2C31] bg-[#0F0F11] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#5A5C55] focus:border-[#C8FF3D]";
const label = "mb-1.5 block text-[10px] uppercase tracking-[0.18em] text-[#8E9089]";

const blank = (phase) => ({
  title: "",
  phase: phase || PHASES[0].key,
  owner: "Both",
  status: "not_started",
  due_date: "",
  notes: "",
  funnel_step: "",
});

export default function TaskDialog({ open, task, defaultPhase, onClose, onSave }) {
  const [form, setForm] = useState(blank(defaultPhase));

  useEffect(() => {
    if (!open) return;
    setForm(
      task
        ? {
            title: task.title || "",
            phase: task.phase,
            owner: task.owner || "Both",
            status: task.status || "not_started",
            due_date: task.due_date || "",
            notes: task.notes || "",
            funnel_step: task.funnel_step || "",
          }
        : blank(defaultPhase)
    );
  }, [open, task, defaultPhase]);

  if (!open) return null;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      title: form.title.trim(),
      phase: form.phase,
      owner: form.owner,
      status: form.status,
      due_date: form.due_date || null,
      notes: form.notes,
      funnel_step: form.funnel_step || null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 sm:items-center sm:p-6">
      <form
        onSubmit={submit}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-[#2C2C31] bg-[#141416] p-5 sm:max-w-lg sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
            {task ? "Edit task" : "New task"}
          </p>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#8E9089] hover:text-white" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className={label}>Task</label>
            <input
              autoFocus
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="What needs doing"
              className={field}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={label}>Phase</label>
              <select value={form.phase} onChange={(e) => set("phase", e.target.value)} className={field}>
                {PHASES.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.number} · {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Owner</label>
              <select value={form.owner} onChange={(e) => set("owner", e.target.value)} className={field}>
                {OWNERS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={field}>
                <option value="not_started">Not started</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className={label}>Due date</label>
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => set("due_date", e.target.value)}
                className={field}
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>

          <div>
            <label className={label}>Funnel step it feeds</label>
            <select value={form.funnel_step} onChange={(e) => set("funnel_step", e.target.value)} className={field}>
              <option value="">Not linked</option>
              {STEPS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label}>Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Anything worth remembering"
              className={`${field} resize-none`}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#2C2C31] px-4 py-2.5 text-sm font-bold text-[#A9ACA2] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-extrabold text-black"
            style={{ backgroundColor: ACCENT }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}