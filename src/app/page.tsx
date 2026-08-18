import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import dynamic from 'next/dynamic';

const BentoShowcase = dynamic(() => import('@/components/sections/BentoShowcase'));
const VideoShowcase = dynamic(() => import('@/components/sections/VideoShowcase'));
const PipelineFlow = dynamic(() => import('@/components/sections/PipelineFlow'));
const TechMatrix = dynamic(() => import('@/components/sections/TechMatrix'));
const ExperienceTimeline = dynamic(() => import('@/components/sections/ExperienceTimeline'));

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
