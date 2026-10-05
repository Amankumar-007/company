// Service-specific copy for the `{service}-agency-in-{location}` pages.
//
// Without this, every service page in a city rendered the same template copy
// and Semrush flagged them as >85% duplicate content. Each service gets its own
// overview, deliverables, process, tech stack and FAQs so the pages are
// genuinely about different things. `place` is the city or country name.

export const locationServiceContent = {
  'web-development': {
    overview: (place) => [
      `Our web development work for ${place} businesses covers everything from fast marketing websites to full web applications with logins, dashboards, payments, and third-party integrations. We build on Next.js and React, which gives you server-rendered pages that load quickly, rank well, and stay easy to extend as your product grows.`,
      `Most projects start with an existing problem: a slow WordPress site, a spreadsheet-driven process that needs a proper tool, or an MVP that has to reach real users quickly. We scope the smallest version that solves it, ship it in reviewable milestones, and keep the codebase clean enough that your future developers can pick it up without a rewrite.`,
      `Every build includes responsive layouts, technical SEO foundations, analytics, and a deployment pipeline, so launch day is a non-event rather than a scramble.`,
    ],
    deliverables: [
      { title: 'Business & marketing websites', desc: 'Fast, editable sites with CMS-managed pages, forms, and analytics wired in.' },
      { title: 'Custom web applications', desc: 'Portals, dashboards, booking systems, and internal tools built around your workflow.' },
      { title: 'SaaS MVPs', desc: 'Auth, billing, roles, and a focused feature set to validate your product with real users.' },
      { title: 'APIs & integrations', desc: 'REST/GraphQL APIs and connections to CRMs, payment gateways, and ERPs.' },
      { title: 'Performance rebuilds', desc: 'Migrating slow legacy sites to a modern stack with better Core Web Vitals.' },
      { title: 'Maintenance & hosting', desc: 'Monitoring, security updates, backups, and small feature work after launch.' },
    ],
    process: [
      { t: 'Scope', d: 'Requirements, user flows, and a technical plan with a fixed first milestone.' },
      { t: 'Architect', d: 'Data model, API design, and hosting choices before any UI is built.' },
      { t: 'Build', d: 'Weekly demos on a staging URL so you see progress, not status reports.' },
      { t: 'Ship', d: 'Load testing, SEO checks, analytics, and a monitored production launch.' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vercel', 'Docker', 'AWS'],
    faqs: (place) => [
      { q: `Should my ${place} business use WordPress or a custom Next.js site?`, a: 'If you mainly publish pages and blog posts and want plugins, WordPress is fine. If you need custom functionality, strong performance, or plan to grow into a web app, a Next.js build with a headless CMS is usually the better long-term choice. We will recommend whichever fits your goals.' },
      { q: 'Can you take over a website another developer built?', a: 'Yes. We start with a code and hosting audit, fix critical issues first, and then continue development or plan a gradual migration if the existing codebase is holding you back.' },
    ],
  },

  'web-design': {
    overview: (place) => [
      `Our web design service helps ${place} businesses look credible online and turn visits into enquiries. We design the full site — page structure, messaging hierarchy, visual identity, and responsive layouts — in Figma first, so you can review and approve every page before development starts.`,
      `Good web design is not decoration. We work out what your visitors need to see to trust you, where they drop off today, and which calls to action matter most, then design pages around those answers. The result is a site that feels distinctly yours instead of a lightly edited template.`,
      `Designs are handed over with a component library and spacing system, so new pages added later still look consistent with the original launch.`,
    ],
    deliverables: [
      { title: 'Website redesigns', desc: 'Modernising dated sites while preserving the SEO value of existing pages.' },
      { title: 'Landing pages', desc: 'Campaign pages designed around a single conversion goal and tested for clarity.' },
      { title: 'Brand-aligned visual design', desc: 'Typography, colour, imagery, and iconography that match your brand.' },
      { title: 'Responsive layouts', desc: 'Every page designed for mobile, tablet, and desktop — not just scaled down.' },
      { title: 'Copy structure', desc: 'Headline and section hierarchy that makes your offer clear in seconds.' },
      { title: 'Design-to-code handoff', desc: 'Developer-ready Figma files, or we build the design ourselves.' },
    ],
    process: [
      { t: 'Audit', d: 'Review your current site, competitors, and analytics to find what is not working.' },
      { t: 'Wireframe', d: 'Low-fidelity page layouts to agree on structure before visual polish.' },
      { t: 'Visual design', d: 'High-fidelity mockups for key pages, refined over two review rounds.' },
      { t: 'Build & QA', d: 'Pixel-accurate development and cross-device testing before launch.' },
    ],
    tech: ['Figma', 'Framer', 'Illustrator', 'Photoshop', 'Next.js', 'Tailwind CSS', 'Hotjar', 'Google Analytics'],
    faqs: (place) => [
      { q: `How long does a website redesign take for a ${place} business?`, a: 'A focused redesign of a 5–10 page site usually takes 3–5 weeks from kickoff to launch, including two rounds of design revisions. Larger sites with many templates take longer and are planned in phases.' },
      { q: 'Will a redesign hurt our current Google rankings?', a: 'Not if it is handled carefully. We keep URLs where possible, set up 301 redirects where they change, and preserve titles, headings, and content that already rank.' },
    ],
  },

  'app-development': {
    overview: (place) => [
      `We build iOS and Android apps for ${place} startups and businesses, usually with React Native or Flutter so one codebase serves both platforms. When an app needs deep device access or heavy native performance, we use Swift and Kotlin instead and tell you why upfront.`,
      `Mobile projects succeed or fail on the details: offline behaviour, push notifications that people actually want, smooth onboarding, and an approval-ready App Store and Play Store submission. We plan for those from the first sprint rather than discovering them at the end.`,
      `Alongside the app itself we build the backend, admin panel, and analytics you need to run it, so you are not left with a beautiful app and no way to manage users, content, or orders.`,
    ],
    deliverables: [
      { title: 'Cross-platform apps', desc: 'React Native or Flutter apps sharing one codebase across iOS and Android.' },
      { title: 'Native iOS & Android', desc: 'Swift and Kotlin builds when performance or hardware access demands it.' },
      { title: 'On-demand & marketplace apps', desc: 'Booking, delivery, and two-sided marketplace flows with live tracking.' },
      { title: 'Backend & admin panels', desc: 'APIs, databases, and web dashboards to manage users, content, and orders.' },
      { title: 'Push, payments & maps', desc: 'Notifications, in-app payments, location services, and deep links.' },
      { title: 'Store launch & updates', desc: 'App Store and Play Store submission, release management, and crash monitoring.' },
    ],
    process: [
      { t: 'Product plan', d: 'Core user journeys, feature priorities, and a realistic MVP scope.' },
      { t: 'Prototype', d: 'Clickable app prototype tested on real phones before development.' },
      { t: 'Sprints', d: 'Two-week sprints with TestFlight and Android test builds you can install.' },
      { t: 'Release', d: 'Store submission, crash reporting, analytics, and post-launch iteration.' },
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'GraphQL', 'Supabase', 'Fastlane', 'Sentry'],
    faqs: (place) => [
      { q: `Should a ${place} startup build a native or cross-platform app?`, a: 'For most startups, a cross-platform app in React Native or Flutter is faster and cheaper to build and maintain, with near-native performance. Native development makes sense for apps that rely heavily on device hardware, complex animations, or platform-specific features.' },
      { q: 'Do you handle App Store and Google Play submission?', a: 'Yes. We prepare store listings, screenshots, privacy disclosures, and builds, and manage the review process — including fixing anything Apple or Google flag during review.' },
    ],
  },

  'ecommerce-development': {
    overview: (place) => [
      `We build online stores for ${place} brands and retailers — from a well-configured Shopify store to fully custom headless storefronts. The goal is always the same: a fast catalogue, a checkout with as little friction as possible, and back-office tools your team can actually run day to day.`,
      `We help you choose the right platform before writing any code. Shopify suits most direct-to-consumer brands, WooCommerce works well when content and SEO lead, and a headless Next.js storefront is worth it when you need custom experiences or very high performance at scale.`,
      `Stores ship with payment gateways, shipping and tax rules, analytics, and product structured data configured, so you can start taking orders — and tracking where they come from — on day one.`,
    ],
    deliverables: [
      { title: 'Shopify stores', desc: 'Theme customisation, apps, and configuration for direct-to-consumer brands.' },
      { title: 'WooCommerce builds', desc: 'Content-led stores on WordPress with tailored product and checkout flows.' },
      { title: 'Headless commerce', desc: 'Next.js storefronts on Shopify or custom backends for maximum speed.' },
      { title: 'Payments & checkout', desc: 'Razorpay, Stripe, PayPal, COD, and checkout optimisation to cut drop-off.' },
      { title: 'Inventory & ERP sync', desc: 'Stock, orders, and fulfilment connected to your warehouse or ERP.' },
      { title: 'Store migrations', desc: 'Moving products, customers, and orders between platforms without losing SEO.' },
    ],
    process: [
      { t: 'Platform fit', d: 'Pick Shopify, WooCommerce, or headless based on catalogue, budget, and growth plans.' },
      { t: 'Catalogue & UX', d: 'Product structure, filters, product pages, and checkout flow design.' },
      { t: 'Build & integrate', d: 'Payments, shipping, tax, inventory, and marketing tools connected.' },
      { t: 'Launch & optimise', d: 'Test orders, tracking setup, and conversion improvements after launch.' },
    ],
    tech: ['Shopify', 'WooCommerce', 'BigCommerce', 'Magento', 'Stripe', 'PayPal', 'Next.js', 'Google Analytics', 'Google Tag Manager'],
    faqs: (place) => [
      { q: `Which ecommerce platform is best for a ${place} business?`, a: 'Shopify is the best fit for most brands that want to launch quickly with reliable hosting and apps. WooCommerce suits content-heavy stores already on WordPress. Headless commerce is worth the extra investment for large catalogues or highly custom shopping experiences.' },
      { q: 'Can you integrate Indian payment gateways and COD?', a: 'Yes. We integrate Razorpay, PayU, Cashfree, and Stripe, as well as cash on delivery, along with shipping partners such as Shiprocket for order fulfilment.' },
    ],
  },

  'ui-ux-design': {
    overview: (place) => [
      `Our UI/UX design service helps ${place} product teams design software that people understand without a manual. We focus on the hard parts of product design — complex workflows, dashboards, onboarding, and data-heavy screens — rather than just making things look polished.`,
      `Design decisions are grounded in evidence: user interviews, analytics, usability tests on prototypes, and heuristic reviews of what exists today. That evidence lets us explain why a flow should change, not just show a prettier version of it.`,
      `We deliver a documented design system alongside the screens, so your engineers build consistent interfaces faster and new features do not drift from the original design.`,
    ],
    deliverables: [
      { title: 'UX research', desc: 'User interviews, journey mapping, and analysis of where users struggle today.' },
      { title: 'Information architecture', desc: 'Navigation, content structure, and flows that match how users think.' },
      { title: 'Wireframes & prototypes', desc: 'Interactive Figma prototypes for testing ideas before development.' },
      { title: 'Usability testing', desc: 'Moderated and unmoderated tests with real users, with prioritised fixes.' },
      { title: 'Product UI design', desc: 'High-fidelity screens for web apps, dashboards, and mobile apps.' },
      { title: 'Design systems', desc: 'Reusable components, tokens, and documentation in Figma and Storybook.' },
    ],
    process: [
      { t: 'Research', d: 'Interviews, analytics review, and a UX audit of the current product.' },
      { t: 'Define', d: 'Personas, key jobs-to-be-done, and the flows that matter most.' },
      { t: 'Prototype', d: 'Interactive prototypes tested with users and refined from feedback.' },
      { t: 'Systemise', d: 'Final UI and a design system handed over to your engineering team.' },
    ],
    tech: ['Figma', 'Maze', 'Framer', 'Storybook', 'Hotjar', 'Adobe XD', 'Sketch', 'Zeplin'],
    faqs: (place) => [
      { q: 'What is the difference between UI and UX design?', a: 'UX design is about how a product works: the flows, structure, and decisions a user makes to get something done. UI design is about how it looks and feels: layout, typography, colour, and components. We handle both, starting with UX so the interface is built on a sound structure.' },
      { q: `Can you work with our in-house developers in ${place}?`, a: 'Yes. We regularly design alongside client engineering teams, sharing Figma files, component specs, and Storybook documentation, and joining sprint reviews to answer questions during implementation.' },
    ],
  },

  'seo-services': {
    overview: (place) => [
      `Our SEO services help ${place} businesses get found by people already searching for what they sell. We combine technical SEO, content, and local search work, and report on enquiries and revenue from organic traffic — not just rankings for vanity keywords.`,
      `Because we are developers as well as marketers, we fix technical problems directly instead of handing you a list: slow pages, crawl and indexing errors, broken structured data, duplicate content, and poor internal linking. Those fixes often deliver the fastest gains.`,
      `For local visibility we optimise your Google Business Profile, location pages, and citations so you show up in the map pack when customers in ${place} search for your services nearby.`,
    ],
    deliverables: [
      { title: 'Technical SEO audits', desc: 'Crawlability, indexing, Core Web Vitals, and structured data issues fixed.' },
      { title: 'Keyword & content strategy', desc: 'Topics mapped to search intent and the pages that should rank for them.' },
      { title: 'On-page optimisation', desc: 'Titles, headings, internal links, and content improved page by page.' },
      { title: 'Local SEO', desc: 'Google Business Profile, local landing pages, reviews, and citations.' },
      { title: 'Link earning', desc: 'Digital PR and relevant outreach rather than low-quality link schemes.' },
      { title: 'Reporting', desc: 'Monthly reports tying rankings and traffic to leads and sales.' },
    ],
    process: [
      { t: 'Audit', d: 'Technical crawl, content review, and competitor gap analysis.' },
      { t: 'Fix', d: 'Resolve technical blockers and quick wins in the first month.' },
      { t: 'Grow', d: 'Publish and improve content targeting high-intent keywords.' },
      { t: 'Measure', d: 'Track rankings, traffic, and conversions, and adjust every month.' },
    ],
    tech: ['Google Analytics', 'Google Tag Manager', 'SEMrush', 'Ahrefs', 'Hotjar', 'Next.js'],
    faqs: (place) => [
      { q: `How long does SEO take to show results in ${place}?`, a: 'Technical fixes and on-page improvements can lift existing rankings within weeks. Ranking new pages for competitive keywords usually takes 3–6 months of consistent work, depending on your site\'s current authority and the competition.' },
      { q: 'Do you guarantee first-page rankings?', a: 'No — and you should be wary of anyone who does, because no one controls Google\'s algorithm. We commit to the work, transparent reporting, and measurable improvements in traffic and enquiries.' },
    ],
  },
};

export function getLocationServiceContent(serviceKey) {
  return locationServiceContent[serviceKey] || locationServiceContent['web-development'];
}
