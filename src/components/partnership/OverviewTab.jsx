import React from "react";
import moment from "moment";

const Card = ({ title, children, className }) => (
  <div className={`rounded-2xl border border-[#e5e2dc] p-5 sm:p-6 ${className || ""}`}>
    <h3 className="mb-4 text-[17px]">{title}</h3>
    {children}
  </div>
);

export default function OverviewTab({ data, onSelectTab }) {
  const { tabs, notes, tasks, questions } = data;
  const decided = notes.filter((n) => n.status === "decided");
  const dueThisWeek = tasks.filter((t) => {
    if (!t.due_date) return false;
    const due = moment(t.due_date);
    return !due.isBefore(moment(), "day") && !due.isAfter(moment().add(7, "days"), "day");
  });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card title="Progress by area" className="md:col-span-2">
        <ul className="space-y-4">
          {tabs.map((tab) => {
            const tabTasks = tasks.filter((t) => t.tab_id === tab.id);
            const done = tabTasks.filter((t) => t.status === "done").length;
            const pct = tabTasks.length ? (done / tabTasks.length) * 100 : 0;
            return (
              <li key={tab.id}>
                <button onClick={() => onSelectTab(tab.id)} className="flex w-full items-center justify-between text-left">
                  <span className="text-[15px]">{tab.name}</span>
                  <span className="text-[13px] text-[#6b6b6b]">{done} of {tabTasks.length} done</span>
                </button>
                <div className="mt-1.5 h-2 rounded-full bg-[#eef1ef]">
                  <div className="h-2 rounded-full bg-[#619e80] transition-all" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card title="Decided">
        {decided.length === 0 ? (
          <p className="text-[15px] text-[#6b6b6b]">Nothing marked Decided yet.</p>
        ) : (
          <ul className="space-y-3">
            {decided.map((n) => {
              const tab = tabs.find((t) => t.id === n.tab_id);
              return (
                <li key={n.id} className="border-l-2 border-[#619e80] pl-3">
                  <p className="text-[14px] font-semibold">{n.title}</p>
                  {n.body && <p className="mt-0.5 text-[13px] leading-[1.6] text-[#6b6b6b]">{n.body}</p>}
                  {tab && <p className="mt-1 text-[12px] text-[#9a9a9a]">{tab.name}</p>}
                </li>
              );
            })}
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
                <button onClick={() => onSelectTab(t.tab_id)} className={`text-left text-[14px] ${t.status === "done" ? "text-[#9a9a9a] line-through" : ""}`}>
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
                  <span className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${open > 0 ? "bg-[#e8f2ec] text-[#3d6b52]" : "bg-[#f4f2ef] text-[#9a9a9a]"}`}>
                    {open}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}