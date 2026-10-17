import React, { useState } from "react";
import moment from "moment";
import { Link2 } from "lucide-react";
import PanelEditor from "../PanelEditor";
import ItemMenu from "./ItemMenu";

export const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg|avif|heic)$/i;

export const extOf = (name = "") => {
  const m = /\.([a-zA-Z0-9]+)$/.exec(name);
  return m ? m[1].toUpperCase() : "FILE";
};

export const sizeOf = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const assetMeta = (a) =>
  a.kind === "link"
    ? a.link_site || "Link"
    : [extOf(a.file_name), sizeOf(a.file_size)].filter(Boolean).join(" · ") || "File";

/** Thumbnail card for images and links. */
export default function AssetCard({ asset, folders, data, signed, onOpen }) {
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState(asset.title);
  const [note, setNote] = useState(asset.note || "");

  const save = () => {
    if (editing === "title") data.updateAsset(asset.id, { title: title.trim() || asset.title });
    if (editing === "note") data.updateAsset(asset.id, { note: note.trim() });
    setEditing(null);
  };

  const cancel = () => {
    setTitle(asset.title);
    setNote(asset.note || "");
    setEditing(null);
  };

  const thumb = asset.kind === "link" ? asset.link_image : signed[asset.id];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#e5e2dc] bg-white">
      <button type="button" onClick={onOpen} className="block w-full text-left" aria-label={`Open ${asset.title}`}>
        <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#f4f2ef]">
          {thumb ? (
            <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <Link2 className="h-5 w-5 text-[#c9c0b2]" />
          )}
        </span>
      </button>
      <div className="px-2.5 py-2">
        {editing === "title" ? (
          <PanelEditor value={title} onChange={setTitle} onSave={save} onCancel={cancel} placeholder="Name" />
        ) : (
          <p className="truncate text-[13px] font-medium text-[#1a1a1a]" title={asset.title}>
            {asset.title}
          </p>
        )}
        {editing === "note" ? (
          <PanelEditor value={note} onChange={setNote} onSave={save} onCancel={cancel} placeholder="Add a short note" />
        ) : (
          asset.note && <p className="truncate text-[12px] text-[#9a9a9a]" title={asset.note}>{asset.note}</p>
        )}
        <p className="mt-0.5 truncate text-[12px] text-[#9a9a9a]">
          {assetMeta(asset)} · {asset.added_by ? `by ${asset.added_by} · ` : ""}
          {moment(asset.created_date).format("MMM D")}
        </p>
      </div>
      <div className="absolute right-1.5 top-1.5 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <ItemMenu
          asset={asset}
          folders={folders}
          onRename={() => setEditing("title")}
          onEditNote={() => setEditing("note")}
          onMove={(folderId) => data.updateAsset(asset.id, { folder_id: folderId })}
          onDelete={() => window.confirm(`Delete "${asset.title}"?`) && data.deleteAsset(asset.id)}
        />
      </div>
    </div>
  );
}