import React, { useEffect, useRef } from "react";

const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

export default function MouseTracer() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
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
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Sparse spawn — 1 particle per few moves, scattered around cursor
      if (Math.random() > 0.35) return;

      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 90;
      const orbitSpeed = (Math.random() - 0.5) * 0.015;

      particles.current.push({
        cx: mouse.current.x,
        cy: mouse.current.y,
        angle,
        radius,
        baseRadius: radius,
        orbitSpeed,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.3,
        x: mouse.current.x + Math.cos(angle) * radius,
        y: mouse.current.y + Math.sin(angle) * radius,
        life: 1,
        decay: 0.004 + Math.random() * 0.006,
        size: 2.5 + Math.random() * 3.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.01 + Math.random() * 0.02,
        floatAmp: 3 + Math.random() * 8,
      });
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      particles.current = particles.current.filter((p) => p.life > 0);

      particles.current.forEach((p) => {
        // Orbit + drift away from center point
        p.angle += p.orbitSpeed;
        p.floatPhase += p.floatSpeed;

        const floatX = Math.sin(p.floatPhase) * p.floatAmp;
        const floatY = Math.cos(p.floatPhase * 1.3) * p.floatAmp;

        p.x += p.driftX;
        p.y += p.driftY;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;

        const alpha = Math.max(0, p.life);
        const fade = p.life < 0.3 ? p.life / 0.3 : 1;
        ctx.globalAlpha = alpha * fade;
        ctx.fillStyle = p.color;

        // Dash / brush stroke shape
        ctx.save();
        ctx.translate(p.x + floatX, p.y + floatY);
        ctx.rotate(p.rotation);
        const len = p.size * 2.2;
        const wid = p.size * 0.55;
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