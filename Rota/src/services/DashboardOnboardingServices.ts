// src/services/DashboardOnboardingServices.ts
import { supabase } from "../infra/superBaseClient";
import type { OnboardingStepDTO } from "../types/DashboardDto";

/** Lista os passos de onboarding da empresa. */
export async function fetchOnboardingSteps(empresaId: string): Promise<OnboardingStepDTO[]> {
  const { data, error } = await supabase
    .from("onboarding_status")
    .select("id, titulo, descricao, rota, acao, concluido, ordem")
    .eq("empresa_id", empresaId)
    .order("ordem", { ascending: true });

  if (error) throw new Error(`DashboardOnboardingServices.fetchOnboardingSteps: ${error.message}`);
  return (data ?? []) as OnboardingStepDTO[];
}
