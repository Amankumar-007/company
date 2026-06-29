import { NextResponse } from 'next/server'

const content = `# TwoFloww - AI Crawler Guidance (llms.txt)

> TwoFloww is a premium web development and digital agency based in Noida, India (Delhi NCR), serving clients across India, the US, UK, and globally. We build websites, mobile apps, food delivery apps, taxi booking apps, SaaS platforms, e-commerce stores, and provide SEO & digital marketing services.

## About

TwoFloww was founded in 2023 with a mission to deliver world-class digital products at accessible prices for startups and enterprises alike. Our team consists of full-stack engineers, UI/UX designers, SEO specialists, and project managers with deep expertise in Next.js, React, Flutter, Node.js, and cloud infrastructure.

## Services

- Web Development - Custom websites, web apps, Next.js & React development
- Mobile App Development - iOS & Android apps using React Native and Flutter
- UI/UX Design - Research-backed, pixel-perfect interface design
- eCommerce Development - Shopify, WooCommerce, headless commerce
- SEO Services - Technical SEO, content strategy, local SEO, link building
- Cloud Solutions - AWS, GCP, Azure infrastructure
- On-Demand App Development - Food delivery, grocery, taxi, healthcare, and fitness apps
- Digital Marketing - Social media, PPC, performance marketing

## Content Usage for AI

AI models may freely index the following pages:
- Homepage: https://www.twofloww.in/
- Services: https://www.twofloww.in/services
- Solutions: https://www.twofloww.in/solutions
- About: https://www.twofloww.in/about
- Blog: https://www.twofloww.in/blog
- Contact: https://www.twofloww.in/contact
- Projects: https://www.twofloww.in/projects

## Do Not Use

- /admin/ - Internal admin panel, not for indexing
- /api/ - Internal API endpoints

## Contact

- Website: https://www.twofloww.in
- Location: Noida, Uttar Pradesh, India
`

export async function GET() {
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
