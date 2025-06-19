'use server';

import { createClient } from '@/app/utils/supabase/server';
import dns from 'dns/promises';

function isValidEmailSyntax(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

async function hasValidMxRecord(email: string): Promise<boolean> {
  const domain = email.split('@')[1];
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch (err) {
    console.error(`DNS MX lookup failed for domain ${domain}`, err);
    return false;
  }
}

export async function addToWaitlist(email: string): Promise<{ success: boolean; message?: string }> {
  if (!isValidEmailSyntax(email)) {
    return { success: false, message: "invalid_email" };
  }

  const mxValid = await hasValidMxRecord(email);
  if (!mxValid) {
    return { success: false, message: "email_domain_invalid" };
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
    console.error("Supabase insert error:", err);
    return { success: false, message: "server_error" };
  }
}
