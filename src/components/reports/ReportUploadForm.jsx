import React, { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { base44 } from "@/api/base44Client";

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";

/** 8 random characters, unguessable, no ambiguous 0/1/o/l. */
function randomCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => ALPHABET[b % ALPHABET.length])
    .join("");
}

export default function ReportUploadForm({ existingCodes, onCreated }) {
  const [form, setForm] = useState({ client_name: "", report_title: "", date_range: "" });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pickFile = (e) => {
    const picked = e.target.files && e.target.files[0];
    setError("");
    if (!picked) return setFile(null);
    if (!/\.html?$/i.test(picked.name)) {
      setFile(null);
      setError("Upload an .html file.");
      return;
    }
    setFile(picked);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.client_name.trim() || !form.report_title.trim() || !form.date_range.trim() || !file) {
      setError("Client name, report title, date range and the HTML file are all required.");
      return;
    }
    setBusy(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      const taken = new Set(existingCodes || []);
      let code = randomCode();
      while (taken.has(code)) code = randomCode();
      await base44.entities.Report.create({
        client_name: form.client_name.trim(),
        report_title: form.report_title.trim(),
        date_range: form.date_range.trim(),
        code,
        file_url,
        file_name: file.name,
      });
      setForm({ client_name: "", report_title: "", date_range: "" });
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      await onCreated();
    } catch (err) {
      setError(err.message || "Could not save the report.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-[#e6e3dd] bg-white p-5 sm:p-6"
    >
      <h2 className="text-[15px] font-bold text-[#1a1a1a]">New report</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-[12px] font-bold text-[#6b6b6b]">Client name</span>
          <input
            value={form.client_name}
            onChange={set("client_name")}
            placeholder="Silverback Strategies"
            className="mt-1 w-full rounded-md border border-[#e0ddd7] px-3 py-2 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
          />
        </label>
        <label className="block">
          <span className="text-[12px] font-bold text-[#6b6b6b]">Report title</span>
          <input
            value={form.report_title}
            onChange={set("report_title")}
            placeholder="October Performance Report"
            className="mt-1 w-full rounded-md border border-[#e0ddd7] px-3 py-2 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
          />
        </label>
        <label className="block">
          <span className="text-[12px] font-bold text-[#6b6b6b]">Date range</span>
          <input
            value={form.date_range}
            onChange={set("date_range")}
            placeholder="Oct 1 - Oct 31, 2026"
            className="mt-1 w-full rounded-md border border-[#e0ddd7] px-3 py-2 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
          />
        </label>
        <label className="block">
          <span className="text-[12px] font-bold text-[#6b6b6b]">HTML file</span>
          <input
            ref={fileRef}
            type="file"
            accept=".html,.htm,text/html"
            onChange={pickFile}
            className="mt-1 w-full rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[13px] text-[#6b6b6b] file:mr-3 file:rounded file:border-0 file:bg-[#1a1a1a] file:px-3 file:py-1.5 file:text-[12px] file:font-bold file:text-white"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-[13px] text-[#b42318]">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#1a1a1a] px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {busy ? "Uploading…" : "Upload report"}
      </button>
    </form>
  );
}