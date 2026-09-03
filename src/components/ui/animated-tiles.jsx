import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedTiles — renders an image as a pixelated grid of tiles whose
 * opacities shimmer in a loop (upper tiles stay visible, lower tiles fade
 * out), filling whatever container it is placed in.
 */
export function AnimatedTiles({
  rows = 12,
  cols = 8,
  imageUrl,
  backgroundColor = "transparent",
  className = "",
}) {
  const tilesRef = useRef(null);

  const maxOpacities = [
    [0.0, 0.2, 0.4, 0.6, 0.6, 0.4, 0.2, 0.0],
    [0.2, 0.4, 0.8, 1.0, 1.0, 0.6, 0.4, 0.2],
    [0.2, 0.4, 1.0, 1.0, 1.0, 0.8, 0.6, 0.2],
    [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
    [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
    [0.2, 0.6, 1.0, 1.0, 1.0, 1.0, 0.6, 0.2],
    [0.2, 0.4, 0.8, 1.0, 1.0, 0.8, 0.6, 0.2],
    [0.2, 0.4, 0.6, 0.8, 0.8, 0.6, 0.4, 0.1],
    [0.1, 0.2, 0.4, 0.4, 0.4, 0.4, 0.2, 0.1],
    [0.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1],
    [0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  useEffect(() => {
    const tilesEl = tilesRef.current;
    if (!tilesEl) return;

    tilesEl.innerHTML = "";

    const rafIds = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const maxOpacity = maxOpacities[row]?.[col] ?? 0;
        if (maxOpacity === 0) continue;

        const tile = document.createElement("div");
        tile.style.position = "absolute";
        tile.style.left = `${(col / cols) * 100}%`;
        tile.style.top = `${(row / rows) * 100}%`;
        tile.style.width = `${100 / cols}%`;
        tile.style.height = `${100 / rows}%`;
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
        tile.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${
          (row / (rows - 1)) * 100
        }%`;
        tile.style.backgroundRepeat = "no-repeat";
        tile.style.opacity = "0";
        tilesEl.appendChild(tile);

        const variance = 0.4;
        const minOpacity = Math.max(0, maxOpacity - variance);
        const duration = Math.random() * 0.25 + 0.75; // 0.75 to 1 second
        const startOffset = Math.random() * duration;
        let startTime = null;

        const animate = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const elapsed = (currentTime - startTime) / 1000;
          const progress = (elapsed + startOffset) % (duration * 2);
          const normalizedProgress =
            progress < duration ? progress / duration : (duration * 2 - progress) / duration;

          const opacity = minOpacity + (maxOpacity - minOpacity) * normalizedProgress;
          tile.style.opacity = Math.max(minOpacity, Math.min(maxOpacity, opacity)).toString();

          rafIds.push(requestAnimationFrame(animate));
        };

        rafIds.push(requestAnimationFrame(animate));
      }
    }

    return () => {
      rafIds.forEach((frameId) => cancelAnimationFrame(frameId));
      tilesEl.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, imageUrl]);

  return (
    <div
      ref={tilesRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{ backgroundColor }}
    />
  );
}