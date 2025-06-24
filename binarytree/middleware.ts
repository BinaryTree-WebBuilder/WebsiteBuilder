import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'
import { NextResponse } from 'next/server'


export async function middleware(req: NextRequest) {

  // const hostname = req.headers.get('host') || ''
  // const url = req.nextUrl

  // const isLocalhost = hostname.includes('localhost')
  // const subdomain = isLocalhost
  //   ? hostname.split('.')[0] // username.localhost
  //   : hostname.split('.')[0] // username.binarytree.me in prod

  // // Prevent Next.js from catching 'www' or your main domain
  // if (
  //   subdomain &&
  //   subdomain !== 'localhost' &&
  //   subdomain !== 'www'
  // ) {
  //   url.pathname = `/portfolio/${subdomain}`
  //   return NextResponse.rewrite(url)
  // }

  return await updateSession(req)
}
export const config = {
  matcher: ['/main/:path*','/auth/:path*' , '/builder/:path*'], // now runs on both homepage and builder routes
}