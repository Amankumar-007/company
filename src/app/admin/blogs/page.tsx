import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit3, Trash2, Calendar, FileText, Globe, Clock } from 'lucide-react'

export default async function AdminBlogsPage() {
  const supabase = await createClient()
  
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <h2 className="text-3xl font-bold font-space-grotesk text-zinc-900 tracking-tight">Blogs Manager</h2>
          <p className="text-zinc-500 mt-1 text-sm">Create, update, and manage all your articles.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center space-x-2 px-6 py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span>New Article</span>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-spacing-y-2">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                <th className="px-6 py-5 rounded-tl-2xl">Article</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Created Date</th>
                <th className="px-6 py-5 text-right rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-sm">
              {!blogs || blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 font-light">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText size={36} className="text-zinc-300" />
                      <p className="font-semibold text-zinc-500 mt-2">No articles found</p>
                      <p className="text-xs max-w-xs">Write your first blog post to share your insights with the world.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-zinc-50/50 transition-colors">
                    {/* Title and slug */}
                    <td className="px-6 py-4.5 max-w-md">
                      <div className="font-bold text-zinc-955 truncate">{blog.title}</div>
                      <div className="text-xs text-zinc-400 font-medium truncate mt-0.5 flex items-center gap-1">
                        <Globe size={11} className="text-zinc-300" />
                        <span>/blog/{blog.slug}</span>
                      </div>
                    </td>
                    
                    {/* Status pill */}
                    <td className="px-6 py-4.5">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
                        blog.status === 'published'
                          ? 'bg-orange-50 text-[#ea580c] border border-orange-100'
                          : blog.status === 'scheduled'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                      }`}>
                        {blog.status === 'published' && <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-2 animate-pulse" />}
                        {blog.status === 'scheduled' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />}
                        <span>{blog.status || 'Draft'}</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4.5 text-zinc-500">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={13} className="text-zinc-400" />
                        <span>
                          {new Date(blog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <Link
                          href={`/admin/blogs/${blog.id}`}
                          className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg transition-all"
                          title="Edit article"
                        >
                          <Edit3 size={16} />
                        </Link>
                        {/* Note: Soft action delete indicator */}
                        <button 
                          className="p-2 text-zinc-450 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-50 cursor-not-allowed"
                          title="Delete article (coming soon)"
                          disabled
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
