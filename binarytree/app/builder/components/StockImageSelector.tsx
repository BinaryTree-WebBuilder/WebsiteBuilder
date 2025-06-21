// components/StockImageSelector.tsx
'use client'

import { useEffect, useState } from 'react'
import { getStockImages } from '../utils/getstockimages'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function StockImageSelector({ onSelect }: { onSelect: (url: string) => void }) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    getStockImages().then(setImages)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">📷 Choose from Stock Images</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
                        <DialogHeader>
        <DialogTitle className="text-lg font-bold mb-4">Select a Stock Image</DialogTitle>
                </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`stock-${i}`}
              onClick={() => onSelect(url)}
              className="rounded cursor-pointer hover:scale-105 transition-all border hover:border-blue-500"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
