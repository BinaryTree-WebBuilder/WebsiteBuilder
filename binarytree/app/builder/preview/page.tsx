'use client'

import { useBuilderDataWithQuery } from '@/app/builder/utils/getPortfolioData'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ProjectCard from '@/app/builder/preview/component/project'
import PersonalInfoCard from '@/app/builder/preview/component/personalinfo' // adjust path as needed
// import ExperienceCard from '@/app/builder/preview/component/experience' // adjust path as needed
// import EducationCard from '@/app/builder/preview/component/education' // adjust path as needed
// import { User } from 'lucide-react'
import { ProjectEntry } from '../actions/project'


export default function PreviewPage() {
  const { personalInfo, projects, experience, education } = useBuilderDataWithQuery()
  const router = useRouter()

  const handlePublish = async () => {

    console.log("Entered");

  if (!personalInfo) return;

  const payload = {
    username: personalInfo.entry.first_name.trim().toLowerCase(),
    personalInfo,
    projects,
    experience,
    education,
  }

    if (!personalInfo) return;
    const res = await fetch('/api/portfolio/publish', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (data.success) {
      // router.push(`/sites/${personalInfo.entry.first_name}`)
    }
  }

  if (!personalInfo) return <div className="text-center py-10">Loading user data...</div>

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:!grid-cols-3 gap-10">
    {/* LEFT COLUMN */}
    <div className="md:col-span-1">
      <PersonalInfoCard
        personal_info={personalInfo.entry}
      />
    </div>

    <div className="md:col-span-2 space-y-10">
        <section>
          <h2 className="text-xl font-bold mb-2">Projects</h2>
          <div className="space-y-4 p-1">
            {Array.from(projects?.entries() ?? []).length === 0 && <p>No projects yet.</p>}
            {Array.from(projects?.entries() ?? []).map(([idx, project]: [number, ProjectEntry]) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </section>
    </div>




      {/* RIGHT COLUMN */}
      {/* <div className="md:col-span-2 space-y-10">
        <section>
          <h2 className="text-xl font-bold mb-2">👤 About</h2>
          <p className="space-y-4 p-1">
            {personalInfo.entry.professional_summary}
            </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">💼 Experience</h2>
          <ExperienceCard entries={experience ?? []} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">🎓 Education</h2>
          <EducationCard entries={education} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">📁 Projects</h2>
          <div className="space-y-4 p-1">
              {projects.length === 0 && <p>No projects yet.</p>}
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
        </section>

        
      </div> */}

        <Button onClick={handlePublish} className="w-full mt-4">
          🚀 Publish to {personalInfo.entry.first_name}.binarytree.me
        </Button>
    </div>
  )
}
