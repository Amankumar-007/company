'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
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
  AlertCircle,
  Tag,
  Star,
  BookOpen,
  Hash,
  Layers
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false })

interface BlogFormProps {
  initialData?: any
  blogId?: string
}

// Parse tags from initialData (stored as comma-separated string or array)
function parseTags(raw: any): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'string') return raw.split(',').map((t: string) => t.trim()).filter(Boolean)
  return []
}

// Count words in HTML string
function countWordsFromHTML(html: string): number {
  if (!html) return 0
  const text = html.replace(/<[^>]+>/g, ' ')
  return text.split(/\s+/).filter(Boolean).length
}

export default function BlogForm({ initialData, blogId }: BlogFormProps) {
  const router = useRouter()
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current
  
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [content, setContent] = useState(initialData?.content || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [authorId, setAuthorId] = useState(initialData?.author_id || '')
  const [authors, setAuthors] = useState<any[]>([])
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '')
  const [status, setStatus] = useState(initialData?.status || 'draft')
  const [scheduledFor, setScheduledFor] = useState(
    initialData?.scheduled_for ? new Date(initialData.scheduled_for).toISOString().slice(0, 16) : ''
  )
  const [autoSlug, setAutoSlug] = useState(!blogId)
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  
  // New enhanced fields
  const [tags, setTags] = useState<string[]>(parseTags(initialData?.tags))
  const [tagInput, setTagInput] = useState('')
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false)
  const [category, setCategory] = useState(initialData?.category || '')

  // Derived: word count & reading time
  const wordCount = countWordsFromHTML(content)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'blog-covers')

      const res = await fetch('/api/upload', { method: 'POST', body: formData })

      let json: any = {}
      try { json = await res.json() } catch {}

      if (!res.ok) throw new Error(json.message || 'Upload failed')
      if (!json.file?.url) throw new Error('No URL in upload response')

      setCoverImage(json.file.url)
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Image upload failed' })
    } finally {
      setUploadingImage(false)
    }
  }

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

  const fetchAuthors = useCallback(async () => {
    const { data } = await supabase.from('authors').select('id, full_name').order('full_name')
    if (data) setAuthors(data)
  }, [supabase])

  useEffect(() => {
    fetchAuthors()
  }, [fetchAuthors])

  // Tags handling
  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase().replace(/\s+/g, '-')
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags([...tags, trimmed])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(tagInput)
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotification({ type: null, message: '' })

    const payload = {
      title,
      slug,
      cover_image: coverImage,
      description,
      content,
      author_id: authorId || null,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status,
      scheduled_for: status === 'scheduled' && scheduledFor ? new Date(scheduledFor).toISOString() : null,
      updated_at: new Date().toISOString(),
      tags: tags.join(','),
      is_featured: isFeatured,
      category: category || null,
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
                  : 'bg-orange-50 text-[#ea580c] border-[#ea580c]/30'
              }`}>
                {blogId ? 'Editing' : 'New'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {blogId ? 'Modify the article details and SEO properties.' : 'Draft a new article and publish it to the website.'}
            </p>
          </div>
        </div>
        
        {/* Live Stats Pills */}
        <div className="hidden sm:flex items-center gap-2 mr-auto ml-4">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full">
            <BookOpen size={10} className="text-zinc-400" />
            {wordCount} words
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-full">
            <Clock size={10} className="text-zinc-400" />
            ~{readingTime} min read
          </span>
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
            className="flex items-center gap-2 px-6 py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(234,88,12,0.25)] hover:shadow-[0_4px_20px_rgba(234,88,12,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
        
        {/* ─── LEFT COLUMN ─── */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General info container */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                <FileText size={13} className="text-[#ea580c]" />
              </div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Article Details</span>
            </div>

            {/* Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>Article Title</span>
                </label>
                <span className={`text-[10px] font-medium ${title.length > 70 ? 'text-red-500 font-bold' : title.length > 55 ? 'text-amber-500' : 'text-zinc-400'}`}>
                  {title.length}/70 chars
                </span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-base placeholder-zinc-400 font-medium outline-none"
                placeholder="e.g. 10 Web Development Trends in 2026"
              />
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
                      ? 'bg-orange-50 text-[#ea580c] border-[#ea580c]/30'
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
                  className="w-full pl-[118px] pr-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm placeholder-zinc-400 font-mono outline-none"
                  placeholder="my-blog-post-slug"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                <span>Blog Excerpt / Description</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm placeholder-zinc-400 resize-none font-medium outline-none"
                placeholder="A short summary to display on blog listing cards..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                <Layers size={12} className="text-zinc-400" />
                <span>Category</span>
              </label>
              <div className="relative">
                <Hash size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm placeholder-zinc-400 font-medium outline-none"
                  placeholder="e.g. Design, Engineering, Product"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Tag size={12} className="text-zinc-400" />
                  <span>Tags</span>
                </label>
                <span className="text-[10px] text-zinc-400 font-medium">{tags.length}/10 tags</span>
              </div>
              <div className="min-h-[48px] w-full flex flex-wrap gap-2 px-3 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:border-[#ea580c] transition-all duration-200 cursor-text"
                onClick={() => document.getElementById('tag-input')?.focus()}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-[#ea580c] border border-orange-200/60 rounded-lg text-xs font-semibold"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
                      className="hover:text-red-600 transition-colors ml-0.5"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                {tags.length < 10 && (
                  <input
                    id="tag-input"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={() => { if (tagInput.trim()) addTag(tagInput) }}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-black placeholder-zinc-400 font-medium"
                    placeholder={tags.length === 0 ? "Type a tag and press Enter or comma..." : "Add more..."}
                  />
                )}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 font-medium">Press <kbd className="bg-zinc-100 px-1 py-0.5 rounded text-[9px] font-mono border border-zinc-200">Enter</kbd> or <kbd className="bg-zinc-100 px-1 py-0.5 rounded text-[9px] font-mono border border-zinc-200">,</kbd> to add a tag. <kbd className="bg-zinc-100 px-1 py-0.5 rounded text-[9px] font-mono border border-zinc-200">Backspace</kbd> to remove last.</p>
            </div>
          </div>

          {/* Cover Image Upload Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                <ImagePlus size={13} className="text-[#ea580c]" />
              </div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Cover Image</span>
            </div>
            
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
              <label className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 hover:border-[#ea580c] rounded-2xl text-zinc-500 hover:text-zinc-850 bg-zinc-50/50 hover:bg-orange-50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-semibold text-zinc-700">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-white border border-zinc-200 rounded-xl group-hover:border-[#ea580c]/30 group-hover:scale-110 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] mb-3">
                      <ImagePlus size={24} className="text-zinc-400 group-hover:text-[#ea580c]" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 group-hover:text-[#ea580c]">Upload Cover Image</span>
                    <span className="text-xs text-zinc-400 mt-1">PNG, JPG, WEBP up to 5MB (16:9 ratio recommended)</span>
                  </>
                )}
              </label>
            )}
          </div>

          {/* ── TipTap Rich Text Editor ── */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 rounded-lg border border-orange-100">
                  <FileText size={13} className="text-[#ea580c]" />
                </div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Content Body</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-semibold bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded-lg">
                  <BookOpen size={9} />
                  {wordCount} words
                </span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-semibold bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded-lg">
                  <Clock size={9} />
                  ~{readingTime} min read
                </span>
              </div>
            </div>
            <TiptapEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your article here... Use the toolbar above to format your content."
            />
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
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
                  { value: 'published', label: 'Published', desc: 'Visible on live site', color: 'bg-[#ea580c]', icon: Globe },
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

            {/* Featured Toggle */}
            <div className="pt-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                  isFeatured
                    ? 'bg-amber-50 border-amber-300/60 shadow-sm shadow-amber-100'
                    : 'border-zinc-200/80 hover:bg-zinc-50/50 bg-white'
                }`}
              >
                <div className={`p-1.5 rounded-lg border transition-colors ${
                  isFeatured ? 'bg-amber-500 text-white border-amber-400' : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                }`}>
                  <Star size={14} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-zinc-900 block leading-none">Featured Article</span>
                  <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">{isFeatured ? 'Shown in featured sections' : 'Not featured'}</p>
                </div>
                {/* Toggle switch */}
                <div className={`w-9 h-5 rounded-full transition-colors duration-300 relative shrink-0 ${isFeatured ? 'bg-amber-500' : 'bg-zinc-200'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${isFeatured ? 'left-4' : 'left-0.5'}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Author Settings Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-zinc-100">
              <Globe size={13} className="text-zinc-400" />
              <span>Author Assignment</span>
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Select Author</label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm outline-none font-medium appearance-none cursor-pointer"
              >
                <option value="">No author assigned</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.full_name}
                  </option>
                ))}
              </select>
            </div>
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
                  className="w-full px-4 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm placeholder-zinc-400 font-medium outline-none"
                  placeholder="Meta Title (falls back to Title)"
                />
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      metaTitle.length === 0 ? 'w-0' : metaTitle.length > 60 ? 'bg-red-500 w-full' : metaTitle.length >= 30 ? 'bg-[#ea580c] w-2/3' : 'bg-amber-400 w-1/3'
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
                  className="w-full px-4 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm placeholder-zinc-400 resize-none font-medium outline-none"
                  placeholder="Google snippet brief description..."
                />
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      metaDescription.length === 0 ? 'w-0' : metaDescription.length > 160 ? 'bg-red-500 w-full' : metaDescription.length >= 120 ? 'bg-[#ea580c] w-2/3' : 'bg-amber-400 w-1/3'
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
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 leading-tight">
                <span className="font-normal text-[11px]">https://www.twofloww.in</span>
                <span className="text-zinc-350 text-[10px]">&gt;</span>
                <span className="font-normal text-[11px]">blog</span>
                <span className="text-zinc-350 text-[10px]">&gt;</span>
                <span className="text-zinc-500 font-normal text-[11px] truncate max-w-[120px]">{slug || 'slug-name'}</span>
              </div>
              
              <h4 className="text-[19px] text-[#1a0dab] hover:underline cursor-pointer leading-snug font-medium truncate pt-0.5">
                {metaTitle || title || 'Untitled Blog Post'}
              </h4>
              
              <p className="text-[13px] text-[#4d5156] leading-relaxed font-light break-words">
                {metaDescription || 'Add a meta description inside settings to check how your article will display in the Google search result listings page. Aim for 120-160 characters for best display.'}
              </p>
            </div>
          </div>

          {/* Content Stats Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 pb-3 border-b border-zinc-100 mb-4">
              <BookOpen size={13} className="text-zinc-400" />
              <span>Content Stats</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Words', value: wordCount.toLocaleString(), icon: FileText },
                { label: 'Read Time', value: `~${readingTime} min`, icon: Clock },
                { label: 'Tags', value: tags.length, icon: Tag },
                { label: 'Status', value: status.charAt(0).toUpperCase() + status.slice(1), icon: Globe },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-zinc-50/80 border border-zinc-100 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Icon size={11} className="text-zinc-400" />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className="text-sm font-bold text-zinc-900">{stat.value}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </form>
  )
}
