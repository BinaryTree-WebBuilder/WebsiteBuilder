

// app/builder/page.tsx
import { redirect } from 'next/navigation'
import LogoutButton from '@/app/auth/components/logoutbutton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';



export default async function BuilderPage() {
  const supabase = createServerComponentClient({ cookies });

  // Securely get the user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    // Not authenticated, redirect to login
    redirect('/auth/login');
  }

    // Optional: Get the access token if needed for client-side API calls
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token;

await fetch("https://vlgjnvjuxgorhowvkfzt.supabase.co/functions/v1/save-personal-info-function", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    full_name: "hello",
    email: "heheh",
    phone: "...",
    location: "...",
    linkedin_url: "...",
    github_url: "WTF.com",
    bio: "...",
    profile_image_url: "...", // e.g., from Supabase Storage
  }),
});


  return (      
    <div className="p-4">
      👷 Builder Page (Protected)
      {user.email ? (
        <p className="text-lg">
          Welcome, <span className="font-semibold">{user.email}</span>!
        </p>
      ) : (
        <p className="text-lg">Welcome!</p>
      )}
      <LogoutButton />
    </div>
  )
}
