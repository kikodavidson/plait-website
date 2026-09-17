import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Renders text with `backtick` spans as inline code.
function HowText({ text }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <code key={i} className="px-1 py-0.5 rounded bg-gray-100 text-[12px] font-mono text-gray-800">
            {p}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function TaskRow({ task, progress, onToggle, onNote }) {
  const [showHow, setShowHow] = useState(false);
  const [note, setNote] = useState(progress?.note || "");
  const done = !!progress?.completed;

  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0">
      <Checkbox checked={done} onCheckedChange={(v) => onToggle(task.id, !!v)} className="mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-relaxed ${done ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.task}
        </p>
        {task.how && (
          <>
            <button
              onClick={() => setShowHow((s) => !s)}
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-orange-600 hover:underline"
            >
              <ChevronRight className={`w-3 h-3 transition-transform ${showHow ? "rotate-90" : ""}`} />
              How
            </button>
            {showHow && (
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed bg-gray-50 border border-gray-100 rounded-md px-2.5 py-2">
                <HowText text={task.how} />
              </p>
            )}
          </>
        )}
      </div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={() => {
          if ((progress?.note || "") !== note) onNote(task.id, note);
        }}
        placeholder="Note"
        className="w-44 shrink-0 text-xs rounded-md border border-gray-200 px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
      />
    </div>
  );
}