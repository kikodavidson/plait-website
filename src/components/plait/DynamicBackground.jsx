import React, { useEffect, useRef } from "react";

export default function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      t += 0.003;

      ctx.clearRect(0, 0, w, h);

      // White base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      // Slowly drifting gradient orbs — very subtle, mostly white
      const orbs = [
        {
          x: 0.15 + Math.sin(t * 0.7) * 0.12,
          y: 0.20 + Math.cos(t * 0.5) * 0.10,
          r: 0.55,
          color: [160, 180, 255, 0.13], // soft blue
        },
        {
          x: 0.80 + Math.cos(t * 0.6) * 0.10,
          y: 0.15 + Math.sin(t * 0.8) * 0.12,
          r: 0.50,
          color: [244, 114, 182, 0.10], // soft pink
        },
        {
          x: 0.50 + Math.sin(t * 0.4) * 0.15,
          y: 0.60 + Math.cos(t * 0.6) * 0.12,
          r: 0.60,
          color: [134, 239, 172, 0.10], // soft mint
        },
        {
          x: 0.85 + Math.cos(t * 0.5) * 0.08,
          y: 0.75 + Math.sin(t * 0.7) * 0.10,
          r: 0.45,
          color: [192, 132, 252, 0.11], // soft lavender
        },
        {
          x: 0.20 + Math.sin(t * 0.9) * 0.10,
          y: 0.80 + Math.cos(t * 0.4) * 0.08,
          r: 0.48,
          color: [255, 180, 210, 0.09], // blush
        },
      ];

      orbs.forEach((orb) => {
        const cx = orb.x * w;
        const cy = orb.y * h;
        const radius = orb.r * Math.max(w, h);
        const [r, g, b, a] = orb.color;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}