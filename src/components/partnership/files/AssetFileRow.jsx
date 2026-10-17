import React, { useState } from "react";
import moment from "moment";
import { FileText } from "lucide-react";
import PanelEditor from "../PanelEditor";
import ItemMenu from "./ItemMenu";
import { assetMeta } from "./AssetCard";

/** Row for a non-image file: PDFs, docs, fonts. */
export default function AssetFileRow({ asset, folders, data, onOpen }) {
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

  return (
    <div className="group flex items-center gap-2.5 rounded-xl border border-[#e5e2dc] bg-white px-3 py-2">
      {editing ? (
        <div className="min-w-0 flex-1">
          <PanelEditor
            value={editing === "title" ? title : note}
            onChange={editing === "title" ? setTitle : setNote}
            onSave={save}
            onCancel={cancel}
            placeholder={editing === "title" ? "Name" : "Add a short note"}
          />
        </div>
      ) : (
        <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f2ef] text-[#6b6b6b]">
            <FileText className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-[#1a1a1a]" title={asset.title}>
              {asset.title}
            </p>
            {asset.note && <p className="truncate text-[12px] text-[#9a9a9a]" title={asset.note}>{asset.note}</p>}
            <p className="truncate text-[12px] text-[#9a9a9a]">
              {assetMeta(asset)} · {asset.added_by ? `by ${asset.added_by} · ` : ""}
              {moment(asset.created_date).format("MMM D")}
            </p>
          </span>
        </button>
      )}
      <div className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
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