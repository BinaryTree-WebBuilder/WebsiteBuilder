'use client'

import { Github, Link as LinkIcon, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description?: string
    image_url?: string
    github_repo_url?: string
    website_url?: string
    video_url?: string
    technologies?: string[]
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Card className="relative flex md:!flex-row overflow-clip gap-4 border-none shadow-none p-0">

      {/* Image Section */}
      {project.image_url && (
        <div className="w-full md:!w-1/5">
          <img
            src={project.image_url}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-3">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row w-full justify-between items-start">
            <div>
                <h2 className="font-semibold text-lg">{project.title}</h2>

            </div>

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

          {/* Tech stack */}
          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {project.technologies.map((tech, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="rounded-full bg-gray-100 text-gray-800 px-3 py-1 text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
