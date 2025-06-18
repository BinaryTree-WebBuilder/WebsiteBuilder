'use server'

import { createClient } from '@/app/utils/supabase/server'

// Replace with your actual table name
const TABLE_NAME = 'experience'

export interface ExperienceEntry {
  id?: string
  company: string
  position: string
  start_date: string
  end_date: string
  job_description: string
  currently_working: boolean
  technologies: string[]
  user_id?: string
}

export async function getExperienceEntries(): Promise<{
  success: boolean
  entries: ExperienceEntry[]
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
    .order('start_date', { ascending: true })

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as ExperienceEntry[] }
}

export async function submitExperience(entries: ExperienceEntry[]): Promise<{
  success: boolean
}> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return { success: false }

  const payload = entries.map((entry) => ({
    ...entry,
    user_id: user.id,
  }))

  const { error } = await supabase.from(TABLE_NAME).insert(payload)

  return { success: !error }
}

export async function updateExperience(
  id: string,
  entry: Partial<ExperienceEntry>
): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  console.log("Went here: " + userError?.message);

  if (userError || !user) return { success: false }

  const { error } = await supabase
    .from(TABLE_NAME)
    .update(entry)
    .eq('id', id)
    .eq('user_id', user.id)

  return { success: !error }
}

export async function deleteExperience(id: string): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return { success: false }

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  return { success: !error }
}
