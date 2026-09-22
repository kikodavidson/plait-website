import React from "react";

const SECTIONS = [
  { id: "who-i-am", label: "Who I Am" },
  { id: "what-i-do", label: "What I Do" },
  { id: "how-clients-benefit", label: "How Clients Benefit" },
  { id: "who-fits", label: "Who Fits" },
  { id: "pricing", label: "Pricing & My Value" },
  { id: "straight-line", label: "Growth Isn't a Straight Line" },
  { id: "when-i-drift", label: "When I Drift" },
  { id: "how-i-judge", label: "How I Judge Myself" },
  { id: "sales-call", label: "Before a Sales Call" },
  { id: "decision-log", label: "Decision Log" },
];

export default function PrinciplesToc() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#e7e2da] bg-[#FAF8F4]/95 backdrop-blur">
      <div className="mx-auto max-w-[720px] px-5 sm:px-6">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap rounded-full border border-[#dcd5c9] bg-white px-3.5 py-1.5 text-[13px] text-[#4a4a4a] transition-colors hover:border-[#2d2d2d] hover:text-[#2d2d2d]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}