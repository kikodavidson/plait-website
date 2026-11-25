import React from "react";
import { Check } from "lucide-react";

export default function ChoiceStep({ question, value, onChange }) {
  return (
    <div>
      <h2 className="text-2xl leading-tight sm:text-[28px]">{question.label}</h2>
      <div className="mt-6 space-y-2.5">
        {question.options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-[15px] transition-colors ${
                active
                  ? "border-[#619e80] bg-[#eef5f1] font-semibold text-[#3d6b52]"
                  : "border-[#e5e2dc] bg-white text-[#1a1a1a] hover:border-[#c9c4bb] hover:bg-[#faf9f7]"
              }`}
            >
              <span>{option.label}</span>
              {active && <Check className="h-4 w-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}