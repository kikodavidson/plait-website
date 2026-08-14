import React from "react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthIndex = (m) => MONTHS.indexOf(m);

export default function MonthSelector({ plans, selectedPlanId, onSelect }) {
  const sorted = [...plans].sort((a, b) => (a.year - b.year) || (monthIndex(a.month) - monthIndex(b.month)));
  if (sorted.length === 0) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {sorted.map((p) => {
        const active = p.id === selectedPlanId;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${active ? "bg-[#2d2d2d] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
          >
            {p.month} {p.year}
          </button>
        );
      })}
    </div>
  );
}