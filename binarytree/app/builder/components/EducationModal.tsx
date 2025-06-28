'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import EducationForm, { EducationFormData } from './forms/EducationForm'

export default function EducationModal({
  isEdit = false,
  initialData,
  educationId,
  triggerText = '+ Add Education',
  onSuccess,
}: {
  isEdit?: boolean
  educationId?: string
  initialData?: EducationFormData
  triggerText?: string
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>{triggerText}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">

        <EducationForm
          isEdit={isEdit}
          initialData={initialData}
          educationId={educationId}
          onSuccess={handleSuccess}
        />


      </DialogContent>
    </Dialog>
  )
}
