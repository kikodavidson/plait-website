import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const PROMPTS = [
  "What feeling should people walk away with after working with us?",
  "What kind of people in business do we want to be?",
  "What should this brand never feel like?",
];

/** Phase 1 — agree on the feeling in words before anything visual. */
export default function FoundationPhase({ phase, data }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => setText(phase.content || ""), [phase.id, phase.content]);

  const save = async () => {
    setBusy(true);
    try {
      await data.updateVibePhase(phase.id, { content: text });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-4">
        <h4 className="text-[15px] font-semibold text-[#1a1a1a]">Talk through it first</h4>
        <ul className="mt-2 space-y-1.5">
          {PROMPTS.map((p) => (
            <li key={p} className="text-[14px] leading-relaxed text-[#6b6b6b]">
              · {p}
            </li>
          ))}
        </ul>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[12px] font-semibold text-[#6b6b6b]">
          Working notes — the feeling, in our words
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Write it down while it's fresh…"
          className="w-full resize-none rounded-lg border border-[#dcd5c9] px-3 py-2 text-[14px] outline-none focus:border-[#619e80]"
        />
      </label>
      <button
        onClick={save}
        disabled={busy || text === (phase.content || "")}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#00E676] px-4 py-2 text-[13px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Save notes
      </button>
    </div>
  );
}