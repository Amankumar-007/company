import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import MarkdownPreviewClient from './MarkdownPreviewClient'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link as LinkIcon, MessageSquare } from 'lucide-react'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!blog) {
    return {
      title: 'Blog Not Found | Twofloww',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${blog.meta_title || blog.title} | Twofloww Blog`,
    description: blog.meta_description,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description,
      images: blog.cover_image ? [blog.cover_image, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.meta_title || blog.title,
      description: blog.meta_description,
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = await createClient()
  
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!blog) {
    notFound()
  }

  // Fetch some other articles for the "Read next" section
  const { data: recentArticles } = await supabase
    .from('blogs')
    .select('id, title, slug, cover_image, created_at')
    .eq('status', 'published')
    .neq('id', blog.id)
    .order('created_at', { ascending: false })
    .limit(2)

  return (
    <main className="min-h-screen pt-36 pb-24 bg-[#FAFAFA] text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Back Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-black transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 bg-white group-hover:border-black transition-colors">
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back to Journal</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Share Article</span>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 hover:bg-neutral-100 border border-neutral-200 rounded-full text-neutral-500 hover:text-black transition-colors" title="Share on Twitter">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-neutral-100 border border-neutral-200 rounded-full text-neutral-500 hover:text-black transition-colors" title="Share on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-neutral-100 border border-neutral-200 rounded-full text-neutral-500 hover:text-black transition-colors" title="Copy Link">
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#7ED348]/10 text-[#7ED348] border border-[#7ED348]/20 mb-6 uppercase tracking-wider">
            Resources & Guides
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk tracking-tight leading-[1.15] mb-8 text-neutral-950">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              6 min read
            </span>
          </div>
        </header>
      </div>

      {/* Cover Image Panel */}
      {blog.cover_image && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-100">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white border border-neutral-200/80 rounded-3xl p-8 sm:p-12 shadow-sm mb-16">
          <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-space-grotesk prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#7ED348] prose-a:no-underline hover:prose-a:underline prose-pre:bg-neutral-900 prose-pre:text-neutral-100" data-color-mode="light">
            <MarkdownPreviewClient source={blog.content} />
          </div>
        </article>

        {/* Newsletter / CTA Box */}
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-16">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl font-bold font-space-grotesk tracking-tight mb-4">
              Need custom development for your project?
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed mb-6">
              Our engineering team specializes in building high-performance Next.js apps, robust cloud backends, and beautiful user interfaces. Let&apos;s turn your ideas into functional products.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#7ED348] hover:bg-[#7ED348]/90 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
            >
              <span>Start a Conversation</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#7ED348]/10 blur-[80px] pointer-events-none"></div>
        </div>

        {/* Read Next Section */}
        {recentArticles && recentArticles.length > 0 && (
          <div className="border-t border-neutral-200 pt-16">
            <h3 className="text-2xl font-bold font-space-grotesk tracking-tight mb-8">Related Reads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 mb-4 border border-neutral-200">
                    {article.cover_image ? (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                        <span className="text-neutral-400 font-space-grotesk">twofloww</span>
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-neutral-900 group-hover:text-[#7ED348] transition-colors duration-300 font-space-grotesk tracking-tight leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2">
                    {new Date(article.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
