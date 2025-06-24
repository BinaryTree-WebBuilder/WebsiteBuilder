'use client'

import { useBuilderStoreDataWithFetch } from '@/app/builder/utils/getPortfolioData'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ProjectCard from '@/app/builder/preview/component/project'
import AboutMeCard from '@/app/builder/preview/component/personalinfo' // adjust path as needed
import ExperienceCard from '@/app/builder/preview/component/experience' // adjust path as needed
import EducationCard from '@/app/builder/preview/component/education' // adjust path as needed
import { User } from 'lucide-react'


export default function PreviewPage() {
  const { personalInfo, projects, experience, education } = useBuilderStoreDataWithFetch()
  const router = useRouter()

  const handlePublish = async () => {
    const res = await fetch('/api/portfolio/publish', {
      method: 'POST',
      body: JSON.stringify({ username: personalInfo?.full_name }),
    })

    const data = await res.json()
    if (data.success) {
      router.push(`/preview/${personalInfo?.full_name}`)
    }
  }

  if (!personalInfo) return <div className="text-center py-10">Loading user data...</div>

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:!grid-cols-3 gap-10">
    {/* LEFT COLUMN */}
    <div className="md:col-span-1">
      <AboutMeCard
        full_name={personalInfo.full_name}
        email={personalInfo.email}
        location={personalInfo.location}
        profile_image_url={personalInfo.profile_image_url}
        github_url={personalInfo.github_url}
        linkedin_url={personalInfo.linkedin_url}
      />
    </div>




      {/* RIGHT COLUMN */}
      <div className="md:col-span-2 space-y-10">
        {/* PROJECTS */}
        <section>
          <h2 className="text-xl font-bold mb-2">👤 About</h2>
          <p className="space-y-4 p-1">
            {personalInfo.bio}
            </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold mb-4">💼 Experience</h2>
          <ExperienceCard entries={experience} />
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold mb-4">🎓 Education</h2>
          <EducationCard entries={education} />
        </section>

                {/* Projects */}
        <section>
          <h2 className="text-xl font-bold mb-2">📁 Projects</h2>
          <div className="space-y-4 p-1">
              {projects.length === 0 && <p>No projects yet.</p>}
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
        </section>

        
      </div>

              <Button onClick={handlePublish} className="w-full mt-4">
          🚀 Publish to {personalInfo.full_name}.binarytree.me
        </Button>
    </div>
  )
}
