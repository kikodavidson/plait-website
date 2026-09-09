import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

// Single-select filter dropdown — solid dark panel matching FilterMultiSelect.
export default function FilterSingleSelect({ label, options, value, onChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const select = (opt) => {
    onChange(opt === value ? "" : opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-1.5 h-9 rounded-lg border bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] w-full ${
          value ? "border-[#2d2d2d] text-[#2d2d2d] font-medium" : "border-gray-200 text-gray-500"
        }`}
      >
        <span className="truncate">{value || label}</span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-40 w-max min-w-full max-w-xs rounded-md border border-[#4a4542] bg-[#2c2826] p-1.5 shadow-xl">
          <div className="max-h-64 overflow-y-auto">
            {options.map((opt) => {
              const active = value === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => select(opt)}
                  className="flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-md text-sm text-white hover:bg-white/10"
                >
                  <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                    {active && <Check className="w-3.5 h-3.5 text-white" />}
                  </span>
                  <span className="truncate">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}