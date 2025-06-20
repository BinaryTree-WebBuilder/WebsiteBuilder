'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'

interface Project {
  id: string;
  project_name: string;
  project_description: string;
  project_image_url: string;
  technologies_used: string[];
  video_url?: string;
  github_repo_url?: string;
  website_url?: string;
  project_details: {
    header: string;
    description: string;
  }[];
}


const dummyProjects: Project[] = [
  {
    id: '1',
    project_name: 'AI Chat Assistant',
    project_description: 'A smart assistant powered by GPT models.',
    project_image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop&crop=center',
    technologies_used: ['Next.js', 'OpenAI API', 'TailwindCSS'],
    github_repo_url: 'https://github.com/example/chat-assistant',
    website_url: 'https://example.com/chat',
    video_url: '',
    project_details: [
      { header: 'Problem', description: 'Users need fast AI help' },
      { header: 'Solution', description: 'Built with GPT API' },
    ],
  },

    {
    id: '2',
    project_name: 'AI Chat Assistant',
    project_description: 'A smart assistant powered by GPT models A smart assistant powered by GPT models. A smart assistant powered by GPT models.',
    project_image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop&crop=center',
    technologies_used: ['Next.js', 'OpenAI API', 'TailwindCSS'],
    github_repo_url: 'https://github.com/example/chat-assistant',
    website_url: 'https://example.com/chat',
    video_url: '',
    project_details: [
      { header: 'Problem', description: 'Users need fast AI help' },
      { header: 'Solution', description: 'Built with GPT API' },
    ],
  },
  // Add more projects
]

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const router = useRouter()

  useEffect(() => {
    // Replace with your fetch logic
    setProjects(dummyProjects)
  }, [])

  const handleEdit = (project: Project) => {
    console.log('Edit:', project)
    // Open modal or navigate to edit
  }

  const handleDelete = (projectId: string) => {
    console.log('Delete ID:', projectId)
    // Confirmation + delete logic
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      <div className="space-y-6">
        {projects.map((project) => (
            <Card key={project.id} className="flex flex-row overflow-hidden gap-4 p-0">
            {/* Image Section */}
            <div className="w-1/5 hidden md:!block">
                <img
                src={project.project_image_url}
                alt={project.project_name}
                className="object-cover w-full h-full"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between p-4">
                <div className='flex flex-col justify-between h-full'>
                    <div>
                        <h2 className="text-xl font-semibold">{project.project_name}</h2>
                        <p className="text-gray-600 mt-2 leading-snug truncate-3-lines">
                            {project.project_description}
                        </p>
                    </div>

                {/* Tech Stack */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies_used.map((tech, idx) => (
                    <span
                        key={idx}
                        className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                    >
                        {tech}
                    </span>
                    ))}
                </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col justify-between items-end md:w-1/6 gap-2 pr-5 py-4">
                <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Pencil className="w-5 h-5 text-blue-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
                </div>
                <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push(`/project/${project.id}`)}
                >
                Details →
                </Button>
            </div>
            </Card>
        ))}
      </div>
    </div>
  )
}
