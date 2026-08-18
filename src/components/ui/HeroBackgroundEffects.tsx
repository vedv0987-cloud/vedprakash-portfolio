'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const floatingPills = [
  {
    text: '✦ /render 8K photorealistic twilight --v 6.0',
    top: '12%',
    left: '8%',
    delay: 0,
    duration: 8,
    yOffset: -16,
  },
  {
    text: '✦ Runway Gen-3 · Volumetric Camera Flow',
    top: '22%',
    right: '6%',
    delay: 1.5,
    duration: 9,
    yOffset: 18,
  },
  {
    text: '✦ Multi-Model Seed Lock · 99.4% Persistence',
    bottom: '26%',
    left: '5%',
    delay: 2.2,
    duration: 7.5,
    yOffset: -14,
  },
  {
    text: '✦ 3ds Max Raytracing · Diamond Caustics',
    bottom: '18%',
    right: '8%',
    delay: 0.8,
    duration: 8.5,
    yOffset: 16,
  },
  {
    text: '✦ ElevenLabs SFX · Spatial Audio Synthesis',
    top: '48%',
    left: '12%',
    delay: 3,
    duration: 10,
    yOffset: -12,
  },
];

export default function HeroBackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

    // Particle System (Apple Blue & Cyan subtle nodes)
    const particleCount = 38;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.25 + 0.08;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting webs
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.07;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 113, 227, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 113, 227, ${p.alpha})`;
        ctx.fill();

        // Subtle glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 113, 227, ${p.alpha * 0.25})`;
        ctx.fill();
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* ── Canvas Particle Constellation ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

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
            opacity: [0.35, 0.75, 0.35],
            y: [0, pill.yOffset, 0],
            x: [0, idx % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: pill.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: pill.delay,
          }}
          className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-[#1d1d1f]/75 text-[10px] font-mono tracking-tight"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
          <span>{pill.text}</span>
        </motion.div>
      ))}

      {/* ── Ambient Radial Color Washes (Apple Intelligence Glow) ── */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#0071e3]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#06b6d4]/[0.04] rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
