'use client'

import { User, Mail, MapPin, Github, Linkedin } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface AboutMeCardProps {
  full_name: string
  email: string
  location?: string
  bio?: string
  profile_image_url?: string
  github_url?: string
  linkedin_url?: string
}

export default function AboutMeCard({
  full_name,
  email,
  location,
  bio,
  profile_image_url,
  github_url,
  linkedin_url,
}: AboutMeCardProps) {
  return (
    <div className="space-y-4 text-sm">

      {/* Info Card */}
      <div className="p-4 space-y-4">
              {/* Profile Picture */}
      {profile_image_url ? (
        <img
          src={profile_image_url}
          alt="Profile"
          className="shadow-lg w-32 h-32  rounded-full mb-2 object-cover"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-2">
          <User className="w-8 h-8 text-gray-400" />
        </div>
      )}

            {/* Social Links */}
      {(github_url || linkedin_url) && (
        <div className="flex justify-left gap-4 text-gray-500 mt-2">
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hover:text-black transition"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {linkedin_url && (
            <a
              href={linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="hover:text-black transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      )}

        <p className="font-semibold text-base">{full_name}</p>
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  )
}
