"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer
      style={{

        borderRadius: '2.5rem 2.5rem 0 0',
        overflow: 'hidden',
        position: 'relative',
      }}
      className="w-full text-[#0B0D17] font-sans"
    >
      {/* Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 pt-20 pb-16 relative z-10">

        {/* Become an Affiliate Card (3D Glassmorphic floating card) */}


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start justify-between">

          {/* LEFT — Newsletter + Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <h3 className="text-[#0B0D17] font-semibold text-[16px] md:text-[17px] leading-tight max-w-[340px]">
              Join our newsletter to stay up to date on the latest news and updates.
            </h3>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full p-1.5 border border-gray-200/50 shadow-sm max-w-[420px] w-full relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-5 pr-32 py-3 text-[14px] bg-transparent outline-none text-[#0B0D17] placeholder-gray-400 font-sans"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#0A2535] hover:bg-[#12364c] text-white px-6 rounded-full font-medium text-[13px] tracking-wide transition-all duration-300 active:scale-95"
              >
                Subscribe
              </button>
            </form>

            {/* Disclaimer text */}
            <p className="text-[12px] text-gray-500/90 leading-relaxed max-w-[380px] -mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
            </p>

            {/* Social Icons with border outline */}
            <div className="flex items-center gap-3.5 mt-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/twofloww"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#DE5D26] hover:text-[#DE5D26] flex items-center justify-center text-gray-600 hover:scale-105 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/twofloww"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#DE5D26] hover:text-[#DE5D26] flex items-center justify-center text-gray-600 hover:scale-105 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/twofloww"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#DE5D26] hover:text-[#DE5D26] flex items-center justify-center text-gray-600 hover:scale-105 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com/twofloww"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full border border-gray-300 hover:border-[#DE5D26] hover:text-[#DE5D26] flex items-center justify-center text-gray-600 hover:scale-105 transition-all duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L19.083 19.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT — 4 Sitemap Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8 justify-between w-full">

            {/* Sitemap */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#0B0D17] font-semibold text-[15px] tracking-wide mb-2">Sitemap</h4>
              <a href="/about" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">About Us</a>
              <a href="/services" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Services</a>
              <a href="/projects" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Projects</a>
              <a href="/case-studies" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Case Studies</a>
              <a href="/industries" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Industries</a>
              <a href="/locations" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Locations</a>
              <a href="/blog" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Blog</a>
              <a href="/contact" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Contact</a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#0B0D17] font-semibold text-[15px] tracking-wide mb-2">Contact</h4>
              <a
                href="mailto:hello@twofloww.in"
                className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                hello@twofloww.in
              </a>
              <a
                href="tel:+917906753589"
                className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 79067 53589
              </a>
              <span className="text-gray-600 text-[14px] font-medium flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
                Noida, India
              </span>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#0B0D17] font-semibold text-[15px] tracking-wide mb-2">Services</h4>
              <a href="#" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Web Development</a>
              <a href="#" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Mobile Apps</a>
              <a href="#" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">UI/UX Design</a>
              <a href="#" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">SEO & Marketing</a>
            </div>

            {/* Areas We Serve */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#0B0D17] font-semibold text-[15px] tracking-wide mb-2">Areas We Serve</h4>
              <Link href="/web-development-company-noida" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Noida</Link>
              <Link href="/web-development-company-delhi" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Delhi</Link>
              <Link href="/web-development-company-mumbai" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Mumbai</Link>
              <Link href="/web-development-company-bangalore" className="text-gray-600 hover:text-[#DE5D26] text-[14px] transition-colors font-medium">Bangalore</Link>
              <Link href="/locations" className="text-[#DE5D26] hover:underline text-[13px] font-semibold mt-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>View all &rarr;</Link>
            </div>

          </div>

        </div>

        {/* Bottom Logo section */}
        <div className="w-full overflow-hidden select-none pointer-events-none mt-16 flex items-center justify-center relative z-10">
          <p
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
              fontWeight: 900,
              color: '#DE5D26',
              fontSize: 'clamp(50px, 12.5vw, 190px)',
              lineHeight: '0.86',
              letterSpacing: '-0.04em',
              whiteSpace: 'nowrap',
            }}
            className="text-center font-black relative flex items-center justify-center"
          >
            twofloww
            <span
              style={{
                fontSize: '0.14em',
                border: '2px solid #DE5D26',
                borderRadius: '50%',
                width: '1.25em',
                height: '1.25em',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                fontWeight: 800,
                transform: 'translateY(-0.7em)',
                marginLeft: '0.08em',
              }}
              className="pb-0.5"
            >
              R
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}