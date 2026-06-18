export const services = [
  {
    id: "web-development",
    title: "Web Development",
    subtitle: "Full-Stack Solutions",
    category: "Development",
    heroDescription: "Creating responsive, scalable web applications using modern technologies and cutting-edge frameworks.",
    overview: {
      title: "Transform Your Digital Presence",
      description: "We build everything from simple landing pages to complex enterprise applications. Our full-stack approach ensures seamless integration between frontend and backend systems, delivering robust solutions that scale with your business needs. With expertise in modern JavaScript frameworks, we create fast, secure, and user-friendly web applications that drive results.",
      highlights: [
        "Custom web applications tailored to your business needs",
        "Responsive design that works flawlessly across all devices",
        "Performance optimization for lightning-fast load times",
        "SEO-friendly architecture for better search visibility",
        "Scalable solutions that grow with your business",
        "Secure development practices and data protection"
      ]
    },
    whatWeProvide: [
      {
        title: "Frontend Development",
        description: "Creating stunning, interactive user interfaces using React, Next.js, Vue.js, and Angular. We focus on user experience, performance, and modern design principles.",
        features: [
          "Single Page Applications (SPAs)",
          "Progressive Web Apps (PWAs)",
          "Component-based architecture",
          "State management solutions",
          "Real-time user interfaces",
          "Cross-browser compatibility"
        ]
      },
      {
        title: "Backend Development",
        description: "Building robust server-side applications with Node.js, Python, Java, and .NET. We create scalable APIs, microservices, and database solutions.",
        features: [
          "RESTful and GraphQL APIs",
          "Microservices architecture",
          "Database design and optimization",
          "Authentication and authorization",
          "Real-time applications with WebSockets",
          "Cloud deployment and DevOps"
        ]
      },
      {
        title: "E-commerce Solutions",
        description: "Complete online store development with payment integration, inventory management, and customer experience optimization.",
        features: [
          "Custom shopping cart development",
          "Payment gateway integration",
          "Inventory management systems",
          "Customer relationship management",
          "Order processing automation",
          "Analytics and reporting"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Discovery & Planning",
        description: "We start by understanding your business goals, target audience, and technical requirements. This phase involves detailed analysis and strategic planning.",
        activities: [
          "Business requirements gathering",
          "User research and analysis",
          "Technical feasibility assessment",
          "Project timeline and roadmap",
          "Technology stack selection",
          "Risk assessment and mitigation"
        ]
      },
      {
        phase: "Design & Prototyping",
        description: "Creating wireframes, mockups, and interactive prototypes to visualize the final product and gather feedback before development.",
        activities: [
          "UX/UI design creation",
          "Wireframing and prototyping",
          "User flow mapping",
          "Design system development",
          "Interactive prototype testing",
          "Stakeholder feedback integration"
        ]
      },
      {
        phase: "Development & Testing",
        description: "Agile development process with continuous testing to ensure high-quality code and optimal performance.",
        activities: [
          "Agile development sprints",
          "Code reviews and quality assurance",
          "Unit and integration testing",
          "Performance optimization",
          "Security testing and implementation",
          "Continuous integration and deployment"
        ]
      },
      {
        phase: "Deployment & Maintenance",
        description: "Seamless deployment to production and ongoing maintenance to ensure your application runs smoothly and stays up-to-date.",
        activities: [
          "Production deployment",
          "Performance monitoring",
          "Security updates and patches",
          "Feature enhancements",
          "Technical support and troubleshooting",
          "Regular backups and disaster recovery"
        ]
      }
    ],
    technologies: [
      { name: 'React', category: 'Frontend Framework', icon: '⚛️' },
      { name: 'Next.js', category: 'Full-stack Framework', icon: '🚀' },
      { name: 'TypeScript', category: 'Language', icon: '📘' },
      { name: 'Node.js', category: 'Backend Runtime', icon: '🟢' },
      { name: 'Express.js', category: 'Backend Framework', icon: '🚂' },
      { name: 'MongoDB', category: 'Database', icon: '🍃' },
      { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
      { name: 'GraphQL', category: 'API', icon: '🔷' },
      { name: 'Docker', category: 'Containerization', icon: '🐳' },
      { name: 'AWS', category: 'Cloud Platform', icon: '☁️' },
      { name: 'Vercel', category: 'Deployment', icon: '▲' }
    ],
    process: [
      {
        step: "01",
        title: "Consultation",
        description: "Understanding your vision and requirements",
        details: "We begin with an in-depth consultation to understand your business objectives, target audience, and specific requirements. This helps us create a tailored solution that aligns with your goals."
      },
      {
        step: "02",
        title: "Strategy",
        description: "Developing a comprehensive technical strategy",
        details: "Our technical team creates a detailed strategy including technology stack selection, architecture design, project timeline, and resource allocation to ensure successful project delivery."
      },
      {
        step: "03",
        title: "Design",
        description: "Creating intuitive and engaging user experiences",
        details: "Our designers craft beautiful, user-friendly interfaces that not only look great but also provide exceptional user experiences. We focus on usability, accessibility, and conversion optimization."
      },
      {
        step: "04",
        title: "Development",
        description: "Building robust and scalable applications",
        details: "Using agile methodologies, we develop your application with clean, maintainable code. We follow best practices for security, performance, and scalability throughout the development process."
      },
      {
        step: "05",
        title: "Testing",
        description: "Ensuring quality and performance excellence",
        details: "Comprehensive testing including unit tests, integration tests, performance testing, and user acceptance testing to ensure your application meets the highest quality standards."
      },
      {
        step: "06",
        title: "Launch",
        description: "Deploying and optimizing for success",
        details: "We handle the complete deployment process, from server setup to going live. Post-launch, we monitor performance, gather user feedback, and make necessary optimizations."
      }
    ],
    stats: [
      { value: "150+", label: "Projects Completed", icon: "🚀" },
      { value: "98%", label: "Client Satisfaction", icon: "⭐" },
      { value: "5+", label: "Years Experience", icon: "📅" },
      { value: "24/7", label: "Support Available", icon: "🛟" }
    ],
    pricing: [
      {
        title: "Starter",
        price: "$2,999",
        duration: "Starting from",
        description: "Perfect for small businesses and startups",
        features: [
          "Custom website design",
          "Responsive layout",
          "Basic CMS integration",
          "SEO optimization",
          "3 months support",
          "Basic analytics setup"
        ],
        popular: false
      },
      {
        title: "Professional",
        price: "$7,999",
        duration: "Starting from",
        description: "Ideal for growing businesses",
        features: [
          "Advanced web application",
          "Custom backend development",
          "Database integration",
          "API development",
          "Advanced analytics",
          "6 months support",
          "Performance optimization"
        ],
        popular: true
      },
      {
        title: "Enterprise",
        price: "Custom",
        duration: "Tailored Solution",
        description: "For large-scale applications",
        features: [
          "Full-stack development",
          "Microservices architecture",
          "Cloud deployment",
          "Advanced security",
          "Custom integrations",
          "12 months support",
          "Dedicated team"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Ready to Build Your Dream Website?",
      subtitle: "Let's discuss your project and create a web solution that drives your business forward. Our expert team is ready to turn your vision into reality.",
      buttons: [
        { label: "GET A QUOTE", icon: "ArrowRight" }
      ]
    }
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    subtitle: "iOS & Android Apps",
    category: "Development",
    heroDescription: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    overview: {
      title: "Mobile Excellence for Your Business",
      description: "From concept to deployment, we create apps that engage users and drive business growth. Our expertise spans both native development and cross-platform solutions, ensuring optimal performance across all devices. We focus on creating intuitive, fast, and beautiful mobile experiences that users love.",
      highlights: [
        "Native iOS and Android development",
        "Cross-platform solutions with React Native and Flutter",
        "Intuitive user interfaces and experiences",
        "High-performance apps with smooth animations",
        "App Store optimization and deployment",
        "Ongoing maintenance and support"
      ]
    },
    whatWeProvide: [
      {
        title: "Native iOS Development",
        description: "Building high-performance iOS applications using Swift and Objective-C, optimized for iPhone and iPad devices.",
        features: [
          "Swift and Objective-C development",
          "iOS SDK and framework integration",
          "App Store submission and optimization",
          "Push notifications implementation",
          "Core Data and CloudKit integration",
          "iOS design guidelines compliance"
        ]
      },
      {
        title: "Native Android Development",
        description: "Creating robust Android applications using Kotlin and Java, designed for smartphones, tablets, and Android TV.",
        features: [
          "Kotlin and Java development",
          "Android SDK and Jetpack components",
          "Google Play Store deployment",
          "Material Design implementation",
          "Firebase integration",
          "Android optimization for various devices"
        ]
      },
      {
        title: "Cross-Platform Development",
        description: "Developing apps that work on both iOS and Android using React Native, Flutter, or Xamarin for faster time-to-market.",
        features: [
          "React Native development",
          "Flutter app creation",
          "Code sharing across platforms",
          "Native module integration",
          "Platform-specific optimizations",
          "Single codebase maintenance"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Strategy & Planning",
        description: "Defining app objectives, target audience, and technical requirements for successful mobile application development.",
        activities: [
          "Mobile strategy development",
          "Target audience analysis",
          "Platform selection (iOS/Android/Both)",
          "Feature prioritization",
          "Technical requirements specification",
          "Project timeline and milestones"
        ]
      },
      {
        phase: "UI/UX Design",
        description: "Creating mobile-first designs that provide intuitive user experiences and follow platform-specific design guidelines.",
        activities: [
          "Mobile wireframing and prototyping",
          "Platform-specific UI design",
          "User experience flow mapping",
          "Interactive prototype creation",
          "Usability testing and iteration",
          "Design system development"
        ]
      },
      {
        phase: "Development",
        description: "Building the mobile application using best practices and modern development frameworks.",
        activities: [
          "Native or cross-platform development",
          "API integration and backend connectivity",
          "Database implementation",
          "Third-party SDK integration",
          "Real-time features development",
          "Performance optimization"
        ]
      },
      {
        phase: "Testing & Deployment",
        description: "Comprehensive testing and successful deployment to app stores with ongoing support.",
        activities: [
          "Device and OS compatibility testing",
          "Performance and security testing",
          "App Store submission",
          "Beta testing and feedback collection",
          "Launch preparation and marketing",
          "Post-launch monitoring and updates"
        ]
      }
    ],
    technologies: [
      { name: 'Swift', category: 'iOS Language', icon: '🦉' },
      { name: 'Kotlin', category: 'Android Language', icon: '🤖' },
      { name: 'React Native', category: 'Cross-platform', icon: '⚛️' },
      { name: 'Flutter', category: 'Cross-platform', icon: '🦋' },
      { name: 'Firebase', category: 'Backend', icon: '🔥' },
      { name: 'Node.js', category: 'Backend', icon: '🟢' },
      { name: 'GraphQL', category: 'API', icon: '🔷' },
      { name: 'MongoDB', category: 'Database', icon: '🍃' },
      { name: 'AWS Mobile', category: 'Cloud', icon: '☁️' },
      { name: 'Jest', category: 'Testing', icon: '🃏' },
      { name: 'Fastlane', category: 'Deployment', icon: '🛣️' },
      { name: 'Sentry', category: 'Monitoring', icon: '📡' }
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        description: "Understanding your mobile app vision",
        details: "We dive deep into understanding your business goals, target users, and app requirements to create a solid foundation for development."
      },
      {
        step: "02",
        title: "Design",
        description: "Crafting beautiful mobile experiences",
        details: "Our designers create stunning, user-friendly interfaces that follow platform guidelines and provide exceptional user experiences."
      },
      {
        step: "03",
        title: "Development",
        description: "Building robust mobile applications",
        details: "We develop your app using the latest technologies and best practices, ensuring high performance, security, and scalability."
      },
      {
        step: "04",
        title: "Testing",
        description: "Ensuring quality across all devices",
        details: "Comprehensive testing on various devices and OS versions to ensure your app works flawlessly for all users."
      },
      {
        step: "05",
        title: "Launch",
        description: "Deploying to app stores",
        details: "We handle the complete app store submission process, from preparing assets to meeting all guidelines for successful approval."
      },
      {
        step: "06",
        title: "Support",
        description: "Ongoing maintenance and updates",
        details: "Post-launch support including bug fixes, performance optimization, feature updates, and compatibility with new OS versions."
      }
    ],
    stats: [
      { value: "80+", label: "Apps Developed", icon: "📱" },
      { value: "95%", label: "App Store Rating", icon: "⭐" },
      { value: "4+", label: "Years Experience", icon: "📅" },
      { value: "1M+", label: "Total Downloads", icon: "📥" }
    ],
    pricing: [
      {
        title: "Basic App",
        price: "$4,999",
        duration: "Starting from",
        description: "Simple mobile applications",
        features: [
          "Cross-platform development",
          "Basic UI/UX design",
          "Core features implementation",
          "App store submission",
          "3 months support",
          "Basic analytics"
        ],
        popular: false
      },
      {
        title: "Advanced App",
        price: "$12,999",
        duration: "Starting from",
        description: "Feature-rich applications",
        features: [
          "Native platform development",
          "Advanced UI/UX design",
          "Custom backend integration",
          "Real-time features",
          "6 months support",
          "Advanced analytics"
        ],
        popular: true
      },
      {
        title: "Enterprise App",
        price: "Custom",
        duration: "Tailored Solution",
        description: "Complex business applications",
        features: [
          "Multi-platform development",
          "Enterprise-grade architecture",
          "Advanced security features",
          "Custom integrations",
          "12 months support",
          "Dedicated team"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Create Your Mobile App Today?",
      subtitle: "Transform your business with a powerful mobile application. Our expert developers are ready to bring your mobile vision to life.",
      buttons: [
        { label: "START PROJECT", icon: "ArrowRight" },
        { label: "SEE CASE STUDIES", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    subtitle: "User-Centered Design",
    category: "Design",
    heroDescription: "Creating intuitive, beautiful, and user-friendly interfaces that delight users and drive engagement.",
    overview: {
      title: "Design That Drives Results",
      description: "We create stunning user interfaces and experiences that not only look beautiful but also function flawlessly. Our user-centered design approach ensures that every interaction is meaningful, intuitive, and aligned with your business goals. From wireframes to high-fidelity prototypes, we craft designs that users love and that convert.",
      highlights: [
        "User research and persona development",
        "Wireframing and interactive prototyping",
        "Visual design and brand consistency",
        "Usability testing and optimization",
        "Responsive design for all devices",
        "Accessibility compliance (WCAG standards)"
      ]
    },
    whatWeProvide: [
      {
        title: "User Interface Design",
        description: "Creating visually appealing and intuitive interfaces that provide excellent user experiences across all platforms and devices.",
        features: [
          "Custom visual design systems",
          "Component-based UI libraries",
          "Interactive design prototypes",
          "Design system development",
          "Brand identity integration",
          "Cross-platform consistency"
        ]
      },
      {
        title: "User Experience Design",
        description: "Designing seamless user journeys and interactions that solve real problems and create meaningful connections with users.",
        features: [
          "User research and analysis",
          "Information architecture",
          "User flow mapping",
          "Interaction design",
          "Usability testing",
          "Experience optimization"
        ]
      },
      {
        title: "Design Systems",
        description: "Building comprehensive design systems that ensure consistency, scalability, and efficiency across all your digital products.",
        features: [
          "Component libraries",
          "Style guides and documentation",
          "Design tokens and variables",
          "Pattern libraries",
          "Design-to-development handoff",
          "Cross-team collaboration tools"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Research & Discovery",
        description: "Understanding your users, business goals, and market landscape to inform design decisions.",
        activities: [
          "User interviews and surveys",
          "Competitor analysis",
          "Market research",
          "Stakeholder workshops",
          "User persona creation",
          "Requirements gathering"
        ]
      },
      {
        phase: "Strategy & Planning",
        description: "Developing a comprehensive design strategy that aligns with business objectives and user needs.",
        activities: [
          "Design strategy development",
          "Information architecture",
          "User flow mapping",
          "Content strategy",
          "Technical feasibility assessment",
          "Design roadmap creation"
        ]
      },
      {
        phase: "Design & Prototyping",
        description: "Creating wireframes, mockups, and interactive prototypes to visualize and test design concepts.",
        activities: [
          "Wireframing and layout design",
          "Visual design and branding",
          "Interactive prototyping",
          "Usability testing",
          "Design iteration and refinement",
          "Stakeholder feedback integration"
        ]
      },
      {
        phase: "Implementation & Testing",
        description: "Collaborating with development teams and conducting final testing to ensure design quality.",
        activities: [
          "Design handoff to developers",
          "Development collaboration",
          "Quality assurance testing",
          "User acceptance testing",
          "Performance optimization",
          "Launch support and monitoring"
        ]
      }
    ],
    technologies: [
      { name: 'Figma', category: 'Design Tool', icon: '🎨' },
      { name: 'Sketch', category: 'Design Tool', icon: '✏️' },
      { name: 'Adobe XD', category: 'Design Tool', icon: '🟦' },
      { name: 'Photoshop', category: 'Design Tool', icon: '🖼️' },
      { name: 'Illustrator', category: 'Design Tool', icon: '🎭' },
      { name: 'InVision', category: 'Prototyping', icon: '🔮' },
      { name: 'Principle', category: 'Animation', icon: '🎬' },
      { name: 'Framer', category: 'Interactive Design', icon: '🎯' },
      { name: 'Maze', category: 'User Testing', icon: '🧪' },
      { name: 'Hotjar', category: 'Analytics', icon: '🔥' },
      { name: 'Storybook', category: 'Documentation', icon: '📚' },
      { name: 'Zeplin', category: 'Handoff', icon: '📤' }
    ],
    process: [
      {
        step: "01",
        title: "Research",
        description: "Understanding users and business needs",
        details: "We conduct thorough research to understand your target audience, business objectives, and competitive landscape. This foundation ensures our designs solve real problems."
      },
      {
        step: "02",
        title: "Strategy",
        description: "Planning the design approach",
        details: "Based on research insights, we develop a comprehensive design strategy including user personas, journey maps, and information architecture."
      },
      {
        step: "03",
        title: "Design",
        description: "Creating visual and interactive designs",
        details: "Our designers create wireframes, mockups, and interactive prototypes that bring your vision to life while ensuring optimal user experience."
      },
      {
        step: "04",
        title: "Test",
        description: "Validating designs with real users",
        details: "We conduct usability testing and gather feedback to ensure our designs meet user needs and business objectives before final implementation."
      },
      {
        step: "05",
        title: "Implement",
        description: "Collaborating on development",
        details: "We work closely with development teams to ensure designs are implemented accurately and maintain design integrity throughout the process."
      },
      {
        step: "06",
        title: "Optimize",
        description: "Continuous improvement",
        details: "Post-launch, we analyze user behavior and feedback to continuously optimize and improve the design for better performance and user satisfaction."
      }
    ],
    stats: [
      { value: "200+", label: "Design Projects", icon: "🎨" },
      { value: "96%", label: "User Satisfaction", icon: "😊" },
      { value: "6+", label: "Years Experience", icon: "📅" },
      { value: "50+", label: "Happy Clients", icon: "👥" }
    ],
    pricing: [
      {
        title: "Basic Design",
        price: "$1,999",
        duration: "Starting from",
        description: "Essential design services",
        features: [
          "Wireframing and mockups",
          "Basic UI design",
          "Style guide creation",
          "Design assets delivery",
          "2 rounds of revisions",
          "Basic usability testing"
        ],
        popular: false
      },
      {
        title: "Professional Design",
        price: "$4,999",
        duration: "Starting from",
        description: "Comprehensive design solutions",
        features: [
          "Complete UI/UX design",
          "Interactive prototypes",
          "Design system development",
          "User research and testing",
          "4 rounds of revisions",
          "Development collaboration"
        ],
        popular: true
      },
      {
        title: "Enterprise Design",
        price: "Custom",
        duration: "Tailored Solution",
        description: "Full-scale design services",
        features: [
          "End-to-end design strategy",
          "Comprehensive design system",
          "Multi-platform design",
          "Advanced user research",
          "Unlimited revisions",
          "Dedicated design team"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Ready to Transform Your User Experience?",
      subtitle: "Let's create stunning designs that users love and that drive your business forward. Our expert design team is ready to bring your vision to life.",
      buttons: [
        { label: "START DESIGN PROJECT", icon: "ArrowRight" },
        { label: "VIEW PORTFOLIO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: "ecommerce-solutions",
    title: "E-commerce Solutions",
    subtitle: "Online Store Development",
    category: "E-commerce",
    heroDescription: "Building powerful, scalable, and user-friendly online stores that drive sales and growth for your business.",
    overview: {
      title: "E-commerce Excellence",
      description: "We create comprehensive e-commerce solutions that combine stunning design with powerful functionality. From product catalogs to payment processing, we build online stores that provide exceptional shopping experiences and drive conversions. Our solutions are scalable, secure, and optimized for performance across all devices.",
      highlights: [
        "Custom online store development",
        "Multi-platform e-commerce solutions",
        "Secure payment gateway integration",
        "Inventory management systems",
        "Mobile-optimized shopping experience",
        "Advanced analytics and reporting"
      ]
    },
    whatWeProvide: [
      {
        title: "Custom E-commerce Development",
        description: "Building tailored e-commerce platforms from scratch to meet your specific business requirements and scale with your growth.",
        features: [
          "Custom shopping cart development",
          "Product catalog management",
          "Advanced search and filtering",
          "Multi-vendor marketplace support",
          "Custom checkout flows",
          "Scalable architecture design"
        ]
      },
      {
        title: "Platform-Based Solutions",
        description: "Implementing and customizing leading e-commerce platforms like Shopify, WooCommerce, Magento, and BigCommerce.",
        features: [
          "Shopify store development",
          "WooCommerce customization",
          "Magento implementation",
          "BigCommerce solutions",
          "Theme customization",
          "Plugin and extension development"
        ]
      },
      {
        title: "E-commerce Integration",
        description: "Integrating your e-commerce store with essential business systems and third-party services for seamless operations.",
        features: [
          "Payment gateway integration",
          "Shipping and logistics integration",
          "CRM and ERP integration",
          "Email marketing automation",
          "Accounting software integration",
          "Third-party API connections"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Strategy & Planning",
        description: "Understanding your e-commerce goals, target audience, and technical requirements for successful online store development.",
        activities: [
          "Business requirements analysis",
          "Target audience research",
          "Competitor analysis",
          "Platform selection",
          "Feature prioritization",
          "Project roadmap creation"
        ]
      },
      {
        phase: "Design & UX",
        description: "Creating user-friendly e-commerce designs that optimize the shopping experience and drive conversions.",
        activities: [
          "E-commerce UX design",
          "Product page optimization",
          "Checkout flow design",
          "Mobile shopping experience",
          "Conversion rate optimization",
          "Brand identity integration"
        ]
      },
      {
        phase: "Development",
        description: "Building the e-commerce platform with robust functionality, security, and performance optimization.",
        activities: [
          "Frontend development",
          "Backend development",
          "Database design",
          "Payment system integration",
          "Security implementation",
          "Performance optimization"
        ]
      },
      {
        phase: "Launch & Optimization",
        description: "Deploying your e-commerce store and continuously optimizing for better performance and sales.",
        activities: [
          "Store deployment",
          "Payment testing",
          "Security auditing",
          "Performance monitoring",
          "Conversion rate optimization",
          "Ongoing maintenance and support"
        ]
      }
    ],
    technologies: [
      { name: 'Shopify', category: 'E-commerce Platform', icon: '🛍️' },
      { name: 'WooCommerce', category: 'E-commerce Platform', icon: '🛒' },
      { name: 'Magento', category: 'E-commerce Platform', icon: '🏪' },
      { name: 'BigCommerce', category: 'E-commerce Platform', icon: '🏬' },
      { name: 'React', category: 'Frontend', icon: '⚛️' },
      { name: 'Next.js', category: 'Framework', icon: '🚀' },
      { name: 'Node.js', category: 'Backend', icon: '🟢' },
      { name: 'Stripe', category: 'Payment', icon: '💳' },
      { name: 'PayPal', category: 'Payment', icon: '💰' },
      { name: 'AWS', category: 'Cloud', icon: '☁️' },
      { name: 'Docker', category: 'Containerization', icon: '🐳' },
      { name: 'Redis', category: 'Cache', icon: '🔴' }
    ],
    process: [
      {
        step: "01",
        title: "Consultation",
        description: "Understanding your e-commerce vision",
        details: "We begin with a comprehensive consultation to understand your business model, target audience, product offerings, and e-commerce goals."
      },
      {
        step: "02",
        title: "Strategy",
        description: "Planning your online store",
        details: "Based on your requirements, we develop a detailed strategy including platform selection, feature roadmap, timeline, and resource allocation."
      },
      {
        step: "03",
        title: "Design",
        description: "Creating your store's look and feel",
        details: "Our designers create a beautiful, user-friendly interface that reflects your brand and provides an exceptional shopping experience."
      },
      {
        step: "04",
        title: "Development",
        description: "Building your e-commerce platform",
        details: "We develop your online store with robust functionality, secure payment processing, and seamless user experience across all devices."
      },
      {
        step: "05",
        title: "Testing",
        description: "Ensuring quality and security",
        details: "Comprehensive testing including functionality, security, payment processing, and user experience to ensure your store is ready for launch."
      },
      {
        step: "06",
        title: "Launch",
        description: "Going live and growing",
        details: "We handle the complete launch process and provide ongoing support, optimization, and maintenance to ensure your store's success."
      }
    ],
    stats: [
      { value: "100+", label: "Stores Built", icon: "🏪" },
      { value: "40%", label: "Avg. Sales Increase", icon: "📈" },
      { value: "5+", label: "Years Experience", icon: "📅" },
      { value: "99.9%", label: "Uptime", icon: "⚡" }
    ],
    pricing: [
      {
        title: "Basic Store",
        price: "$3,999",
        duration: "Starting from",
        description: "Essential e-commerce features",
        features: [
          "Custom store design",
          "Product catalog setup",
          "Payment integration",
          "Basic SEO optimization",
          "3 months support",
          "Mobile responsive design"
        ],
        popular: false
      },
      {
        title: "Professional Store",
        price: "$8,999",
        duration: "Starting from",
        description: "Advanced e-commerce solution",
        features: [
          "Complete custom development",
          "Advanced features",
          "Multi-payment options",
          "Inventory management",
          "6 months support",
          "Analytics integration"
        ],
        popular: true
      },
      {
        title: "Enterprise Store",
        price: "Custom",
        duration: "Tailored Solution",
        description: "Large-scale e-commerce platform",
        features: [
          "Multi-vendor marketplace",
          "Advanced integrations",
          "Custom API development",
          "Enterprise security",
          "12 months support",
          "Dedicated team"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Ready to Launch Your Online Store?",
      subtitle: "Let's build a powerful e-commerce solution that drives sales and grows your business. Our expert team is ready to create your perfect online store.",
      buttons: [
        { label: "START E-COMMERCE PROJECT", icon: "ArrowRight" },
        { label: "SEE STORE EXAMPLES", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    subtitle: "Brand Engagement",
    category: "Marketing",
    heroDescription: "Building powerful social media strategies that connect with your audience and drive meaningful engagement across all platforms.",
    overview: {
      title: "Social Media That Works",
      description: "We create comprehensive social media strategies that build brand awareness, engage your target audience, and drive business results. From content creation to community management, we handle all aspects of your social media presence to ensure consistent growth and meaningful connections with your customers.",
      highlights: [
        "Comprehensive social media strategy",
        "Content creation and curation",
        "Community management and engagement",
        "Social media advertising campaigns",
        "Influencer partnerships",
        "Analytics and performance tracking"
      ]
    },
    whatWeProvide: [
      {
        title: "Social Media Strategy",
        description: "Developing data-driven social media strategies that align with your business goals and target audience preferences.",
        features: [
          "Platform selection and optimization",
          "Content strategy development",
          "Audience targeting and segmentation",
          "Competitor analysis",
          "Campaign planning and scheduling",
          "ROI measurement frameworks"
        ]
      },
      {
        title: "Content Creation",
        description: "Creating engaging, high-quality content that resonates with your audience and drives engagement across all social platforms.",
        features: [
          "Visual content creation",
          "Video production and editing",
          "Copywriting and caption creation",
          "Story and reel content",
          "Brand consistency management",
          "Content calendar development"
        ]
      },
      {
        title: "Community Management",
        description: "Building and nurturing active communities around your brand through consistent engagement and relationship building.",
        features: [
          "Daily community engagement",
          "Customer service support",
          "Comment and message management",
          "User-generated content curation",
          "Crisis management",
          "Brand advocacy programs"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Audit & Research",
        description: "Analyzing your current social media presence and researching your target audience and competitors.",
        activities: [
          "Social media audit",
          "Competitor analysis",
          "Audience research",
          "Platform performance analysis",
          "Content gap analysis",
          "Industry trend research"
        ]
      },
      {
        phase: "Strategy Development",
        description: "Creating a comprehensive social media strategy tailored to your business goals and target audience.",
        activities: [
          "Goal setting and KPI definition",
          "Platform selection",
          "Content strategy creation",
          "Campaign planning",
          "Budget allocation",
          "Timeline development"
        ]
      },
      {
        phase: "Content Creation & Publishing",
        description: "Creating and publishing engaging content across all selected social media platforms.",
        activities: [
          "Content calendar creation",
          "Visual content production",
          "Copywriting and editing",
          "Content scheduling",
          "Hashtag strategy",
          "Platform optimization"
        ]
      },
      {
        phase: "Engagement & Optimization",
        description: "Managing community engagement and continuously optimizing campaigns for better performance.",
        activities: [
          "Community management",
          "Performance monitoring",
          "A/B testing",
          "Strategy refinement",
          "Reporting and analysis",
          "Campaign optimization"
        ]
      }
    ],
    technologies: [
      { name: 'Meta Business Suite', category: 'Management', icon: '📘' },
      { name: 'Hootsuite', category: 'Management', icon: '🦉' },
      { name: 'Buffer', category: 'Scheduling', icon: '📋' },
      { name: 'Canva', category: 'Design', icon: '🎨' },
      { name: 'Adobe Creative Suite', category: 'Design', icon: '🎭' },
      { name: 'Later', category: 'Scheduling', icon: '⏰' },
      { name: 'Sprout Social', category: 'Analytics', icon: '🌱' },
      { name: 'Google Analytics', category: 'Analytics', icon: '📊' },
      { name: 'Facebook Ads', category: 'Advertising', icon: '📢' },
      { name: 'Instagram Ads', category: 'Advertising', icon: '📷' },
      { name: 'LinkedIn Ads', category: 'Advertising', icon: '💼' },
      { name: 'TikTok Ads', category: 'Advertising', icon: '🎵' }
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description: "Analyzing current presence",
        details: "We conduct a thorough audit of your current social media presence, analyzing performance, audience engagement, and competitive positioning."
      },
      {
        step: "02",
        title: "Strategy",
        description: "Planning your approach",
        details: "Based on audit findings, we develop a comprehensive social media strategy including platform selection, content themes, and campaign goals."
      },
      {
        step: "03",
        title: "Create",
        description: "Producing engaging content",
        details: "Our creative team produces high-quality, engaging content tailored to each platform and optimized for your target audience."
      },
      {
        step: "04",
        title: "Publish",
        description: "Sharing with your audience",
        details: "We schedule and publish content across all platforms at optimal times to maximize reach and engagement with your audience."
      },
      {
        step: "05",
        title: "Engage",
        description: "Building relationships",
        details: "We actively engage with your community, responding to comments, messages, and fostering meaningful connections with your audience."
      },
      {
        step: "06",
        title: "Analyze",
        description: "Measuring and optimizing",
        details: "We continuously monitor performance, analyze results, and optimize strategies to ensure continuous improvement and ROI."
      }
    ],
    stats: [
      { value: "500+", label: "Campaigns Managed", icon: "📢" },
      { value: "2M+", label: "Reach Generated", icon: "👥" },
      { value: "4+", label: "Years Experience", icon: "📅" },
      { value: "85%", label: "Engagement Rate", icon: "💬" }
    ],
    pricing: [
      {
        title: "Basic Package",
        price: "$999",
        duration: "Per month",
        description: "Essential social media management",
        features: [
          "3 platforms management",
          "12 posts per month",
          "Basic community engagement",
          "Monthly reporting",
          "Content calendar",
          "Basic analytics"
        ],
        popular: false
      },
      {
        title: "Professional Package",
        price: "$2,499",
        duration: "Per month",
        description: "Comprehensive social media solution",
        features: [
          "5 platforms management",
          "24 posts per month",
          "Advanced engagement",
          "Weekly reporting",
          "Content creation",
          "Paid ad management"
        ],
        popular: true
      },
      {
        title: "Enterprise Package",
        price: "Custom",
        duration: "Tailored Solution",
        description: "Full-scale social media strategy",
        features: [
          "Unlimited platforms",
          "Custom content volume",
          "Full community management",
          "Real-time reporting",
          "Video production",
          "Strategy consulting"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Ready to Boost Your Social Media Presence?",
      subtitle: "Let's create a powerful social media strategy that connects with your audience and drives real business results. Our social media experts are ready to help you succeed.",
      buttons: [
        { label: "START SOCIAL MEDIA CAMPAIGN", icon: "ArrowRight" },
        { label: "SEE CASE STUDIES", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Growth Marketing",
    category: "Marketing",
    heroDescription: "Comprehensive digital marketing solutions that drive traffic, generate leads, and accelerate business growth across all online channels.",
    overview: {
      title: "Digital Growth Experts",
      description: "We deliver end-to-end digital marketing solutions that help businesses thrive in the digital landscape. From SEO and content marketing to paid advertising and email campaigns, we create integrated strategies that drive measurable results. Our data-driven approach ensures every marketing dollar is optimized for maximum ROI and sustainable business growth.",
      highlights: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) advertising",
        "Content marketing strategy",
        "Email marketing campaigns",
        "Marketing automation",
        "Analytics and performance tracking"
      ]
    },
    whatWeProvide: [
      {
        title: "Search Engine Optimization",
        description: "Improving your website's visibility and ranking on search engines through comprehensive SEO strategies and technical optimization.",
        features: [
          "On-page SEO optimization",
          "Technical SEO audits",
          "Content strategy and creation",
          "Link building and outreach",
          "Local SEO optimization",
          "SEO performance tracking"
        ]
      },
      {
        title: "Paid Advertising",
        description: "Creating and managing targeted paid advertising campaigns across Google, social media, and other digital platforms.",
        features: [
          "Google Ads management",
          "Social media advertising",
          "Display advertising",
          "Remarketing campaigns",
          "A/B testing and optimization",
          "Budget management and ROI tracking"
        ]
      },
      {
        title: "Content Marketing",
        description: "Developing and executing content strategies that attract, engage, and convert your target audience across multiple channels.",
        features: [
          "Content strategy development",
          "Blog and article writing",
          "Video content production",
          "Infographic creation",
          "Whitepaper and ebook development",
          "Content distribution and promotion"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Discovery & Analysis",
        description: "Understanding your business, target audience, and current digital marketing performance to identify opportunities and challenges.",
        activities: [
          "Business goal analysis",
          "Target audience research",
          "Competitor analysis",
          "Current performance audit",
          "Market opportunity assessment",
          "Technology stack evaluation"
        ]
      },
      {
        phase: "Strategy Development",
        description: "Creating a comprehensive digital marketing strategy that aligns with your business objectives and target audience needs.",
        activities: [
          "Marketing channel selection",
          "Campaign strategy development",
          "Budget allocation",
          "KPI definition and tracking",
          "Content planning",
          "Technology integration planning"
        ]
      },
      {
        phase: "Implementation",
        description: "Executing the digital marketing strategy across all selected channels with continuous optimization and monitoring.",
        activities: [
          "Campaign setup and launch",
          "Content creation and publishing",
          "Ad campaign management",
          "Email campaign deployment",
          "SEO implementation",
          "Marketing automation setup"
        ]
      },
      {
        phase: "Optimization & Reporting",
        description: "Continuously monitoring performance, analyzing results, and optimizing campaigns for better results and ROI.",
        activities: [
          "Performance monitoring",
          "Data analysis and insights",
          "Campaign optimization",
          "A/B testing",
          "ROI calculation",
          "Regular reporting and reviews"
        ]
      }
    ],
    technologies: [
      { name: 'Google Analytics', category: 'Analytics', icon: '📊' },
      { name: 'Google Ads', category: 'Advertising', icon: '🔍' },
      { name: 'SEMrush', category: 'SEO', icon: '🔧' },
      { name: 'Ahrefs', category: 'SEO', icon: '🔗' },
      { name: 'HubSpot', category: 'Marketing Automation', icon: '🎯' },
      { name: 'Mailchimp', category: 'Email Marketing', icon: '📧' },
      { name: 'ActiveCampaign', category: 'Marketing Automation', icon: '⚡' },
      { name: 'Facebook Ads', category: 'Social Advertising', icon: '📘' },
      { name: 'LinkedIn Ads', category: 'Social Advertising', icon: '💼' },
      { name: 'Google Tag Manager', category: 'Tracking', icon: '🏷️' },
      { name: 'Hotjar', category: 'User Behavior', icon: '🔥' },
      { name: 'Canva', category: 'Design', icon: '🎨' }
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description: "Analyzing current performance",
        details: "We conduct a comprehensive audit of your current digital marketing efforts, analyzing performance across all channels and identifying opportunities for improvement."
      },
      {
        step: "02",
        title: "Strategy",
        description: "Planning your marketing approach",
        details: "Based on audit findings, we develop a comprehensive digital marketing strategy including channel selection, budget allocation, and campaign planning."
      },
      {
        step: "03",
        title: "Execute",
        description: "Implementing marketing campaigns",
        details: "We execute your digital marketing strategy across all selected channels, creating and launching campaigns that drive results and meet your objectives."
      },
      {
        step: "04",
        title: "Monitor",
        description: "Tracking performance metrics",
        details: "We continuously monitor campaign performance, tracking key metrics and gathering data to understand what's working and what needs improvement."
      },
      {
        step: "05",
        title: "Optimize",
        description: "Improving campaign performance",
        details: "Using data-driven insights, we continuously optimize campaigns for better performance, testing new approaches and refining strategies."
      },
      {
        step: "06",
        title: "Report",
        description: "Measuring success and ROI",
        details: "We provide detailed reports on campaign performance, ROI analysis, and strategic recommendations for continued growth and improvement."
      }
    ],
    stats: [
      { value: "300+", label: "Campaigns Managed", icon: "📈" },
      { value: "250%", label: "Avg. ROI Increase", icon: "💰" },
      { value: "6+", label: "Years Experience", icon: "📅" },
      { value: "95%", label: "Client Retention", icon: "🤝" }
    ],
    pricing: [
      {
        title: "Starter Package",
        price: "$1,499",
        duration: "Per month",
        description: "Essential digital marketing services",
        features: [
          "Basic SEO optimization",
          "Google Ads management",
          "Content creation",
          "Email marketing",
          "Monthly reporting",
          "Basic analytics"
        ],
        popular: false
      },
      {
        title: "Growth Package",
        price: "$3,999",
        duration: "Per month",
        description: "Comprehensive marketing solution",
        features: [
          "Advanced SEO strategy",
          "Multi-platform advertising",
          "Content marketing",
          "Marketing automation",
          "Weekly reporting",
          "Conversion optimization"
        ],
        popular: true
      },
      {
        title: "Enterprise Package",
        price: "Custom",
        duration: "Tailored Solution",
        description: "Full-scale digital marketing",
        features: [
          "Enterprise SEO strategy",
          "Full advertising management",
          "Comprehensive content strategy",
          "Advanced automation",
          "Real-time reporting",
          "Dedicated team"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Ready to Accelerate Your Digital Growth?",
      subtitle: "Let's create a comprehensive digital marketing strategy that drives traffic, generates leads, and grows your business. Our marketing experts are ready to help you succeed online.",
      buttons: [
        { label: "START MARKETING CAMPAIGN", icon: "ArrowRight" },
        { label: "SEE SUCCESS STORIES", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    subtitle: "Scalable Infrastructure",
    category: "Cloud",
    heroDescription: "Robust cloud infrastructure solutions that scale with your business needs, ensuring high availability, security, and cost-effectiveness.",
    overview: {
      title: "Empower Your Applications with Cloud Scale",
      description: "We design, build, and manage highly reliable and secure cloud architectures. Whether you need to migrate from on-premise servers, optimize your cloud spend, or implement a multi-region disaster recovery plan, our certified cloud architect team delivers state-of-the-art solutions on AWS, Google Cloud, and Azure. With automated deployment pipelines and container orchestration, we make your infrastructure resilient, cost-effective, and blazing fast.",
      highlights: [
        "Custom cloud infrastructure design and deployment",
        "Zero-downtime migrations and database replication",
        "Auto-scaling systems built for extreme traffic spikes",
        "Continuous monitoring, logging, and security auditing",
        "Cost optimization to reduce your monthly cloud bill",
        "Infrastructure as Code (IaC) with Terraform and CloudFormation"
      ]
    },
    whatWeProvide: [
      {
        title: "Cloud Migration & Architecture",
        description: "Seamlessly migrate your legacy applications and databases to major cloud platforms. We design secure, multi-zone architectures that eliminate single points of failure.",
        features: [
          "Lift-and-shift migrations",
          "Database replication and syncing",
          "Multi-AZ architecture design",
          "Load balancing and autoscaling",
          "Cloud security hardening",
          "Data backup and disaster recovery"
        ]
      },
      {
        title: "DevOps & CI/CD Automation",
        description: "Automate your software delivery lifecycle with continuous integration and continuous deployment pipelines, reducing release cycles and human errors.",
        features: [
          "Docker containerization",
          "Kubernetes orchestration",
          "GitHub Actions and Jenkins pipelines",
          "Terraform infrastructure provisioning",
          "Automated unit and integration testing",
          "Microservices deployment systems"
        ]
      },
      {
        title: "Managed Infrastructure & Security",
        description: "24/7 monitoring, security patching, and log analysis to ensure your applications stay online, secure, and performant at all times.",
        features: [
          "24/7 uptime monitoring",
          "CloudWatch and Prometheus dashboard setup",
          "SSL/TLS certificate management",
          "VPC and firewall configuration",
          "Intrusion detection and prevention",
          "IAM policy and access control audit"
        ]
      }
    ],
    howWeDoIt: [
      {
        phase: "Assessment & Audit",
        description: "We audit your existing servers, applications, and monthly spending to identify bottlenecks, security risks, and cost-saving opportunities.",
        activities: [
          "Architecture and security audit",
          "Resource usage and spending review",
          "Bottleneck and latency analysis",
          "Migration readiness assessment",
          "Compliance and standards check",
          "Cost optimization plan"
        ]
      },
      {
        phase: "Design & IaC Setup",
        description: "Designing the new target architecture and writing Infrastructure as Code to ensure reproducible deployments.",
        activities: [
          "Target cloud architecture design",
          "Terraform scripts development",
          "VPC, subnet, and routing setup",
          "IAM roles and policy writing",
          "CI/CD pipeline configuration",
          "Disaster recovery planning"
        ]
      },
      {
        phase: "Migration & Testing",
        description: "Executing the migration in phases with zero-downtime and running comprehensive security and load tests.",
        activities: [
          "Phased data migration",
          "Database replication setup",
          "DNS failover configuration",
          "Load and stress testing",
          "Vulnerability assessments",
          "User acceptance testing"
        ]
      },
      {
        phase: "Go-Live & Support",
        description: "Switching traffic to the cloud infrastructure, monitoring performance, and providing 24/7 support.",
        activities: [
          "Final DNS switch",
          "Uptime and error monitoring",
          "Alerting thresholds tuning",
          "Spend monitoring and capping",
          "Security log analysis",
          "Continuous DevOps support"
        ]
      }
    ],
    technologies: [
      { name: 'AWS', category: 'Cloud Platform', icon: '☁️' },
      { name: 'Google Cloud', category: 'Cloud Platform', icon: '☁️' },
      { name: 'Azure', category: 'Cloud Platform', icon: '☁️' },
      { name: 'Docker', category: 'Containerization', icon: '🐳' },
      { name: 'Kubernetes', category: 'Orchestration', icon: '☸️' },
      { name: 'Terraform', category: 'IaC', icon: '🛠️' },
      { name: 'GitHub Actions', category: 'CI/CD', icon: '🔄' },
      { name: 'Prometheus', category: 'Monitoring', icon: '📈' },
      { name: 'Grafana', category: 'Visualization', icon: '📊' },
      { name: 'CloudWatch', category: 'AWS Tool', icon: '👀' },
      { name: 'Nginx', category: 'Web Server', icon: '🌐' },
      { name: 'Redis', category: 'Caching', icon: '🔴' }
    ],
    process: [
      {
        step: "01",
        title: "Assessment",
        description: "Auditing your current setups",
        details: "We start by analyzing your application requirements and current infrastructure to design the optimal cloud path."
      },
      {
        step: "02",
        title: "Design",
        description: "Planning secure architecture",
        details: "We design a high-availability architecture using best practices, ensuring scalability, security, and cost efficiency."
      },
      {
        step: "03",
        title: "IaC Writing",
        description: "Coding your infrastructure",
        details: "We write Terraform configurations to provision your servers, databases, and network dynamically and reliably."
      },
      {
        step: "04",
        title: "Migration",
        description: "Migrating with zero downtime",
        details: "We copy data and mirror transactions, moving your services to the cloud without interrupting your operations."
      },
      {
        step: "05",
        title: "Validation",
        description: "Running rigorous stress tests",
        details: "We run penetration and performance load testing to ensure your cloud stack handles high traffic and security challenges."
      },
      {
        step: "06",
        title: "Launch",
        description: "Uptime and spend monitoring",
        details: "We switch DNS to go live and configure 24/7 monitoring dashboards with automated alerts to guarantee stability."
      }
    ],
    stats: [
      { value: "90+", label: "Architectures Built", icon: "🏗️" },
      { value: "99.99%", label: "Uptime Guaranteed", icon: "⚡" },
      { value: "40%", label: "Avg. Cloud Cost Saved", icon: "💰" },
      { value: "24/7", label: "DevOps Monitoring", icon: "🚨" }
    ],
    pricing: [
      {
        title: "Basic Setup",
        price: "$2,499",
        duration: "Starting from",
        description: "Ideal for simple application hosting",
        features: [
          "Single cloud account setup",
          "VPC & network design",
          "Single database setup",
          "Automated daily backups",
          "3 months support",
          "Basic monitoring alerts"
        ],
        popular: false
      },
      {
        title: "DevOps Package",
        price: "$5,999",
        duration: "Starting from",
        description: "Perfect for scaling startups",
        features: [
          "Docker containerization",
          "CI/CD pipeline setup",
          "Auto-scaling server setup",
          "Terraform codebase delivery",
          "6 months support",
          "Advanced monitoring alerts"
        ],
        popular: true
      },
      {
        title: "Enterprise Architecture",
        price: "Custom",
        duration: "Tailored Solution",
        description: "For high-volume business systems",
        features: [
          "Kubernetes cluster deployment",
          "Multi-cloud redundancy",
          "Strict data compliance setup",
          "Zero-downtime migration execution",
          "12 months support",
          "Dedicated DevOps architect"
        ],
        popular: false
      }
    ],
    callToAction: {
      title: "Ready to Scale Your Infrastructure?",
      subtitle: "Let's build a secure, resilient, and optimized cloud infrastructure that empowers your digital products. Our DevOps team is ready to scale your success.",
      buttons: [
        { label: "GET CLOUD ARCHITECTURE PLAN", icon: "ArrowRight" }
      ]
    }
  }
];

export const getServiceById = (id) => {
  if (id === 'seo-marketing') {
    return services.find(service => service.id === 'digital-marketing');
  }
  return services.find(service => service.id === id);
};

export const getAllServices = () => {
  return services;
};

