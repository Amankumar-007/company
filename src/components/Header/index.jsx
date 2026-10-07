'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ChevronDown, Rocket, Building2, ShoppingCart, Wallet, Activity, BrainCircuit } from 'lucide-react';
import Magnetic from '../../common/Magnetic';
import styles from './style.module.scss';
import MobileMenu from './MobileMenu';
import { solutionsData } from '@/data/solutions';

const navItems = [
  { title: 'Services', href: '/services' },
  { title: 'Solutions', href: '/solutions', hasMegaMenu: true },
  { title: 'Projects', href: '/projects' },
  { title: 'Case Studies', href: '/case-studies' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const headerRef = useRef(null);
  const pathname = usePathname();

  // Derived values — safe before effects
  const isAdmin = pathname?.startsWith('/admin');
  const isHome = pathname === '/';
  const isLocationPage = pathname && (
    pathname.startsWith('/web-development-company-') ||
    pathname.includes('-agency-in-')
  );

  const isSolutionsPage = pathname?.startsWith('/solutions');

  // ─── ALL hooks MUST be called unconditionally, before any early return ───

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close mobile menu on window resize above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.navItemContainer}`)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 25);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance animation — homepage only, after preloader exits
  useEffect(() => {
    if (isAdmin || !headerRef.current) return;

    // On mobile, let pure CSS control the floating pill so transforms are never overwritten
    if (window.innerWidth < 769) {
      gsap.killTweensOf([headerRef.current, '.nav-link-inner', '.nav-logo-inner', '.nav-cta-inner']);
      gsap.set([headerRef.current, '.nav-link-inner', '.nav-logo-inner', '.nav-cta-inner'], { clearProps: 'all' });
      return;
    }

    if (!isHome) {
      // Kill any in-flight home-page tweens and remove their inline styles
      gsap.killTweensOf([headerRef.current, '.nav-link-inner', '.nav-logo-inner', '.nav-cta-inner']);
      gsap.set([headerRef.current, '.nav-link-inner', '.nav-logo-inner', '.nav-cta-inner'], { clearProps: 'all' });
      return;
    }

    // Homepage desktop only: quick staggered reveal on load
    gsap.set(headerRef.current, { y: -60, opacity: 0 });
    gsap.set('.nav-link-inner', { y: '110%', opacity: 0 });
    gsap.set('.nav-logo-inner', { y: '110%', opacity: 0 });
    gsap.set('.nav-cta-inner', { opacity: 0, y: 10 });

    const timer = setTimeout(() => {
      const tl = gsap.timeline();
      tl.to(headerRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' })
        .to('.nav-logo-inner', { y: '0%', opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.5')
        .to('.nav-link-inner', { y: '0%', opacity: 1, duration: 0.8, ease: 'power4.out', stagger: 0.07 }, '-=0.6')
        .to('.nav-cta-inner', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isAdmin]);

  // ─── Early return AFTER all hooks ───
  if (isAdmin) return null;

  const isServicesPage = pathname === '/services' || pathname?.startsWith('/services/');
  const isServicesHub = pathname === '/services';

  // Header requires absolute styling on specific pages (transparent overlay on dark heroes)
  const needsAbsoluteHeader = isHome || pathname?.startsWith('/blog') || isLocationPage || isSolutionsPage || isServicesPage;
  const needsWhiteText = isHome;

  return (
    <>
      {/* Plain header — no motion wrapper, GSAP handles entrance on desktop */}
      <header
        ref={headerRef}
        className={`${styles.header} ${needsAbsoluteHeader ? styles.absoluteHeader : ''} ${isScrolled ? styles.scrolled : ''} ${isMobileMenuOpen ? styles.headerMenuOpen : ''}`}
      >
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <div className={`nav-logo-inner ${styles.logoContainer}`}>
                <Image
                  src="/brandlogo-clean.png"
                  alt="TW2 Logo"
                  width={977}
                  height={275}
                  priority
                  className={`${styles.logoImage} ${needsWhiteText ? styles.logoImageInverted : ''}`}
                />
                <span
                  className={styles.logoText}
                  style={{ color: needsWhiteText ? 'white' : undefined }}
                >
                  flowW
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <div 
              key={item.title}
              className={styles.navItemContainer}
            >
              <Magnetic>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.hasMegaMenu) {
                      e.preventDefault();
                      setActiveMegaMenu(activeMegaMenu === item.title ? null : item.title);
                    } else {
                      setActiveMegaMenu(null);
                    }
                  }}
                  className={`${styles.navLink} ${pathname === item.href || (item.hasMegaMenu && activeMegaMenu === item.title) ? styles.active : ''}`}
                  style={{ color: (needsWhiteText && !activeMegaMenu) ? 'white' : undefined }}
                >
                  {/* Overflow clip for slide-up reveal */}
                  <span className="overflow-hidden inline-flex items-center pb-0.5">
                    <span className="nav-link-inner inline-flex items-center gap-1.5" style={isHome ? { opacity: 0, transform: 'translateY(110%)' } : undefined}>
                      {item.title}
                      {item.hasMegaMenu && (
                        <ChevronDown 
                          size={16} 
                          strokeWidth={2.5}
                          className={activeMegaMenu === item.title ? styles.chevronOpen : styles.chevronClosed} 
                        />
                      )}
                    </span>
                  </span>
                  {/* Active indicator — CSS only, no motion */}
                  <span
                    className={styles.navIndicator}
                    style={{
                      transform: pathname === item.href ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Link>
              </Magnetic>

              {/* Mega Menu Dropdown */}
              {item.hasMegaMenu && (
                <AnimatePresence>
                  {activeMegaMenu === item.title && (
                    <motion.div
                      className={styles.megaMenu}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className={styles.megaMenuContent}>
                        <div className={styles.megaMenuHeader}>
                          <h3>Our Solutions</h3>
                          <p>Discover tailored digital solutions engineered to transform your business.</p>
                          <Link href="/solutions" className={styles.megaMenuAllLink} onClick={() => setActiveMegaMenu(null)}>
                            Explore All Solutions
                          </Link>
                        </div>
                        <div className={styles.megaMenuGrid}>
                          {solutionsData.map((solution) => (
                            <Link href={`/solutions/${solution.slug}`} key={solution.id} className={styles.megaMenuItem} onClick={() => setActiveMegaMenu(null)}>
                              <div className={styles.megaMenuItemText}>
                                <h4>{solution.title}</h4>
                                <p>{solution.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button — Minimalist 2-line pill hamburger */}
        <motion.button
          className={`${styles.mobileMenuButton} nav-cta-inner`}
          onClick={() => setIsMobileMenuOpen(true)}
          whileTap={{ scale: 0.9 }}
          aria-label="Open mobile menu"
        >
          <div className={styles.hamburger}>
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </div>
        </motion.button>
      </header>

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
