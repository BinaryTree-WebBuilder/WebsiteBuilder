'use client'

import ProjectForm from '@/app/builder/components/ProjectForm'

export default function AddProjectPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">➕ Add New Project</h2>
      </div>
      <ProjectForm onSuccess={() => {}} />
    </div>
  )
}