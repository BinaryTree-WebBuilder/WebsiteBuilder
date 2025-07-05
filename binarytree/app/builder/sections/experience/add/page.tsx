'use client'

import ExperienceForm from '@/app/builder/components/forms/ExperienceForm'

export default function AddProjectPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">➕ Add New Experience</h2>
      </div>
      <ExperienceForm onSuccess={() => {}} />
    </div>
  )
}