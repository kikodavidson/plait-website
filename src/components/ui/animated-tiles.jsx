import { useEffect, useRef } from "react";

/**
 * AnimatedTiles — renders an image as a pixelated grid of tiles that fade out
 * in a row-staggered sweep, revealing whatever sits behind it. Used as a
 * transition overlay between media items.
 */
export function AnimatedTiles({
  rows = 12,
  cols = 8,
  imageUrl,
  backgroundColor = "transparent",
  revealDuration = 0.55,
  stagger = 0.06,
  onRevealed,
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
    if (!tilesEl || !imageUrl) return;
    tilesEl.innerHTML = "";

    const rafIds = new Map();
    let remaining = 0;

    const buildTile = (row, col) => {
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
      return tile;
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const maxOpacity = maxOpacities[row]?.[col] ?? 0;
        if (maxOpacity === 0) continue;
        const tile = buildTile(row, col);
        tile.style.opacity = String(maxOpacity);
        tilesEl.appendChild(tile);
        remaining++;

        const key = `${row}-${col}`;
        const delay = row * stagger + Math.random() * 0.08;
        let start = null;

        const animate = (now) => {
          if (start === null) start = now;
          const elapsed = (now - start) / 1000;
          const progress = Math.max(0, Math.min(1, (elapsed - delay) / revealDuration));
          tile.style.opacity = String(maxOpacity * (1 - progress));
          if (progress < 1) {
            rafIds.set(key, requestAnimationFrame(animate));
          } else {
            rafIds.delete(key);
            remaining -= 1;
            if (remaining <= 0 && onRevealed) onRevealed();
          }
        };
        rafIds.set(key, requestAnimationFrame(animate));
      }
    }

    if (remaining === 0 && onRevealed) onRevealed();

    return () => {
      rafIds.forEach((id) => cancelAnimationFrame(id));
      rafIds.clear();
      tilesEl.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, imageUrl, revealDuration, stagger]);

  return (
    <div
      ref={tilesRef}
      style={{ position: "absolute", inset: 0, backgroundColor }}
    />
  );
}