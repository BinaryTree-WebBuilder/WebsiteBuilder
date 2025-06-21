'use server'

import { createClient } from '@/app/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'

// Replace with your actual table name
const TABLE_NAME = 'project'

export interface ProjectEntry {
  id?: string
  title: string
  description: string
  technologies: string[]
  github_repo_url?: string
  website_url?: string
  video_url?: string
  image_url?: string
  user_id?: string
}

/**
 * Submit a new project entry, uploading image file and inserting metadata.
 * @param projectData Project form data excluding image file URL.
 * @param imageFile Image file to upload.
 */

// Helper to ensure external URLs are valid
function normalizeUrl(url?: string) {
  if (!url) return ''
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
}


export async function submitProject(
  projectData: Omit<ProjectEntry, 'id' | 'image_url' | 'user_id'>,
  imageFile: File
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('User authentication error:', userError)
    return { success: false, message: 'User not authenticated' }
  }

  // Upload image file to Supabase Storage under user folder with uuid filename
  const fileExt = imageFile.name.split('.').pop()
  const filePath = `${user.id}/${uuidv4()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('user-project')
    .upload(filePath, imageFile, {
      cacheControl: '3600',
      upsert: true,
      contentType: imageFile.type,
    })

  if (uploadError) {
    console.error('Image upload error:', uploadError)
    return { success: false, message: 'Image upload failed' }
  }


  // Get public URL for the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from('user-project')
    .getPublicUrl(filePath)

  if (!publicUrlData) {
    console.error('Get public URL error:');
    return { success: false, message: 'Failed to get image URL' }
  }

  const image_url = publicUrlData.publicUrl

  // Insert project metadata with image_url
  const payload: ProjectEntry = {
    ...projectData,
    image_url,
    github_repo_url: normalizeUrl(projectData.github_repo_url),
    website_url: normalizeUrl(projectData.website_url),
    video_url: normalizeUrl(projectData.video_url),
    user_id: user.id,
  }

  const { error: insertError } = await supabase.from(TABLE_NAME).insert(payload)

  if (insertError) {
    console.error('Insert project error:', insertError)
    return { success: false, message: 'Failed to insert project' }
  }

  return { success: true }
}
