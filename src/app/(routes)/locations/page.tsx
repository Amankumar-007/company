import type { Metadata } from "next"
import locationsData from "@/data/locations-data.json"
import Link from "next/link"

const BASE_URL = "https://www.twofloww.in"

export const metadata: Metadata = {
  title: { absolute: "Service Locations – Twofloww Digital Agency | India & Global" },
  description: "Explore Twofloww services across India and internationally. Web development, mobile apps, UI/UX design, and SEO services in major cities.",
  alternates: {
    canonical: `${BASE_URL}/locations`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${BASE_URL}/locations`,
    siteName: "Twofloww Digital Agency",
    title: "Twofloww Services – All Locations",
    description: "Web development, mobile apps, and design services across India and globally.",
    images: [{
      url: `${BASE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "Twofloww Digital Agency Services",
      type: "image/png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Twofloww Services – All Locations",
    description: "Web development, mobile apps, and design services across India and globally.",
    images: [`${BASE_URL}/opengraph-image`],
    creator: "@twofloww",
    site: "@twofloww",
  },
}

const groupLocationsByCountry = (locations: typeof locationsData.locations) => {
  const grouped = new Map<string, typeof locations>()

  locations.forEach(loc => {
    const country = loc.country
    if (!grouped.has(country)) {
      grouped.set(country, [])
    }
    grouped.get(country)!.push(loc)
  })

  return grouped
}

export default function LocationsPage() {
  const grouped = groupLocationsByCountry(locationsData.locations)
  const services = locationsData.services

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Twofloww Services by Location
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore our {services.length} core services across {locationsData.locations.length} locations globally.
          </p>
        </div>

        {Array.from(grouped.entries()).map(([country, locations]) => (
          <section key={country} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-4">
              {country}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map(loc => (
                <div key={loc.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-4">
                    {loc.type === "country" ? loc.country : loc.city}
                  </h3>

                  <ul className="space-y-2">
                    {services.map(service => (
                      <li key={service.key}>
                        <Link
                          href={`/${service.key}-agency-in-${loc.slug}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
