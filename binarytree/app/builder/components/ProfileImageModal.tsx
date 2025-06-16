'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

export default function ProfileImageModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (file: File) => Promise<void>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onSave(file);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      {/* modal content */}
      <div
        className="relative bg-white rounded-lg p-6 w-full max-w-md z-10"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✕
        </button>

        <Label className="block mb-2">Upload Profile Image</Label>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview Profile Image" className="w-32 h-32 mx-auto rounded-full mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}

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

          <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
            Choose Image
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          className="mt-4 w-full"
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Save Image'}
        </Button>
      </div>
    </div>
  );
}
