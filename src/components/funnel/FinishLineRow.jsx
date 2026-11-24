import React, { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { ACCENT } from "@/lib/funnelPlan";

export default function FinishLineRow({ task, autoFocus, onPatch, onDelete }) {
  const [title, setTitle] = useState(task.title || "");
  const timer = useRef(null);
  const focused = useRef(false);
  const area = useRef(null);
  const done = task.status === "done";

  useEffect(() => {
    if (!focused.current) setTitle(task.title || "");
  }, [task.title]);

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 40)}px`;
  }, [title]);

  useEffect(() => {
    if (autoFocus && area.current) {
      focused.current = true;
      area.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const change = (value) => {
    setTitle(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onPatch({ title: value }), 600);
  };

  const flush = () => {
    focused.current = false;
    clearTimeout(timer.current);
    if ((task.title || "") !== title) onPatch({ title });
  };

  return (
    <div className="group flex items-start gap-3 border-b border-[#efece8] py-3 last:border-b-0">
      <button
        onClick={() => onPatch({ status: done ? "not_started" : "done" })}
        className="mt-2 h-4 w-4 shrink-0 rounded-full border-2 transition-colors"
        style={{ borderColor: done ? ACCENT : "#c9c4bb", backgroundColor: done ? ACCENT : "transparent" }}
        aria-label={done ? "Mark as not done" : "Mark as done"}
      />

      <textarea
        ref={area}
        value={title}
        placeholder="Write your line…"
        rows={1}
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={flush}
        onChange={(e) => change(e.target.value)}
        className={`w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-[#b3aea6] ${
          done ? "text-[#9a9a9a] line-through" : "text-[#1a1a1a]"
        }`}
      />

      <button
        onClick={() => onDelete(task.id)}
        className="mt-1.5 rounded-lg p-1.5 text-[#c9c4bb] transition-colors hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
        aria-label="Delete line"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}