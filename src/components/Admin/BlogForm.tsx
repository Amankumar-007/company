'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { CldUploadWidget } from 'next-cloudinary'
import { createClient } from '@/utils/supabase/client'
import { 
  ImagePlus, 
  X, 
  ChevronLeft, 
  Save, 
  Globe, 
  Lock, 
  Unlock, 
  FileText, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface BlogFormProps {
  initialData?: any
  blogId?: string
}

export default function BlogForm({ initialData, blogId }: BlogFormProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '')
  const [status, setStatus] = useState(initialData?.status || 'draft')
  const [scheduledFor, setScheduledFor] = useState(
    initialData?.scheduled_for ? new Date(initialData.scheduled_for).toISOString().slice(0, 16) : ''
  )
  const [autoSlug, setAutoSlug] = useState(!blogId)
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  // Auto-generate slug from title if autoSlug is active
  useEffect(() => {
    if (autoSlug && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      )
    }
  }, [title, autoSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotification({ type: null, message: '' })

    const payload = {
      title,
      slug,
      cover_image: coverImage,
      content,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status,
      scheduled_for: status === 'scheduled' && scheduledFor ? new Date(scheduledFor).toISOString() : null,
      updated_at: new Date().toISOString(),
    }

    let error;

    if (blogId) {
      const { error: updateError } = await supabase
        .from('blogs')
        .update(payload)
        .eq('id', blogId)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('blogs')
        .insert([{ ...payload, created_at: new Date().toISOString() }])
      error = insertError
    }

    setLoading(false)

    if (error) {
      setNotification({ type: 'error', message: `Error saving blog: ${error.message}` })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setNotification({ type: 'success', message: 'Blog post saved successfully!' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        router.push('/admin/blogs')
        router.refresh()
      }, 1200)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl pb-20 text-zinc-900 font-sans">
      {/* Top Banner Notifications */}
      <AnimatePresence>
        {notification.type && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`flex items-start gap-3 p-4 rounded-2xl border mb-2 ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-200/85 text-green-800' 
                : 'bg-red-50 border-red-200/85 text-red-800'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight">
                  {notification.type === 'success' ? 'Success!' : 'Unable to Save'}
                </p>
                <p className="text-xs mt-1 leading-normal opacity-90 font-medium">
                  {notification.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNotification({ type: null, message: '' })}
                className="text-zinc-400 hover:text-zinc-650 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Action Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-150 rounded-xl transition-all duration-200 border border-zinc-200/60 bg-white shadow-sm hover:scale-105 active:scale-95"
            title="Go back"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-zinc-900 tracking-tight">
                {blogId ? 'Edit Article' : 'Create Article'}
              </h2>
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                blogId 
                  ? 'bg-amber-50 text-amber-700 border-amber-200/50' 
                  : 'bg-[#7ED348]/10 text-emerald-800 border-emerald-200/30'
              }`}>
                {blogId ? 'Editing' : 'New'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {blogId ? 'Modify the article details and SEO properties.' : 'Draft a new article and publish it to the website.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-755 bg-white border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl transition-all duration-200 shadow-sm active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7ED348] hover:bg-[#7ED348]/90 text-black font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(126,211,72,0.25)] hover:shadow-[0_4px_20px_rgba(126,211,72,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} className="transition-transform group-hover:scale-110" />
                <span>{blogId ? 'Update Post' : 'Publish Post'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: left column fields, right column settings/preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General info container */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-5">
            {/* Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <FileText size={13} className="text-zinc-400" />
                  <span>Article Title</span>
                </label>
                <span className={`text-[10px] font-medium ${title.length > 70 ? 'text-red-500 font-bold' : title.length > 55 ? 'text-amber-500' : 'text-zinc-400'}`}>
                  {title.length}/70 chars
                </span>
              </div>
              <div className="relative rounded-xl">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#7ED348]/10 focus:border-[#7ED348] transition-all duration-200 text-black text-base placeholder-zinc-400 font-medium outline-none"
                  placeholder="e.g. 10 Web Development Trends in 2026"
                />
              </div>
            </div>

            {/* Slug */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Globe size={13} className="text-zinc-400" />
                  <span>Slug / URL Path</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md transition-all border ${
                    autoSlug
                      ? 'bg-[#7ED348]/10 text-emerald-800 border-[#7ED348]/25'
                      : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                  }`}
                  title={autoSlug ? "Locked to Title (Auto-generating)" : "Unlocked (Manual editing)"}
                >
                  {autoSlug ? <Lock size={10} /> : <Unlock size={10} />}
                  <span>{autoSlug ? "Sync Active" : "Manual Edit"}</span>
                </button>
              </div>
              <div className="relative rounded-xl flex items-center">
                <span className="absolute left-4 text-sm font-semibold text-zinc-400 select-none">
                  twofloww.in/blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    if (autoSlug) setAutoSlug(false)
                  }}
                  className="w-full pl-[118px] pr-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#7ED348]/10 focus:border-[#7ED348] transition-all duration-200 text-black text-sm placeholder-zinc-400 font-mono outline-none"
                  placeholder="my-blog-post-slug"
                />
              </div>
            </div>
          </div>

          {/* Cover Image Upload Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <ImagePlus size={13} className="text-zinc-400" />
              <span>Cover Image</span>
            </label>
            
            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden border border-zinc-200/80 group aspect-video">
                <Image
                  src={coverImage}
                  alt="Cover Preview"
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    className="p-3 bg-white rounded-full text-red-650 shadow-lg hover:bg-red-50 hover:scale-110 active:scale-95 transition-all duration-200"
                    title="Remove cover image"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset="twofloww_blog"
                onSuccess={(result: any) => {
                  setCoverImage(result.info.secure_url)
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 hover:border-[#7ED348] rounded-xl text-zinc-500 hover:text-zinc-850 bg-zinc-50/50 hover:bg-[#7ED348]/5 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="p-3 bg-white border border-zinc-200 rounded-xl group-hover:border-[#7ED348]/30 group-hover:scale-110 transition-all duration-300 shadow-sm mb-3">
                      <ImagePlus size={24} className="text-zinc-400 group-hover:text-[#7ED348]" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 group-hover:text-[#7ED348]">Upload Cover Image</span>
                    <span className="text-xs text-zinc-400 mt-1">PNG, JPG, WEBP up to 5MB (16:9 ratio recommended)</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          {/* Markdown Content Editor */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText size={13} className="text-zinc-400" />
                <span>Content Body (Markdown)</span>
              </label>
              <span className="text-xs text-zinc-400 font-semibold bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200/50">
                {content ? content.split(/\s+/).filter(Boolean).length : 0} words
              </span>
            </div>
            <div data-color-mode="light" className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || '')}
                height={500}
                className="w-full text-black !shadow-none !border-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Side Panels & Previews */}
        <div className="space-y-6">
          
          {/* Publishing Settings Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-zinc-100">
              <Clock size={13} className="text-zinc-400" />
              <span>Publishing Settings</span>
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Status</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'draft', label: 'Draft', desc: 'Saved locally for editing', color: 'bg-zinc-400', icon: FileText },
                  { value: 'published', label: 'Published', desc: 'Visible on live site', color: 'bg-[#7ED348]', icon: Globe },
                  { value: 'scheduled', label: 'Scheduled', desc: 'Release at specific time', color: 'bg-blue-500', icon: Calendar },
                ].map((item) => {
                  const Icon = item.icon
                  const isSelected = status === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setStatus(item.value)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-zinc-50/80 border-zinc-800 shadow-sm'
                          : 'border-zinc-200/80 hover:bg-zinc-50/50 hover:border-zinc-350 bg-white'
                      }`}
                    >
                      <div className={`mt-0.5 p-1.5 rounded-lg border transition-colors ${
                        isSelected ? 'bg-zinc-950 text-white border-zinc-900' : 'bg-zinc-50 text-zinc-450 border-zinc-200'
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900 leading-none">{item.label}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.color} ${item.value === 'published' && isSelected ? 'animate-pulse' : ''}`} />
                        </div>
                        <p className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5 leading-none">{item.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {status === 'scheduled' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden space-y-2 pt-2"
                >
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Release Date & Time</label>
                  <div className="relative rounded-xl">
                    <input
                      type="datetime-local"
                      required={status === 'scheduled'}
                      value={scheduledFor}
                      onChange={(e) => setScheduledFor(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-black text-sm outline-none font-medium"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SEO Metadata Form Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-zinc-100">
              <ExternalLink size={13} className="text-zinc-400" />
              <span>Search Engine Optimization</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider block">Meta Title</label>
                  <span className={`text-[10px] font-semibold ${
                    metaTitle.length > 60 || metaTitle.length < 30 ? 'text-amber-500' : 'text-green-600 font-bold'
                  }`}>
                    {metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#7ED348]/10 focus:border-[#7ED348] transition-all duration-200 text-black text-sm placeholder-zinc-400 font-medium outline-none"
                  placeholder="Meta Title (falls back to Title)"
                />
                {/* Length bar */}
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      metaTitle.length === 0 ? 'w-0' : metaTitle.length > 60 ? 'bg-red-500 w-full' : metaTitle.length >= 30 ? 'bg-[#7ED348] w-2/3' : 'bg-amber-400 w-1/3'
                    }`}
                    style={{ width: `${Math.min((metaTitle.length / 60) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-zinc-455 uppercase tracking-wider block">Meta Description</label>
                  <span className={`text-[10px] font-semibold ${
                    metaDescription.length > 160 || metaDescription.length < 120 ? 'text-amber-500' : 'text-green-600 font-bold'
                  }`}>
                    {metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#7ED348]/10 focus:border-[#7ED348] transition-all duration-200 text-black text-sm placeholder-zinc-400 resize-none font-medium outline-none"
                  placeholder="Google snippet brief description..."
                />
                {/* Length bar */}
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      metaDescription.length === 0 ? 'w-0' : metaDescription.length > 160 ? 'bg-red-500 w-full' : metaDescription.length >= 120 ? 'bg-[#7ED348] w-2/3' : 'bg-amber-400 w-1/3'
                    }`}
                    style={{ width: `${Math.min((metaDescription.length / 160) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Google Result Mockup Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <h3 className="text-xs font-bold text-zinc-450 uppercase tracking-widest flex items-center gap-1.5">
                <Eye size={13} className="text-zinc-400" />
                <span>Google Search Result</span>
              </h3>
              <span className="text-[9px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">SERP Preview</span>
            </div>
            
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/40 space-y-1 font-sans select-none text-left">
              {/* URL bar */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 leading-tight">
                <span className="font-normal text-[11px]">https://www.twofloww.in</span>
                <span className="text-zinc-350 text-[10px]">&gt;</span>
                <span className="font-normal text-[11px]">blog</span>
                <span className="text-zinc-350 text-[10px]">&gt;</span>
                <span className="text-zinc-500 font-normal text-[11px] truncate max-w-[120px]">{slug || 'slug-name'}</span>
              </div>
              
              {/* Title */}
              <h4 className="text-[19px] text-[#1a0dab] hover:underline cursor-pointer leading-snug font-medium truncate pt-0.5">
                {metaTitle || title || 'Untitled Blog Post'}
              </h4>
              
              {/* Snippet body */}
              <p className="text-[13px] text-[#4d5156] leading-relaxed font-light break-words">
                {metaDescription || 'Add a meta description inside settings to check how your article will display in the Google search result listings page. Aim for 120-160 characters for best display.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </form>
  )
}
