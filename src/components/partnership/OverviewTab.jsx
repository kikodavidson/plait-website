import React from "react";
import moment from "moment";
import { STAGES } from "./stageMeta";
import SheenPill from "./SheenPill";

const Card = ({ title, children, className }) => (
  <div className={`rounded-2xl border border-[#e5e2dc] p-5 sm:p-6 ${className || ""}`}>
    <h3 className="mb-4 text-[17px]">{title}</h3>
    {children}
  </div>
);

export default function OverviewTab({ data, userName, onSelectTab }) {
  const { tabs, sections, versions, tasks, questions } = data;
  const myKey = userName === "Luke" ? "approved_luke" : "approved_max";
  const otherKey = userName === "Luke" ? "approved_max" : "approved_luke";
  const otherName = userName === "Luke" ? "Max" : "Luke";
  const needsMe = sections.filter((s) => s.stage !== "locked" && s[otherKey] && !s[myKey]);
  const locked = sections.filter((s) => s.stage === "locked");
  const reopens = versions.filter((v) => v.kind === "reopen").slice(0, 5);
  const dueThisWeek = tasks.filter((t) => {
    if (!t.due_date) return false;
    const due = moment(t.due_date);
    return !due.isBefore(moment(), "day") && !due.isAfter(moment().add(7, "days"), "day");
  });
  const tabName = (id) => (tabs.find((t) => t.id === id) || {}).name;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card title="Where each piece stands" className="md:col-span-2">
        {tabs.map((tab) => {
          const secs = sections.filter((s) => s.tab_id === tab.id);
          if (!secs.length) return null;
          return (
            <div key={tab.id} className="mb-4 last:mb-0">
              <button
                onClick={() => onSelectTab(tab.id)}
                className="text-[15px] font-semibold hover:text-[#3d6b52]"
              >
                {tab.name}
              </button>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {secs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectTab(tab.id)}
                    title={`${s.name}: ${STAGES[s.stage]?.label}`}
                    >
                    <SheenPill tint={STAGES[s.stage]?.tint} text={STAGES[s.stage]?.text}>{s.name}</SheenPill>
                    </button>
                ))}
              </div>
            </div>
          );
        })}
      </Card>

      <Card title="Needs your approval">
        {needsMe.length === 0 ? (
          <p className="text-[15px] text-[#6b6b6b]">Nothing waiting on you right now.</p>
        ) : (
          <ul className="space-y-2.5">
            {needsMe.map((s) => (
              <li key={s.id}>
                <button onClick={() => onSelectTab(s.tab_id)} className="w-full text-left">
                  <p className="text-[14px] font-semibold">{s.name}</p>
                  <p className="text-[12px] text-[#6b6b6b]">{tabName(s.tab_id)} · {otherName} approved</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Recently reopened">
        {reopens.length === 0 ? (
          <p className="text-[15px] text-[#6b6b6b]">Nothing reopened recently.</p>
        ) : (
          <ul className="space-y-2.5">
            {reopens.map((v) => {
              const s = sections.find((x) => x.id === v.section_id);
              return (
                <li key={v.id} className="border-l-2 border-[#d9a400] pl-3">
                  <p className="text-[14px] font-semibold">
                    {s ? s.name : "Section"} · {tabName(v.tab_id)}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-[1.5] text-[#6b6b6b]">{v.reason}</p>
                  <p className="mt-0.5 text-[12px] text-[#9a9a9a]">{moment(v.created_date).format("MMM D")}</p>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Card title="Locked">
        {locked.length === 0 ? (
          <p className="text-[15px] text-[#6b6b6b]">Nothing locked yet.</p>
        ) : (
          <ul className="space-y-3">
            {locked.map((s) => (
              <li key={s.id} className="border-l-2 border-[#619e80] pl-3">
                <button onClick={() => onSelectTab(s.tab_id)} className="text-left">
                  <p className="text-[14px] font-semibold">{s.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#9a9a9a]">{tabName(s.tab_id)}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Due this week">
        {dueThisWeek.length === 0 ? (
          <p className="text-[15px] text-[#6b6b6b]">Nothing due this week.</p>
        ) : (
          <ul className="space-y-2.5">
            {dueThisWeek.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectTab(t.tab_id)}
                  className={`text-left text-[14px] ${t.status === "done" ? "text-[#9a9a9a] line-through" : ""}`}
                >
                  {t.title}
                </button>
                <span className="shrink-0 text-[12px] text-[#6b6b6b]">
                  {moment(t.due_date).format("ddd, MMM D")} · {t.owner}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Open questions" className="md:col-span-2">
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {tabs.map((tab) => {
            const open = questions.filter((q) => q.tab_id === tab.id && !q.resolved).length;
            return (
              <li key={tab.id}>
                <button onClick={() => onSelectTab(tab.id)} className="flex w-full items-center justify-between">
                  <span className="text-[14px]">{tab.name}</span>
                  <SheenPill
                    tint={open > 0 ? "rgba(97,158,128,0.18)" : "rgba(107,107,107,0.10)"}
                    text={open > 0 ? "#3d6b52" : "#9a9a9a"}
                    className="px-2.5 py-0.5 text-[13px]"
                  >
                    {open}
                  </SheenPill>
                </button>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}