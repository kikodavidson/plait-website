import React from "react";

const STATUS_OPTIONS = [
  { value: "Proposed", label: "Proposed" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

const STYLES = {
  "Proposed": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "In Progress": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Completed": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export default function PlanStatusCallout({ plan, isAdmin, onChange }) {
  const current = STATUS_OPTIONS.find((o) => o.value === plan?.strategy_status) || STATUS_OPTIONS[0];
  const style = STYLES[current.value] || STYLES["Proposed"];

  if (!isAdmin) {
    return (
      <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${style}`}>
        {current.label}
      </span>
    );
  }

  return (
    <select
      value={plan?.strategy_status || "Proposed"}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer focus:outline-none ${style}`}
    >
      {STATUS_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}