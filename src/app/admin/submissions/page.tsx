import { createClient } from '@/utils/supabase/server'
import { Eye, Download, Mail, DollarSign, Calendar, MessageSquare, Briefcase } from 'lucide-react'

// Helper to generate initials from a name
function getInitials(name: string) {
  if (!name) return '??'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

export default async function AdminSubmissionsPage() {
  const supabase = await createClient()
  
  const { data: submissions } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-zinc-200">
        <h2 className="text-3xl font-bold font-space-grotesk text-zinc-900 tracking-tight">Client Submissions</h2>
        <p className="text-zinc-500 mt-1 text-sm">Review incoming lead requests and project briefs.</p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/75 border-b border-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <th className="px-6 py-4">Client Info</th>
                <th className="px-6 py-4">Requested Services</th>
                <th className="px-6 py-4">Estimated Budget</th>
                <th className="px-6 py-4">Received Date</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-sm align-middle">
              {!submissions || submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 font-light">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <MessageSquare size={36} className="text-zinc-300" />
                      <p className="font-semibold text-zinc-500 mt-2">No submissions found</p>
                      <p className="text-xs max-w-xs">New inquiries submitted from your contact page will appear here instantly.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-50/30 transition-colors">
                    {/* User info with initials avatar */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {getInitials(sub.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-zinc-900 truncate">{sub.name}</div>
                          <div className="text-xs text-zinc-400 font-medium truncate mt-0.5 flex items-center gap-1">
                            <Mail size={11} className="text-zinc-300" />
                            <span>{sub.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Services selected */}
                    <td className="px-6 py-4.5">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {sub.services && sub.services.length > 0 ? (
                          sub.services.map((service: string, i: number) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-semibold border border-zinc-200/50 uppercase tracking-wider"
                            >
                              {service}
                            </span>
                          ))
                        ) : (
                          <span className="text-zinc-400 text-xs italic">None specified</span>
                        )}
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-1 text-zinc-700 font-semibold">
                        <DollarSign size={14} className="text-zinc-450" />
                        <span>{sub.budget || 'Not specified'}</span>
                      </div>
                    </td>

                    {/* Date received */}
                    <td className="px-6 py-4.5 text-zinc-500">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Calendar size={13} className="text-zinc-400" />
                        <span>
                          {new Date(sub.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Expandable description panel */}
                    <td className="px-6 py-4.5 text-right">
                      <details className="relative inline-block group">
                        <summary className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-black rounded-lg transition-colors text-xs font-semibold cursor-pointer list-none select-none shadow-sm">
                          <Eye size={13} />
                          <span>View Detail</span>
                        </summary>
                        <div className="absolute right-0 mt-2 p-5 bg-white border border-zinc-200 rounded-2xl shadow-xl w-80 text-left z-10 space-y-4">
                          <div>
                            <div className="flex items-center gap-1 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                              <MessageSquare size={12} />
                              <span>Project Brief</span>
                            </div>
                            <p className="text-zinc-750 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                              {sub.project_description || sub.message || 'No description provided.'}
                            </p>
                          </div>

                          {sub.attachments && sub.attachments.length > 0 && (
                            <div>
                              <div className="flex items-center gap-1 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                <Briefcase size={12} />
                                <span>Attachments ({sub.attachments.length})</span>
                              </div>
                              <div className="space-y-1.5">
                                {sub.attachments.map((att: any, i: number) => (
                                  <a 
                                    key={i} 
                                    href={att.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold bg-blue-50/50 p-2 rounded-lg border border-blue-100/30 truncate"
                                  >
                                    <Download size={11} className="shrink-0" />
                                    <span className="truncate">{att.name || `File ${i + 1}`}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </details>
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
