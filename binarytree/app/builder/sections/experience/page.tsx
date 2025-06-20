'use client'

import { useState, useEffect } from 'react'
import { submitExperience, updateExperience, deleteExperience } from './action'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { ExperienceFormDialog } from '../../components/ExperienceFormDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { useExperienceStore } from '../../stores/userExperienceStores'

import { toast } from "sonner"


export default function ExperienceFormPage() {
  const { entries, loaded, fetchExperience } = useExperienceStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)


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
    toast.loading("Saving experience...", {
      id: "exp-toast",
    });

    const result = selectedEntry
      ? await updateExperience(selectedEntry.id, data)
      : await submitExperience([data]);

    if (result.success) {
      toast.success("✅ Experience saved successfully!", {
        id: "exp-toast",
      });
      await fetchExperience();
      setIsFormOpen(false);
    } else {
      throw new Error();
    }
  } catch {
    toast.error("❌ Failed to save experience. Try again.", {
      id: "exp-toast",
    });
  }
};

  const handleDelete = async () => {
    if (!selectedEntry?.id) return

    const result = await deleteExperience(selectedEntry.id)
    if (result.success) {
      toast.success("🗑️ Experience deleted successfully!", { id: "exp-toast" });
      setIsDeleteConfirmOpen(false)
      await fetchExperience()
    } else {
    toast.error("❌ Failed to delete experience. Try again.", { id: "exp-toast" });
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-gray-50">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold">💼 Experience</h2>
          </div>
          <Button className="bg-gradient-primary-2 px-8 py-4 h-fit" onClick={openNewForm}>
            + Add Experience
          </Button>
        </div>
      </div>


      <Accordion type="single" collapsible className="w-full space-y-4 mb-10 bg-white">
        {entries.map((edu, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-gray-200 py-2 px-4 rounded-lg shadow-sm"
          >
            <AccordionTrigger className="truncate text-lg font-semibold text-left text-gray-900 cursor-pointer">
              <span className="truncate">{edu.company}</span>
            </AccordionTrigger>
            <AccordionContent className="text-lg leading-relaxed">
              <p className="text-lg my-2"><span className="font-semibold">Position:</span> {edu.position}</p>
              <p className="text-lg my-2"><span className="font-semibold">Start Date:</span> {edu.start_date}</p>
              <p className="text-lg my-2"><span className="font-semibold">End Date:</span> {edu.end_date}</p>
              <p className="text-lg my-2"><span className="font-semibold">Current Working here:</span> {edu.currently_working}</p>
              <p className="text-lg my-2"><span className="font-semibold">Job Description:</span> <br/>{edu.job_description}</p>
              <p className="text-lg my-2"><span className="font-semibold underline">Technologies</span></p>
              {edu.technologies?.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-lg">
                  {edu.technologies.map((a: string, i: number) => (
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
