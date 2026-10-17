import React, { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2, Palette, Sparkles, FileSignature, Scale, Library } from "lucide-react";
import SheenPill from "../SheenPill";
import PanelEditor from "../PanelEditor";
import AddAsset from "./AddAsset";
import AssetGrid from "./AssetGrid";

const FOLDER_ICONS = { palette: Palette, sparkles: Sparkles, signature: FileSignature, scale: Scale, library: Library };

const EMPTY_MESSAGES = {
  "Brand Assets": "Drop your logos here",
  Inspiration: "Save the sites, ads, and brands you love",
  Contracts: "Keep the paperwork here",
  "Legal & Tax": "EINs, registrations, and tax notes",
  "Reference Files": "Anything else worth keeping",
};

/** Management panel for the folder opened from its glass card. */
export default function FolderPanel({ folder, folders, assets, data, author, signed, ensureSigned, autoAddKey }) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(folder.name);
  const Icon = FOLDER_ICONS[folder.icon] || Library;
  const emptyMessage = EMPTY_MESSAGES[folder.name] || "Nothing here yet — add a link or upload a file";

  const saveName = () => {
    const n = name.trim();
    if (n && n !== folder.name) data.renameFolder(folder.id, n);
    else setName(folder.name);
    setRenaming(false);
  };

  return (
    <div className="mt-12 rounded-2xl border border-[#e5e2dc] bg-white px-4 py-5 sm:px-6">
      <div className="group mb-4 flex items-center gap-3 border-b border-[#efece8] pb-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f2ef] text-[#1a1a1a]">
          <Icon className="h-4 w-4" />
        </span>
        {renaming ? (
          <div className="min-w-0 flex-1">
            <PanelEditor
              value={name}
              onChange={setName}
              onSave={saveName}
              onCancel={() => {
                setName(folder.name);
                setRenaming(false);
              }}
              placeholder="Folder name"
            />
          </div>
        ) : (
          <span className="min-w-0 flex-1 truncate text-[16px] font-semibold text-[#1a1a1a]">{folder.name}</span>
        )}
        <SheenPill tint="rgba(107,107,107,0.10)" text="#6b6b6b" className="px-2.5 py-0.5">
          {assets.length} {assets.length === 1 ? "item" : "items"}
        </SheenPill>
        <span className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => data.moveFolder(folder.id, -1)}
            className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
            aria-label="Move folder up"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => data.moveFolder(folder.id, 1)}
            className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
            aria-label="Move folder down"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setRenaming(true)}
            className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#1a1a1a]"
            aria-label="Rename folder"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() =>
              window.confirm(`Delete "${folder.name}" and its ${assets.length} item${assets.length === 1 ? "" : "s"}?`) &&
              data.deleteFolder(folder.id)
            }
            className="rounded-md p-1 text-[#c9c0b2] transition-colors hover:text-[#b0532f]"
            aria-label="Delete folder"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>
      <AddAsset folder={folder} author={author} data={data} autoAddKey={autoAddKey} />
      <div className="mt-4">
        <AssetGrid
          folders={folders}
          assets={assets}
          data={data}
          signed={signed}
          ensureSigned={ensureSigned}
          emptyMessage={emptyMessage}
        />
      </div>
    </div>
  );
}