'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import BootLoader from '@/components/ui/BootLoader';
import CustomCursor from '@/components/ui/CustomCursor';
import ParticleBackground from '@/components/ui/ParticleBackground';
import dynamic from 'next/dynamic';

const BentoShowcase = dynamic(() => import('@/components/sections/BentoShowcase'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-[var(--bg-secondary)]" />,
});
const VideoShowcase = dynamic(() => import('@/components/sections/VideoShowcase'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[var(--bg-secondary)]" />,
});
const PipelineFlow = dynamic(() => import('@/components/sections/PipelineFlow'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[var(--bg-secondary)]" />,
});
const TechMatrix = dynamic(() => import('@/components/sections/TechMatrix'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[var(--bg-secondary)]" />,
});
const ExperienceTimeline = dynamic(() => import('@/components/sections/ExperienceTimeline'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[var(--bg-secondary)]" />,
});

export default function HomePage() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      <BootLoader onComplete={() => setBootDone(true)} />

      {bootDone && (
        <>
          <CustomCursor />
          <ParticleBackground />

          <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-main)] overflow-x-hidden">
            <Navbar />
            <main className="relative flex flex-col w-full z-10">
              <Hero />
              <BentoShowcase />
              <VideoShowcase />
              <PipelineFlow />
              <TechMatrix />
              <ExperienceTimeline />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
