import React from "react";
import { Plus } from "lucide-react";
import QuestionItem from "./QuestionItem";

export default function QuestionsSection({ tab, questions, data, userName }) {
  const add = () =>
    data.addQuestion(tab.id, { question: "New question", raised_by: userName, resolved: false, answer: "" });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px]">Questions to discuss</h2>
        <button
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#619e80]"
        >
          <Plus className="h-4 w-4" /> Add question
        </button>
      </div>
      {questions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#e5e2dc] px-4 py-8 text-center text-[15px] text-[#6b6b6b]">
          Nothing to discuss right now.
        </p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => (
            <QuestionItem key={q.id} question={q} data={data} userName={userName} />
          ))}
        </ul>
      )}
    </section>
  );
}