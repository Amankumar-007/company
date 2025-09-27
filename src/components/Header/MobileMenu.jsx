'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Magnetic from '../../common/Magnetic';
import styles from './MobileMenu.module.scss';

const menuVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const mobileMenuVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 200,
      duration: 0.4
    }
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 200,
      duration: 0.3
    }
  }
};

const menuItemVariants = {
  initial: { x: 30, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    x: 30, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export default function MobileMenu({ navItems, onClose, pathname, isDesktop = false }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Only prevent body scroll on mobile, not desktop overlay
    if (!isDesktop) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!isDesktop) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [onClose, isDesktop]);

  const handleLinkClick = () => {
    onClose();
  };

  if (isDesktop) {
    // Desktop overlay menu
    return (
      <>
        {/* Desktop Overlay */}
        <motion.div
          className={styles.desktopOverlay}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
        />
        
        {/* Desktop Menu Panel */}
        <motion.div
          className={styles.desktopMenuPanel}
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div 
            className={styles.desktopMenuHeader}
            variants={menuItemVariants}
          >
            <h2 className={styles.desktopMenuTitle}>Navigation</h2>
            <motion.button
              className={styles.desktopCloseButton}
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </motion.div>

          <nav className={styles.desktopNavItems}>
            {navItems.map((item, index) => (
              <Magnetic key={item.title}>
                <motion.a
                  href={item.href}
                  className={`${styles.desktopNavItem} ${pathname === item.href ? styles.active : ''}`}
                  variants={menuItemVariants}
                  custom={index}
                  onClick={handleLinkClick}
                  whileHover={{ 
                    scale: 1.05,
                    x: 10,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={styles.desktopNavText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {item.title}
                  </motion.span>
                  <motion.div
                    className={styles.desktopNavIndicator}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                  />
                </motion.a>
              </Magnetic>
            ))}
          </nav>
        </motion.div>
      </>
    );
  }

  // Mobile menu (existing functionality)
  return (
    <>
      {/* Mobile Overlay */}
      <motion.div
        className={styles.overlay}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />

      {/* Mobile Menu Container */}
      <motion.div
        className={styles.mobileMenu}
        variants={mobileMenuVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Mobile Menu Header */}
        <motion.div 
          className={styles.menuHeader}
          variants={menuItemVariants}
        >
          <h2 className={styles.menuTitle}>Menu</h2>
          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </motion.div>

        {/* Mobile Navigation Items */}
        <nav className={styles.navItems}>
          {navItems.map((item, index) => (
            <Magnetic key={item.title}>
              <motion.a
                href={item.href}
                className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                variants={menuItemVariants}
                custom={index}
                onClick={handleLinkClick}
                whileHover={{ 
                  scale: 1.02,
                  x: -5,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className={styles.navText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.title}
                </motion.span>
                <motion.div
                  className={styles.navIndicator}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                />
              </motion.a>
            </Magnetic>
          ))}
        </nav>

        {/* Mobile Menu Footer */}
        <motion.div 
          className={styles.menuFooter}
          variants={menuItemVariants}
        >
          <div className={styles.contactInfo}>
            <p className={styles.contactLabel}>Get in touch</p>
            <a href="mailto:hello@company.com" className={styles.contactLink}>
              hello@company.com
            </a>
          </div>
          <div className={styles.socialLinks}>
            <Magnetic>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="#"
                className={styles.socialLink}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
