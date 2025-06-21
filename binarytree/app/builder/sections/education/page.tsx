'use client';

import { useState, useEffect } from 'react';
import { submitEducation, updateEducation, deleteEducation } from './action';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { EducationFormDialog } from '../../components/EducationFormDialog';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { useEducationStore } from '../../stores/userEducationStores';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';


export default function EducationFormPage() {
  const { entries, loaded, fetchEducation } = useEducationStore();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!loaded) fetchEducation();
  }, [loaded, fetchEducation]);

  const openNewForm = () => {
    setSelectedEntry(null);
    setIsFormOpen(true);
  };

  const openEditForm = (entry: any) => {
    setSelectedEntry(entry);
    setIsFormOpen(true);
  };

  const confirmDelete = (entry: any) => {
    setSelectedEntry(entry);
    setIsDeleteConfirmOpen(true);
  };

  const handleSave = async (data: any) => {
    setFormState('loading');
    toast.loading('Saving education...', { id: 'edu-toast' });

    const result = selectedEntry
      ? await updateEducation(selectedEntry.id, data)
      : await submitEducation([data]);

    if (result.success) {
      toast.success('✅ Education saved successfully!', { id: 'edu-toast' });
      setIsFormOpen(false);
      await fetchEducation();
      setFormState('success');
    } else {
      toast.error('❌ Failed to save education. Try again.', { id: 'edu-toast' });
      setFormState('error');
    }

    setTimeout(() => setFormState('idle'), 2500);
  };

  const handleDelete = async () => {
    if (!selectedEntry?.id) return;
    const result = await deleteEducation(selectedEntry.id);
    if (result.success) {
      toast.success('🗑️ Education deleted successfully!');
      setIsDeleteConfirmOpen(false);
      await fetchEducation();
    } else {
      toast.error('❌ Failed to delete education. Try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">📘 Education</h2>
        <Button className="bg-gradient-primary-2 p-6" onClick={openNewForm}>
          + Add Education
        </Button>
      </div>

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
                    {edu.institution_name} – {edu.degree} | {edu.field_of_study}
                  </h3>
                  <div className="text-sm mt-1">
                    <p>
                      <span className="font-semibold text-sm">From:</span> {edu.start_date}{' '}
                      <span className="font-semibold">to</span> {edu.graduation_date}
                    </p>
                    <p>
                      <span className="font-semibold text-sm">Location:</span> {edu.institution_location}
                    </p>
                  </div>

              <AnimatePresence initial={false}>
                {expandedIndex === idx && edu.achievements?.length > 0 && (
                  <motion.div
                    key="achievements"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden mt-3"
                  >
                    <p className="font-semibold underline">Achievements</p>
                    <ul className="list-disc pl-5 mt-1 text-sm text-gray-800">
                      {edu.achievements.map((a: string, i: number) => (
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
                    <Button variant="ghost" size="icon" onClick={() => openEditForm(edu)}>
                      <Pencil className="w-5 h-5 text-blue-600" />
                    </Button>
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
  );
}
