'use client'

import { useState, useEffect, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { UploadCloud, X, Link as LinkIcon, Github, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ProjectImageCropModal from '@/app/builder/components/ProjectImageCropModal'
import { submitProject, updateProject } from '@/app/builder/actions/project'

export interface ProjectFormData {
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  video_url?: string
  image_url?: string
  image_file?: File | null
}

export default function ProjectForm({
  initialData,
  isEdit = false,
  projectId,
  onSuccess,
}: {
  initialData?: ProjectFormData & { existing_image_url?: string }
  isEdit?: boolean
  projectId?: string
  onSuccess?: () => void
}) {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData || {
      title: '',
      description: '',
      technologies: [],
      github_url: '',
      live_url: '',
      video_url: '',
      image_url: '',
      image_file: null,
    }
  )

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [techInput, setTechInput] = useState('')
  const [cropModalFile, setCropModalFile] = useState<File | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      if (isEdit && initialData.image_url) {
        setImagePreviewUrl(initialData.image_url)
      }
    }
  }, [initialData, isEdit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { title, value } = e.target
    setFormData(prev => ({ ...prev, [title]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setCropModalFile(file)
  }

  const handleImageCropped = (croppedFile: File) => {
    setFormData(prev => ({ ...prev, image_file: croppedFile }))
    setImagePreviewUrl(URL.createObjectURL(croppedFile))
    toast.success('Image cropped and ready!')
  }

  const handleAddTechnology = () => {
    const tech = techInput.trim()
    if (tech && !formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }))
      setTechInput('')
    }
  }

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== techToRemove),
    }))
  }

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTechnology()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      title,
      description,
      technologies,
      github_url,
      live_url,
      video_url,
      image_file,
      image_url,
    } = formData

    const isImagePresent = !!image_file || !!image_url

    if (!title || !description || !isImagePresent) {
      toast.error('Please fill all required fields and upload an image.')
      return
    }

    const projectData = {
      title,
      description,
      technologies,
      github_repo_url: github_url,
      website_url: live_url,
      video_url,
      image_url: image_url || undefined,
    }

    startTransition(async () => {
      const res = isEdit
        ? await updateProject(projectData, projectId!, image_file ?? undefined)
        : await submitProject(projectData, image_file!)

      if (res.success) {
        toast.success(isEdit ? '✅ Project updated!' : '✅ Project added!')
        onSuccess?.()
        router.push('/builder/sections/project')

        if (!isEdit) {
          setFormData({
            title: '',
            description: '',
            technologies: [],
            github_url: '',
            live_url: '',
            video_url: '',
            image_file: null,
            image_url: '',
          })
          setTechInput('')
          setImagePreviewUrl(null)
        }
      } else {
        toast.error(`❌ ${res.message || 'Operation failed'}`)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8 shadow-lg bg-white rounded-3xl p-8">
      {/* 1. Upload Image */}
      <section>
        <h2 className="font-bold text-lg mb-2">1. Project Image</h2>
        <label
          htmlFor="project-image"
          className="border-4 border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors overflow-hidden"
        >
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Project"
              className="object-contain w-full h-full shadow-sm rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-center text-gray-600">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
              <span className="text-sm">Click or Drag & Drop to Upload</span>
            </div>
          )}
        </label>
        <Input
          id="project-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </section>

      {/* 2. Project Info */}
      <section>
        <h2 className="font-bold text-lg mb-2">2. Project Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 font-medium text-sm">Title*</label>
            <Input id="title" title="title" placeholder="My Amazing Project" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-medium text-sm">Description*</label>
            <Textarea
              id="description"
              title="description"
              placeholder="What did you build, how, and why?"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="technologies" className="block mb-1 font-medium text-sm">Technologies Used*</label>
            <div className="flex gap-2">
              <Input
                id="technologies"
                value={techInput}
                placeholder="Press Enter: React, Node.js, Tailwind"
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
              />
              <Button type="button" onClick={handleAddTechnology}>Add</Button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.technologies.map((tech, i) => (
                  <span key={i} className="flex items-center gap-1 bg-gray-200 text-sm px-3 rounded-full">
                    {tech}
                    <button type="button" onClick={() => handleRemoveTechnology(tech)} className="hover:text-red-500">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Links */}
      <section>
        <h2 className="font-bold text-lg mb-2">3. Add Links (Optional)</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="live_url" className="block mb-1 font-medium text-sm">Live URL</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"><LinkIcon size={16} /></span>
              <Input id="live_url" title="live_url" className="pl-10" placeholder="https://yourproject.live" value={formData.live_url} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="github_url" className="block mb-1 font-medium text-sm">GitHub URL</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"><Github size={16} /></span>
              <Input id="github_url" title="github_url" className="pl-10" placeholder="https://github.com/yourrepo" value={formData.github_url} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="video_url" className="block mb-1 font-medium text-sm">Video URL</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"><Play size={16} /></span>
              <Input id="video_url" title="video_url" className="pl-10" placeholder="https://youtube.com/watch?v=..." value={formData.video_url} onChange={handleChange} />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-6 text-center">
        <Button
          type="submit"
          className="bg-gradient-primary-2 mx-auto px-8 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Project' : 'Add Project')}
        </Button>
      </div>

      {cropModalFile && (
        <ProjectImageCropModal
          file={cropModalFile}
          onClose={() => setCropModalFile(null)}
          onSave={(croppedFile) => {
            handleImageCropped(croppedFile)
            setCropModalFile(null)
          }}
        />
      )}
    </form>
  )
}
