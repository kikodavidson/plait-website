import React, { useRef, useState } from "react";
import { Plus } from "lucide-react";
import MoodImage from "@/components/moodboard/MoodImage";
import { ANTI_SUB } from "@/lib/moodBoardConfig";
import { isImageLink } from "@/lib/linkScreenshot";

/** The + tile: opens a single "Paste a link" input. */
function LinkTile({ onSubmit, label }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = () => {
    const v = draft.trim();
    setDraft("");
    setOpen(false);
    if (/^https?:\/\/.+/i.test(v)) onSubmit(v);
  };

  return open ? (
    <div className="mb-2 flex aspect-square w-full items-center justify-center bg-[#e3dfd7] px-4">
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") {
            setDraft("");
            setOpen(false);
          }
        }}
        placeholder="Paste a link"
        aria-label={label}
        className="w-full border-b border-[#1a1a1a] bg-transparent text-center text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#8a857c]"
      />
    </div>
  ) : (
    <button
      onClick={() => setOpen(true)}
      aria-label={label}
      className="mb-2 flex aspect-square w-full items-center justify-center bg-[#ece9e3] text-[#8a857c] transition-colors hover:bg-[#e3dfd7] hover:text-[#1a1a1a]"
    >
      <Plus className="h-7 w-7" />
    </button>
  );
}

/** One board section: tight masonry grid, + link tile, drag-drop and paste support. */
export default function MoodSection({
  level,
  title,
  desc,
  sub,
  userName,
  items,
  freshIds,
  onAddImages,
  onAddLink,
  onVote,
  onDelete,
  onMetaSave,
  onMetaDone,
}) {
  const secRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  // Which grid the pointer is over: pastes and drops land in that grid.
  const targetSubRef = useRef(sub);
  const setTarget = (v) => () => {
    targetSubRef.current = v;
  };
  const isAnti = sub === ANTI_SUB;

  const addFiles = (files, targetSub = sub) => {
    const imgs = files.filter((f) => f && f.type && f.type.startsWith("image/"));
    if (imgs.length) onAddImages(level, targetSub, imgs.map((file) => ({ file })));
  };

  const addTextUrl = (url, targetSub = sub) => {
    const v = url.trim();
    if (isImageLink(v)) onAddImages(level, targetSub, [{ url: v }]);
    else onAddLink(level, targetSub, v);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dt = e.dataTransfer;
    if (dt.files && dt.files.length) {
      addFiles([...dt.files], targetSubRef.current);
      return;
    }
    const url = (dt.getData("text/uri-list") || dt.getData("text/plain") || "").trim();
    if (/^https?:\/\/.+/i.test(url)) addTextUrl(url, targetSubRef.current);
  };

  const onPaste = (e) => {
    const files = [...(e.clipboardData?.items || [])]
      .filter((i) => i.kind === "file" && i.type.startsWith("image/"))
      .map((i) => i.getAsFile())
      .filter(Boolean);
    if (files.length) {
      e.preventDefault();
      addFiles(files, targetSubRef.current);
      return;
    }
    const text = (e.clipboardData?.getData("text") || "").trim();
    if (/^https?:\/\/.+/i.test(text)) {
      e.preventDefault();
      addTextUrl(text, targetSubRef.current);
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

      <div
        className={gridCls}
        onMouseEnter={setTarget(sub)}
        onDragEnter={setTarget(sub)}
      >
        {items.map((i) => (
          <MoodImage
            key={i.id}
            item={i}
            userName={userName}
            faded={isAnti}
            fresh={freshIds.has(i.id)}
            onVote={(v) => onVote(i, v)}
            onDelete={() => onDelete(i)}
            onMetaSave={(p) => onMetaSave(i, p)}
            onMetaDone={() => onMetaDone(i.id)}
          />
        ))}
        <LinkTile onSubmit={(link) => addTextUrl(link)} label={`Add a link to ${title}`} />
      </div>

    </section>
  );
}