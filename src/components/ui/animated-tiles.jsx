import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedTiles — renders an image as a pixelated grid of tiles whose
 * opacities shimmer in a loop. Tiles fade out toward the edges and bottom,
 * so the pixel grid itself forms the visual border of the image. Fills
 * whatever container it is placed in.
 */
export function AnimatedTiles({
  rows = 40,
  cols = 24,
  imageUrl,
  backgroundColor = "transparent",
  className = ""
}) {
  const tilesRef = useRef(null);

  useEffect(() => {
    const tilesEl = tilesRef.current;
    if (!tilesEl) return;

    tilesEl.innerHTML = "";

    const tiles = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const nx = cols > 1 ? col / (cols - 1) : 0;
        const ny = rows > 1 ? row / (rows - 1) : 0;

        // Radial falloff — full opacity toward the upper middle, dissolving
        // out toward the edges and the bottom, like the original 12x8 map.
        const dx = (nx - 0.5) / 0.55;
        const dy = (ny - 0.3) / 0.75;
        const maxOpacity = Math.max(0, Math.min(1, 1 - Math.sqrt(dx * dx + dy * dy)));
        if (maxOpacity <= 0) continue;

        const tile = document.createElement("div");
        tile.style.position = "absolute";
        tile.style.left = `${col / cols * 100}%`;
        tile.style.top = `${row / rows * 100}%`;
        tile.style.width = `${100 / cols}%`;
        tile.style.height = `${100 / rows}%`;
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
        tile.style.backgroundPosition = `${col / (cols - 1) * 100}% ${
        row / (rows - 1) * 100}%`;

        tile.style.backgroundRepeat = "no-repeat";
        tile.style.opacity = "0";
        tilesEl.appendChild(tile);

        tiles.push({
          el: tile,
          max: maxOpacity,
          min: Math.max(0, maxOpacity - 0.4),
          duration: Math.random() * 0.25 + 0.75, // 0.75 to 1 second
          offset: Math.random() * 1.25
        });
      }
    }

    let rafId;
    let startTime = null;

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;

      for (let i = 0; i < tiles.length; i++) {
        const { el, max, min, duration, offset } = tiles[i];
        const progress = (elapsed + offset) % (duration * 2);
        const normalizedProgress =
        progress < duration ? progress / duration : (duration * 2 - progress) / duration;

        const opacity = min + (max - min) * normalizedProgress;
        el.style.opacity = Math.max(min, Math.min(max, opacity)).toString();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      tilesEl.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, imageUrl]);

  return (
    <div
      ref={tilesRef}
      className={cn("relative w-full h-full hidden", className)}
      style={{ backgroundColor }} />);


}