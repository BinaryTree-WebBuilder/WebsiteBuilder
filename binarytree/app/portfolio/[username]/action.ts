// app/portfolio/[username]/actions.ts
import { createClient } from '@/app/utils/supabase/server'

// Replace with your actual table name
const TABLE_NAME = 'personal_info'

export async function getDataByUsername(username: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) return null

  return data
}
