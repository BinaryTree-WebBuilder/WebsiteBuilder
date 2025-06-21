// components/ui/confirmation-dialog.tsx
'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2} from 'lucide-react'


export function ConfirmationDialog({ open, onConfirm, onCancel, message }: {
  open: boolean,
  onConfirm: () => void,
  onCancel: () => void,
  message: string
}) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onCancel()}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm">Delete Item</DialogTitle>
          <DialogDescription className="text-black text-lg font-semibold whitespace-pre-line">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center w-full gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete <Trash2 className="w-5 h-5 text-white-500" /></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
