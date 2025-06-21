// utils/getStockImages.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getStockImages(): Promise<string[]> {
  const { data, error } = await supabase.storage.from('stock-images').list('', {
    limit: 100,
    offset: 0,
  })

  if (error || !data) return []

  // Map to public URLs
  return data.map((file) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/stock-images/${file.name}`
  )
}
