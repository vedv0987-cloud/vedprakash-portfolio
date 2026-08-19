import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bentoProjects, getProjectBySlug, projectNarratives, siteConfig, toolLinks } from '@/data/portfolio';
import { getSiteUrl } from '@/lib/site-url';
import WorkPageClient from './WorkPageClient';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = getSiteUrl();

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
      ...(siteUrl ? { images: [{ url: project.image, alt: project.title }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const narrative = projectNarratives[project.id];
  if (!narrative) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    creator: { '@type': 'Person', name: siteConfig.name },
    genre: project.category,
  };

  // Find prev/next projects
  const currentIndex = bentoProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? bentoProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < bentoProjects.length - 1 ? bentoProjects[currentIndex + 1] : null;

  return (
    <>
      <WorkPageClient
        project={project}
        narrative={narrative}
        prevProject={prevProject}
        nextProject={nextProject}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
