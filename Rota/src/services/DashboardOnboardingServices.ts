// src/services/onboardingService.ts
import { supabase } from "../infra/superBaseClient";
import type { OnboardingStepDTO } from "../types/DashboardDto";

/** Lista os passos de onboarding da empresa, ordenados. */
export async function fetchOnboardingSteps(): Promise<OnboardingStepDTO[]> {
  const { data, error } = await supabase
    .from("onboarding_status")
    .select("id, titulo, descricao, rota, acao, concluido, ordem")
    .order("ordem", { ascending: true });

  if (error) throw new Error(`onboardingService.fetchOnboardingSteps: ${error.message}`);
  return (data ?? []) as OnboardingStepDTO[];
}

/** Marca um passo como concluído. */
export async function completeOnboardingStep(id: string): Promise<void> {
  const { error } = await supabase
    .from("onboarding_status")
    .update({ concluido: true })
    .eq("id", id);

  if (error) throw new Error(`onboardingService.completeOnboardingStep: ${error.message}`);
}