'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { User } from 'lucide-react';

export default function ProfileImageModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (file: File, previewUrl: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
    setIsDragging(false);
  };

  const handleSubmit = async () => {
    if (!file || !imageSrc || !croppedAreaPixels) return;

    setUploading(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedFile = new File([blob], file.name, { type: blob.type });
      const previewUrl = URL.createObjectURL(blob);
      onSave(croppedFile, previewUrl);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div
        className="relative bg-white rounded-lg p-4 w-[90vw] max-w-md max-h-[90vh] overflow-auto z-10"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✕
        </button>

        <Label className="block mb-2">Upload Profile Image</Label>

        {!imageSrc ? (
          <div
            className={`border-2 ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'
            } rounded-lg p-6 text-center cursor-pointer`}
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Click or drag-and-drop to upload image</p>

            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) handleFile(selected);
              }}
            />
          </div>
        ) : (
          <>
            <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
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

            <div className="flex gap-2 justify-between">
              <Button
                type="button"
                variant="secondary"
                className="w-1/2"
                onClick={() => {
                  setImageSrc(null);
                  setFile(null);
                  setZoom(1);
                }}
              >
                Choose Another
              </Button>

              <Button
                onClick={handleSubmit}
                className="w-1/2"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Save Image'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
