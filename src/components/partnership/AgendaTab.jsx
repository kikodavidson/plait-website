import React from "react";
import QuestionItem from "./QuestionItem";

export default function AgendaTab({ data, userName }) {
  const open = data.questions.filter((q) => !q.resolved);

  return (
    <div className="space-y-10">
      {open.length === 0 && (
        <p className="rounded-xl border border-dashed border-[#e5e2dc] px-4 py-10 text-center text-[15px] text-[#6b6b6b]">
          No open questions. Nothing to talk through right now.
        </p>
      )}
      {data.tabs.map((tab) => {
        const items = open.filter((q) => q.tab_id === tab.id);
        if (!items.length) return null;
        return (
          <section key={tab.id}>
            <h2 className="mb-3 text-[22px]">{tab.name}</h2>
            <ul className="space-y-3">
              {items.map((q) => (
                <QuestionItem key={q.id} question={q} data={data} userName={userName} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}