export const targetLocations = [
  { id: 'noida', name: 'Noida', state: 'Uttar Pradesh' },
  { id: 'delhi', name: 'Delhi', state: 'Delhi' },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh' },
  { id: 'gurugram', name: 'Gurugram', state: 'Haryana' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' }
];

export const getSeoTarget = (slug) => {
  // Try to parse slug format: best-{service}-in-{location} or {service}-in-{location}
  // We also handle "digital-agency" or "web-solution" as special service keywords
  
  let match = slug.match(/^(?:best-)?(.+)-in-(.+)$/);
  
  if (!match) return null;
  
  let serviceSlug = match[1]; // e.g. "web-development" or "digital-agency"
  let locationSlug = match[2]; // e.g. "noida"

  const location = targetLocations.find(l => l.id === locationSlug);
  if (!location) return null;

  // Map special strings or find matching service
  let serviceName = '';
  if (serviceSlug === 'digital-agency') serviceName = 'Digital Agency';
  else if (serviceSlug === 'web-solution') serviceName = 'Web Solution';
  else if (serviceSlug === 'web-development') serviceName = 'Web Development';
  else if (serviceSlug === 'mobile-development') serviceName = 'Mobile App Development';
  else if (serviceSlug === 'ui-ux-design') serviceName = 'UI/UX Design';
  else if (serviceSlug === 'ecommerce-solutions') serviceName = 'E-commerce Solutions';
  else if (serviceSlug === 'seo-services') serviceName = 'SEO Services';
  else {
    // Attempt to format slug to Title Case
    serviceName = serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return { location, serviceName, serviceSlug, locationSlug };
};
