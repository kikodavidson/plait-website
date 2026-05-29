import React, { useEffect, useRef, useState } from "react";

const platforms = [
  { name: "Meta", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/cea2ebee9_Untitleddesign-2026-05-29T152821634.png" },
  { name: "Google Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/77c3c7b74_Untitleddesign-2026-05-29T153409951.png" },
  { name: "TikTok Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/78d50c267_logos1.png" },
  { name: "Shopify", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/a52e929bd_logos2.png" },
  { name: "LinkedIn Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/811fd1e37_logos.png" },
  { name: "Apple Ads", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f5b0265b5_Untitleddesign-2026-05-29T153159952.png" },
  { name: "Google Analytics 4", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/1557e7da2_logos3.png" },
  { name: "Orbit", logo: "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/f9438ebe6_Untitleddesign-2026-05-29T153256805.png" },
];

const ITEM_SPACING = 240;
const SPEED = 0.6;

export default function PlatformMarquee() {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const containerRef = useRef(null);
  const [viewWidth, setViewWidth] = useState(1440);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setViewWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const totalWidth = platforms.length * ITEM_SPACING;

  useEffect(() => {
    const animate = () => {
      if (!pausedRef.current) {
        setOffset((prev) => (prev + SPEED) % totalWidth);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  // Generate enough copies to fill the screen multiple times
  const copies = Math.ceil((viewWidth * 3) / totalWidth) + 2;
  const items = Array.from({ length: copies }, (_, ci) =>
    platforms.map((p, pi) => ({ ...p, key: `${ci}-${pi}`, x: (ci * totalWidth + pi * ITEM_SPACING - offset + totalWidth) % (totalWidth * copies) }))
  ).flat();

  return (
    <div
      ref={containerRef}
      className="bg-white border-y border-gray-100 overflow-hidden relative select-none"
      style={{ height: "180px" }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-56 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, white 60%, transparent 100%)" }} />
      <div className="absolute inset-y-0 right-0 w-56 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, white 60%, transparent 100%)" }} />

      {items.map((p) => {
        // Position relative to center of viewport
        const cx = p.x + ITEM_SPACING / 2 - viewWidth / 2;
        // Normalise: 0 at center, 1 at edge
        const dist = Math.abs(cx) / (viewWidth / 2);

        if (dist > 1.2) return null;

        // Cosine gives smooth peak at center
        const cos = Math.cos((dist * Math.PI) / 2);
        const scale = 0.3 + cos * 0.7;       // 0.3 at edge, 1.0 at center
        const opacity = 0.15 + cos * 0.85;   // 0.15 at edge, 1.0 at center

        return (
          <div
            key={p.key}
            style={{
              position: "absolute",
              left: `${p.x}px`,
              top: "50%",
              width: `${ITEM_SPACING}px`,
              transform: `translateY(-50%) scale(${scale})`,
              transformOrigin: "center center",
              opacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={p.logo}
              alt={p.name}
              style={{ height: "80px", width: "auto", maxWidth: "200px", objectFit: "contain" }}
            />
          </div>
        );
      })}
    </div>
  );
}