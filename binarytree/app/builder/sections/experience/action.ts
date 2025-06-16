'use server';

import { createClient } from '@/app/utils/supabase/server'


export async function saveExperience(experience: {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  technologies: string[];
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { error: insertError } = await supabase
    .from('experience')
    .insert({
      user_id: user.id,
      company: experience.company,
      position: experience.position,
      start_date: experience.startDate || null,
      end_date: experience.currentlyWorking ? null : experience.endDate || null,
      currently_working: experience.currentlyWorking,
      job_description: experience.description,
      technologies: experience.technologies, // If it's a text[] column in Supabase
    });

  if (insertError) {
    console.error('Insert error:', insertError);
    return { success: false, error: insertError.message };
  }

  return { success: true };
}