import React, { useState } from "react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TABS = [
  { key: "Proposed", label: "Upcoming" },
  { key: "In Progress", label: "Current" },
  { key: "Completed", label: "Completed" },
];
const BLUE = "#4F6EF7";

export default function PlanSidebar({ plans, anglesByPlan, selectedPlanId, onSelect, clientName }) {
  const [tab, setTab] = useState(null);

  const groups = TABS.map((t) => {
    const ps = plans
      .filter((p) => (p.strategy_status || "Proposed") === t.key)
      .sort((a, b) => (a.year - b.year) || (MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)));
    const count = ps.reduce((sum, p) => sum + (anglesByPlan[p.id] || 0), 0);
    return { ...t, plans: ps, count };
  });
  const active = groups.find((g) => g.key === tab) || null;

  return (
    <div>
      <h2 className="text-base font-bold text-white">{clientName ? `${clientName} ` : ""}Content gameplan</h2>
      <div className="flex gap-1 mt-3 mb-3">
        {groups.map((g) => (
          <button
            key={g.key}
            onClick={() => setTab(g.key)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${tab === g.key ? "text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
            style={tab === g.key ? { backgroundColor: BLUE } : undefined}
          >
            {g.label} ({g.count})
          </button>
        ))}
      </div>
      <div className="space-y-1">
        {!active ? (
          <p className="text-sm text-white/40 py-4">Select a category to view plans.</p>
        ) : active.plans.length === 0 ? (
          <p className="text-sm text-white/40 py-4">No {active.label.toLowerCase()} plans.</p>
        ) : (
          active.plans.map((p) => {
            const selected = p.id === selectedPlanId;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selected ? "text-white" : "hover:bg-white/10 text-white/80"}`}
                style={selected ? { backgroundColor: BLUE } : undefined}
              >
                <p className="text-sm font-bold">{p.month} {p.year}</p>
                {p.headline && <p className="text-xs opacity-70 truncate">{p.headline}</p>}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}