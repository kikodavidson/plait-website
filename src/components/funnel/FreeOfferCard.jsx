import React from "react";
import { Gift } from "lucide-react";

export default function FreeOfferCard({ offer }) {
  return (
    <div className="rounded-2xl border border-[#e5e2dc] bg-[#faf9f7] p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Gift className="h-3.5 w-3.5 text-[#619e80]" />
        <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#619e80]">Free offer</p>
      </div>
      <p className="mt-2 text-lg font-extrabold leading-tight text-[#1a1a1a]">{offer.title}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9a9a9a]">What they get</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#1a1a1a]">{offer.what_they_get}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9a9a9a]">Why it matters</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#1a1a1a]">{offer.why_they_care}</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-[#9a9a9a]">
        Given away to qualified leads. It is not a service we sell.
      </p>
    </div>
  );
}