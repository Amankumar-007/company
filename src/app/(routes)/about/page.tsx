'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Award, Users, Target, Lightbulb, CheckCircle, Star, Trophy, Briefcase, Quote, Calendar } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Team data with real placeholder images
const founders = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    degree: "MBA in Technology Management",
    university: "Stanford University",
    experience: "12+ years",
    bio: "Visionary leader with extensive experience in digital transformation and strategic business development. Passionate about leveraging technology to solve complex business challenges.",
    skills: ["Strategic Planning", "Digital Transformation", "Team Leadership", "Business Development"],
    achievements: ["Led 50+ successful projects", "Forbes 30 Under 30", "Tech Innovation Award 2023"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Sarah Chen",
    role: "Creative Director & Co-Founder",
    degree: "MFA in Digital Design",
    university: "Rhode Island School of Design",
    experience: "10+ years",
    bio: "Award-winning designer passionate about creating meaningful user experiences and pushing creative boundaries. Believes in the power of design to transform businesses and improve lives.",
    skills: ["UI/UX Design", "Creative Strategy", "Brand Development", "Design Systems"],
    achievements: ["Design Excellence Award", "Featured in Adobe Create", "Speaker at DesignCon 2023"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
  }
]

const employees = [
  {
    name: "Michael Rodriguez",
    role: "Senior Developer",
    degree: "BSc Computer Science",
    university: "MIT",
    experience: "8+ years",
    skills: ["Full-Stack Development", "React", "Node.js", "Cloud Architecture"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    degree: "BDes Interaction Design",
    university: "Carnegie Mellon",
    experience: "6+ years",
    skills: ["User Research", "Prototyping", "Design Thinking", "Accessibility"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    role: "Project Manager",
    degree: "MBA Project Management",
    university: "Wharton School",
    experience: "7+ years",
    skills: ["Agile Methodology", "Team Coordination", "Risk Management", "Client Relations"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Strategist",
    degree: "MA Digital Marketing",
    university: "Northwestern University",
    experience: "5+ years",
    skills: ["Digital Marketing", "SEO/SEM", "Content Strategy", "Analytics"],
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face"
  }
]

const stats = [
  { icon: Briefcase, value: 150, label: "Projects Completed" },
  { icon: Users, value: 50, label: "Happy Clients" },
  { icon: Award, value: 25, label: "Industry Awards" },
  { icon: Trophy, value: 8, label: "Years Excellence" }
]

const values = [
  { icon: Target, title: "Excellence", description: "We deliver exceptional quality in every project we undertake." },
  { icon: Lightbulb, title: "Innovation", description: "Pushing boundaries with creative solutions and cutting-edge technology." },
  { icon: Users, title: "Collaboration", description: "Working together with clients to achieve shared success." },
  { icon: CheckCircle, title: "Integrity", description: "Building trust through transparency and ethical practices." }
]

const testimonials = [
  {
    name: "Jennifer Martinez",
    company: "TechStart Inc.",
    role: "CEO",
    content: "Working with this team transformed our digital presence. Their attention to detail and innovative approach exceeded all expectations.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Robert Thompson",
    company: "Global Finance Corp",
    role: "CTO",
    content: "Exceptional technical expertise and project management. They delivered a complex solution on time and within budget.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Amanda Foster",
    company: "Creative Agency",
    role: "Creative Director",
    content: "Their design work is outstanding. They understood our vision perfectly and brought it to life in ways we never imagined.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }
]

const timeline = [
  {
    year: "2016",
    title: "Company Founded",
    description: "Started with a vision to transform digital experiences and help businesses grow."
  },
  {
    year: "2018",
    title: "First Major Client",
    description: "Secured partnership with Fortune 500 company, establishing our reputation for excellence."
  },
  {
    year: "2020",
    title: "Team Expansion",
    description: "Grew to 15+ team members and expanded service offerings to include full-stack development."
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Received multiple industry awards and recognized as leading digital agency."
  }
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const [counters, setCounters] = useState([0, 0, 0, 0])
  const statsRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }

    // Fade-up animations
    gsap.utils.toArray(".fade-up").forEach((el: unknown) => {
      const element = el as HTMLElement
      gsap.fromTo(element, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animated counters
    const animateCounters = () => {
      const targets = [150, 50, 25, 8]
      targets.forEach((target, index) => {
        gsap.to({ value: 0 }, {
          value: target,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.out",
          onUpdate: function() {
            setCounters(prev => {
              const newCounters = [...prev]
              newCounters[index] = Math.floor(this.targets()[0].value)
              return newCounters
            })
          }
        })
      })
    }

    // Trigger counter animation when stats section is in view
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: animateCounters,
        once: true
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: 'linear-gradient(45deg, #000000 25%, transparent 25%), linear-gradient(-45deg, #000000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000000 75%), linear-gradient(-45deg, transparent 75%, #000000 75%)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-black rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-200 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 border-2 border-gray-200"
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 mb-8 px-6 py-3 border border-gray-300 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-700">Established 2016</span>
            </div>
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block text-gray-600">Crafting</span>
              <motion.span 
                className="block font-bold text-black mt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Digital Excellence
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              We are a collective of passionate creators, strategic thinkers, and technical experts 
              dedicated to transforming ideas into extraordinary digital experiences that drive results.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet the Team
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6 border-y border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 fade-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-black transition-all duration-300 bg-white shadow-sm">
                    <stat.icon className="w-8 h-8 text-gray-600 group-hover:text-black transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-black group-hover:text-gray-800 transition-colors duration-300">
                  {counters[index]}{index === 0 && '+'}{index === 1 && '+'}{index === 2 && '+'}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wider group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center fade-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                To transform visionary ideas into powerful digital realities through innovative design, 
                cutting-edge technology, and strategic thinking. We believe in creating solutions that 
                not only look exceptional but deliver measurable business results.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our approach combines creative excellence with technical expertise, ensuring every 
                project we undertake meets the highest standards of quality, performance, and user experience.
              </p>
            </div>
            <div className="space-y-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-white shadow-sm">
                    <value.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-black">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Meet Our Founders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionaries behind our success, bringing decades of expertise and passion for innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 fade-up">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-all duration-300 h-full flex flex-col bg-white shadow-sm hover:shadow-lg">
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden group">
                    <Image 
                      src={founder.image} 
                      alt={founder.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-3 group-hover:translate-y-0">
                      <p className="text-sm font-medium">{founder.role}</p>
                      <p className="text-xs text-gray-200">{founder.experience} experience</p>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-black">{founder.name}</h3>
                      <p className="text-gray-600 text-sm">{founder.role}</p>
                    </div>
                    
                    <div className="mb-4 text-sm">
                      <div className="text-gray-500 mb-1">{founder.degree}</div>
                      <div className="text-gray-600">{founder.university}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Expertise</div>
                      <div className="flex flex-wrap gap-2">
                        {founder.skills.slice(0, 4).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
                            {skill}
                          </span>
                        ))}
                        {founder.skills.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
                            +{founder.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Experience</span>
                        <span className="font-semibold text-black">{founder.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 fade-up">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-all duration-300 bg-white shadow-sm hover:shadow-lg h-full flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-gray-400 mb-4" />
                    <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h4 className="font-semibold text-black">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to industry leaders, here&apos;s our story of growth and innovation.
            </p>
          </div>
          
          <div className="relative fade-up">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white shadow-sm z-10">
                  <Calendar className="w-6 h-6 text-gray-700" />
                </div>
                <div className="ml-8 flex-1">
                  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-black">{item.year}</h3>
                      <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We combine creativity, technical expertise, and business acumen to deliver solutions that 
              drive real results for our clients. Our commitment to excellence and client success is 
              unwavering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 fade-up">
            <div className="text-center group">
              <div className="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-all duration-300 group-hover:scale-110 transform bg-white shadow-sm">
                <CheckCircle className="w-10 h-10 text-gray-600 group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-black group-hover:text-gray-800 transition-colors duration-300">Proven Track Record</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                150+ successful projects delivered across various industries with measurable results
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-all duration-300 group-hover:scale-110 transform bg-white shadow-sm">
                <Users className="w-10 h-10 text-gray-600 group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-black group-hover:text-gray-800 transition-colors duration-300">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Highly skilled professionals with diverse expertise and industry experience
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-black transition-all duration-300 group-hover:scale-110 transform bg-white shadow-sm">
                <Trophy className="w-10 h-10 text-gray-600 group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-black group-hover:text-gray-800 transition-colors duration-300">Award Winning</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Recognized excellence in design, innovation, and client satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center fade-up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Ready to Work Together?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Let&apos;s discuss how we can help bring your vision to life with our expertise and passion for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
