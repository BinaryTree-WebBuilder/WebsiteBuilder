

// app/builder/page.tsx
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/app/main/auth/components/logoutbutton'


export default async function BuilderPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()


  if (!session) {
    redirect('/main/auth/login') // ✅ Redirect on server
  }

  // Access the user object from the session
  const user = session.user;

  // You can now access user properties like email, id, etc.
  const userEmail = user?.email; // Use optional chaining in case user is null/undefined (though it shouldn't be here)



  return (
    <div className="p-4">
      👷 Builder Page (Protected)
      {userEmail ? (
        <p className="text-lg">
          Welcome, <span className="font-semibold">{userEmail}</span>!
        </p>
      ) : (
        <p className="text-lg">Welcome!</p>
      )}
      <LogoutButton />
    </div>
  )
}
