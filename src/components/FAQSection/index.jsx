'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "What types of businesses do you work with?",
    answer: "We partner with startups, scale-ups, and established enterprises across various industries including E-commerce, Healthcare, FinTech, and Real Estate in Delhi NCR and globally."
  },
  {
    question: "How does your digital consulting process work?",
    answer: "Our process begins with a deep-dive discovery phase, followed by strategic planning, UI/UX design, agile development sprints, and continuous SEO optimization."
  },
  {
    question: "What makes your web development solutions different?",
    answer: "We don't just build websites; we engineer scalable digital products using modern stacks like Next.js and React, with a strong focus on Core Web Vitals and SEO from day one."
  },
  {
    question: "Do I need to have technical knowledge to work with you?",
    answer: "Not at all. We act as your end-to-end technology partner. We handle all the technical complexities while keeping you updated with transparent, jargon-free communication."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "While web development provides immediate functional results, organic SEO typically takes 3 to 6 months to show significant traffic growth and ROI depending on the competition."
  }
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-20 lg:py-32 bg-white border-t border-gray-100 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-3 mb-6 text-sm font-bold tracking-widest uppercase text-gray-900">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              FAQ
            </div>
            <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 leading-tight tracking-tight mb-4">
              Frequently<br className="hidden lg:block" /> asked questions
            </h2>
            <p className="text-gray-500 mb-12 text-lg">
              Everything you need to know about our digital agency and web solutions — from strategy to implementation.
            </p>

            <div className="bg-[#111] rounded-[2rem] p-8 text-white">
              <h3 className="text-xl font-medium mb-8">Still have questions?</h3>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#c3f53c] text-black px-5 py-3 rounded-full font-semibold hover:bg-[#b0df36] transition-colors"
              >
                <span className="tracking-wide">CONTACT US</span>
                <span className="bg-black text-white p-1.5 rounded-full flex-shrink-0">
                  <svg className="w-3 h-3 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#F4F4F5] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div className="p-6 lg:p-8 flex items-center justify-between">
                    <h4 className="text-lg lg:text-xl font-medium text-gray-900 pr-8">
                      {faq.question}
                    </h4>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 shadow-sm ${isOpen ? 'rotate-45' : ''}`}>
                      <Plus className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 lg:px-8 pb-8 pt-0 text-gray-600 leading-relaxed text-lg">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
