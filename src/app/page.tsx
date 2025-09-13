'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence, motionValue } from 'framer-motion';
import Preloader from '../components/Preloader';
import Card from '../components/Card/index.jsx';
import Projects from '../components/Projects';
import Description from '../components/Description';
import Contact from '../components/Contact';
import SlidingImages from '../components/SlidingImages';
import HeroSection from '../components/HeroSection';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const progress = motionValue(0);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <HeroSection />
      <Description />
      <Projects />
      <Card 
        title="Sample Project 1"
        description="This is the first sample card component to showcase the project details."
        src="locomotive.png"
        url="#"
        color="#f0f0f0"
        i={0}
        progress={progress}
        range={[0, 0.25]}
        targetScale={1.2}
      />
      <Card 
        title="Sample Project 2"
        description="This is the second sample card component to showcase the project details."
        src="google.jpg"
        url="#"
        color="#e8f4f8"
        i={1}
        progress={progress}
        range={[0.25, 0.5]}
        targetScale={1.2}
      />
      <Card 
        title="Sample Project 3"
        description="This is the third sample card component to showcase the project details."
        src="wix.jpg"
        url="#"
        color="#f8f0e8"
        i={2}
        progress={progress}
        range={[0.5, 0.75]}
        targetScale={1.2}
      />
      <Card 
        title="Sample Project 4"
        description="This is the fourth sample card component to showcase the project details."
        src="maven.jpg"
        url="#"
        color="#e8f8e8"
        i={3}
        progress={progress}
        range={[0.75, 1]}
        targetScale={1.2}
      />
      <Card 
        title="Sample Project 5"
        description="This is the fifth sample card component to showcase the project details."
        src="panda.jpg"
        url="#"
        color="#f8e8f8"
        i={4}
        progress={progress}
        range={[0.9, 1.1]}
        targetScale={1.2}
      />
      <SlidingImages/>
      <Contact />
    </main>
  )
}
