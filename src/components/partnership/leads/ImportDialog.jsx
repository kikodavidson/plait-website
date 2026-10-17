import React, { useMemo, useState } from "react";
import { AlertTriangle, FileUp, Loader2, Upload, X } from "lucide-react";
import moment from "moment";
import { SOURCES, STATUSES, dupeMatch, mapChoice, normalizeWebsite, statusLabel } from "./leadMeta";

const FIELDS = [
  { key: "brand_name", label: "Brand name", hints: ["brand", "company", "store", "name"] },
  { key: "website", label: "Website", hints: ["website", "site", "url", "domain"] },
  { key: "contact_name", label: "Contact name", hints: ["contact", "person", "first"] },
  { key: "contact_email", label: "Contact email", hints: ["email"] },
  { key: "contact_phone", label: "Contact phone", hints: ["phone", "mobile", "cell"] },
  { key: "social_link", label: "Social link", hints: ["instagram", "social", "tiktok", "ig "] },
  { key: "industry", label: "Industry", hints: ["industry", "vertical", "category", "niche"] },
  { key: "source", label: "Source", hints: ["source", "list"] },
  { key: "owner", label: "Owner", hints: ["owner"] },
  { key: "status", label: "Status", hints: ["status", "stage"] },
  { key: "next_follow_up", label: "Follow up date", hints: ["follow", "date"] },
  { key: "notes", label: "Notes", hints: ["note", "comment"] },
];

/** Parse comma-separated text with quoted-cell support. */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cell += c;
      }
    } else if (c === '"') {
      inQ = true;
    } else if (c === ",") {
      row.push(cell.trim());
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell.trim());
      cell = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else {
      cell += c;
    }
  }
  row.push(cell.trim());
  if (row.some((v) => v !== "")) rows.push(row);
  return rows;
}

/** Accept a CSV file or spreadsheet paste (tab-separated). First row = headers. */
function parseRows(text) {
  const clean = text.replace(/^\uFEFF/, "").trim();
  if (!clean) return [];
  if (clean.includes("\t")) {
    return clean
      .split(/\r?\n/)
      .map((line) => line.split("\t").map((c) => c.trim()))
      .filter((r) => r.some((c) => c !== ""));
  }
  return parseCSV(clean);
}

function guessMap(headers) {
  const used = new Set();
  return headers.map((h) => {
    const key = (h || "").toLowerCase();
    const field = FIELDS.find(
      (f) => !used.has(f.key) && f.hints.some((hint) => key.includes(hint))
    );
    if (field) used.add(field.key);
    return field?.key || "";
  });
}

function toRecord(row, map) {
  const raw = {};
  map.forEach((key, i) => {
    if (key) raw[key] = (row[i] || "").trim();
  });
  const ownerRaw = (raw.owner || "").toLowerCase();
  const ownerKey = ["luke", "max"].find((o) => ownerRaw.includes(o));
  let followUp = "";
  if (raw.next_follow_up && moment(raw.next_follow_up).isValid()) {
    followUp = moment(raw.next_follow_up).format("YYYY-MM-DD");
  }
  return {
    brand_name: raw.brand_name || "",
    website: normalizeWebsite(raw.website),
    contact_name: raw.contact_name || "",
    contact_email: raw.contact_email || "",
    contact_phone: raw.contact_phone || "",
    social_link: raw.social_link || "",
    industry: raw.industry || "",
    source: mapChoice(SOURCES, raw.source) || "other",
    owner: ownerKey ? ownerKey[0].toUpperCase() + ownerKey.slice(1) : "",
    status: mapChoice(STATUSES, raw.status) || "new",
    next_follow_up: followUp,
    notes: raw.notes || "",
  };
}

/** Import leads from CSV or a spreadsheet paste, with column matching and
 *  duplicate warnings against existing leads. */
export default function ImportDialog({ data, onClose }) {
  const [headers, setHeaders] = useState(null);
  const [rows, setRows] = useState([]);
  const [mapping, setMapping] = useState([]);
  const [pasted, setPasted] = useState("");
  const [toggles, setToggles] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadRows = (text) => {
    const parsed = parseRows(text);
    if (parsed.length < 2) {
      setError("Couldn't find a header row plus at least one data row.");
      return;
    }
    const heads = parsed[0].map((h, i) => h || `Column ${i + 1}`);
    setHeaders(heads);
    setRows(parsed.slice(1));
    setMapping(guessMap(heads));
    setToggles({});
    setError(null);
  };

  const readFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => loadRows(String(reader.result || ""));
    reader.readAsText(file);
  };

  const records = useMemo(() => rows.map((r) => toRecord(r, mapping)), [rows, mapping]);
  const dupeInfo = useMemo(
    () => records.map((rec, i) => dupeMatch(rec, [...data.leads, ...records.slice(0, i)])),
    [records, data.leads]
  );
  const isIncluded = (i) => (i in toggles ? toggles[i] : !dupeInfo[i] && !!records[i].brand_name);
  const selectedCount = records.filter((_, i) => isIncluded(i)).length;
  const dupeCount = dupeInfo.filter(Boolean).length;

  const runImport = async () => {
    const selected = records.filter((_, i) => isIncluded(i));
    if (selected.length === 0) return;
    setBusy(true);
    try {
      await data.importLeads(selected);
      onClose();
    } catch (e) {
      setError(e.message || "Import failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[88vh] w-full max-w-2xl flex-col rounded-2xl border border-[#e5e2dc] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#2d2d2d]" />
            <h3 className="text-lg">Import leads</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#2d2d2d]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!headers ? (
          <div>
            <p className="mb-4 text-[14px] leading-relaxed text-[#6b6b6b]">
              Upload a CSV or paste rows straight from a spreadsheet. The first row should be
              column headers — you'll match them to lead fields next.
            </p>
            <label className="mb-4 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#dcd5c9] px-4 py-5 text-[14px] text-[#6b6b6b] hover:border-[#619e80]">
              <FileUp className="h-5 w-5 text-[#619e80]" />
              Choose a CSV file
              <input type="file" accept=".csv,.txt" className="hidden" onChange={readFile} />
            </label>
            <textarea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              rows={6}
              placeholder={"Brand\tWebsite\tContact name\tEmail\nAcme\tacme.com\tJane\tjane@acme.com"}
              className="w-full resize-none rounded-lg border border-[#dcd5c9] px-3 py-2 font-mono text-[13px] outline-none focus:border-[#619e80]"
            />
            <button
              onClick={() => loadRows(pasted)}
              disabled={!pasted.trim()}
              className="mt-3 rounded-full bg-[#00E676] px-4 py-2 text-[14px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Load pasted rows
            </button>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <h4 className="mb-2 text-[13px] font-semibold text-[#6b6b6b]">Match columns</h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {headers.map((h, i) => (
                <label key={i} className="flex items-center gap-2">
                  <span className="w-28 truncate text-[13px] text-[#1a1a1a]" title={h}>
                    {h}
                  </span>
                  <select
                    value={mapping[i] || ""}
                    onChange={(e) =>
                      setMapping((m) => m.map((v, j) => (j === i ? e.target.value : v)))
                    }
                    className="min-w-0 flex-1 rounded-lg border border-[#dcd5c9] px-2 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
                  >
                    <option value="">Skip</option>
                    {FIELDS.map((f) => (
                      <option key={f.key} value={f.key}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <div className="mt-4 mb-2 flex items-center justify-between">
              <h4 className="text-[13px] font-semibold text-[#6b6b6b]">
                {rows.length} rows · {selectedCount} ready to import
              </h4>
              {dupeCount > 0 && (
                <span className="flex items-center gap-1 text-[12px] font-semibold text-[#8a6100]">
                  <AlertTriangle className="h-3.5 w-3.5" /> {dupeCount} possible duplicates
                </span>
              )}
            </div>
            <div className="max-h-[240px] overflow-y-auto rounded-xl border border-[#f0eeea]">
              {records.map((rec, i) => {
                const dupe = dupeInfo[i];
                const missing = !rec.brand_name;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-2 border-b border-[#f0eeea] px-3 py-2 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={isIncluded(i)}
                      onChange={(e) => setToggles((t) => ({ ...t, [i]: e.target.checked }))}
                      className="mt-1 h-4 w-4 accent-[#619e80]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] text-[#1a1a1a]">
                        {rec.brand_name || <span className="text-[#c4c4c4]">(no brand name)</span>}
                        <span className="ml-2 text-[12px] text-[#9a9a9a]">
                          {rec.contact_name}
                          {rec.contact_email ? ` · ${rec.contact_email}` : ""}
                        </span>
                      </p>
                      {dupe && (
                        <p className="mt-0.5 text-[12px] font-semibold text-[#8a6100]">
                          Already on the list as "{dupe.brand_name}" — unchecked
                        </p>
                      )}
                      {missing && !dupe && (
                        <p className="mt-0.5 text-[12px] text-[#b0532f]">Missing brand name</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-[#f0eeea] px-2 py-0.5 text-[11px] text-[#6b6b6b]">
                      {statusLabel(rec.status)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {error && <p className="mt-3 text-[13px] text-red-500">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-[15px] text-[#6b6b6b] hover:bg-[#f5f3ef]"
          >
            Cancel
          </button>
          {headers && (
            <button
              onClick={runImport}
              disabled={busy || selectedCount === 0}
              className="inline-flex items-center gap-2 rounded-full bg-[#00E676] px-4 py-2 text-[15px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Import {selectedCount} lead{selectedCount === 1 ? "" : "s"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}