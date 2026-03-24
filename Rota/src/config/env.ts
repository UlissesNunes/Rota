type EnvKeys = "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY";

function getEnvVar(key: EnvKeys): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  SUPABASE_URL: getEnvVar("VITE_SUPABASE_URL"),
  SUPABASE_ANON_KEY: getEnvVar("VITE_SUPABASE_ANON_KEY"),
} as const;