'use client'

import { Badge } from '@/components/ui/badge'

interface Experience {
  company: string
  position: string
  start_date: string
  end_date?: string
  currently_working?: boolean
  job_description?: string
  technologies?: string[]
}

interface ExperienceCardProps {
  entries: Experience[]
}

export default function ExperienceCard({ entries }: ExperienceCardProps) {
  if (!entries || entries.length === 0) {
    return <p className="text-sm text-gray-600">No experience added yet.</p>
  }

return (
  <div className="relative space-y-6 p-1">
    {entries.map((exp, idx) => (
      <div
        key={idx}
        className="p-1 relative group"
      >
        {/* Timeline vertical line */}
        {/* {idx !== entries.length - 1 && (
          <div className="absolute left-4 top-4 bottom-[-4.5rem] w-px bg-gray-300 z-0" />
        )} */}

        {/* Timeline dot */}
        {/* <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-blue-600 z-10" /> */}

        {/* Experience Content */}
        <div className=" rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-0">
            <h3 className="font-semibold text-lg">{exp.company}</h3>
            <span className="text-sm text-gray-800">{exp.position}</span>
          </div>

          <div className="text-sm text-gray-600">
            {exp.start_date} – {exp.currently_working ? 'Present' : exp.end_date}
          </div>

          {exp.technologies && exp.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
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

          {exp.job_description && (
            <p className="text-sm text-gray-800 whitespace-pre-line mt-2">
              {exp.job_description}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
)

}
