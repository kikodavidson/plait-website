import React from "react";
import { CONTACT_FIELDS } from "@/lib/applyQuestions";

const inputClass =
  "w-full rounded-xl border border-[#e5e2dc] bg-white px-4 py-3 text-[15px] text-[#1a1a1a] outline-none transition-colors placeholder:text-[#a8a8a8] focus:border-[#619e80]";

export default function ContactStep({ answers, onChange }) {
  return (
    <div>
      <h2 className="text-2xl leading-tight sm:text-[28px]">First, who are we talking to?</h2>
      <div className="mt-6 space-y-4">
        {CONTACT_FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`apply-${field.key}`}
              className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9a9a]"
            >
              {field.label}
            </label>
            <input
              id={`apply-${field.key}`}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={answers[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              className={`mt-1.5 ${inputClass}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}