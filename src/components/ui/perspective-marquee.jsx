import React, { useEffect, useRef } from "react";

/**
 * Self-contained 3D perspective marquee.
 *
 * A dependency-free reimplementation of the remotion PerspectiveMarquee that
 * works directly in the browser (no Player wrapper, no fixed composition size),
 * is fully responsive, and renders brand LOGO IMAGES instead of text.
 *
 * Each item is `{ name, logo }`. If `logo` is omitted, the `name` renders as
 * styled text so the marquee always looks populated while you add assets.
 */
export function PerspectiveMarquee({
  items = [],
  itemWidth = 220,
  logoHeight = 64,
  color = "#2d2d2d",
  fontWeight = 700,
  fontSize = 28,
  pixelsPerFrame = 1.4,
  rotateY = -22,
  rotateX = 6,
  perspective = 1100,
  fadeColor = "#ffffff",
  background = "transparent",
  speed = 1,
  logoPadding,
  className = "",
}) {
  const verticalPad = logoPadding ?? logoHeight;
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const offsetRef = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    let raf;
    let last = performance.now();

    const measure = () => {
      widthRef.current = containerRef.current?.clientWidth || 0;
    };
    measure();
    window.addEventListener("resize", measure);

    const loop = (now) => {
      const dt = Math.min((now - last) / (1000 / 60), 4); // normalize to ~60fps frames
      last = now;

      const list = items.length ? items : [{ name: "" }];
      const total = itemWidth * list.length;
      offsetRef.current -= pixelsPerFrame * speed * dt;
      if (offsetRef.current <= -total) offsetRef.current += total;
      const offset = offsetRef.current;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offset}px)`;
      }

      const center = widthRef.current / 2;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const itemCenter = i * itemWidth + itemWidth / 2 + offset;
        const norm = center ? (itemCenter - center) / center : 0;
        const distance = Math.min(1, Math.abs(norm));
        const blurPx = distance * 6;
        const opacity = 1 - distance * 0.45;
        el.style.filter = `blur(${blurPx}px)`;
        el.style.opacity = String(opacity);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [items, itemWidth, pixelsPerFrame, speed]);

  const list = items.length ? items : [{ name: "" }];
  const rendered = [...list, ...list, ...list];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        background,
        perspective: `${perspective}px`,
        height: `auto`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          padding: `${verticalPad}px 0`,
        }}
      >
        <div
          ref={trackRef}
          style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}
        >
          {rendered.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              style={{
                width: `${itemWidth}px`,
                height: `${logoHeight}px`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 auto",
                paddingRight: `${itemWidth * 0.12}px`,
                willChange: "filter, opacity",
              }}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name || ""}
                  className="object-contain"
                  style={{ maxHeight: `${logoHeight}px`, maxWidth: `${itemWidth * 0.92}px` }}
                  draggable={false}
                />
              ) : (
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize,
                    fontWeight,
                    color,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* edge fades */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 16%, transparent 84%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 26%, transparent 74%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
}

export default PerspectiveMarquee;