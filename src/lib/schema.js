const BASE_URL = 'https://www.twofloww.in';

export function generateLocalBusinessSchema(loc, brand) {
  const name = loc.type === 'city' ? loc.city : loc.country;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: brand.name,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.png`,
    telephone: loc.country_code === 'IN' ? brand.phone_india : brand.phone_intl,
    email: brand.email,
    areaServed: {
      '@type': loc.type === 'city' ? 'City' : 'Country',
      name,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.lat,
      longitude: loc.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.address_india,
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/twofloww',
      'https://twitter.com/twofloww',
      'https://www.instagram.com/twofloww',
    ],
    priceRange: '₹₹',
    openingHours: 'Mo-Fr 09:00-18:00',
    knowsAbout: [
      'Web Development',
      'Mobile App Development',
      'UI/UX Design',
      'SEO',
      'eCommerce Development',
      'Cloud Solutions',
    ],
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function generateBreadcrumbSchema(loc) {
  const name = loc.type === 'city' ? loc.city : loc.country;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${BASE_URL}/locations` },
      { '@type': 'ListItem', position: 3, name },
    ],
  };
}
