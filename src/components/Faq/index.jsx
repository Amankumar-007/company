'use client';

import { useState, useEffect } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [animatedItems, setAnimatedItems] = useState(new Set());

  const faqData = [
    {
      id: 1,
      question: "How long does it take to build a website?",
      answer: "Typically, a standard business website takes 2-4 weeks, while complex e-commerce or custom applications can take 6-12 weeks. The timeline depends on your specific requirements, content readiness, and feedback response time."
    },
    {
      id: 2,
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes! We offer comprehensive maintenance packages including security updates, content updates, performance optimization, and technical support. Our plans start from basic monthly maintenance to full-service packages."
    },
    {
      id: 3,
      question: "Can you help improve my website's SEO ranking?",
      answer: "Absolutely! Our SEO services include keyword research, on-page optimization, technical SEO, content strategy, and link building. Most clients see improvements in 3-6 months with our proven strategies."
    },
    {
      id: 4,
      question: "Do you develop mobile apps for both iOS and Android?",
      answer: "Yes, we develop native apps for iOS and Android, as well as cross-platform solutions using React Native and Flutter. We'll recommend the best approach based on your budget, timeline, and requirements."
    },
    {
      id: 5,
      question: "What social media platforms do you manage?",
      answer: "We manage all major platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, and YouTube. Our services include content creation, posting schedules, community management, and performance analytics."
    },
    {
      id: 6,
      question: "What's included in your digital marketing services?",
      answer: "Our digital marketing includes PPC advertising, social media marketing, email campaigns, content marketing, conversion optimization, and detailed analytics reporting. We create custom strategies based on your business goals."
    },
    {
      id: 7,
      question: "How do you ensure project quality and timelines?",
      answer: "We use agile methodology with regular check-ins, milestone reviews, and transparent project management tools. You'll receive weekly updates and have access to a dedicated project manager throughout the entire process."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id);
            setAnimatedItems(prev => new Set(prev).add(itemId));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const items = document.querySelectorAll('[data-scroll-animate]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <p className={styles.faqSubtitle}>
          Everything you need to know about our services, pricing, process, and support — all in one place.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.faqItem} ${animatedItems.has(item.id) ? styles.animate : ''}`}
            data-scroll-animate
            data-id={item.id}
            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
          >
            <button
              className={`${styles.faqQuestion} ${activeItem === item.id ? styles.active : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              {item.question}
              <div className={`${styles.faqArrow} ${activeItem === item.id ? styles.active : ''}`}>
                <span className={styles.arrowIcon}></span>
              </div>
            </button>
            <div className={`${styles.faqAnswer} ${activeItem === item.id ? styles.active : ''}`}>
              <div className={styles.faqAnswerContent}>
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;