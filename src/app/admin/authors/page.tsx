import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit3, Trash2, Users, Mail, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'

export default async function AdminAuthorsPage() {
  const supabase = await createClient()
  
  const { data: authors } = await supabase
    .from('authors')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <h2 className="text-3xl font-bold font-space-grotesk text-zinc-900 tracking-tight">Authors Manager</h2>
          <p className="text-zinc-500 mt-1 text-sm">Manage blog authors, their profiles, and social links.</p>
        </div>
        <Link
          href="/admin/authors/new"
          className="flex items-center space-x-2 px-6 py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span>New Author</span>
        </Link>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-spacing-y-2">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                <th className="px-6 py-5 rounded-tl-2xl">Author</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Added Date</th>
                <th className="px-6 py-5 text-right rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-sm">
              {!authors || authors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 font-light">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users size={36} className="text-zinc-300" />
                      <p className="font-semibold text-zinc-500 mt-2">No authors found</p>
                      <p className="text-xs max-w-xs">Create your first author to assign them to blog posts.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <tr key={author.id} className="hover:bg-zinc-50/50 transition-colors">
                    {/* Name & Avatar */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden relative border border-neutral-200 shrink-0">
                          {author.profile_image ? (
                            <Image src={author.profile_image} alt={author.full_name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-orange-100 flex items-center justify-center text-[#ea580c] font-bold">
                              {author.full_name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-950 truncate">{author.full_name}</div>
                          {author.social_links && Object.keys(author.social_links).length > 0 && (
                            <div className="text-xs text-zinc-400 font-medium truncate mt-0.5 flex items-center gap-1">
                              <LinkIcon size={11} className="text-zinc-300" />
                              <span>{Object.keys(author.social_links).length} links attached</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    {/* Email */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                        {author.email ? (
                          <>
                            <Mail size={13} className="text-zinc-400" />
                            <span>{author.email}</span>
                          </>
                        ) : (
                          <span className="italic text-zinc-400">No email</span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4.5 text-zinc-500">
                      <span className="text-xs font-medium">
                        {new Date(author.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <Link
                          href={`/admin/authors/${author.id}`}
                          className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg transition-all"
                          title="Edit author"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button 
                          className="p-2 text-zinc-450 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all opacity-50 cursor-not-allowed"
                          title="Delete author (coming soon)"
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
