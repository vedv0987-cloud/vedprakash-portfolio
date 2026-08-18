'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
  connections: number[];
}

interface SynapsePulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function AINeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodeColors = [
      'rgba(124, 58, 237, ',   // Violet
      'rgba(6, 182, 212, ',    // Cyan
      'rgba(99, 102, 241, ',   // Indigo
      'rgba(168, 85, 247, ',   // Purple
    ];

    const nodeCount = Math.min(Math.floor((width * height) / 16000), 55);
    const nodes: Node[] = [];
    const pulses: SynapsePulse[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
    };

    // Initialize Neural Nodes
    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2.2 + 1.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.012;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // ── 1. Draw Subtle Generative Latent Wave Curves in Background ──
      ctx.save();
      ctx.lineWidth = 1;
      for (let k = 0; k < 3; k++) {
        const waveOffset = k * 120 + 80;
        const waveAlpha = 0.04 - k * 0.008;
        ctx.beginPath();
        ctx.strokeStyle = k % 2 === 0 ? `rgba(124, 58, 237, ${waveAlpha})` : `rgba(6, 182, 212, ${waveAlpha})`;

        for (let x = 0; x <= w; x += 15) {
          const y =
            h * 0.45 +
            Math.sin(x * 0.003 + time * 1.2 + k) * 60 +
            Math.cos(x * 0.006 - time * 0.8) * 35 +
            waveOffset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // ── 2. Update Neural Nodes & Rebuild Connections ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulsePhase += n.pulseSpeed;

        // Position drift
        n.x += n.vx + Math.sin(time + n.pulsePhase) * 0.2;
        n.y += n.vy + Math.cos(time + n.pulsePhase) * 0.2;

        // Boundary wrap
        if (n.x < -30) n.x = w + 30;
        if (n.x > w + 30) n.x = -30;
        if (n.y < -30) n.y = h + 30;
        if (n.y > h + 30) n.y = -30;

        // Mouse interaction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.8;
          n.x -= (dx / dist) * force * 2.5;
          n.y -= (dy / dist) * force * 2.5;
          n.radius = n.baseRadius * (1 + force * 1.2);
        } else {
          n.radius += (n.baseRadius - n.radius) * 0.08;
        }

        n.connections = [];
      }

      // ── 3. Draw Synaptic Neural Connections ──
      const maxConnectDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (d < maxConnectDist) {
            n1.connections.push(j);
            const alpha = (1 - d / maxConnectDist) * 0.16;

            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, `${n1.color}${alpha})`);
            grad.addColorStop(1, `${n2.color}${alpha})`);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Randomly spawn synaptic pulses along connected paths
            if (Math.random() < 0.0015 && pulses.length < 16) {
              pulses.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: Math.random() * 0.015 + 0.008,
                color: Math.random() > 0.5 ? '#7c3aed' : '#06b6d4',
              });
            }
          }
        }
      }

      // ── 4. Animate & Draw Synaptic Electrical Pulses ──
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const pulse = pulses[pIdx];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(pIdx, 1);
          continue;
        }

        const n1 = nodes[pulse.fromNode];
        const n2 = nodes[pulse.toNode];
        if (!n1 || !n2) {
          pulses.splice(pIdx, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * pulse.progress;
        const py = n1.y + (n2.y - n1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── 5. Draw Neural Nodes with Pulsing Glow ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const currentPulse = Math.sin(n.pulsePhase) * 0.3 + 0.7;
        const currentAlpha = 0.55 * currentPulse;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${currentAlpha})`;
        ctx.shadowColor = `${n.color}0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer faint halo on hover proximity
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        if (Math.hypot(dx, dy) < 120) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = `${n.color}0.2)`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />

      {/* Floating AI Micro-HUD Tags */}
      <div className="absolute top-[18%] left-[8%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.06] text-[11px] font-mono text-[#71717a] shadow-xs animate-float-slow">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
        <span>NEURAL_LATENT: 1024D</span>
      </div>

      <div
        className="absolute bottom-[24%] right-[8%] hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.06] text-[11px] font-mono text-[#71717a] shadow-xs animate-float-slow"
        style={{ animationDelay: '-3.5s' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
        <span>DIFFUSION_STEPS: 32 [LOSSLESS]</span>
      </div>
    </div>
  );
}
