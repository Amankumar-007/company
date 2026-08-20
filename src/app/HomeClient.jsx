'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence, motionValue } from 'framer-motion';
import Preloader from '../components/Preloader';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import HeroSection from '@/components/HeroSection';
import Card from '../components/Card';
import VideoComponent from '@/components/VideoComponent';
import HomeSeoSection from '../components/HomeSeoSection';
import ServicesCardsSection from '../components/ServicesCardsSection';

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
      <Card
        title="TomatoAI"
        description="All-in-one AI platform offering curated intelligent tools for content creation, prompt optimization, and workflow automation."
        src="/tomatoai.in_20260814_114450/hero_desktop.png"
        mobileSrc="/tomatoai.in_20260814_114450/hero_mobile.png"
        url="/case-studies/tomatoai"
        color="#f0f0f0"
        i={0}
        progress={progress}
        range={[0, 0.33]}
        targetScale={1.2}
      />
      <Card
        title="Awasdhara"
        description="Full-stack luxury plotted real estate platform connecting buyers, investors, and developers across India with high-appreciation inventory."
        src="/awasdhara.in_20260814_114713/hero_desktop.png"
        mobileSrc="/awasdhara.in_20260814_114713/hero_mobile.png"
        url="/case-studies/awasdhara"
        color="#e8f4f8"
        i={1}
        progress={progress}
        range={[0.33, 0.66]}
        targetScale={1.2}
      />
      <Card
        title="SnippetsX"
        description="Real-time collaborative code sharing and sandboxed execution workspace for developer teams, live interviews, and rapid prototyping."
        src="/snippetsx.com_20260814_114421/hero_desktop.png"
        mobileSrc="/snippetsx.com_20260814_114421/hero_mobile.png"
        url="/case-studies/snippetsx"
        color="#f8f0e8"
        i={2}
        progress={progress}
        range={[0.66, 0.9]}
        targetScale={1.2}
      />
      <Card
        title="ShockMe"
        description="Next-generation cinema discovery and streaming entertainment platform featuring curated mood finders, trailer playback, and personalized collections."
        src="/shockme.vercel.app_20260814_114537/hero_desktop.png"
        mobileSrc="/shockme.vercel.app_20260814_114537/hero_mobile.png"
        url="/case-studies/shockme"
        color="#f8e8f8"
        i={3}
        progress={progress}
        range={[0.9, 1.1]}
        targetScale={1.2}
      />
      <SlidingImages />
    </main>
  );
}
