'use server';

import { createClient } from '@/app/utils/supabase/server'


export async function getPersonalInfo() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('personal_info')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    // error code PGRST116 = "No rows found"
    throw new Error('Failed to fetch personal info')
  }

  return data ?? null
}


export async function savePersonalInfo(formData: FormData) {
  const supabase = await createClient()

  const {
    full_name,
    email,
    phone,
    location,
    linkedin_url,
    github_url,
    bio,
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
    .from('personal_info')
    .upsert({
      user_id: userId,
      full_name,
      email,
      phone,
      location,
      linkedin_url,
      github_url,
      bio,
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
    .from('personal_info')
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
      .from('personal_info')
      .update({ profile_image_url: profileImageUrl })
      .eq('user_id', userId));
  } else {
    // No row — insert
    ({ error: dbError } = await supabase
      .from('personal_info')
      .insert({ user_id: userId, profile_image_url: profileImageUrl }));
  }

  if (dbError) {
    throw new Error('Failed to save profile image URL: ' + dbError.message);
  }

  return { success: true, profileImageUrl };
}