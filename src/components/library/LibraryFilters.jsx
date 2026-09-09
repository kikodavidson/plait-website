import React, { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { SWIPE_OPTIONS, FIELD_LABELS, REQUIRED_FIELDS, OPTIONAL_FIELDS } from "@/lib/swipeOptions";

const selectCls =
  "h-9 rounded-lg border border-gray-200 bg-white px-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]";

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#2d2d2d] text-white text-xs pl-2.5 pr-1.5 py-1">
      {label}
      <button onClick={onRemove} className="rounded-full hover:bg-white/20 p-0.5" aria-label={`Remove ${label}`}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function FilterSelect({ field, filters, setFilters }) {
  return (
    <select
      value={filters[field]}
      onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
      className={selectCls}
    >
      <option value="">{FIELD_LABELS[field]}</option>
      {SWIPE_OPTIONS[field].map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function LibraryFilters({
  search,
  setSearch,
  filters,
  setFilters,
  onClear,
  resultCount,
  untaggedOnly,
  setUntaggedOnly,
}) {
  const [showMore, setShowMore] = useState(false);
  const activeKeys = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].filter((k) => filters[k]);
  const secondaryActive = OPTIONAL_FIELDS.filter((k) => filters[k]).length;
  const hasActive = activeKeys.length > 0 || search || untaggedOnly;

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
        {REQUIRED_FIELDS.map((key) => (
          <FilterSelect key={key} field={key} filters={filters} setFilters={setFilters} />
        ))}
        <button
          onClick={() => setShowMore((s) => !s)}
          className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium border transition-colors ${
            showMore || secondaryActive
              ? "bg-[#2d2d2d] text-white border-[#2d2d2d]"
              : "bg-white text-[#2d2d2d] border-gray-200 hover:bg-gray-50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          More filters
          {secondaryActive > 0 && (
            <span className="bg-white/20 rounded-full px-1.5 text-xs">{secondaryActive}</span>
          )}
        </button>
        <button
          onClick={() => setUntaggedOnly(!untaggedOnly)}
          className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium border transition-colors ${
            untaggedOnly
              ? "bg-amber-100 text-amber-800 border-amber-300"
              : "bg-white text-[#2d2d2d] border-gray-200 hover:bg-gray-50"
          }`}
        >
          Untagged
        </button>
        <span className="text-xs font-medium text-gray-500 ml-auto">
          {resultCount} result{resultCount === 1 ? "" : "s"}
        </span>
      </div>

      {showMore && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
          {OPTIONAL_FIELDS.map((key) => (
            <FilterSelect key={key} field={key} filters={filters} setFilters={setFilters} />
          ))}
        </div>
      )}

      {hasActive && (
        <div className="flex flex-wrap items-center gap-2">
          {search && <Chip label={`"${search}"`} onRemove={() => setSearch("")} />}
          {untaggedOnly && <Chip label="Untagged" onRemove={() => setUntaggedOnly(false)} />}
          {activeKeys.map((k) => (
            <Chip
              key={k}
              label={`${FIELD_LABELS[k]}: ${filters[k]}`}
              onRemove={() => setFilters({ ...filters, [k]: "" })}
            />
          ))}
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2d2d2d] hover:underline"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        </div>
      )}
    </div>
  );
}