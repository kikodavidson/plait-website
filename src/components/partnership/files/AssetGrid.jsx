import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import AssetCard, { IMAGE_RE } from "./AssetCard";
import AssetFileRow from "./AssetFileRow";

const byNewest = (list) => [...(list || [])].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

/** The items inside an open folder: thumbnail grid for images and links, rows for other files. */
export default function AssetGrid({ folders, assets, data, signed, ensureSigned, emptyMessage }) {
  const [viewer, setViewer] = useState(null);
  const list = byNewest(assets);
  const isImage = (a) => a.kind === "file" && IMAGE_RE.test(a.file_name || "");
  const cards = list.filter((a) => a.kind === "link" || isImage(a));
  const rows = list.filter((a) => a.kind === "file" && !isImage(a));

  useEffect(() => {
    cards.forEach((a) => {
      if (isImage(a) && a.file_uri && !signed[a.id]) ensureSigned(a);
    });
  });

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e) => e.key === "Escape" && setViewer(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [viewer]);

  const openAsset = async (a) => {
    if (a.kind === "link") {
      window.open(a.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (isImage(a)) {
      if (signed[a.id]) setViewer(signed[a.id]);
      return;
    }
    const s = await ensureSigned(a);
    if (s) window.open(s, "_blank", "noopener,noreferrer");
  };

  if (list.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#dcd5c9] px-4 py-8 text-center">
        <p className="text-[13px] text-[#9a9a9a]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {cards.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {cards.map((a) => (
            <AssetCard
              key={a.id}
              asset={a}
              folders={folders}
              data={data}
              signed={signed}
              onOpen={() => openAsset(a)}
            />
          ))}
        </div>
      )}
      {rows.length > 0 && (
        <ul className={`space-y-1.5 ${cards.length > 0 ? "mt-3" : ""}`}>
          {rows.map((a) => (
            <li key={a.id}>
              <AssetFileRow asset={a} folders={folders} data={data} onOpen={() => openAsset(a)} />
            </li>
          ))}
        </ul>
      )}
      {viewer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setViewer(null)}
        >
          <button
            className="absolute right-5 top-5 rounded-lg p-1.5 text-white/80 transition-colors hover:text-white"
            aria-label="Close image"
            onClick={() => setViewer(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img src={viewer} alt="" className="max-h-full max-w-full rounded-xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}