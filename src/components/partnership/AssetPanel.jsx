import React, { useEffect, useRef, useState } from "react";
import { Link2, FileText, Trash2, X, ExternalLink } from "lucide-react";

const extOf = (name = "") => {
  const m = /\.([a-zA-Z0-9]+)$/.exec(name);
  return m ? m[1].toUpperCase() : "FILE";
};

const sizeOf = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const hostOf = (url = "") => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Link";
  }
};

/** One-line meta label for an asset: a link's site, or a file's type and size. */
export const assetMeta = (a) =>
  a.kind === "link"
    ? hostOf(a.url)
    : [extOf(a.file_name), sizeOf(a.file_size)].filter(Boolean).join(" · ") || "File";

const inputCls =
  "w-full rounded-lg border border-[#dcd5c9] bg-white px-2.5 py-1.5 text-[13px] outline-none focus:border-[#00E676]";

const MODES = [
  { id: "link", label: "Website link" },
  { id: "file", label: "Upload file" },
];

export default function AssetPanel({ folder, assets, busy, onAddLink, onAddFile, onOpenAsset, onDelete, onClose }) {
  const [mode, setMode] = useState("link");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const fileRef = useRef(null);

  const reset = () => {
    setTitle("");
    setUrl("");
    setFile(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    reset();
    titleRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder.id]);

  const submit = async () => {
    const t = title.trim();
    if (!t) return setError("Give it a title.");
    if (mode === "link") {
      let u = url.trim();
      if (!u) return setError("Paste the link.");
      if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
      await onAddLink(folder.id, t, u);
    } else {
      if (!file) return setError("Choose a file to upload.");
      await onAddFile(folder.id, t, file);
    }
    reset();
  };

  return (
    <div className="w-full max-w-[680px] rounded-2xl border border-[#e5e2dc] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1a1a1a]">{folder.label}</h3>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
          aria-label="Close asset list"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-[#e5e2dc] p-3">
        <div className="mb-2.5 flex gap-1.5">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setError("");
              }}
              className={`h-7 rounded-full px-3 text-[12px] font-medium transition-colors ${
                mode === m.id ? "bg-[#0c130e] text-white" : "bg-[#f4f2ef] text-[#6b6b6b] hover:text-[#1a1a1a]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title — e.g. Primary logo pack"
          className={inputCls}
        />
        {mode === "link" ? (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="https://…"
            className={`mt-2 ${inputCls}`}
          />
        ) : (
          <label
            className={`mt-2 flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-dashed border-[#dcd5c9] px-2.5 py-1.5 text-[13px] ${
              file ? "text-[#1a1a1a]" : "text-[#9a9a9a]"
            }`}
          >
            <span className="truncate">
              {file ? `${file.name}${file.size ? ` · ${sizeOf(file.size)}` : ""}` : "Choose a file"}
            </span>
            <span className="shrink-0 text-[12px] text-[#6b6b6b]">Browse</span>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setError("");
              }}
            />
          </label>
        )}
        {error && <p className="mt-1.5 text-[12px] text-[#b0532f]">{error}</p>}
        <div className="mt-2.5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={reset}
            className="h-8 px-2 text-[12px] text-[#6b6b6b] transition-colors hover:text-[#1a1a1a]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="h-8 rounded-lg bg-[#00E676] px-3 text-[12px] font-semibold text-[#0c130e] disabled:opacity-50"
          >
            {busy ? "Saving…" : mode === "link" ? "Add link" : "Upload"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 text-[13px] font-semibold text-[#6b6b6b]">Saved assets</h4>
        {assets.length === 0 ? (
          <p className="text-[13px] text-[#9a9a9a]">Nothing here yet — add a link or upload a file above.</p>
        ) : (
          <ul className="space-y-1.5">
            {assets.map((a) => (
              <li key={a.id} className="group flex items-center gap-2.5 rounded-xl border border-[#e5e2dc] px-3 py-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f4f2ef] text-[#6b6b6b]">
                  {a.kind === "link" ? <Link2 className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-[#1a1a1a]">{a.title}</p>
                  <p className="truncate text-[12px] text-[#9a9a9a]">
                    {assetMeta(a)}
                    {a.added_by ? ` · ${a.added_by}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => onOpenAsset(a)}
                    className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
                    aria-label="Open asset"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => window.confirm("Remove this asset?") && onDelete(a.id)}
                    className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#b0532f]"
                    aria-label="Remove asset"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}