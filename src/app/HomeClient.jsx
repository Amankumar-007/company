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
// import FAQSection from '../components/FAQSection';
// import GlobalReach from '@/components/GlobalReach';

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
      {/* <GlobalReach lightTheme={false} /> */}
      {/* <FAQSection /> */}
      <Card
        title="TomatoAI"
        description="All-in-one AI platform offering intelligent tools for content creation, image generation, and workflow automation."
        src="locomotive.png"
        url="/case-studies/tomatoai"
        color="#f0f0f0"
        i={0}
        progress={progress}
        range={[0, 0.25]}
        targetScale={1.2}
      />
      <Card
        title="Awasdhara"
        description="Full-stack real estate platform connecting buyers, sellers, and agents across India with 360° virtual tours."
        src="google.jpg"
        url="/case-studies/awasdhara"
        color="#e8f4f8"
        i={1}
        progress={progress}
        range={[0.25, 0.5]}
        targetScale={1.2}
      />
      <Card
        title="SnippetsX"
        description="Real-time collaborative code sharing and sandboxed execution workspace for developer teams."
        src="wix.jpg"
        url="/case-studies/snippetsx"
        color="#f8f0e8"
        i={2}
        progress={progress}
        range={[0.5, 0.75]}
        targetScale={1.2}
      />
      <Card
        title="FoodFloww"
        description="On-demand food delivery & restaurant ecosystem with real-time driver tracking and dispatch management."
        src="maven.jpg"
        url="/case-studies/foodfloww"
        color="#e8f8e8"
        i={3}
        progress={progress}
        range={[0.75, 1]}
        targetScale={1.2}
      />
      <Card
        title="AstroConnect"
        description="Live astrologer consultation, Kundli generation & AI-driven horoscope platform for global users."
        src="panda.jpg"
        url="/case-studies/astroconnect"
        color="#f8e8f8"
        i={4}
        progress={progress}
        range={[0.9, 1.1]}
        targetScale={1.2}
      />
      <SlidingImages />
    </main>
  );
}

