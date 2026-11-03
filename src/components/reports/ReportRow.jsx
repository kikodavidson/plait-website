import React, { useRef, useState } from "react";
import { Check, ExternalLink, Link2, Loader2, RefreshCw, Trash2 } from "lucide-react";

export default function ReportRow({ report, onReplace, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const link = `${window.location.origin}/r/${report.code}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      window.prompt("Copy this report link", link);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const replace = async (e) => {
    const picked = e.target.files && e.target.files[0];
    if (!picked) return;
    if (!/\.html?$/i.test(picked.name)) {
      window.alert("Upload an .html file.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setBusy(true);
    try {
      await onReplace(report, picked);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const created = report.created_date
    ? new Date(report.created_date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col gap-3 border-b border-[#eeece7] px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-[14px] font-bold text-[#1a1a1a]">{report.report_title}</p>
        <p className="mt-0.5 truncate text-[12.5px] text-[#6b6b6b]">
          {report.client_name}
          {report.date_range ? ` · ${report.date_range}` : ""}
          {created ? ` · Added ${created}` : ""}
        </p>
        <p className="mt-1 truncate text-[12px] text-[#a09b92]">/r/{report.code}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[12px] font-bold text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[12px] font-bold text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Open
        </a>
        <button
          onClick={() => fileRef.current && fileRef.current.click()}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[12px] font-bold text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Replace file
        </button>
        <button
          onClick={() => onDelete(report)}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#e0ddd7] px-3 py-1.5 text-[12px] font-bold text-[#b42318] transition-colors hover:border-[#b42318]"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".html,.htm,text/html"
          onChange={replace}
          className="hidden"
        />
      </div>
    </div>
  );
}