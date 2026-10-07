'use client';
import styles from './style.module.scss'
import Project from './components/project';
import Link from 'next/link';
import Rounded from '../../common/RoundedButton';

const projects = [
  {
    title: "Web Development",
    description: "Creating powerful, scalable web applications with cutting-edge technologies. We build responsive, fast, and secure websites that drive business growth and deliver exceptional user experiences across all devices."
  },
  {
    title: "App development",
    description: "Transforming ideas into intuitive mobile applications. Our native and cross-platform solutions combine stunning design with robust functionality to engage users and accelerate your business in the mobile-first world."
  },
  {
    title: "UI/UX design",
    description: "Crafting beautiful, user-centered designs that captivate and convert. We blend creativity with usability to create seamless digital experiences that delight users and achieve your business objectives."
  },
  {
    title: "SEO",
    description: "Boosting your online visibility and driving organic traffic. Our data-driven SEO strategies combine technical excellence with compelling content to rank higher, attract quality leads, and grow your digital presence."
  }
]

export default function Home() {
  return (
    <section className={styles.projects}>
      <h2 className={styles.title}>Our Services</h2>
      <div className={styles.body}>
        {
          projects.map((project, index) => {
            return <Project index={index} title={project.title} key={index} />
          })
        }
      </div>
      <Link href="/services">
        <Rounded>
          <p>More services</p>
        </Rounded>
      </Link>
    </section>
  )
}
