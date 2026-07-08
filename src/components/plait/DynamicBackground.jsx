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
      t += 0.022;

      ctx.clearRect(0, 0, w, h);

      // Pure white base
      ctx.fillStyle = "#f4f2ee";
      ctx.fillRect(0, 0, w, h);

      const orbs = [
        // Large blue — sweeps left to right
        {
          x: 0.5 + Math.sin(t * 0.5) * 0.55,
          y: 0.15 + Math.cos(t * 0.3) * 0.12,
          r: 0.32,
          color: [90, 150, 255, 0.42],
        },
        // Blue — moves top to bottom
        {
          x: 0.15 + Math.cos(t * 0.4) * 0.12,
          y: 0.5 + Math.sin(t * 0.6) * 0.45,
          r: 0.28,
          color: [60, 180, 255, 0.38],
        },
        // Mint — diagonal sweep
        {
          x: 0.8 + Math.sin(t * 0.7) * 0.18,
          y: 0.6 + Math.cos(t * 0.5) * 0.35,
          r: 0.26,
          color: [80, 220, 190, 0.30],
        },
        // Pink — floats across upper right
        {
          x: 0.7 + Math.cos(t * 0.8) * 0.25,
          y: 0.2 + Math.sin(t * 0.4) * 0.15,
          r: 0.22,
          color: [244, 100, 170, 0.28],
        },
        // Lavender — lower left drift
        {
          x: 0.2 + Math.sin(t * 0.6) * 0.18,
          y: 0.8 + Math.cos(t * 0.7) * 0.18,
          r: 0.24,
          color: [170, 110, 255, 0.25],
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
        grad.addColorStop(1, `rgba(244,242,238,0)`);

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