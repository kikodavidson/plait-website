import React from "react";
import { Plus } from "lucide-react";
import QuestionItem from "./QuestionItem";

export default function SectionQuestions({ section, questions, data, userName }) {
  const add = () =>
    data.addQuestion(section, { question: "New question", raised_by: userName, resolved: false, answer: "" });

  return (
    <div className="mt-5 border-t border-[#efece8] pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-[#6b6b6b]">Questions</h4>
        <button
          onClick={add}
          className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
      {questions.length === 0 ? (
        <p className="text-[13px] text-[#9a9a9a]">No questions here.</p>
      ) : (
        <ul className="space-y-2.5">
          {questions.map((q) => (
            <QuestionItem key={q.id} question={q} data={data} userName={userName} />
          ))}
        </ul>
      )}
    </div>
  );
}