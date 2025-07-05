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


export async function getProjectEntries(): Promise<{
  success: boolean
  entries: ProjectEntry[]
}> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return { success: false, entries: [] }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', user.id)
    .order('title', { ascending: true })

  if (error || !data) return { success: false, entries: [] }

  // Filter out any entries without id (safety check)
  //const validEntries = data.filter((entry): entry is ProjectEntry => !!entry.id)

  return { success: true, entries: data as ProjectEntry[] }
}

export async function getProjectById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as ProjectEntry }
}

export async function deleteProject(id: string): Promise<{ success: boolean }> {
  const supabase = await createClient()

    // Log before auth
  console.log('[deleteProject] Attempting to delete project with ID:', id)


  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return { success: false }

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
    

if (error) {
    console.error('[deleteProject] Supabase delete error:', error)
  } else {
    console.log('[deleteProject] Project deleted successfully:', id)
  }

  return { success: !error }
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

  const { error: insertError } = await supabase.from(TABLE_NAME).upsert(payload)

  if (insertError) {
    console.error('Insert project error:', insertError)
    return { success: false, message: 'Failed to insert project' }
  }

  return { success: true }
}


export async function updateProject(
  projectData: Omit<ProjectEntry,  'user_id'>,
  projectId: string,
  imageFile?: File
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: 'User not authenticated' }
  }

  let image_url: string | undefined = undefined

  console.log('Updating project with data:', projectData)
  console.log('Image file:', imageFile)

  if (imageFile) {
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
      return { success: false, message: 'Image upload failed' }
    }

    const { data: publicUrlData } = supabase.storage
      .from('user-project')
      .getPublicUrl(filePath)

    image_url = publicUrlData.publicUrl
  }

  const payload: Partial<ProjectEntry> = {
    ...projectData,
    github_repo_url: normalizeUrl(projectData.github_repo_url),
    website_url: normalizeUrl(projectData.website_url),
    video_url: normalizeUrl(projectData.video_url),
    user_id: user.id,
    image_url: image_url ?? projectData.image_url, // ✅ This line fixes it
  }

  if (image_url) {
    payload.image_url = image_url
  }

  const { error: updateError } = await supabase
    .from(TABLE_NAME) // replace with your actual table name
    .update(payload)
    .eq('id', projectId)

  if (updateError) {
    return { success: false, message: updateError.message }
  }

  return { success: true }
}