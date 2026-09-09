import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

// Single-select filter dropdown — dark panel to match FilterMultiSelect.
export default function FilterSingleSelect({ label, options, value, onChange, className = "" }) {
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

  const select = (opt) => {
    onChange(opt === value ? "" : opt);
    setOpen(false);
    setQuery("");
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
        <div className="absolute top-full left-0 mt-1 z-40 w-max min-w-full max-w-xs rounded-lg border border-white/10 bg-[#211c19]/95 backdrop-blur-md p-1.5 shadow-xl">
          {showSearch && (
            <div className="relative mb-1.5">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}…`}
                className="w-full h-8 pl-7 pr-2 rounded-md border border-white/15 bg-white/5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
              />
            </div>
          )}
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-2 py-2 text-xs text-white/50">No matches</p>
            )}
            {filtered.map((opt) => {
              const active = value === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => select(opt)}
                  className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md text-sm text-white hover:bg-white/10"
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