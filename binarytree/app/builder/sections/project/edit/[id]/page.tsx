'use client'

import { use, useEffect, useState } from 'react'
import { useProjectById } from '@/app/builder/stores/useProjectEntries'
import ProjectForm, { ProjectFormData } from '@/app/builder/components/forms/ProjectForm'
import { toast } from 'sonner'



export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ unwrap the params with use()
  const { data: project, isLoading, isError,refetch } = useProjectById(id)
  const [initialData, setInitialData] = useState<ProjectFormData | null>(null)

  useEffect(() => {
    if (project) {
      setInitialData({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        github_url: project.github_repo_url,
        live_url: project.website_url,
        video_url: project.video_url,
        image_url: project.image_url,
        image_file: null,
      })
    }
  }, [project])

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load project')
    }
  }, [isError])

  if (isLoading || !initialData) {
    return <div className="text-center py-10 text-gray-500">Loading project...</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Project - {initialData.title}</h2>
<ProjectForm
  isEdit
  initialData={initialData}
  projectId={id}
  onSuccess={() => refetch()}
/>    

</div>
  )
}
