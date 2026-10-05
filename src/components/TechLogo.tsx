import { getTechIconUrl } from '@/lib/techIcons';

/** Self-hosted tech logo, or the name's first letter when we have no logo for it. */
export default function TechLogo({ name, className = '' }: { name: string; className?: string }) {
  const src = getTechIconUrl(name);
  if (!src) {
    return (
      <span
        aria-hidden="true"
        className={`${className} inline-flex items-center justify-center rounded-md bg-gray-100 text-gray-600 font-bold text-xs`}
      >
        {name.charAt(0)}
      </span>
    );
  }
  return <img src={src} alt={name} className={className} loading="lazy" decoding="async" />;
}
