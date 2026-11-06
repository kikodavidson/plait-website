import React from "react";
import moment from "moment";
import { ACCENT } from "./accent";

const lockedLabel = (section) =>
  section.approved_luke ? "Luke" : section.approved_max ? "Max" : null;

/**
 * Go-to-market doc: every locked section, grouped by tab, in one branded page.
 * Only final-approved (locked) work appears here.
 */
export default function GoToMarketDoc({ data }) {
  const { tabs, sections, versions } = data;

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
          className="mt-9 text-[34px] leading-[1.1] sm:text-[42px]"
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

          {groups.map(({ tab, items }) => (
            <section key={tab.id}>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#619e80]">
                {tab.name}
              </p>
              <div className="mt-4 space-y-7">
                {items.map((s) => (
                  <div key={s.id} className="border-t border-[#eae6dd] pt-5">
                    <h2 className="text-[20px] leading-snug">{s.name}</h2>
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
            </section>
          ))}
        </div>

        <div className="mt-14 border-t border-[#eae6dd] pt-5 text-[12px] text-[#a8a29a]">
          Drafts and open questions stay in the studio.
        </div>
      </div>
    </div>
  );
}