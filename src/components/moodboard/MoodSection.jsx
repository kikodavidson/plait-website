import React, { useRef, useState } from "react";
import { Plus } from "lucide-react";
import MoodImage from "@/components/moodboard/MoodImage";
import { ANTI_SUB } from "@/lib/moodBoardConfig";

function AddTile({ onPick, label }) {
  const ref = useRef(null);
  return (
    <button
      onClick={() => ref.current?.click()}
      aria-label={label}
      className="mb-2 flex aspect-square w-full items-center justify-center bg-[#ece9e3] text-[#8a857c] transition-colors hover:bg-[#e3dfd7] hover:text-[#1a1a1a]"
    >
      <Plus className="h-7 w-7" />
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          onPick([...e.target.files]);
          e.target.value = "";
        }}
      />
    </button>
  );
}

/** One board section: tight masonry grid, + tile, drag-drop and paste support. */
export default function MoodSection({
  level,
  title,
  desc,
  sub,
  userName,
  items,
  antiItems,
  freshIds,
  onAddImages,
  onVote,
  onMetaSave,
  onMetaDone,
}) {
  const secRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (files, targetSub = sub) => {
    const imgs = files.filter((f) => f && f.type && f.type.startsWith("image/"));
    if (imgs.length) onAddImages(level, targetSub, imgs.map((file) => ({ file })));
  };

  const addUrl = (url, targetSub = sub) => onAddImages(level, targetSub, [{ url }]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dt = e.dataTransfer;
    if (dt.files && dt.files.length) {
      addFiles([...dt.files]);
      return;
    }
    const url = (dt.getData("text/uri-list") || dt.getData("text/plain") || "").trim();
    if (/^https?:\/\/.+/i.test(url)) addUrl(url);
  };

  const onPaste = (e) => {
    const files = [...(e.clipboardData?.items || [])]
      .filter((i) => i.kind === "file" && i.type.startsWith("image/"))
      .map((i) => i.getAsFile())
      .filter(Boolean);
    if (files.length) {
      e.preventDefault();
      addFiles(files);
      return;
    }
    const text = (e.clipboardData?.getData("text") || "").trim();
    if (/^https?:\/\/.+/i.test(text)) {
      e.preventDefault();
      addUrl(text);
    }
  };

  const gridCls = "mt-5 columns-2 gap-2 md:columns-3 xl:columns-4";

  return (
    <section
      ref={secRef}
      tabIndex={-1}
      onPaste={onPaste}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => secRef.current?.focus()}
      className={`block outline-none transition-shadow ${
        dragOver ? "shadow-[0_0_0_3px_#1a1a1a]" : ""
      }`}
    >
      <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-none tracking-tight text-[#1a1a1a]">
        {title}
      </h2>
      <p className="mt-2 text-[15px] text-[#8a857c]">{desc}</p>

      <div className={gridCls}>
        {items.map((i) => (
          <MoodImage
            key={i.id}
            item={i}
            userName={userName}
            fresh={freshIds.has(i.id)}
            onVote={(v) => onVote(i, v)}
            onMetaSave={(p) => onMetaSave(i, p)}
            onMetaDone={() => onMetaDone(i.id)}
          />
        ))}
        <AddTile onPick={(f) => addFiles(f)} label={`Add image to ${title}`} />
      </div>

      {level === "brands" && (
        <div className="mt-10">
          <h3 className="text-[clamp(20px,3vw,28px)] font-bold tracking-tight text-[#1a1a1a]">
            NOT US
          </h3>
          <div className={gridCls}>
            {antiItems.map((i) => (
              <MoodImage
                key={i.id}
                item={i}
                userName={userName}
                faded
                fresh={freshIds.has(i.id)}
                onVote={(v) => onVote(i, v)}
                onMetaSave={(p) => onMetaSave(i, p)}
                onMetaDone={() => onMetaDone(i.id)}
              />
            ))}
            <AddTile onPick={(f) => addFiles(f, ANTI_SUB)} label="Add image to NOT US" />
          </div>
        </div>
      )}
    </section>
  );
}