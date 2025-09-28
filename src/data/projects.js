export const projects = [
  {
    id: 1,
    title: "TomatoTool AI",
    subtitle: "WEB APP",
    status: "LIVE PROJECT",
    liveLink: "https://ai-tools-web-app-topaz.vercel.app/",
    video: "/tomato-tool.mp4",
    description: "An AI-powered web application designed to enhance productivity through intelligent task automation and data analysis.",
    category: "Web Application",
    developmentTime: "5 Months Development",
    metrics: [
      { value: "8K+", label: "Active Users", color: "blue" },
      { value: "90%", label: "Satisfaction", color: "purple" },
      { value: "75%", label: "Efficiency Gain", color: "green" }
    ],
    features: [
      {
        title: "AI Automation",
        description: "Automates repetitive tasks with machine learning algorithms.",
        color: "blue"
      },
      {
        title: "Data Insights",
        description: "Provides actionable insights through advanced analytics.",
        color: "purple"
      },
      {
        title: "Custom Workflows",
        description: "Tailored workflows to suit diverse user needs.",
        color: "green"
      },
      {
        title: "Cloud Integration",
        description: "Seamless integration with cloud-based services.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'Python', category: 'AI/ML', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'TensorFlow', category: 'ML Framework', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Users needed an intuitive tool to automate repetitive tasks without technical expertise.",
          "Existing solutions lacked seamless integration with cloud services.",
          "The challenge was to create a scalable AI tool with a user-friendly interface."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed an AI-powered web app with a focus on automation and analytics.",
          "Integrated cloud services for enhanced accessibility and scalability."
        ],
        features: [
          { title: 'Task Automation', description: 'Automates repetitive workflows' },
          { title: 'Cloud Sync', description: 'Real-time data synchronization' },
          { title: 'User-friendly UI', description: 'Simplified interface for all users' },
          { title: 'Scalable Backend', description: 'Handles growing user demands' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "8K+", label: "Active Users" },
          { value: "90%", label: "User Satisfaction" },
          { value: "75%", label: "Efficiency Gain" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 180ms",
      uptime: "99.9%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Dashboard Interface",
        url: "/ai-tool-ss.png  "
      },
      {
        title: "Analytics View",
        url: "/screenshot2.png"
      }
    ],
    callToAction: {
      title: "Boost Your Productivity",
      subtitle: "Experience the power of AI-driven automation. Start your free trial today.",
      buttons: [
        { label: "TRY FOR FREE", icon: "ArrowRight" },
        { label: "VIEW DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 2,
    title: "Restaurant Web App",
    subtitle: "PLATFORM",
    status: "LIVE PROJECT",
    video: "/restro1.mp4",
    description: "A comprehensive restaurant management platform for seamless order processing, reservations, and customer engagement.",
    category: "Web Application",
    developmentTime: "7 Months Development",
    metrics: [
      { value: "15K+", label: "Active Users", color: "green" },
      { value: "93%", label: "Satisfaction", color: "blue" },
      { value: "65%", label: "Order Efficiency", color: "purple" }
    ],
    features: [
      {
        title: "Online Ordering",
        description: "Streamlined online ordering system for customers.",
        color: "green"
      },
      {
        title: "Reservation System",
        description: "Easy-to-use table booking and management.",
        color: "blue"
      },
      {
        title: "Customer Analytics",
        description: "Insights into customer preferences and behavior.",
        color: "purple"
      },
      {
        title: "Payment Integration",
        description: "Secure and diverse payment options.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'Stripe', category: 'Payment', icon: '/tech/4923041_aws_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Restaurants struggled with inefficient order and reservation management.",
          "Existing platforms lacked robust analytics for customer engagement.",
          "The challenge was to create a scalable, user-friendly platform for restaurants."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed a restaurant web app with integrated ordering and reservation systems.",
          "Included analytics to help restaurants understand customer preferences."
        ],
        features: [
          { title: 'Order Management', description: 'Streamlined order processing' },
          { title: 'Reservation System', description: 'Efficient table management' },
          { title: 'Customer Insights', description: 'Detailed analytics dashboard' },
          { title: 'Secure Payments', description: 'Multiple payment gateways' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "15K+", label: "Active Users" },
          { value: "93%", label: "User Satisfaction" },
          { value: "65%", label: "Order Efficiency" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 160ms",
      uptime: "99.95%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Order Interface",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Reservation Dashboard",
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Elevate Your Restaurant Business",
      subtitle: "Streamline operations and engage customers with our platform. Start today.",
      buttons: [
        { label: "START FREE TRIAL", icon: "ArrowRight" },
        { label: "VIEW DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 3,
    title: "Hotel Finder",
    subtitle: "WEB APP",
    status: "LIVE PROJECT",
    liveLink: "https://cafe-finder-psi.vercel.app/",
    video: "/cafe-finder.mp4",
    description: "A comprehensive hotel booking platform with advanced search filters, real-time availability, and competitive pricing for travelers worldwide.",
    category: "Web Application",
    developmentTime: "4 Months Development",
    metrics: [
      { value: "50K+", label: "Active Users", color: "blue" },
      { value: "92%", label: "Satisfaction", color: "green" },
      { value: "80%", label: "Booking Success", color: "purple" }
    ],
    features: [
      {
        title: "Advanced Search",
        description: "Powerful filters for location, price, amenities, and ratings.",
        color: "blue"
      },
      {
        title: "Real-time Availability",
        description: "Live updates on room availability and pricing.",
        color: "green"
      },
      {
        title: "Price Comparison",
        description: "Compare prices across multiple booking platforms.",
        color: "purple"
      },
      {
        title: "Secure Booking",
        description: "Safe and encrypted payment processing.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Stripe', category: 'Payment', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Travelers struggled with finding the best hotel deals across multiple platforms.",
          "Existing solutions lacked real-time availability and comprehensive filtering options.",
          "The challenge was to create a unified platform that simplifies hotel discovery and booking."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed a hotel booking platform with advanced search and real-time data.",
          "Integrated multiple booking APIs to provide comprehensive options and competitive pricing."
        ],
        features: [
          { title: 'Smart Search', description: 'AI-powered hotel recommendations' },
          { title: 'Live Pricing', description: 'Real-time price updates' },
          { title: 'Multi-platform', description: 'Aggregated listings from major platforms' },
          { title: 'User Reviews', description: 'Verified guest reviews and ratings' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "50K+", label: "Active Users" },
          { value: "92%", label: "User Satisfaction" },
          { value: "80%", label: "Booking Success" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 120ms",
      uptime: "99.95%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Search Interface",
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Hotel Details",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Find Your Perfect Stay",
      subtitle: "Discover the best hotels at unbeatable prices. Start your search today.",
      buttons: [
        { label: "SEARCH HOTELS", icon: "ArrowRight" },
        { label: "VIEW DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 4,
    title: "Zelt",
    subtitle: "PEOPLE PLATFORM",
    status: "LIVE PROJECT",
    video: "/zelt.mp4",
    liveLink: "https://zelt.app/",
    description: "All-in-one people platform for startups in the UK that makes onboarding employees an easy process: setup, device management, employee leave, payroll management etc.",
    category: "HR Platform",
    developmentTime: "8 Months Development",
    metrics: [
      { value: "5K+", label: "Active Users", color: "blue" },
      { value: "96%", label: "Satisfaction", color: "green" },
      { value: "85%", label: "Onboarding Efficiency", color: "purple" }
    ],
    features: [
      {
        title: "Employee Onboarding",
        description: "Streamlined onboarding process for new employees.",
        color: "blue"
      },
      {
        title: "Device Management",
        description: "Comprehensive device setup and management tools.",
        color: "green"
      },
      {
        title: "Leave Management",
        description: "Easy tracking and approval of employee leave requests.",
        color: "purple"
      },
      {
        title: "Payroll Management",
        description: "Automated payroll processing and management.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'PostgreSQL', category: 'Database', icon: '/tech/4691328_postgresql_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "UK startups needed a comprehensive people management platform.",
          "Existing solutions were fragmented and lacked integration between HR, IT, and Finance.",
          "The challenge was to create an all-in-one platform that simplifies employee management."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed Zelt as an all-in-one people platform for UK startups.",
          "Integrated HR, IT, and Finance functions into a single, easy-to-use platform."
        ],
        features: [
          { title: 'Unified Platform', description: 'HR, IT & Finance in one place' },
          { title: 'Easy Onboarding', description: 'Streamlined employee setup process' },
          { title: 'Device Management', description: 'Complete IT asset management' },
          { title: 'Payroll Integration', description: 'Automated payroll processing' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "5K+", label: "Active Users" },
          { value: "96%", label: "User Satisfaction" },
          { value: "85%", label: "Onboarding Efficiency" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 100ms",
      uptime: "99.95%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Dashboard Overview",
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Employee Management",
        url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Run HR, IT & Finance in One Place",
      subtitle: "Experience the power of Zelt's all-in-one people platform. Transform your startup operations today.",
      buttons: [
        { label: "GET STARTED", icon: "ArrowRight" },
        { label: "VISIT ZELT.APP", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 5,
    title: "Real Estate Web App",
    subtitle: "PLATFORM",
    status: "LIVE PROJECT",
    video: "/estate.mp4",
    description: "A modern real estate platform for property listings, virtual tours, and client management.",
    category: "Web Application",
    developmentTime: "8 Months Development",
    metrics: [
      { value: "12K+", label: "Active Users", color: "blue" },
      { value: "91%", label: "Satisfaction", color: "purple" },
      { value: "60%", label: "Lead Conversion", color: "green" }
    ],
    features: [
      {
        title: "Property Listings",
        description: "Comprehensive property search with advanced filters.",
        color: "blue"
      },
      {
        title: "Virtual Tours",
        description: "Immersive 3D virtual tours for properties.",
        color: "purple"
      },
      {
        title: "Client Management",
        description: "Tools for managing client relationships and leads.",
        color: "green"
      },
      {
        title: "Market Analytics",
        description: "Insights into real estate market trends.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Real estate agents needed a platform to showcase properties effectively.",
          "Existing solutions lacked immersive virtual tours and robust analytics.",
          "The challenge was to create a platform that enhances property visibility and client engagement."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed a real estate platform with advanced listing and tour features.",
          "Integrated analytics to provide market insights and client management tools."
        ],
        features: [
          { title: 'Advanced Search', description: 'Filter properties by multiple criteria' },
          { title: 'Virtual Tours', description: 'Immersive 3D property tours' },
          { title: 'Client CRM', description: 'Manage leads and relationships' },
          { title: 'Market Insights', description: 'Real-time market analytics' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "12K+", label: "Active Users" },
          { value: "91%", label: "User Satisfaction" },
          { value: "60%", label: "Lead Conversion" }
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
        title: "Property Listing",
        url: "https://images.unsplash.com/photo-1512917774080-9991f7c4c39d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Virtual Tour View",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Revolutionize Real Estate",
      subtitle: "Showcase properties and manage clients with ease. Start your free trial today.",
      buttons: [
        { label: "START FREE TRIAL", icon: "ArrowRight" },
        { label: "VIEW DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 6,
    title: "Watchlo Movie Website",
    subtitle: "PLATFORM",
    status: "LIVE PROJECT",
    liveLink: "https://moonflix.vercel.app/",
    video: "/movie.mp4",
    description: "A movie streaming and review platform with personalized recommendations and community features.",
    category: "Web Application",
    developmentTime: "6 Months Development",
    metrics: [
      { value: "30K+", label: "Active Users", color: "purple" },
      { value: "95%", label: "Satisfaction", color: "green" },
      { value: "80%", label: "Engagement Rate", color: "blue" }
    ],
    features: [
      {
        title: "Personalized Recommendations",
        description: "AI-driven movie suggestions based on user preferences.",
        color: "purple"
      },
      {
        title: "Community Reviews",
        description: "User-generated reviews and ratings for movies.",
        color: "green"
      },
      {
        title: "Streaming Integration",
        description: "Seamless integration with popular streaming services.",
        color: "blue"
      },
      {
        title: "Watchlist Management",
        description: "Tools to create and manage personalized watchlists.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Movie enthusiasts needed a platform for personalized recommendations.",
          "Existing platforms lacked robust community features and streaming integration.",
          "The challenge was to create an engaging movie platform with AI-driven features."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed a movie platform with AI recommendations and community reviews.",
          "Integrated streaming services and watchlist management tools."
        ],
        features: [
          { title: 'AI Recommendations', description: 'Personalized movie suggestions' },
          { title: 'Community Features', description: 'User reviews and ratings' },
          { title: 'Streaming Support', description: 'Integration with streaming platforms' },
          { title: 'Watchlist Tools', description: 'Manage movie watchlists' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "30K+", label: "Active Users" },
          { value: "95%", label: "User Satisfaction" },
          { value: "80%", label: "Engagement Rate" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 130ms",
      uptime: "99.9%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Movie Dashboard",
        url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Review Section",
        url: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Discover Your Next Movie",
      subtitle: "Join a community of movie lovers with personalized recommendations. Start exploring today.",
      buttons: [
        { label: "GET STARTED FREE", icon: "ArrowRight" },
        { label: "WATCH DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 7,
    title: "Open Resume",
    subtitle: "WEB APP",
    status: "LIVE PROJECT",
    liveLink: "https://www.open-resume.com/",
    video: "/resume.mp4",
    description: "A professional resume builder web app with modern templates, real-time editing, and export functionality for job seekers.",
    category: "Web Application",
    developmentTime: "3 Months Development",
    metrics: [
      { value: "35K+", label: "Active Users", color: "blue" },
      { value: "89%", label: "Satisfaction", color: "green" },
      { value: "75%", label: "Interview Success", color: "purple" }
    ],
    features: [
      {
        title: "Modern Templates",
        description: "Professional, customizable resume templates for various industries.",
        color: "blue"
      },
      {
        title: "Real-time Editor",
        description: "Live preview with instant formatting and styling updates.",
        color: "green"
      },
      {
        title: "Export Options",
        description: "Export to PDF, Word, and other formats with one click.",
        color: "purple"
      },
      {
        title: "ATS Optimization",
        description: "Built-in ATS scoring and optimization suggestions.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'PDFKit', category: 'PDF Generation', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Job seekers struggled with creating professional, ATS-friendly resumes.",
          "Existing tools lacked modern templates and real-time editing capabilities.",
          "The challenge was to create an intuitive resume builder with professional results."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed a modern resume builder with real-time editing and professional templates.",
          "Integrated ATS optimization and multiple export formats for maximum compatibility."
        ],
        features: [
          { title: 'Template Library', description: 'Industry-specific professional templates' },
          { title: 'Live Preview', description: 'Real-time resume preview and editing' },
          { title: 'ATS Scoring', description: 'Automatic optimization for applicant tracking systems' },
          { title: 'Multi-format Export', description: 'PDF, Word, and other format exports' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "35K+", label: "Active Users" },
          { value: "89%", label: "User Satisfaction" },
          { value: "75%", label: "Interview Success Rate" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 80ms",
      uptime: "99.9%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Resume Editor",
        url: "https://images.unsplash.com/photo-1586281380349-632531dbdf73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Template Selection",
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Build Your Perfect Resume",
      subtitle: "Create professional resumes that get noticed. Start building today.",
      buttons: [
        { label: "CREATE RESUME", icon: "ArrowRight" },
        { label: "VIEW TEMPLATES", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 8,
    title: "Typing Practice",
    subtitle: "WEB APP",
    status: "LIVE PROJECT",
    liveLink: "https://typing-riser.vercel.app/",
    video: "/typing.mp4",
    description: "An engaging typing practice web app with interactive lessons, speed tests, and progress tracking for users of all skill levels.",
    category: "Web Application",
    developmentTime: "3 Months Development",
    metrics: [
      { value: "40K+", label: "Active Users", color: "green" },
      { value: "94%", label: "Satisfaction", color: "blue" },
      { value: "82%", label: "Speed Improvement", color: "purple" }
    ],
    features: [
      {
        title: "Interactive Lessons",
        description: "Engaging typing lessons with progressive difficulty levels.",
        color: "green"
      },
      {
        title: "Speed Tests",
        description: "Timed typing tests with detailed accuracy and speed analysis.",
        color: "blue"
      },
      {
        title: "Progress Tracking",
        description: "Visual charts and statistics to track improvement over time.",
        color: "purple"
      },
      {
        title: "Gamification",
        description: "Achievements, badges, and leaderboards to keep users motivated.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react_native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'PostgreSQL', category: 'Database', icon: '/tech/4691328_postgresql_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Chart.js', category: 'Analytics', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Users needed an effective way to improve typing skills with engaging content.",
          "Existing typing apps lacked modern UI and comprehensive progress tracking.",
          "The challenge was to create a typing practice app that's both effective and enjoyable."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "Developed an interactive typing platform with gamification and detailed analytics.",
          "Created adaptive learning paths and engaging content for all skill levels."
        ],
        features: [
          { title: 'Adaptive Learning', description: 'Personalized difficulty adjustment' },
          { title: 'Real-time Feedback', description: 'Instant speed and accuracy analysis' },
          { title: 'Progress Analytics', description: 'Detailed improvement tracking' },
          { title: 'Engagement System', description: 'Gamification and achievements' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "40K+", label: "Active Users" },
          { value: "94%", label: "User Satisfaction" },
          { value: "82%", label: "Average Speed Improvement" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 90ms",
      uptime: "99.95%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Typing Interface",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Progress Dashboard",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Master Your Typing Skills",
      subtitle: "Improve your typing speed and accuracy with engaging practice. Start typing today.",
      buttons: [
        { label: "START PRACTICING", icon: "ArrowRight" },
        { label: "TAKE TEST", icon: "ExternalLink" }
      ]
    }
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === parseInt(id));
};

export const getAllProjects = () => {
  return projects;
};