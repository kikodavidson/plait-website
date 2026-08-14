import React, { useState } from "react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const GROUPS = [
  { key: "Proposed", label: "Upcoming" },
  { key: "In Progress", label: "Current" },
  { key: "Completed", label: "Completed" },
];
const BLUE = "#4F6EF7";

export default function PlanSidebar({ plans, anglesByPlan, selectedPlanId, onSelect, clientName }) {
  const [activeKey, setActiveKey] = useState("Proposed");

  const groups = GROUPS.map((g) => {
    const ps = plans
      .filter((p) => (p.strategy_status || "Proposed") === g.key)
      .sort((a, b) => (a.year - b.year) || (MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)));
    return { ...g, plans: ps, count: ps.length };
  });
  const active = groups.find((g) => g.key === activeKey) || groups[0];

  return (
    <div>
      <div className="flex items-center gap-2">
        {groups.map((g) => {
          const isActive = g.key === activeKey;
          return (
            <button
              key={g.key}
              onClick={() => setActiveKey(g.key)}
              className="text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={isActive ? { backgroundColor: BLUE, color: "#fff" } : { color: "rgba(255,255,255,0.6)" }}
            >
              {g.label} ({g.count})
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {active.plans.length === 0 ? (
          <p className="text-xs text-white/30">No {active.label.toLowerCase()} plans.</p>
        ) : (
          active.plans.map((p) => {
            const selected = p.id === selectedPlanId;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className="text-left px-3 py-2 rounded-lg transition-colors max-w-[220px]"
                style={selected ? { backgroundColor: BLUE, color: "#fff" } : { color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.06)" }}
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