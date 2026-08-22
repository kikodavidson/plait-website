import React, { useEffect, useRef } from "react";

// Tight, performance-tuned constellation mesh.
// Uses a per-frame spatial hash so connection culling is ~O(n) instead of O(n²),
// letting us keep a dense grid without dropping frames.
export default function ConstellationGrid({ className = "" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf;
    let width = 0;
    let height = 0;
    let rect = { left: 0, top: 0 };
    let nodes = [];

    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, vx: 0, vy: 0, radius: 200 };

    const initNodes = () => {
      nodes = [];
      const spacing = 44; // tight mesh
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          nodes.push({
            x, y, vx: 0, vy: 0, baseX: x, baseY: y,
            radius: Math.random() * 1.1 + 1.1,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const setup = () => {
      rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const onMove = (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) {
        mouse.x = -1000;
        mouse.y = -1000;
        return;
      }
      mouse.x = x;
      mouse.y = y;
    };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(setup);
      ro.observe(container);
    } else {
      window.addEventListener("resize", setup);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    setup();

    const NODE = "45,45,45";       // dark dots on light header
    const ACCENT = "79,70,229";    // indigo highlight
    const MAX = 74;
    const MAX_SQ = MAX * MAX;
    const CELL = MAX; // hash cell = connection range
    const offsets = [[0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
      mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      ctx.clearRect(0, 0, width, height);

      // Physics — spring back to anchor + cursor shockwave
      const SPRING_K = 18;
      const DAMPING = 0.82;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulse += dt * 3;
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const power = 1 - dist / mouse.radius;
          const force = power * (1500 + speed * 150);
          const angle = Math.atan2(dy, dx);
          n.vx -= Math.cos(angle) * force * dt;
          n.vy -= Math.sin(angle) * force * dt;
        }
        n.vx += (n.baseX - n.x) * SPRING_K * dt;
        n.vy += (n.baseY - n.y) * SPRING_K * dt;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
      }

      // Spatial hash
      const gc = Math.ceil(width / CELL) + 1;
      const gr = Math.ceil(height / CELL) + 1;
      const grid = new Array(gc * gr);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = Math.min(gc - 1, Math.max(0, Math.floor(n.x / CELL)));
        const cy = Math.min(gr - 1, Math.max(0, Math.floor(n.y / CELL)));
        const idx = cy * gc + cx;
        (grid[idx] || (grid[idx] = [])).push(i);
      }

      // Connections — each cell pair visited once
      for (let cy = 0; cy < gr; cy++) {
        for (let cx = 0; cx < gc; cx++) {
          const cell = grid[cy * gc + cx];
          if (!cell) continue;
          for (let o = 0; o < offsets.length; o++) {
            const ox = offsets[o][0];
            const oy = offsets[o][1];
            const nx = cx + ox;
            const ny = cy + oy;
            if (nx < 0 || ny < 0 || nx >= gc || ny >= gr) continue;
            const other = grid[ny * gc + nx];
            if (!other) continue;
            const same = ox === 0 && oy === 0;
            for (let a = 0; a < cell.length; a++) {
              const i = cell[a];
              const n = nodes[i];
              for (let b = 0; b < other.length; b++) {
                const j = other[b];
                if (same && j <= i) continue;
                const n2 = nodes[j];
                const ddx = n.x - n2.x;
                const ddy = n.y - n2.y;
                const dsq = ddx * ddx + ddy * ddy;
                if (dsq < MAX_SQ) {
                  const nd = Math.sqrt(dsq);
                  const alpha = (1 - nd / MAX) * 0.12;
                  ctx.strokeStyle = `rgba(${NODE},${alpha})`;
                  ctx.lineWidth = 0.7;
                  ctx.beginPath();
                  ctx.moveTo(n.x, n.y);
                  ctx.lineTo(n2.x, n2.y);
                  ctx.stroke();
                }
              }
            }
          }
        }
      }

      // Nodes + proximity rings
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < mouse.radius;
        const baseAlpha = isNear ? 0.9 : 0.2 + Math.sin(n.pulse) * 0.08;
        ctx.fillStyle = isNear ? `rgba(${ACCENT},${baseAlpha})` : `rgba(${NODE},${baseAlpha})`;
        const r = isNear ? n.radius * 2.1 : n.radius + Math.sin(n.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fill();
        if (dist < 90) {
          const ring = ((n.pulse * 20) % 30) + 4;
          ctx.strokeStyle = `rgba(${ACCENT},${(1 - ring / 34) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, ring, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}