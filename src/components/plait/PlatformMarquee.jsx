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

const ITEM_SPACING = 220;
const SPEED = 0.5;

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

  // Build enough copies to fill the view multiple times
  const copies = 6;
  const items = Array.from({ length: copies }, () => platforms).flat();

  return (
    <div
      ref={containerRef}
      className="bg-white border-y border-gray-100 overflow-hidden relative"
      style={{ height: "160px", perspective: "600px", perspectiveOrigin: "50% 50%" }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }} />
      <div className="absolute inset-y-0 right-0 w-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }} />

      {items.map((p, i) => {
        // Raw x position (moving left as offset increases)
        const rawX = i * ITEM_SPACING - offset;
        // Wrap into view
        const wrappedX = ((rawX % totalWidth) + totalWidth * copies) % totalWidth - ITEM_SPACING;

        // Center-relative position: -1 to 1 across the viewport
        const centerX = wrappedX - viewWidth / 2 + ITEM_SPACING / 2;
        const normalised = centerX / (viewWidth / 2); // -1 at left, 0 at center, 1 at right

        // Skip items way off screen
        if (Math.abs(normalised) > 1.3) return null;

        // Use cosine so center is max, edges are small
        const cosVal = Math.cos((normalised * Math.PI) / 2);
        const scale = 0.25 + cosVal * 0.75;
        const opacity = Math.max(0, cosVal * 1.1 - 0.1);
        const translateZ = (cosVal - 1) * 250; // push edges back in Z

        return (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              top: "50%",
              left: `${wrappedX}px`,
              width: `${ITEM_SPACING}px`,
              height: "100px",
              marginTop: "-50px",
              transform: `translateZ(${translateZ}px) scale(${scale})`,
              transformOrigin: "center center",
              opacity,
              willChange: "transform, opacity",
            }}
          >
            <img
              src={p.logo}
              alt={p.name}
              style={{ height: "70px", width: "auto", maxWidth: "180px", objectFit: "contain" }}
            />
          </div>
        );
      })}
    </div>
  );
}