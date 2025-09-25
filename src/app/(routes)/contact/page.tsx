"use client"
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';


export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: ''
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 2000);
      }
    )()
  }, []);

  const services = [
    'Site from scratch',
    'UX/UI design',
    'Product design',
    'Webflow site',
    'Motion design',
    'Branding',
    'Mobile development'
  ];

  const budgetRanges = [
    '10-20k',
    '30-40k',
    '40-50k',
    '50-100k',
    '> 100k'
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      ...formData,
      services: selectedServices,
      budget: selectedBudget
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Hey! Tell us all<br />
            the things
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let&apos;s create something amazing together. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Services Selection */}
          <div>
            <p className="text-xl mb-8 font-medium">I&apos;m interested in...</p>
            <div className="flex flex-wrap gap-4">
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    selectedServices.includes(service)
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full text-xl py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none placeholder-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full text-xl py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none placeholder-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Project Description */}
          <div>
            <textarea
              name="projectDescription"
              placeholder="Tell us about your project"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full text-xl py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none placeholder-gray-400 resize-none transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Budget Selection */}
          <div>
            <h3 className="text-xl mb-6">Project budget (USD)</h3>
            <div className="flex flex-wrap gap-4 mb-8">
              {budgetRanges.map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setSelectedBudget(budget)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    selectedBudget === budget
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>

          {/* File Attachment */}
          <div>
            <label className="flex items-center text-lg cursor-pointer group hover:text-gray-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-3 transform rotate-45 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="group-hover:underline decoration-2 underline-offset-4">Add attachment</span>
              <input type="file" className="hidden" multiple />
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="relative px-12 py-4 bg-black text-white rounded-full text-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">Send request</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-0 transition-opacity duration-300 ease-in-out"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: isHovered ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,1) 100%)' : 'transparent'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  boxShadow: isHovered ? 'inset 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(0,0,0,0.3)' : 'none',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-sm text-gray-500 pt-8">
            <p>
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="#" className="underline hover:text-black">Privacy Policy</a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-black">Terms of Service</a>{' '}
              apply.
            </p>
          </div>
        </form>

        {/* Avatar in corner */}
        <div className="fixed bottom-8 right-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center">
              👤
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}