// National service pages — /services/[slug].
//
// Each page targets one keyword cluster from the competitor keyword-gap
// analysis (Semrush, Oct 2026). Primary keyword goes in the title/H1; the
// secondary keywords are covered naturally in section headings, offerings and
// FAQs. Keep claims factual: no invented stats, prices or certifications.
//
//   locationServiceKey → which `{key}-agency-in-{city}` pages to link to
//   caseStudies        → slugs from src/data/projects.js
//   solutions          → slugs from src/data/solutions.js

export const servicePages = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'web-development',
    name: 'Web Development',
    locationServiceKey: 'web-development',
    seo: {
      title: 'Web Development Company in India | Twofloww',
      description:
        'Twofloww is a web development company in India building fast websites, web apps and CMS sites with Next.js, React and WordPress. Free consultation.',
    },
    eyebrow: 'Website development services',
    h1: 'Web Development Company in India',
    intro: [
      'Twofloww is a web development company based in Noida, India, building fast business websites, custom web applications and content-managed sites for startups and established businesses in India and abroad.',
      'We design and develop websites that load quickly, rank well on Google and turn visitors into enquiries — and we hand over clean code you fully own.',
    ],
    offerings: {
      heading: 'Website development services we offer',
      items: [
        { title: 'Custom website development', desc: 'Business and marketing websites built from scratch around your brand, content and conversion goals — no recycled templates.' },
        { title: 'Web application development', desc: 'Customer portals, dashboards, booking systems and internal tools with logins, roles, payments and integrations.' },
        { title: 'CMS & WordPress development', desc: 'WordPress or headless CMS builds so your team can edit pages, blogs and landing pages without a developer.' },
        { title: 'Next.js & React development', desc: 'Server-rendered React sites and apps with Next.js for speed, SEO and room to grow into a full product.' },
        { title: 'Website design services', desc: 'Responsive page design in Figma, approved by you before development starts, so the build matches what you signed off.' },
        { title: 'Website redesign & migration', desc: 'Rebuilding slow or dated sites on a modern stack while keeping URLs, content and rankings intact with proper redirects.' },
        { title: 'API & third-party integrations', desc: 'Connecting your site to CRMs, payment gateways, booking engines, ERPs and marketing tools.' },
        { title: 'Website maintenance & support', desc: 'Updates, security patches, backups, uptime monitoring and small improvements after launch.' },
      ],
    },
    approach: {
      heading: 'Websites built for speed, SEO and conversions',
      paragraphs: [
        'Most of our web development work uses Next.js and React, which render pages on the server so they load fast and are easy for Google to crawl. For content-heavy sites where your team wants a familiar editor, we build on WordPress or a headless CMS and keep the front end just as fast.',
        'Every website ships with responsive layouts tested on real phones, technical SEO foundations (clean URLs, metadata, structured data, sitemaps), analytics, and Core Web Vitals checked before launch. That means you are not paying for a second project later just to make the site findable.',
        'We work in milestones with a staging link you can review every week, so you see progress as it happens and can change direction early rather than at the end.',
      ],
    },
    process: [
      { title: 'Discovery', desc: 'Goals, audience, sitemap and features agreed in a written scope.' },
      { title: 'Design', desc: 'Wireframes and visual designs in Figma, reviewed before any code.' },
      { title: 'Development', desc: 'Weekly builds on a staging URL with your feedback built in.' },
      { title: 'Testing & launch', desc: 'Cross-device QA, speed and SEO checks, then a monitored go-live.' },
      { title: 'Support', desc: 'Maintenance, updates and improvements once you are live.' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'WordPress', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Vercel', 'AWS'],
    cost: {
      heading: 'How much does website development cost in India?',
      paragraphs: [
        'Website development cost depends on what the site needs to do. A focused business website with a handful of pages is a small, fixed-scope project; a web application with user accounts, payments and integrations is a larger build planned in phases.',
        'After a free consultation we send an itemised proposal with a fixed scope, timeline and price for each milestone, so you know the total before work starts. As a guide, a business website typically takes 2–4 weeks and a custom web application 6–12 weeks.',
      ],
      factors: ['Number of pages and unique templates', 'Custom features: logins, payments, booking, dashboards', 'CMS and content migration', 'Third-party integrations', 'Design complexity and animation', 'Ongoing maintenance needs'],
    },
    whyUs: [
      { title: 'Senior engineers, not outsourced juniors', desc: 'The people you speak to on calls are the people who build your site.' },
      { title: 'SEO built in from day one', desc: 'Technical SEO and page speed are part of the build, not an upsell.' },
      { title: 'Fixed scope, clear milestones', desc: 'Itemised proposals and payments tied to approved milestones.' },
      { title: 'You own everything', desc: 'Full source code, design files and accounts are handed over at the end.' },
    ],
    caseStudies: ['snippetsx', 'awasdhara', 'tomatoai'],
    solutions: ['startup-acceleration', 'enterprise-digital-transformation', 'ecommerce-solutions'],
    faqs: [
      { q: 'Why choose Twofloww as your web development company in India?', a: 'You work directly with senior developers, get a fixed-scope proposal before work starts, and receive a fast, SEO-ready website with full code ownership. We have delivered 50+ projects for clients in India and 10+ other countries.' },
      { q: 'Do you build websites on WordPress or custom code?', a: 'Both. We recommend WordPress or a headless CMS when your team needs to publish content often, and custom Next.js/React development when you need speed, custom features or a site that will grow into a web application.' },
      { q: 'How long does it take to build a website?', a: 'A typical business website takes 2–4 weeks from approved design to launch. Web applications with user accounts and integrations usually take 6–12 weeks, delivered in milestones.' },
      { q: 'Will my website be SEO-friendly and mobile responsive?', a: 'Yes. Every site we build is responsive and includes technical SEO foundations — clean URLs, metadata, structured data, XML sitemaps and fast Core Web Vitals.' },
      { q: 'Do you work with clients outside India?', a: 'Yes. We work with businesses in the USA, UK, UAE, Canada and Australia, collaborating remotely with overlapping working hours for calls and reviews.' },
      { q: 'Can you redesign my existing website without losing rankings?', a: 'Yes. We keep URLs where possible, set up 301 redirects where they change, and preserve the titles, content and structure that already rank.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    locationServiceKey: 'app-development',
    seo: {
      title: 'Mobile App Development Company in India | Twofloww',
      description:
        'Mobile app development company in India building iOS and Android apps with Flutter, React Native, Swift and Kotlin — from MVP to App Store launch.',
    },
    eyebrow: 'App development services',
    h1: 'Mobile App Development Company in India',
    intro: [
      'Twofloww is a mobile app development company in India that designs and builds iOS and Android apps for startups and growing businesses — from the first MVP to App Store and Google Play launch.',
      'We build the app, the backend and the admin panel you need to run it, so you get a complete product rather than a front end with nothing behind it.',
    ],
    offerings: {
      heading: 'App development services',
      items: [
        { title: 'Android app development', desc: 'Native Kotlin or cross-platform Android apps tested across the wide range of devices your users actually have.' },
        { title: 'iOS app development', desc: 'Swift or cross-platform iPhone and iPad apps prepared for App Store review from the first sprint.' },
        { title: 'Flutter app development', desc: 'One Flutter codebase for iOS and Android with smooth, native-feeling interfaces and faster delivery.' },
        { title: 'React Native app development', desc: 'Cross-platform React Native apps that share logic with your React web app where it makes sense.' },
        { title: 'Ecommerce app development', desc: 'Shopping apps with catalogues, carts, payments, order tracking and push notifications.' },
        { title: 'On-demand & delivery apps', desc: 'Food delivery, grocery, taxi and booking apps with live tracking and separate customer, driver and admin apps.' },
        { title: 'App backend & admin panel', desc: 'APIs, databases and web dashboards to manage users, content, orders and payments.' },
        { title: 'App maintenance & updates', desc: 'OS updates, crash monitoring, store releases and new features after launch.' },
      ],
    },
    approach: {
      heading: 'Native or cross-platform — chosen for your product',
      paragraphs: [
        'For most startups we recommend cross-platform development with Flutter or React Native: one codebase covers iOS and Android, which cuts cost and time to market while keeping near-native performance. When an app depends on heavy device features, complex animation or platform-specific APIs, we build natively in Swift and Kotlin and explain why.',
        'Flutter vs React Native is usually decided by your team and roadmap: React Native fits well if you already run a React web app and want to share code; Flutter shines for highly custom, animation-rich interfaces. We give you a straight recommendation in the consultation.',
        'Every app ships with crash reporting, analytics and a release pipeline, and we handle App Store and Google Play submission — including fixing anything Apple or Google flag in review.',
      ],
    },
    process: [
      { title: 'Product plan', desc: 'User journeys, feature priorities and a realistic MVP scope.' },
      { title: 'Prototype', desc: 'Clickable prototype tested on real phones before coding.' },
      { title: 'Sprints', desc: 'Two-week sprints with test builds you can install and try.' },
      { title: 'Launch', desc: 'Store listings, review, release and crash monitoring.' },
      { title: 'Grow', desc: 'Iterate on analytics and user feedback after launch.' },
    ],
    tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'GraphQL', 'Supabase', 'Fastlane', 'Sentry'],
    cost: {
      heading: 'How much does it cost to make an app in India?',
      paragraphs: [
        'Mobile app development cost in India depends mainly on the number of screens and features, whether you need iOS, Android or both, and how much backend work is involved — for example payments, real-time tracking or an admin panel.',
        'We scope a focused MVP first so you can launch, learn from real users and invest further with evidence. You receive an itemised, milestone-based proposal after a free consultation. Many MVPs launch in 8–12 weeks.',
      ],
      factors: ['iOS, Android or both (native vs cross-platform)', 'Number of screens and user roles', 'Backend, APIs and admin panel', 'Payments, maps, chat or real-time features', 'Third-party integrations', 'Post-launch maintenance'],
    },
    whyUs: [
      { title: 'Full product, not just screens', desc: 'App, backend, admin panel and analytics delivered together.' },
      { title: 'Honest platform advice', desc: 'Native vs cross-platform recommended on cost and fit, not habit.' },
      { title: 'Store-ready releases', desc: 'We manage App Store and Google Play submission end to end.' },
      { title: 'Code you own', desc: 'Full source code and store accounts handed over to you.' },
    ],
    caseStudies: ['getbeds', 'icbrwellness', 'shockme'],
    solutions: ['food-delivery-app-development', 'grocery-delivery-app-development', 'taxi-app-development', 'fitness-gym-app-development', 'dating-app-development', 'healthcare-tech'],
    faqs: [
      { q: 'How much does mobile app development cost in India?', a: 'It depends on features, platforms and backend work. We send a fixed, itemised proposal after a free consultation, and usually recommend starting with a focused MVP to control cost.' },
      { q: 'Should I build with Flutter or React Native?', a: 'Both are excellent cross-platform choices. React Native suits teams already using React on the web; Flutter is strong for highly custom interfaces. We recommend one based on your product and team.' },
      { q: 'How long does it take to develop a mobile app?', a: 'A focused MVP typically takes 8–12 weeks. Larger apps with multiple user roles, payments and real-time features are delivered in phases.' },
      { q: 'Do you build both the app and the backend?', a: 'Yes. We build the APIs, database and admin panel alongside the app so you can manage users, content and orders from day one.' },
      { q: 'Do you publish the app to the App Store and Google Play?', a: 'Yes. We prepare listings, screenshots and privacy disclosures, submit the builds and handle any review feedback from Apple or Google.' },
      { q: 'Can you take over an existing app?', a: 'Yes. We start with a code audit, fix critical issues, then continue development or plan a rebuild if the existing codebase is holding you back.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ecommerce-development',
    name: 'Ecommerce Development',
    locationServiceKey: 'ecommerce-development',
    seo: {
      title: 'Ecommerce & Shopify Development Company | Twofloww',
      description:
        'Ecommerce website development company in India building Shopify, WooCommerce and headless stores with payments, shipping and SEO set up. Free consultation.',
    },
    eyebrow: 'Ecommerce website development',
    h1: 'Ecommerce Website Development Company',
    intro: [
      'Twofloww is an ecommerce website development company in India that builds online stores which load fast, convert well and are easy to run — on Shopify, WooCommerce or a custom headless stack.',
      'We set up payments, shipping, tax, analytics and ecommerce SEO before launch, so you can start selling and see where orders come from on day one.',
    ],
    offerings: {
      heading: 'Ecommerce development services',
      items: [
        { title: 'Shopify development', desc: 'Shopify store setup, custom themes, apps and checkout configuration for direct-to-consumer brands.' },
        { title: 'Shopify SEO', desc: 'Collection and product page optimisation, structured data, site speed and content that helps Shopify stores rank.' },
        { title: 'WooCommerce development', desc: 'Content-led stores on WordPress with tailored product, cart and checkout flows.' },
        { title: 'Headless ecommerce', desc: 'Next.js storefronts on Shopify or a custom backend for maximum speed and fully custom experiences.' },
        { title: 'Ecommerce app development', desc: 'iOS and Android shopping apps connected to your store, with push notifications and saved carts.' },
        { title: 'Payment gateway integration', desc: 'Razorpay, PayU, Cashfree, Stripe, PayPal and cash on delivery, with checkout tuned to reduce drop-off.' },
        { title: 'Inventory, shipping & ERP sync', desc: 'Stock, orders and fulfilment connected to your warehouse, shipping partners or ERP.' },
        { title: 'Store migration', desc: 'Moving products, customers and orders between platforms without losing search rankings.' },
      ],
    },
    approach: {
      heading: 'The right ecommerce platform for your business',
      paragraphs: [
        'We help you choose the platform before writing any code. Shopify is the best fit for most brands that want reliable hosting, apps and a fast launch. WooCommerce works well when content and SEO lead and you are already on WordPress. A headless store is worth it for large catalogues or highly custom shopping experiences.',
        'Whatever the platform, we focus on the things that move revenue: fast product pages, clear navigation and filters, a short checkout, trustworthy payment options for your market and ecommerce SEO that brings in buyers searching for your products.',
        'Stores launch with Google Analytics and tag tracking, product structured data and test orders run end to end, so nothing breaks when real customers arrive.',
      ],
    },
    process: [
      { title: 'Platform fit', desc: 'Shopify, WooCommerce or headless, chosen on catalogue and budget.' },
      { title: 'Store design', desc: 'Product, collection, cart and checkout pages designed for conversion.' },
      { title: 'Build & integrate', desc: 'Payments, shipping, tax, inventory and marketing tools connected.' },
      { title: 'Launch', desc: 'Test orders, tracking and SEO checks before going live.' },
      { title: 'Optimise', desc: 'Conversion and SEO improvements once real traffic arrives.' },
    ],
    tech: ['Shopify', 'WooCommerce', 'BigCommerce', 'Magento', 'Next.js', 'Stripe', 'PayPal', 'Google Analytics', 'Google Tag Manager'],
    cost: {
      heading: 'How much does an ecommerce website cost?',
      paragraphs: [
        'Ecommerce website cost depends on the platform, catalogue size, how much the design is customised and which integrations you need. A configured Shopify store with a customised theme is a much smaller project than a headless storefront with ERP integration.',
        'We provide a fixed, itemised proposal after a free consultation, with platform subscription and app costs listed separately so you can see the full running cost.',
      ],
      factors: ['Platform: Shopify, WooCommerce or headless', 'Number of products and variants', 'Custom theme or design', 'Payment, shipping and ERP integrations', 'Product data and store migration', 'Ongoing SEO and maintenance'],
    },
    whyUs: [
      { title: 'Platform-neutral advice', desc: 'We recommend Shopify, WooCommerce or headless based on your business.' },
      { title: 'Ecommerce SEO included', desc: 'Product and collection SEO set up from launch.' },
      { title: 'Indian payments covered', desc: 'Razorpay, PayU, Cashfree, UPI and COD alongside global gateways.' },
      { title: 'Conversion-focused', desc: 'Fast pages and a short checkout to reduce abandoned carts.' },
    ],
    caseStudies: ['gamersground', 'awasdhara'],
    solutions: ['ecommerce-solutions', 'grocery-delivery-app-development', 'food-delivery-app-development'],
    faqs: [
      { q: 'Which is better for my store: Shopify or WooCommerce?', a: 'Shopify suits most brands that want a reliable, fast launch with minimal maintenance. WooCommerce suits content-heavy stores already on WordPress. We recommend one after understanding your catalogue, budget and growth plans.' },
      { q: 'Do you offer Shopify SEO services?', a: 'Yes. We optimise collection and product pages, fix technical issues like duplicate URLs and slow themes, add product structured data and plan content that targets what your customers search for.' },
      { q: 'How much does an ecommerce website cost in India?', a: 'It depends on platform, catalogue size, design and integrations. We send a fixed, itemised proposal after a free consultation, with platform and app subscriptions listed separately.' },
      { q: 'Can you integrate Indian payment gateways and cash on delivery?', a: 'Yes. We integrate Razorpay, PayU, Cashfree, UPI and COD, plus Stripe and PayPal for international customers, and shipping partners such as Shiprocket.' },
      { q: 'Can you migrate my store from another platform?', a: 'Yes. We migrate products, customers and orders, keep URLs or set up redirects, and preserve the SEO value of your existing pages.' },
      { q: 'Do you build ecommerce mobile apps too?', a: 'Yes. We build iOS and Android shopping apps connected to your store, with push notifications, saved carts and order tracking.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'seo',
    name: 'SEO Services',
    locationServiceKey: 'seo-services',
    seo: {
      title: 'SEO Services & SEO Company in India | Twofloww',
      description:
        'SEO company in India offering technical SEO, local SEO, ecommerce and Shopify SEO, content and link building — reported on leads and revenue, not just rankings.',
    },
    eyebrow: 'SEO agency',
    h1: 'SEO Services from an SEO Company in India',
    intro: [
      'Twofloww is an SEO agency in India that helps businesses get found by people already searching for what they sell. We combine technical SEO, content and local search, and report on enquiries and revenue — not just rankings.',
      'Because we are also developers, we fix technical problems directly in your site instead of handing you a list of recommendations.',
    ],
    offerings: {
      heading: 'Our SEO services',
      items: [
        { title: 'Technical SEO audits', desc: 'Crawlability, indexing, Core Web Vitals, duplicate content, redirects and structured data issues found and fixed.' },
        { title: 'On-page SEO', desc: 'Titles, headings, content, internal links and schema improved page by page for the keywords that matter.' },
        { title: 'Local SEO', desc: 'Google Business Profile, location pages, reviews and citations so you appear in the map pack for nearby searches.' },
        { title: 'Ecommerce & Shopify SEO', desc: 'Category, collection and product page SEO, faceted navigation and product schema for online stores.' },
        { title: 'Content strategy & writing', desc: 'Keyword research mapped to search intent, and articles and landing pages that answer what buyers ask.' },
        { title: 'Link building & digital PR', desc: 'Relevant mentions and links earned through outreach — no link farms or paid link schemes.' },
        { title: 'SEO for new websites', desc: 'Site architecture, URL structure and keyword mapping planned before launch so new sites start strong.' },
        { title: 'SEO reporting', desc: 'Monthly reports tying rankings and organic traffic to leads, calls and sales.' },
      ],
    },
    approach: {
      heading: 'Technical SEO first, then content that wins',
      paragraphs: [
        'Many sites are held back by technical problems long before content matters: pages blocked from crawling, slow load times, duplicate pages competing with each other, or missing structured data. We start every SEO engagement with a technical audit and fix those issues directly in your code or CMS — often the fastest gains you will see.',
        'Next we map keywords to search intent. Commercial searches like "service + city" need strong service and location pages; informational searches need helpful articles that build trust and link back to those pages. We plan both, so every page has a clear job.',
        'For local businesses we optimise your Google Business Profile and location pages; for online stores we focus on collection and product pages, including Shopify SEO.',
      ],
    },
    process: [
      { title: 'Audit', desc: 'Technical crawl, content review and competitor keyword gap.' },
      { title: 'Fix', desc: 'Technical blockers and quick wins resolved in the first month.' },
      { title: 'Plan', desc: 'Keyword-to-page map and a content calendar.' },
      { title: 'Grow', desc: 'New and improved pages, internal links and outreach.' },
      { title: 'Measure', desc: 'Monthly reporting on traffic, leads and revenue.' },
    ],
    tech: ['Google Analytics', 'Google Tag Manager', 'SEMrush', 'Ahrefs', 'Hotjar', 'Next.js'],
    cost: {
      heading: 'How much do SEO services cost?',
      paragraphs: [
        'SEO pricing depends on the size of your site, how competitive your keywords are, and how much content and link building you need. A local business targeting one city needs far less work than a national ecommerce store.',
        'We start with an audit and propose a monthly plan with clearly listed deliverables. Technical fixes can lift rankings within weeks; ranking new pages for competitive keywords usually takes 3–6 months of consistent work.',
      ],
      factors: ['Number of pages and site size', 'Keyword competitiveness', 'Technical issues to fix', 'Content production volume', 'Link building and outreach', 'Local vs national vs international targeting'],
    },
    whyUs: [
      { title: 'Developers who do SEO', desc: 'Technical issues fixed in your code, not left in a report.' },
      { title: 'White-hat only', desc: 'No link farms, PBNs or tactics that risk penalties.' },
      { title: 'Reporting on revenue', desc: 'We track leads and sales from organic search, not vanity metrics.' },
      { title: 'No ranking guarantees', desc: 'Nobody controls Google — we commit to the work and transparency.' },
    ],
    caseStudies: [],
    solutions: ['ecommerce-solutions', 'startup-acceleration'],
    faqs: [
      { q: 'What do your SEO services include?', a: 'Technical SEO audits and fixes, on-page optimisation, keyword research, content, local SEO, ecommerce and Shopify SEO, link building and monthly reporting on traffic and leads.' },
      { q: 'How long does SEO take to show results?', a: 'Technical fixes and on-page improvements can lift existing rankings within weeks. Ranking new pages for competitive keywords usually takes 3–6 months, depending on your site\'s authority and competition.' },
      { q: 'Do you guarantee first-page rankings?', a: 'No — and be careful with anyone who does, because no agency controls Google\'s algorithm. We commit to the work, transparent reporting and measurable improvements in traffic and enquiries.' },
      { q: 'Do you offer local SEO for businesses in specific cities?', a: 'Yes. We optimise Google Business Profiles, build location pages and manage citations for businesses targeting Noida, Delhi NCR, Mumbai, Bangalore and other cities in India and abroad.' },
      { q: 'Can you do SEO for a Shopify store?', a: 'Yes. Shopify SEO covers collection and product pages, duplicate URL issues, theme speed, product structured data and content targeting buyer searches.' },
      { q: 'Why choose an SEO company that also builds websites?', a: 'Because many ranking problems are technical. As developers we can fix speed, crawling and structured data issues directly rather than waiting on another team.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    locationServiceKey: 'seo-services',
    seo: {
      title: 'Digital Marketing Agency in India | Twofloww',
      description:
        'Digital marketing agency in India for SEO, Google Ads (PPC), social media marketing, email and conversion rate optimisation — focused on leads and ROI.',
    },
    eyebrow: 'Digital marketing services',
    h1: 'Digital Marketing Agency in India',
    intro: [
      'Twofloww is a digital marketing agency in India helping businesses grow online through SEO, paid ads, social media and email — with every campaign tied to leads and revenue you can measure.',
      'We also build and fix websites, so the traffic we bring lands on pages that are fast and designed to convert.',
    ],
    offerings: {
      heading: 'Digital marketing services',
      items: [
        { title: 'Search engine optimisation (SEO)', desc: 'Technical, on-page and local SEO that grows organic traffic from people searching for what you sell.' },
        { title: 'Google Ads & PPC management', desc: 'Search, shopping and remarketing campaigns built around profitable keywords and tracked to conversions.' },
        { title: 'Social media marketing', desc: 'Content, community management and paid campaigns on Instagram, Facebook and LinkedIn.' },
        { title: 'Performance marketing', desc: 'Meta and Google campaigns optimised for leads and sales, with clear cost-per-acquisition reporting.' },
        { title: 'Email marketing', desc: 'Newsletters, automated sequences and segmentation that turn subscribers into repeat customers.' },
        { title: 'Conversion rate optimisation', desc: 'Landing page, form and checkout improvements tested with real user data to get more from existing traffic.' },
        { title: 'Content marketing', desc: 'Articles, guides and landing pages that answer buyer questions and support SEO.' },
        { title: 'Analytics & tracking setup', desc: 'Google Analytics, Tag Manager and conversion tracking so you know which channels pay off.' },
      ],
    },
    approach: {
      heading: 'Marketing tied to revenue, not vanity metrics',
      paragraphs: [
        'We start by setting up tracking properly, so every campaign can be judged on leads, sales and cost per acquisition rather than impressions and likes. Then we put budget where the data says it works.',
        'SEO builds long-term traffic you do not pay per click for; Google Ads and performance marketing bring demand now; social media and email keep you in front of people who are not ready to buy yet. We plan the mix around your goals and budget rather than selling every channel.',
        'Because our team also builds websites, we fix the landing pages and checkout flows that waste ad spend — conversion rate optimisation is part of the work, not an extra.',
      ],
    },
    process: [
      { title: 'Audit', desc: 'Current channels, tracking and competitor activity reviewed.' },
      { title: 'Strategy', desc: 'Channel mix, budget and targets agreed in writing.' },
      { title: 'Launch', desc: 'Campaigns, content and tracking set live.' },
      { title: 'Optimise', desc: 'Weekly adjustments based on conversion data.' },
      { title: 'Report', desc: 'Monthly reporting on leads, sales and ROI.' },
    ],
    tech: ['Google Analytics', 'Google Ads', 'Google Tag Manager', 'Meta Business Suite', 'SEMrush', 'Mailchimp', 'HubSpot', 'Hotjar'],
    cost: {
      heading: 'How much do digital marketing services cost?',
      paragraphs: [
        'Digital marketing cost has two parts: our management fee and your media budget (what you pay Google or Meta for ads). The fee depends on how many channels we run and how much content and creative is needed.',
        'We recommend a focused start on one or two channels with proper tracking, then scaling what proves profitable. You get a written plan with deliverables and budget before anything starts.',
      ],
      factors: ['Channels: SEO, Google Ads, social, email', 'Monthly ad spend', 'Content and creative production', 'Number of markets or locations', 'Landing page and CRO work', 'Reporting depth'],
    },
    whyUs: [
      { title: 'Tracking first', desc: 'Every campaign is measured on leads and sales from day one.' },
      { title: 'Marketing + development', desc: 'We fix the landing pages and site issues that waste budget.' },
      { title: 'Transparent spend', desc: 'Ad accounts are yours; you see exactly where money goes.' },
      { title: 'No long lock-ins', desc: 'Plans are reviewed monthly against results.' },
    ],
    caseStudies: [],
    solutions: ['startup-acceleration', 'ecommerce-solutions'],
    faqs: [
      { q: 'What services does your digital marketing agency offer?', a: 'SEO, Google Ads and PPC management, social media marketing, performance marketing on Meta and Google, email marketing, content marketing, conversion rate optimisation and analytics setup.' },
      { q: 'How much should I spend on digital marketing?', a: 'It depends on your goals, market and margins. We usually recommend starting with one or two channels and proper tracking, then increasing budget on whatever delivers profitable leads or sales.' },
      { q: 'Who owns the ad accounts and data?', a: 'You do. Google Ads, Meta and analytics accounts are set up in your name, and we work in them with access you control.' },
      { q: 'How soon will I see results?', a: 'Paid campaigns can generate leads within days of launch. SEO builds more slowly, usually showing meaningful gains over 3–6 months.' },
      { q: 'Do you work with businesses outside India?', a: 'Yes. We run campaigns for clients in India, the USA, UK, UAE, Canada and Australia.' },
      { q: 'What is conversion rate optimisation?', a: 'Improving your landing pages, forms and checkout so more of your existing visitors become leads or customers — often the cheapest way to grow results from the traffic you already have.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    locationServiceKey: 'ui-ux-design',
    seo: {
      title: 'UI/UX Design Services & Agency in India | Twofloww',
      description:
        'UI UX design services in India: user research, wireframes, prototypes, product UI and design systems for websites, web apps and mobile apps.',
    },
    eyebrow: 'UI UX design company',
    h1: 'UI/UX Design Services in India',
    intro: [
      'Twofloww provides UI/UX design services for websites, SaaS products and mobile apps — research-led design that makes complex products easy to use and helps more visitors convert.',
      'We design and develop in the same team, so what you approve in Figma is what ships.',
    ],
    offerings: {
      heading: 'UI UX design and development services',
      items: [
        { title: 'UX research', desc: 'User interviews, analytics review and journey mapping to find where users get stuck.' },
        { title: 'Information architecture', desc: 'Navigation, content structure and flows that match how your users think.' },
        { title: 'Wireframing & prototyping', desc: 'Clickable Figma prototypes to test ideas before any development cost.' },
        { title: 'Web & SaaS UI design', desc: 'Dashboards, onboarding and data-heavy screens designed to be clear and fast to use.' },
        { title: 'Mobile app UI design', desc: 'iOS and Android interfaces that follow platform conventions while staying on-brand.' },
        { title: 'Website design', desc: 'Conversion-focused marketing site designs with clear messaging and calls to action.' },
        { title: 'Design systems', desc: 'Reusable components, tokens and documentation in Figma and Storybook.' },
        { title: 'Usability testing', desc: 'Testing with real users and a prioritised list of fixes.' },
      ],
    },
    approach: {
      heading: 'Design decisions backed by evidence',
      paragraphs: [
        'Good UI/UX design is about how a product works, not only how it looks. We start with research — interviews, analytics and a review of the current product — so we can explain why a flow should change, not just show a prettier version of it.',
        'UX design defines the structure: flows, navigation and the decisions users make. UI design defines the look and feel: layout, typography, colour and components. We do both, starting with UX so the interface sits on a sound foundation.',
        'Designs are delivered with a documented design system, so your engineers build consistent screens faster and new features match the original design.',
      ],
    },
    process: [
      { title: 'Research', desc: 'Interviews, analytics and a UX audit of the current product.' },
      { title: 'Define', desc: 'Key users, jobs-to-be-done and priority flows.' },
      { title: 'Prototype', desc: 'Interactive prototypes tested with users.' },
      { title: 'Design', desc: 'High-fidelity UI across devices.' },
      { title: 'Handoff', desc: 'Design system and developer-ready specs — or we build it.' },
    ],
    tech: ['Figma', 'Framer', 'Maze', 'Storybook', 'Adobe XD', 'Sketch', 'Hotjar', 'Zeplin'],
    cost: {
      heading: 'What affects the cost of UI/UX design?',
      paragraphs: [
        'UI/UX design cost depends on the number of screens and user flows, how much research and testing is involved, and whether you need a full design system. A marketing website redesign is a smaller project than designing a multi-role SaaS product.',
        'We scope design work in phases — research, prototype, final UI — with a fixed price per phase, so you can stop or adjust after each one.',
      ],
      factors: ['Number of screens and user flows', 'Research and usability testing', 'Platforms: web, iOS, Android', 'Design system and documentation', 'Revision rounds', 'Development handoff or build'],
    },
    whyUs: [
      { title: 'Designers and developers together', desc: 'Designs are buildable, and we can build them.' },
      { title: 'Research-led', desc: 'Decisions based on user evidence, not opinion.' },
      { title: 'Design systems included', desc: 'Consistent UI that scales with your product.' },
      { title: 'Conversion-focused', desc: 'Designed around the actions you want users to take.' },
    ],
    caseStudies: ['shockme', 'icbrwellness', 'tomatoai'],
    solutions: ['startup-acceleration', 'healthcare-tech', 'fintech-innovation'],
    faqs: [
      { q: 'What is the difference between UI and UX design?', a: 'UX design is how a product works — the flows, structure and decisions users make. UI design is how it looks and feels — layout, typography, colour and components. We handle both, starting with UX.' },
      { q: 'What do your UI UX design services include?', a: 'User research, information architecture, wireframes, interactive prototypes, high-fidelity UI for web and mobile, design systems and usability testing.' },
      { q: 'Do you also develop the designs you create?', a: 'Yes. Our designers and developers work in the same team, so we can build your website or app from the approved designs — or hand over developer-ready files to your team.' },
      { q: 'Which tools do you use for UI/UX design?', a: 'Mainly Figma for design and prototyping, with Maze and Hotjar for testing and Storybook for documenting design systems.' },
      { q: 'Can you redesign an existing product?', a: 'Yes. We start with a UX audit of the current product and analytics, then redesign the flows that cause the most friction first.' },
      { q: 'Do you design mobile apps?', a: 'Yes. We design iOS and Android apps that follow platform conventions while staying consistent with your brand.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    locationServiceKey: 'web-development',
    seo: {
      title: 'Custom Software Development Company in India | Twofloww',
      description:
        'Custom software development company in India building SaaS products, MVPs, internal tools, APIs and cloud platforms for startups and businesses worldwide.',
    },
    eyebrow: 'Software development company',
    h1: 'Custom Software Development Company in India',
    intro: [
      'Twofloww is a software development company in India that builds custom software around how your business actually works — SaaS products, MVPs, internal tools, portals and integrations.',
      'We take products from idea to launch and keep improving them, working as your technical team rather than a vendor that disappears after handover.',
    ],
    offerings: {
      heading: 'Custom software development services',
      items: [
        { title: 'SaaS product development', desc: 'Multi-tenant SaaS platforms with subscriptions, roles, billing and admin tools.' },
        { title: 'MVP development', desc: 'A focused first version to validate your idea with real users and investors, fast.' },
        { title: 'Internal tools & dashboards', desc: 'Replace spreadsheets and manual work with tools built around your workflow.' },
        { title: 'Customer & partner portals', desc: 'Secure portals for bookings, orders, documents and account management.' },
        { title: 'API development & integrations', desc: 'REST and GraphQL APIs, and integrations with CRMs, ERPs, payment and messaging services.' },
        { title: 'AI-powered features', desc: 'AI assistants, document processing and automation built on modern LLM APIs where they add real value.' },
        { title: 'Cloud architecture & DevOps', desc: 'Scalable hosting on AWS or Vercel with CI/CD, monitoring and backups.' },
        { title: 'Legacy modernisation', desc: 'Gradually rebuilding outdated systems on a modern stack without disrupting the business.' },
      ],
    },
    approach: {
      heading: 'Software built around your business',
      paragraphs: [
        'Off-the-shelf software forces your team to work around it. Custom software development makes sense when your process is a competitive advantage, when you are building a product to sell, or when you are stitching together too many tools and spreadsheets.',
        'We start small: a clear scope for the first version, delivered in two-week milestones you can test. That keeps risk low and lets real usage shape what comes next. Most products are built on TypeScript, React, Next.js and Node.js with PostgreSQL — a proven, widely supported stack your future hires will know.',
        'For startups we act as a technical partner, from MVP through funding rounds; for established businesses we modernise systems step by step so day-to-day work never stops.',
      ],
    },
    process: [
      { title: 'Discovery', desc: 'Workflows, users and requirements turned into a written scope.' },
      { title: 'Architecture', desc: 'Data model, integrations and hosting planned up front.' },
      { title: 'Build', desc: 'Two-week milestones with working software to review.' },
      { title: 'Launch', desc: 'Testing, data migration and a monitored rollout.' },
      { title: 'Evolve', desc: 'Ongoing support and new features as you grow.' },
    ],
    tech: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'GraphQL', 'Docker', 'AWS', 'OpenAI API'],
    cost: {
      heading: 'How much does custom software development cost?',
      paragraphs: [
        'Custom software cost depends on the number of features and user roles, integrations with other systems, and data or security requirements. An MVP with a focused feature set is a fraction of the cost of a full platform.',
        'We break work into milestones with a fixed price each, so you can launch a first version, measure results and decide on the next phase with real data.',
      ],
      factors: ['Features and user roles', 'Integrations with existing systems', 'Data migration', 'Security and compliance needs', 'Cloud hosting and scale', 'Ongoing support and development'],
    },
    whyUs: [
      { title: 'Start small, de-risk early', desc: 'MVP-first scoping and milestone-based delivery.' },
      { title: 'Modern, mainstream stack', desc: 'Technology your future team can maintain and hire for.' },
      { title: 'Product thinking', desc: 'We challenge requirements that do not serve your users.' },
      { title: 'Full ownership', desc: 'Source code, infrastructure and documentation are yours.' },
    ],
    caseStudies: ['tomatoai', 'snippetsx', 'getbeds'],
    solutions: ['ai-machine-learning', 'startup-acceleration', 'enterprise-digital-transformation', 'fintech-innovation'],
    faqs: [
      { q: 'What is custom software development?', a: 'Designing and building software for your specific business or product — such as a SaaS platform, internal tool or customer portal — instead of adapting an off-the-shelf product.' },
      { q: 'How much does custom software development cost in India?', a: 'It depends on features, integrations and scale. We scope a focused first version and price each milestone separately, so you only commit to what you need now.' },
      { q: 'Do you build MVPs for startups?', a: 'Yes. We help founders define a focused MVP, build it in weeks rather than months, and keep developing it as the product finds traction.' },
      { q: 'Which technologies do you use?', a: 'Mostly TypeScript, React, Next.js and Node.js with PostgreSQL or Supabase, hosted on AWS or Vercel — plus LLM APIs for AI features where useful.' },
      { q: 'Can you work with our existing systems?', a: 'Yes. We integrate with CRMs, ERPs, payment providers and internal databases, and can modernise legacy systems gradually.' },
      { q: 'Will we own the source code?', a: 'Yes. You receive full ownership of the source code, infrastructure accounts and documentation.' },
    ],
  },
];

export const getServicePage = (slug) => servicePages.find((p) => p.slug === slug) || null;

// Old /service-detail?id=… ids → new page slugs (used for 308 redirects)
export const legacyServiceIds = {
  'web-development': 'web-development',
  'mobile-development': 'mobile-app-development',
  'ecommerce-solutions': 'ecommerce-development',
  'seo-marketing': 'seo',
  'digital-marketing': 'digital-marketing',
  'social-media': 'digital-marketing',
  'ui-ux-design': 'ui-ux-design',
  'cloud-solutions': 'custom-software-development',
};
