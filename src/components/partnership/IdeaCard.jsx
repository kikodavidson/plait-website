import React from "react";
import { Heart, Minus, Trash2, X, ArrowUpToLine } from "lucide-react";
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

  return (
    <div
      className="rounded-2xl border border-[#e5e2dc] bg-white p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md sm:p-5"
      style={
        bothLove
          ? { border: `1px solid ${ACCENT}`, boxShadow: `0 0 0 1px ${ACCENT}55, 0 10px 30px -10px ${ACCENT}66` }
          : undefined
      }
    >
      <p className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#1a1a1a]">{idea.text}</p>
      <p className="mt-2 text-[12px] text-[#9a9a9a]">
        Added by {idea.author}
        {idea.created_date ? ` · ${moment(idea.created_date).format("MMM D")}` : ""}
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
          onClick={() => data.makeFinal(idea)}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: ACCENT }}
        >
          <ArrowUpToLine className="h-3.5 w-3.5" /> Make final
        </button>
        <button
          onClick={() => data.deleteIdea(idea.id)}
          className="rounded-full p-1.5 text-[#c4c4c4] transition-colors hover:bg-[#fdece8] hover:text-[#b0532f]"
          title="Delete idea"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}