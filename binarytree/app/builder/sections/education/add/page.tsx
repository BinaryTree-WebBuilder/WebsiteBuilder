'use client'

import EducationForm from '@/app/builder/components/forms/EducationForm'

export default function AddProjectPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">➕ Add New Education</h2>
      </div>
      <EducationForm onSuccess={() => {}} />
    </div>
  )
}