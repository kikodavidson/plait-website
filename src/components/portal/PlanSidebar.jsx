import React, { useState } from "react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const GROUPS = [
  { key: "Proposed", label: "Upcoming" },
  { key: "In Progress", label: "Current" },
  { key: "Completed", label: "Completed" },
];
const BLUE = "#4F6EF7";

export default function PlanSidebar({ plans, anglesByPlan, selectedPlanId, onSelect, clientName, onNavigate }) {
  const [activeKey, setActiveKey] = useState("Proposed");

  const groups = GROUPS.map((g) => {
    const ps = plans
      .filter((p) => (p.strategy_status || "Proposed") === g.key)
      .sort((a, b) => (a.year - b.year) || (MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)));
    return { ...g, plans: ps, count: ps.length };
  });

  const handleSelectPlan = (id) => {
    onSelect(id);
    onNavigate?.();
  };

  return (
    <div className="flex flex-col text-white px-4 py-5">
      <h2 className="text-base font-bold mb-4">{clientName ? `${clientName} Content Gameplan` : "Content Gameplan"}</h2>
      <nav className="flex flex-col gap-1">
        {groups.map((g) => {
          const isActive = g.key === activeKey;
          return (
            <div key={g.key}>
              <button
                onClick={() => setActiveKey(g.key)}
                className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg transition-colors"
                style={isActive ? { backgroundColor: BLUE, color: "#fff" } : { color: "rgba(255,255,255,0.8)" }}
              >
                <span className="text-sm font-semibold">{g.label}</span>
                <span className="text-xs opacity-70">{g.count}</span>
              </button>
              {isActive && (
                <div className="mt-1 mb-2 flex flex-col gap-1 border-l border-white/10 ml-3 pl-3">
                  {g.plans.length === 0 ? (
                    <p className="text-xs text-white/30 px-2 py-1">No {g.label.toLowerCase()} plans.</p>
                  ) : (
                    g.plans.map((p) => {
                      const selected = p.id === selectedPlanId;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPlan(p.id)}
                          className="w-full text-left px-2 py-2 rounded-lg transition-colors"
                          style={selected ? { backgroundColor: BLUE, color: "#fff" } : { color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.04)" }}
                        >
                          <p className="text-sm font-bold">{p.month} {p.year}</p>
                          {p.headline && <p className="text-xs opacity-70 truncate">{p.headline}</p>}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}