import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ACCENT } from "@/lib/funnelPlan";
import ProgressBar from "./ProgressBar";

export default function FunnelHeader({ overall, done, total, saving }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/partnership"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#9a9a9a] transition-colors hover:text-[#1a1a1a]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Partnership HQ
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#b3aea6]">
          {saving ? "Saving…" : "Live"}
        </span>
      </div>

      <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.4em]" style={{ color: ACCENT }}>
        Mile 27
      </p>
      <h1
        className="mt-3 text-[38px] font-extrabold uppercase leading-[0.95] text-[#1a1a1a] sm:text-6xl"
        style={{ WebkitTextFillColor: "#1a1a1a", backgroundImage: "none" }}
      >
        Funnel Plan
      </h1>
      <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-[#6b6b6b] sm:text-sm">
        The lead magnet funnel, end to end. One board, both of us on it, nothing living in a text thread.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="min-w-[200px] flex-1">
          <ProgressBar value={overall} />
        </div>
        <span className="text-[12px] font-bold text-[#1a1a1a]">
          {done} / {total} done · {overall}%
        </span>
      </div>
    </div>
  );
}