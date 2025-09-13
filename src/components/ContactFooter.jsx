import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '↗' },
    { name: 'Facebook', href: '#', icon: '↗' },
    { name: 'Instagram', href: '#', icon: '↗' },
    { name: 'Bluesky', href: '#', icon: '↗' },
  ];

  const footerLinks = [
    { name: 'Contact', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ];

  const sectors = [
    'Agencies',
    'SaaS and Tech',
    'B2B Transformation',
    'Healthcare',
    'Media & Entertainment',
    'Retail',
  ];

  const awards = [
    { name: 'DAN', subtitle: 'DIGITAL AGENCY NETWORK' },
    { name: 'Clutch', subtitle: 'FIRMS THAT DELIVER' },
    { name: 'AWWWARDS', subtitle: 'HONORABLE MENTION' },
    { name: 'CSS', subtitle: 'DESIGN AWARDS' },
  ];

  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          {/* Left Side - Logo and Contact */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 mb-8 lg:mb-0">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 border-2 border-white flex items-center justify-center mr-8">
                <div className="text-white font-bold text-sm leading-tight">
                  <div>K O</div>
                  <div>T A</div>
                </div>
              </div>
              <div className="text-4xl lg:text-5xl font-light">
                hello@kota.co.uk
              </div>
            </div>
          </div>

          {/* Right Side - Awards */}
          <div className="flex items-center gap-8">
            {awards.map((award, index) => (
              <div key={index} className="text-center">
                <div className="text-white font-bold text-lg mb-1">
                  {award.name}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">
                  {award.subtitle}
                </div>
              </div>
            ))}
            {/* Cyber Essentials Badge */}
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex flex-col items-center justify-center text-white text-xs font-bold">
              <div>CYBER</div>
              <div>ESSENTIALS</div>
              <div className="text-lg">✓</div>
              <div className="text-xs">CERTIFIED</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
          {/* Left Bottom */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8 lg:mb-0">
            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200 flex items-center gap-2"
                >
                  <span>{link.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Footer Links */}
            <div className="flex gap-6">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-8 lg:mb-0">
            <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
              Sign up to our newsletter
            </button>
          </div>
        </div>

        {/* Sectors and Copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 border-t border-gray-800 mt-8">
          {/* Sectors */}
          <div className="flex flex-wrap gap-4 mb-4 lg:mb-0">
            <span className="text-white">Our sectors:</span>
            {sectors.map((sector, index) => (
              <span
                key={index}
                className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-white hover:text-white transition-all duration-200 cursor-pointer"
              >
                {sector}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-400">
            © KOTA 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;