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
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#7ED348] hover:bg-[#7ED348]/90 text-black font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>New Article</span>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/75 border-b border-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
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
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        blog.status === 'published'
                          ? 'bg-[#7ED348]/10 text-[#7ED348] border border-[#7ED348]/20'
                          : blog.status === 'scheduled'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-zinc-100 text-zinc-650 border border-zinc-200'
                      }`}>
                        {blog.status === 'published' && <span className="w-1.5 h-1.5 rounded-full bg-[#7ED348] mr-1.5 animate-pulse" />}
                        {blog.status === 'scheduled' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />}
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
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete article (coming soon)"
                          onClick={() => alert("Delete blog functionality will be supported shortly via database action.")}
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
