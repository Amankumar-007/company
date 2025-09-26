import { useState } from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 rounded-t-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Contact Information and Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          {/* Left Section - Contact Info */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8 lg:mb-0">
            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <WaterFillButton 
                href="mailto:amanr3388@gmail.com"
                text="amanr3388@gmail.com"
              />
              <WaterFillButton 
                href="tel:7906753589"
                text="7906753589"
              />
            </div>
          </div>

          {/* Right Section - Navigation */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-right">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/workflow">Workflow</NavLink>
            <NavLink href="/company">Company</NavLink>
            <NavLink href="/contacts">Contacts</NavLink>
          </div>
        </div>

        {/* Company Description */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-lg mb-4">Digital Solutions for Modern Businesses</p>
          <p className="text-white max-w-3xl mx-auto">
            We specialize in creating innovative web and mobile applications that drive business growth. 
            Our team of experts delivers cutting-edge solutions tailored to your unique needs, 
            ensuring exceptional results and customer satisfaction.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-800">
          {/* Copyright */}
          <div className="flex items-center gap-8 mb-8 lg:mb-0">
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="text-gray-500">2025, TwoflowW</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <SocialButton 
              href="https://instagram.com" 
              icon={<InstagramIcon />}
              label="Instagram"
            />
            <SocialButton 
              href="https://youtube.com" 
              icon={<YouTubeIcon />}
              label="YouTube"
            />
            <SocialButton 
              href="https://github.com" 
              icon={<GitHubIcon />}
              label="GitHub"
            />
            <SocialButton 
              href="https://facebook.com" 
              icon={<FacebookIcon />}
              label="Facebook"
            />
            <SocialButton 
              href="https://dribbble.com" 
              icon={<DribbbleIcon />}
              label="Dribbble"
            />
            <SocialButton 
              href="https://behance.net" 
              icon={<BehanceIcon />}
              label="Behance"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Water Fill Button Component
function WaterFillButton({ href, text }) {
  return (
    <a 
      href={href}
      className="relative overflow-hidden px-6 py-3 border border-gray-600 rounded-full text-white transition-all duration-300 hover:border-white group"
    >
      {/* Water fill effect */}
      <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
      
      {/* Text */}
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {text}
      </span>
    </a>
  );
}

// Navigation Link Component
function NavLink({ href, children }) {
  return (
    <a 
      href={href}
      className="text-white hover:text-gray-300 transition-colors duration-300 text-lg"
    >
      {children}
    </a>
  );
}

// Social Button Component
function SocialButton({ href, icon, label }) {
  return (
    <a
      href={href}
      className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

// Social Media Icons
function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.683-.653-.126-1.542-.254-2.812-.254-.211 0-.436.008-.677.018-.014-.032-.084-.193-.154-.37a31.186 31.186 0 00-.845-2.267c1.497-.608 2.507-1.408 3.215-2.81zM12 2.259c2.83 0 5.417 1.1 7.312 2.876-.593.949-1.4 1.657-2.673 2.178a29.552 29.552 0 00-2.496-3.777c-.14-.188-.56-.667-.56-.667s.14.265.56.667a29.55 29.55 0 012.496 3.777c1.273-.521 2.08-1.229 2.673-2.178C17.417 3.359 14.83 2.259 12 2.259z"/>
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
  );
}