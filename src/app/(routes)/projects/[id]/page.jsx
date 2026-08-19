import { redirect, notFound } from 'next/navigation';
import { getProjectById } from '@/data/projects';

// This route previously served hardcoded placeholder project data
// ("Punto Pago", "Kelvin Zero", etc.) unrelated to any real Twofloww
// project — a crawlable URL with fabricated case-study content. It now
// permanently redirects to the real case study at /case-studies/[slug].
export default async function LegacyProjectIdRedirect({ params }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  redirect(`/case-studies/${project.slug}`);
}
