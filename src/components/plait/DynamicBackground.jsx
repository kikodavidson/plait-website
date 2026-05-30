import React, { useEffect, useRef } from "react";

export default function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Holographic pastel orbs — soft blue, mint, pink, lavender
    const orbs = [
      { x: 0.10, y: 0.15, r: 0.55, color: "rgba(160,180,255,0.38)", dx: 0.00016, dy: 0.00010 },
      { x: 0.80, y: 0.10, r: 0.50, color: "rgba(255,150,210,0.28)", dx: -0.00013, dy: 0.00018 },
      { x: 0.45, y: 0.55, r: 0.60, color: "rgba(130,230,210,0.30)", dx: 0.00009,  dy: -0.00016 },
      { x: 0.85, y: 0.70, r: 0.45, color: "rgba(190,160,255,0.30)", dx: -0.00020, dy: -0.00009 },
      { x: 0.25, y: 0.80, r: 0.50, color: "rgba(255,180,220,0.25)", dx: 0.00012,  dy: 0.00014 },
      { x: 0.60, y: 0.30, r: 0.42, color: "rgba(100,200,240,0.28)", dx: -0.00011, dy: 0.00021 },
    ];

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Very light white-lavender base
      ctx.fillStyle = "#f8f7ff";
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        if (orb.x < -0.1 || orb.x > 1.1) orb.dx *= -1;
        if (orb.y < -0.1 || orb.y > 1.1) orb.dy *= -1;

        const cx = orb.x * w;
        const cy = orb.y * h;
        const radius = orb.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "rgba(248,247,255,0)");

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