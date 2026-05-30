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
      t += 0.004;

      ctx.clearRect(0, 0, w, h);

      // White base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      const orbs = [
        // Blues — dominant, stronger opacity
        {
          x: 0.10 + Math.sin(t * 0.6) * 0.20,
          y: 0.15 + Math.cos(t * 0.4) * 0.18,
          r: 0.55,
          color: [100, 149, 255, 0.30],
        },
        {
          x: 0.75 + Math.cos(t * 0.5) * 0.18,
          y: 0.50 + Math.sin(t * 0.7) * 0.20,
          r: 0.52,
          color: [80, 180, 255, 0.28],
        },
        {
          x: 0.45 + Math.sin(t * 0.3) * 0.22,
          y: 0.80 + Math.cos(t * 0.5) * 0.14,
          r: 0.50,
          color: [120, 160, 255, 0.25],
        },
        // Mint — medium
        {
          x: 0.60 + Math.cos(t * 0.8) * 0.18,
          y: 0.25 + Math.sin(t * 0.5) * 0.18,
          r: 0.48,
          color: [100, 230, 200, 0.18],
        },
        // Pink — subtle
        {
          x: 0.85 + Math.sin(t * 0.6) * 0.12,
          y: 0.75 + Math.cos(t * 0.9) * 0.14,
          r: 0.42,
          color: [244, 114, 182, 0.14],
        },
        // Lavender — subtle
        {
          x: 0.25 + Math.cos(t * 0.7) * 0.16,
          y: 0.60 + Math.sin(t * 0.4) * 0.16,
          r: 0.44,
          color: [192, 132, 252, 0.13],
        },
      ];

      orbs.forEach((orb) => {
        const cx = orb.x * w;
        const cy = orb.y * h;
        const radius = orb.r * Math.max(w, h);
        const [r, g, b, a] = orb.color;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${a * 0.4})`);
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