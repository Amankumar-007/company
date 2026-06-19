import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog | Twofloww',
  description: 'Insights, thoughts, and industry-leading stories on web engineering, design systems, and product development from the Twofloww team.',
}

export default async function BlogListingPage() {
  const supabase = await createClient()

  const { data: blogs } = await supabase
    .from('blogs')
    .select('*, author:authors(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const featuredBlog = blogs && blogs.length > 0 ? blogs[0] : null
  const remainingBlogs = blogs && blogs.length > 1 ? blogs.slice(1) : []

  // Categories matching the design
  const categories = ['All', 'Product Updates', 'News', 'Academy', 'Client Management', 'Ambassador', 'Features']

  return (
    <main className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 bg-[#f2f1ec] text-black relative overflow-hidden">
      {/* Decorative top-right shapes (Simulating the design's abstract background) */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-80" aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 w-full h-full -translate-y-1/4 translate-x-1/4">
          <path d="M 0 0 C 150 50, 300 -50, 400 100 L 400 0 Z" fill="#fca5a5" opacity="0.3" />
          <path d="M 50 150 C 200 200, 350 50, 450 150 L 450 0 L 50 0 Z" fill="#fdba74" opacity="0.6" />
          <path d="M 100 200 C 250 250, 350 100, 500 200 L 500 0 L 100 0 Z" fill="#99f6e4" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#c2410c] mb-6 md:mb-8 font-space-grotesk tracking-tight">
          Blog
        </h1>

        {/* Filter Bar */}
        <div className="flex overflow-x-auto no-scrollbar scroll-smooth flex-nowrap items-center bg-[#ea580c] p-1.5 rounded-full mb-8 md:mb-12 w-full max-w-full sm:w-fit shadow-md">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${idx === 0
                ? 'bg-white text-[#c2410c] shadow-sm'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 1. Featured Post */}
        {featuredBlog && (
          <div className="mb-10 md:mb-16">
            <Link href={`/blog/${featuredBlog.slug}`} className="group block">
              <article className="flex flex-col-reverse lg:flex-row bg-[#e8e9e4] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">

                {/* Left panel */}
                <div className="lg:w-[45%] bg-[#ea580c] text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-space-grotesk leading-[1.15] line-clamp-3">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 sm:mb-12 font-light line-clamp-2">
                    {featuredBlog.description || featuredBlog.meta_description || 'Explore this article to learn more about the best techniques and trends shaping the design and engineering space.'}
                  </p>

                  <div className="mt-6 lg:mt-auto flex items-center gap-4 text-white font-semibold group-hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    Read full article
                  </div>
                </div>

                {/* Right panel */}
                <div className="lg:w-[55%] relative min-h-[220px] sm:min-h-[320px] lg:min-h-[450px]">
                  {featuredBlog.cover_image ? (
                    <Image
                      src={featuredBlog.cover_image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
                      <span className="text-neutral-400 font-space-grotesk text-2xl">twofloww</span>
                    </div>
                  )}
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* 2. Remaining Posts Grid */}
        {remainingBlogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-8 lg:gap-y-12">
            {remainingBlogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                <article className="flex flex-col h-full bg-transparent">
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-5 bg-neutral-200">
                    {blog.cover_image ? (
                      <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
                        <span className="text-neutral-400 font-space-grotesk">twofloww</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-orange-50 text-[#c2410c] border border-orange-100 text-xs font-semibold px-3 py-1 rounded-md">
                        Features
                      </span>
                      <span className="text-xs font-semibold text-neutral-500">
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#c2410c] font-space-grotesk tracking-tight leading-snug mb-2 md:mb-3 group-hover:opacity-80 transition-opacity line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-neutral-500 text-xs sm:text-sm mb-4 md:mb-6 line-clamp-2 leading-relaxed">
                      {blog.description || blog.meta_description || 'Explore this article to learn more about the best techniques and trends shaping the space.'}
                    </p>

                    {/* Author Mock / Real */}
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="w-8 h-8 rounded-full bg-neutral-300 overflow-hidden relative border border-neutral-200">
                        {blog.author?.profile_image ? (
                          <Image
                            src={blog.author.profile_image}
                            alt={blog.author.full_name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-100 text-[#c2410c] font-bold text-xs">
                            {blog.author?.full_name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-neutral-600">
                        {blog.author?.full_name || 'Unknown Author'}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* 3. Empty State */}
        {(!blogs || blogs.length === 0) && (
          <div className="text-center py-24 bg-white border border-neutral-200 rounded-[2rem] p-8 shadow-sm">
            <div className="w-16 h-16 bg-orange-50 text-[#c2410c] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#c2410c] mb-1">No Articles Published</h3>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
              Our writers are crafting high-quality content. Subscribe or check back soon for our latest thoughts!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
