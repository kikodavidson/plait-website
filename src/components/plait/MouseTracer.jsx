import React, { useEffect, useRef } from "react";

const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
const MAX_PARTICLES = 60;

export default function MouseTracer() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
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
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    const makeParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 120;
      return {
        angle,
        radius,
        targetRadius: radius,
        orbitSpeed: (Math.random() - 0.5) * 0.008,
        size: 2.5 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.008 + Math.random() * 0.015,
        floatAmp: 4 + Math.random() * 10,
        alpha: 0,
        targetAlpha: 0.35 + Math.random() * 0.5,
      };
    };

    // Pre-populate
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.current.push(makeParticle());
    }

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Smooth follow
      mouse.current.x += (target.current.x - mouse.current.x) * 0.08;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.08;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      particles.current.forEach((p) => {
        p.angle += p.orbitSpeed;
        p.floatPhase += p.floatSpeed;
        p.rotation += p.rotSpeed;

        // Ease radius toward target, occasionally pick a new one for organic motion
        if (Math.random() < 0.005) {
          p.targetRadius = 30 + Math.random() * 120;
        }
        p.radius += (p.targetRadius - p.radius) * 0.01;

        // Ease alpha in
        p.alpha += (p.targetAlpha - p.alpha) * 0.05;

        const orbitX = Math.cos(p.angle) * p.radius;
        const orbitY = Math.sin(p.angle) * p.radius;
        const floatX = Math.sin(p.floatPhase) * p.floatAmp;
        const floatY = Math.cos(p.floatPhase * 1.3) * p.floatAmp;

        const px = mx + orbitX + floatX;
        const py = my + orbitY + floatY;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.save();
        ctx.translate(px, py);
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