import React from "react";
import { Search, X } from "lucide-react";
import { SWIPE_OPTIONS, FIELD_LABELS } from "@/lib/swipeOptions";

export default function LibraryFilters({ search, setSearch, filters, setFilters, onClear }) {
  const activeCount = Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brand, why it works, or tags…"
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {Object.keys(SWIPE_OPTIONS).map((key) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]"
          >
            <option value="">{FIELD_LABELS[key] || key.replace("_", " ")}</option>
            {SWIPE_OPTIONS[key].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}
        {activeCount > 0 && (
          <div className="flex items-center gap-2 ml-1">
            <span className="text-xs font-medium text-gray-500">{activeCount} active</span>
            <button onClick={onClear} className="inline-flex items-center gap-1 text-xs font-medium text-[#2d2d2d] hover:underline">
              <X className="w-3 h-3" /> Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}