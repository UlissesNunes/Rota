// src/domain/auth.ts
import type { Session } from "@supabase/supabase-js";

export function isValidSession(session: Session | null): boolean {
  if (!session) return false;
  const expiresAt = session.expires_at;
  if (!expiresAt) return false;
  return Date.now() < expiresAt * 1000; // Supabase fornece em segundos
}
