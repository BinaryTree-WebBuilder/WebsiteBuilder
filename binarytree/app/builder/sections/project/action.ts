'use server'

import { createClient } from '@/app/utils/supabase/server'

const TABLE_NAME = 'project'

export interface ProjectEntry {
  id?: string
  title: string  // must be unique or used as key/id substitute
  description: string
  image_url: string
  technologies_used: string[]
  video_url?: string
  github_repo_url?: string
  website_url?: string
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
