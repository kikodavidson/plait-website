import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const GROUPS = [
  { key: "Proposed", label: "Upcoming" },
  { key: "In Progress", label: "Current" },
  { key: "Completed", label: "Completed" },
];
const BLUE = "#4F6EF7";

export default function PlanSidebar({ plans, anglesByPlan, selectedPlanId, onSelect, clientName }) {
  const [openKeys, setOpenKeys] = useState({ Proposed: true, "In Progress": false, Completed: false });

  const groups = GROUPS.map((g) => {
    const ps = plans
      .filter((p) => (p.strategy_status || "Proposed") === g.key)
      .sort((a, b) => (a.year - b.year) || (MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)));
    return { ...g, plans: ps, count: ps.length };
  });

  const toggle = (key) => setOpenKeys((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="flex flex-col">
      <h2 className="text-base font-bold text-white mb-4">{clientName ? `${clientName} ` : ""}Content gameplan</h2>
      <div className="flex flex-col gap-1">
        {groups.map((g) => {
          const open = openKeys[g.key];
          return (
            <div key={g.key}>
              <button
                onClick={() => toggle(g.key)}
                className="w-full flex items-center gap-2 text-left px-2 py-2 text-white/80 hover:text-white"
              >
                <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
                <span className="text-sm font-semibold flex-1">{g.label}</span>
                {open && g.count > 0 && (
                  <span className="text-xs text-white/50">Show {g.count}</span>
                )}
              </button>
              {open && (
                <div className="ml-6 mt-1 space-y-1">
                  {g.plans.length === 0 ? (
                    <p className="text-xs text-white/30 px-2 py-1">No {g.label.toLowerCase()} plans.</p>
                  ) : (
                    g.plans.map((p) => {
                      const selected = p.id === selectedPlanId;
                      return (
                        <button
                          key={p.id}
                          onClick={() => onSelect(p.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selected ? "text-white" : "hover:bg-white/10 text-white/70"}`}
                          style={selected ? { backgroundColor: BLUE } : undefined}
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
      </div>
    </div>
  );
}