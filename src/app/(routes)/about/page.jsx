import React from 'react';

// Navbar Component

// Curved Swirl Decoration Component
const CurvedSwirl = () => {
  return (
    <div className="absolute top-0 right-0 w-64 h-64 opacity-10 overflow-hidden">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20C80 20 100 40 120 60C140 80 160 100 180 120C160 140 140 160 120 140C100 120 80 100 60 120C40 140 20 120 20 100C20 80 30 60 50 40C70 20 50 20 50 20Z"
          stroke="#000000"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M30 180C60 160 80 140 100 120C120 100 140 80 160 100C180 120 160 140 140 160C120 180 100 160 80 180C60 200 40 180 30 180Z"
          stroke="#000000"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const highlightWords = ['creators', 'designers', 'problem solvers'];
  const title = "Meet our team of creators, designers, and world-class problem solvers";
  
  const renderHighlightedTitle = () => {
    let result = title;
    highlightWords.forEach(word => {
      result = result.replace(word, `<em class="italic font-medium">${word}</em>`);
    });
    return result;
  };

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
      <CurvedSwirl />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: renderHighlightedTitle() }}
          />
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            To be the company our customers want us to be, it takes an eclectic group of passionate operators. 
            Get to know the people leading the way at Untitled.
          </p>
        </div>
      </div>
    </section>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member, isFounder = false }) => {
  const cardClasses = isFounder 
    ? "group cursor-pointer"
    : "group cursor-pointer";
    
  const imageContainerClasses = isFounder
    ? "relative overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-square lg:aspect-[4/3]"
    : "relative overflow-hidden rounded-2xl mb-4 bg-gray-100 aspect-square";
    
  const textContainerClasses = isFounder
    ? "text-center"
    : "text-center";
    
  const nameClasses = isFounder
    ? "text-2xl lg:text-3xl font-semibold text-black mb-3 group-hover:text-gray-700 transition-colors duration-200"
    : "text-lg font-semibold text-black mb-2 group-hover:text-gray-700 transition-colors duration-200";
    
  const roleClasses = isFounder
    ? "text-gray-600 text-base"
    : "text-gray-600 text-sm";
    
  const initialsClasses = isFounder
    ? "flex items-center justify-center h-full text-gray-500 text-7xl lg:text-8xl font-bold"
    : "flex items-center justify-center h-full text-gray-500 text-5xl font-bold";

  return (
    <div className={cardClasses}>
      <div className={imageContainerClasses}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-300 ease-out">
          <div className={initialsClasses}>
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
      <div className={textContainerClasses}>
        <h3 className={nameClasses}>
          {member.name}
        </h3>
        <p className={roleClasses}>
          {member.role}
        </p>
      </div>
    </div>
  );
};

// Team Section Component
const TeamSection = () => {
  const founders = [
    { name: "Mia Ward", role: "Founder & CEO", image: "mia.jpg", type: "founder" },
    { name: "Phoenix Baker", role: "Co-Founder & CTO", image: "phoenix.jpg", type: "founder" }
  ];

  const employees = [
    { name: "Lana Steiner", role: "Chief Operating Officer", image: "lana.jpg", type: "employee" },
    { name: "John Carter", role: "Product Designer", image: "john.jpg", type: "employee" },
    { name: "Alex Morgan", role: "Marketing Manager", image: "alex.jpg", type: "employee" },
    { name: "Sophia Turner", role: "Customer Success Lead", image: "sophia.jpg", type: "employee" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founders Section - Larger Cards */}
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12 text-center">Our Founders</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <TeamMemberCard key={`founder-${index}`} member={founder} isFounder={true} />
            ))}
          </div>
        </div>
        
        {/* Employees Section - Smaller Cards */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {employees.map((employee, index) => (
              <TeamMemberCard key={`employee-${index}`} member={employee} isFounder={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © Untitled. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// How We Work Section Component
const HowWeWorkSection = () => {
  const workProcesses = [
    {
      title: "Web App Development",
      description: "We create powerful, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. Our process includes requirement analysis, design, development, testing, and deployment to ensure robust and user-friendly solutions.",
      icon: "🌐"
    },
    {
      title: "Mobile App Development",
      description: "We build native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and native technologies. From concept to app store deployment, we handle the entire mobile development lifecycle.",
      icon: "📱"
    },
    {
      title: "UI/UX Design",
      description: "Our design process focuses on creating intuitive, beautiful, and user-centered interfaces. We conduct user research, create wireframes and prototypes, and deliver stunning designs that enhance user experience.",
      icon: "🎨"
    },
    {
      title: "Quality Assurance",
      description: "We ensure your applications are bug-free and perform optimally through comprehensive testing strategies including manual testing, automated testing, and performance optimization.",
      icon: "🔍"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">How We Work</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures we deliver exceptional results for every project, from concept to completion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workProcesses.map((process, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-6">{process.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-4">{process.title}</h3>
              <p className="text-gray-600 leading-relaxed">{process.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// What We Do Section Component
const WhatWeDoSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Creating responsive, fast, and secure websites that drive business growth and deliver exceptional user experiences across all devices.",
      features: ["Frontend Development", "Backend Development", "E-commerce Solutions", "Progressive Web Apps"]
    },
    {
      title: "Mobile Development",
      description: "Transforming ideas into intuitive mobile applications that engage users and accelerate your business in the mobile-first world.",
      features: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Store Optimization"]
    },
    {
      title: "Digital Marketing",
      description: "Boosting your online presence and driving growth through strategic digital marketing campaigns and data-driven approaches.",
      features: ["SEO Optimization", "Social Media Marketing", "Content Marketing", "PPC Advertising"]
    },
    {
      title: "UI/UX Design",
      description: "Crafting beautiful, user-centered designs that captivate and convert users while achieving your business objectives.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      title: "Brand Strategy",
      description: "Building strong brand identities that resonate with your target audience and create lasting impressions in the market.",
      features: ["Brand Identity", "Logo Design", "Brand Guidelines", "Market Research"]
    },
    {
      title: "Consulting",
      description: "Providing expert guidance and strategic advice to help your business leverage technology effectively and achieve your goals.",
      features: ["Technical Consulting", "Strategy Planning", "Process Optimization", "Digital Transformation"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">What We Do</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the modern landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-black mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <TeamSection />
      <HowWeWorkSection />
      <WhatWeDoSection />
      <Footer />
    </div>
  );
};

export default AboutPage;