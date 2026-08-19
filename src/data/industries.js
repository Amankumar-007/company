// Each industry here is backed by a real, shipped Twofloww project — see
// `caseStudySlug`. We deliberately don't list industries (healthcare,
// fintech, etc.) we haven't actually built for, to avoid implying
// regulatory/compliance expertise (HIPAA, RBI, etc.) we can't back up.

export const industries = [
  {
    slug: 'real-estate',
    name: 'Real Estate',
    tagline: 'Property platforms buyers and agents actually use',
    caseStudySlug: 'awasdhara',
    caseStudyName: 'Awasdhara',
    heroStat: { value: '5K+', label: 'properties listed on Awasdhara' },
    summary: 'We built Awasdhara, a full-stack real estate marketplace connecting buyers, sellers, and agents across India — property search, virtual tours, agent CRM, and lead management in one platform.',
    whatWeBuild: [
      { title: 'Property Search & Discovery', description: 'Location, budget, and amenity-based filtering with map views and saved searches.' },
      { title: 'Virtual Tours', description: '360° property walkthroughs so buyers can shortlist remotely.' },
      { title: 'Agent & Builder Portals', description: 'Listing management, lead tracking, and pipeline dashboards for agents.' },
      { title: 'Lead & Enquiry Systems', description: 'Structured enquiry capture and routing so no lead sits unworked.' },
    ],
    commonAsks: [
      'A property marketplace or listing platform for a specific city or region',
      'An agent/broker CRM with lead and pipeline tracking',
      'A builder portal for managing multi-project inventory',
      'EMI/mortgage calculators and financing tools embedded in the buyer journey',
    ],
  },
  {
    slug: 'food-delivery-logistics',
    name: 'Food Delivery & Logistics',
    tagline: 'On-demand delivery networks with live tracking',
    caseStudySlug: 'foodfloww',
    caseStudyName: 'FoodFloww',
    heroStat: { value: '25K+', label: 'orders processed monthly on FoodFloww' },
    summary: 'We built FoodFloww, an end-to-end food delivery ecosystem — customer app, driver app, and restaurant POS portal — with real-time GPS tracking and automated dispatch.',
    whatWeBuild: [
      { title: 'Customer Ordering Apps', description: 'Browsing, cart, checkout, and order tracking for web and mobile.' },
      { title: 'Driver / Rider Apps', description: 'Turn-by-turn navigation, earnings tracking, and job assignment.' },
      { title: 'Live GPS Tracking', description: 'WebSocket-backed real-time location for every active order.' },
      { title: 'Dispatch & Merchant Tools', description: 'Automated driver assignment and a restaurant-facing order queue.' },
    ],
    commonAsks: [
      'A branded delivery app to reduce dependency on third-party aggregator commissions',
      'A dispatch/logistics engine for couriers, groceries, or last-mile delivery',
      'Real-time order or fleet tracking for an existing operation',
      'A merchant or restaurant partner portal',
    ],
  },
  {
    slug: 'ai-saas',
    name: 'AI & SaaS Products',
    tagline: 'AI-powered platforms, built and shipped',
    caseStudySlug: 'tomatoai',
    caseStudyName: 'TomatoAI',
    heroStat: { value: '10K+', label: 'active users on TomatoAI' },
    summary: 'We built TomatoAI, an all-in-one AI tools platform combining content generation, automation, and team collaboration in a single workspace, integrating OpenAI and custom ML models.',
    whatWeBuild: [
      { title: 'AI Feature Integration', description: 'Wiring OpenAI and other model APIs into real product workflows, not just a chat widget.' },
      { title: 'Usage & Credit Systems', description: 'Metering, quotas, and billing logic for AI-consumption-based pricing.' },
      { title: 'Team Workspaces', description: 'Multi-user collaboration, sharing, and permissioning for SaaS products.' },
      { title: 'Analytics Dashboards', description: 'Usage tracking and reporting so teams can see what an AI feature is actually doing.' },
    ],
    commonAsks: [
      'Adding AI features to an existing product',
      'Building a new AI-first SaaS product from scratch',
      'Usage-based billing and subscription infrastructure',
      'A polished, fast UI on top of AI/ML backends',
    ],
  },
  {
    slug: 'developer-tools',
    name: 'Developer Tools',
    tagline: 'Real-time, collaborative software for engineering teams',
    caseStudySlug: 'snippetsx',
    caseStudyName: 'SnippetsX',
    heroStat: { value: '< 50ms', label: 'real-time sync latency on SnippetsX' },
    summary: 'We built SnippetsX, a real-time collaborative code-sharing workspace with an in-browser code runner supporting 20+ languages and live multi-user editing.',
    whatWeBuild: [
      { title: 'Real-Time Collaboration', description: 'WebSocket-powered live cursors and shared editing, built for low latency.' },
      { title: 'Sandboxed Code Execution', description: 'Isolated, secure environments for running untrusted user code.' },
      { title: 'Workspace & Access Control', description: 'Private/public workspaces with team permissions.' },
      { title: 'Embeds & Sharing', description: 'Shareable links and embeddable widgets for docs and blogs.' },
    ],
    commonAsks: [
      'A collaborative editor or workspace tool',
      'Sandboxed or isolated code/script execution',
      'Real-time sync between multiple users or devices',
      'Developer-facing tooling: CLIs, SDKs, internal platforms',
    ],
  },
  {
    slug: 'consultation-marketplaces',
    name: 'Consultation & Marketplace Apps',
    tagline: 'Live video/audio consultation platforms with per-minute billing',
    caseStudySlug: 'astroconnect',
    caseStudyName: 'AstroConnect',
    heroStat: { value: '50K+', label: 'consultations completed on AstroConnect' },
    summary: 'We built AstroConnect, a live consultation marketplace connecting users with verified experts over WebRTC audio/video, with automated per-minute wallet billing.',
    whatWeBuild: [
      { title: 'Live Video/Audio Calls', description: 'Low-latency WebRTC consultation rooms with call quality monitoring.' },
      { title: 'Expert Marketplace & Queues', description: 'Verified provider profiles, availability, and queueing logic.' },
      { title: 'Per-Minute Billing', description: 'Automated wallet deduction tied to live call duration.' },
      { title: 'Booking & Scheduling', description: 'Appointment and on-demand booking flows.' },
    ],
    commonAsks: [
      'A two-sided marketplace connecting experts/providers with customers',
      'Live video or audio consultation infrastructure',
      'Usage-based (per-minute, per-session) billing',
      'Verified-provider onboarding and vetting flows',
    ],
  },
];

export function getIndustryBySlug(slug) {
  return industries.find((i) => i.slug === slug) || null;
}

export function getAllIndustries() {
  return industries;
}
