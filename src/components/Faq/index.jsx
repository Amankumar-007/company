'use client';

import { useState, useEffect } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [animatedItems, setAnimatedItems] = useState(new Set());

  const faqData = [
    {
      id: 1,
      question: "How much does website development cost in Delhi NCR?",
      answer: "Website development cost in Delhi NCR depends on complexity. A standard business website starts from ₹25,000, a custom web application ranges from ₹50,000 to ₹2,00,000, and a full-scale e-commerce or on-demand platform costs ₹2,00,000 to ₹10,00,000+. We offer a free consultation and detailed quote tailored to your specific requirements.",
    },
    {
      id: 2,
      question: "How long does it take to build a website?",
      answer: "A standard business website takes 2–4 weeks, while a custom web application or e-commerce store typically takes 6–12 weeks. On-demand apps (food delivery, taxi booking) take 8–16 weeks depending on features. We use agile methodology, delivering in sprints so you see real progress every week.",
    },
    {
      id: 3,
      question: "Do you develop food delivery apps like Zomato or Swiggy?",
      answer: "Yes! TwoFloww specializes in on-demand app development including food delivery apps, grocery delivery apps, taxi booking apps (Uber-like), fitness apps, and more. We deliver complete solutions with a customer app, delivery partner app, restaurant/vendor panel, and a full-featured admin dashboard.",
    },
    {
      id: 4,
      question: "Do you provide SEO services in Delhi NCR?",
      answer: "Absolutely. We offer end-to-end SEO services in Delhi NCR including technical SEO, on-page optimization, local SEO, Google Business Profile management, link building, and content marketing. Most clients see measurable ranking improvements within 3–6 months using our proven, white-hat strategies.",
    },
    {
      id: 5,
      question: "Which technologies does TwoFloww use for web development?",
      answer: "We use cutting-edge technologies including Next.js, React.js, Node.js, TypeScript, MongoDB, PostgreSQL, and Tailwind CSS for web projects. For mobile apps, we use React Native and Flutter. Our tech stack is chosen for performance, scalability, and long-term SEO advantage.",
    },
    {
      id: 6,
      question: "Which cities does TwoFloww serve?",
      answer: "TwoFloww is based in Noida and serves clients across Delhi NCR (Delhi, Noida, Gurgaon, Faridabad, Ghaziabad), and pan-India in Mumbai, Bangalore, Hyderabad, Chennai, and Pune. We also work with international clients in the USA, UK, UAE, Canada, and Australia.",
    },
    {
      id: 7,
      question: "Do you develop mobile apps for both iOS and Android?",
      answer: "Yes, we develop native iOS and Android apps as well as cross-platform solutions using React Native and Flutter. We recommend the best approach based on your budget, target audience, and timeline — and we handle the full cycle from UI/UX design to App Store and Play Store deployment.",
    },
    {
      id: 8,
      question: "Do you provide ongoing support and maintenance after launch?",
      answer: "Yes! Every project includes 3 months of free post-launch support covering bug fixes, security patches, and minor updates. We also offer affordable ongoing maintenance packages for long-term performance monitoring, content updates, and feature additions.",
    },
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