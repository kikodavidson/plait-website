import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const CircularGallery = React.forwardRef(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const scrollTimeoutRef = useRef(null);
    const autoFrameRef = useRef(null);
    const inertiaFrameRef = useRef(null);
    const snapFrameRef = useRef(null);
    const rotationRef = useRef(0);
    rotationRef.current = rotation;

    const drag = useRef({
      active: false,
      startX: 0,
      startRotation: 0,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
    });

    const anglePerItem = 360 / items.length;

    // Scroll-based rotation (page scroll nudges the carousel)
    useEffect(() => {
      const handleScroll = () => {
        if (drag.current.active) return;
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setRotation(scrollProgress * 360);
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    // Auto-rotation when idle (paused while dragging)
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling && !isDragging) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        autoFrameRef.current = requestAnimationFrame(autoRotate);
      };
      autoFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (autoFrameRef.current) cancelAnimationFrame(autoFrameRef.current);
      };
    }, [isScrolling, isDragging, autoRotateSpeed]);

    // Inertia after a drag release
    const runInertia = useCallback(() => {
      const step = () => {
        const v = drag.current.velocity;
        if (Math.abs(v) < 0.05) {
          inertiaFrameRef.current = null;
          return;
        }
        setRotation((prev) => prev + v);
        drag.current.velocity *= 0.92;
        inertiaFrameRef.current = requestAnimationFrame(step);
      };
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = requestAnimationFrame(step);
    }, []);

    const handlePointerDown = (e) => {
      // Only react to primary button / touch
      if (e.button && e.button !== 0) return;
      drag.current.active = true;
      drag.current.startX = e.clientX;
      drag.current.startRotation = rotationRef.current;
      drag.current.lastX = e.clientX;
      drag.current.lastTime = performance.now();
      drag.current.velocity = 0;
      setIsDragging(true);
      cancelAnimationFrame(inertiaFrameRef.current);
      cancelAnimationFrame(snapFrameRef.current);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const handlePointerMove = (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      setRotation(drag.current.startRotation + dx * 0.5);
      const now = performance.now();
      const dt = now - drag.current.lastTime;
      if (dt > 0) {
        // velocity in deg per ~16ms frame
        drag.current.velocity = ((e.clientX - drag.current.lastX) * 0.5) / dt * 16;
      }
      drag.current.lastX = e.clientX;
      drag.current.lastTime = now;
    };

    const handlePointerUp = (e) => {
      if (!drag.current.active) return;
      drag.current.active = false;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      runInertia();
    };

    // Smooth snap by N items (used by arrows)
    const snapTo = useCallback(
      (deltaItems) => {
        cancelAnimationFrame(inertiaFrameRef.current);
        cancelAnimationFrame(snapFrameRef.current);
        const current = rotationRef.current;
        const target =
          Math.round(current / anglePerItem) * anglePerItem + deltaItems * anglePerItem;
        const start = current;
        const startTime = performance.now();
        const duration = 450;
        const step = () => {
          const t = Math.min(1, (performance.now() - startTime) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setRotation(start + (target - start) * eased);
          if (t < 1) snapFrameRef.current = requestAnimationFrame(step);
        };
        snapFrameRef.current = requestAnimationFrame(step);
      },
      [anglePerItem]
    );

    useEffect(
      () => () => {
        cancelAnimationFrame(autoFrameRef.current);
        cancelAnimationFrame(inertiaFrameRef.current);
        cancelAnimationFrame(snapFrameRef.current);
      },
      []
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery — drag or use arrows to rotate"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none",
          className
        )}
        style={{
          perspective: "2000px",
          touchAction: "pan-y",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);
            const hasImage = !!item.photo?.url;

            return (
              <div
                key={i}
                role="group"
                aria-label={item.common}
                className="absolute w-[300px] h-[400px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-150px",
                  marginTop: "-200px",
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl",
                    hasImage
                      ? "bg-card/70 backdrop-blur-lg"
                      : "bg-white flex flex-col items-center justify-center text-center px-6"
                  )}
                >
                  {hasImage ? (
                    <>
                      <img
                        src={item.photo.url}
                        alt={item.photo.text || item.common}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: item.photo.pos || "center" }}
                      />
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h2 className="text-xl font-bold">{item.common}</h2>
                        {item.binomial && (
                          <em className="text-sm italic opacity-80">{item.binomial}</em>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2
                        className="text-xl font-bold text-[#2d2d2d] leading-tight"
                        style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                      >
                        {item.common}
                      </h2>
                      {item.binomial && (
                        <p className="text-sm text-[#525252] mt-3">{item.binomial}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual controls */}
        <button
          type="button"
          aria-label="Previous role"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => snapTo(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-50 grid place-items-center w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/10 shadow-md hover:bg-white hover:scale-105 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-[#2d2d2d]" />
        </button>
        <button
          type="button"
          aria-label="Next role"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => snapTo(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-50 grid place-items-center w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/10 shadow-md hover:bg-white hover:scale-105 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-[#2d2d2d]" />
        </button>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";
export { CircularGallery };