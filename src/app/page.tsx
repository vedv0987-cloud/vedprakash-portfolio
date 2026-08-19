import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import dynamic from 'next/dynamic';

const BentoShowcase = dynamic(() => import('@/components/sections/BentoShowcase'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-[#f5f5f7]" />,
});
const VideoShowcase = dynamic(() => import('@/components/sections/VideoShowcase'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[#f5f5f7]" />,
});
const PipelineFlow = dynamic(() => import('@/components/sections/PipelineFlow'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[#f5f5f7]" />,
});
const TechMatrix = dynamic(() => import('@/components/sections/TechMatrix'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[#f5f5f7]" />,
});
const ExperienceTimeline = dynamic(() => import('@/components/sections/ExperienceTimeline'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-[#f5f5f7]" />,
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#f7f5f0] text-[#1d1b18] overflow-x-hidden">
      <Navbar />
      <main className="relative flex flex-col w-full">
        <Hero />
        <BentoShowcase />
        <VideoShowcase />
        <PipelineFlow />
        <TechMatrix />
        <ExperienceTimeline />
      </main>
      <Footer />
    </div>
  );
}
