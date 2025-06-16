'use client'

import { useState, useEffect } from 'react'
import { getEducationEntries, submitEducation, updateEducation, deleteEducation } from './action'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { EducationFormDialog } from '../../components/EducationFormDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'



export default function EducationFormPage() {
  const [existingEntries, setExistingEntries] = useState<any[]>([])
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    const { success, entries } = await getEducationEntries()
    if (success) setExistingEntries(entries)
  }

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
      await fetchEntries()
    } else {
      setFormState('error')
    }

    setTimeout(() => setFormState('idle'), 3000)
  }

  const handleDelete = async () => {
    if (!selectedEntry?.id) return

    console.log (selectedEntry?.id);

    const result = await deleteEducation(selectedEntry.id)
    if (result.success) {
      setIsDeleteConfirmOpen(false)
      await fetchEntries()
    } else {
      alert('Failed to delete entry.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      <p className="text-gray-600 mb-6">Add your Education History and Achievements</p>

      {formState === 'success' && (
        <p className="text-green-600 mt-2">✅ Education saved successfully!</p>
      )}
      {formState === 'error' && (
        <p className="text-red-600 mt-2">❌ Failed to save education. Try again.</p>
      )}
      {formState === 'loading' && (
        <p className="text-blue-600 mt-2">⏳ Saving...</p>
      )}

      <Accordion type="single" collapsible className="w-full space-y-4 mb-10">
        {existingEntries.map((edu, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-gray-200 rounded-lg px-6 shadow-sm"
          >
            <AccordionTrigger className="text-xl py-6 font-semibold text-left text-gray-900 cursor-pointer">
              <span className='truncate'>{edu.institution_name}</span>
            </AccordionTrigger>
            <AccordionContent className="text-lg text-gray-600 leading-relaxed">
              <p className="text-lg text-gray-800">
                <strong>{edu.degree}</strong> in {edu.field_of_study}
              </p>
              <p className="text-lg">Location: {edu.institution_location}</p>
              <p className="text-lg">Graduation: {edu.graduation_date}</p>
              {edu.achievements?.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-lg">
                  {edu.achievements.map((a: string, i: number) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <Button size="lg" onClick={() => openEditForm(edu)}>
                  Edit
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={() => confirmDelete(edu)}
                >
                  Delete
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

        <div className="mb-6 text-center">
        <Button className="p-8 w-1/2 bg-gradient-primary-2 cursor-pointer" onClick={openNewForm}>
          + Add Education
        </Button>
      </div>

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
