import React, { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import FeelWordsHeadline from "@/components/moodboard/FeelWordsHeadline";
import MoodSection from "@/components/moodboard/MoodSection";
import { useMoodBoard } from "@/hooks/useMoodBoard";
import { ANTI_SUB, SECTIONS, voteStatus } from "@/lib/moodBoardConfig";

/** Brand Mood Board: one continuous visual page — feel words, four sections, votes. */
export default function MoodBoardTab({ userName }) {
  const {
    items,
    words,
    loading,
    addItem,
    updateItem,
    addWord,
    updateWord,
    deleteWord,
  } = useMoodBoard();
  const [freshIds, setFreshIds] = useState(() => new Set());

  const markFresh = (id) => setFreshIds((s) => new Set(s).add(id));
  const clearFresh = (id) =>
    setFreshIds((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });

  const visible = useMemo(() => items.filter((i) => voteStatus(i) !== "cut"), [items]);

  const addImages = async (level, sub, sources) => {
    for (const src of sources) {
      let url = src.url;
      if (src.file) {
        const res = await base44.integrations.Core.UploadPublicFile({ file: src.file });
        url = res.file_url;
      }
      const created = await addItem({
        level,
        sub_section: sub,
        image_url: url,
        added_by: userName,
      });
      markFresh(created.id);
    }
  };

  const vote = (item, v) => {
    const key = userName === "Luke" ? "vote_luke" : "vote_max";
    const current = userName === "Luke" ? item.vote_luke : item.vote_max;
    updateItem(item.id, { [key]: current === v ? null : v });
  };

  return (
    <div className="fade-in -mx-5 bg-[#F7F5F0] px-5 pb-24 pt-4 sm:-mx-8 sm:px-8">
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-[#8a857c]" />
        </div>
      ) : (
        <>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a857c]">
            Brand Mood Board
          </p>
          <FeelWordsHeadline
            words={words}
            onAdd={(w) => addWord(w, userName)}
            onUpdate={updateWord}
            onDelete={deleteWord}
          />
          <div className="mt-14 space-y-20">
            {SECTIONS.map((s) => (
              <MoodSection
                key={s.level}
                {...s}
                userName={userName}
                items={visible.filter((i) => i.level === s.level && i.sub_section !== ANTI_SUB)}
                antiItems={
                  s.level === "brands"
                    ? visible.filter((i) => i.level === "brands" && i.sub_section === ANTI_SUB)
                    : []
                }
                freshIds={freshIds}
                onAddImages={addImages}
                onVote={vote}
                onMetaSave={(item, patch) => updateItem(item.id, patch)}
                onMetaDone={clearFresh}
              />
            ))}
          </div>
          <p className="mt-16 text-[12px] text-[#b5b0a6]">
            Hover or tap an image to see why it's here and vote. Images both of you cut disappear
            from the board.
          </p>
        </>
      )}
    </div>
  );
}