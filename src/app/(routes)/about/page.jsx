'use client';
import React, { useEffect, useState, useRef } from 'react';
import styles from './page.module.scss';
import { Globe, Smartphone, Palette, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';

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

  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo('.about-hero-title-line',
        { opacity: 0, y: '110%' },
        { opacity: 1, y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.12 }
      )
      tl.fromTo('.about-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
    }
  }, []);

  return (
    <section ref={heroRef} className="relative py-18 lg:py-22 bg-white overflow-hidden" data-scroll-section>
      <CurvedSwirl />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="about-hero-title-line inline-block opacity-0 translate-y-[110%]">Meet our team of</div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="about-hero-title-line inline-block opacity-0 translate-y-[110%]"><em className="italic font-medium">creators</em>, <em className="italic font-medium">designers</em>,</div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="about-hero-title-line inline-block opacity-0 translate-y-[110%]">and world-class <em className="italic font-medium">problem solvers</em></div>
            </div>
          </h1>
          <p className="about-hero-sub text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto opacity-0">
            To be the company our customers want us to be, it takes an eclectic group of passionate operators.
            Get to know the people leading the way at TwoFloww.
          </p>
        </div>
      </div>
    </section>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }) => {
  const cardClasses = "group cursor-pointer";

  const imageContainerClasses = "relative overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-square";

  const textContainerClasses = "text-center";

  const nameClasses = "text-2xl font-semibold text-black mb-2 group-hover:text-gray-700 transition-colors duration-200";

  const roleClasses = "text-gray-600 text-base";

  const initialsClasses = "flex items-center justify-center h-full text-gray-500 text-6xl font-bold";

  return (
    <div className={cardClasses}>
      <div className={imageContainerClasses}>
        {member.image && member.image.startsWith('/') ? (
          <img
            src={member.image}
            alt={member.name}
            width={400}
            height={400}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-300 ease-out">
            <div className={initialsClasses}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}
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
  const team = [
    { name: "Aman Kumar", role: "Founder & CEO", image: "/about.PNG" },
    { name: "Anshu Kumar", role: "Co-Founder & CTO", image: "/anshu.jpg" },
    { name: "Mahak Kushwah", role: "Chief Operating Officer", image: "/mahak.jpg" },
    { name: "Hariom", role: "Product Designer", image: "/hariom.jpg" },
    { name: "Sarthak Bhatnagar", role: "Marketing Manager", image: "/sarthak.jpg" },
    { name: "Mohit Kumar", role: "Customer Success Lead", image: "/mohit.jpg" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-16 text-center">Meet Our Family</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {team.map((member, index) => (
              <TeamMemberCard key={`member-${index}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



// How We Work Section Component
const HowWeWorkSection = () => {
  const workProcesses = [
    {
      title: "Web App Development",
      description: "We create powerful, scalable web applications using cutting-edge technologies like React, Next.js, and Node.js. Our process includes requirement analysis, design, development, testing, and deployment to ensure robust and user-friendly solutions.",
      icon: <Globe className="w-12 h-12 text-black" strokeWidth={1.5} />
    },
    {
      title: "Mobile App Development",
      description: "We build native and cross-platform mobile applications for iOS and Android using React Native, Flutter, and native technologies. From concept to app store deployment, we handle the entire mobile development lifecycle.",
      icon: <Smartphone className="w-12 h-12 text-black" strokeWidth={1.5} />
    },
    {
      title: "UI/UX Design",
      description: "Our design process focuses on creating intuitive, beautiful, and user-centered interfaces. We conduct user research, create wireframes and prototypes, and deliver stunning designs that enhance user experience.",
      icon: <Palette className="w-12 h-12 text-black" strokeWidth={1.5} />
    },
    {
      title: "Quality Assurance",
      description: "We ensure your applications are bug-free and perform optimally through comprehensive testing strategies including manual testing, automated testing, and performance optimization.",
      icon: <ShieldCheck className="w-12 h-12 text-black" strokeWidth={1.5} />
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
              <div className="mb-6">{process.icon}</div>
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 1000);
  }, []);

  return (
    <div className={`${styles.main} min-h-screen bg-white`}>
      <HeroSection />
      <TeamSection />
      <HowWeWorkSection />
      <WhatWeDoSection />
    </div>
  );
};

export default AboutPage;