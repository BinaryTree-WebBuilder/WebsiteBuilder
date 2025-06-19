'use server';

import { createClient } from '@/app/utils/supabase/server'


export async function addToWaitlist(email: string): Promise<{ success: boolean; message?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "invalid_email" };
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("early_access")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505" || error.message.includes("duplicate")) {
        return { success: false, message: "already_exists" };
      }
      return { success: false, message: "unknown_error" };
    }

    return { success: true };
  } catch (err) {
    console.error("Server error:", err);
    return { success: false, message: "server_error" };
  }
}
