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
  institution_name: "Institution",
  institution_location: "Location",
  degree: "Degree",
  field_of_study: "Field of Study",
  start_date: "Start Date", // ✅ New field
  graduation_date: "Graduation Date",
}

export interface EducationData {
  institution_name: string
  institution_location: string
  degree: string
  field_of_study: string
  start_date: string // ✅ New field
  graduation_date: string
  achievements: string[]
}

interface EducationFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (eduData: EducationData) => void
  initialData?: EducationData
}

export function EducationFormDialog({
  open,
  onClose,
  onSave,
  initialData,
}: EducationFormDialogProps) {
  const [formData, setFormData] = useState<EducationData>(
    initialData ?? {
      institution_name: '',
      institution_location: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      graduation_date: '',
      achievements: [''],
    }
  )

  useEffect(() => {
    setFormData(
      initialData ?? {
        institution_name: '',
        institution_location: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        graduation_date: '',
        achievements: [''],
      }
    )
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {initialData ? 'Update Education' : 'Add Education'}
          </DialogTitle>
          <DialogDescription>
            Make changes or add to your education record. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {(Object.keys(fieldLabels) as Array<keyof EducationData>).filter(
            (field) => field !== "achievements"
          ).map((field) => (
            <div key={field}>
              <label className="block text-md font-medium">
                {fieldLabels[field]}
              </label>
              <input
                type={(field === 'graduation_date' || field === 'start_date') ? 'date' : 'text'}
                value={formData[field] ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className="text-md w-full border p-3 rounded"
              />
            </div>
          ))}

          {/* Achievements Section (Full width) */}
          <div className="col-span-full">
            <label className="block font-medium mb-1">Achievements</label>
            {formData.achievements.map((ach, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ach ?? ''}
                  onChange={(e) => {
                    const updatedAchievements = [...formData.achievements]
                    updatedAchievements[idx] = e.target.value
                    setFormData({ ...formData, achievements: updatedAchievements })
                  }}
                  className="text-md w-full border p-3 rounded"
                />
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    const updatedAchievements = [...formData.achievements]
                    updatedAchievements.splice(idx, 1)
                    setFormData({ ...formData, achievements: updatedAchievements })
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
                  achievements: [...formData.achievements, ''],
                })
              }
            >
              + Add Achievement
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
