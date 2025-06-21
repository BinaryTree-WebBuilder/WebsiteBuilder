'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/cropImage'

export default function ProjectImageCropModal({
  file,
  onClose,
  onSave,
}: {
  file: File
  onClose: () => void
  onSave: (file: File, previewUrl: string) => void
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result as string)
    reader.readAsDataURL(file)

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [file])

  const handleSubmit = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    const blob = await getCroppedImg(imageSrc, croppedAreaPixels, { width: 800, height: 450 })
    const croppedFile = new File([blob], file.name, { type: blob.type })
    const previewUrl = URL.createObjectURL(blob)
    onSave(croppedFile, previewUrl)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 w-[90vw] max-w-md max-h-[90vh] overflow-auto">
        <h2 className="font-semibold text-lg mb-4">Crop Project Image</h2>

        {imageSrc && (
          <>
            <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, area) => setCroppedAreaPixels(area)}
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-2/3"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button onClick={handleSubmit} className="w-full">
                Save Cropped Image
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
