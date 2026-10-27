import React, { useEffect, useState } from "react";
import { Image as ImageIcon, Link2, Loader2, Plus, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { faviconUrl, websiteHost } from "@/components/partnership/leads/leadMeta";

/** Phase 2 — collect links and images that carry the vibe. */
export default function CollectPhase({ items, data, userName }) {
  const mine = items.filter((it) => it.phase === "collect");
  const [thumbs, setThumbs] = useState({});
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const missing = mine.filter((it) => it.item_type === "image" && it.file_uri && !thumbs[it.id]);
    if (!missing.length) return;
    let alive = true;
    (async () => {
      const next = {};
      await Promise.all(
        missing.map(async (it) => {
          try {
            const res = await base44.integrations.Core.CreateFileSignedUrl({
              file_uri: it.file_uri,
              expires_in: 3600,
            });
            next[it.id] = res.signed_url;
          } catch (e) {
            // Leave a placeholder if the image can't be read.
          }
        })
      );
      if (alive) setThumbs((t) => ({ ...t, ...next }));
    })();
    return () => {
      alive = false;
    };
  }, [mine, thumbs]);

  const addLink = async () => {
    const url = linkUrl.trim();
    if (!url) return;
    setAdding(true);
    try {
      await data.addVibeItem({
        phase: "collect",
        item_type: "link",
        title: linkTitle.trim() || websiteHost(url),
        url,
        added_by: userName,
      });
      setLinkTitle("");
      setLinkUrl("");
    } finally {
      setAdding(false);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const up = await base44.integrations.Core.UploadPrivateFile({ file });
      await data.addVibeItem({
        phase: "collect",
        item_type: "image",
        title: file.name,
        file_uri: up.file_uri,
        added_by: userName,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-40 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
        />
        <input
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addLink()}
          placeholder="Paste a link (site, IG post, moodboard…)"
          className="min-w-[200px] flex-1 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
        />
        <button
          onClick={addLink}
          disabled={adding || !linkUrl.trim()}
          className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
          Add link
        </button>
        <label className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[#e5e2dc] bg-white px-2.5 text-[12px] font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5f3ef]">
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
          Upload image
          <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
        </label>
      </div>

      {mine.length === 0 && (
        <p className="mt-5 text-[14px] text-[#9a9a9a]">
          Nothing collected yet — drop in anything that feels right, no curation needed.
        </p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {mine.map((it) => (
          <div
            key={it.id}
            className="group relative rounded-xl border border-[#e5e2dc] bg-white p-3 transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => data.deleteVibeItem(it.id)}
              className="absolute right-2 top-2 rounded-md bg-white/90 p-1 text-[#c4c4c4] opacity-0 transition-opacity hover:text-[#b0532f] group-hover:opacity-100"
              aria-label="Remove"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            {it.item_type === "image" ? (
              <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-[#f5f3f0]">
                {thumbs[it.id] ? (
                  <img src={thumbs[it.id]} alt={it.title} className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-[#c4c4c4]" />
                )}
              </div>
            ) : (
              <a
                href={it.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-28 flex-col items-center justify-center gap-2 rounded-lg bg-[#f5f3f0] text-center"
              >
                {faviconUrl(it.url) && <img src={faviconUrl(it.url)} alt="" className="h-6 w-6" />}
                <span className="flex items-center gap-1 px-2 text-[12px] text-[#6b6b6b]">
                  <Link2 className="h-3 w-3" /> {websiteHost(it.url)}
                </span>
              </a>
            )}
            <p className="mt-2 truncate text-[13px] font-medium text-[#1a1a1a]" title={it.title}>
              {it.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}