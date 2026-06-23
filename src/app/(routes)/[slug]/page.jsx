import { notFound } from 'next/navigation';
import { getSeoTarget } from '@/data/seo-locations';
import SeoLandingHero from '@/components/SeoLandingHero';
import SeoContent from '@/components/SeoContent';
import FAQ from '@/components/Faq';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const target = getSeoTarget(slug);

  if (!target) {
    return {
      title: 'Not Found | TwoflowW',
    };
  }

  const { location, serviceName } = target;
  
  return {
    title: `Best ${serviceName} in ${location.name} | TwoflowW`,
    description: `Looking for the best ${serviceName} in ${location.name}? TwoflowW is the top-rated agency providing cutting-edge digital solutions tailored for your business in ${location.name}, ${location.state}.`,
    openGraph: {
      title: `Top ${serviceName} Agency in ${location.name}`,
      description: `Elevate your business with expert ${serviceName} in ${location.name}. Partner with TwoflowW today.`,
    }
  };
}

export default async function SeoPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const target = getSeoTarget(slug);

  if (!target) {
    notFound();
  }

  const { location, serviceName } = target;

  return (
    <div className="min-h-screen bg-white">
      <SeoLandingHero location={location} serviceName={serviceName} />
      <SeoContent location={location} serviceName={serviceName} />
      <FAQ />
    </div>
  );
}
