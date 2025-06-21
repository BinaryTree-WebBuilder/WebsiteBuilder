'use client'

import { useState, useEffect } from 'react'
import { submitExperience, updateExperience, deleteExperience } from './action'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { ExperienceFormDialog } from '../../components/ExperienceFormDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { useExperienceStore } from '../../stores/userExperienceStores'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion';


export default function ExperienceFormPage() {
  const { entries, loaded, fetchExperience } = useExperienceStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index))
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
        {entries.map((exp, idx) => (
          <Card key={idx} className="py-6 pl-10 pr-6 relative border-none shadow-md">
            <div className="absolute top-0 left-0 bg-color-tertiary-1 text-white text-xs font-bold py-2 px-3 rounded-tl-lg rounded-br-lg z-10">
              {idx + 1}
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col md:!flex-row sm:justify-between gap-4">

                {/* Left Section */}
                <div className="w-full sm:w-3/4">
                  <h3 className="text-lg font-bold">
                    {exp.company} — {exp.position}
                  </h3>
                  <div className="text-sm mt-1">
                    <p>
                      <span className="font-semibold">Duration:</span>{' '}
                      {exp.start_date} → {exp.currently_working ? 'Present' : exp.end_date}
                    </p>
                  </div>

                  {exp.technologies?.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="rounded-full bg-gray-100 text-gray-800 px-3 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                <AnimatePresence initial={false}>
                  {expandedIndex === idx && (
                    <motion.div
                      key="descriptions"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden mt-3"
                    >
                      <p className="font-semibold underline">Job Description</p>
                      <p className="text-sm text-gray-800 whitespace-pre-line mt-1">
                        {exp.job_description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>


                </div>

                {/* Right Section */}
                <div className="sm:w-1/4 flex sm:flex-col items-end sm:items-end justify-between sm:justify-start gap-2">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditForm(exp)}>
                      <Pencil className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => confirmDelete(exp)}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-blue-600 text-xs hover:underline"
                    onClick={() => toggleExpand(idx)}
                  >
                    {expandedIndex === idx ? (
                      <>
                        Hide Details <ChevronUp size={16} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Show More Details <ChevronDown size={16} className="ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
