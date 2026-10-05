import Link from 'next/link';
import locationsData from '@/data/locations-data.json';

const { locations } = locationsData;

const indiaLocations = locations.filter((l) => l.country_code === 'IN');
const intlLocations = locations.filter((l) => l.country_code !== 'IN');

function locationLabel(loc: (typeof locations)[number]) {
  return loc.city ?? loc.country;
}

interface Props {
  /** Link each location to this service's page there (defaults to web development). */
  serviceKey?: string;
  serviceLabel?: string;
  /** Location to leave out — the page we're already on. */
  excludeSlug?: string;
}

export default function LocationsWeServe({ serviceKey = 'web-development', serviceLabel, excludeSlug }: Props) {
  const india = indiaLocations.filter((l) => l.slug !== excludeSlug);
  const intl = intlLocations.filter((l) => l.slug !== excludeSlug);

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-3">Coverage</p>
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0B0D17]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {serviceLabel ? `${serviceLabel} in Other Locations` : 'Locations We Serve'}
          </h2>
        </div>

        {/* India */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">India</p>
          <div className="flex flex-wrap gap-2">
            {india.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${serviceKey}-agency-in-${loc.slug}`}
                className="px-4 py-2 text-sm font-medium bg-[#FAFAFA] border border-gray-200 text-gray-600 rounded-full hover:border-[#DE5D26]/40 hover:text-[#DE5D26] hover:bg-[#DE5D26]/5 transition-all duration-200"
              >
                {locationLabel(loc)}
                {loc.is_home_base && (
                  <span className="ml-1.5 text-[10px] font-bold text-[#DE5D26] uppercase tracking-wide">HQ</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* International */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">International</p>
          <div className="flex flex-wrap gap-2">
            {intl.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${serviceKey}-agency-in-${loc.slug}`}
                className="px-4 py-2 text-sm font-medium bg-[#FAFAFA] border border-gray-200 text-gray-600 rounded-full hover:border-[#DE5D26]/40 hover:text-[#DE5D26] hover:bg-[#DE5D26]/5 transition-all duration-200"
              >
                {locationLabel(loc)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
