import { useState } from "react";
import { motion } from "framer-motion";

const STRANDS = [
  { key: "ads", label: "Ads", color: "#7F77DD" },
  { key: "site", label: "Website", color: "#D4537E" },
  { key: "attr", label: "Attribution", color: "#D85A30" },
];

const COPY = {
  "111": ["All three connected", "One system.", "Ads bring people in. The site converts them. Attribution tells you what to buy more of."],
  "110": ["No attribution", "Working blind.", "Sales come in. You can't tell which ads made them."],
  "101": ["No website", "Traffic with nowhere to land.", "You know where the clicks came from. They still don't convert."],
  "011": ["No ads", "A great store on an empty street.", "Everything works. Nobody is coming."],
  "100": ["Ads only", "Money out, nothing back.", "You're buying clicks you can't convert and can't measure."],
  "010": ["Website only", "Nobody is coming.", "The site is ready. There is no traffic running through it."],
  "001": ["Attribution only", "Measuring nothing.", "Tracking is live. There is nothing to track."],
  "000": ["Nothing running", "Start with a strand.", "This is what zero looks like."],
};

function strandPath(index, amp) {
  const phase = index * 2.094;
  let d = "";
  for (let y = 6; y <= 294; y += 3) {
    const x = 60 + amp * Math.sin(y / 26 + phase);
    d += `${y === 6 ? "M" : "L"}${x.toFixed(1)} ${y} `;
  }
  return d;
}

export default function StrandToggle() {
  const [on, setOn] = useState([true, true, true]);
  const count = on.filter(Boolean).length;
  const amp = count === 3 ? 26 : count === 2 ? 19 : 11;
  const [eyebrow, headline, body] = COPY[on.map(Number).join("")];

  const toggle = (i) => setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <section className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-[200px_1fr]">
      <svg viewBox="0 0 120 300" className="mx-auto w-40 md:w-full" aria-hidden="true">
        {STRANDS.map((s, i) => (
          <motion.path
            key={s.key}
            fill="none"
            stroke={s.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={false}
            animate={{ d: strandPath(i, amp), opacity: on[i] ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div>
        <p className="mb-5 text-sm text-neutral-500">
          <em className="font-semibold text-neutral-700">Plait</em>: a single structure formed by interweaving separate strands; stronger than the sum of its parts.
        </p>
        <p className="mb-2 text-sm text-neutral-500">{eyebrow}</p>
        <h2 className="mb-3 text-4xl font-bold leading-tight tracking-tight">{headline}</h2>
        <p className="mb-7 min-h-[3.25rem] max-w-md text-neutral-600">{body}</p>

        <div className="flex flex-wrap gap-2.5">
          {STRANDS.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={on[i]}
              onClick={() => toggle(i)}
              className="rounded-none border px-4 py-1.5 text-sm transition-colors"
              style={{
                background: on[i] ? s.color : "transparent",
                borderColor: on[i] ? s.color : "#d4d4d4",
                color: on[i] ? "#fff" : "#a3a3a3",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-400">Switch one off and watch what breaks.</p>
      </div>
    </section>
  );
}