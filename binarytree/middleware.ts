import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'


export async function middleware(req: NextRequest) {

  return await updateSession(req)
}
export const config = {
  matcher: ['/main/:path*','/auth/:path*' , '/builder/:path*'], // now runs on both homepage and builder routes
}