import React from "react";

// Black/orange animated BORDER card wrapper. The orange light travels
// around the card's border ring only — the card body stays flat dark
// and nothing floats over the content. CSS is embedded as a plain
// <style> string (styled-jsx is incompatible with Vite).
const CSS = `
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

.glow-container {
  --card-radius: 12px;
  --border-width: 2px;
  --animation-speed: 4s;
  position: relative;
  width: 100%;
  border-radius: var(--card-radius);
  padding: var(--border-width);
  background: #2a2420;
  overflow: hidden;
}

/* Animated gradient layer behind the content — clipped so only the
   border ring is visible; the light travels around the perimeter. */
.glow-container:before {
  content: "";
  position: absolute;
  inset: calc(var(--border-width) * -2);
  z-index: 0;
  background: #2a2420 radial-gradient(
    40% 40% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
    hsl(30deg 100% 62%) 0%,
    hsl(26deg 95% 52%) 22%,
    hsl(22deg 90% 42%) 40%,
    transparent 62%
  );
  animation: rotate-bg var(--animation-speed) linear infinite;
}

.glow-container .glow-content {
  position: relative;
  z-index: 1;
  width: 100%;
  background: #0d0d10;
  border-radius: calc(var(--card-radius) - var(--border-width));
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
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}