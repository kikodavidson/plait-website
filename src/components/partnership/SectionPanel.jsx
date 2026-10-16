import React, { useState } from "react";
import DiscussionLog from "./DiscussionLog";
import SectionTasks from "./SectionTasks";
import SectionQuestions from "./SectionQuestions";

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
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                tab === t.id ? "bg-[#e8f2ec] text-[#3d6b52]" : "bg-[#f0efec] text-[#9a9a9a]"
              }`}
            >
              {t.count}
            </span>
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