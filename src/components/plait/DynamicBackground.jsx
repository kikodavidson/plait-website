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

    // Define soft color orbs — keep mostly light/white with subtle brand pops
    const orbs = [
      { x: 0.15, y: 0.2,  r: 0.45, color: "rgba(186,196,254,0.45)", dx: 0.00018, dy: 0.00012 },
      { x: 0.75, y: 0.15, r: 0.40, color: "rgba(110,153,174,0.30)", dx: -0.00015, dy: 0.00020 },
      { x: 0.50, y: 0.80, r: 0.50, color: "rgba(200,220,255,0.35)", dx: 0.00010, dy: -0.00018 },
      { x: 0.85, y: 0.65, r: 0.38, color: "rgba(186,196,254,0.25)", dx: -0.00022, dy: -0.00010 },
      { x: 0.30, y: 0.70, r: 0.42, color: "rgba(220,230,255,0.30)", dx: 0.00014, dy: 0.00016 },
    ];

    // Animate orb positions
    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // White base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      // Draw each orb as a soft radial gradient
      orbs.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        // Bounce
        if (orb.x < -0.1 || orb.x > 1.1) orb.dx *= -1;
        if (orb.y < -0.1 || orb.y > 1.1) orb.dy *= -1;

        const cx = orb.x * w;
        const cy = orb.y * h;
        const radius = orb.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "rgba(255,255,255,0)");

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