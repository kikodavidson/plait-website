import React, { useState, useEffect } from "react";
import { X, Trash2, Loader2, Save } from "lucide-react";
import { SWIPE_OPTIONS, FIELD_LABELS, MULTI_COLS } from "@/lib/swipeOptions";
import MultiSelect from "./MultiSelect";
import { isImageUrl } from "@/lib/thumbnail";

export default function SwipeDetailPanel({ swipe, onClose, onUpdate, onDelete }) {
  const [form, setForm] = useState(swipe);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setForm(swipe), [swipe]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form };
      if (typeof payload.tags === "string") {
        payload.tags = payload.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
      await onUpdate(swipe.id, payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this swipe? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await onDelete(swipe.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  const inputCls = "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg h-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="font-bold text-[#2d2d2d]">Edit swipe</p>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="rounded-xl overflow-hidden bg-black aspect-video">
            {isImageUrl(form.file) ? (
              <img src={form.file} alt="" className="w-full h-full object-contain" />
            ) : (
              <video key={form.file} src={form.file} poster={form.thumbnail} controls autoPlay className="w-full h-full object-contain" />
            )}
          </div>
          <Field label="Source brand">
            <input className={inputCls} value={form.source_brand || ""} onChange={(e) => set("source_brand", e.target.value)} />
          </Field>
          <Field label="Source URL">
            <input className={inputCls} value={form.source_url || ""} onChange={(e) => set("source_url", e.target.value)} />
          </Field>
          {Object.keys(SWIPE_OPTIONS).map((key) => (
            <Field key={key} label={FIELD_LABELS[key]}>
              {MULTI_COLS.includes(key) ? (
                <MultiSelect
                  options={SWIPE_OPTIONS[key]}
                  value={Array.isArray(form[key]) ? form[key] : []}
                  onChange={(v) => set(key, v)}
                  placeholder="Select…"
                />
              ) : (
                <select className={inputCls} value={form[key] || ""} onChange={(e) => set(key, e.target.value)}>
                  <option value="">—</option>
                  {SWIPE_OPTIONS[key].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              )}
            </Field>
          ))}
          <Field label="Why it works">
            <textarea
              className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]"
              rows={3}
              value={form.why_it_works || ""}
              onChange={(e) => set("why_it_works", e.target.value)}
            />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              className={inputCls}
              value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags || ""}
              onChange={(e) => set("tags", e.target.value)}
            />
          </Field>
          <Field label="Date saved">
            <input type="date" className={inputCls} value={(form.date_saved || "").slice(0, 10)} onChange={(e) => set("date_saved", e.target.value)} />
          </Field>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <button onClick={handleDelete} disabled={deleting} className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50">
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete
          </button>
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 btn-gradient text-sm px-5 py-2 rounded-full disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}