import { notFound, permanentRedirect } from 'next/navigation';
import { getProjectById } from '@/data/projects';

// Legacy `/project-detail?id=N` URLs. Every project now has a clean, indexable
// `/case-studies/{slug}` page, so we permanently redirect there instead of
// serving a noindexed duplicate (which Search Console reported as
// "Excluded by noindex", "Alternate page with canonical" and "Soft 404").
export default async function ProjectDetailRedirect({ searchParams }) {
  const { id } = (await searchParams) ?? {};
  if (!id) permanentRedirect('/case-studies');

  const project = getProjectById(id);
  if (!project) notFound();

  permanentRedirect(`/case-studies/${project.slug}`);
}
