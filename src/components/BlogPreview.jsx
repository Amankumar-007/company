"use client"
import { useEffect, useRef } from "react"
import { useScroll } from "@/context/ScrollContext"

const posts = [
  {
    title: "The Future of AI in Design",
    excerpt: "Exploring how artificial intelligence is revolutionizing the design process and creating new possibilities for creative professionals.",
    category: "Design",
    date: "Oct 15, 2024",
    readTime: "5 min read"
  },
  {
    title: "Building Scalable React Applications",
    excerpt: "Best practices and architectural patterns for creating maintainable and scalable React applications in modern development.",
    category: "Development",
    date: "Oct 12, 2024",
    readTime: "8 min read"
  },
  {
    title: "User Experience Trends 2024",
    excerpt: "A comprehensive look at the latest UX trends shaping digital products and user interactions in the current landscape.",
    category: "UX",
    date: "Oct 10, 2024",
    readTime: "6 min read"
  }
]

export default function BlogPreview() {
  const sectionRef = useRef(null)
  const { gsap, ScrollTrigger } = useScroll()

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return

    // Animate section
    gsap.fromTo(sectionRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate blog cards
    const cards = sectionRef.current.querySelectorAll(".blog-card")
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          delay: index * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animate section header
    const header = sectionRef.current.querySelector(".section-header")
    if (header) {
      gsap.fromTo(header,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [gsap, ScrollTrigger])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-black rounded-t-[50px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-header text-center mb-16">
          <h2 className="fade-up text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Insights
          </h2>
          <p className="fade-up text-lg text-gray-800 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from our design team
          </p>
        </div>
        
        <div className="fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div 
              key={index}
              className="blog-card group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-44 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-md text-xs font-medium border border-gray-200">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{post.readTime}</span>
                  </span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200">
                    Read Article
                  </span>
                  <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-200">
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300 font-medium">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}
