import { createServerClient } from '@supabase/ssr'
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'


export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )
  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  console.log("pathname is: " + pathname);


  // ✅ Redirect to /builder if logged in and not already on /builder
  if (user && (pathname.startsWith('/main') || pathname.startsWith('/auth'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/builder'
    return NextResponse.redirect(url)
  }

  // ✅ Redirect to login if trying to access /builder while not logged in
  if (!user && pathname.startsWith('/builder')) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }
  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!


  console.log("User is: " + user?.email);

  return response
}