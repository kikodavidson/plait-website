import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BUSINESS_TYPES } from "@/lib/attributionTasks";

const EMPTY = { name: "", client_name: "", business_type: "", url: "" };

export default function NewProjectDialog({ open, onOpenChange, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.business_type) {
      setError("Name and business type are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await base44.entities.Project.create({
        name: form.name.trim(),
        client_name: form.client_name.trim(),
        business_type: form.business_type,
        url: form.url.trim(),
        status: "active",
        notes: "",
      });
      setForm(EMPTY);
      onOpenChange(false);
      onCreated();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3.5 mt-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Name *</label>
            <Input value={form.name} onChange={set("name")} placeholder="e.g. Acme Q4 tracking setup" className="mt-1.5" autoFocus />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Client</label>
            <Input value={form.client_name} onChange={set("client_name")} placeholder="Client name" className="mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Business type *</label>
            <select
              value={form.business_type}
              onChange={set("business_type")}
              className="mt-1.5 w-full h-9 text-sm bg-white border border-gray-200 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
            >
              <option value="" disabled>Choose a type…</option>
              {Object.entries(BUSINESS_TYPES).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Website or app URL</label>
            <Input value={form.url} onChange={set("url")} placeholder="https://…" className="mt-1.5" />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-orange-500 hover:bg-orange-600 text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}