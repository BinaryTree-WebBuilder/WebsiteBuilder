import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'


export async function middleware(req: NextRequest) {

  return await updateSession(req)
}
export const config = {
  matcher: ['/builder/:path*'], // adjust for protected routes
}