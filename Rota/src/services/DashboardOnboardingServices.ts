// src/services/onboardingService.ts

import type { OnboardingStepDTO } from "../types/DashboardDto";
import { supabase } from "./DashboardSupabase";


export async function fetchOnboardingSteps(): Promise<OnboardingStepDTO[]> {
  const { data, error } = await supabase
    .from("onboarding_status")
    .select("id, titulo, descricao, rota, acao, concluido");

  if (error) throw new Error(`onboardingService: ${error.message}`);
  return (data ?? []) as OnboardingStepDTO[];
}