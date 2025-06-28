

'use server'

import { createClient } from '@/app/utils/supabase/server'

// Replace with your actual table name
const TABLE_NAME = 'skills'

export interface SkillsEntry {
  id?: string
  skills?: string[]
}

export async function getSkillsEntries(): Promise<{
  success: boolean
  entries: SkillsEntry[]
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
    .eq('id', user.id)

  if (error || !data) return { success: false, entries: [] }

  return { success: true, entries: data as SkillsEntry[] }
}


export async function addSkill(newSkill: string): Promise<{ success: boolean; message?: string }> {
  console.log('[addSkill] Invoked with skill:', newSkill)

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('[addSkill] Auth error:', userError)
    return { success: false, message: 'Not authenticated' }
  }

  const userId = user.id
  console.log('[addSkill] Authenticated user ID:', userId)

  // Fetch existing skills row by user ID
  const { data: existing, error: fetchError } = await supabase
    .from('skills')
    .select('skills')
    .eq('id', userId) // 🛠️ FIX: this should be 'user_id', not 'id'
    .single()

  if (fetchError) {
    console.warn('[addSkill] Fetch error (can be okay if no row exists):', fetchError)
    if (fetchError.code !== 'PGRST116') {
      return { success: false, message: 'Error fetching existing skills' }
    }
  }

  if (existing) {
    console.log('[addSkill] Found existing skills:', existing.skills)

    const currentSkills: string[] = existing.skills || []
    const updatedSkills = Array.from(new Set([...currentSkills, newSkill]))

    console.log('[addSkill] Updating skills to:', updatedSkills)

    const { error: updateError } = await supabase
      .from('skills')
      .update({ skills: updatedSkills })
      .eq('id', userId)

    if (updateError) {
      console.error('[addSkill] Update error:', updateError)
      return { success: false, message: 'Error updating skills' }
    }
  } else {
    console.log('[addSkill] No existing row, inserting new skills row with:', [newSkill])

    const { error: insertError } = await supabase
      .from('skills')
      .insert([{ id: userId, skills: [newSkill] }])

    if (insertError) {
      console.error('[addSkill] Insert error:', insertError)
      return { success: false, message: 'Error inserting skills' }
    }
  }

  console.log('[addSkill] Skill added successfully')
  return { success: true }
}


export async function syncSkillsClientSide(
  combinedSkills: string[]
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: 'Not authenticated' }
  }

  const userId = user.id

  const cleanedSkills = combinedSkills
    .map((s) => s.trim())
    .filter(Boolean)

  if (cleanedSkills.length === 0) {
    return { success: false, message: 'No skills to sync' }
  }

  // Get existing skill entry
  const { data: existing, error: fetchError } = await supabase
    .from('skills')
    .select('skills')
    .eq('id', userId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    return { success: false, message: 'Error fetching existing skills' }
  }

  const currentSkills: string[] = existing?.skills || []
  const merged = Array.from(new Set([...currentSkills, ...cleanedSkills]))

  if (existing) {
    const { error: updateError } = await supabase
      .from('skills')
      .update({ skills: merged })
      .eq('id', userId)

    if (updateError) {
      return { success: false, message: 'Failed to update skills' }
    }
  } else {
    const { error: insertError } = await supabase
      .from('skills')
      .insert([{ id: userId, skills: merged }])

    if (insertError) {
      return { success: false, message: 'Failed to insert skills' }
    }
  }

  return { success: true }
}

export async function updateSkillSet(updatedSkills: string[]): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return { success: false, message: 'Not authenticated' }

  const { error: updateError } = await supabase
    .from('skills')
    .update({ skills: updatedSkills })
    .eq('id', user.id)

  if (updateError) return { success: false, message: 'Update failed' }

  return { success: true }
}
