import React, { useState } from "react";
import { Plus } from "lucide-react";
import QuestionItem from "./QuestionItem";
import PanelEditor from "./PanelEditor";

export default function SectionQuestions({ section, questions, data, userName }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const open = questions.filter((q) => !q.resolved);
  const resolved = questions.filter((q) => q.resolved);

  const save = () => {
    const body = draft.trim();
    if (body) data.addQuestion(section, { question: body, raised_by: userName, resolved: false, answer: "" });
    setDraft("");
    setAdding(false);
  };
  const cancel = () => {
    setDraft("");
    setAdding(false);
  };

  return (
    <div className="mt-5 border-t border-[#efece8] pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-[#6b6b6b]">Questions</h4>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      {questions.length === 0 && !adding ? (
        <p className="text-[13px] text-[#9a9a9a]">No questions here.</p>
      ) : (
        <ul className="space-y-2">
          {adding && (
            <li className="rounded-xl border border-[#e5e2dc] p-3">
              <PanelEditor
                value={draft}
                onChange={setDraft}
                onSave={save}
                onCancel={cancel}
                placeholder="What do you need to talk through?"
              />
            </li>
          )}
          {[...open, ...resolved].map((q) => (
            <QuestionItem key={q.id} question={q} data={data} userName={userName} />
          ))}
        </ul>
      )}
    </div>
  );
}