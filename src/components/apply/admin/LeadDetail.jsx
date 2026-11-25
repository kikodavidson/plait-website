import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  QUESTIONS,
  RESULT_META,
  STATUS_OPTIONS,
  optionLabel,
  questionLabel,
} from "@/lib/applyQuestions";

const answerFor = (lead, question) =>
  question.type === "choice" ? optionLabel(question.key, lead[question.key]) : lead[question.key] || "—";

export default function LeadDetail({ lead, onClose, onUpdate }) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [saveState, setSaveState] = useState("");
  const timer = useRef(null);
  const pending = useRef(null);

  useEffect(() => {
    setNotes(lead.notes || "");
  }, [lead.id]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (pending.current !== null) onUpdate({ notes: pending.current });
    };
  }, []);

  const queueNotes = (value) => {
    setNotes(value);
    pending.current = value;
    setSaveState("Saving…");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await onUpdate({ notes: value });
      pending.current = null;
      setSaveState("Saved");
    }, 800);
  };

  const meta = lead.completed ? RESULT_META[lead.result] : RESULT_META.incomplete;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/25" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#efece8] bg-white px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">
              {new Date(lead.created_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h2 className="mt-1 text-2xl leading-tight">{lead.name}</h2>
            <p className="mt-1 text-[13px] text-[#6b6b6b]">
              {lead.company} · {lead.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.className}`}>
                {meta.label}
              </span>
              <a
                href={lead.website?.startsWith("http") ? lead.website : `https://${lead.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-[12px] text-[#3d6b52] underline"
              >
                {lead.website}
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#9a9a9a] transition-colors hover:bg-[#f5f3f0] hover:text-[#1a1a1a]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 px-6 py-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">
              Status
            </label>
            <select
              value={lead.status || "new"}
              onChange={(e) => onUpdate({ status: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[#e5e2dc] bg-white px-3.5 py-2.5 text-[14px] text-[#1a1a1a] outline-none focus:border-[#619e80]"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">
                Notes
              </label>
              <span className="text-[11px] text-[#9a9a9a]">{saveState}</span>
            </div>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => queueNotes(e.target.value)}
              placeholder="Call notes, next steps…"
              className="mt-1.5 w-full resize-none rounded-xl border border-[#e5e2dc] bg-white px-3.5 py-3 text-[14px] leading-relaxed outline-none placeholder:text-[#a8a8a8] focus:border-[#619e80]"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]">Answers</p>
            <dl className="mt-3 divide-y divide-[#efece8] rounded-2xl border border-[#e5e2dc]">
              {QUESTIONS.map((question) => {
                const answer = answerFor(lead, question);
                return (
                  <div key={question.key} className="px-4 py-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9a9a9a]">
                      {questionLabel(question.key)}
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-[#1a1a1a]">
                      {answer}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}