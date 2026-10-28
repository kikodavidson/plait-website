import React, { useEffect, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";
import { LEVELS, LEVEL_ORDER } from "@/lib/moodBoardConfig";

const inputCls = "rounded-lg border-[#e5e2dc] bg-white text-[13.5px]";

/** Add-reference dialog: upload or paste an image, pick level + sub section, explain why. */
export default function AddMoodItemDialog({ open, onOpenChange, defaultLevel, onSubmit }) {
  const [level, setLevel] = useState("mood");
  const [sub, setSub] = useState("");
  const [mode, setMode] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setLevel(defaultLevel || "mood");
      setSub("");
      setMode("url");
      setImageUrl("");
      setFile(null);
      setSource("");
      setNote("");
    }
  }, [open, defaultLevel]);

  const validImage = mode === "url" ? /^https?:\/\/.+/i.test(imageUrl.trim()) : !!file;
  const canSubmit = validImage && !!sub && note.trim().length > 0 && !busy;

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    try {
      let img = imageUrl.trim();
      if (mode === "upload") {
        const res = await base44.integrations.Core.UploadPublicFile({ file });
        img = res.file_url;
      }
      await onSubmit({
        level,
        sub_section: sub,
        image_url: img,
        source_link: source.trim() || undefined,
        note: note.trim(),
      });
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[#e5e2dc]">
        <DialogHeader>
          <DialogTitle>Add a reference</DialogTitle>
          <DialogDescription>Upload or paste an image, then explain why you like it.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-[#525252]">Level</label>
              <Select
                value={level}
                onValueChange={(v) => {
                  setLevel(v);
                  setSub("");
                }}
              >
                <SelectTrigger className={`h-9 w-full ${inputCls}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_ORDER.map((id) => (
                    <SelectItem key={id} value={id}>
                      {LEVELS[id].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-medium text-[#525252]">Sub section</label>
              <Select value={sub || ""} onValueChange={setSub}>
                <SelectTrigger className={`h-9 w-full ${inputCls}`}>
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS[level].subs.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#525252]">Image</label>
            <div className="mb-2 flex gap-1.5">
              <button
                onClick={() => setMode("url")}
                className={`h-7 rounded-full border px-3 text-[12px] font-medium transition-colors ${
                  mode === "url" ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : "border-[#e5e2dc] text-[#525252]"
                }`}
              >
                Paste URL
              </button>
              <button
                onClick={() => setMode("upload")}
                className={`h-7 rounded-full border px-3 text-[12px] font-medium transition-colors ${
                  mode === "upload" ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : "border-[#e5e2dc] text-[#525252]"
                }`}
              >
                Upload file
              </button>
            </div>
            {mode === "url" ? (
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…"
                className={`h-9 ${inputCls}`}
              />
            ) : (
              <label className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#d5d1c8] text-[13px] text-[#525252] hover:bg-[#faf9f7]">
                <UploadCloud className="h-4 w-4" />
                {file ? file.name : "Choose an image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files && e.target.files[0])}
                />
              </label>
            )}
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#525252]">Source link (optional)</label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="https://…"
              className={`h-9 ${inputCls}`}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-medium text-[#525252]">
              Why I like it <span className="text-[#8a857c]">(required)</span>
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Short explanation…"
              className={inputCls}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={submit}
            disabled={!canSubmit}
            className="h-9 rounded-lg bg-[#00E676] px-4 text-[13px] font-semibold text-black hover:bg-[#00E676] hover:opacity-90"
          >
            {busy && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            Add to board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}