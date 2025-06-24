'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Github, Link as LinkIcon, Play } from 'lucide-react'
import Link from 'next/link'
import { useProjectStore } from '../../stores/useProjectStores'
import { deleteProject } from '@/app/builder/actions/project' // your server action to delete
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'


export default function ProjectPage() {
  const { entries, loading, fetchProject } = useProjectStore()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)


  useEffect(() => {
    if (!loading) {
      fetchProject().catch(() => setError('Failed to load projects'))
    }
  }, [loading, fetchProject])

  const confirmDelete = (entry: any) => {
    setSelectedEntry(entry)
    setIsDeleteConfirmOpen(true)
  }


  const handleDelete = async () => {
        if (!selectedEntry?.id) return

        const result = await deleteProject(selectedEntry.id)
        if (result.success) {
          toast.success('🗑️ Project deleted successfully!', { id: 'project-toast' })
          setIsDeleteConfirmOpen(false)
          await fetchProject()
        } else {
          toast.error('❌ Failed to delete project. Try again.', { id: 'project-toast' })
        }
  }

  if (!loading) return <p className="text-center mt-10">Loading projects...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">💻 Projects</h2>
        <Link href="project/add">
          <Button className="bg-gradient-primary-2 p-6">+ Add Projects</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {entries.map((project, idx) => (
          <Card
            key={idx}
            className="relative flex md:!flex-row overflow-clip gap-4 px-10 py-4 md:!p-0 border-none shadow-md"
          >
            <div className="absolute top-0 left-0 bg-color-tertiary-1 text-white text-xs font-bold py-2 px-3 rounded-tl-lg rounded-br-lg z-10">
              {idx + 1}
            </div>

            {/* Image Section */}
            <div className="w-1/5 hidden md:!block">
              <img
                src={project.image_url}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between p-0 md:p-4">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="font-bold text-lg">{project.title}</h2>

                  <div className="flex gap-4 mt-2">
                    {project.github_repo_url && (
                      <a
                        href={project.github_repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition"
                        title="GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.website_url && (
                      <Link
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition"
                        title="Live Website"
                      >
                        <LinkIcon className="w-5 h-5" />
                      </Link>
                    )}
                    {project.video_url && (
                      <Link
                        href={project.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition"
                        title="Demo Video"
                      >
                        <Play className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                  {project.technologies?.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, i: number) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="rounded-full bg-gray-100 text-gray-800 px-3 py-1 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="w-full md:!w-1/5 flex md:flex-col items-end md:items-end justify-between md:justify-start gap-2 md:p-4">
              <div className="flex gap-1">
                <Link href="project/edit/[projectId]" as={`project/edit/${project.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                    aria-label="Edit project"
                  >
                  <Pencil className="w-5 h-5 text-blue-600" />
                </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => confirmDelete(project)} // ✅ Triggers modal
                  aria-label="Delete project"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
              <Button
                variant="secondary"
                className="text-xs cursor-pointer p-4"
                onClick={() => router.push(`/project/${encodeURIComponent(project.id)}`)}
              >
                Details →
              </Button>
            </div>
          </Card>
        ))}
      </div>

            <ConfirmationDialog
              open={isDeleteConfirmOpen}
              onCancel={() => setIsDeleteConfirmOpen(false)}
              onConfirm={handleDelete}
              message={`Are you sure you want to delete "${selectedEntry?.title}"?\nYou can't undo this action.`}
            />
    </div>
  )
}
