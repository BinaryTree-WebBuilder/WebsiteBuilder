'use client'

import { use, useEffect, useState } from 'react'
import { useExperienceById } from '@/app/builder/stores/useExperienceEntries '
import ExperienceForm, { ExperienceFormData } from '@/app/builder/components/forms/ExperienceForm'
import { toast } from 'sonner'



export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ unwrap the params with use()
  const { data: experience, isLoading, isError,refetch } = useExperienceById(id)
  const [initialData, setInitialData] = useState<ExperienceFormData | null>(null)

  useEffect(() => {
    if (experience) {
      setInitialData({
        company: experience.company,
        employment_type: experience.employment_type || '', // Add this line
        position: experience.position,
        location: experience.location,
        start_month: experience.start_month,
        start_year: experience.start_year,
        end_month: experience.end_month,
        end_year: experience.end_year,
        ongoing: experience.ongoing,
        job_description: experience.job_description,
        skills: experience.skills || []
      })
    }
  }, [experience])

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load experience')
    }
  }, [isError])

  if (isLoading || !initialData) {
    return <div className="text-center py-10 text-gray-500">Loading experience...</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Experience - {initialData.company} | {initialData.position}</h2>
<ExperienceForm
  isEdit
  initialData={initialData}
  experienceId={id}
  onSuccess={() => refetch()}
/>    

</div>
  )
}
