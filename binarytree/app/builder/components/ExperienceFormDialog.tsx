'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const fieldLabels: Record<string, string> = {
  company: "Company",
  position: "Position",
  start_date: "Start Date",
  end_date: "End Date",
  job_description: "Job Description",
  technologies: "Technologies Used",
  currently_working: "Are you currently working here?"
}

export interface ExperienceData {
  company: string,
  position: string,
  start_date: string,
  end_date: string | null, // <-- allow null
  job_description: string,
  technologies: string[],
  currently_working: boolean
}

interface ExperienceFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (eduData: ExperienceData) => void
  initialData?: ExperienceData
}

export function ExperienceFormDialog({
  open,
  onClose,
  onSave,
  initialData,
}: ExperienceFormDialogProps) {
  const [formData, setFormData] = useState<ExperienceData>(
    initialData ?? {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        job_description: "",
        technologies: [""],
        currently_working: false
    }
  )

  useEffect(() => {
    setFormData(
      initialData ?? {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        job_description: "",
        technologies: [""],
        currently_working: false
      }
    )
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {initialData ? 'Update Experience' : 'Add Experience'}
          </DialogTitle>
          <DialogDescription>
            Make changes or add to your experience record. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {(Object.keys(fieldLabels) as Array<keyof ExperienceData>).filter(
            (field) => field !== "technologies"
            ).map((field) => (
            <div key={field}>
                <label className="block text-md font-medium">
                {fieldLabels[field]}
                </label>

                {field === 'currently_working' ? (
                <input
                  type="checkbox"
                  checked={formData.currently_working}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    setFormData((prev) => ({
                      ...prev,
                      currently_working: isChecked,
                      end_date: isChecked ? '' : prev.end_date // Clear end_date if checked
                    }))
                  }}
                  className="w-4 h-4 mt-2"
                />
                ) : (
                <input
                  type={(field === 'end_date' || field === 'start_date') ? 'date' : 'text'}
                  value={formData[field] ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  disabled={field === 'end_date' && formData.currently_working}
                  className={`text-md w-full border p-3 rounded ${field === 'end_date' && formData.currently_working ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
                )}
            </div>
            ))}

          {/* Achievements Section (Full width) */}
          <div className="col-span-full">
            <label className="block font-medium mb-1">Technologies</label>
            {formData.technologies.map((ach, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ach ?? ''}
                  onChange={(e) => {
                    const updatedTechnologies = [...formData.technologies]
                    updatedTechnologies[idx] = e.target.value
                    setFormData({ ...formData, technologies: updatedTechnologies })
                  }}
                  className="text-md w-full border p-3 rounded"
                />
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    const updatedTechnologies = [...formData.technologies]
                    updatedTechnologies.splice(idx, 1)
                    setFormData({ ...formData, technologies: updatedTechnologies })
                  }}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="link"
              onClick={() =>
                setFormData({
                  ...formData,
                  technologies: [...formData.technologies, ''],
                })
              }
            >
              + Add Technologies
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            const cleanedData = {
              ...formData,
              end_date: formData.currently_working ? null  : formData.end_date
            }
            onSave(cleanedData)
          }}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
