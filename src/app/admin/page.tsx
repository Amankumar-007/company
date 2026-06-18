import { createClient } from '@/utils/supabase/server'
import { FileText, MessageSquare, ArrowRight, Plus, ExternalLink, Calendar, Mail, FileCheck } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts and recent data
  const [
    { count: blogsCount, data: recentBlogs },
    { count: submissionsCount, data: recentSubmissions }
  ] = await Promise.all([
    supabase.from('blogs').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
    supabase.from('contacts').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4)
  ])

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <h2 className="text-3xl font-bold font-space-grotesk text-zinc-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-zinc-500 mt-1 text-sm">Welcome back! Manage content, read inquiries, and monitor statistics.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-[#7ED348] hover:bg-[#7ED348]/90 text-black px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
            <Plus size={18} />
            Write Blog
          </Link>
          <a href="/" target="_blank" className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
            <ExternalLink size={18} />
            View Site
          </a>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blogs Card */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
          <div className="space-y-1">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Published</p>
            <h3 className="text-4xl font-bold font-space-grotesk text-zinc-900">{blogsCount || 0}</h3>
            <p className="text-xs text-[#7ED348] font-medium mt-1">Blogs active on live site</p>
          </div>
          <div className="p-4 bg-zinc-50 text-zinc-800 rounded-2xl border border-zinc-100">
            <FileText size={28} />
          </div>
        </div>

        {/* Submissions Card */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
          <div className="space-y-1">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Client Requests</p>
            <h3 className="text-4xl font-bold font-space-grotesk text-zinc-900">{submissionsCount || 0}</h3>
            <p className="text-xs text-blue-600 font-medium mt-1">Contact form inquiries</p>
          </div>
          <div className="p-4 bg-zinc-50 text-zinc-800 rounded-2xl border border-zinc-100">
            <MessageSquare size={28} />
          </div>
        </div>

        {/* Custom Actions Overview Card */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
          <div className="space-y-1">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Quick Status</p>
            <h3 className="text-xl font-bold font-space-grotesk text-zinc-900">System Online</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Database synced successfully</p>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <FileCheck size={28} />
          </div>
        </div>
      </div>

      {/* Two Columns for Submissions & Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Submissions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <div>
                <h3 className="font-bold font-space-grotesk text-zinc-900 text-lg">Recent Inquiries</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Latest contact submissions from visitors</p>
              </div>
              <Link href="/admin/submissions" className="text-xs text-zinc-800 hover:text-black font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-black bg-white transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="divide-y divide-zinc-100">
              {recentSubmissions?.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 text-sm">No client submissions found.</div>
              ) : (
                recentSubmissions?.map((sub) => (
                  <div key={sub.id} className="p-5 hover:bg-zinc-50/60 transition-colors duration-200">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                          {sub.name}
                        </p>
                        <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                          <Mail size={12} className="text-zinc-400" />
                          {sub.email}
                        </p>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium bg-zinc-100 px-2 py-0.5 rounded-full">
                        {new Date(sub.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-650 mt-3 line-clamp-2 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100/60">
                      {sub.message || sub.project_description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Blogs */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <div>
                <h3 className="font-bold font-space-grotesk text-zinc-900 text-lg">Recent Articles</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Recently written articles and posts</p>
              </div>
              <Link href="/admin/blogs" className="text-xs text-zinc-800 hover:text-black font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-black bg-white transition-all">
                Manage <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="divide-y divide-zinc-100">
              {recentBlogs?.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 text-sm">No blogs written yet.</div>
              ) : (
                recentBlogs?.map((blog) => (
                  <div key={blog.id} className="p-5 hover:bg-zinc-50/60 transition-colors duration-200 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-zinc-900 text-sm truncate">{blog.title}</p>
                      <div className="flex items-center gap-2.5 mt-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          blog.status === 'published' ? 'bg-[#7ED348]/10 text-[#7ED348] border border-[#7ED348]/20' : 'bg-zinc-150 text-zinc-650'
                        }`}>
                          {blog.status || 'Draft'}
                        </span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/admin/blogs/${blog.id}`} className="text-zinc-400 hover:text-black p-2 hover:bg-zinc-100 rounded-lg transition-colors shrink-0">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
