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
      t += 0.01;

      ctx.clearRect(0, 0, w, h);

      // Pure white base
      ctx.fillStyle = "#fefefe";
      ctx.fillRect(0, 0, w, h);

      const orbs = [
        // Large blue — slow horizontal drift
        {
          x: 0.5 + Math.sin(t * 0.18) * 0.35,
          y: 0.2 + Math.sin(t * 0.13) * 0.15,
          r: 0.32,
          color: [90, 150, 255, 0.28],
        },
        // Blue — gentle vertical flow
        {
          x: 0.2 + Math.sin(t * 0.22) * 0.2,
          y: 0.5 + Math.cos(t * 0.16) * 0.3,
          r: 0.28,
          color: [60, 180, 255, 0.26],
        },
        // Mint — slow diagonal
        {
          x: 0.75 + Math.cos(t * 0.2) * 0.2,
          y: 0.6 + Math.sin(t * 0.15) * 0.25,
          r: 0.26,
          color: [80, 220, 190, 0.24],
        },
        // Pink — soft upper drift
        {
          x: 0.65 + Math.sin(t * 0.24) * 0.22,
          y: 0.25 + Math.cos(t * 0.19) * 0.12,
          r: 0.22,
          color: [244, 100, 170, 0.22],
        },
        // Lavender — lower drift
        {
          x: 0.3 + Math.cos(t * 0.17) * 0.2,
          y: 0.75 + Math.sin(t * 0.21) * 0.15,
          r: 0.24,
          color: [170, 110, 255, 0.21],
        },
      ];

      orbs.forEach((orb) => {
        const cx = orb.x * w;
        const cy = orb.y * h;
        const radius = orb.r * Math.max(w, h);
        const [r, g, b, a] = orb.color;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${a * 0.3})`);
        grad.addColorStop(1, `rgba(254,254,254,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.75, 0, 0, Math.PI * 2);
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