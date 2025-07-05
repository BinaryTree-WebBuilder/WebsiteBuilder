'use client'

import { use, useEffect, useState } from 'react'
import { useEducationById } from '@/app/builder/stores/useEducationEntries'
import EducationForm, { EducationFormData } from '@/app/builder/components/forms/EducationForm'
import { toast } from 'sonner'



export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ unwrap the params with use()
  const { data: education, isLoading, isError,refetch } = useEducationById(id)
  const [initialData, setInitialData] = useState<EducationFormData | null>(null)

  useEffect(() => {
    if (education) {
      setInitialData({
        institution_name: education.institution_name,
        course: education.course,
        field_of_study: education.field_of_study,
        location: education.location,
        start_month: education.start_month,
        start_year: education.start_year,
        end_month: education.end_month,
        end_year: education.end_year,
        highlights: education.highlights,
      })
    }
  }, [education])

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load education')
    }
  }, [isError])

  if (isLoading || !initialData) {
    return <div className="text-center py-10 text-gray-500">Loading education...</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Education - {initialData.institution_name}</h2>
<EducationForm
  isEdit
  initialData={initialData}
  educationId={id}
  onSuccess={() => refetch()}
/>    

</div>
  )
}
