import React, { useState, useRef, useEffect } from "react";
import { Upload, Loader2, Save, X, AlertCircle, Wand2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { SWIPE_OPTIONS, FIELD_LABELS, ENUM_COLS, TEXT_COLS } from "@/lib/swipeOptions";
import { validateMediaFile, generateThumbnail } from "@/lib/thumbnail";

let rowSeq = 0;
const nextId = () => `row-${++rowSeq}`;

export default function BulkIntake({ onSaved, onCancel }) {
  const [rows, setRows] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [processing, setProcessing] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    return () => rows.forEach((r) => r.previewUrl && URL.revokeObjectURL(r.previewUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    const bad = [];
    const good = [];
    files.forEach((f) => {
      const err = validateMediaFile(f);
      if (err) bad.push({ name: f.name, reason: err });
      else good.push(f);
    });
    setRejected((prev) => [...prev, ...bad]);

    for (const file of good) {
      setProcessing((p) => p + 1);
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        let thumbUrl = file_url;
        let previewUrl = URL.createObjectURL(file);
        if (file.type.startsWith("video/")) {
          const thumbBlob = await generateThumbnail(file);
          const thumbFile = new File([thumbBlob], file.name.replace(/\.[^.]+$/, "") + "-thumb.jpg", { type: "image/jpeg" });
          thumbUrl = (await base44.integrations.Core.UploadFile({ file: thumbFile })).file_url;
          previewUrl = URL.createObjectURL(thumbBlob);
        }
        setRows((prev) => [
          ...prev,
          {
            id: nextId(),
            fileName: file.name,
            fileUrl: file_url,
            thumbUrl,
            previewUrl,
            source_brand: "", source_url: "", platform: "", format: "", hook_type: "", vertical: "", angle_type: "", why_it_works: "",
          },
        ]);
      } catch (e) {
        setRejected((prev) => [...prev, { name: file.name, reason: e.message || "Upload failed" }]);
      } finally {
        setProcessing((p) => p - 1);
      }
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const setCell = (id, field, value) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const applyToAll = (field, value) => {
    if (!value) return;
    setRows((prev) => prev.map((r) => ({ ...r, [field]: value })));
  };

  const removeRow = (id) =>
    setRows((prev) => {
      const r = prev.find((x) => x.id === id);
      if (r?.previewUrl) URL.revokeObjectURL(r.previewUrl);
      return prev.filter((x) => x.id !== id);
    });

  const saveAll = async () => {
    if (!rows.length) return;
    setSaving(true);
    setError("");
    try {
      const today = new Date().toISOString().slice(0, 10);
      const records = rows.map((r) => {
        const rec = { file: r.fileUrl, thumbnail: r.thumbUrl, date_saved: today, tags: [] };
        if (r.source_brand) rec.source_brand = r.source_brand;
        if (r.source_url) rec.source_url = r.source_url;
        if (r.platform) rec.platform = r.platform;
        if (r.format) rec.format = r.format;
        if (r.hook_type) rec.hook_type = r.hook_type;
        if (r.vertical) rec.vertical = r.vertical;
        if (r.angle_type) rec.angle_type = r.angle_type;
        if (r.why_it_works) rec.why_it_works = r.why_it_works;
        return rec;
      });
      await base44.entities.Swipe.bulkCreate(records);
      rows.forEach((r) => r.previewUrl && URL.revokeObjectURL(r.previewUrl));
      onSaved();
    } catch (e) {
      setError(e.message || "Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const cellInput = "h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <input ref={inputRef} type="file" accept="video/*,image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          <button onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 btn-gradient text-sm px-4 py-2 rounded-full">
            <Upload className="w-4 h-4" /> Add files
          </button>
          <span className="text-xs text-gray-500">Video & image · up to 50MB each</span>
          {processing > 0 && (
            <span className="inline-flex items-center gap-2 text-xs text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Processing {processing}…</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-[#2d2d2d] px-3 py-2">Cancel</button>
          <button onClick={saveAll} disabled={saving || !rows.length || processing > 0} className="inline-flex items-center gap-2 btn-gradient text-sm px-5 py-2 rounded-full disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save all ({rows.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}
      {rejected.length > 0 && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs font-semibold text-amber-800 mb-1">{rejected.length} file(s) rejected:</p>
          <ul className="text-xs text-amber-700 space-y-0.5">
            {rejected.map((r, i) => <li key={i}>• {r.name} — {r.reason}</li>)}
          </ul>
          <button onClick={() => setRejected([])} className="text-xs text-amber-800 underline mt-1">Dismiss</button>
        </div>
      )}

      {rows.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <Wand2 className="w-3.5 h-3.5" /> Apply to entire batch
          </p>
          <div className="flex flex-wrap gap-2">
            {ENUM_COLS.map((key) => (
              <select
                key={key}
                value=""
                onChange={(e) => applyToAll(key, e.target.value)}
                className="h-8 rounded-md border border-gray-200 bg-white px-1 text-xs"
              >
                <option value="">{FIELD_LABELS[key]}…</option>
                {SWIPE_OPTIONS[key].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
            {TEXT_COLS.map((key) => (
              <BatchText key={key} label={FIELD_LABELS[key]} onApply={(v) => applyToAll(key, v)} />
            ))}
          </div>
        </div>
      )}

      {rows.length === 0 && processing === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
          <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Select video or image files to begin tagging your batch.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left font-semibold px-3 py-2 w-16">Thumb</th>
                <th className="text-left font-semibold px-3 py-2 min-w-[140px]">Source brand</th>
                <th className="text-left font-semibold px-3 py-2 min-w-[160px]">Source URL</th>
                {ENUM_COLS.map((k) => (
                  <th key={k} className="text-left font-semibold px-3 py-2 min-w-[130px]">{FIELD_LABELS[k]}</th>
                ))}
                <th className="text-left font-semibold px-3 py-2 min-w-[180px]">Why it works</th>
                <th className="px-2 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {r.previewUrl ? (
                        <img src={r.previewUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin text-gray-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2"><input className={cellInput} value={r.source_brand} onChange={(e) => setCell(r.id, "source_brand", e.target.value)} placeholder="Brand" /></td>
                  <td className="px-3 py-2"><input className={cellInput} value={r.source_url} onChange={(e) => setCell(r.id, "source_url", e.target.value)} placeholder="https://" /></td>
                  {ENUM_COLS.map((k) => (
                    <td key={k} className="px-3 py-2">
                      <select className={cellInput} value={r[k]} onChange={(e) => setCell(r.id, k, e.target.value)}>
                        <option value="">—</option>
                        {SWIPE_OPTIONS[k].map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </td>
                  ))}
                  <td className="px-3 py-2"><input className={cellInput} value={r.why_it_works} onChange={(e) => setCell(r.id, "why_it_works", e.target.value)} placeholder="Why it works" /></td>
                  <td className="px-2 py-2"><button onClick={() => removeRow(r.id)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function BatchText({ label, onApply }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex items-center gap-1">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={label}
        className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs w-36"
      />
      <button
        onClick={() => { onApply(val); setVal(""); }}
        className="h-8 px-2 rounded-md bg-[#2d2d2d] text-white text-xs font-medium"
      >
        Apply
      </button>
    </div>
  );
}