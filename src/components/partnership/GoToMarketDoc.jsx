import React, { useState } from "react";
import moment from "moment";
import { ChevronDown } from "lucide-react";
import { ACCENT } from "./accent";
import { STAGES } from "./stageMeta";

const lockedLabel = (section) =>
  section.approved_luke ? "Luke" : section.approved_max ? "Max" : null;

/**
 * Go-to-market doc: every locked section, grouped by tab, in one branded page.
 * Only final-approved (locked) work appears here.
 */
export default function GoToMarketDoc({ data }) {
  const { tabs, sections, versions } = data;
  const [collapsed, setCollapsed] = useState({});
  const toggle = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  const lockedDate = (sectionId) => {
    const v = versions.find((x) => x.section_id === sectionId && x.kind === "locked");
    return v ? moment(v.created_date).format("MMM D, YYYY") : null;
  };

  const groups = tabs
    .map((tab) => ({
      tab,
      items: sections.filter((s) => s.tab_id === tab.id && s.stage === "locked"),
    }))
    .filter((g) => g.items.length > 0);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const openGroups = tabs
    .map((tab) => ({
      tab,
      items: sections.filter((s) => s.tab_id === tab.id && s.stage !== "locked"),
    }))
    .filter((g) => g.items.length > 0);

  const openTotal = openGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="fade-in">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#e5e2dc] bg-[#fcfbf8] px-6 py-10 sm:px-12 sm:py-14">
        {/* Brand lockup — placeholder mark until there's a real logo */}
        <div className="flex items-center gap-3">
          <span className="relative h-10 w-10 shrink-0">
            <span
              className="absolute left-0 top-0.5 h-7 w-7 rounded-full"
              style={{ backgroundColor: ACCENT, opacity: 0.9 }}
            />
            <span
              className="absolute left-3 top-3 h-7 w-7 rounded-full bg-[#2d2d2d]"
              style={{ opacity: 0.78 }}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-extrabold uppercase tracking-[0.2em]">Partnership</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a9a9a]">
              Go-to-market
            </p>
          </div>
        </div>

        <h1
          className="mt-9 text-center text-[34px] uppercase leading-[1.1] sm:text-[42px]"
          style={{ WebkitTextFillColor: "#1a1a1a" }}
        >
          Locked and loaded
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-[#6b6b6b]">
          Finalized decisions
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#9a9a9a]">
          <span>{total} locked in</span>
          <span>·</span>
          <span>Updated {moment().format("MMMM D, YYYY")}</span>
        </div>

        <div className="mt-10 space-y-12">
          {total === 0 && (
            <p className="rounded-xl border border-dashed border-[#e0dcd3] px-5 py-6 text-[15px] leading-[1.6] text-[#9a9a9a]">
              Nothing locked in yet. Lock a section in the studio and it lands on this page.
            </p>
          )}

          {groups.map(({ tab, items }) => {
            const key = `locked-${tab.id}`;
            const isCollapsed = !!collapsed[key];
            return (
              <section key={tab.id}>
                <button
                  onClick={() => toggle(key)}
                  className="flex w-full items-center justify-between gap-4 border-b border-[#eae6dd] pb-3 text-left"
                  aria-expanded={!isCollapsed}
                >
                  <span className="text-[26px] font-extrabold uppercase leading-none tracking-[0.16em] text-[#619e80] sm:text-[30px]">
                    {tab.name}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                    style={{ color: "#b3aea4" }}
                  />
                </button>
                {!isCollapsed && (
                  <div className="mt-6 space-y-8">
                    {items.map((s) => (
                      <div key={s.id}>
                        <p className="text-[17px] font-extrabold leading-snug text-[#1a1a1a]">
                          {s.name}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-[16px] leading-[1.7] text-[#2d2d2d]">
                          {s.content}
                        </p>
                        <p className="mt-2 text-[12px] text-[#a8a29a]">
                          Locked{lockedLabel(s) ? ` by ${lockedLabel(s)}` : ""}
                          {lockedDate(s.id) ? ` · ${lockedDate(s.id)}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Still-open work, kept below everything that is finished */}
        {openTotal > 0 && (
          <div className="mt-14 border-t border-[#eae6dd] pt-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#9a9a9a]">
              Still to be finalized
            </p>
            <p className="mt-2 text-[13px] text-[#a8a29a]">
              {openTotal} {openTotal === 1 ? "section" : "sections"} left to lock in.
            </p>
            <div className="mt-6 space-y-8">
              {openGroups.map(({ tab, items }) => {
                const key = `open-${tab.id}`;
                const isCollapsed = !!collapsed[key];
                return (
                  <section key={tab.id}>
                    <button
                      onClick={() => toggle(key)}
                      className="flex w-full items-center justify-between gap-4 border-b border-[#f0ece4] pb-2 text-left"
                      aria-expanded={!isCollapsed}
                    >
                      <span className="text-[19px] font-extrabold uppercase leading-none tracking-[0.16em] text-[#b7b1a7]">
                        {tab.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isCollapsed ? "-rotate-90" : ""
                        }`}
                        style={{ color: "#c9c3b9" }}
                      />
                    </button>
                    {!isCollapsed && (
                      <div className="mt-3">
                        {items.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-baseline justify-between gap-3 border-t border-[#f0ece4] py-2.5"
                          >
                            <p className="text-[15px] leading-snug text-[#8a8a8a]">{s.name}</p>
                            <span
                              className="shrink-0 rounded-full px-2 py-0.5 text-[11px]"
                              style={{
                                backgroundColor: (STAGES[s.stage] || STAGES.not_started).tint,
                                color: (STAGES[s.stage] || STAGES.not_started).text,
                              }}
                            >
                              {(STAGES[s.stage] || STAGES.not_started).label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}