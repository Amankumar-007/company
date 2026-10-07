import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { getProjectById } from '@/data/projects'
import { legacyServiceIds } from '@/data/service-pages'

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Legacy `/project-detail?id=N` → `/case-studies/{slug}`. Done here (not in the
  // page) so crawlers get a real 308 — a redirect() from a streamed page falls
  // back to a client-side redirect with a 200 status.
  if (pathname === '/project-detail') {
    const id = searchParams.get('id')
    const project = id ? getProjectById(id) : null
    const url = request.nextUrl.clone()
    url.search = ''
    url.pathname = project ? `/case-studies/${project.slug}` : '/case-studies'
    return NextResponse.redirect(url, 308)
  }

  // Legacy `/service-detail?id=…` pages (noindexed) → indexable /services/{slug} pages
  if (pathname === '/service-detail') {
    const slug = (legacyServiceIds as Record<string, string>)[searchParams.get('id') ?? '']
    const url = request.nextUrl.clone()
    url.search = ''
    url.pathname = slug ? `/services/${slug}` : '/services'
    return NextResponse.redirect(url, 308)
  }

  // Only the admin CMS (and the API routes it calls) needs the Supabase session
  // refreshed. This used to run on every request, adding a Supabase auth
  // round-trip to every public page load and crawler hit.
  return await updateSession(request)
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*', '/project-detail', '/service-detail'],
}
