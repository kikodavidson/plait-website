import React, { useEffect, useRef } from "react";
import { ACCENT, ACCENT_TEXT } from "./accent";

/**
 * Shared side-panel editor: a full-width auto-growing text box (3 lines tall)
 * with a right-aligned Cancel + accent Save row. Enter saves, Shift+Enter adds
 * a line, Esc cancels. Optional children render between the text box and the
 * buttons (extra form fields).
 */
export default function PanelEditor({ value, onChange, onSave, onCancel, placeholder = "", children = null }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div>
      <textarea
        ref={ref}
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSave();
          } else if (e.key === "Escape") {
            e.preventDefault();
            onCancel();
          }
        }}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[14px] leading-[1.55] text-[#1a1a1a] outline-none focus:border-[#00E676]"
      />
      {children}
      <div className="mt-2 flex items-center justify-end gap-1.5">
        <button
          onClick={onCancel}
          className="h-8 px-3 text-[13px] text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="h-8 rounded-full px-4 text-[13px] font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
        >
          Save
        </button>
      </div>
    </div>
  );
}