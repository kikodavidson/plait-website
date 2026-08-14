import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthIndex = (m) => MONTHS.indexOf(m);

export default function MonthSelector({ plans, selectedPlanId, onSelect, onReveal, accent = "#2d2d2d" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const sorted = [...plans].sort((a, b) => (a.year - b.year) || (monthIndex(a.month) - monthIndex(b.month)));
  const selected = plans.find((p) => p.id === selectedPlanId);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => {
    setOpen((o) => {
      const next = !o;
      if (next) onReveal?.();
      return next;
    });
  };

  const handleSelect = (id) => {
    onSelect(id);
    onReveal?.();
    setOpen(false);
  };

  if (sorted.length === 0) return null;

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <button
        onClick={handleToggle}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-[#E9E2D6] text-[#2B2B2B] px-5 py-3 rounded-full text-sm font-semibold hover:border-[#2B2B2B] transition-colors"
      >
        {selected ? `${selected.month} ${selected.year}` : "Select a month"}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: open ? accent : undefined }} />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-48 bg-white rounded-xl border border-[#E9E2D6] py-1 max-h-64 overflow-y-auto">
          {sorted.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F5F1E9] transition-colors"
              style={{ color: p.id === selectedPlanId ? accent : "#6B6258", fontWeight: p.id === selectedPlanId ? 600 : 400 }}
            >
              {p.month} {p.year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}