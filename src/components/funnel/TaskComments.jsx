import React, { useState } from "react";
import moment from "moment";
import { ACCENT } from "@/lib/funnelPlan";

export default function TaskComments({ comments, onAdd }) {
  const [body, setBody] = useState("");

  const submit = () => {
    if (!body.trim()) return;
    onAdd(body.trim());
    setBody("");
  };

  return (
    <div className="mt-3 rounded-2xl border border-[#2C2C31] bg-[#141416] p-3">
      {comments.length === 0 ? (
        <p className="text-[12px] text-[#5A5C55]">No comments yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id}>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#8E9089]">
                {c.author || "Partner"} · {moment(c.created_date).fromNow()}
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-[13px] leading-relaxed text-white/90">{c.body}</p>
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
          className="min-w-0 flex-1 rounded-lg border border-[#2C2C31] bg-[#0F0F11] px-3 py-2 text-[13px] text-white outline-none placeholder:text-[#5A5C55] focus:border-[#C8FF3D]"
        />
        <button
          onClick={submit}
          className="rounded-lg px-3 py-2 text-[12px] font-extrabold text-black"
          style={{ backgroundColor: ACCENT }}
        >
          Post
        </button>
      </div>
    </div>
  );
}