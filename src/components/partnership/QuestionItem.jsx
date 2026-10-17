import React, { useState } from "react";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";
import PanelEditor from "./PanelEditor";

export default function QuestionItem({ question, data, userName }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(question.question);
  const [answer, setAnswer] = useState(question.answer || "");

  const toggleResolve = () => {
    const resolved = !question.resolved;
    data.updateQuestion(question.id, { resolved, answer: resolved ? answer : question.answer });
  };

  const save = () => {
    if (text.trim() && text.trim() !== question.question) {
      data.updateQuestion(question.id, { question: text.trim() });
    }
    setEditing(false);
  };

  const cancel = () => {
    setText(question.question);
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="rounded-xl border border-[#e5e2dc] p-3">
        <PanelEditor value={text} onChange={setText} onSave={save} onCancel={cancel} placeholder="Question" />
      </li>
    );
  }

  return (
    <li
      className={`group rounded-xl border p-3 transition-colors ${
        question.resolved ? "border-[#efece8] bg-[#faf9f7]" : "border-[#e5e2dc]"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          title="Resolved"
          checked={question.resolved}
          onChange={toggleResolve}
          className="mt-1 h-4 w-4 shrink-0 accent-[#00E676]"
        />
        <div className="min-w-0 flex-1">
          <p
            className={`text-[14px] leading-[1.55] ${
              question.resolved ? "text-[#9a9a9a] line-through" : "text-[#1a1a1a]"
            }`}
          >
            {question.question}
          </p>
          <p className="mt-0.5 text-[12px] text-[#6b6b6b]">Raised by {question.raised_by}</p>
        </div>
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => {
              setText(question.question);
              setEditing(true);
            }}
            className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
            aria-label="Edit question"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => window.confirm("Delete this question?") && data.deleteQuestion(question.id)}
            className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#b0532f]"
            aria-label="Delete question"
          >
            <Trash2 className="h-3.5 w-3.5" />
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
            className="w-full rounded-lg border border-[#dcd5c9] bg-white px-3 py-2 text-[14px] leading-[1.55] outline-none focus:border-[#00E676]"
          />
          <button
            onClick={() => answer.trim() && data.questionToLog({ ...question, answer }, userName)}
            disabled={!answer.trim()}
            className="mt-2 inline-flex h-8 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: "#00E676", color: "#0c130e" }}
          >
            Add to discussion log <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </li>
  );
}