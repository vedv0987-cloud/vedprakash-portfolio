import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import BentoShowcase from '@/components/sections/BentoShowcase';
import VideoShowcase from '@/components/sections/VideoShowcase';
import PipelineFlow from '@/components/sections/PipelineFlow';
import TechMatrix from '@/components/sections/TechMatrix';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#f8f8f6] text-[#111111] overflow-x-hidden">
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
