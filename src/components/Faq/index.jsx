'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';

const defaultFaqData = [
  {
    id: 1,
    category: "Pricing & Cost",
    question: "How much does website development cost in Delhi NCR?",
    answer: "Website development cost in Delhi NCR depends on project complexity. A standard business website starts from ₹25,000, custom web applications range from ₹50,000 to ₹2,00,000, and full-scale e-commerce or on-demand platforms cost ₹2,00,000 to ₹10,00,000+. We provide free consultations and itemized cost proposals with zero hidden fees.",
  },
  {
    id: 2,
    category: "Timeline",
    question: "How long does it take to build a custom website or web app?",
    answer: "A high-converting business website typically takes 2–4 weeks. Custom web applications and e-commerce stores take 6–12 weeks. On-demand platforms (food delivery, real estate portals) take 8–16 weeks. We use agile 2-week development sprints so you can review live progress continuous milestone demos.",
  },
  {
    id: 3,
    category: "Mobile Apps",
    question: "Do you develop food delivery, real estate, and live consultation apps?",
    answer: "Yes! TwoFloww specializes in full-stack on-demand mobile apps (Zomato-like food delivery, real estate listing platforms, WebRTC consultation tools, and SaaS platforms). We deliver complete ecosystems including iOS & Android client apps, driver/vendor panels, and admin control dashboards.",
  },
  {
    id: 4,
    category: "SEO & Traffic",
    question: "Do you provide organic SEO services to boost rankings in Delhi NCR?",
    answer: "Absolutely. Every site we build is engineered with technical SEO best practices (JSON-LD schemas, Core Web Vitals <90ms, semantic HTML5). We also provide ongoing white-hat local SEO, keyword ranking campaigns, backlink acquisition, and content marketing to drive consistent organic leads.",
  },
  {
    id: 5,
    category: "Tech Stack",
    question: "Which technologies does TwoFloww use for modern web applications?",
    answer: "We build using production-grade modern frameworks: Next.js, React.js, Node.js, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, and GraphQL. For mobile apps, we utilize React Native and Flutter for fast, native 60fps performance across iOS and Android.",
  },
  {
    id: 6,
    category: "Coverage",
    question: "Which locations and regions does TwoFloww serve?",
    answer: "Our core engineering studio is located in Noida (Delhi NCR), serving clients across Delhi, Noida, Gurgaon, Faridabad, Ghaziabad, Mumbai, Bangalore, and Hyderabad. We also work with international startups and enterprises across the USA, UK, UAE, Canada, and Australia.",
  },
  {
    id: 7,
    category: "Mobile Apps",
    question: "Do you build native mobile apps for both Apple iOS and Android?",
    answer: "Yes! We develop native iOS (Swift) and Android (Kotlin) apps, as well as cross-platform solutions using React Native and Flutter. We manage the entire lifecycle from UI/UX wireframing to App Store and Google Play Store submission & approval.",
  },
  {
    id: 8,
    category: "Support",
    question: "Do you provide post-launch maintenance, bug fixes, and support?",
    answer: "Yes! Every project includes 3 months of complimentary post-launch support covering bug resolution, performance monitoring, security updates, and server setup. We also offer affordable monthly retainer plans for ongoing feature enhancements and 24/7 uptime monitoring.",
  },
];

const categories = ["All", "Pricing & Cost", "Timeline", "Mobile Apps", "SEO & Traffic", "Tech Stack", "Support"];

const FAQ = ({ customFaqs = null, title = "Frequently Asked Questions", subtitle = "Everything you need to know about our services, process, technology, and support." }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(1);

  const faqsToDisplay = customFaqs || defaultFaqData;

  const filteredFaqs = faqsToDisplay.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 selection:bg-[#C3F53C] selection:text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#F6F6F6] border border-gray-200/80 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DE5D26]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-5"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-6">
          {/* Search Box */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-black focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-black cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          {!customFaqs && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-black text-white shadow-md'
                      : 'bg-[#F6F6F6] text-gray-600 hover:bg-gray-200 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl lg:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-black shadow-lg ring-1 ring-black/5'
                      : 'bg-[#F8F9FA] border-gray-200/80 hover:border-gray-400'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                        0{index + 1}
                      </span>
                      <h3
                        className="text-base sm:text-lg lg:text-xl font-medium text-black leading-snug"
                        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-black text-[#C3F53C] rotate-180' : 'bg-white border border-gray-200 text-black group-hover:border-black'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 pl-18 sm:pl-19 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100/80 mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#F8F9FA] rounded-3xl border border-gray-200">
              <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold mb-1">No matching questions found</p>
              <p className="text-xs text-gray-400">Try adjusting your search query or selected category filter.</p>
            </div>
          )}
        </div>

        {/* Interactive FAQ CTA Banner */}
        <div className="bg-[#0B0D17] rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#DE5D26]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C3F53C] block mb-2">
              Have a custom requirement?
            </span>
            <h3
              className="text-2xl sm:text-3xl font-medium tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Still have questions?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Speak directly with our lead solution architects. We respond within 2 hours.
            </p>
          </div>

          <button
            onClick={openConsultModal}
            className="relative z-10 flex items-center gap-3 bg-[#C3F53C] text-black font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-full hover:scale-105 transition-transform shadow-lg shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Our Experts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;