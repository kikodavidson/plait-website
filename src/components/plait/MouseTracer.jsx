import React, { useEffect, useRef } from "react";

const COLORS = ["#5C6BC0", "#FF7043", "#FFCA28"];

export default function MouseTracer() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 });
  const particles = useRef([]);

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
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const dx = mouse.current.x - mouse.current.prevX;
      const dy = mouse.current.y - mouse.current.prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn 1-2 particles per move, proportional to distance
      const count = Math.min(3, Math.max(1, Math.round(dist / 12)));
      for (let i = 0; i < count; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.8;
        const speed = 0.5 + Math.random() * 1.5;
        particles.current.push({
          x: mouse.current.x + (Math.random() - 0.5) * 8,
          y: mouse.current.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.012 + Math.random() * 0.01,
          size: 3 + Math.random() * 4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          wavePhase: Math.random() * Math.PI * 2,
          waveAmp: 0.3 + Math.random() * 0.6,
        });
      }

      // Cap particle count
      if (particles.current.length > 250) {
        particles.current.splice(0, particles.current.length - 250);
      }
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      particles.current = particles.current.filter((p) => p.life > 0);

      particles.current.forEach((p) => {
        p.wavePhase += 0.08;
        // Wave motion: undulate perpendicular to velocity
        const perpX = -p.vy;
        const perpY = p.vx;
        const wave = Math.sin(p.wavePhase) * p.waveAmp;

        p.x += p.vx + perpX * wave;
        p.y += p.vy + perpY * wave;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;

        const alpha = Math.max(0, p.life);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        // Draw pill shape (rounded rect)
        const angle = Math.atan2(p.vy + perpY * wave, p.vx + perpX * wave);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        const len = p.size * 1.8;
        const wid = p.size * 0.6;
        ctx.beginPath();
        ctx.roundRect(-len / 2, -wid / 2, len, wid, wid / 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
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