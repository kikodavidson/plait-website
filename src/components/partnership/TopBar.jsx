import React from "react";

export default function TopBar({ user, saving, onInvite }) {
  const name = user?.full_name || user?.email || "";

  return (
    <header>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl leading-tight sm:text-4xl">Partnership HQ</h1>
          <p className="mt-1.5 text-[15px] text-[#6b6b6b]">Ideation and Execution to Launch Our Brand</p>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
          {user?.role === "admin" && onInvite && (
            <button
              onClick={onInvite}
              className="rounded-full border border-[#dcd5c9] px-4 py-1.5 text-[13px] font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5f3ef]"
            >
              Invite Max
            </button>
          )}
          {saving && <span className="text-[13px] text-[#619e80]">Saving…</span>}
          <p className="text-[13px] text-[#6b6b6b]">
            Signed in as <span className="font-semibold text-[#1a1a1a]">{name}</span>
          </p>
        </div>
      </div>
    </header>
  );
}