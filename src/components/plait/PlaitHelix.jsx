import React from "react";

// Three-strand braid: three vertical sine waves (120° phase apart) that weave
// over and under one another at every crossing, cycling in strand order.
const W = 200;
const H = 380;
const CX = 100;
const AMP = 42;
const PERIOD = 120;
const SW = 7;

// Index order is fixed; each entry maps to a label key + color.
// Phases 0, 2π/3, 4π/3 give an evenly crossing three-strand braid.
const STRANDS = [
  { key: "website", color: "#E668A6", phase: 0 },
  { key: "ads", color: "#879AF4", phase: (2 * Math.PI) / 3 },
  { key: "attribution", color: "#D476C5", phase: (4 * Math.PI) / 3 },
];

function strandX(i, y) {
  return CX + AMP * Math.sin((2 * Math.PI * y) / PERIOD + STRANDS[i].phase);
}

function segmentPath(i, y0, y1) {
  const pts = [];
  for (let y = y0; y <= y1; y += 2) {
    pts.push(`${strandX(i, y).toFixed(2)},${y}`);
  }
  return "M" + pts.join(" L");
}

// With 120° phase spacing, six crossings occur per period, evenly spaced
// (PERIOD/6 apart), cycling through strand pairs (0,1),(1,2),(0,2).
const PAIR_SEQ = [
  { pair: [0, 1], y: PERIOD / 12 },
  { pair: [1, 2], y: PERIOD / 4 },
  { pair: [0, 2], y: (5 * PERIOD) / 12 },
];

function buildCrossings() {
  const crossings = [];
  for (let n = 0; n * (PERIOD / 2) < H + PERIOD; n++) {
    for (const p of PAIR_SEQ) {
      const y = n * (PERIOD / 2) + p.y;
      if (y > 0 && y < H) crossings.push({ y, pair: p.pair });
    }
  }
  crossings.sort((a, b) => a.y - b.y);
  return crossings;
}

// Split each strand into segments at every crossing. z[i] is strand i's depth
// (higher = drawn later = on top). At each crossing the two meeting strands
// swap depths, producing the over/under weave. Paths never change when a
// strand is toggled off — only that strand's segments stop rendering.
function buildSegments() {
  const crossings = buildCrossings();
  let z = [0, 1, 2];
  const segs = [];
  let prevY = 0;
  for (const c of crossings) {
    for (let i = 0; i < 3; i++) {
      segs.push({ i, y0: prevY, y1: c.y, z: z[i] });
    }
    const [a, b] = c.pair;
    [z[a], z[b]] = [z[b], z[a]];
    prevY = c.y;
  }
  for (let i = 0; i < 3; i++) {
    segs.push({ i, y0: prevY, y1: H, z: z[i] });
  }
  segs.sort((a, b) => a.z - b.z); // back (low z) first
  return segs;
}

export default function PlaitHelix({
  active = { ads: true, website: true, attribution: true },
  className = "",
}) {
  const segs = buildSegments();
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
    >
      {segs.map((s, idx) => {
        if (!active[STRANDS[s.i].key]) return null;
        return (
          <path
            key={idx}
            d={segmentPath(s.i, s.y0, s.y1)}
            stroke={STRANDS[s.i].color}
            strokeWidth={SW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}