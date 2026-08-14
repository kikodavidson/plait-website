import React, { useState, useRef, useEffect } from "react";
import { Upload, Loader2, Save, X, AlertCircle, Copy } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { SWIPE_OPTIONS, FIELD_LABELS, ENUM_COLS, TEXT_COLS } from "@/lib/swipeOptions";
import { validateMediaFile, generateThumbnail } from "@/lib/thumbnail";

let rowSeq = 0;
const nextId = () => `row-${++rowSeq}`;
const dupKey = (name, size) => `${name}|${size}`;
const COLS = ["source_brand", "source_url", ...ENUM_COLS, "why_it_works"];

export default function BulkIntake({ onSaved, onCancel, existingSwipes = [] }) {
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

    const knownKeys = new Set([
      ...existingSwipes.filter((s) => s.file_name && s.file_size).map((s) => dupKey(s.file_name, s.file_size)),
      ...rows.map((r) => dupKey(r.fileName, r.fileSize)),
    ]);
    const batchKeys = new Set();

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
        const key = dupKey(file.name, file.size);
        const isDup = knownKeys.has(key) || batchKeys.has(key);
        batchKeys.add(key);
        setRows((prev) => [
          ...prev,
          {
            id: nextId(),
            fileName: file.name,
            fileSize: file.size,
            fileUrl: file_url,
            thumbUrl,
            previewUrl,
            duplicate: isDup,
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

  const dupCount = rows.filter((r) => r.duplicate).length;

  const saveAll = async () => {
    if (!rows.length) return;
    if (dupCount > 0) {
      if (!window.confirm(`${dupCount} file(s) may already exist in your library. Save anyway?`)) return;
    }
    setSaving(true);
    setError("");
    try {
      const today = new Date().toISOString().slice(0, 10);
      const records = rows.map((r) => {
        const rec = {
          file: r.fileUrl,
          thumbnail: r.thumbUrl,
          date_saved: today,
          tags: [],
          file_name: r.fileName,
          file_size: r.fileSize,
        };
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
      {dupCount > 0 && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          <Copy className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{dupCount} possible duplicate(s) detected.</p>
            <p className="text-xs mt-0.5">Name and size match an existing library entry. You'll be asked to confirm before saving.</p>
          </div>
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
                <th className="px-3 py-2 w-16"></th>
                {COLS.map((col) => (
                  <th key={col} className="text-left px-3 py-2 min-w-[150px] align-top">
                    <div className="font-semibold text-xs mb-1">{FIELD_LABELS[col]}</div>
                    {ENUM_COLS.includes(col) ? (
                      <select
                        value=""
                        onChange={(e) => applyToAll(col, e.target.value)}
                        className="h-8 w-full rounded-md border border-gray-200 bg-white px-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
                      >
                        <option value="">Set all…</option>
                        {SWIPE_OPTIONS[col].map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <ColumnTextApply onApply={(v) => applyToAll(col, v)} />
                    )}
                  </th>
                ))}
                <th className="px-2 py-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {r.previewUrl ? (
                        <img src={r.previewUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin text-gray-300" />
                      )}
                      {r.duplicate && (
                        <span className="absolute top-0 left-0 bg-amber-500 text-white text-[8px] font-bold px-1 rounded-br">DUP</span>
                      )}
                    </div>
                  </td>
                  {COLS.map((col) => (
                    <td key={col} className="px-3 py-2">
                      {ENUM_COLS.includes(col) ? (
                        <select className={cellInput} value={r[col]} onChange={(e) => setCell(r.id, col, e.target.value)}>
                          <option value="">—</option>
                          {SWIPE_OPTIONS[col].map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input className={cellInput} value={r[col]} onChange={(e) => setCell(r.id, col, e.target.value)} placeholder={FIELD_LABELS[col]} />
                      )}
                    </td>
                  ))}
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

function ColumnTextApply({ onApply }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex items-center gap-1">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Set all…"
        className="h-8 flex-1 min-w-0 rounded-md border border-gray-200 bg-white px-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
      />
      <button
        onClick={() => { onApply(val); setVal(""); }}
        className="h-8 px-2 rounded-md bg-[#2d2d2d] text-white text-xs font-medium shrink-0"
      >
        Apply
      </button>
    </div>
  );
}