import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthIndex = (m) => MONTHS.indexOf(m);

export default function MonthSelector({ plans, selectedPlanId, onSelect, onReveal }) {
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
    <div className="relative" ref={ref}>
      <button
        onClick={handleToggle}
        className="inline-flex items-center gap-2 bg-[#222222] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2d2d2d] transition-colors"
      >
        {selected ? `${selected.month} ${selected.year}` : "Select a month"}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1 max-h-64 overflow-y-auto">
          {sorted.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${p.id === selectedPlanId ? "font-bold text-[#222222]" : "text-gray-600"}`}
            >
              {p.month} {p.year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}