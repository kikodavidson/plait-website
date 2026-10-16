import React from "react";

export default function TopBar({ user, tasks, saving }) {
  const done = tasks.filter((t) => t.status === "done").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const name = user?.full_name || user?.email || "";

  return (
    <header>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl leading-tight sm:text-4xl">Partnership HQ</h1>
          <p className="mt-1.5 text-[15px] text-[#6b6b6b]">Building our brand, together.</p>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-0.5">
          {saving && <span className="text-[13px] text-[#619e80]">Saving…</span>}
          <p className="text-[13px] text-[#6b6b6b]">
            Signed in as <span className="font-semibold text-[#1a1a1a]">{name}</span>
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between text-[13px] text-[#6b6b6b]">
          <span>Overall progress</span>
          <span>{pct}% · {done} of {tasks.length} tasks done</span>
        </div>
        <div className="mt-1.5 h-2.5 rounded-full bg-[#eef1ef]">
          <div className="h-2.5 rounded-full bg-[#619e80] transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </header>
  );
}