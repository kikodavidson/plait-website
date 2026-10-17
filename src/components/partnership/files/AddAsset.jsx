import React, { useRef, useState } from "react";
import { Plus, Link2, Upload, Loader2 } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { base44 } from "@/api/base44Client";

const ACCEPT = "image/*,.pdf,.doc,.docx,.rtf,.txt,.md,.ttf,.otf,.woff,.woff2";

/** The + Add control for a folder: upload files or save a link with an auto-pulled preview. */
export default function AddAsset({ folder, author, data, autoAddKey = 0 }) {
  const [mode, setMode] = useState(null);

  React.useEffect(() => {
    if (autoAddKey) setMode("upload");
  }, [autoAddKey]);

  const [url, setUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const uploadFiles = async (files) => {
    const list = Array.from(files || []).slice(0, 10);
    if (!list.length) return;
    setBusy(true);
    setError("");
    try {
      for (const file of list) {
        const up = await base44.integrations.Core.UploadPrivateFile({ file });
        await data.addAsset({
          folder_id: folder.id,
          title: file.name,
          kind: "file",
          file_uri: up.file_uri,
          file_name: file.name,
          file_size: file.size,
          added_by: author,
        });
      }
    } catch {
      setError("Upload failed — try again.");
    } finally {
      setBusy(false);
    }
  };

  const saveLink = async () => {
    let u = url.trim();
    if (!u) {
      setError("Paste a link first.");
      return;
    }
    if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
    setBusy(true);
    setError("");
    try {
      let preview = {};
      try {
        const res = await base44.functions.invoke("fetchLinkPreview", { url: u });
        preview = res?.data || {};
      } catch {
        // preview is a nicety, not a requirement
      }
      let site = "Link";
      try {
        site = new URL(u).hostname.replace(/^www\./, "");
      } catch {
        site = "Link";
      }
      await data.addAsset({
        folder_id: folder.id,
        title: (preview.title || site).trim() || "Untitled link",
        kind: "link",
        url: u,
        added_by: author,
        link_image: preview.image || null,
        link_site: site,
      });
      setUrl("");
    } catch {
      setError("Could not save that link.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setMode("upload")}>
            <Upload /> Upload file
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMode("link")}>
            <Link2 /> Add link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {mode === "upload" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            uploadFiles(e.dataTransfer.files);
          }}
          onClick={() => !busy && fileRef.current?.click()}
          className={`mt-3 cursor-pointer rounded-xl border border-dashed px-4 py-6 text-center text-[13px] ${
            dragOver ? "border-[#00E676] bg-[#f0fbf5] text-[#0c130e]" : "border-[#dcd5c9] text-[#9a9a9a]"
          }`}
        >
          {busy ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin text-[#6b6b6b]" />
          ) : (
            "Drop files here or click to browse — images, PDFs, docs, and fonts"
          )}
          <input
            ref={fileRef}
            type="file"
            multiple
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => {
              uploadFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      )}

      {mode === "link" && (
        <div className="mt-3 flex items-center gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveLink();
              }
            }}
            placeholder="https://…"
            className="h-8 min-w-0 flex-1 rounded-lg border border-[#dcd5c9] bg-white px-2.5 text-[13px] outline-none focus:border-[#00E676]"
          />
          <button
            onClick={saveLink}
            disabled={busy}
            className="h-8 shrink-0 rounded-lg bg-[#00E676] px-3 text-[12px] font-semibold text-[#0c130e] disabled:opacity-50"
          >
            {busy ? "Fetching…" : "Save"}
          </button>
        </div>
      )}

      {error && <p className="mt-1.5 text-[12px] text-[#b0532f]">{error}</p>}
    </div>
  );
}