import React, { useEffect, useRef, useState } from "react";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

// Keep in sync with the props passed below — the stack offset mirrors the
// canvas layout math inside halftone-wordmark-footer so "Max + Luke's"
// always sits directly above the wordmark, at any width.
const WORD = "brand buildout";
const FONT = "'Mavora Sans', Arial, sans-serif";
const HEIGHT = 240;
const CROP = 0.1;
const BOTTOM_INSET = 40;
const WORD_WIDTH = 0.82;
const STACK_GAP = 10;

/** Y coordinate (from the top of the banner) of the wordmark's cap edge. */
function wordmarkTop(w) {
  const m = document.createElement("canvas").getContext("2d");
  if (!m) return null;
  m.font = `800 100px ${FONT}`;
  const measured = m.measureText(WORD).width;
  if (measured <= 0) return null;
  const fit = (w * WORD_WIDTH / measured) * 100;
  m.font = `800 ${fit}px ${FONT}`;
  const cap = m.measureText(WORD).actualBoundingBoxAscent || fit * 0.72;
  return HEIGHT - BOTTOM_INSET + cap * CROP - cap;
}

/** Small halftone-dot header banner for Partnership HQ. */
export default function HalftoneHeader() {
  const rootRef = useRef(null);
  const [stackBottom, setStackBottom] = useState(null);

  useEffect(() => {
    const measure = () => {
      const el = rootRef.current;
      if (!el) return;
      const top = wordmarkTop(el.getBoundingClientRect().width);
      if (top != null) setStackBottom(Math.max(0, HEIGHT - top + STACK_GAP));
    };
    measure();
    const t = setTimeout(measure, 400);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full"
      style={stackBottom != null ? { "--stack-bottom": `${stackBottom}px` } : undefined}
    >
      <style>{`
        .phh .hwf-top { padding: 0; height: 100%; }
        .phh .hwf-rule { display: none; }
        .phh .hwf-brand span {
          position: absolute; left: 9%; bottom: var(--stack-bottom, 120px); z-index: 1;
          display: block; margin-top: 0;
          font-family: 'Mavora Sans', sans-serif;
          font-size: 44px; font-weight: 800; line-height: 1;
          letter-spacing: normal; text-transform: none; opacity: 1;
          user-select: none; white-space: nowrap;
        }
        @media (max-width: 720px) {
          .phh .hwf-brand span { font-size: 30px; }
        }
      `}</style>
      <HalftoneWordmarkFooter
        wordmark={WORD}
        topWord=""
        label="Partnership HQ"
        meta="Max + Luke's"
        columns={[]}
        backToTop={false}
        height={`${HEIGHT}px`}
        crop={CROP}
        bottomInset={BOTTOM_INSET}
        wordWidth={WORD_WIDTH}
        grain={0.3}
        radius={70}
        palette={{ background: "#ffffff", ink: "#000000", warm: "#619e80" }}
        fontFamily={FONT}
        fontWeight={800}
        className="phh"
      />
    </div>
  );
}