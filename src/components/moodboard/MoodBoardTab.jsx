import React, { useMemo, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import FeelWordsBar from "@/components/moodboard/FeelWordsBar";
import MoodCard from "@/components/moodboard/MoodCard";
import LockedPanel from "@/components/moodboard/LockedPanel";
import AddMoodItemDialog from "@/components/moodboard/AddMoodItemDialog";
import { useMoodBoard } from "@/hooks/useMoodBoard";
import { ALL_SUBS, LEVELS, LEVEL_ORDER, voteStatus } from "@/lib/moodBoardConfig";

const TABS = [{ id: "all", label: "All" }, ...LEVEL_ORDER.map((id) => ({ id, label: LEVELS[id].label }))];
const selectCls = "h-8 w-[150px] rounded-lg border-[#e5e2dc] bg-white text-[13px]";

/** Brand Mood Board: four level boards plus an All view of items both partners love. */
export default function MoodBoardTab({ userName }) {
  const { items, words, loading, addItem, updateItem, deleteItem, addWord, deleteWord } = useMoodBoard();
  const [tab, setTab] = useState("mood");
  const [subFilter, setSubFilter] = useState("");
  const [whoFilter, setWhoFilter] = useState("");
  const [voteFilter, setVoteFilter] = useState("");
  const [hidePartner, setHidePartner] = useState(false);
  const [adding, setAdding] = useState(false);

  const subOptions = tab === "all" ? ALL_SUBS : LEVELS[tab].subs;

  const filtered = useMemo(() => {
    let list = items;
    if (tab === "all") list = list.filter((i) => voteStatus(i) === "both");
    if (hidePartner) list = list.filter((i) => i.added_by === userName);
    if (whoFilter) list = list.filter((i) => i.added_by === whoFilter);
    if (subFilter) list = list.filter((i) => i.sub_section === subFilter);
    if (voteFilter) list = list.filter((i) => voteStatus(i) === voteFilter);
    return list;
  }, [items, tab, hidePartner, whoFilter, subFilter, voteFilter, userName]);

  const groups = useMemo(() => {
    const out = [];
    const push = (label, arr) => {
      if (arr.length) out.push({ label, items: arr });
    };
    if (tab === "all") {
      for (const lv of LEVEL_ORDER) {
        for (const sub of LEVELS[lv].subs) {
          push(`${LEVELS[lv].label} · ${sub}`, filtered.filter((i) => i.level === lv && i.sub_section === sub));
        }
      }
    } else {
      for (const sub of LEVELS[tab].subs) {
        push(sub, filtered.filter((i) => i.level === tab && i.sub_section === sub));
      }
    }
    return out;
  }, [filtered, tab]);

  const locked = useMemo(
    () => items.filter((i) => voteStatus(i) === "both" && (tab === "all" || i.level === tab)),
    [items, tab]
  );

  const vote = (item, v) => {
    const key = userName === "Luke" ? "vote_luke" : "vote_max";
    const current = userName === "Luke" ? item.vote_luke : item.vote_max;
    updateItem(item.id, { [key]: current === v ? null : v });
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-bold tracking-tight text-[#1a1a1a]">Brand Mood Board</h2>
          <p className="mt-0.5 text-[13px] text-[#8a857c]">
            Add what inspires you. Explain why. Vote together.
          </p>
        </div>
        <Button
          onClick={() => setAdding(true)}
          className="h-9 rounded-lg bg-[#00E676] px-3.5 text-[13px] font-semibold text-black hover:bg-[#00E676] hover:opacity-90"
        >
          <Plus className="mr-1.5 h-4 w-4" /> Add reference
        </Button>
      </div>

      {/* Feel words */}
      <div className="mt-5">
        <FeelWordsBar words={words} onAdd={(w) => addWord(w, userName)} onDelete={deleteWord} />
      </div>

      {/* Level tabs */}
      <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#e5e2dc] pb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setSubFilter("");
              setVoteFilter("");
            }}
            className={`h-8 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
              tab === t.id
                ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                : "border-[#e5e2dc] text-[#525252] hover:bg-[#f7f5f2]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filter row */}
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <Select value={subFilter || "all_subs"} onValueChange={(v) => setSubFilter(v === "all_subs" ? "" : v)}>
          <SelectTrigger className={selectCls}>
            <SelectValue placeholder="Sub section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_subs">All sub sections</SelectItem>
            {subOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={whoFilter || "all_who"} onValueChange={(v) => setWhoFilter(v === "all_who" ? "" : v)}>
          <SelectTrigger className={selectCls}>
            <SelectValue placeholder="Who added" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_who">Who added</SelectItem>
            <SelectItem value="Luke">Luke</SelectItem>
            <SelectItem value="Max">Max</SelectItem>
          </SelectContent>
        </Select>
        <Select value={voteFilter || "all_votes"} onValueChange={(v) => setVoteFilter(v === "all_votes" ? "" : v)}>
          <SelectTrigger className={selectCls}>
            <SelectValue placeholder="Vote status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_votes">Vote status</SelectItem>
            <SelectItem value="both">Both Love</SelectItem>
            <SelectItem value="split">Split</SelectItem>
            <SelectItem value="cut">Cut</SelectItem>
          </SelectContent>
        </Select>
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#525252]">
          <Switch checked={hidePartner} onCheckedChange={setHidePartner} />
          Hide partner's items
        </label>
      </div>

      {/* Board */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-[#8a857c]" />
        </div>
      ) : groups.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#d5d1c8] py-20 text-center">
          <p className="text-[15px] font-medium text-[#1a1a1a]">
            {tab === "all" ? "Nothing both of you love yet" : "Nothing on this board yet"}
          </p>
          <p className="mt-1 max-w-sm text-[13px] text-[#8a857c]">
            {tab === "all"
              ? "References you both voted Love show up here, across every level."
              : "Add a reference with the button above, then vote together."}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#8a857c]">
                {g.label}
              </h3>
              <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
                {g.items.map((i) => (
                  <MoodCard key={i.id} item={i} userName={userName} onVote={(v) => vote(i, v)} onDelete={deleteItem} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locked decisions */}
      {!loading && <LockedPanel items={locked} tab={tab} />}

      <AddMoodItemDialog
        open={adding}
        onOpenChange={setAdding}
        defaultLevel={tab === "all" ? "mood" : tab}
        onSubmit={addItem}
      />
    </div>
  );
}