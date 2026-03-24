// src/types/auth.ts
import type { User, Session } from "@supabase/supabase-js";

export type AuthResponse = {
  user: User | null;
  session: Session | null;
};