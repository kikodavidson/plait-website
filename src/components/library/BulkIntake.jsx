import React, { useState, useRef, useEffect } from "react";
import { Upload, Loader2, Save, X, AlertCircle, Copy, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import {
  SWIPE_OPTIONS,
  FIELD_LABELS,
  REQUIRED_FIELDS,
  OPTIONAL_FIELDS,
  MULTI_SELECT_FIELDS,
  isEmptyValue,
} from "@/lib/swipeOptions";
import MultiSelect from "./MultiSelect";
import { validateMediaFile, generateThumbnail } from "@/lib/thumbnail";

let rowSeq = 0;
const nextId = () => `row-${++rowSeq}`;
const dupKey = (name, size) => `${name}|${size}`;
const ALL_TAG_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];
const QUICK_FILL_FIELDS = ["creative_format", "hook"];

const emptyRow = () => ({
  source_brand: "",
  source_url: "",
  ...Object.fromEntries(ALL_TAG_FIELDS.map((f) => [f, MULTI_SELECT_FIELDS.includes(f) ? [] : ""])),
  why_it_works: "",
});

export default function BulkIntake({ onSaved, onCancel, existingSwipes = [] }) {
  const [rows, setRows] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [processing, setProcessing] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const [openDetails, setOpenDetails] = useState({});
  const [quickBrand, setQuickBrand] = useState("");
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
          { id: nextId(), fileName: file.name, fileSize: file.size, fileUrl: file_url, thumbUrl, previewUrl, duplicate: isDup, ...emptyRow() },
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

  const markTouched = (id, field) =>
    setTouched((t) => ({ ...t, [`${id}:${field}`]: true }));

  const applyToAll = (field, value) => {
    if (isEmptyValue(value)) return;
    setRows((prev) => prev.map((r) => ({ ...r, [field]: value })));
  };

  const removeRow = (id) =>
    setRows((prev) => {
      const r = prev.find((x) => x.id === id);
      if (r?.previewUrl) URL.revokeObjectURL(r.previewUrl);
      return prev.filter((x) => x.id !== id);
    });

  const isRowIncomplete = (r) => !r.source_brand.trim() || REQUIRED_FIELDS.some((f) => isEmptyValue(r[f]));
  const incompleteCount = rows.filter(isRowIncomplete).length;
  const dupCount = rows.filter((r) => r.duplicate).length;

  const saveAll = async () => {
    if (!rows.length || incompleteCount) return;
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
        ALL_TAG_FIELDS.forEach((f) => {
          if (!isEmptyValue(r[f])) rec[f] = r[f];
        });
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

  const reqCellCls = (r, field) =>
    isEmptyValue(r[field]) && touched[`${r.id}:${field}`]
      ? "border-red-300 focus:ring-red-300 bg-red-50/40"
      : "border-gray-200 focus:ring-[#2d2d2d]";

  const inputBase = "h-9 w-full rounded-md border bg-white px-2 text-xs focus:outline-none focus:ring-1";

  const renderTagField = (r, field) => {
    if (MULTI_SELECT_FIELDS.includes(field)) {
      return (
        <MultiSelect
          options={SWIPE_OPTIONS[field]}
          value={Array.isArray(r[field]) ? r[field] : []}
          onChange={(v) => setCell(r.id, field, v)}
          placeholder={`${FIELD_LABELS[field]}…`}
        />
      );
    }
    return (
      <select
        value={r[field] || ""}
        onChange={(e) => setCell(r.id, field, e.target.value)}
        onBlur={() => markTouched(r.id, field)}
        className={`${inputBase} ${REQUIRED_FIELDS.includes(field) ? reqCellCls(r, field) : "border-gray-200 focus:ring-[#2d2d2d]"}`}
      >
        <option value="">—</option>
        {SWIPE_OPTIONS[field].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  };

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
            <span className="inline-flex items-center gap-2 text-xs text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" /> Processing {processing}…
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-[#2d2d2d] px-3 py-2">
            Cancel
          </button>
          <button
            onClick={saveAll}
            disabled={saving || !rows.length || processing > 0 || incompleteCount > 0}
            className="inline-flex items-center gap-2 btn-gradient text-sm px-5 py-2 rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {incompleteCount > 0
              ? `Save all — ${incompleteCount} need tags`
              : `Save all (${rows.length})`}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
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
            {rejected.map((r, i) => (
              <li key={i}>• {r.name} — {r.reason}</li>
            ))}
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
        <>
          {rows.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
              <span className="text-xs font-semibold text-gray-500">Quick fill all rows:</span>
              <div className="flex items-center gap-1">
                <input
                  value={quickBrand}
                  onChange={(e) => setQuickBrand(e.target.value)}
                  placeholder="Brand name"
                  className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
                />
                <button
                  onClick={() => { applyToAll("source_brand", quickBrand); setQuickBrand(""); }}
                  className="h-8 px-2 rounded-md bg-[#2d2d2d] text-white text-xs font-medium"
                >
                  Apply
                </button>
              </div>
              {QUICK_FILL_FIELDS.map((f) => (
                <select
                  key={f}
                  value=""
                  onChange={(e) => applyToAll(f, e.target.value)}
                  className="h-8 rounded-md border border-gray-200 bg-white px-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
                >
                  <option value="">{FIELD_LABELS[f]}…</option>
                  {SWIPE_OPTIONS[f].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.id} className="rounded-xl border border-gray-100 bg-white shadow-sm p-4 space-y-3">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {r.previewUrl ? (
                      <img src={r.previewUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
                    )}
                    {r.duplicate && (
                      <span className="absolute top-0 left-0 bg-amber-500 text-white text-[8px] font-bold px-1 rounded-br">DUP</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Essential Tags <span className="text-red-500">*</span>
                      {isRowIncomplete(r) && <span className="ml-2 text-red-500 normal-case font-medium">· missing tags</span>}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Brand name <span className="text-red-500">*</span></label>
                        <input
                          value={r.source_brand}
                          onChange={(e) => setCell(r.id, "source_brand", e.target.value)}
                          onBlur={() => markTouched(r.id, "source_brand")}
                          placeholder="Brand"
                          className={`${inputBase} ${
                            !r.source_brand.trim() && touched[`${r.id}:source_brand`]
                              ? "border-red-300 focus:ring-red-300 bg-red-50/40"
                              : "border-gray-200 focus:ring-[#2d2d2d]"
                          }`}
                        />
                      </div>
                      {REQUIRED_FIELDS.map((f) => (
                        <div key={f} className="space-y-1">
                          <label className="text-xs font-medium text-gray-500">
                            {FIELD_LABELS[f]} <span className="text-red-500">*</span>
                          </label>
                          {renderTagField(r, f)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => removeRow(r.id)} className="text-gray-400 hover:text-red-500 self-start lg:ml-2" aria-label="Remove file">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setOpenDetails((o) => ({ ...o, [r.id]: !o[r.id] }))}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#2d2d2d]"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDetails[r.id] ? "rotate-180" : ""}`} />
                  Additional Creative Details (optional)
                </button>

                {openDetails[r.id] && (
                  <div className="border-t border-gray-100 pt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {OPTIONAL_FIELDS.map((f) => (
                      <div key={f} className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">{FIELD_LABELS[f]}</label>
                        {renderTagField(r, f)}
                      </div>
                    ))}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500">Source URL</label>
                      <input
                        value={r.source_url}
                        onChange={(e) => setCell(r.id, "source_url", e.target.value)}
                        placeholder="https://"
                        className={`${inputBase} border-gray-200 focus:ring-[#2d2d2d]`}
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-medium text-gray-500">Why it works</label>
                      <textarea
                        value={r.why_it_works}
                        onChange={(e) => setCell(r.id, "why_it_works", e.target.value)}
                        rows={2}
                        placeholder="Internal analysis of why this ad works…"
                        className="w-full rounded-md border border-gray-200 bg-white p-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d2d2d]"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}