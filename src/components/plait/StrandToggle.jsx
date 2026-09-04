import { useState } from "react";
import StrandSwitch from "@/components/ui/strand-switch";

const STRANDS = [
  { key: "ads", label: "Ads", color: "#7F77DD", hi: "#B9B4F2" },
  { key: "site", label: "Website", color: "#D4537E", hi: "#F08FAF" },
  { key: "attr", label: "Attribution", color: "#D85A30", hi: "#F59663" },
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

const GRID = 8; // pixel pitch of the halftone grid
const BAND = 26; // how far each strand's dot halo spreads from its centerline
const MAX_SIZE = 7; // largest square, slightly smaller than the pitch so gaps remain

// Builds the halftone squares for one strand: an aligned grid of squares that
// grow and brighten as they approach the strand's sinusoidal centerline.
function strandDots(index, amp) {
  const phase = index * 2.094;
  const dots = [];
  for (let gy = 8; gy <= 292; gy += GRID) {
    const cx = 60 + amp * Math.sin(gy / 26 + phase);
    for (let gx = 12; gx <= 108; gx += GRID) {
      const dx = Math.abs(gx - cx);
      if (dx > BAND) continue;
      const t = 1 - dx / BAND;
      const scale = Math.pow(t, 1.5) * (MAX_SIZE / GRID);
      if (scale < 0.12) continue;
      dots.push({ key: `${gx}-${gy}`, gx, gy, scale, t });
    }
  }
  return dots;
}

export default function StrandToggle() {
  const [on, setOn] = useState([true, true, true]);
  const count = on.filter(Boolean).length;
  const amp = count === 3 ? 26 : count === 2 ? 19 : 11;
  const [eyebrow, headline, body] = COPY[on.map(Number).join("")];

  const toggle = (i) => setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <section className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-[200px_1fr]">
      {/* Halftone weave on black — matches the hero's dot-matrix style */}
      <div className="rounded-none bg-black">
        <svg viewBox="0 0 120 300" className="mx-auto block w-40 md:w-full" aria-hidden="true">
          <rect width="120" height="300" fill="#000000" />
          {STRANDS.map((s, i) => (
            <g
              key={s.key}
              style={{
                opacity: on[i] ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              {strandDots(i, amp).map((d) => (
                <rect
                  key={d.key}
                  x={d.gx - GRID / 2}
                  y={d.gy - GRID / 2}
                  width={GRID}
                  height={GRID}
                  fill={d.t > 0.85 ? s.hi : s.color}
                  fillOpacity={0.35 + 0.65 * d.t}
                  style={{
                    transform: `scale(${d.scale})`,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>

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
              className="flex items-center gap-2.5 rounded-none border px-4 py-1.5 text-sm transition-colors"
              style={{
                background: on[i] ? s.color : "transparent",
                borderColor: on[i] ? s.color : "#d4d4d4",
                color: on[i] ? "#fff" : "#a3a3a3",
              }}
            >
              {s.label}
              <StrandSwitch
                checked={on[i]}
                style={{
                  "--track-bg": on[i] ? "#ffffff" : "#e5e5e5",
                  "--knob": "#000000",
                }}
              />
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-400">Switch one off and watch what breaks.</p>
      </div>
    </section>
  );
}