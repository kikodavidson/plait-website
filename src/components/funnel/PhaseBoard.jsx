import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ACCENT, PHASES, byOrder } from "@/lib/funnelPlan";
import TaskRow from "./TaskRow";
import TaskDialog from "./TaskDialog";
import ProgressBar from "./ProgressBar";

export default function PhaseBoard({ data, userName, onJump }) {
  const [dialog, setDialog] = useState({ open: false, task: null, phase: PHASES[0].key });

  const openNew = (phase) => setDialog({ open: true, task: null, phase });
  const openEdit = (task) => setDialog({ open: true, task, phase: task.phase });
  const close = () => setDialog((d) => ({ ...d, open: false }));

  const save = (values) => {
    if (dialog.task) data.updateTask(dialog.task.id, values);
    else data.addTask(values);
  };

  return (
    <div className="space-y-4">
      {PHASES.map((phase) => {
        const list = byOrder(data.tasks.filter((t) => t.phase === phase.key));
        const done = list.filter((t) => t.status === "done").length;
        const pct = list.length ? Math.round((done / list.length) * 100) : 0;

        return (
          <div key={phase.key} className="rounded-3xl border border-[#26262A] bg-[#141416] p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[12px] font-extrabold text-black"
                style={{ backgroundColor: ACCENT }}
              >
                {phase.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-extrabold leading-tight text-white sm:text-base">{phase.label}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#8E9089]">
                  {done} of {list.length} done
                </p>
              </div>
              <button
                onClick={() => openNew(phase.key)}
                className="flex items-center gap-1.5 rounded-full border border-[#2C2C31] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#A9ACA2] transition-colors hover:border-[#C8FF3D] hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>

            <div className="mt-3">
              <ProgressBar value={pct} />
            </div>

            <div className="mt-3 space-y-2">
              {list.length === 0 && <p className="text-[12px] text-[#5A5C55]">No tasks in this phase yet.</p>}
              {list.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  comments={data.comments.filter((c) => c.task_id === task.id)}
                  onPatch={(patch) => data.updateTask(task.id, patch)}
                  onEdit={() => openEdit(task)}
                  onDelete={() => {
                    if (window.confirm("Delete this task and its comments?")) data.deleteTask(task.id);
                  }}
                  onMove={(dir) => data.moveTask(task.id, dir)}
                  onJump={onJump}
                  onAddComment={(body) => data.addComment(task.id, body, userName)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <TaskDialog
        open={dialog.open}
        task={dialog.task}
        defaultPhase={dialog.phase}
        onClose={close}
        onSave={save}
      />
    </div>
  );
}