'use server'

import { createClient } from '@/app/utils/supabase/server'

// Replace with your actual table name
const TABLE_NAME = 'education'

export interface EducationEntry {
  id?: string
  institution_name: string
  institution_location: string
  degree: string
  field_of_study: string
  start_date: string // ISO date format (e.g. "2025-06-01")
  graduation_date: string // ISO date format (e.g. "2025-06-01")
  achievements: string[]
  user_id?: string
}

export async function getEducationEntries(): Promise<{
  success: boolean
  entries: EducationEntry[]
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
    .order('graduation_date', { ascending: true })

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as EducationEntry[] }
}

export async function submitEducation(entries: EducationEntry[]): Promise<{
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

export async function updateEducation(
  id: string,
  entry: Partial<EducationEntry>
): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return { success: false }

  const { error } = await supabase
    .from(TABLE_NAME)
    .update(entry)
    .eq('id', id)
    .eq('user_id', user.id)

  return { success: !error }
}

export async function deleteEducation(id: string): Promise<{ success: boolean }> {
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
