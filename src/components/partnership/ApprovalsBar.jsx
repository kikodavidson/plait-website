import React from "react";
import { Check } from "lucide-react";

function Avatar({ name, approved }) {
  return (
    <span className="relative inline-flex">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ${
          approved ? "bg-[#619e80] text-white" : "border border-[#dcd5c9] bg-white text-[#9a9a9a]"
        }`}
      >
        {name[0]}
      </span>
      {approved && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3d6b52] text-white">
          <Check className="h-2.5 w-2.5" />
        </span>
      )}
    </span>
  );
}

export default function ApprovalsBar({ section }) {
  const partners = [
    { name: "Luke", approved: !!section.approved_luke },
    { name: "Max", approved: !!section.approved_max },
  ];
  const locked = section.stage === "locked";
  const waiting = !locked && partners.some((p) => p.approved)
    ? partners.find((p) => !p.approved).name
    : null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5">
        {partners.map((p) => (
          <span key={p.name} className="flex items-center gap-1" title={p.name}>
            <Avatar name={p.name} approved={p.approved} />
            <span className={`text-[12px] ${p.approved ? "text-[#3d6b52]" : "text-[#9a9a9a]"}`}>{p.name}</span>
          </span>
        ))}
      </div>
      {locked && <span className="text-[12px] font-semibold text-[#3d6b52]">Locked by both</span>}
      {waiting && <span className="text-[12px] text-[#8a6100]">Waiting on {waiting}</span>}
      {!locked && !waiting && partners.every((p) => !p.approved) && (
        <span className="text-[12px] text-[#9a9a9a]">No approvals yet</span>
      )}
    </div>
  );
}