'use client'

import { useState, useEffect } from 'react'
import { submitExperience, updateExperience, deleteExperience } from '../../actions/experience'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { ExperienceFormDialog } from '../../components/ExperienceFormDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { useExperienceEntries } from '../../stores/useExperienceEntries '
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'


const monthNames = [
  'Ongoing', // index 0 (not used)
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]


export default function ExperienceFormPage() {
const { data: entries = [], isLoading, refetch } = useExperienceEntries()
  const [error, setError] = useState<string | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!isLoading) {
      refetch().catch(() => setError('Failed to load experience'))
    }
  }, [isLoading, refetch])

  const confirmDelete = (entry: any) => {
    setSelectedEntry(entry)
    setIsDeleteConfirmOpen(true)
  }


  const handleDelete = async () => {
    if (!selectedEntry?.id) return

    const result = await deleteExperience(selectedEntry.id)
    if (result.success) {
      toast.success('🗑️ Experience deleted successfully!', { id: 'exp-toast' })
      setIsDeleteConfirmOpen(false)
      await refetch()
    } else {
      toast.error('❌ Failed to delete experience. Try again.', { id: 'exp-toast' })
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index))
  }

if (isLoading) {
  return (
    <div className="flex justify-center mt-10">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent" />
    </div>
  )
}

if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">💼 Experience</h2>
        <Link href="experience/add">
          <Button className="bg-gradient-primary-2 p-6">+ Add Experience</Button>
        </Link>
      </div>

            {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Link
            href="experience/add"
            className="block border-4 border-dashed border-gray-400 rounded-xl p-12 hover:border-gray-500 text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-lg font-semibold">You haven&apos;t added any experience entries yet.</p>
              <p className="text-lg font-semibold">+ Click to add</p>
            </div>
          </Link>
        </motion.div>
      ) : (
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
                  <div className="text-base font-medium mt-1">
                      <p>
                        {monthNames[exp.start_month]} {exp.start_year}{' — '}
                        {monthNames[exp.end_month]} {exp.end_year}
                      </p>
                  </div>

                  {exp.skills?.length > 0 ? (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill: string, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="rounded-full bg-gray-100 text-gray-800 px-3 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <Link href="experience/edit/[experienceId]" as={`experience/edit/${exp.id}`}>
                        <Badge
                          variant="outline"
                          className="rounded-full border border-blue-500 text-blue-600 bg-blue-50 px-3 py-1 text-xs cursor-pointer hover:bg-blue-100 transition"
                        >
                          <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />Missing skills – click to edit
                        </Badge>
                      </Link>
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
                      <Link href="experience/edit/[experienceId]" as={`experience/edit/${exp.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                            aria-label="Edit experience"
                          >
                          <Pencil className="w-5 h-5 text-blue-600" />
                        </Button>
                        </Link>
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

      )}



      {/* <ExperienceFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialData={selectedEntry}
      /> */}

      <ConfirmationDialog
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${selectedEntry?.company} : ${selectedEntry?.position}"?`}
      />
    </div>
  )
}
