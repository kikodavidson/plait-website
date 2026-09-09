import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

// Multi-select filter dropdown with checkboxes, optional in-dropdown search,
// and a "Label · N" count display when multiple values are selected.
export default function FilterMultiSelect({ label, options, values, onChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const showSearch = options.length > 10;
  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  const toggle = (opt) => {
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  };

  const btnCls = `flex items-center justify-between gap-1.5 h-9 rounded-lg border bg-white px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] ${
    values.length ? "border-[#2d2d2d] text-[#2d2d2d] font-medium" : "border-gray-200 text-gray-500"
  }`;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={`${btnCls} w-full`}>
        <span className="truncate">
          {values.length ? `${label} · ${values.length}` : label}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-40 w-max min-w-full max-w-xs rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
          {showSearch && (
            <div className="relative mb-1.5">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}…`}
                className="w-full h-8 pl-7 pr-2 rounded-md border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
              />
            </div>
          )}
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-2 py-2 text-xs text-gray-400">No matches</p>
            )}
            {filtered.map((opt) => {
              const active = values.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggle(opt)}
                  className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-gray-50"
                >
                  <span
                    className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center ${
                      active ? "bg-[#2d2d2d] border-[#2d2d2d]" : "border-gray-300 bg-white"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-white" />}
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