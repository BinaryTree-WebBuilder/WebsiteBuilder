'use client'

import { Badge } from '@/components/ui/badge'

interface Education {
  institution_name: string
  degree: string
  field_of_study?: string
  start_date: string
  end_date?: string
  currently_studying?: boolean
  achievements?: string[]
}

interface EducationCardProps {
  entries: Education[]
}

export default function EducationCard({ entries }: EducationCardProps) {
  if (!entries || entries.length === 0) {
    return <p className="text-sm text-gray-600">No education history added yet.</p>
  }

  return (
    <div className="relative space-y-6 p-1">
      {entries.map((edu, idx) => (
        <div
          key={idx}
          className="p-1 relative group"
        >

          <div className="rounded-lg space-y-3">
            <div className="flex justify-between items-center mb-0">
              <h3 className="font-semibold text-lg">{edu.institution_name}</h3>
              <span className="text-sm text-gray-800">{edu.degree}</span>
            </div>

            {edu.field_of_study && (
              <div className="text-sm italic text-gray-500">
                {edu.field_of_study}
              </div>
            )}

            <div className="text-sm text-gray-600">
              {edu.start_date} – {edu.currently_studying ? 'Present' : edu.end_date}
            </div>

            {edu.achievements && edu.achievements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {edu.achievements.map((achieve, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="rounded-full bg-gray-100 text-gray-800 px-3 py-1 text-xs"
                  >
                    {achieve}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
