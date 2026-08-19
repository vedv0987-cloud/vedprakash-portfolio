'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const floatingPills = [
  {
    text: '✦ /render 8K photorealistic twilight --v 6.0',
    top: '8%',
    left: '6%',
    delay: 0,
    duration: 6.5,
    yOffset: -16,
  },
  {
    text: '✦ Runway Gen-3 · Volumetric Camera Flow',
    top: '18%',
    right: '4%',
    delay: 1.2,
    duration: 7,
    yOffset: 16,
  },
  {
    text: '✦ Multi-Model Seed Lock · 99.4% Persistence',
    bottom: '22%',
    left: '4%',
    delay: 2.0,
    duration: 6,
    yOffset: -12,
  },
  {
    text: '✦ 3ds Max Raytracing · Diamond Caustics',
    bottom: '12%',
    right: '6%',
    delay: 0.6,
    duration: 7.5,
    yOffset: 14,
  },
  {
    text: '✦ ElevenLabs SFX · Spatial Audio Synthesis',
    top: '46%',
    left: '8%',
    delay: 2.8,
    duration: 8,
    yOffset: -10,
  },
];

export default function HeroBackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // High-visibility particle constellation system
    const particleCount = 55;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#0071E3', '#06B6D4', '#7C3AED', '#2563EB'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.5,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.35 + 0.25,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 113, 227, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw glowing particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.35;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* ── Canvas Particle Constellation ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── Floating AI Text / Prompt Bubbles ── */}
      {floatingPills.map((pill, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: pill.top,
            bottom: pill.bottom,
            left: pill.left,
            right: pill.right,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0.65, 0.95, 0.65],
            y: [0, pill.yOffset, 0],
            x: [0, idx % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: pill.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: pill.delay,
          }}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-[#1d1d1f] text-[11px] font-mono font-medium tracking-tight"
        >
          <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
          <span>{pill.text}</span>
        </motion.div>
      ))}

      {/* ── Ambient Radial Color Washes (Apple Intelligence Glow) ── */}
      <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-[#0071e3]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#06b6d4]/[0.06] rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
