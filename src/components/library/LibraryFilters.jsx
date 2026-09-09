import React, { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  SWIPE_OPTIONS,
  FIELD_LABELS,
  REQUIRED_FIELDS,
  OPTIONAL_FIELDS,
  MULTI_SELECT_FIELDS,
} from "@/lib/swipeOptions";
import FilterMultiSelect from "./FilterMultiSelect";
import FilterSingleSelect from "./FilterSingleSelect";

const PRIMARY_WIDTHS = {
  platform: "w-[130px]",
  creative_format: "w-[160px]",
  concept: "w-[150px]",
  hook: "w-[140px]",
  angle_type: "w-[155px]",
};

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

function FilterControl({ field, filters, setFilters, className }) {
  const value = filters[field];
  if (MULTI_SELECT_FIELDS.includes(field)) {
    return (
      <FilterMultiSelect
        label={FIELD_LABELS[field]}
        options={SWIPE_OPTIONS[field]}
        values={value || []}
        onChange={(v) => setFilters({ ...filters, [field]: v })}
        className={className}
      />
    );
  }
  return (
    <FilterSingleSelect
      label={FIELD_LABELS[field]}
      options={SWIPE_OPTIONS[field]}
      value={value || ""}
      onChange={(v) => setFilters({ ...filters, [field]: v })}
      className={className}
    />
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
  const activeEntries = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].flatMap((k) => {
    const v = filters[k];
    if (Array.isArray(v)) return v.map((x) => ({ field: k, value: x }));
    return v ? [{ field: k, value: v }] : [];
  });
  const secondaryActive = OPTIONAL_FIELDS.filter(
    (k) => (Array.isArray(filters[k]) ? filters[k].length : filters[k])
  ).length;
  const hasActive = activeEntries.length > 0 || search || untaggedOnly;

  const removeValue = (field, value) => {
    const cur = filters[field];
    if (Array.isArray(cur)) {
      setFilters({ ...filters, [field]: cur.filter((v) => v !== value) });
    } else {
      setFilters({ ...filters, [field]: "" });
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brand, why it works, or tags…"
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-3">
        <div className="flex flex-wrap items-center gap-3">
          {REQUIRED_FIELDS.map((field) => (
            <FilterControl
              key={field}
              field={field}
              filters={filters}
              setFilters={setFilters}
              className={`shrink-0 ${PRIMARY_WIDTHS[field] || ""}`}
            />
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
            More Filters
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
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {OPTIONAL_FIELDS.map((field) => (
              <FilterControl key={field} field={field} filters={filters} setFilters={setFilters} />
            ))}
          </div>
        )}
      </div>

      {hasActive && (
        <div className="flex flex-wrap items-center gap-2">
          {search && <Chip label={`"${search}"`} onRemove={() => setSearch("")} />}
          {untaggedOnly && <Chip label="Untagged" onRemove={() => setUntaggedOnly(false)} />}
          {activeEntries.map(({ field, value }) => (
            <Chip
              key={`${field}-${value}`}
              label={value}
              onRemove={() => removeValue(field, value)}
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