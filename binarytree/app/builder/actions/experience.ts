'use server'

import { createClient } from '@/app/utils/supabase/server'

const TABLE_NAME = 'experience'

export interface ExperienceEntry {
  id?: string
  company: string
  position: string
  start_month: number
  start_year: number
  end_month: number
  end_year: number
  job_description: string
  employment_type?: string // Optional field for employment type
  location: string
  ongoing: boolean
  skills: string[]
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
    .order('start_year', { ascending: false })
    .order('start_month', { ascending: false })

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as ExperienceEntry[] }
}

export async function getExperienceById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error("Insert error:", error)
    return { success: false, entries: [] }
  }


  return { success: true, entries: data as ExperienceEntry }
}

export async function submitExperience(entries: ExperienceEntry[]): Promise<{
  success: boolean
}> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("User error:", userError)
    return { success: false }
  }

  const payload = entries.map((entry) => ({
    ...entry,
    user_id: user.id,
  }))

  console.log("Submitting payload to Supabase:", JSON.stringify(payload, null, 2))

  const { error } = await supabase.from(TABLE_NAME).insert(payload)

  if (error) {
    console.error("Insert error:", error)
  }

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
