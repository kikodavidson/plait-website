import React, { useState } from "react";
import {
  ChevronDown, ChevronUp, Pencil, Trash2,
  Palette, Sparkles, FileSignature, Scale, Library, FolderOpen,
} from "lucide-react";
import SheenPill from "../SheenPill";
import PanelEditor from "../PanelEditor";
import AddAsset from "./AddAsset";
import AssetGrid from "./AssetGrid";

const FOLDER_ICONS = {
  palette: Palette,
  sparkles: Sparkles,
  signature: FileSignature,
  scale: Scale,
  library: Library,
};

const EMPTY_MESSAGES = {
  "Brand Assets": "Drop your logos here",
  Inspiration: "Save the sites, ads, and brands you love",
  Contracts: "Keep the paperwork here",
  "Legal & Tax": "EINs, registrations, and tax notes",
  "Reference Files": "Anything else worth keeping",
};

/** One folder row in the list; expands in place to show its items. */
export default function FolderRow({ folder, folders, assets, open, onToggle, data, author, signed, ensureSigned }) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(folder.name);
  const Icon = FOLDER_ICONS[folder.icon] || FolderOpen;
  const emptyMessage = EMPTY_MESSAGES[folder.name] || "Nothing here yet — add a link or upload a file";

  const saveName = () => {
    const n = name.trim();
    if (n && n !== folder.name) data.renameFolder(folder.id, n);
    else setName(folder.name);
    setRenaming(false);
  };

  return (
    <div className="rounded-xl border border-[#e5e2dc] bg-white">
      <div className="group flex items-center gap-3 px-4 py-3">
        <button onClick={onToggle} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f2ef] text-[#1a1a1a]">
            <Icon className="h-4 w-4" />
          </span>
          {renaming ? (
            <span className="min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
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
            </span>
          ) : (
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[#1a1a1a]">{folder.name}</span>
          )}
          <SheenPill tint="rgba(107,107,107,0.10)" text="#6b6b6b" className="px-2.5 py-0.5">
            {assets.length} {assets.length === 1 ? "item" : "items"}
          </SheenPill>
          <ChevronDown className={`h-4 w-4 shrink-0 text-[#c9c0b2] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
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
      {open && (
        <div className="border-t border-[#efece8] px-4 py-4">
          <AddAsset folder={folder} author={author} data={data} />
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
      )}
    </div>
  );
}