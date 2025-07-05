'use server'

import { createClient } from '@/app/utils/supabase/server'

// Replace with your actual table name
const TABLE_NAME = 'education'

export interface EducationEntry {
  id?: string
  user_id?: string
  institution_name: string
  course: string
  field_of_study: string
  location: string
  start_month: number
  start_year: number
  end_month: number
  end_year: number
  highlights: string[]
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
    .order('start_year', { ascending: false })
    .order('start_month', { ascending: false })

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as EducationEntry[] }
}

export async function getEducationById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as EducationEntry }
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

  const { error: insertError } = await supabase.from(TABLE_NAME).insert(payload)

  
  if (insertError) {
    console.error('Insert project error:', insertError)
  }

  return { success: !insertError }
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

  const { error: updateError } = await supabase
    .from(TABLE_NAME)
    .update(entry)
    .eq('id', id)
    .eq('user_id', user.id)

    if (updateError) {
      console.error('Update project error:', updateError)
    }

  return { success: !updateError }
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
