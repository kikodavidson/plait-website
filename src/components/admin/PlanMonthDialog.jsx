import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { MONTHS } from "@/lib/planBuilder";

export default function PlanMonthDialog({ open, title, onClose, onConfirm }) {
  const [month, setMonth] = useState(MONTHS[0]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (open) {
      setMonth(MONTHS[0]);
      setYear(new Date().getFullYear());
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="font-bold text-[#2d2d2d]">{title}</p>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Month</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="block h-10 w-full rounded-lg border border-gray-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]">
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Year</label>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="block h-10 w-full rounded-lg border border-gray-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]" />
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="text-sm text-gray-500 px-3 py-2">Cancel</button>
          <button onClick={() => onConfirm(month, year)} className="btn-gradient text-sm px-5 py-2 rounded-full">Create</button>
        </div>
      </div>
    </div>
  );
}