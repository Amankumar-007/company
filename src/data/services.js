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
        { label: "GET A QUOTE", icon: "ArrowRight" },
        { label: "VIEW PORTFOLIO", icon: "ExternalLink" }
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
  }
];

export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

export const getAllServices = () => {
  return services;
};
