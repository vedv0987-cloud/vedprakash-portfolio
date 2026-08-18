import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import BentoShowcase from '@/components/sections/BentoShowcase';
import PipelineFlow from '@/components/sections/PipelineFlow';
import TechMatrix from '@/components/sections/TechMatrix';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ContactStudio from '@/components/sections/ContactStudio';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-[#0a0a0c] overflow-x-hidden selection:bg-[#7c3aed]/18 selection:text-[#09090b]">
      <Navbar />
      <main className="relative flex flex-col w-full">
        <Hero />
        <BentoShowcase />
        <PipelineFlow />
        <TechMatrix />
        <ExperienceTimeline />
        <ContactStudio />
      </main>
      <Footer />
    </div>
  );
}
