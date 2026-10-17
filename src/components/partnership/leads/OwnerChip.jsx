import React from "react";

const COLORS = { Luke: "#619e80", Max: "#7a5fa0" };

/** Tiny colored initial chip showing the lead owner. */
export default function OwnerChip({ owner }) {
  if (!owner) return null;
  return (
    <span
      title={owner}
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ backgroundColor: COLORS[owner] || "#9a9a9a" }}
    >
      {owner[0]}
    </span>
  );
}