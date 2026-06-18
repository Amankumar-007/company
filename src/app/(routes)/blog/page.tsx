import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowUpRight, Search } from 'lucide-react'

export const metadata = {
  title: 'Blog | Twofloww',
  description: 'Insights, thoughts, and industry-leading stories on web engineering, design systems, and product development from the Twofloww team.',
}

export default async function BlogListingPage() {
  const supabase = await createClient()
  
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const featuredBlog = blogs && blogs.length > 0 ? blogs[0] : null
  const remainingBlogs = blogs && blogs.length > 1 ? blogs.slice(1) : []

  // Simulated categories for aesthetic look
  const categories = ['All Insights', 'Engineering', 'Design Systems', 'Product Strategy', 'Company News']

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#FAFAFA] text-black">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-black text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-neutral-800">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#7ED348] text-black mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              Twofloww Journal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk tracking-tight leading-[1.15] mb-6">
              Insights on the <span className="text-[#7ED348]">Future</span> of Digital Products.
            </h1>
            <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed">
              Deep dives, tutorials, and field reports on web engineering, UI/UX systems, and product strategy.
            </p>
          </div>
          
          {/* Decorative glowing sphere */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#7ED348]/10 blur-[100px] pointer-events-none"></div>
        </div>
      </div>

      {/* Category Selection Bar & Simulated Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-neutral-200">
          {/* Category List */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  idx === 0
                    ? 'bg-black text-white'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box Mock */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white border border-neutral-200 text-black px-4 py-2.5 pl-10 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Featured Post */}
        {featuredBlog && (
          <div className="mb-16">
            <Link href={`/blog/${featuredBlog.slug}`} className="group block">
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                {/* Image panel */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
                  {featuredBlog.cover_image ? (
                    <Image
                      src={featuredBlog.cover_image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                      <span className="text-neutral-500 font-space-grotesk text-2xl">twofloww</span>
                    </div>
                  )}
                  {/* Category chip absolute */}
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[#7ED348] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Featured Post
                  </span>
                </div>

                {/* Content panel */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full py-4">
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredBlog.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      5 min read
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 font-space-grotesk tracking-tight leading-snug mb-4 group-hover:text-[#7ED348] transition-colors duration-300">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-neutral-600 text-base leading-relaxed mb-6 font-light">
                    {featuredBlog.meta_description || 'Explore this article to learn more about the best techniques and trends shaping the design and engineering space.'}
                  </p>

                  <div className="mt-auto pt-4 flex items-center gap-2 text-black font-semibold text-sm group-hover:text-neutral-700">
                    <span className="border-b border-black group-hover:border-neutral-500 pb-0.5 transition-colors">
                      Read Full Article
                    </span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* 2. Remaining Posts Grid */}
        {remainingBlogs.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-neutral-900 font-space-grotesk mb-6">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                  <article className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                    <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                      {blog.cover_image ? (
                        <Image
                          src={blog.cover_image}
                          alt={blog.title}
                          fill
                          className="object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                          <span className="text-neutral-400 font-space-grotesk">twofloww</span>
                        </div>
                      )}
                      {/* Accent highlight on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4 font-medium">
                        <time dateTime={blog.created_at}>
                          {new Date(blog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <span>4 min read</span>
                      </div>

                      <h4 className="text-xl font-bold text-neutral-950 font-space-grotesk tracking-tight leading-snug mb-3 group-hover:text-[#7ED348] transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h4>

                      <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-light">
                        {blog.meta_description || 'Deep dive into standard methods, tools, and updates from our creative and technical teams.'}
                      </p>

                      <div className="flex items-center gap-1.5 text-black font-semibold text-xs mt-auto pt-4 border-t border-neutral-100">
                        <span>Read Post</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 3. Empty State */}
        {(!blogs || blogs.length === 0) && (
          <div className="text-center py-24 bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">No Articles Published</h3>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
              Our writers are crafting high-quality content. Subscribe or check back soon for our latest thoughts!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
