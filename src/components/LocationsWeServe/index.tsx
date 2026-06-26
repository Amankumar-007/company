'use client';

import Link from 'next/link';
import locationsData from '@/data/locations-data.json';

const { locations } = locationsData;
const indian        = locations.filter(l => l.country_code === 'IN');
const international = locations.filter(l => l.country_code !== 'IN');

export default function LocationsWeServe() {
  return (
    <section className="py-16 px-6 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-[#ea580c] font-bold uppercase tracking-widest mb-2">
          Coverage
        </p>
        <h2
          className="text-2xl font-bold text-white mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Locations We Serve
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* India */}
          <div>
            <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wider mb-4">
              India
            </p>
            <div className="flex flex-wrap gap-2">
              {indian.map(loc => (
                <Link
                  key={loc.slug}
                  href={`/web-development-company-${loc.slug}`}
                  className="px-4 py-2 text-sm text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#ea580c]/50 rounded-full transition-all duration-200"
                >
                  {loc.city}
                </Link>
              ))}
            </div>
          </div>

          {/* International */}
          <div>
            <p className="text-xs text-neutral-600 font-semibold uppercase tracking-wider mb-4">
              International
            </p>
            <div className="flex flex-wrap gap-2">
              {international.map(loc => (
                <Link
                  key={loc.slug}
                  href={`/web-development-company-${loc.slug}`}
                  className="px-4 py-2 text-sm text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#ea580c]/50 rounded-full transition-all duration-200"
                >
                  {loc.city ?? loc.country}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
