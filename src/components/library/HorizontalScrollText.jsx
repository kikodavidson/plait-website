import React, { useRef, useEffect } from "react";

// Single-line text that scrolls horizontally when it overflows.
// Redirects vertical wheel movement to horizontal scrolling so it
// works naturally with a desktop mouse.
export default function HorizontalScrollText({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <p
      ref={ref}
      className={`whitespace-nowrap overflow-x-auto overflow-y-hidden no-scrollbar ${className}`}
    >
      {children}
    </p>
  );
}