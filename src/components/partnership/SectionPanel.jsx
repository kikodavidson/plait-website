import React, { useState } from "react";
import DiscussionLog from "./DiscussionLog";
import SectionTasks from "./SectionTasks";
import SectionQuestions from "./SectionQuestions";
import SheenPill from "./SheenPill";

/**
 * Right-hand panel for the open section: Log, Tasks and Questions tabs with
 * counts, showing only that section's items.
 */
export default function SectionPanel({ section, data, userName }) {
  const [tab, setTab] = useState("log");

  const notes = data.notes.filter((n) => n.section_id === section.id);
  const tasks = data.tasks.filter((t) => t.section_id === section.id);
  const questions = data.questions.filter((q) => q.section_id === section.id);
  const openQuestions = questions.filter((q) => !q.resolved).length;

  const TABS = [
    { id: "log", label: "Log", count: notes.length },
    { id: "tasks", label: "Tasks", count: tasks.length },
    { id: "questions", label: "Questions", count: openQuestions },
  ];

  return (
    <div className="text-[#1a1a1a]">
      <div className="flex items-center gap-1 border-b border-[#efece8]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px flex items-center gap-1.5 border-b-2 px-2.5 py-2 text-[13px] transition-colors ${
              tab === t.id
                ? "border-[#619e80] font-semibold text-[#1a1a1a]"
                : "border-transparent text-[#6b6b6b] hover:text-[#1a1a1a]"
            }`}
          >
            {t.label}
            <SheenPill
              tint={tab === t.id ? "rgba(97,158,128,0.18)" : "rgba(107,107,107,0.10)"}
              text={tab === t.id ? "#3d6b52" : "#9a9a9a"}
              className="px-1.5 py-0.5 text-[11px]"
            >
              {t.count}
            </SheenPill>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === "log" && (
          <DiscussionLog section={section} entries={notes} data={data} userName={userName} />
        )}
        {tab === "tasks" && <SectionTasks section={section} tasks={tasks} data={data} />}
        {tab === "questions" && (
          <SectionQuestions section={section} questions={questions} data={data} userName={userName} />
        )}
      </div>
    </div>
  );
}