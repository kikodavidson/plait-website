import React from "react";
import NotesSection from "./NotesSection";
import TasksSection from "./TasksSection";
import QuestionsSection from "./QuestionsSection";

export default function WorkspaceTab({ tab, data, userName }) {
  return (
    <div className="space-y-14">
      <NotesSection
        tab={tab}
        notes={data.notes.filter((n) => n.tab_id === tab.id)}
        data={data}
        userName={userName}
      />
      <TasksSection
        tab={tab}
        tasks={data.tasks.filter((t) => t.tab_id === tab.id)}
        data={data}
      />
      <QuestionsSection
        tab={tab}
        questions={data.questions.filter((q) => q.tab_id === tab.id)}
        data={data}
        userName={userName}
      />
    </div>
  );
}