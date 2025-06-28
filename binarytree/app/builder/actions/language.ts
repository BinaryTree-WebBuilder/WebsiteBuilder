

'use server'

import { createClient } from '@/app/utils/supabase/server'

// Replace with your actual table name
const TABLE_NAME = 'language'

export interface LanguageEntry {
  id?: string
  language?: string
  proficiency?: string
  certification?: string[]
}

export async function getLanguageEntries(): Promise<{
  success: boolean
  entries: LanguageEntry[]
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

  return { success: true, entries: data as LanguageEntry[] }
}


