import React from "react";
import { ACCENT, STATUS } from "@/lib/funnelPlan";
import { nextStatus } from "@/lib/taskSections";

/**
 * The action-plan checklist item this section is the content for: shows its
 * status and lets either partner move it along without leaving the section.
 */
export default function ChecklistLink({ task, onToggle }) {
  const status = STATUS[task.status] || STATUS.not_started;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E9089]">Action plan</span>
      <button
        onClick={() => onToggle(nextStatus[task.status] || "in_progress")}
        title="Click to change status"
        className="flex items-center gap-2 rounded-full border border-[#2C2C31] px-3 py-1.5 text-[11px] font-bold text-[#A9ACA2] transition-colors hover:border-[#C8FF3D] hover:text-white"
      >
        <span
          className="h-3 w-3 shrink-0 rounded-full border-2"
          style={{
            borderColor: status.dot,
            backgroundColor: task.status === "done" ? ACCENT : "transparent",
          }}
        />
        <span className="text-left">{task.title}</span>
        <span style={{ color: status.text }}>{status.label}</span>
      </button>
    </div>
  );
}