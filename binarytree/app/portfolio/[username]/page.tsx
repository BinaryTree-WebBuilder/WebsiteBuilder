
import { getDataByUsername } from './action'

import { notFound } from 'next/navigation'

export const dynamic = 'force-static' // enable SSG with caching
export const revalidate = 3600 // ISR: regenerate every hour (adjust as needed) SSG: 0

export async function generateStaticParams() {
  const users = ['zionjiam'] // simulate fetching usernames

  return users.map(username => ({ username })) // return [{ username: 'zionjiam' }]
}

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }>}) {
  const {username} = await params;
  const user = await getDataByUsername(username)
  if (!user) notFound()

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{user.full_name}</h1>
      <h1 className="text-4xl font-bold mb-4">{user.email}</h1>
      <h1 className="text-4xl font-bold mb-4">{user.location}</h1>
      {/* TODO: Projects, Skills, etc */}
    </div>
  )
}