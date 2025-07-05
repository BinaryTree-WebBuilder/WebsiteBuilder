'use client'

import { Github, Link as LinkIcon, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Project } from 'next/dist/build/swc/types'
import { ProjectEntry } from '../../actions/project'

interface ProjectCardProps {
  project: ProjectEntry
  index: number
}

export default function ProjectCard({project}: ProjectCardProps) {
  return (
<div className="relative">
  <Card className="relative  flex lg:!flex-row overflow-clip gap-4 border-none p-0 shadow-xs hover:!shadow-xl cursor-pointer transition-shadow duration-300">
    {project.image_url && (
      <div className="w-full lg:!w-1/5">
        <img
          src={project.image_url}
          alt={project.title}
          className="object-cover w-full h-full"
        />
      </div>
    )}

    <div className="flex-1 flex flex-col gap-4 justify-between p-4">
      <div className="flex flex-col justify-between h-full gap-40">
        <div className="flex flex-col lg:!flex-row w-full justify-between items-start gap-8">
          <div>
            <h2 className="font-bold text-lg">{project.title}</h2>
            <p className="text-sm font-medium text-gray-600 mt-1 truncate-3-lines">{project.description}</p>

            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {project.technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="rounded-full bg-gray-100 text-gray-800 px-3 py-0.5 text-xs font-normal "
                  >
                    <span>{tech}</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    <a
      href={`/projects/${project.id}`}
      className="absolute inset-0 flex items-center justify-center"
    >
    </a>
  </Card>
</div>
  )
}
