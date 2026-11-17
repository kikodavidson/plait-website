import React, { useState } from "react";
import moment from "moment";
import { ArrowDown, ArrowRight, ArrowUp, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { ACCENT, STATUS, STEPS } from "@/lib/funnelPlan";
import { sectionForTask } from "@/lib/taskSections";
import TaskComments from "./TaskComments";

const NEXT = { not_started: "in_progress", in_progress: "done", done: "not_started" };
const action = "rounded-lg p-1.5 text-[#5A5C55] transition-colors hover:bg-[#222226] hover:text-white";

export default function TaskRow({ task, comments, onPatch, onEdit, onDelete, onMove, onAddComment, onJump }) {
  const [showComments, setShowComments] = useState(false);
  const status = STATUS[task.status] || STATUS.not_started;
  const stepLabel = (STEPS.find((s) => s.key === task.funnel_step) || {}).label;
  const section = sectionForTask(task.title);

  return (
    <div className="rounded-2xl border border-[#26262A] bg-[#0F0F11] p-3">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onPatch({ status: NEXT[task.status] || "in_progress" })}
          className="mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-colors"
          style={{ borderColor: status.dot, backgroundColor: task.status === "done" ? ACCENT : "transparent" }}
          aria-label="Change status"
          title={status.label}
        />

        <div className="min-w-0 flex-1">
          <p
            className={`text-[15px] font-extrabold leading-snug ${
              task.status === "done" ? "text-white/35 line-through" : "text-white"
            }`}
          >
            {task.title}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-[#8E9089]">
            <span>{task.owner || "Both"}</span>
            <span style={{ color: status.text }}>{status.label}</span>
            {task.due_date && <span>{moment(task.due_date).format("MMM D")}</span>}
            {stepLabel && <span style={{ color: ACCENT }}>{stepLabel}</span>}
          </div>
          {section && (
            <button
              onClick={() => onJump && onJump(section.id)}
              className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#2C2C31] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-[#C8FF3D] hover:text-white"
              style={{ color: ACCENT }}
            >
              {section.label} <ArrowRight className="h-3 w-3" />
            </button>
          )}
          {task.notes && (
            <p className="mt-2 whitespace-pre-wrap text-[12px] leading-relaxed text-[#A9ACA2]">{task.notes}</p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
          <button onClick={() => onMove(-1)} className={action} aria-label="Move up">
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onMove(1)} className={action} aria-label="Move down">
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setShowComments((v) => !v)}
            className={`${action} flex items-center gap-1`}
            aria-label="Comments"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {comments.length > 0 && <span className="text-[10px] font-bold">{comments.length}</span>}
          </button>
          <button onClick={onEdit} className={action} aria-label="Edit task">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={onDelete} className={action} aria-label="Delete task">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {showComments && <TaskComments comments={comments} onAdd={onAddComment} />}
    </div>
  );
}