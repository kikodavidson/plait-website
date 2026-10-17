import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import moment from "moment";
import { SOURCE_MAP, SOURCES, STATUSES, STATUS_MAP, faviconUrl, isDue, websiteHost } from "./leadMeta";
import OwnerChip from "./OwnerChip";

const CONTROL =
  "rounded-lg border border-[#dcd5c9] bg-white px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]";

const COLUMNS = [
  { key: "brand_name", label: "Brand" },
  { key: "contact_name", label: "Contact" },
  { key: "industry", label: "Industry" },
  { key: "source", label: "Source" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
  { key: "next_follow_up", label: "Follow up" },
];

const sortVal = (lead, key) => {
  if (key === "status") return STATUSES.findIndex((s) => s.value === lead.status);
  if (key === "next_follow_up") return lead.next_follow_up || "9999";
  if (key === "source") return SOURCE_MAP[lead.source]?.label || "";
  if (key === "contact_name") return (lead.contact_name || "").toLowerCase();
  return (lead[key] || "").toString().toLowerCase();
};

/** One row per lead, sortable by every column, with filters and search. */
export default function LeadsTable({ leads, onOpen }) {
  const [sortKey, setSortKey] = useState("brand_name");
  const [dir, setDir] = useState(1);
  const [filters, setFilters] = useState({ status: "", owner: "", industry: "", source: "", q: "" });

  const industries = useMemo(
    () => [...new Set(leads.map((l) => l.industry).filter(Boolean))].sort(),
    [leads]
  );

  const rows = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return leads
      .filter(
        (l) =>
          (!filters.status || l.status === filters.status) &&
          (!filters.owner || l.owner === filters.owner) &&
          (!filters.industry || l.industry === filters.industry) &&
          (!filters.source || l.source === filters.source) &&
          (!q ||
            (l.brand_name || "").toLowerCase().includes(q) ||
            (l.contact_name || "").toLowerCase().includes(q))
      )
      .sort((a, b) => {
        const va = sortVal(a, sortKey);
        const vb = sortVal(b, sortKey);
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
  }, [leads, filters, sortKey, dir]);

  const pickSort = (key) => {
    if (key === sortKey) setDir((d) => -d);
    else {
      setSortKey(key);
      setDir(1);
    }
  };

  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="mt-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            value={filters.q}
            onChange={setFilter("q")}
            placeholder="Search brand or contact"
            className={`${CONTROL} w-52 pl-8`}
          />
        </div>
        <select value={filters.status} onChange={setFilter("status")} className={CONTROL}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select value={filters.owner} onChange={setFilter("owner")} className={CONTROL}>
          <option value="">All owners</option>
          <option value="Luke">Luke</option>
          <option value="Max">Max</option>
        </select>
        <select value={filters.industry} onChange={setFilter("industry")} className={CONTROL}>
          <option value="">All industries</option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <select value={filters.source} onChange={setFilter("source")} className={CONTROL}>
          <option value="">All sources</option>
          {SOURCES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#e5e2dc]">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#e5e2dc] bg-[#faf9f7]">
              {COLUMNS.map((c) => (
                <th key={c.key} className="px-3 py-2">
                  <button
                    onClick={() => pickSort(c.key)}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6b6b6b] hover:text-[#1a1a1a]"
                  >
                    {c.label}
                    {sortKey === c.key &&
                      (dir === 1 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      ))}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const s = STATUS_MAP[l.status] || STATUSES[0];
              const icon = faviconUrl(l.website);
              return (
                <tr
                  key={l.id}
                  onClick={() => onOpen(l.id)}
                  className="cursor-pointer border-b border-[#f0eeea] transition-colors last:border-b-0 hover:bg-[#faf9f7]"
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      {icon && <img src={icon} alt="" className="h-4 w-4 shrink-0 rounded-sm" />}
                      <span className="max-w-[180px] truncate text-[14px] font-semibold text-[#1a1a1a]">
                        {l.brand_name}
                      </span>
                    </div>
                    {l.website && (
                      <span className="text-[12px] text-[#9a9a9a]">{websiteHost(l.website)}</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="text-[13.5px] text-[#1a1a1a]">{l.contact_name || "—"}</p>
                    {l.contact_email && (
                      <p className="text-[12px] text-[#9a9a9a]">{l.contact_email}</p>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-[13px] text-[#6b6b6b]">{l.industry || "—"}</td>
                  <td className="px-3 py-2.5 text-[13px] text-[#6b6b6b]">
                    {SOURCE_MAP[l.source]?.label || l.source || "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    <OwnerChip owner={l.owner} />
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11.5px] font-semibold"
                      style={{ backgroundColor: `${s.color}1a`, color: s.color }}
                    >
                      {s.label}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-[13px]">
                    {l.next_follow_up ? (
                      <span className={isDue(l) ? "font-semibold text-[#b0532f]" : "text-[#6b6b6b]"}>
                        {moment(l.next_follow_up).format("MMM D")}
                        {isDue(l) ? " · due" : ""}
                      </span>
                    ) : (
                      <span className="text-[#c4c4c4]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="px-3 py-6 text-center text-[13px] text-[#9a9a9a]">
            No leads match — try clearing the filters.
          </p>
        )}
      </div>
    </div>
  );
}