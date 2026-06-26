import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import BlogContentRenderer from './MarkdownPreviewClient'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link as LinkIcon, MessageSquare } from 'lucide-react'
import ShareButtons from './ShareButtons'
import { getRelativeTime } from '@/lib/utils'


type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
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
    alternates: {
      canonical: `https://www.twofloww.in/blog/${blog.slug}`,
    },
  }
}

function extractHeadingsAndAddIds(content: string) {
  if (!content) return { headings: [], content: '' };
  const headings: { id: string; text: string; level: number }[] = [];
  let parsedContent = content;

  if (content.trim().startsWith('<')) {
    parsedContent = content.replace(/<(h[2-3])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
      const pureText = text.replace(/<[^>]*>?/gm, '').trim();
      const id = pureText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      headings.push({ id, text: pureText, level: parseInt(tag.charAt(1)) });
      if (attrs.includes('id=')) return match;
      return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
    });
  } else {
    parsedContent = content.replace(/^(##+)\s+(.+)$/gm, (match, hashes, text) => {
      const pureText = text.trim();
      const id = pureText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const level = hashes.length;
      if (level === 2 || level === 3) {
        headings.push({ id, text: pureText, level });
      }
      return `<a id="${id}"></a>\n${match}`;
    });
  }

  return { headings, content: parsedContent };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: blog } = await supabase
    .from('blogs')
    .select('*, author:authors(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!blog) {
    notFound()
  }

  const { data: recentArticles } = await supabase
    .from('blogs')
    .select('id, title, slug, cover_image, created_at')
    .eq('status', 'published')
    .neq('id', blog.id)
    .order('created_at', { ascending: false })
    .limit(2)

  const { headings, content: parsedContent } = extractHeadingsAndAddIds(blog.content || '');

  const wordCount = blog.content?.split(/\s+/).filter(Boolean).length ?? 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const relativeDate = getRelativeTime(blog.created_at);

  const articleUrl = `https://www.twofloww.in/blog/${blog.slug}`;

  // Dynamic JSON-LD structured data for the Blog Article (AEO + SEO optimised)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.meta_description || blog.description,
    image: blog.cover_image ? [blog.cover_image] : undefined,
    datePublished: new Date(blog.created_at).toISOString(),
    dateModified: blog.updated_at ? new Date(blog.updated_at).toISOString() : new Date(blog.created_at).toISOString(),
    inLanguage: 'en-IN',
    wordCount,
    author: {
      '@type': 'Person',
      name: blog.author?.full_name || 'Twofloww',
      url: blog.author?.social_links?.linkedin || blog.author?.social_links?.twitter || `https://www.twofloww.in/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Twofloww',
      logo: {
        '@type': 'ImageObject',
        url: `https://www.twofloww.in/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-summary'],
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://www.twofloww.in/blog',
      name: 'Twofloww Blog',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen pt-20 pb-16 md:pt-28 md:pb-24 bg-[#f2f1ec] text-black">
      {/* Floating Back Navigation - Full width container */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#ea580c] transition-colors group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 bg-white group-hover:border-[#ea580c] transition-colors">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Back to Journal</span>
        </Link>
      </div>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-12">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#c2410c] shadow-sm mb-4 md:mb-6 uppercase tracking-widest border border-orange-100">
          Resources & Guides
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-space-grotesk tracking-tight leading-[1.15] text-[#c2410c] mb-4 md:mb-6">
          {blog.title}
        </h1>
        {/* Mobile Meta (Hidden on desktop) */}
        {blog.author ? (
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6 text-left">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-50 border border-orange-100 relative shrink-0">
              {blog.author.profile_image ? (
                <Image src={blog.author.profile_image} alt={blog.author.full_name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#c2410c]">
                  {blog.author.full_name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <span className="block text-sm font-bold text-neutral-800 leading-tight">{blog.author.full_name}</span>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mt-0.5">
                <span title={formattedDate}>{relativeDate}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:hidden flex items-center justify-center gap-4 text-xs font-medium text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5" title={formattedDate}><Calendar className="w-4 h-4" />{relativeDate}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{readTime} min read</span>
          </div>
        )}
      </header>

      {/* Cover Image Panel */}
      {blog.cover_image && (
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-16">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl bg-neutral-200 border border-black/5">
            <Image src={blog.cover_image} alt={blog.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* 3-Column Layout */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 relative items-start">

          {/* Left Sidebar: Author & Meta */}
          <aside className="lg:w-[240px] w-full shrink-0 order-2 lg:order-1 lg:sticky lg:top-12 hidden lg:block">
            <div className="space-y-6">

              {/* Author Box */}
              {blog.author && (
                <div className="bg-[#e8e9e4] rounded-[2rem] p-6 shadow-sm border border-neutral-200/50">
                  <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-widest mb-4 block">Written By</span>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-orange-50 border border-orange-100 relative shrink-0">
                      {blog.author.profile_image ? (
                        <Image src={blog.author.profile_image} alt={blog.author.full_name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[#c2410c]">
                          {blog.author.full_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#c2410c] font-space-grotesk text-lg leading-tight mb-1">{blog.author.full_name}</h3>
                      <p className="text-xs text-neutral-500 font-medium">Content Creator</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mb-5 leading-relaxed line-clamp-3">
                    Sharing insights on design, engineering, and digital products.
                  </p>

                  {blog.author.social_links && Object.keys(blog.author.social_links).length > 0 && (
                    <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
                      {Object.entries(blog.author.social_links).map(([platform, url]) => (
                        <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer" className="p-2 bg-white hover:bg-orange-50 text-neutral-500 hover:text-[#ea580c] rounded-full transition-colors border border-neutral-200" title={platform}>
                          {platform.toLowerCase() === 'twitter' ? <Twitter className="w-4 h-4" /> : platform.toLowerCase() === 'linkedin' ? <Linkedin className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Meta & Share Box (Desktop only) */}
              <div className="hidden lg:block bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-200/60">
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Published</span>
                    <span className="text-sm font-semibold text-[#c2410c] flex items-center gap-2" title={formattedDate}>
                      <Calendar className="w-4 h-4 text-[#ea580c]" /> {relativeDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Read Time</span>
                    <span className="text-sm font-semibold text-[#c2410c] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#ea580c]" /> {readTime} min read
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 block">Share Article</span>
                  <ShareButtons url={articleUrl} title={blog.title} />
                </div>
              </div>

            </div>
          </aside>

          {/* Center Column: Content */}
          <div className="flex-1 min-w-0 order-1 lg:order-2">
            <article className="bg-white rounded-2xl sm:rounded-[2.5rem] py-6 px-4 sm:py-10 sm:px-8 shadow-sm mb-12 border border-neutral-200/60">
              <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-space-grotesk prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#ea580c] prose-a:no-underline hover:prose-a:underline prose-pre:bg-neutral-900 prose-pre:text-neutral-100 tiptap-prose" data-color-mode="light">
                <BlogContentRenderer source={parsedContent} />
              </div>

              {/* Mobile Share Section */}
              <div className="lg:hidden mt-8 pt-6 border-t border-neutral-100 flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Share Article</span>
                <ShareButtons url={articleUrl} title={blog.title} />
              </div>

              <style>{`
                .tiptap-prose h1 { font-size: 1.5rem; font-weight: 800; line-height: 1.2; margin: 1.5rem 0 0.75rem; color: #c2410c; letter-spacing: -0.02em; scroll-margin-top: 100px; }
                .tiptap-prose h2 { font-size: 1.25rem; font-weight: 700; line-height: 1.3; margin: 1.25rem 0 0.5rem; color: #c2410c; letter-spacing: -0.01em; scroll-margin-top: 100px; }
                .tiptap-prose h3 { font-size: 1.125rem; font-weight: 600; line-height: 1.4; margin: 1rem 0 0.5rem; color: #374151; scroll-margin-top: 100px; }
                
                @media (min-width: 640px) {
                  .tiptap-prose h1 { font-size: 1.875rem; }
                  .tiptap-prose h2 { font-size: 1.5rem; }
                  .tiptap-prose h3 { font-size: 1.25rem; }
                }

                .tiptap-prose p { margin: 0.85rem 0; color: #374151; font-size: 1rem; line-height: 1.75; }
                .tiptap-prose strong { font-weight: 700; color: #111827; }
                .tiptap-prose em { font-style: italic; }
                .tiptap-prose u { text-decoration: underline; text-underline-offset: 3px; font-weight: 500; }
                .tiptap-prose s { text-decoration: line-through; opacity: 0.6; }
                .tiptap-prose mark { background: #fef08a; color: #713f12; padding: 0 3px; border-radius: 2px; }
                .tiptap-prose a { color: #ea580c; text-decoration: underline; text-underline-offset: 3px; font-weight: 500; }
                .tiptap-prose a:hover { color: #c2410c; }
                .tiptap-prose ul { list-style: disc; padding-left: 1.75rem; margin: 0.85rem 0; color: #374151; }
                .tiptap-prose ol { list-style: decimal; padding-left: 1.75rem; margin: 0.85rem 0; color: #374151; }
                .tiptap-prose li { margin: 0.4rem 0; }
                .tiptap-prose blockquote { border-left: 4px solid #ea580c; padding: 0.75rem 1.25rem; margin: 1.25rem 0; background: #fff7ed; border-radius: 0 0.5rem 0.5rem 0; color: #7c2d12; font-style: italic; }
                .tiptap-prose code { background: #f3f4f6; color: #dc2626; padding: 2px 6px; border-radius: 4px; font-size: 0.875em; border: 1px solid #e5e7eb; }
                .tiptap-prose pre { background: #1e1e2e; color: #cdd6f4; padding: 1.25rem 1.5rem; border-radius: 0.75rem; overflow-x: auto; margin: 1.25rem 0; }
                .tiptap-prose pre code { background: transparent; color: inherit; padding: 0; border: none; font-size: 0.875rem; }
                .tiptap-prose hr { border: none; border-top: 2px solid #f3f4f6; margin: 1.75rem 0; }
                .tiptap-prose img { max-width: 100%; border-radius: 0.75rem; margin: 1.25rem 0; border: 1px solid #e5e7eb; }
                html { scroll-behavior: smooth; }
                .toc-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: transparent transparent;
                  transition: scrollbar-color 0.3s;
                }
                .toc-scrollbar:hover {
                  scrollbar-color: #ea580c transparent;
                }
                .toc-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .toc-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .toc-scrollbar::-webkit-scrollbar-thumb {
                  background: transparent;
                  border-radius: 10px;
                  transition: background-color 0.3s;
                }
                .toc-scrollbar:hover::-webkit-scrollbar-thumb {
                  background: #ea580c;
                }
              `}</style>
            </article>

            {/* Newsletter / CTA Box */}
            <div className="bg-[#ea580c] text-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 shadow-xl relative overflow-hidden mb-12 md:mb-16">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold font-space-grotesk tracking-tight mb-4 text-white">
                  Need custom development for your project?
                </h3>
                <p className="text-white/90 font-light leading-relaxed mb-8">
                  Our engineering team specializes in building high-performance Next.js apps, robust cloud backends, and beautiful user interfaces. Let&apos;s turn your ideas into functional products.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#c2410c] hover:bg-neutral-100 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-black/5"
                >
                  <span>Start a Conversation</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-[80px] pointer-events-none"></div>
            </div>

            {/* Read Next Section */}
            {recentArticles && recentArticles.length > 0 && (
              <div className="border-t border-neutral-200/60 pt-8 md:pt-12 mb-8">
                <h3 className="text-2xl font-bold font-space-grotesk tracking-tight mb-8 text-[#c2410c]">Related Reads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {recentArticles.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`} className="group block">
                      <div className="relative aspect-[16/10] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-neutral-200 mb-4 shadow-sm border border-neutral-200">
                        {article.cover_image ? (
                          <Image
                            src={article.cover_image}
                            alt={article.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-400 font-space-grotesk">twofloww</span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-[#c2410c] group-hover:opacity-80 transition-opacity duration-300 font-space-grotesk tracking-tight leading-snug text-lg sm:text-xl">
                        {article.title}
                      </h4>
                      <p
                        className="text-xs text-neutral-500 mt-2"
                        title={new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      >
                        {getRelativeTime(article.created_at)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Table of Contents */}
          <aside className="lg:w-[240px] w-full shrink-0 hidden xl:block order-3 xl:sticky xl:top-10">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-200/60 max-h-[calc(100vh-100px)] overflow-y-auto toc-scrollbar" data-lenis-prevent>
              <div className="flex items-center gap-2 mb-6 border-b border-neutral-100 pb-4">
                <div className="w-2 h-2 rounded-full bg-[#ea580c]"></div>
                <h3 className="text-xs font-bold text-[#c2410c] uppercase tracking-widest">In this article</h3>
              </div>
              
              {headings.length > 0 ? (
                <ul className="space-y-3.5">
                  {headings.map((h, i) => (
                    <li key={i} className={`flex items-start gap-2.5 ${h.level === 3 ? 'ml-5' : ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0 mt-2 ${h.level === 3 ? 'opacity-60 w-1 h-1 mt-2.5' : ''}`}></span>
                      <a
                        href={`#${h.id}`}
                        className="text-sm font-medium text-neutral-600 hover:text-[#ea580c] transition-colors line-clamp-2 leading-relaxed"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-400 italic">No headings found.</p>
              )}
            </div>
          </aside>

        </div>
      </div>
    </main>
    </>
  )
}
