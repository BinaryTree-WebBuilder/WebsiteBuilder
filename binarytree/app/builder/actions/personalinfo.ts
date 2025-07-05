'use server';

import { createClient } from '@/app/utils/supabase/server'

const TABLE_NAME = 'personal_info'

export interface PersonalInfoEntry {
  user_id?: string
  first_name: string
  last_name: string
  email?: string
  headline?: string
  mobile_number?: string
  address?: string
  professional_summary?: string
  github_url?: string
  linkedin_url?: string
  youtube_url?: string
  instagram_url?: string
  image_url?: string
}

export async function getPersonalInfo() : Promise<{
  success: boolean
  entry: PersonalInfoEntry
}> {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error || !data) return { success: false, entry: {} as PersonalInfoEntry }

    return { success: true, entry: data as PersonalInfoEntry }
}




export async function savePersonalInfo(formData: FormData) {
  const supabase = await createClient()

  const {
    first_name,
    last_name,
    headline,
    email,
    mobile_number,
    address,
    linkedin_url,
    github_url,
    youtube_url,
    instagram_url,
    professional_summary
  } = Object.fromEntries(formData.entries()) as Record<string, string>;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  const userId = user.id;


  const { error: insertError } = await supabase
    .from(TABLE_NAME)
    .upsert({
      user_id: userId,
      first_name,
      last_name,
      headline,
      email,
      mobile_number,
      address,
      linkedin_url,
      github_url,
      youtube_url,
      instagram_url,
      professional_summary
    });

  if (insertError) {
    throw new Error('Database error: ' + insertError.message);
  }

  return { success: true };
}


export async function uploadProfileImage(file: File) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  const userId = user.id;
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}-${timestamp}.${fileExt}`;

  // Upload or overwrite the file
  const { error: uploadError } = await supabase.storage
    .from('user-profile-image')
    .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
    });

  if (uploadError) {
    throw new Error('Image upload failed: ' + uploadError.message);
  }

  const { data } = supabase.storage
    .from('user-profile-image')
    .getPublicUrl(filePath);

  const profileImageUrl = `${data.publicUrl}?t=${Date.now()}`;

  // Check if personal_info row exists
  const { data: existing, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('user_id')
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // 'PGRST116' = no rows found
    throw new Error('Failed to check existing profile: ' + fetchError.message);
  }

  let dbError;

  if (existing) {
    // Row exists — update
    ({ error: dbError } = await supabase
      .from(TABLE_NAME)
      .update({ image_url: profileImageUrl })
      .eq('user_id', userId));
  } else {
    // No row — insert
    ({ error: dbError } = await supabase
      .from(TABLE_NAME)
      .insert({ user_id: userId, image_url: profileImageUrl }));
  }

  if (dbError) {
    throw new Error('Failed to save profile image URL: ' + dbError.message);
  }

  return { success: true, profileImageUrl };
}