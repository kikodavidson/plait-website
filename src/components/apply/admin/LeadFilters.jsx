import React from "react";
import { RESULT_META, optionLabel } from "@/lib/applyQuestions";

export default function LeadFilters({ filters, onChange, leads }) {
  const industries = [...new Set(leads.map((lead) => lead.sells).filter(Boolean))];
  const spends = [...new Set(leads.map((lead) => lead.ad_spend).filter(Boolean))];

  const selectClass =
    "rounded-full border border-[#e5e2dc] bg-white px-3.5 py-2 text-[13px] text-[#3a3a3a] outline-none focus:border-[#619e80]";

  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={filters.result}
        onChange={(e) => onChange({ ...filters, result: e.target.value })}
        className={selectClass}
      >
        <option value="all">All results</option>
        {Object.entries(RESULT_META).map(([value, meta]) => (
          <option key={value} value={value}>
            {meta.label}
          </option>
        ))}
      </select>

      <select
        value={filters.industry}
        onChange={(e) => onChange({ ...filters, industry: e.target.value })}
        className={selectClass}
      >
        <option value="all">All industries</option>
        {industries.map((value) => (
          <option key={value} value={value}>
            {optionLabel("sells", value)}
          </option>
        ))}
      </select>

      <select
        value={filters.spend}
        onChange={(e) => onChange({ ...filters, spend: e.target.value })}
        className={selectClass}
      >
        <option value="all">All ad spend</option>
        {spends.map((value) => (
          <option key={value} value={value}>
            {optionLabel("ad_spend", value)}
          </option>
        ))}
      </select>
    </div>
  );
}