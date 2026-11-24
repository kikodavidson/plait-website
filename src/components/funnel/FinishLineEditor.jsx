import React, { useState } from "react";
import { Plus } from "lucide-react";
import { byOrder } from "@/lib/funnelPlan";
import FinishLineRow from "./FinishLineRow";

export default function FinishLineEditor({ data }) {
  const [focusId, setFocusId] = useState(null);
  const lines = byOrder(data.tasks.filter((t) => t.phase === "finish_line"));

  const add = async () => {
    const created = await data.addTask({
      phase: "finish_line",
      title: "",
      owner: "Both",
      status: "not_started",
    });
    if (created) setFocusId(created.id);
  };

  return (
    <div>
      {lines.length === 0 && (
        <p className="py-6 text-[14px] text-[#9a9a9a]">No lines yet. Add the first one.</p>
      )}

      {lines.map((task) => (
        <FinishLineRow
          key={task.id}
          task={task}
          autoFocus={task.id === focusId}
          onPatch={(patch) => data.updateTask(task.id, patch)}
          onDelete={data.deleteTask}
        />
      ))}

      <button
        onClick={add}
        className="mt-5 flex items-center gap-2 rounded-full border border-[#e5e2dc] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors hover:border-[#619e80] hover:text-[#1a1a1a]"
      >
        <Plus className="h-3.5 w-3.5 text-[#619e80]" /> Add line
      </button>
    </div>
  );
}