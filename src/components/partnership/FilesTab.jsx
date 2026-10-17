import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PanelEditor from "./PanelEditor";
import FolderRow from "./files/FolderRow";

const LEGACY_FOLDER_NAMES = { brand: "Brand Assets", contracts: "Contracts", reference: "Reference Files" };

/** Shared asset library: folders that expand in place, holding links and files. */
export default function FilesTab({ data }) {
  const { user } = useAuth();
  const [openId, setOpenId] = useState(null);
  const [signed, setSigned] = useState({});
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const first = (user?.full_name || user?.email || "").split(" ")[0];
  const author = ["Luke", "Max"].includes(first) ? first : user?.role === "admin" ? "Luke" : "Max";

  // move records saved under the old fixed folders onto the matching folder
  useEffect(() => {
    if (!data.loaded) return;
    data.assets.forEach((a) => {
      if (a.folder_id || !LEGACY_FOLDER_NAMES[a.folder]) return;
      const folder = data.folders.find((f) => f.name === LEGACY_FOLDER_NAMES[a.folder]);
      if (folder) data.updateAsset(a.id, { folder_id: folder.id });
    });
  }, [data.loaded, data.assets, data.folders, data.updateAsset]);

  const ensureSigned = async (asset) => {
    if (!asset.file_uri) return null;
    if (signed[asset.id]) return signed[asset.id];
    const res = await base44.integrations.Core.CreateFileSignedUrl({ file_uri: asset.file_uri, expires_in: 3600 });
    setSigned((s) => ({ ...s, [asset.id]: res.signed_url }));
    return res.signed_url;
  };

  const createFolder = () => {
    const name = draft.trim();
    if (name) data.addFolder(name);
    setDraft("");
    setAdding(false);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl px-4 py-8 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto w-full max-w-[860px]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#1a1a1a]">Files</h3>
          <button
            onClick={() => setAdding((v) => !v)}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" /> New folder
          </button>
        </div>

        {adding && (
          <div className="mb-4">
            <PanelEditor
              value={draft}
              onChange={setDraft}
              onSave={createFolder}
              onCancel={() => setAdding(false)}
              placeholder="Folder name"
            />
          </div>
        )}

        <div className="space-y-2">
          {data.folders.map((f) => (
            <FolderRow
              key={f.id}
              folder={f}
              folders={data.folders}
              assets={data.assets.filter((a) => a.folder_id === f.id)}
              open={openId === f.id}
              onToggle={() => setOpenId(openId === f.id ? null : f.id)}
              data={data}
              author={author}
              signed={signed}
              ensureSigned={ensureSigned}
            />
          ))}
          {data.folders.length === 0 && !adding && (
            <p className="py-6 text-center text-[13px] text-[#9a9a9a]">No folders yet — create your first one.</p>
          )}
        </div>
      </div>
    </div>
  );
}