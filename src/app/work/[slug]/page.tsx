import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { bentoProjects, getProjectBySlug, projectNarratives, siteConfig, toolLinks } from '@/data/portfolio';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return bentoProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.description,
      type: 'article',
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const narrative = projectNarratives[project.id];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    creator: { '@type': 'Person', name: siteConfig.name },
    genre: project.category,
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#1d1b18]">
      <Navbar />
      <main id="work" className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <Link href="/#work" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071e3] hover:underline">
          ← Selected work
        </Link>

        <header className="grid lg:grid-cols-12 gap-8 lg:gap-14 mt-10 pb-12 border-b border-black/[0.12]">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6d6861]">{project.category}</p>
            <h1 className="mt-4 text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.94] tracking-[-0.055em] font-semibold">
              {project.title}
            </h1>
          </div>
          <dl className="lg:col-span-4 self-end grid grid-cols-2 gap-x-6 gap-y-6 text-sm border-t lg:border-t-0 border-black/[0.10] pt-6 lg:pt-0">
            <div><dt className="font-mono text-[10px] uppercase tracking-wider text-[#6d6861]">Client</dt><dd className="mt-1 font-medium">{project.client}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-wider text-[#6d6861]">Period</dt><dd className="mt-1 font-medium">{project.period}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-wider text-[#6d6861]">Outcome</dt><dd className="mt-1 font-medium">{project.stats.metric} {project.stats.label}</dd></div>
          </dl>
        </header>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-[#ede9e1]">
          <Image src={project.image} alt={project.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1360px" />
        </div>

        <section className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-16">
          <p className="lg:col-span-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6d6861]">The project</p>
          <p className="lg:col-span-8 text-xl sm:text-2xl leading-relaxed tracking-[-0.02em]">{project.description}</p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mt-20 pt-8 border-t border-black/[0.12]">
          {[
            ['Brief', narrative.brief],
            ['Creative direction', narrative.direction],
            ['Delivery', narrative.delivery],
          ].map(([label, copy]) => (
            <article key={label}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6d6861]">{label}</h2>
              <p className="mt-4 text-base leading-relaxed text-[#48443e]">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-20 pt-8 border-t border-black/[0.12] grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4"><h2 className="text-3xl tracking-[-0.035em] font-semibold">Production tools</h2></div>
          <div className="lg:col-span-8 flex flex-wrap gap-x-5 gap-y-3 content-start">
            {project.models.map((tool) => (
              <a key={tool} href={toolLinks[tool] ?? 'https://www.google.com'} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline decoration-black/20 underline-offset-4 hover:text-[#0071e3]">
                {tool} ↗
              </a>
            ))}
          </div>
        </section>

        <div className="mt-20 pt-8 border-t border-black/[0.12] flex flex-wrap gap-6 items-center justify-between">
          <Link href="/#work" className="text-sm font-semibold text-[#0071e3] hover:underline">← Return to selected work</Link>
          <a href={siteConfig.portfolioDrive} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1d1b18] hover:text-[#0071e3]">Request campaign material ↗</a>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Footer />
    </div>
  );
}
