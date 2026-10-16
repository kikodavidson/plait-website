import React from "react";
import TaskRow from "./TaskRow";

/** Every open task across all sections, grouped by tab and section. */
export default function OutstandingTasksTab({ data }) {
  const open = data.tasks.filter((t) => t.status !== "done");

  return (
    <div className="space-y-10">
      {open.length === 0 && (
        <p className="rounded-xl border border-dashed border-[#e5e2dc] px-4 py-10 text-center text-[15px] text-[#6b6b6b]">
          No outstanding tasks. Everything is done.
        </p>
      )}
      {data.tabs.map((tab) => {
        const tabTasks = open.filter((t) => t.tab_id === tab.id);
        if (!tabTasks.length) return null;
        return (
          <section key={tab.id}>
            <h2 className="mb-3 text-[22px]">{tab.name}</h2>
            {data.sections
              .filter((s) => s.tab_id === tab.id)
              .map((s) => {
                const items = tabTasks.filter((t) => t.section_id === s.id);
                if (!items.length) return null;
                return (
                  <div key={s.id} className="mb-5 last:mb-0">
                    <h3 className="mb-2 text-[15px] text-[#6b6b6b]">{s.name}</h3>
                    <ul className="space-y-2">
                      {items.map((t) => (
                        <TaskRow key={t.id} task={t} data={data} />
                      ))}
                    </ul>
                  </div>
                );
              })}
          </section>
        );
      })}
    </div>
  );
}