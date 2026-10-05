'use client';
import styles from './page.module.scss'
import { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motionValue } from 'framer-motion';
import Preloader from '../components/Preloader';
import Card from '../components/Card';
import dynamic from 'next/dynamic';
const HeroSection = dynamic(() => import('@/components/HeroSection'));
const Projects = dynamic(() => import('../components/Projects'));
const Description = dynamic(() => import('../components/Description'));
const SlidingImages = dynamic(() => import('../components/SlidingImages'));
const VideoComponent = dynamic(() => import('@/components/VideoComponent'));
const HomeSeoSection = dynamic(() => import('../components/HomeSeoSection'));
const ServicesCardsSection = dynamic(() => import('../components/ServicesCardsSection'));
import { projects } from '../data/projects';

const HOME_PROJECT_SLUGS = ['tomatoai', 'snippetsx', 'awasdhara', 'gamersground'];

const cardRanges = [
  [0, 0.33],
  [0.33, 0.66],
  [0.66, 0.9],
  [0.9, 1.1]
];

const cardColors = ['#f0f0f0', '#e8f4f8', '#f8f0e8', '#ecfdf5'];

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);
  const progress = motionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const featuredProjects = useMemo(() =>
    HOME_PROJECT_SLUGS
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter(Boolean),
  []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <HeroSection isLoading={isLoading} />
      <VideoComponent />
      <Description />
      <Projects />
      <ServicesCardsSection />
      <HomeSeoSection />

      {/* Featured Projects Stack */}
      {featuredProjects.map((project, i) => (
        <Card
          key={project.slug || i}
          title={project.title}
          subtitle={project.subtitle}
          category={project.category}
          description={project.description}
          metrics={project.metrics}
          technologies={project.technologies}
          features={project.features}
          src={project.desktopImage || project.image}
          mobileSrc={project.mobileImage}
          url={`/case-studies/${project.slug}`}
          liveLink={project.liveLink}
          color={cardColors[i] || '#f0f0f0'}
          i={i}
          progress={progress}
          range={cardRanges[i] || [i * 0.25, (i + 1) * 0.25]}
          targetScale={1.2}
        />
      ))}
      <SlidingImages />
    </main>
  );
}
