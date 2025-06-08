import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const authBasePath = '/main/auth/'; // Use a base path

  // If the user is authenticated AND they are trying to access an auth path
  if (session && req.nextUrl.pathname.startsWith(authBasePath)) {
    // Redirect them to a relevant authenticated page (e.g., dashboard or home)
    const redirectUrl = req.nextUrl.origin + '/builder/test'; // Or '/home', or specific to their role

    return NextResponse.redirect(redirectUrl);
  }
  
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}