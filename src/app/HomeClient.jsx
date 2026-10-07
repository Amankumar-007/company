'use client';
import styles from './page.module.scss'
import { useMemo } from 'react'
import { motionValue } from 'framer-motion';
import Card from '../components/Card';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
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
  const progress = motionValue(0);

  const featuredProjects = useMemo(() =>
    HOME_PROJECT_SLUGS
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter(Boolean),
  []);

  return (
    <main className={styles.main}>
      {/* The 2s "Hello / Bonjour…" preloader used to cover the page on every
          visit, pushing LCP past 11s on mobile. The hero now renders immediately. */}
      <HeroSection />
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
