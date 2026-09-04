import React from "react";

const STYLES = `
.strand-switch {
  display: inline-flex;
  align-items: center;
  --track-bg: #e5e5e5;
  --knob: #a3a3a3;
}

/* The switch track — square edges to match the design system */
.strand-switch .track {
  --a: 0.5s ease-out;
  position: relative;
  display: inline-flex;
  height: 1em;
  border-radius: 0;
  box-shadow: 0 0 0 0.2em var(--track-bg);
  aspect-ratio: 212.4992 / 84.4688;
  background-color: var(--track-bg);
}

.strand-switch .track svg {
  height: 100%;
  width: auto;
}

.strand-switch .track svg path {
  color: var(--knob);
  stroke-width: 16;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 136 224;
  transition: all var(--a), 0s transform;
  transform-origin: center;
}

.strand-switch.is-on .track svg path {
  stroke-dashoffset: 180;
  transform: scaleY(-1);
}
`;

export default function StrandSwitch({ checked = false, className = "", style }) {
  return (
    <span
      className={`strand-switch ${checked ? "is-on" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <style>{STYLES}</style>
      <span className="track">
        <svg viewBox="0 0 212.4992 84.4688" overflow="visible">
          <path
            pathLength={360}
            fill="none"
            stroke="currentColor"
            d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0"
          />
        </svg>
      </span>
    </span>
  );
}