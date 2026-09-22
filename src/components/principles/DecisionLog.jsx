import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import moment from "moment";
import { base44 } from "@/api/base44Client";

const inputClass =
  "w-full rounded-lg border border-[#dcd5c9] bg-[#FAF8F4] px-3.5 py-2.5 text-[15px] text-[#1a1a1a] outline-none focus:border-[#2d2d2d]";

export default function DecisionLog() {
  const [rows, setRows] = useState(null);
  const [decision, setDecision] = useState("");
  const [why, setWhy] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.entities.DecisionLog.list()
      .then((list) =>
        setRows([...list].sort((a, b) => (b.seq || 0) - (a.seq || 0)))
      )
      .catch(() => setRows([]));
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!decision.trim() || !why.trim() || saving) return;
    setSaving(true);
    try {
      const created = await base44.entities.DecisionLog.create({
        date: moment().format("MMM D, YYYY"),
        decision: decision.trim(),
        why: why.trim(),
        seq: Math.max(0, ...(rows || []).map((r) => r.seq || 0)) + 1,
      });
      setRows((prev) => [created, ...(prev || [])]);
      setDecision("");
      setWhy("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={add}
        className="mb-6 space-y-3 rounded-xl border border-[#e7e2da] bg-white p-4 sm:p-5"
      >
        <input
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="Decision"
          className={inputClass}
        />
        <input
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="Why"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={saving || !decision.trim() || !why.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-[#2d2d2d] px-5 py-2.5 text-[15px] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
          Add decision
        </button>
      </form>

      {rows === null ? (
        <div className="py-10 text-center text-[15px] text-[#6b6b6b]">
          Loading…
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#e7e2da] bg-white">
          <table className="w-full min-w-[520px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-[#e7e2da]">
                <th className="px-4 py-3 text-[13px] font-semibold text-[#6b6b6b]">Date</th>
                <th className="px-4 py-3 text-[13px] font-semibold text-[#6b6b6b]">Decision</th>
                <th className="px-4 py-3 text-[13px] font-semibold text-[#6b6b6b]">Why</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[#f0ece4] align-top last:border-0"
                >
                  <td className="whitespace-nowrap px-4 py-3.5 font-semibold">
                    {r.date}
                  </td>
                  <td className="px-4 py-3.5 leading-[1.7]">{r.decision}</td>
                  <td className="px-4 py-3.5 leading-[1.7] text-[#6b6b6b]">
                    {r.why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}