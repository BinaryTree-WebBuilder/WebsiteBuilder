// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code'); // For some auth types, this might be 'code'
  const token_hash = requestUrl.searchParams.get('token_hash'); // For email confirmations
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;

  if (token_hash && type) { // Check for email confirmation parameters
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (!error) {
      // Successful confirmation! Redirect to your desired page.
      // The user's session will now be active.
      return NextResponse.redirect(new URL('/builder', requestUrl.origin));
    }
  } else if (code) { // Handle other auth types (e.g., OAuth, magic link if it uses 'code')
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    await supabase.auth.exchangeCodeForSession(code);
    // After exchanging code, you might want to redirect to the same page
    // or a default authenticated page.
    return NextResponse.redirect(new URL('/builder', requestUrl.origin));
  }

  // If no token_hash/type or code, or an error occurred, redirect to an error page or login.
  return NextResponse.redirect(new URL('/auth/login?error=email_confirmation_failed', requestUrl.origin));
}