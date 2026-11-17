import React, { useState } from "react";
import moment from "moment";

export default function TaskComments({ comments, onAdd }) {
  const [body, setBody] = useState("");

  const submit = () => {
    if (!body.trim()) return;
    onAdd(body.trim());
    setBody("");
  };

  return (
    <div className="mt-3 rounded-xl border border-[#efece8] bg-white p-3">
      {comments.length === 0 ? (
        <p className="text-[12px] text-[#9a9a9a]">No comments yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id}>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#9a9a9a]">
                {c.author || "Partner"} · {moment(c.created_date).fromNow()}
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-[13px] leading-relaxed text-[#1a1a1a]">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add a comment"
          className="min-w-0 flex-1 rounded-lg border border-[#e5e2dc] bg-white px-3 py-2 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#b3aea6] focus:border-[#619e80]"
        />
        <button
          onClick={submit}
          className="rounded-lg bg-[#619e80] px-3 py-2 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
        >
          Post
        </button>
      </div>
    </div>
  );
}