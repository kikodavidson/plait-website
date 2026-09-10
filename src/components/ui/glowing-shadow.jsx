import React from "react";

// Black/orange "glowing shadow" card wrapper.
// Ported from a Next.js styled-jsx component — CSS is embedded as a plain
// <style> string (styled-jsx is incompatible with Vite). Hue is locked to
// orange (hsl ~26deg) instead of the original rotating rainbow.
const CSS = `
@property --rotate {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --bg-x {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --bg-y {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --bg-size {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --glow-blur {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --glow-opacity {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --glow-scale {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}

.glow-container {
  --card-radius: 12px;
  --border-width: 3px;
  --bg-size: 1;
  --animation-speed: 4s;
  --interaction-speed: 0.55s;
  --glow-blur: 6;
  --glow-opacity: 1;
  --glow-scale: 1.15;
  --rotate: 0;
  position: relative;
  width: 100%;
  display: block;
}

.glow-container .glow {
  display: block;
  position: absolute;
  top: 35%;
  left: 35%;
  width: 30%;
  height: 30%;
  pointer-events: none;
  border-radius: 999px;
  animation: glow-rotate var(--animation-speed) linear infinite;
  transform: rotateZ(calc(var(--rotate) * 1deg));
  transform-origin: center;
}

.glow-container .glow:after {
  content: "";
  display: block;
  position: absolute;
  width: 130%;
  height: 130%;
  left: -15%;
  top: -15%;
  border-radius: 999px;
  background: hsl(26deg 100% 55%);
  filter: blur(calc(var(--glow-blur) * 6px));
  opacity: var(--glow-opacity);
  transform: scale(var(--glow-scale));
  transition: --glow-blur var(--interaction-speed) ease,
              --glow-opacity var(--interaction-speed) ease,
              --glow-scale var(--interaction-speed) ease;
}

.glow-container .glow-content {
  position: relative;
  z-index: 2;
  width: 100%;
  background: #0d0d10;
  border-radius: calc(var(--card-radius) - 2px);
}

.glow-container .glow-content:before {
  content: "";
  display: block;
  position: absolute;
  inset: calc(var(--border-width) / -2);
  border-radius: var(--card-radius);
  z-index: -1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  background: hsl(0deg 0% 16%) radial-gradient(
    30% 30% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
    hsl(28deg 100% 65%) calc(0% * var(--bg-size)),
    hsl(28deg 100% 55%) calc(20% * var(--bg-size)),
    hsl(24deg 95% 45%) calc(40% * var(--bg-size)),
    transparent 100%
  );
  animation: rotate-bg var(--animation-speed) linear infinite;
  transition: --bg-size var(--interaction-speed) ease;
}

.glow-container:hover .glow-content:before {
  --bg-size: 15;
}

.glow-container:hover .glow {
  animation-play-state: paused;
  --glow-blur: 2;
  --glow-opacity: 0.85;
  --glow-scale: 1.35;
}

@keyframes glow-rotate {
  from { --rotate: -70; }
  to { --rotate: 290; }
}

@keyframes rotate-bg {
  0% { --bg-x: 0; --bg-y: 0; }
  25% { --bg-x: 100; --bg-y: 0; }
  50% { --bg-x: 100; --bg-y: 100; }
  75% { --bg-x: 0; --bg-y: 100; }
  100% { --bg-x: 0; --bg-y: 0; }
}
`;

export default function GlowingShadow({ children, className = "" }) {
  return (
    <>
      <style>{CSS}</style>
      <div className={`glow-container ${className}`}>
        <span className="glow" />
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}