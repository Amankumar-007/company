'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import styles from './MobileMenu.module.scss';
import { solutionsData } from '@/data/solutions';

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }
};

const cardVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: -8,
    transformOrigin: 'top center'
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transformOrigin: 'top center',
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.035,
      delayChildren: 0.06
    }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -8,
    transformOrigin: 'top center',
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15 }
  }
};

export default function MobileMenu({ navItems, onClose, pathname }) {
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  // Main links excluding "Contact" (Contact is rendered as the black pill button at the bottom)
  const links = navItems.filter((item) => item.href !== '/contact');

  return (
    <>
      {/* Backdrop Dimmer Overlay */}
      <motion.div
        className={styles.overlay}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Rounded Menu Card */}
      <motion.div
        className={styles.menuCard}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Logo + Close Button */}
        <div className={styles.cardHeader}>
          <Link href="/" className={styles.cardLogo} onClick={handleLinkClick}>
            <Image
              src="/brandlogo-clean.png"
              alt="TW2 Logo"
              width={977}
              height={275}
              priority
              className={styles.cardLogoImage}
            />
          </Link>

          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            aria-label="Close navigation menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0b0d17"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>
        </div>

        {/* Section Label: "Menu" */}
        <motion.div className={styles.menuLabel} variants={itemVariants}>
          Menu
        </motion.div>

        {/* Links List */}
        <nav className={styles.navLinks}>
          {links.map((item) => {
            const isActive = pathname === item.href;
            const isSubmenuOpen = openSubmenus[item.title];

            return (
              <motion.div key={item.title} variants={itemVariants} className={styles.navItemWrapper}>
                <div className={styles.navItemRow}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    onClick={() => {
                      if (!item.hasMegaMenu) {
                        handleLinkClick();
                      }
                    }}
                  >
                    <span>{item.title}</span>
                  </Link>

                  {item.hasMegaMenu && (
                    <button
                      type="button"
                      className={styles.submenuToggle}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSubmenus((prev) => ({
                          ...prev,
                          [item.title]: !prev[item.title]
                        }));
                      }}
                      aria-label="Toggle solutions submenu"
                    >
                      <ChevronDown
                        size={20}
                        className={`${styles.chevron} ${isSubmenuOpen ? styles.chevronOpen : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* Optional Expandable Solutions Submenu */}
                {item.hasMegaMenu && (
                  <AnimatePresence>
                    {isSubmenuOpen && (
                      <motion.div
                        className={styles.submenuContainer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className={styles.submenuList}>
                          {solutionsData.map((sol) => (
                            <Link
                              key={sol.id}
                              href={`/solutions/${sol.slug}`}
                              className={styles.submenuItem}
                              onClick={handleLinkClick}
                            >
                              <span
                                className={styles.submenuDot}
                                style={{ backgroundColor: sol.color || '#455ce9' }}
                              />
                              <span className={styles.submenuTitle}>{sol.title}</span>
                            </Link>
                          ))}
                          <Link
                            href="/solutions"
                            className={styles.submenuAllLink}
                            onClick={handleLinkClick}
                          >
                            View All Solutions &rarr;
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </nav>

        {/* Contacts Pill Button */}
        <motion.div className={styles.cardFooter} variants={itemVariants}>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} style={{ display: 'inline-block' }}>
            <Link
              href="/contact"
              className={styles.contactsButton}
              onClick={handleLinkClick}
            >
              Contacts
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
