import React, { useEffect, useRef } from "react";

const COLORS = ["#7a85de", "#5c67d1", "#89a1f5", "#d16a82", "#e07a90"];
const MAX_DOTS = 22;

export default function MouseTracer() {
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const target = useRef({ x: -9999, y: -9999 });

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

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    // Initialize dots off-screen
    for (let i = 0; i < MAX_DOTS; i++) {
      dots.current.push({
        x: -9999, y: -9999,
        size: 3 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
      });
    }

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Smooth follow with lag
      mouse.current.x += (target.current.x - mouse.current.x) * 0.2;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.2;

      // Shift the trail: each dot follows the previous one
      for (let i = MAX_DOTS - 1; i > 0; i--) {
        dots.current[i].x = dots.current[i - 1].x;
        dots.current[i].y = dots.current[i - 1].y;
      }
      dots.current[0].x = mouse.current.x;
      dots.current[0].y = mouse.current.y;

      dots.current.forEach((d, i) => {
        const scale = 1 - i / MAX_DOTS;
        const alpha = scale * 0.8;
        const size = d.size * scale;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}