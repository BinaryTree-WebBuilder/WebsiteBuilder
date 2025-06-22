'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { UploadCloud, X } from 'lucide-react'
import ProjectImageCropModal from '@/app/builder/components/ProjectImageCropModal'
import { submitProject } from './action'
import Link from 'next/link'
import { Link as LinkIcon, Github, Play } from 'lucide-react'


interface ProjectFormData {
  name: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  video_url?: string
  image_file?: File | null
}

export default function AddProjectPage() {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    technologies: [],
    github_url: '',
    live_url: '',
    video_url: '',
    image_file: null,
  })

  const [techInput, setTechInput] = useState('')
  const [cropModalFile, setCropModalFile] = useState<File | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setCropModalFile(file)
  }

  const handleImageCropped = (croppedFile: File, previewUrl: string) => {
    setFormData(prev => ({ ...prev, image_file: croppedFile }))
    toast.success('Image cropped and ready!')
  }

  const handleAddTechnology = () => {
    const tech = techInput.trim()
    if (tech && !formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }))
      setTechInput('')
    }
  }

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== techToRemove)
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

    const { name, description, technologies, github_url, live_url, video_url, image_file } = formData

    if (!name || !description || !technologies.length || !image_file) {
      toast.error('Please fill all required fields and crop an image.')
      return
    }

    const projectData = {
      title: name,
      description,
      technologies,
      github_repo_url: github_url,
      website_url: live_url,
      video_url,
    }

    startTransition(async () => {
      const res = await submitProject(projectData, image_file)
      if (res.success) {
        toast.success('✅ Project submitted successfully!')
        setFormData({
          name: '',
          description: '',
          technologies: [],
          github_url: '',
          live_url: '',
          video_url: '',
          image_file: null,
        })
        setTechInput('')
      } else {
        toast.error(`❌ ${res.message || 'Submission failed'}`)
      }
    })
  }

  return (

    <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">➕ Add New Project</h2>
          <Link href={"/builder/sections/project"} className="font-semibold p-3">
            Back to Projects
          </Link>
        </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8 shadow-lg bg-white rounded-3xl p-8">
        {/* 1. Upload Image */}
        <section>
          <h2 className="font-bold text-lg mb-2">1. Project Image</h2>
          <label
            htmlFor="project-image"
            className="border-4 border-dashed border-gray-300 rounded-lg w-full h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
          >
            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-sm text-gray-600">Click or Drag & Drop to Upload</span>
          </label>
          <Input
            id="project-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {formData.image_file && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(formData.image_file)}
                className="w-lg h-auto rounded border"
                alt="Preview"
              />
            </div>
          )}
        </section>

        {/* 2. Project Info */}
        <section>
          <h2 className="font-bold text-lg mb-2">2. Project Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-sm">Title*</label>
              <Input
                id="name"
                name="name"
                placeholder="My Amazing Project"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-1 font-medium text-sm">Description*</label>
              <Textarea
                id="description"
                name="description"
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
                <Button type="button" onClick={handleAddTechnology}>
                  Add
                </Button>
              </div>
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 bg-gray-200 text-sm px-3 rounded-full"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="hover:text-red-500"
                      >
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

            {/* Live URL */}
            <div>
              <label htmlFor="live_url" className="block mb-1 font-medium text-sm">Live URL</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <LinkIcon size={16} />
                </span>
                <Input
                  id="live_url"
                  name="live_url"
                  className="pl-10" // Add left padding to make space for icon
                  placeholder="https://yourproject.live"
                  value={formData.live_url}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="github_url" className="block mb-1 font-medium text-sm">GitHub URL</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Github size={16} />
                </span>
                <Input
                  id="github_url"
                  name="github_url"
                  className="pl-10"
                  placeholder="https://github.com/yourrepo"
                  value={formData.github_url}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label htmlFor="video_url" className="block mb-1 font-medium text-sm">Video URL</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Play size={16} />
                </span>
                <Input
                  id="video_url"
                  name="video_url"
                  className="pl-10"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.video_url}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
        </section>

        <div className="pt-6 text-center">
          <Button
            type="submit"
            disabled={isPending || !formData.name || !formData.description || !formData.image_file}
            className='bg-gradient-primary-2 mx-auto px-8 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? 'Adding...' : 'Add Project'}
          </Button>
        </div>
      </form>

      {/* Crop Modal */}
      {cropModalFile && (
        <ProjectImageCropModal
          file={cropModalFile}
          onClose={() => setCropModalFile(null)}
          onSave={(croppedFile, previewUrl) => {
            handleImageCropped(croppedFile, previewUrl)
            setCropModalFile(null)
          }}
        />
      )}
    </div>
  )
}
