'use client';

import { useState, useEffect } from 'react';
import { submitEducation, updateEducation, deleteEducation } from './action';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { EducationFormDialog } from '../../components/EducationFormDialog';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { useEducationStore } from '../../stores/userEducationStores';

export default function EducationFormPage() {
  const { entries, loaded, fetchEducation } = useEducationStore();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);

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
    const result = selectedEntry
      ? await updateEducation(selectedEntry.id, data)
      : await submitEducation([data]);

    if (result.success) {
      setFormState('success');
      setIsFormOpen(false);
      await fetchEducation();
    } else {
      setFormState('error');
    }

    setTimeout(() => setFormState('idle'), 2500);
  };

  const handleDelete = async () => {
    if (!selectedEntry?.id) return;
    const result = await deleteEducation(selectedEntry.id);
    if (result.success) {
      setIsDeleteConfirmOpen(false);
      await fetchEducation();
    } else {
      alert('Failed to delete entry.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">📘 Education</h2>
        <Button className="bg-gradient-primary-2 px-6 py-3" onClick={openNewForm}>
          + Add Education
        </Button>
      </div>

      {formState === 'success' && <p className="text-green-600 mb-4">✅ Education saved successfully!</p>}
      {formState === 'error' && <p className="text-red-600 mb-4">❌ Failed to save education. Try again.</p>}
      {formState === 'loading' && <p className="text-blue-600 mb-4">⏳ Saving...</p>}

      <div className="grid gap-6">
        {entries.map((edu, idx) => (
          <Card key={idx} className="p-6 relative">
            <CardContent className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{edu.institution_name}</h3>
                  <p className="text-md text-gray-600">{edu.institution_location}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditForm(edu)}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => confirmDelete(edu)}
                    className="text-gray-700 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>

              <div className="text-md">
                <p><strong>Degree:</strong> {edu.degree} in {edu.field_of_study}</p>
                <p><strong>Start Date:</strong> {edu.start_date}</p>
                <p><strong>Graduation Date:</strong> {edu.graduation_date}</p>
              </div>

              {edu.achievements?.length > 0 && (
                <div>
                  <p className="font-semibold underline">Achievements</p>
                  <ul className="list-disc pl-5 mt-1 text-sm text-gray-800">
                    {edu.achievements.map((a: string, i: number) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
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
