import React, { useEffect, useRef } from "react";

const COLORS = ["#7a85de", "#5c67d1", "#89a1f5", "#d16a82", "#e07a90"];
const MAX_PARTICLES = 45;

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

    // Uniform particles — consistent small size, radiate outward
    const makeParticle = (i) => {
      // Distribute evenly across angles + rings
      const ring = Math.floor(i / 15);
      const inRing = i % 15;
      const angle = (inRing / 15) * Math.PI * 2 + ring * 0.2;
      const baseRadius = 40 + ring * 55;
      return {
        angle,
        baseAngle: angle,
        radius: baseRadius,
        targetRadius: baseRadius + (Math.random() - 0.5) * 20,
        orbitSpeed: 0.0008 + ring * 0.0003,
        size: 1.8 + Math.random() * 0.6,
        color: COLORS[i % COLORS.length],
        rotation: angle,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.006 + Math.random() * 0.008,
        floatAmp: 2 + Math.random() * 5,
        alpha: 0,
        targetAlpha: 0.3 + Math.random() * 0.3,
        radiusJitter: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.current.push(makeParticle(i));
    }

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Smooth follow
      mouse.current.x += (target.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.06;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      particles.current.forEach((p) => {
        p.angle += p.orbitSpeed;
        p.floatPhase += p.floatSpeed;
        p.radiusJitter += 0.01;

        // Occasionally shift target radius for subtle organic breathing
        if (Math.random() < 0.003) {
          p.targetRadius = p.radius + (Math.random() - 0.5) * 30;
        }
        p.radius += (p.targetRadius - p.radius) * 0.008;

        p.alpha += (p.targetAlpha - p.alpha) * 0.04;

        const jitterR = Math.sin(p.radiusJitter) * 6;
        const orbitX = Math.cos(p.angle) * (p.radius + jitterR);
        const orbitY = Math.sin(p.angle) * (p.radius + jitterR);
        const floatX = Math.sin(p.floatPhase) * p.floatAmp;
        const floatY = Math.cos(p.floatPhase * 1.2) * p.floatAmp;

        const px = mx + orbitX + floatX;
        const py = my + orbitY + floatY;

        // Rotation: point radially outward from cursor
        const radialAngle = Math.atan2(orbitY, orbitX);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(radialAngle);
        const len = p.size * 3;
        const wid = p.size * 0.5;
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