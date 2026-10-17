import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import GlassFolder, { hashString } from "@/components/ui/glass-folder-cards";
import PanelEditor from "./PanelEditor";
import FolderPanel from "./files/FolderPanel";
import { assetMeta, IMAGE_RE } from "./files/AssetCard";

const LEGACY_FOLDER_NAMES = { brand: "Brand Assets", contracts: "Contracts", reference: "Reference Files" };

const FOLDER_ART = {
  palette: "aurora",
  sparkles: "glacier",
  signature: "ember",
  scale: "dusk",
  library: "verdant",
};

const byNewest = (list) => [...(list || [])].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

/** Shared asset library: glass folder cards over a dotted desk. */
export default function FilesTab({ data }) {
  const { user } = useAuth();
  const [openId, setOpenId] = useState(null);
  const [signed, setSigned] = useState({});
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [addKey, setAddKey] = useState(0);

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

  // sign image thumbnails so the card fans and grids can show them
  useEffect(() => {
    if (!data.loaded) return;
    data.assets.forEach((a) => {
      if (a.kind === "file" && IMAGE_RE.test(a.file_name || "") && a.file_uri && !signed[a.id]) ensureSigned(a);
    });
  }, [data.loaded, data.assets, signed]);

  const filesByFolder = useMemo(() => {
    const map = {};
    data.folders.forEach((f) => {
      map[f.id] = byNewest(data.assets.filter((a) => a.folder_id === f.id))
        .slice(0, 4)
        .map((a) => ({
          id: a.id,
          name: a.title,
          meta: assetMeta(a),
          image:
            a.kind === "link"
              ? a.link_image || null
              : IMAGE_RE.test(a.file_name || "")
                ? signed[a.id] || null
                : null,
        }));
    });
    return map;
  }, [data.folders, data.assets, signed]);

  const selectFile = async (file) => {
    const a = data.assets.find((x) => x.id === file.id);
    if (!a) return;
    if (a.kind === "link") {
      window.open(a.url, "_blank", "noopener,noreferrer");
      return;
    }
    const s = await ensureSigned(a);
    if (s) window.open(s, "_blank", "noopener,noreferrer");
  };

  const createFolder = () => {
    const name = draft.trim();
    if (name) data.addFolder(name);
    setDraft("");
    setAdding(false);
  };

  const openFolder = data.folders.find((f) => f.id === openId) || null;

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
      <div className="relative mx-auto w-full max-w-[1060px]">
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
          <div className="mb-6">
            <PanelEditor
              value={draft}
              onChange={setDraft}
              onSave={createFolder}
              onCancel={() => setAdding(false)}
              placeholder="Folder name"
            />
          </div>
        )}

        {data.folders.length > 0 ? (
          <div className="grid grid-cols-1 items-end justify-items-center gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {data.folders.map((f, i) => (
              <GlassFolder
                key={f.id}
                label={f.name}
                art={FOLDER_ART[f.icon] || "aurora"}
                seed={hashString(f.name + f.id) % 997}
                files={filesByFolder[f.id] || []}
                action="add"
                closeOnOutside={false}
                open={openId === f.id}
                onOpenChange={(o) => setOpenId(o ? f.id : null)}
                onAdd={() => {
                  setOpenId(f.id);
                  setAddKey((k) => k + 1);
                  return false
                }}
                onFileSelect={(file) => selectFile(file)}
                width={300}
                appearDelay={i * 120}
              />
            ))}
          </div>
        ) : (
          !adding && (
            <p className="py-6 text-center text-[13px] text-[#9a9a9a]">No folders yet — create your first one.</p>
          )
        )}

        {openFolder && (
          <FolderPanel
            folder={openFolder}
            folders={data.folders}
            assets={data.assets.filter((a) => a.folder_id === openFolder.id)}
            data={data}
            author={author}
            signed={signed}
            ensureSigned={ensureSigned}
            autoAddKey={openId === openFolder.id ? addKey : 0}
          />
        )}
      </div>
    </div>
  );
}