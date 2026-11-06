import React, { useState } from "react";
import { Heart, Minus, Trash2, X, Lock, Unlock, Pencil } from "lucide-react";
import moment from "moment";
import { ACCENT, ACCENT_TEXT } from "./accent";

const VOTES = {
  love: { label: "Love", color: ACCENT, text: ACCENT_TEXT, Icon: Heart },
  maybe: { label: "Maybe", color: "#d9a400", text: "#ffffff", Icon: Minus },
  no: { label: "No", color: "#b0532f", text: "#ffffff", Icon: X },
};
const voteLabel = (v) => (v ? VOTES[v].label : "—");

/** One idea card: text, author, per-partner votes, and promote-to-final. */
export default function IdeaCard({ idea, data, userName }) {
  const myKey = userName === "Luke" ? "vote_luke" : "vote_max";
  const myVote = idea[myKey];
  const bothLove = idea.vote_luke === "love" && idea.vote_max === "love";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(idea.text);

  const saveEdit = () => {
    const t = draft.trim();
    if (t && t !== idea.text) data.updateIdea(idea.id, { text: t });
    setEditing(false);
  };

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 ease-out sm:p-5 ${
        idea.locked
          ? "border-[#e8e4dd] bg-[#faf9f7]"
          : "border-[#e5e2dc] bg-white hover:-translate-y-0.5 hover:shadow-md"
      }`}
      style={
        bothLove && !idea.locked
          ? { border: `1px solid ${ACCENT}`, boxShadow: `0 0 0 1px ${ACCENT}55, 0 10px 30px -10px ${ACCENT}66` }
          : undefined
      }
    >
      {editing ? (
        <div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) saveEdit();
              if (e.key === "Escape") setEditing(false);
            }}
            rows={3}
            autoFocus
            className="w-full resize-none rounded-xl border border-[#dcd5c9] px-3 py-2.5 text-[15px] leading-[1.6] outline-none focus:border-[#619e80]"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={saveEdit}
              disabled={!draft.trim()}
              className="rounded-full px-3 py-1 text-[12px] font-semibold text-white hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: ACCENT }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setDraft(idea.text);
                setEditing(false);
              }}
              className="inline-flex items-center gap-1 rounded-full border border-[#e5e2dc] px-3 py-1 text-[12px]"
            >
              <X className="h-3 w-3" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <p
          className={`whitespace-pre-wrap text-[15px] leading-[1.6] ${
            idea.locked
              ? "text-[#9a9a9a] line-through decoration-[#c0bbb2] decoration-1"
              : "text-[#1a1a1a]"
          }`}
        >
          {idea.text}
        </p>
      )}
      <p className="mt-2 text-[12px] text-[#9a9a9a]">
        Added by {idea.author}
        {idea.created_date ? ` · ${moment(idea.created_date).format("MMM D")}` : ""}
        {idea.locked ? ` · Locked in${idea.locked_by ? ` by ${idea.locked_by}` : ""}` : ""}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {Object.entries(VOTES).map(([key, meta]) => {
          const active = myVote === key;
          const { Icon } = meta;
          return (
            <button
              key={key}
              onClick={() => data.voteIdea(idea.id, userName, key)}
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] transition-colors"
              style={
                active
                  ? { backgroundColor: `${meta.color}22`, borderColor: meta.color, color: meta.color }
                  : { borderColor: "#e5e2dc", color: "#6b6b6b" }
              }
            >
              <Icon className="h-3 w-3" /> {meta.label}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-[12px] text-[#9a9a9a]">
        Luke: {voteLabel(idea.vote_luke)} · Max: {voteLabel(idea.vote_max)}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#f0eeea] pt-3">
        <button
          onClick={() => data.lockIdea(idea, userName)}
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-semibold transition-colors"
          style={
            idea.locked
              ? { borderColor: "#e5e2dc", color: "#9a9a9a" }
              : { borderColor: ACCENT, color: "#0c5c34", backgroundColor: "rgba(97,158,128,0.10)" }
          }
          title={idea.locked ? "Unlock to bring this idea back" : "Lock this idea in"}
        >
          {idea.locked ? (
            <>
              <Unlock className="h-3.5 w-3.5" /> Locked in
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" /> Lock in
            </>
          )}
        </button>
        <div className="flex items-center gap-1">
          {!editing && (
            <button
              onClick={() => {
                setDraft(idea.text);
                setEditing(true);
              }}
              className="rounded-full p-1.5 text-[#c4c4c4] transition-colors hover:bg-[#f4f2ef] hover:text-[#1a1a1a]"
              title="Edit idea"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={() => data.deleteIdea(idea.id)}
            className="rounded-full p-1.5 text-[#c4c4c4] transition-colors hover:bg-[#fdece8] hover:text-[#b0532f]"
            title="Delete idea"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}