'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Magnetic from '../../common/Magnetic';
import styles from './style.module.scss';
import MobileMenu from './MobileMenu';

const navItems = [
  { title: 'Services', href: '/services' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const MotionLink = motion.create ? motion.create(Link) : motion(Link);
const MotionImage = motion.create ? motion.create(Image) : motion(Image);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);
  // Derived value — NOT a hook, safe to compute before effects
  const isAdmin = pathname?.startsWith('/admin');

  // ─── ALL hooks MUST be called unconditionally, before any early return ───

  // Close mobile menu on route change — guard inside, not via early return
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Scroll listener — skip entirely on admin pages
  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  // ─── Early return AFTER all hooks are called ───
  if (isAdmin) return null;

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${pathname?.startsWith('/blog') ? styles.absoluteHeader : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Link href="/" className={styles.logoLink}>
            <motion.div className={styles.logoContainer}>
              <MotionImage
                src="/brandlogo.png"
                alt="FlowW Logo"
                width={88}
                height={88}
                priority
                className={styles.logoImage}
                whileHover={{ rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              />
              <motion.span
                className={styles.logoText}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                flow
                <span className='bg-[#7ED348]'>W</span>
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
 
        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item, index) => (
            <Magnetic key={item.title}>
              <MotionLink
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.title}
                <motion.div
                  className={styles.navIndicator}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </MotionLink>
            </Magnetic>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
        >
          <motion.div
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
            animate={isMobileMenuOpen ? 'open' : 'closed'}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            navItems={navItems}
            onClose={() => setIsMobileMenuOpen(false)}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}
