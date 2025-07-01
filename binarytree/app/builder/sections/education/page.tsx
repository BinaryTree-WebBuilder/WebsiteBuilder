'use client';

import { useState, useEffect } from 'react';
import { submitEducation, updateEducation, deleteEducation } from '../../actions/education';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import  EducationModal  from '../../components/EducationModal';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { useEducationEntries } from '../../stores/useEducationEntries';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const monthNames = [
  '', // index 0 (not used)
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function EducationFormPage() {
  const { data: entries = [], isLoading, refetch } = useEducationEntries();
  const [error, setError] = useState<string | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!isLoading) {
      refetch().catch(() => setError('Failed to load education'))
    }
  }, [isLoading, refetch])


    const handleDelete = async () => {
      if (!selectedEntry?.id) return
  
      const result = await deleteEducation(selectedEntry.id)
      if (result.success) {
        toast.success('🗑️ Education deleted successfully!', { id: 'edu-toast' })
        setIsDeleteConfirmOpen(false)
        await refetch()
      } else {
        toast.error('❌ Failed to delete education. Try again.', { id: 'edu-toast' })
      }
    }
  

  const confirmDelete = (entry: any) => {
    setSelectedEntry(entry);
    setIsDeleteConfirmOpen(true);
  };


  
if (isLoading) {
  return (
    <div className="flex justify-center mt-10">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent" />
    </div>
  )
}

if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🎓 Education</h2>
        <Link href="education/add">
          <Button className="bg-gradient-primary-2 p-6">+ Add Education</Button>
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
            href="education/add"
            className="block border-4 border-dashed border-gray-400 rounded-xl p-12 hover:border-gray-500 text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-lg font-semibold">You haven&apos;t added any education entries yet.</p>
              <p className="text-lg font-semibold">+ Click to add</p>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {entries.map((edu, idx) => (
            <Card key={idx} className="py-6 pl-10 pr-6 relative border-none shadow-md">
              <div className="absolute top-0 left-0 bg-color-tertiary-1 text-white text-xs font-bold py-2 px-3 rounded-tl-lg rounded-br-lg z-10">
                {idx + 1}
              </div>
              <CardContent className="p-0">
                <div className="flex flex-col md:!flex-row sm:justify-between gap-4">
                  {/* Left Section: Education Info */}
                  <div className="w-full sm:w-3/4">
                    <h3 className="text-lg font-bold">
                      {edu.institution_name} – {edu.course} | {edu.field_of_study}
                    </h3>
                    <div className="text-base font-semibold mt-1">
                      <p>
                        {monthNames[edu.start_month]} {edu.start_year}{' — '}
                        {monthNames[edu.end_month]} {edu.end_year}
                      </p>
                      <p>
                        <span className="font-medium text-base">Location:</span> {edu.location}
                      </p>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedIndex === idx && edu.highlights?.length > 0 && (
                        <motion.div
                          key="achievements"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden mt-3"
                        >
                          <p className="font-semibold underline">Highlights</p>
                          <ul className="list-disc pl-5 mt-1 text-sm text-gray-800">
                            {edu.highlights.map((a: string, i: number) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Section: Actions */}
                  <div className="sm:w-1/4 flex sm:flex-col items-end justify-between gap-2">
                    <div className="flex gap-1">
                      <Link href="education/edit/[educationId]" as={`education/edit/${edu.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                            aria-label="Edit project"
                          >
                          <Pencil className="w-5 h-5 text-blue-600" />
                        </Button>
                        </Link>
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(edu)}>
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

      {/* <EducationFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialData={selectedEntry}
      /> */}

      <ConfirmationDialog
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${selectedEntry?.institution_name}" education history"?`}
      />
    </div>
  );
}
