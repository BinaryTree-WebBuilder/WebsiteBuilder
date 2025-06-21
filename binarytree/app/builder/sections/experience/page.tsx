'use client'

import { useState, useEffect } from 'react'
import { submitExperience, updateExperience, deleteExperience } from './action'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2 } from 'lucide-react'
import { ExperienceFormDialog } from '../../components/ExperienceFormDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { useExperienceStore } from '../../stores/userExperienceStores'
import { toast } from 'sonner'

export default function ExperienceFormPage() {
  const { entries, loaded, fetchExperience } = useExperienceStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (!loaded) fetchExperience()
  }, [loaded, fetchExperience])

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
    try {
      toast.loading('Saving experience...', { id: 'exp-toast' })

      const result = selectedEntry
        ? await updateExperience(selectedEntry.id, data)
        : await submitExperience([data])

      if (result.success) {
        toast.success('✅ Experience saved successfully!', { id: 'exp-toast' })
        await fetchExperience()
        setIsFormOpen(false)
      } else {
        throw new Error()
      }
    } catch {
      toast.error('❌ Failed to save experience. Try again.', { id: 'exp-toast' })
    }
  }

  const handleDelete = async () => {
    if (!selectedEntry?.id) return

    const result = await deleteExperience(selectedEntry.id)
    if (result.success) {
      toast.success('🗑️ Experience deleted successfully!', { id: 'exp-toast' })
      setIsDeleteConfirmOpen(false)
      await fetchExperience()
    } else {
      toast.error('❌ Failed to delete experience. Try again.', { id: 'exp-toast' })
    }
  }

  const toggleDescription = (index: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">💼 Experience</h2>
        <Button className="bg-gradient-primary-2 p-6" onClick={openNewForm}>
          + Add Experience
        </Button>
      </div>

      <div className="grid gap-6">
        {entries.map((exp, idx) => {
          const isExpanded = expandedDescriptions[idx] ?? false
          const description = exp.job_description || ''
          const preview = description.slice(0, 180)

          return (
            <Card key={idx} className="p-6 relative">
              <CardContent>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold">
                    {exp.company} — {exp.position}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditForm(exp)}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => confirmDelete(exp)}
                      className="text-gray-700 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-semibold">
                    {exp.start_date} → {exp.currently_working ? 'Present' : exp.end_date}
                  </p>

                  {exp.technologies?.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold mb-1">Technologies Used:</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="rounded-full bg-gray-100 text-gray-800 px-3 py-1 text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                  <div className="mt-2">
                    <span className="font-semibold">Job Description:</span>{' '}
                    <p className="text-gray-700 mt-1 whitespace-pre-line">
                      {isExpanded ? description : `${preview}${description.length > 180 ? '...' : ''}`}
                    </p>
                    {description.length > 180 && (
                      <button
                        className="text-sm text-blue-600 hover:underline mt-1"
                        onClick={() => toggleDescription(idx)}
                      >
                        {isExpanded ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <ExperienceFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialData={selectedEntry}
      />

      <ConfirmationDialog
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${selectedEntry?.company} : ${selectedEntry?.position}"?`}
      />
    </div>
  )
}
