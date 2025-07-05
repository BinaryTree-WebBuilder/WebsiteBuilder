'use client'

import { User, Mail, MapPin, Github, Linkedin, Instagram, Youtube } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PersonalInfoEntry } from '../../actions/personalinfo'

interface AboutMeCardProps {
  personal_info?: PersonalInfoEntry
}

export default function PersonalInfoCard({
  personal_info
}: AboutMeCardProps) {


  const profile_img = personal_info?.image_url || ''
  const full_name = (personal_info?.first_name || '') + ' ' + (personal_info?.last_name || '')
  const email = personal_info?.email || ''
  const address = personal_info?.address || ''
  const github_url = personal_info?.github_url || ''
  const linkedin_url = personal_info?.linkedin_url || ''
  const youtube_url = personal_info?.youtube_url || ''
  const headline = personal_info?.headline || ''

  if (!personal_info) return <div className="text-center py-10">Loading user data...</div>


  return (
    <div className="space-y-4 text-sm">

      {/* Info Card */}
      <div className="p-4 space-y-4 text-left">
              {/* Profile Picture */}
      {personal_info?.image_url ? (
        <img
          src={personal_info.image_url}
          alt="Profile"
          className="shadow-md w-48 h-48  rounded-full mb-2 object-cover"
        />
      ) : (
        <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center mb-2">
          <User className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <p className="font-bold text-base mt-8">{full_name}</p>
      <p className=" text-base mt-6">{headline}</p>


      <div className="flex flex-cols-4 gap-4 w-auto mt-6">
      {/* Social Links */}
        {personal_info?.github_url && (
          <a
            href={personal_info.github_url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="hover:text-black transition text-gray-500 block"
          >
            <Github className="w-8 h-8" />
          </a>
        )}

        {personal_info?.linkedin_url && (
          <a
            href={personal_info.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:text-black transition text-gray-500 block"
          >
            <Linkedin className="w-8 h-8" />
          </a>
        )}
        {personal_info?.instagram_url && (
          <a
            href={personal_info.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            title="instagram"
            className="hover:text-black transition text-gray-500 block"
          >
            <Instagram className="w-8 h-8" />
          </a>
        )}
        {personal_info?.youtube_url && (
          <a
            href={personal_info.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            title="Youtube"
            className="hover:text-black transition text-gray-500 block"
          >
            <Youtube className="w-8 h-8" />
          </a>
        )}
      </div>



        {/* <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{address}</span>
          </div>
        )} */}
      </div>
    </div>
  )
}
