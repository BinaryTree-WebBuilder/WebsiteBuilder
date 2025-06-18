'use client'

import { useState, useEffect } from 'react'
import { submitEducation, updateEducation, deleteEducation } from './action'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { EducationFormDialog } from '../../components/EducationFormDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { useEducationStore } from '../../stores/userEducationStores'

export default function EducationFormPage() {
  const { entries, loaded, fetchEducation } = useEducationStore()
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)

  useEffect(() => {
    if (!loaded) fetchEducation()
  }, [loaded, fetchEducation])

  const openNewForm = () => {
    setSelectedEntry(null)
    setIsFormOpen(true)
  }

  const openEditForm = (entry: any) => {
    setSelectedEntry(entry)
    setIsFormOpen(true)
  }

  const confirmDelete = (entry: any) => {
    setSelectedEntry(entry)
    setIsDeleteConfirmOpen(true)
  }

  const handleSave = async (data: any) => {
    setFormState('loading')

    const result = selectedEntry
      ? await updateEducation(selectedEntry.id, data)
      : await submitEducation([data])

    if (result.success) {
      setFormState('success')
      setIsFormOpen(false)
      await fetchEducation()
    } else {
      setFormState('error')
    }

    setTimeout(() => setFormState('idle'), 3000)
  }

  const handleDelete = async () => {
    if (!selectedEntry?.id) return

    const result = await deleteEducation(selectedEntry.id)
    if (result.success) {
      setIsDeleteConfirmOpen(false)
      await fetchEducation()
    } else {
      alert('Failed to delete entry.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
<div className="flex items-start justify-between mb-6">
  <div>
    <h2 className="text-2xl font-semibold">Education</h2>
    <p className="text-gray-600">Add your Education History and Achievements</p>
  </div>
  <Button className="bg-gradient-primary-2 px-8 py-4 h-fit" onClick={openNewForm}>
    + Add Education
  </Button>
</div>

      {formState === 'success' && <p className="text-green-600 mt-2">✅ Education saved successfully!</p>}
      {formState === 'error' && <p className="text-red-600 mt-2">❌ Failed to save education. Try again.</p>}
      {formState === 'loading' && <p className="text-blue-600 mt-2">⏳ Saving...</p>}

      <Accordion type="single" collapsible className="w-full space-y-4 mb-10 bg-white">
        {entries.map((edu, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-gray-200 py-3 px-6 rounded-lg shadow-sm"
          >
            <AccordionTrigger className="truncate text-xl font-semibold text-left text-gray-900 cursor-pointer">
              <span className="truncate">{edu.institution_name}</span>
            </AccordionTrigger>
            <AccordionContent className="text-lg leading-relaxed">
              <p className="text-lg my-2 font-semibold">{edu.degree} in {edu.field_of_study}</p>
              <p className="text-lg my-2"><span className="font-semibold">Location:</span> {edu.institution_location}</p>
              <p className="text-lg my-2"><span className="font-semibold">Start Date:</span> {edu.start_date}</p>
              <p className="text-lg my-2"><span className="font-semibold">Graduation:</span> {edu.graduation_date}</p>
              <p className="text-lg my-2"><span className="font-semibold underline">Achievements</span></p>
              {edu.achievements?.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-lg">
                  {edu.achievements.map((a: string, i: number) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <Button size="lg" onClick={() => openEditForm(edu)}>Edit</Button>
                <Button size="lg" variant="destructive" onClick={() => confirmDelete(edu)}>Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <EducationFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialData={selectedEntry}
      />

      <ConfirmationDialog
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${selectedEntry?.institution_name}"?`}
      />
    </div>
  )
}
