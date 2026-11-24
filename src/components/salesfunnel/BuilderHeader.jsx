import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/funnel/ProgressBar";

export default function BuilderHeader({ done, total, saving, saved }) {
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <header>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            to="/partnership"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a] transition-colors hover:text-[#3d6b52]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Partnership HQ
          </Link>
          <h1 className="mt-2 text-3xl leading-tight text-[#1a1a1a] sm:text-4xl">Sales Funnel Builder</h1>
          <p className="mt-1.5 text-[15px] text-[#6b6b6b]">
            Work through each section in order. Each one builds on the last.
          </p>
        </div>
        <div className="text-[12px] font-semibold">
          {saving ? (
            <span className="text-[#9a9a9a]">Saving…</span>
          ) : saved ? (
            <span className="text-[#619e80]">Saved</span>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#9a9a9a]">
          <span>Progress</span>
          <span className="text-[#3d6b52]">
            {done} of {total} done
          </span>
        </div>
        <ProgressBar value={pct} />
      </div>
    </header>
  );
}