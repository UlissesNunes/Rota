// src/services/authService.ts
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";
import type { User, Session } from "@supabase/supabase-js";

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export type AuthResponse = {
  user: User | null;
  session: Session | null;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error("AUTH_ERROR");
  return { user: data.user, session: data.session };
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error("AUTH_ERROR");
  return { user: data.user, session: data.session };
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}