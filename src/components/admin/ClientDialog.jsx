import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { X, Loader2, AlertCircle } from "lucide-react";
import { slugify } from "@/lib/slug";

const STATUSES = ["active", "paused", "archived"];
const EMPTY = { name: "", slug: "", logo: "", accent_color: "", status: "active", intro_note: "" };

export default function ClientDialog({ open, client, clients, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(client ? { ...EMPTY, ...client } : EMPTY);
      setSlugTouched(!!client);
      setError("");
    }
  }, [open, client]);

  if (!open) return null;

  const slugTaken = form.slug && clients.some((c) => c.slug === form.slug && c.id !== client?.id);
  const onName = (v) => setForm((f) => ({ ...f, name: v, slug: slugTouched ? f.slug : slugify(v) }));

  const save = async () => {
    if (!form.name || !form.slug) { setError("Name and slug are required."); return; }
    if (slugTaken) { setError("That slug is already taken. Choose another."); return; }
    setSaving(true);
    try {
      const payload = {
        name: form.name, slug: form.slug, logo: form.logo,
        accent_color: form.accent_color, status: form.status, intro_note: form.intro_note,
      };
      if (client) await base44.entities.Client.update(client.id, payload);
      else await base44.entities.Client.create(payload);
      onSaved();
    } catch (e) {
      setError(e.message || "Save failed");
    }
    setSaving(false);
  };

  const inputCls = "h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="font-bold text-[#2d2d2d]">{client ? "Edit client" : "New client"}</p>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
            <input className={inputCls} value={form.name} onChange={(e) => onName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Slug</label>
            <input
              className={inputCls}
              value={form.slug}
              onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })); }}
            />
            {slugTaken && (
              <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                <AlertCircle className="w-3.5 h-3.5" /> This slug is already taken.
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Logo URL</label>
            <input className={inputCls} value={form.logo || ""} onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))} placeholder="https://…" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Accent color</label>
            <input className={inputCls} value={form.accent_color || ""} onChange={(e) => setForm((f) => ({ ...f, accent_color: e.target.value }))} placeholder="#2d2d2d" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
            <select className={inputCls} value={form.status || "active"} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Intro note</label>
            <textarea rows={3} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d2d]" value={form.intro_note || ""} onChange={(e) => setForm((f) => ({ ...f, intro_note: e.target.value }))} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="text-sm text-gray-500 px-3 py-2">Cancel</button>
          <button onClick={save} disabled={saving} className="btn-gradient text-sm px-5 py-2 rounded-full disabled:opacity-50 inline-flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
          </button>
        </div>
      </div>
    </div>
  );
}