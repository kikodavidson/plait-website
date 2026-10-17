import React, { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import LeadForm from "./LeadForm";
import { dupeMatch, normalizeWebsite } from "./leadMeta";

/** Short dialog to add one lead — only brand name is required. */
export default function AddLeadDialog({ data, userName, onClose }) {
  const [value, setValue] = useState({ status: "new", owner: userName });
  const [busy, setBusy] = useState(false);

  const dupe = dupeMatch(value, data.leads);

  const save = async () => {
    const brand = (value.brand_name || "").trim();
    if (!brand) return;
    setBusy(true);
    try {
      await data.addLead({
        ...value,
        brand_name: brand,
        website: normalizeWebsite(value.website),
        source: value.source || "other",
      });
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#e5e2dc] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-[#2d2d2d]" />
            <h3 className="text-lg">Add lead</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#2d2d2d]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <LeadForm value={value} onChange={setValue} />

        {dupe && (
          <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-[#fdf3d7] px-3 py-2 text-[13px] text-[#8a6100]">
            Heads up: "{dupe.brand_name}" is already on the list.
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-[15px] text-[#6b6b6b] hover:bg-[#f5f3ef]"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy || !value.brand_name?.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-[#00E676] px-4 py-2 text-[15px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add lead
          </button>
        </div>
      </div>
    </div>
  );
}