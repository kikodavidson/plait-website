import React from "react";

// Vertical double-helix "plait" — two interlocking sine strands that weave
// over and under each other, matching the reference strand illustration.
const W = 200;
const H = 380;
const CX = 100;
const AMP = 42;
const PERIOD = 120;
const SW = 7;

function sinePath(sign) {
  const pts = [];
  for (let y = 0; y <= H; y += 3) {
    const x = CX + sign * AMP * Math.sin((2 * Math.PI * y) / PERIOD);
    pts.push(`${x.toFixed(2)},${y}`);
  }
  return "M" + pts.join(" L");
}

function sineSegment(sign, y0, y1) {
  const pts = [];
  for (let y = y0; y <= y1; y += 3) {
    const x = CX + sign * AMP * Math.sin((2 * Math.PI * y) / PERIOD);
    pts.push(`${x.toFixed(2)},${y}`);
  }
  return "M" + pts.join(" L");
}

const BLUE = "#879AF4";
const PINK = "#E668A6";

export default function PlaitHelix({ className = "" }) {
  const bluePath = sinePath(1); // ADS strand
  const pinkPath = sinePath(-1); // WEBSITE / ATTRIBUTION strand

  // Alternating intervals where the blue strand weaves over the pink one.
  const blueFront = [
    sineSegment(1, 0, PERIOD / 2),
    sineSegment(1, PERIOD, PERIOD * 1.5),
    sineSegment(1, PERIOD * 2, PERIOD * 2.5),
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
    >
      {/* Blue strand — bottom layer */}
      <path d={bluePath} stroke={BLUE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      {/* Pink strand — drawn over blue so it sits in front by default */}
      <path d={pinkPath} stroke={PINK} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      {/* Blue overlays where blue weaves over pink, creating the braid */}
      {blueFront.map((d, i) => (
        <path key={i} d={d} stroke={BLUE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}