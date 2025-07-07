import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'
import { NextResponse } from 'next/server'


export async function middleware(req: NextRequest) {

  const host = req.headers.get('host') || ''
  const hostname = host.split(':')[0] // Removes port

  // Handle local subdomains like zion.localhost
  if (hostname.endsWith('.localhost')) {
    const subdomain = hostname.replace('.localhost', '')
    return NextResponse.rewrite(new URL(`/sites/${subdomain}.html`, req.url))
  }

  return await updateSession(req)
}
export const config = {
  matcher: ['/main/:path*','/auth/:path*' , '/builder/:path*'], // now runs on both homepage and builder routes
}