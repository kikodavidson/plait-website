import React from "react";
import moment from "moment";

export default function VersionHistory({ versions }) {
  return (
    <div className="mt-4 rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-4">
      {versions.length === 0 ? (
        <p className="text-[14px] text-[#6b6b6b]">
          No history yet. Locked versions and reopen reasons show up here.
        </p>
      ) : (
        <ul className="space-y-3">
          {versions.map((v) => (
            <li key={v.id} className="border-b border-[#efece8] pb-3 last:border-0 last:pb-0">
              {v.kind === "locked" ? (
                <>
                  <p className="text-[13px] font-semibold">
                    Locked {moment(v.created_date).format("MMM D, YYYY")} · {v.approved_by?.join(" & ")}
                  </p>
                  {v.content && (
                    <p className="mt-1 whitespace-pre-wrap text-[13px] leading-[1.6] text-[#6b6b6b]">
                      {v.content}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-[13px]">
                  <span className="font-semibold">Reopened {moment(v.created_date).format("MMM D, YYYY")}</span> — {v.reason}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}