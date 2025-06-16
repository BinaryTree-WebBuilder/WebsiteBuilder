'use server'
import { revalidatePath } from 'next/cache'
// remove redirect import because redirect should be client side or handled differently
import { createClient } from '@/app/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/builder`,
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  if (!signUpData?.user) {
    return { error: 'User creation failed' };
  }


  revalidatePath('/', 'layout');

  // Return success message instead of redirecting here
  return { success: 'Check your email to confirm your account.' };
}

export async function googleSignup() {
  const supabase = await createClient();

  // Start the OAuth flow with Google provider, specifying the redirect URL with `next=/builder`
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?next=/builder`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
}
