import React from "react";

const STATUS_OPTIONS = [
  { value: "Proposed", label: "Proposed" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

const STYLES = {
  "Proposed": "bg-amber-100 text-amber-800 border-amber-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  "Completed": "bg-emerald-100 text-emerald-800 border-emerald-200",
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