import React, { useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import GlassFolder from "@/components/ui/glass-folder-cards";
import AssetPanel, { assetMeta } from "./AssetPanel";
import { useAuth } from "@/lib/AuthContext";

const FOLDERS = [
  { id: "brand", label: "Brand assets", art: "aurora", seed: 3, appearDelay: 0 },
  { id: "contracts", label: "Contracts", art: "none", labelPlacement: "top-left", appearDelay: 140 },
  { id: "reference", label: "Reference files", tone: "dark", art: "ember", seed: 11, labelPlacement: "top-right", appearDelay: 280 },
];

/** Branding assets, contracts, and reference files for the partnership. */
export default function FilesTab({ data }) {
  const { user } = useAuth();
  const [openId, setOpenId] = useState(null);
  const [busy, setBusy] = useState(false);

  const first = (user?.full_name || user?.email || "").split(" ")[0];
  const author = ["Luke", "Max"].includes(first) ? first : user?.role === "admin" ? "Luke" : "Max";

  const cards = useMemo(() => {
    const map = {};
    FOLDERS.forEach((f) => {
      map[f.id] = (data.assets || [])
        .filter((a) => a.folder === f.id)
        .map((a) => ({ name: a.title, meta: assetMeta(a), asset: a }));
    });
    return map;
  }, [data.assets]);

  const openAsset = async (a) => {
    if (a.kind === "link") {
      window.open(a.url, "_blank", "noopener,noreferrer");
      return;
    }
    setBusy(true);
    try {
      const res = await base44.integrations.Core.CreateFileSignedUrl({ file_uri: a.file_uri });
      if (res?.signed_url) window.open(res.signed_url, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  };

  const addLink = async (folderId, title, url) => {
    await data.addAsset({ folder: folderId, title, kind: "link", url, added_by: author });
  };

  const addUpload = async (folderId, title, file) => {
    setBusy(true);
    try {
      const up = await base44.integrations.Core.UploadPrivateFile({ file });
      await data.addAsset({
        folder: folderId,
        title,
        kind: "file",
        file_uri: up.file_uri,
        file_name: file.name,
        file_size: file.size,
        added_by: author,
      });
    } finally {
      setBusy(false);
    }
  };

  const active = FOLDERS.find((f) => f.id === openId) || null;

  return (
    <div
      className="relative flex w-full flex-col items-center overflow-hidden rounded-2xl px-4 py-10 sm:px-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative grid w-full max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        {FOLDERS.map((f) => (
          <GlassFolder
            key={f.id}
            label={f.label}
            art={f.art}
            seed={f.seed}
            tone={f.tone}
            labelPlacement={f.labelPlacement}
            appearDelay={f.appearDelay}
            files={cards[f.id]}
            onAdd={() => {
              setOpenId(f.id);
              return false;
            }}
            onOpenChange={(o) => {
              if (o) setOpenId(f.id);
            }}
            onFileSelect={(card) => card.asset && openAsset(card.asset)}
          />
        ))}
      </div>

      {active && (
        <div className="relative mt-10 flex w-full justify-center">
          <AssetPanel
            folder={active}
            assets={(data.assets || []).filter((a) => a.folder === active.id)}
            busy={busy}
            onAddLink={addLink}
            onAddFile={addUpload}
            onOpenAsset={openAsset}
            onDelete={(id) => data.deleteAsset(id)}
            onClose={() => setOpenId(null)}
          />
        </div>
      )}

      <p className="relative mt-12 text-center text-[12px] text-[#6b6b6b]">
        Hover to lean · Click to open · + to add
      </p>
    </div>
  );
}