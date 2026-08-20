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
    slug: 'entertainment-media',
    name: 'Entertainment & Media',
    tagline: 'Streaming and media discovery platforms with cinematic speed',
    caseStudySlug: 'shockme',
    caseStudyName: 'ShockMe (Plotmint)',
    heroStat: { value: '35K+', label: 'monthly streamers on ShockMe' },
    summary: 'We built ShockMe (Plotmint), an ultra-fast movie discovery and streaming hub with curated mood finders, instant trailer streaming, and immersive cinematic UI.',
    whatWeBuild: [
      { title: 'Mood-Based Discovery', description: 'Personalized curation matching user mood and viewing time to perfect titles.' },
      { title: 'Instant Trailer Hub', description: 'Ultra-fast high-definition trailer streaming with zero buffering.' },
      { title: 'Watchlist & Bookmarks', description: 'Cross-device synced collections and countdown notifications.' },
      { title: 'Cinematic Responsive Layouts', description: 'Dark-mode media browsing designed for smartphones and wide screens.' },
    ],
    commonAsks: [
      'A branded movie, OTT, or podcast discovery platform',
      'Video streaming and catalog browsing with fast search',
      'User watchlist, favorites, and profile management',
      'High-performance CDN video and image delivery',
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
];

export function getIndustryBySlug(slug) {
  return industries.find((i) => i.slug === slug) || null;
}

export function getAllIndustries() {
  return industries;
}
