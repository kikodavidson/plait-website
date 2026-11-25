import React from "react";

export default function TextStep({ question, value, onChange }) {
  return (
    <div>
      <h2 className="text-2xl leading-tight sm:text-[28px]">{question.label}</h2>
      <textarea
        rows={4}
        placeholder={question.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-6 w-full resize-none rounded-2xl border border-[#e5e2dc] bg-white px-4 py-3 text-[15px] leading-relaxed text-[#1a1a1a] outline-none transition-colors placeholder:text-[#a8a8a8] focus:border-[#619e80]"
      />
    </div>
  );
}