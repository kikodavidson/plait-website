import React, { useState, useEffect, useRef } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const CircularGallery = React.forwardRef(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
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

    // Auto-rotation when not scrolling
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) setRotation((prev) => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: "2000px" }}
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
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";
export { CircularGallery };