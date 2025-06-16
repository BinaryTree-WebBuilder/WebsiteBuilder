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
  institution: "Institution Name",
  location: "Location",
  degree: "Degree",
  fieldOfStudy: "Field of Study",
  graduationDate: "Graduation Date",
}

export interface EducationData {
  institution: string
  location: string
  degree: string
  fieldOfStudy: string
  graduationDate: string
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
      institution: '',
      location: '',
      degree: '',
      fieldOfStudy: '',
      graduationDate: '',
      achievements: [''],
    }
  )

  useEffect(() => {
    setFormData(
      initialData ?? {
        institution: '',
        location: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: '',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(fieldLabels) as Array<keyof EducationData>).map((field) => (
            <div key={field}>
              <label className="block text-lg font-medium">
                {fieldLabels[field]}
              </label>
              <input
                type={field === 'graduationDate' ? 'date' : 'text'}
                value={formData[field]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className="text-lg w-full border p-4 rounded"
              />
            </div>
          ))}

          <div className="col-span-full">
            <label className="block font-medium mb-1">Achievements</label>
            {formData.achievements.map((ach, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ach}
                  onChange={(e) => {
                    const updatedAchievements = [...formData.achievements]
                    updatedAchievements[idx] = e.target.value
                    setFormData({ ...formData, achievements: updatedAchievements })
                  }}
                  className="text-lg w-full border p-4 rounded"
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
