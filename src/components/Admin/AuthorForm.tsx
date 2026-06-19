'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  ImagePlus, 
  X, 
  ChevronLeft, 
  Save, 
  User, 
  Mail, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthorFormProps {
  initialData?: any
  authorId?: string
}

export default function AuthorForm({ initialData, authorId }: AuthorFormProps) {
  const router = useRouter()
  // Memoize supabase client so it's created only once (prevents auth listener leak on every render)
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current
  
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState(initialData?.full_name || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [profileImage, setProfileImage] = useState(initialData?.profile_image || '')
  const [uploadingImage, setUploadingImage] = useState(false)
  
  // Parse existing social links or start empty
  const [socialLinks, setSocialLinks] = useState<{ platform: string, url: string }[]>(() => {
    if (initialData?.social_links) {
      return Object.entries(initialData.social_links).map(([platform, url]) => ({ platform, url: url as string }))
    }
    return []
  })

  const [notification, setNotification] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }])
  }

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...socialLinks]
    updated[index][field] = value
    setSocialLinks(updated)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'author-profiles')

      const res = await fetch('/api/upload', { method: 'POST', body: formData })

      let json: any = {}
      try { json = await res.json() } catch {}

      if (!res.ok) throw new Error(json.message || 'Upload failed')
      if (!json.file?.url) throw new Error('No URL in upload response')

      setProfileImage(json.file.url)
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Image upload failed' })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotification({ type: null, message: '' })

    // Convert array back to object
    const socialLinksObj = socialLinks.reduce((acc, curr) => {
      if (curr.platform && curr.url) {
        acc[curr.platform.toLowerCase()] = curr.url
      }
      return acc
    }, {} as Record<string, string>)

    const payload = {
      full_name: fullName,
      email,
      profile_image: profileImage,
      social_links: socialLinksObj,
      updated_at: new Date().toISOString(),
    }

    let error;

    if (authorId) {
      const { error: updateError } = await supabase
        .from('authors')
        .update(payload)
        .eq('id', authorId)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('authors')
        .insert([{ ...payload, created_at: new Date().toISOString() }])
      error = insertError
    }

    setLoading(false)

    if (error) {
      setNotification({ type: 'error', message: `Error saving author: ${error.message}` })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setNotification({ type: 'success', message: 'Author saved successfully!' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        router.push('/admin/authors')
        router.refresh()
      }, 1200)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-20 text-zinc-900 font-sans">
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
                {authorId ? 'Edit Author' : 'Create Author'}
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {authorId ? 'Update author profile details.' : 'Add a new author for your blog posts.'}
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
            className="flex items-center gap-2 px-6 py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(234,88,12,0.25)] hover:shadow-[0_4px_20px_rgba(234,88,12,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} className="transition-transform group-hover:scale-110" />
                <span>{authorId ? 'Update Author' : 'Save Author'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm flex flex-col items-center">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 block w-full text-center">
              Profile Image
            </label>
            
            {profileImage ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-orange-50 group shadow-md mb-4">
                <Image
                  src={profileImage}
                  alt="Profile Preview"
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setProfileImage('')}
                    className="p-3 bg-white rounded-full text-red-650 shadow-lg hover:bg-red-50 hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 hover:border-[#ea580c] rounded-full text-zinc-500 hover:text-zinc-850 bg-zinc-50/50 hover:bg-orange-50 transition-all duration-300 group cursor-pointer mb-4 relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
                {uploadingImage ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-semibold text-zinc-700">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-white border border-zinc-200 rounded-full group-hover:border-[#ea580c]/30 group-hover:scale-110 transition-all duration-300 shadow-sm mb-2">
                      <ImagePlus size={20} className="text-zinc-400 group-hover:text-[#ea580c]" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-700 group-hover:text-[#ea580c]">Upload Photo</span>
                  </>
                )}
              </label>
            )}
            <p className="text-xs text-zinc-400 text-center font-medium">Square images work best (e.g. 400x400)</p>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-5">
            {/* Name */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                <User size={13} className="text-zinc-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-base placeholder-zinc-400 font-medium outline-none"
                placeholder="Jane Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                <Mail size={13} className="text-zinc-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-base placeholder-zinc-400 font-medium outline-none"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <LinkIcon size={13} className="text-zinc-400" />
                <span>Social Links</span>
              </label>
              <button
                type="button"
                onClick={handleAddSocialLink}
                className="text-xs font-bold text-[#ea580c] hover:bg-orange-50 px-2 py-1 rounded-lg transition-colors"
              >
                + Add Link
              </button>
            </div>

            <div className="space-y-3">
              {socialLinks.length === 0 ? (
                <p className="text-xs text-zinc-400 text-center py-4 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                  No social links added yet.
                </p>
              ) : (
                socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      placeholder="Platform (e.g. Twitter)"
                      className="w-1/3 px-3 py-2 bg-zinc-50/50 border border-zinc-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm outline-none"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      placeholder="URL (e.g. https://twitter.com/janedoe)"
                      className="flex-1 px-3 py-2 bg-zinc-50/50 border border-zinc-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-[#ea580c] transition-all duration-200 text-black text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(index)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
