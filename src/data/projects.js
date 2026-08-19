export const projects = [
  {
    id: 1,
    slug: "tomatoai",
    title: "TomatoAI",
    subtitle: "AI TOOLS PLATFORM",
    status: "LIVE PROJECT",
    liveLink: "https://tomatoai.in/",
    video: "/tomato-tool.mp4",
    description: "A powerful AI-powered platform offering a suite of intelligent tools for content creation, automation, and productivity — built for modern teams and creators.",
    category: "Web Application",
    developmentTime: "5 Months Development",
    metrics: [
      { value: "10K+", label: "Active Users", color: "red" },
      { value: "92%", label: "Satisfaction", color: "orange" },
      { value: "3x", label: "Productivity Boost", color: "green" }
    ],
    features: [
      {
        title: "AI Content Generator",
        description: "Generate high-quality blogs, captions, and copy with a single prompt.",
        color: "red"
      },
      {
        title: "Smart Automation",
        description: "Automate repetitive tasks using intelligent ML-powered workflows.",
        color: "orange"
      },
      {
        title: "Multi-Tool Suite",
        description: "All-in-one hub for image generation, summarization, translation and more.",
        color: "green"
      },
      {
        title: "Team Workspace",
        description: "Collaborate, share outputs, and manage projects as a team.",
        color: "blue"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'OpenAI API', category: 'AI/ML', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Teams were juggling 5–10 different AI tools across multiple subscriptions.",
          "No single platform offered content, automation, and collaboration in one place.",
          "The goal: build a unified AI hub that's fast, intuitive, and affordable."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Built TomatoAI as an all-in-one AI platform with a clean, distraction-free UI.",
          "Integrated OpenAI, Stable Diffusion, and custom ML models into a single workspace."
        ],
        features: [
          { title: 'Unified AI Hub', description: 'All tools under one roof' },
          { title: 'Prompt Templates', description: 'Ready-to-use prompts for every use case' },
          { title: 'Export & Share', description: 'One-click export to PDF, Notion, Docs' },
          { title: 'Usage Analytics', description: 'Track credits, usage, and team activity' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "10K+", label: "Active Users" },
          { value: "92%", label: "User Satisfaction" },
          { value: "3x", label: "Productivity Increase" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 200ms",
      uptime: "99.9%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "AI Dashboard",
        url: "/ai-tool-ss.png"
      },
      {
        title: "Content Generator",
        url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&fit=crop&q=80"
      }
    ],
    callToAction: {
      title: "Supercharge Your Workflow with AI",
      subtitle: "Experience TomatoAI — the all-in-one AI platform for modern teams. Free to start.",
      buttons: [
        { label: "TRY FOR FREE", icon: "ArrowRight" },
        { label: "VISIT TOMATOAI.IN", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 2,
    slug: "awasdhara",
    title: "Awasdhara",
    subtitle: "REAL ESTATE PLATFORM",
    status: "LIVE PROJECT",
    liveLink: "https://awasdhara.in/",
    video: "/estate.mp4",
    description: "A modern real estate platform connecting buyers, sellers, and agents across India — with advanced property search, virtual tours, and AI-assisted recommendations.",
    category: "Web Application",
    developmentTime: "6 Months Development",
    metrics: [
      { value: "5K+", label: "Properties Listed", color: "blue" },
      { value: "94%", label: "Satisfaction", color: "green" },
      { value: "70%", label: "Lead Conversion", color: "purple" }
    ],
    features: [
      {
        title: "Smart Property Search",
        description: "Filter by location, budget, BHK, amenities, and nearby landmarks.",
        color: "blue"
      },
      {
        title: "Virtual Tours",
        description: "360° immersive walkthroughs of properties from anywhere.",
        color: "green"
      },
      {
        title: "AI Recommendations",
        description: "Personalised property suggestions based on user preferences.",
        color: "purple"
      },
      {
        title: "Agent & Builder Portal",
        description: "Dedicated dashboard for agents to list, manage, and track leads.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'AWS S3', category: 'Storage', icon: '/tech/4923041_aws_icon.svg' },
      { name: 'GraphQL', category: 'API', icon: '/tech/4691403_graphql_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Property seekers in India had no reliable, modern platform to discover real estate.",
          "Agents lacked digital tools to manage listings, leads, and client communication.",
          "The challenge: build a scalable real estate platform tailored for the Indian market."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed Awasdhara — a full-stack real estate platform with AI-driven search and agent portals.",
          "Integrated virtual tours, mortgage calculators, and a verified listings ecosystem."
        ],
        features: [
          { title: 'Verified Listings', description: 'RERA-compliant, verified properties only' },
          { title: 'Smart Filters', description: 'Location, budget, BHK, and 20+ filters' },
          { title: 'Agent CRM', description: 'Full lead and pipeline management' },
          { title: 'EMI Calculator', description: 'Built-in home loan calculator' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "5K+", label: "Properties Listed" },
          { value: "94%", label: "User Satisfaction" },
          { value: "70%", label: "Lead Conversion Rate" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 150ms",
      uptime: "99.95%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Property Listings",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop&q=80"
      },
      {
        title: "Property Details Page",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop&q=80"
      }
    ],
    callToAction: {
      title: "Find Your Dream Home",
      subtitle: "Discover thousands of verified properties across India. Start your search on Awasdhara.",
      buttons: [
        { label: "EXPLORE PROPERTIES", icon: "ArrowRight" },
        { label: "VISIT AWASDHARA.IN", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 3,
    slug: "snippetsx",
    title: "SnippetsX",
    subtitle: "CODE SHARING WORKSPACE",
    status: "LIVE PROJECT",
    liveLink: "https://snippetsx.com/",
    video: "/tomato-tool.mp4",
    description: "A real-time collaborative code sharing and workspace platform — write, run, share, and collaborate on code snippets live with your team or the world.",
    category: "Developer Tool",
    developmentTime: "4 Months Development",
    metrics: [
      { value: "8K+", label: "Developers", color: "blue" },
      { value: "50K+", label: "Snippets Shared", color: "purple" },
      { value: "< 50ms", label: "Sync Latency", color: "green" }
    ],
    features: [
      {
        title: "Real-Time Collaboration",
        description: "Multiple users edit the same code simultaneously — like Google Docs for code.",
        color: "blue"
      },
      {
        title: "In-Browser Code Runner",
        description: "Execute code in 20+ languages directly in the browser without any setup.",
        color: "purple"
      },
      {
        title: "Snippet Workspaces",
        description: "Organise snippets into private or public workspaces with team access control.",
        color: "green"
      },
      {
        title: "Instant Share Links",
        description: "Share any snippet with a single link — no account required for viewers.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'PostgreSQL', category: 'Database', icon: '/tech/4691328_postgresql_icon.svg' },
      { name: 'WebSockets', category: 'Real-time', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Redis', category: 'Cache / Pub-Sub', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Developers needed a fast, friction-free way to share and discuss code in real time.",
          "Existing tools like Pastebin and Gist lacked live collaboration and code execution.",
          "The challenge: build a real-time code workspace that feels as smooth as a local IDE."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Built SnippetsX with a WebSocket-powered collaborative editor using operational transforms.",
          "Integrated a sandboxed in-browser code runner supporting 20+ languages via isolated containers."
        ],
        features: [
          { title: 'Live Cursor Sync', description: 'See teammates type in real time' },
          { title: 'Sandboxed Runner', description: 'Safe code execution in isolated environments' },
          { title: 'Version History', description: 'Full diff history for every snippet' },
          { title: 'Embed Anywhere', description: 'Embed live snippets in blogs and docs' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "8K+", label: "Active Developers" },
          { value: "50K+", label: "Snippets Created" },
          { value: "< 50ms", label: "Real-time Sync Latency" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 50ms",
      uptime: "99.99%",
      dataProcessing: "Real-time WebSocket",
      security: "Sandboxed Execution"
    },
    screenshots: [
      {
        title: "Code Editor View",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop&q=80"
      },
      {
        title: "Workspace Dashboard",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&fit=crop&q=80"
      }
    ],
    callToAction: {
      title: "Code Together, Ship Faster",
      subtitle: "Write, run, and share code in real time with your team. No setup required.",
      buttons: [
        { label: "START FOR FREE", icon: "ArrowRight" },
        { label: "VISIT SNIPPETSX.COM", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 4,
    slug: "foodfloww",
    title: "FoodFloww",
    subtitle: "FOOD DELIVERY PLATFORM",
    status: "LIVE PROJECT",
    liveLink: "https://twofloww.in/",
    video: "/ecomerce.mp4",
    description: "An end-to-end on-demand food delivery and restaurant management platform with real-time GPS rider tracking, automated dispatch, and POS integration.",
    category: "Mobile & Web App",
    developmentTime: "4.5 Months Development",
    metrics: [
      { value: "25K+", label: "Orders / Month", color: "orange" },
      { value: "96%", label: "On-Time Delivery", color: "green" },
      { value: "150+", label: "Restaurant Partners", color: "red" }
    ],
    features: [
      {
        title: "Live Order Tracking",
        description: "Real-time interactive map showing rider movement from kitchen to doorstep.",
        color: "orange"
      },
      {
        title: "Smart Dispatch Engine",
        description: "AI driver assignment based on distance, traffic, and order prep time.",
        color: "green"
      },
      {
        title: "Restaurant POS Portal",
        description: "Instant order acceptance, menu management, and inventory analytics.",
        color: "red"
      },
      {
        title: "In-App Payments",
        description: "Seamless checkout via UPI, Cards, Wallets, and COD.",
        color: "blue"
      }
    ],
    technologies: [
      { name: 'React Native', category: 'Mobile App', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'Next.js', category: 'Web Dashboard', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'Node.js', category: 'Backend Engine', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'Redis', category: 'Caching & PubSub', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Restaurants needed an independent delivery network without heavy third-party aggregator commissions.",
          "Customers required pin-point real-time tracking and fast 30-minute delivery guarantees."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Engineered FoodFloww — a complete ecosystem featuring Customer App, Driver App, and Partner Portal.",
          "Integrated WebSocket-backed GPS tracking and automated order dispatching."
        ],
        features: [
          { title: 'Customer App', description: 'Intuitive food ordering UI' },
          { title: 'Driver App', description: 'Turn-by-turn navigation & earnings portal' },
          { title: 'Merchant CRM', description: 'Live order queue and menu toggles' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "25K+", label: "Monthly Deliveries" },
          { value: "96%", label: "On-Time Dispatch Rate" },
          { value: "150+", label: "Merchant Onboarded" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 100ms",
      uptime: "99.99%",
      dataProcessing: "Real-time Location Stream",
      security: "Encrypted Payments"
    },
    screenshots: [
      {
        title: "Mobile App Checkout",
        url: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&fit=crop&q=80"
      }
    ],
    callToAction: {
      title: "Launch Your On-Demand Delivery Platform",
      subtitle: "Build a custom, high-velocity food delivery platform tailored for your brand.",
      buttons: [
        { label: "EXPLORE FOODFLOWW", icon: "ArrowRight" }
      ]
    }
  },
  {
    id: 5,
    slug: "astroconnect",
    title: "AstroConnect",
    subtitle: "ASTROLOGY & KUNDLI PLATFORM",
    status: "LIVE PROJECT",
    liveLink: "https://twofloww.in/",
    video: "/movie.mp4",
    description: "A live astrologer consultation platform featuring real-time audio/video calls, instant Kundli generation, daily horoscopes, and AI chart analysis.",
    category: "Web & Mobile App",
    developmentTime: "5 Months Development",
    metrics: [
      { value: "50K+", label: "Consultations", color: "purple" },
      { value: "4.9★", label: "User Rating", color: "orange" },
      { value: "500+", label: "Verified Astrologers", color: "green" }
    ],
    features: [
      {
        title: "Live Video/Audio Calls",
        description: "Low-latency WebRTC audio and video consultation rooms.",
        color: "purple"
      },
      {
        title: "Instant Kundli Generator",
        description: "Accurate Vedic birth chart generation with planetary position calculations.",
        color: "orange"
      },
      {
        title: "Astrologer Wallet & Queue",
        description: "Per-minute billing engine with automated wallet deductions.",
        color: "green"
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'Node.js', category: 'Backend API', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'WebRTC', category: 'Live Video', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'PostgreSQL', category: 'Database', icon: '/tech/4691328_postgresql_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Users wanted verified, private, instant access to top Vedic astrologers without appointment delays.",
          "Required sub-second Kundli calculations and seamless per-minute call billing."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed AstroConnect with WebRTC audio/video call streaming, live chat, and automated wallet debiting."
        ],
        features: [
          { title: 'Per-Minute Billing', description: 'Automated wallet ledger' },
          { title: 'Vedic Engine', description: 'Precise planetary Ephemeris calculations' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "50K+", label: "Consultations Completed" },
          { value: "4.9★", label: "Average App Rating" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 120ms",
      uptime: "99.9%",
      dataProcessing: "Real-time WebRTC",
      security: "End-to-End Encrypted Calls"
    },
    screenshots: [
      {
        title: "Astrologer Consultation Screen",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&fit=crop&q=80"
      }
    ],
    callToAction: {
      title: "Build Your Tele-Consultation Platform",
      subtitle: "Custom WebRTC consultation apps for astrology, health, and advisory services.",
      buttons: [
        { label: "GET STARTED TODAY", icon: "ArrowRight" }
      ]
    }
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === parseInt(id));
};

export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug) || null;
};

export const getAllProjects = () => {
  return projects;
};