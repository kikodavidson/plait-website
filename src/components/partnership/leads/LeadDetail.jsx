import React, { useEffect, useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import moment from "moment";
import LeadForm from "./LeadForm";
import { dupeMatch, faviconUrl, normalizeWebsite, statusLabel } from "./leadMeta";

const EDITABLE = [
  "brand_name",
  "website",
  "contact_name",
  "contact_email",
  "contact_phone",
  "social_link",
  "industry",
  "source",
  "owner",
  "status",
  "next_follow_up",
  "notes",
];

/** Slide-over panel with all lead fields editable plus the activity log. */
export default function LeadDetail({ lead, data, userName, onClose }) {
  const [value, setValue] = useState(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setValue(lead ? { ...lead } : null);
    setNote("");
  }, [lead?.id]);

  if (!lead || !value) return null;

  const activities = data.leadActivities
    .filter((a) => a.lead_id === lead.id)
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

  const dupe = dupeMatch(
    value,
    data.leads.filter((l) => l.id !== lead.id)
  );

  const save = async () => {
    const brand = (value.brand_name || "").trim();
    if (!brand) return;
    setBusy(true);
    try {
      const patch = {};
      EDITABLE.forEach((k) => {
        patch[k] = value[k] || "";
      });
      patch.brand_name = brand;
      patch.website = normalizeWebsite(value.website);
      patch.source = value.source || "other";
      await data.updateLead(lead.id, patch, userName);
    } finally {
      setBusy(false);
    }
  };

  const addNote = async () => {
    const b = note.trim();
    if (!b) return;
    setBusy(true);
    try {
      await data.addLeadActivity(lead.id, b, userName);
      setNote("");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${lead.brand_name}" and its activity log?`)) return;
    setBusy(true);
    try {
      await data.deleteLead(lead.id);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const icon = faviconUrl(lead.website);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-[440px] overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-[#f0eeea] bg-white px-5 py-3.5">
          {icon && <img src={icon} alt="" className="h-5 w-5 shrink-0 rounded-sm" />}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[16px] font-semibold">{lead.brand_name}</h3>
            <p className="text-[12px] text-[#9a9a9a]">{statusLabel(lead.status)}</p>
          </div>
          <button
            onClick={remove}
            className="rounded-full p-1.5 text-[#c4c4c4] hover:bg-[#fdece8] hover:text-[#b0532f]"
            title="Delete lead"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button onClick={onClose} className="rounded-full p-1.5 text-[#c4c4c4] hover:bg-[#f4f2ef] hover:text-[#1a1a1a]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <LeadForm value={value} onChange={setValue} />

          {dupe && (
            <p className="mt-3 rounded-lg bg-[#fdf3d7] px-3 py-2 text-[13px] text-[#8a6100]">
              Heads up: "{dupe.brand_name}" is already on the list.
            </p>
          )}

          <button
            onClick={save}
            disabled={busy || !value.brand_name?.trim()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00E676] px-4 py-2 text-[14px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </button>

          <div className="mt-8">
            <h4 className="text-[15px] font-semibold text-[#1a1a1a]">Activity</h4>
            <div className="mt-2 flex gap-2">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Add a dated note, e.g. 'Sent DM on IG'…"
                className="min-w-0 flex-1 resize-none rounded-lg border border-[#dcd5c9] px-3 py-2 text-[14px] outline-none focus:border-[#619e80]"
              />
              <button
                onClick={addNote}
                disabled={busy || !note.trim()}
                className="h-9 shrink-0 self-end rounded-full bg-[#2d2d2d] px-3.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Add
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {activities.length === 0 && (
                <p className="text-[13px] text-[#9a9a9a]">No activity yet.</p>
              )}
              {activities.map((a) => (
                <div key={a.id} className="rounded-xl border border-[#f0eeea] px-3 py-2.5">
                  <p className="text-[11.5px] text-[#9a9a9a]">
                    {a.created_date ? moment(a.created_date).format("MMM D, YYYY") : ""}
                    {a.author ? ` · ${a.author}` : ""}
                  </p>
                  <p className="mt-0.5 whitespace-pre-wrap text-[13.5px] text-[#1a1a1a]">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}