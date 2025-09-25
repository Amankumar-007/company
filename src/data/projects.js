export const projects = [
  {
    id: 1,
    title: "AI TOOL",
    subtitle: "PROJECT",
    status: "LIVE PROJECT",
    video: "/video1.mp4",
    description: "An intelligent AI-powered platform that revolutionizes data analysis with machine learning algorithms and intuitive user experience.",
    category: "Web Application",
    developmentTime: "6 Months Development",
    metrics: [
      { value: "10K+", label: "Active Users", color: "blue" },
      { value: "95%", label: "Satisfaction", color: "purple" },
      { value: "80%", label: "Time Saved", color: "green" }
    ],
    features: [
      {
        title: "Intelligent Analysis",
        description: "Advanced machine learning algorithms that process and analyze data patterns automatically.",
        color: "blue"
      },
      {
        title: "Real-time Processing",
        description: "Lightning-fast data processing with real-time insights and recommendations.",
        color: "purple"
      },
      {
        title: "User-friendly Interface",
        description: "Intuitive design that makes complex data analysis accessible to everyone.",
        color: "green"
      },
      {
        title: "Scalable Solution",
        description: "Enterprise-grade architecture that grows with your business needs.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Tailwind CSS', category: 'Styling', icon: '/tech/9055799_bxl_tailwind_css_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'Python', category: 'AI/ML', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'TensorFlow', category: 'ML Framework', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'PostgreSQL', category: 'Database', icon: '/tech/4691328_postgresql_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Traditional data analysis tools were slow, complex, and required extensive technical knowledge.",
          "Users needed a solution that could process large datasets intelligently while providing intuitive insights without the learning curve.",
          "The challenge was to create an AI-powered tool that democratizes data analysis, making advanced analytics accessible to non-technical users while maintaining enterprise-grade performance."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "We developed an intelligent AI tool that combines machine learning algorithms with an intuitive user interface.",
          "The platform automatically analyzes data patterns, generates insights, and presents findings in easy-to-understand visualizations."
        ],
        features: [
          { title: 'Intelligent Automation', description: 'Automates complex data analysis tasks' },
          { title: 'Real-time Insights', description: 'Provides instant analysis and recommendations' },
          { title: 'Cross-platform', description: 'Works seamlessly across all devices and browsers' },
          { title: 'API Integration', description: 'Seamless integration with external APIs and services' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "10K+", label: "Active Users" },
          { value: "95%", label: "User Satisfaction" },
          { value: "80%", label: "Time Saved" }
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
        title: "Dashboard Interface",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Analytics View", 
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Ready to Experience the Future?",
      subtitle: "Join thousands of users who have transformed their workflow with our AI-powered tool. Start your journey today and see the difference intelligent automation can make.",
      buttons: [
        { label: "TRY FOR FREE", icon: "ArrowRight" },
        { label: "VIEW DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 2,
    title: "ECOMMERCE",
    subtitle: "PLATFORM",
    status: "LIVE PROJECT",
    video: "/video2.mp4",
    description: "A modern e-commerce platform with advanced features for seamless online shopping experiences.",
    category: "Web Application",
    developmentTime: "8 Months Development",
    metrics: [
      { value: "50K+", label: "Active Users", color: "green" },
      { value: "98%", label: "Satisfaction", color: "blue" },
      { value: "60%", label: "Revenue Growth", color: "purple" }
    ],
    features: [
      {
        title: "Smart Search",
        description: "AI-powered search with intelligent recommendations and filters.",
        color: "green"
      },
      {
        title: "Secure Payments",
        description: "Multiple payment options with enterprise-grade security.",
        color: "blue"
      },
      {
        title: "Mobile First",
        description: "Optimized for mobile devices with responsive design.",
        color: "purple"
      },
      {
        title: "Analytics Dashboard",
        description: "Comprehensive analytics for business insights.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Stripe', category: 'Payment', icon: '/tech/4923041_aws_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'MongoDB', category: 'Database', icon: '/tech/1012822_code_development_logo_mongodb_programming_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Existing e-commerce platforms were either too complex or lacked essential features.",
          "Businesses needed a scalable solution that could handle high traffic while providing excellent user experience.",
          "The challenge was to create a platform that balances functionality with simplicity."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "We built a comprehensive e-commerce platform with modern architecture and user-centric design.",
          "The platform includes advanced features like AI recommendations, secure payments, and real-time inventory management."
        ],
        features: [
          { title: 'AI Recommendations', description: 'Personalized product suggestions' },
          { title: 'Multi-vendor Support', description: 'Support for multiple sellers' },
          { title: 'Real-time Inventory', description: 'Live stock management' },
          { title: 'Advanced Analytics', description: 'Detailed business insights' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "50K+", label: "Active Users" },
          { value: "98%", label: "User Satisfaction" },
          { value: "60%", label: "Revenue Growth" }
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
        title: "Product Listing",
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Shopping Cart",
        url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Transform Your Online Business",
      subtitle: "Join thousands of successful businesses using our platform. Start selling online today with the most advanced e-commerce solution.",
      buttons: [
        { label: "START FREE TRIAL", icon: "ArrowRight" },
        { label: "VIEW DEMO", icon: "ExternalLink" }
      ]
    }
  },
  {
    id: 3,
    title: "TASK MANAGER",
    subtitle: "APP",
    status: "LIVE PROJECT",
    video: "/video1.mp4",
    description: "A collaborative task management application designed for teams to boost productivity and streamline workflows.",
    category: "Web Application",
    developmentTime: "4 Months Development",
    metrics: [
      { value: "25K+", label: "Active Users", color: "purple" },
      { value: "92%", label: "Satisfaction", color: "green" },
      { value: "70%", label: "Productivity Increase", color: "blue" }
    ],
    features: [
      {
        title: "Team Collaboration",
        description: "Real-time collaboration with team members and stakeholders.",
        color: "purple"
      },
      {
        title: "Smart Scheduling",
        description: "AI-powered task scheduling and deadline management.",
        color: "green"
      },
      {
        title: "Progress Tracking",
        description: "Visual progress tracking with advanced analytics.",
        color: "blue"
      },
      {
        title: "Integration Hub",
        description: "Seamless integration with popular tools and services.",
        color: "orange"
      }
    ],
    technologies: [
      { name: 'Next.js', category: 'Frontend Framework', icon: '/tech/9118036_nextjs_fill_icon.svg' },
      { name: 'React', category: 'UI Library', icon: '/tech/7423888_react_react native_icon.svg' },
      { name: 'TypeScript', category: 'Language', icon: '/tech/11120662_fi_brands_typescript_icon.svg' },
      { name: 'Socket.io', category: 'Real-time', icon: '/tech/652581_code_command_develop_javascript_language_icon.svg' },
      { name: 'Node.js', category: 'Backend', icon: '/tech/1012818_code_development_logo_nodejs_icon.svg' },
      { name: 'PostgreSQL', category: 'Database', icon: '/tech/4691328_postgresql_icon.svg' },
      { name: 'Redis', category: 'Cache', icon: '/tech/8725837_docker_icon.svg' },
      { name: 'Docker', category: 'DevOps', icon: '/tech/8725837_docker_icon.svg' }
    ],
    caseStudy: {
      challenge: {
        title: "THE CHALLENGE",
        content: [
          "Teams struggled with scattered communication and inefficient task management.",
          "Existing tools were either too simple or overly complex for team collaboration.",
          "The challenge was to create a balanced solution that enhances productivity without overwhelming users."
        ]
      },
      solution: {
        title: "THE SOLUTION",
        content: [
          "We developed a comprehensive task management platform with focus on user experience and team collaboration.",
          "The platform features real-time updates, smart scheduling, and seamless integrations."
        ],
        features: [
          { title: 'Real-time Updates', description: 'Live sync across all devices' },
          { title: 'Smart Notifications', description: 'Intelligent alert system' },
          { title: 'Team Analytics', description: 'Performance insights' },
          { title: 'Custom Workflows', description: 'Adaptable to any team' }
        ]
      },
      results: {
        title: "THE RESULTS",
        metrics: [
          { value: "25K+", label: "Active Users" },
          { value: "92%", label: "User Satisfaction" },
          { value: "70%", label: "Productivity Increase" }
        ]
      }
    },
    technicalSpecs: {
      responseTime: "< 100ms",
      uptime: "99.9%",
      dataProcessing: "Real-time",
      security: "Enterprise Grade"
    },
    screenshots: [
      {
        title: "Dashboard View",
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      },
      {
        title: "Task Board",
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      }
    ],
    callToAction: {
      title: "Supercharge Your Team's Productivity",
      subtitle: "Join thousands of teams who have transformed their workflow. Start managing tasks more efficiently today.",
      buttons: [
        { label: "GET STARTED FREE", icon: "ArrowRight" },
        { label: "WATCH DEMO", icon: "ExternalLink" }
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
