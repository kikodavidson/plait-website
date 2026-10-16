import React, { useState } from "react";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";

export default function QuestionItem({ question, data, userName }) {
  const [answer, setAnswer] = useState(question.answer || "");
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(question.question);

  const toggleResolve = () => {
    const resolved = !question.resolved;
    data.updateQuestion(question.id, { resolved, answer: resolved ? answer : question.answer });
  };

  return (
    <li className={`rounded-xl border border-[#e5e2dc] p-4 ${question.resolved ? "bg-[#faf9f7]" : ""}`}>
      <div className="flex items-start gap-3">
        <label className="mt-0.5 flex shrink-0 items-center gap-2 text-[14px] text-[#6b6b6b]">
          <input
            type="checkbox"
            checked={question.resolved}
            onChange={toggleResolve}
            className="h-4 w-4 accent-[#619e80]"
          />
          Resolved
        </label>
        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="flex flex-wrap gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-[#dcd5c9] px-3 py-2 text-[15px] outline-none focus:border-[#619e80]"
              />
              <button
                onClick={() => {
                  data.updateQuestion(question.id, { question: text.trim() || question.question });
                  setEditing(false);
                }}
                className="rounded-full bg-[#619e80] px-4 py-2 text-[14px] text-white hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setText(question.question);
                  setEditing(false);
                }}
                className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className={`text-[15px] leading-[1.6] ${question.resolved ? "text-[#9a9a9a] line-through" : ""}`}>
              {question.question}
            </p>
          )}
          <p className="mt-1 text-[12px] text-[#6b6b6b]">Raised by {question.raised_by}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => {
              setText(question.question);
              setEditing(true);
            }}
            className="rounded-md p-1 text-[#9a9a9a] hover:text-[#1a1a1a]"
            aria-label="Edit question"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this question?")) data.deleteQuestion(question.id);
            }}
            className="rounded-md p-1 text-[#9a9a9a] hover:text-[#b0532f]"
            aria-label="Delete question"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {question.resolved && (
        <div className="mt-3 border-t border-[#efece8] pt-3">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onBlur={() => {
              if (answer !== (question.answer || "")) data.updateQuestion(question.id, { answer });
            }}
            rows={2}
            placeholder="Write the answer…"
            className="w-full rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[14px] leading-[1.6] outline-none focus:border-[#619e80]"
          />
          <button
            onClick={() => answer.trim() && data.questionToNote({ ...question, answer }, userName)}
            disabled={!answer.trim()}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#619e80] px-4 py-2 text-[13px] text-white hover:opacity-90 disabled:opacity-40"
          >
            Turn into a Decided note <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </li>
  );
}