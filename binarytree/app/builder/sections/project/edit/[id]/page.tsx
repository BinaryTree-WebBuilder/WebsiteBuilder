'use client'

import { use, useEffect, useState } from 'react'
import { useProjectStore } from '@/app/builder/stores/useProjectStores'
import ProjectForm, { ProjectFormData } from '@/app/builder/components/ProjectForm'
import { toast } from 'sonner'

export default function EditProjectPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const { fetchProject, loading, getProjectById } = useProjectStore()
  const [initialData, setInitialData] = useState<ProjectFormData | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!loading) await fetchProject()

      const project = getProjectById(params.id)
      if (!project) {
        toast.error('Project not found')
        return
      }

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

    load()
  }, [loading, fetchProject, getProjectById, params.id])

  if (!initialData) return <div className="text-center py-10 text-gray-500">Loading project...</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Project - {initialData.title}</h2>
      <ProjectForm isEdit initialData={initialData} projectId={params.id} />
    </div>
  )
}
